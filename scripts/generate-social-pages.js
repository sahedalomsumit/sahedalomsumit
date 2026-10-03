import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { fallbackBlogPosts } from '../src/data/blogPosts.js'

const SITE_URL = 'https://sahedalomsumit.com'
const SUPABASE_URL = 'https://zcfvrxvttbyhmemdyxfw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjZnZyeHZ0dGJ5aG1lbWR5eGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI5MDAsImV4cCI6MjA5MDIwODkwMH0.I4up28xh08dzrug3VQ28rMuEsfBq49mKji1DPlc71yU'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.join(__dirname, '../dist')
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html')

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function toAbsoluteUrl(url) {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return `${SITE_URL}/img/og-image.webp`
  }
  let trimmed = url.trim()
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    trimmed = `${SITE_URL}${cleanPath}`
  }
  // Optimize Sanity images for social preview cards (1200x630, JPG format, <300KB for WhatsApp/X/LinkedIn)
  if (trimmed.includes('cdn.sanity.io') && !trimmed.includes('w=')) {
    const separator = trimmed.includes('?') ? '&' : '?'
    return `${trimmed}${separator}w=1200&h=630&fit=crop&fm=jpg&q=80`
  }
  return trimmed
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
      return ''
    })
  }
  return html.replace('</head>', `    ${newTag}\n  </head>`)
}

async function generateSocialPages() {
  console.log('--- GENERATING STATIC SOCIAL PREVIEW PAGES ---')

  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error(`ERROR: ${INDEX_HTML_PATH} does not exist. Run vite build first.`)
    process.exit(1)
  }

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8')
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  // 1. Fetch Blog Posts from Sanity CMS
  let posts = []
  try {
    const sanityUrl = `https://vbkdnotg.api.sanity.io/v2024-03-01/data/query/production?query=${encodeURIComponent('*[_type == "post" && defined(slug.current)]{ "slug": slug.current, title, excerpt, "cover_image": coalesce(coverImage.asset->url, coverImage), "published_at": publishedAt, "author_name": authorName }')}`
    const res = await fetch(sanityUrl)
    const json = await res.json()
    const sanityPosts = json?.result || []

    if (sanityPosts.length > 0) {
      posts = [...sanityPosts]
      const existingSlugs = new Set(sanityPosts.map(p => p.slug))
      for (const fb of fallbackBlogPosts) {
        if (!existingSlugs.has(fb.slug)) {
          posts.push({
            slug: fb.slug,
            title: fb.title,
            excerpt: fb.excerpt,
            cover_image: fb.coverImage,
            published_at: fb.publishedAt,
            author_name: fb.authorName,
          })
        }
      }
    } else {
      posts = fallbackBlogPosts
    }
  } catch (err) {
    console.warn('Could not fetch from Sanity, using fallback posts:', err)
    posts = fallbackBlogPosts
  }

  console.log(`Generating social pages for ${posts.length} blog posts...`)

  for (const post of posts) {
    const slug = post.slug
    if (!slug) continue

    const postTitle = post.title || 'Blog Details'
    const fullTitle = `${postTitle} | Sahed Alom Sumit`
    const postDesc = post.excerpt || 'Read architectural insights, AI workflows, and front-end engineering notes by Sahed Alom Sumit.'
    const postImage = toAbsoluteUrl(post.cover_image || post.coverImage)
    const pageUrl = `${SITE_URL}/blog/${slug}`
    const publishedIso = post.published_at || post.publishedAt || new Date().toISOString()
    const authorName = post.author_name || post.authorName || 'Sahed Alom Sumit'

    let pageHtml = baseHtml

    // 1. Title
    if (/<title>.*?<\/title>/i.test(pageHtml)) {
      pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`)
    } else {
      pageHtml = pageHtml.replace('</head>', `    <title>${escapeHtml(fullTitle)}</title>\n  </head>`)
    }

    // 2. Canonical Link
    if (/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i.test(pageHtml)) {
      pageHtml = pageHtml.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`)
    } else {
      pageHtml = pageHtml.replace('</head>', `    <link rel="canonical" href="${pageUrl}" />\n  </head>`)
    }

    // 3. Description & Author
    pageHtml = setOrReplaceMeta(pageHtml, 'name', 'description', escapeHtml(postDesc))
    pageHtml = setOrReplaceMeta(pageHtml, 'name', 'author', escapeHtml(authorName))

    // 4. OpenGraph Tags
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:type', 'article')
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:url', pageUrl)
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:title', escapeHtml(fullTitle))
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:description', escapeHtml(postDesc))
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:image', postImage)
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:image:secure_url', postImage)
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:image:type', 'image/jpeg')
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:image:alt', escapeHtml(postTitle))
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:image:width', '1200')
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:image:height', '630')
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'og:site_name', 'Sahed Alom Sumit')
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'article:published_time', publishedIso)
    pageHtml = setOrReplaceMeta(pageHtml, 'property', 'article:author', escapeHtml(authorName))

    // 5. Twitter Card Tags
    pageHtml = setOrReplaceMeta(pageHtml, 'name', 'twitter:card', 'summary_large_image')
    pageHtml = setOrReplaceMeta(pageHtml, 'name', 'twitter:title', escapeHtml(fullTitle))
    pageHtml = setOrReplaceMeta(pageHtml, 'name', 'twitter:description', escapeHtml(postDesc))
    pageHtml = setOrReplaceMeta(pageHtml, 'name', 'twitter:image', postImage)
    pageHtml = setOrReplaceMeta(pageHtml, 'name', 'twitter:image:alt', escapeHtml(postTitle))
    pageHtml = setOrReplaceMeta(pageHtml, 'name', 'twitter:creator', '@sahedalomsumit')
    pageHtml = setOrReplaceMeta(pageHtml, 'name', 'twitter:site', '@sahedalomsumit')

    // 6. Article JSON-LD Schema
    const articleSchema = `\n    <script type="application/ld+json" id="article-schema">\n    {\n      "@context": "https://schema.org",\n      "@type": "BlogPosting",\n      "headline": ${JSON.stringify(postTitle)},\n      "image": [${JSON.stringify(postImage)}],\n      "datePublished": ${JSON.stringify(publishedIso)},\n      "author": {\n        "@type": "Person",\n        "name": ${JSON.stringify(authorName)},\n        "url": ${JSON.stringify(SITE_URL)}\n      },\n      "publisher": {\n        "@type": "Person",\n        "name": "Sahed Alom Sumit",\n        "url": ${JSON.stringify(SITE_URL)},\n        "logo": {\n          "@type": "ImageObject",\n          "url": "${SITE_URL}/img/favicon-sahed-alom-sumit.png"\n        }\n      },\n      "description": ${JSON.stringify(postDesc)},\n      "mainEntityOfPage": {\n        "@type": "WebPage",\n        "@id": ${JSON.stringify(pageUrl)}\n      }\n    }\n    </script>`

    if (pageHtml.includes('id="article-schema"')) {
      pageHtml = pageHtml.replace(/<script type="application\/ld\+json" id="article-schema">[\s\S]*?<\/script>/, articleSchema.trim())
    } else {
      pageHtml = pageHtml.replace('</head>', `${articleSchema}\n  </head>`)
    }

    // 7. Write to BOTH dist/blog/${slug}/index.html AND dist/blog/${slug}.html
    // This allows Netlify to cleanly serve requests WITH or WITHOUT trailing slash without 301 redirects!
    const targetDir = path.join(DIST_DIR, 'blog', slug)
    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml)
    fs.writeFileSync(path.join(DIST_DIR, 'blog', `${slug}.html`), pageHtml)
  }

  // 2. Also pre-render project work case studies
  try {
    const { data: projects } = await supabase.from('projects').select('*')
    if (projects && projects.length > 0) {
      console.log(`Generating social pages for ${projects.length} project case studies...`)
      for (const proj of projects) {
        if (!proj.slug) continue
        const projTitle = `${proj.title} — Case Study | Sahed Alom Sumit`
        const projDesc = proj.short_description || 'Explore detailed project insights and technical implementation by Sahed Alom Sumit.'
        const projImage = toAbsoluteUrl(proj.thumbnail_url)
        const projUrl = `${SITE_URL}/work/${proj.slug}`

        let projHtml = baseHtml

        if (/<title>.*?<\/title>/i.test(projHtml)) {
          projHtml = projHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(projTitle)}</title>`)
        } else {
          projHtml = projHtml.replace('</head>', `    <title>${escapeHtml(projTitle)}</title>\n  </head>`)
        }

        if (/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i.test(projHtml)) {
          projHtml = projHtml.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${projUrl}" />`)
        } else {
          projHtml = projHtml.replace('</head>', `    <link rel="canonical" href="${projUrl}" />\n  </head>`)
        }

        projHtml = setOrReplaceMeta(projHtml, 'name', 'description', escapeHtml(projDesc))
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:type', 'website')
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:url', projUrl)
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:title', escapeHtml(projTitle))
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:description', escapeHtml(projDesc))
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:image', projImage)
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:image:secure_url', projImage)
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:image:type', 'image/jpeg')
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:image:alt', escapeHtml(proj.title))
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:image:width', '1200')
        projHtml = setOrReplaceMeta(projHtml, 'property', 'og:image:height', '630')

        projHtml = setOrReplaceMeta(projHtml, 'name', 'twitter:card', 'summary_large_image')
        projHtml = setOrReplaceMeta(projHtml, 'name', 'twitter:title', escapeHtml(projTitle))
        projHtml = setOrReplaceMeta(projHtml, 'name', 'twitter:description', escapeHtml(projDesc))
        projHtml = setOrReplaceMeta(projHtml, 'name', 'twitter:image', projImage)
        projHtml = setOrReplaceMeta(projHtml, 'name', 'twitter:image:alt', escapeHtml(proj.title))

        const targetDir = path.join(DIST_DIR, 'work', proj.slug)
        fs.mkdirSync(targetDir, { recursive: true })
        fs.writeFileSync(path.join(targetDir, 'index.html'), projHtml)
        fs.writeFileSync(path.join(DIST_DIR, 'work', `${proj.slug}.html`), projHtml)
      }
    }
  } catch (err) {
    console.warn('Non-fatal: Error generating project social pages:', err)
  }

  console.log('SUCCESS: All social preview pages generated successfully in dist/')
}

generateSocialPages().catch(err => {
  console.error('CRITICAL ERROR in generateSocialPages:', err)
  process.exit(1)
})
