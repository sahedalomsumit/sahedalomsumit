import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Configuration
const SITE_URL = 'https://sahedalomsumit.com'
const SUPABASE_URL = 'https://zcfvrxvttbyhmemdyxfw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjZnZyeHZ0dGJ5aG1lbWR5eGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI5MDAsImV4cCI6MjA5MDIwODkwMH0.I4up28xh08dzrug3VQ28rMuEsfBq49mKji1DPlc71yU'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml')

// Static routes from App.jsx
const STATIC_ROUTES = [
  '/',
  '/work',
  '/process',
  '/faq',
  '/blog',
  '/services',
  '/services/ui-ux-design',
  '/services/full-stack-development',
  '/services/low-no-code-development',
  '/services/framer',
  '/services/kajabi',
  '/services/app-development',
  '/estimate'
]

async function generateSitemap() {
  console.log('--- INITIALIZING SITEMAP GENERATION ---')
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  // 1. Fetch Dynamic Slugs from Supabase
  console.log('Fetching project slugs...')
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('slug, created_at')
  
  if (projectsError) {
    console.error('Error fetching projects:', projectsError)
    process.exit(1)
  }

  const projectRoutes = projects.map(p => ({
    url: `/work/${p.slug}`,
    lastmod: p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  }))

  console.log(`Discovered ${projectRoutes.length} project pages.`)

  // 1b. Fetch Dynamic Blog Slugs from Sanity CMS
  console.log('Fetching blog post slugs from Sanity CMS...')
  let blogRoutes = []
  try {
    const sanityUrl = `https://vbkdnotg.api.sanity.io/v2024-03-01/data/query/production?query=${encodeURIComponent('*[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }')}`
    const res = await fetch(sanityUrl)
    const json = await res.json()
    const posts = json?.result || []
    blogRoutes = posts.map(b => ({
      url: `/blog/${b.slug}`,
      lastmod: b.publishedAt ? new Date(b.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    }))
  } catch (err) {
    console.warn('Could not fetch blog posts from Sanity for sitemap, continuing:', err)
  }

  console.log(`Discovered ${blogRoutes.length} blog post pages.`)

  // 2. Build XML string
  const today = new Date().toISOString().split('T')[0]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // Add Static Routes
  STATIC_ROUTES.forEach(route => {
    xml += `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>\n`
  })

  // Add Dynamic Project Routes
  projectRoutes.forEach(route => {
    xml += `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`
  })

  // Add Dynamic Blog Routes
  blogRoutes.forEach(route => {
    xml += `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>\n`
  })

  xml += '</urlset>'

  // 3. Write to public/sitemap.xml
  fs.writeFileSync(OUTPUT_FILE, xml)
  console.log(`SUCCESS: Sitemap saved to ${OUTPUT_FILE}`)
}

generateSitemap().catch(err => {
  console.error('CRITICAL ERROR:', err)
  process.exit(1)
})
