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
  const trimmed = url.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${SITE_URL}${cleanPath}`
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
    const sanityUrl = `https://vbkdnotg.api.sanity.io/v2024-03-01/data/query/production?query=${encodeURIComponent('*[_type == "post" && defined(slug.current)]{ "slug": slug.current, title, excerpt, "cover_image": coverImage.asset->url, "published_at": publishedAt, "author_name": authorName }')}`
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

    // 1. Replace Title
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`)

    // 2. Replace Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(postDesc)}" />`
    )

    // 3. Replace Canonical Link
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${pageUrl}" />`
    )

    // 4. Replace OpenGraph Tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:type" content="article" />`
    )
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${pageUrl}" />`
    )
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`
    )
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(postDesc)}" />`
    )
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:image" content="${postImage}" />\n    <meta property="og:image:secure_url" content="${postImage}" />\n    <meta property="og:image:alt" content="${escapeHtml(postTitle)}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="article:published_time" content="${publishedIso}" />\n    <meta property="article:author" content="${escapeHtml(authorName)}" />`
    )

    // 5. Replace Twitter Card Tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:card"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:card" content="summary_large_image" />`
    )
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`
    )
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:image" content="${postImage}" />\n    <meta name="twitter:image:alt" content="${escapeHtml(postTitle)}" />\n    <meta name="twitter:description" content="${escapeHtml(postDesc)}" />\n    <meta name="twitter:creator" content="@sahedalomsumit" />\n    <meta name="twitter:site" content="@sahedalomsumit" />`
    )

    // 6. Inject Article JSON-LD Schema
    const articleSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": ${JSON.stringify(postTitle)},
      "image": [${JSON.stringify(postImage)}],
      "datePublished": ${JSON.stringify(publishedIso)},
      "author": {
        "@type": "Person",
        "name": ${JSON.stringify(authorName)},
        "url": ${JSON.stringify(SITE_URL)}
      },
      "publisher": {
        "@type": "Person",
        "name": "Sahed Alom Sumit",
        "url": ${JSON.stringify(SITE_URL)},
        "logo": {
          "@type": "ImageObject",
          "url": "${SITE_URL}/img/favicon-sahed-alom-sumit.png"
        }
      },
      "description": ${JSON.stringify(postDesc)},
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": ${JSON.stringify(pageUrl)}
      }
    }
    </script>`
    pageHtml = pageHtml.replace('</head>', `${articleSchema}\n  </head>`)

    // 7. Write to dist/blog/${slug}/index.html
    const targetDir = path.join(DIST_DIR, 'blog', slug)
    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml)
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
        projHtml = projHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(projTitle)}</title>`)
        projHtml = projHtml.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(projDesc)}" />`)
        projHtml = projHtml.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${projUrl}" />`)
        projHtml = projHtml.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${projUrl}" />`)
        projHtml = projHtml.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(projTitle)}" />`)
        projHtml = projHtml.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(projDesc)}" />`)
        projHtml = projHtml.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${projImage}" />\n    <meta property="og:image:secure_url" content="${projImage}" />\n    <meta property="og:image:alt" content="${escapeHtml(proj.title)}" />`)
        projHtml = projHtml.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(projTitle)}" />`)
        projHtml = projHtml.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${projImage}" />\n    <meta name="twitter:image:alt" content="${escapeHtml(proj.title)}" />\n    <meta name="twitter:description" content="${escapeHtml(projDesc)}" />`)

        const targetDir = path.join(DIST_DIR, 'work', proj.slug)
        fs.mkdirSync(targetDir, { recursive: true })
        fs.writeFileSync(path.join(targetDir, 'index.html'), projHtml)
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
