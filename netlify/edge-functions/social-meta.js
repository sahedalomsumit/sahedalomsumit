export default async function handler(request, context) {
  const url = new URL(request.url)
  const pathname = url.pathname

  // Match /blog/:slug
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/)
  if (!match) {
    return context.next()
  }

  const slug = match[1]
  // Do not intercept admin dashboard or creation pages
  if (slug === 'admin' || slug === 'new') {
    return context.next()
  }

  // Get original response
  const response = await context.next()
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/html')) {
    return response
  }

  try {
    const supabaseUrl = 'https://zcfvrxvttbyhmemdyxfw.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjZnZyeHZ0dGJ5aG1lbWR5eGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI5MDAsImV4cCI6MjA5MDIwODkwMH0.I4up28xh08dzrug3VQ28rMuEsfBq49mKji1DPlc71yU'

    const res = await fetch(`${supabaseUrl}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })

    if (!res.ok) return response
    const posts = await res.json()
    if (!posts || posts.length === 0) return response

    const post = posts[0]
    let html = await response.text()

    const siteUrl = 'https://sahedalomsumit.com'
    const postTitle = post.seo_title || post.title || 'Blog Post'
    const fullTitle = `${postTitle} | Sahed Alom Sumit`
    const desc = post.seo_description || post.excerpt || ''
    
    let coverImage = post.cover_image || `${siteUrl}/img/og-image.webp`
    if (coverImage.startsWith('/')) {
      coverImage = `${siteUrl}${coverImage}`
    } else if (!coverImage.startsWith('http')) {
      coverImage = `${siteUrl}/${coverImage}`
    }
    const pageUrl = `${siteUrl}/blog/${slug}`
    const publishedIso = post.published_at || new Date().toISOString()
    const authorName = post.author_name || 'Sahed Alom Sumit'

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`)

    // Replace description
    html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(desc)}" />`)

    // Replace canonical
    html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`)

    // Replace OG tags
    html = html.replace(/<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i, `<meta property="og:type" content="article" />`)
    html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${pageUrl}" />`)
    html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`)
    html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(desc)}" />`)
    html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${coverImage}" />\n    <meta property="og:image:secure_url" content="${coverImage}" />\n    <meta property="og:image:alt" content="${escapeHtml(postTitle)}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="article:published_time" content="${publishedIso}" />\n    <meta property="article:author" content="${escapeHtml(authorName)}" />`)

    // Replace Twitter tags
    html = html.replace(/<meta\s+name="twitter:card"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:card" content="summary_large_image" />`)
    html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`)
    html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${coverImage}" />\n    <meta name="twitter:image:alt" content="${escapeHtml(postTitle)}" />\n    <meta name="twitter:description" content="${escapeHtml(desc)}" />\n    <meta name="twitter:creator" content="@sahedalomsumit" />\n    <meta name="twitter:site" content="@sahedalomsumit" />`)

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=UTF-8',
        'cache-control': 'public, max-age=0, must-revalidate'
      }
    })
  } catch (err) {
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
