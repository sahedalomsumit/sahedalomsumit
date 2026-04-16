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
  '/process',
  '/portfolio',
  '/faq',
  '/services',
  '/services/figma-design',
  '/services/webflow-development',
  '/services/wordpress-development',
  '/services/framer-development',
  '/services/custom-development',
  '/services/ai-automation',
  '/services/seo-optimization',
  '/quote',
  '/salah-tracker',
  '/salah-tracker/privacy-policy',
  '/salah-tracker/data-deletion'
]

async function generateSitemap() {
  console.log('--- INITIALIZING SITEMAP GENERATION ---')
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  // 1. Fetch Dynamic Slugs from Supabase
  console.log('Fetching project slugs...')
  const { data: projects, error } = await supabase
    .from('projects')
    .select('slug, created_at')
  
  if (error) {
    console.error('Error fetching projects:', error)
    process.exit(1)
  }

  const projectRoutes = projects.map(p => ({
    url: `/portfolio/${p.slug}`,
    lastmod: p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  }))

  console.log(`Discovered ${projectRoutes.length} project pages.`)

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

  xml += '</urlset>'

  // 3. Write to public/sitemap.xml
  fs.writeFileSync(OUTPUT_FILE, xml)
  console.log(`SUCCESS: Sitemap saved to ${OUTPUT_FILE}`)
}

generateSitemap().catch(err => {
  console.error('CRITICAL ERROR:', err)
  process.exit(1)
})
