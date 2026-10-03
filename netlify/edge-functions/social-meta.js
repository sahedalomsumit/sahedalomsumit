export default async function handler(request, context) {
  const url = new URL(request.url)
  const pathname = url.pathname

  // Match /blog/:slug or /blog/:slug/
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/)
  if (!match) {
    return context.next()
  }

  const slug = match[1]
  // Do not intercept admin dashboard, creation pages, or asset files
  if (slug === 'admin' || slug === 'new' || slug.includes('.')) {
    return context.next()
  }

  const siteUrl = 'https://sahedalomsumit.com'
  const pageUrl = `${siteUrl}/blog/${slug}`

  // 1. Get origin response
  let response = await context.next()

  // 2. Prevent swallowing 301/308 redirects (e.g. trailing slash redirect for directories):
  // Follow redirect target to retrieve actual page HTML instead of tiny redirect body
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location')
    if (location) {
      try {
        const targetUrl = new URL(location, request.url)
        response = await fetch(targetUrl.toString(), {
          headers: request.headers,
        })
      } catch (_) {}
    }
  }

  // 3. Extract HTML
  let html = ''
  const contentType = response.headers.get('content-type') || ''
  if (response.ok && contentType.includes('text/html')) {
    html = await response.text()
  }

  // If HTML is empty, missing head, or is a stub/redirect (< 500 chars), fetch base index.html from origin
  if (!html || !html.includes('<head') || html.length < 500) {
    try {
      const indexRes = await fetch(new URL('/index.html', request.url).toString(), {
        headers: request.headers,
      })
      if (indexRes.ok) {
        html = await indexRes.text()
      }
    } catch (_) {}
  }

  // If still no valid HTML, gracefully return response
  if (!html) {
    return response
  }

  try {
    const projectId = 'vbkdnotg'
    const dataset = 'production'
    const query = `*[_type == "post" && slug.current == "${slug}"][0]{
      title,
      excerpt,
      "coverImage": coalesce(coverImage.asset->url, coverImage),
      publishedAt,
      authorName
    }`
    const sanityUrl = `https://${projectId}.api.sanity.io/v2024-03-01/data/query/${dataset}?query=${encodeURIComponent(query)}`

    const res = await fetch(sanityUrl)
    let post = null
    if (res.ok) {
      const json = await res.json()
      post = json?.result
    }

    if (post) {
      const postTitle = post.title || 'Blog Post'
      const fullTitle = `${postTitle} | Sahed Alom Sumit`
      const desc = post.excerpt || 'Read architectural insights, AI workflows, and front-end engineering notes by Sahed Alom Sumit.'
      
      let coverImage = post.coverImage || `${siteUrl}/img/og-image.webp`
      if (typeof coverImage === 'string') {
        coverImage = coverImage.trim()
        if (coverImage.startsWith('/')) {
          coverImage = `${siteUrl}${coverImage}`
        } else if (!coverImage.startsWith('http')) {
          coverImage = `${siteUrl}/${coverImage}`
        }
        // Optimize Sanity CDN images for social media cards (1200x630, JPG format, <300KB)
        if (coverImage.includes('cdn.sanity.io') && !coverImage.includes('w=')) {
          const sep = coverImage.includes('?') ? '&' : '?'
          coverImage = `${coverImage}${sep}w=1200&h=630&fit=crop&fm=jpg&q=80`
        }
      }

      const publishedIso = post.publishedAt || new Date().toISOString()
      const authorName = post.authorName || 'Sahed Alom Sumit'

      html = applyBlogMeta(html, {
        title: fullTitle,
        postTitle,
        description: desc,
        pageUrl,
        imageUrl: coverImage,
        publishedIso,
        authorName,
        siteUrl,
      })
    }

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=UTF-8',
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    })
  } catch (err) {
    if (html && html.includes('<head')) {
      return new Response(html, {
        status: 200,
        headers: {
          'content-type': 'text/html; charset=UTF-8',
        },
      })
    }
    return response
  }
}

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function setOrReplaceMeta(html, attr, name, content) {
  const regex = new RegExp(`<meta\\s+${attr}="${name}"\\s+content=".*?"\\s*\\/?>`, 'gi')
  const newTag = `<meta ${attr}="${name}" content="${content}" />`
  if (regex.test(html)) {
    let replaced = false
    return html.replace(regex, () => {
      if (!replaced) {
        replaced = true
        return newTag
      }
      return '' // Strip duplicate existing tags
    })
  }
  return html.replace('</head>', `    ${newTag}\n  </head>`)
}

function applyBlogMeta(html, { title, postTitle, description, pageUrl, imageUrl, publishedIso, authorName, siteUrl }) {
  let updated = html

  // 1. Title
  if (/<title>.*?<\/title>/i.test(updated)) {
    updated = updated.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
  } else {
    updated = updated.replace('</head>', `    <title>${escapeHtml(title)}</title>\n  </head>`)
  }

  // 2. Canonical
  if (/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i.test(updated)) {
    updated = updated.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`)
  } else {
    updated = updated.replace('</head>', `    <link rel="canonical" href="${pageUrl}" />\n  </head>`)
  }

  // 3. Standard Meta
  updated = setOrReplaceMeta(updated, 'name', 'description', escapeHtml(description))
  updated = setOrReplaceMeta(updated, 'name', 'author', escapeHtml(authorName))

  // 4. Open Graph
  updated = setOrReplaceMeta(updated, 'property', 'og:type', 'article')
  updated = setOrReplaceMeta(updated, 'property', 'og:url', pageUrl)
  updated = setOrReplaceMeta(updated, 'property', 'og:title', escapeHtml(title))
  updated = setOrReplaceMeta(updated, 'property', 'og:description', escapeHtml(description))
  updated = setOrReplaceMeta(updated, 'property', 'og:image', imageUrl)
  updated = setOrReplaceMeta(updated, 'property', 'og:image:secure_url', imageUrl)
  updated = setOrReplaceMeta(updated, 'property', 'og:image:type', 'image/jpeg')
  updated = setOrReplaceMeta(updated, 'property', 'og:image:alt', escapeHtml(postTitle))
  updated = setOrReplaceMeta(updated, 'property', 'og:image:width', '1200')
  updated = setOrReplaceMeta(updated, 'property', 'og:image:height', '630')
  updated = setOrReplaceMeta(updated, 'property', 'og:site_name', 'Sahed Alom Sumit')
  updated = setOrReplaceMeta(updated, 'property', 'article:published_time', publishedIso)
  updated = setOrReplaceMeta(updated, 'property', 'article:author', escapeHtml(authorName))

  // 5. Twitter Card
  updated = setOrReplaceMeta(updated, 'name', 'twitter:card', 'summary_large_image')
  updated = setOrReplaceMeta(updated, 'name', 'twitter:title', escapeHtml(title))
  updated = setOrReplaceMeta(updated, 'name', 'twitter:description', escapeHtml(description))
  updated = setOrReplaceMeta(updated, 'name', 'twitter:image', imageUrl)
  updated = setOrReplaceMeta(updated, 'name', 'twitter:image:alt', escapeHtml(postTitle))
  updated = setOrReplaceMeta(updated, 'name', 'twitter:creator', '@sahedalomsumit')
  updated = setOrReplaceMeta(updated, 'name', 'twitter:site', '@sahedalomsumit')

  // 6. Article JSON-LD Structured Data
  const articleSchema = `\n    <script type="application/ld+json" id="article-schema">\n    {\n      "@context": "https://schema.org",\n      "@type": "BlogPosting",\n      "headline": ${JSON.stringify(postTitle)},\n      "image": [${JSON.stringify(imageUrl)}],\n      "datePublished": ${JSON.stringify(publishedIso)},\n      "author": {\n        "@type": "Person",\n        "name": ${JSON.stringify(authorName)},\n        "url": ${JSON.stringify(siteUrl)}\n      },\n      "publisher": {\n        "@type": "Person",\n        "name": "Sahed Alom Sumit",\n        "url": ${JSON.stringify(siteUrl)},\n        "logo": {\n          "@type": "ImageObject",\n          "url": "${siteUrl}/img/favicon-sahed-alom-sumit.png"\n        }\n      },\n      "description": ${JSON.stringify(description)},\n      "mainEntityOfPage": {\n        "@type": "WebPage",\n        "@id": ${JSON.stringify(pageUrl)}\n      }\n    }\n    </script>`

  if (updated.includes('id="article-schema"')) {
    updated = updated.replace(/<script type="application\/ld\+json" id="article-schema">[\s\S]*?<\/script>/, articleSchema.trim())
  } else {
    updated = updated.replace('</head>', `${articleSchema}\n  </head>`)
  }

  return updated
}
