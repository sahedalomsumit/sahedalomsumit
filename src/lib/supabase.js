import { createClient } from '@supabase/supabase-js'
import { fallbackBlogPosts } from '../data/blogPosts'

// These will be set when you create a Supabase project
// For now, the app uses local data from src/data/projects.js
// To switch to Supabase:
// 1. Create a free account at https://supabase.com
// 2. Create a new project
// 3. Create the "projects" table using the schema in the README
// 4. Add your URL and anon key below
// 5. Update the data fetching in hooks/useProjects.js

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => !!supabase

// Map Supabase snake_case database fields to camelCase expected by components
export function mapProject(project) {
  if (!project) return null
  return {
    ...project,
    shortDescription: project.short_description,
    fullDescription: project.full_description,
    keyFeatures: project.key_features || [],
    techStack: project.tech_stack || [],
    liveUrl: project.live_url,
    thumbnailUrl: project.thumbnail_url,
    galleryUrls: project.gallery_urls || [],
    isFeatured: project.is_featured,
    displayOrder: project.display_order,
  }
}

// Supabase query helpers (use these when Supabase is set up)
export async function fetchProjects() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) { console.error('Error fetching projects:', error); return [] }
  return data.map(mapProject)
}

export async function fetchFeaturedProjects() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('display_order', { ascending: true })

  if (error) { console.error('Error fetching featured projects:', error); return [] }
  return data.map(mapProject)
}

export async function fetchProjectBySlug(slug) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) { console.error('Error fetching project:', error); return null }
  return mapProject(data)
}

export async function fetchAdjacentProjects(slug) {
  if (!supabase) return { prev: null, next: null }

  const { data: allProjects, error } = await supabase
    .from('projects')
    .select('slug, title, industry, display_order')
    .order('display_order', { ascending: true })

  if (error || !allProjects || allProjects.length === 0) {
    return { prev: null, next: null }
  }

  const idx = allProjects.findIndex(p => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }

  const prev = idx > 0 ? allProjects[idx - 1] : allProjects[allProjects.length - 1]
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : allProjects[0]

  return { prev, next }
}

export async function fetchFaqs() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) { console.error('Error fetching faqs:', error); return [] }
  return data
}
export async function uploadBlueprintPdf(file, fileName) {
  if (!supabase) return { error: 'Supabase not configured' }
  const { data, error } = await supabase.storage
    .from('blueprints')
    .upload(fileName, file, {
      contentType: 'application/pdf',
      upsert: true
    })

  if (error) { console.error('Error uploading PDF:', error); return { error } }
  return { data }
}

export async function submitEstimateLead(leadData) {
  if (!supabase) return { error: 'Supabase not configured' }
  const { data, error } = await supabase
    .from('blueprint_leads')
    .insert([leadData])

  if (error) { console.error('Error submitting lead:', error); return { error } }
  return { data }
}

export const submitQuoteLead = submitEstimateLead

export async function submitSpaLead(leadData) {
  if (!supabase) return { error: 'Supabase not configured' }
  const { data, error } = await supabase
    .from('spa_burn')
    .insert([leadData])

  if (error) { console.error('Error submitting spa lead:', error); return { error } }
  return { data }
}

// ── Blog Posts System ──────────────────────────────────

// Calculate reading time automatically based on word count (~200 words per minute)
export function calculateReadingTime(content) {
  if (!content) return '1 min read'
  const clean = content
    .replace(/```[\s\S]*?```/g, '') // remove code blocks from word count
    .replace(/<[^>]*>/g, '')
    .replace(/[#*`_~[\]()-]/g, ' ')
    .trim()
  const words = clean.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

// Map Supabase snake_case database fields to camelCase for blog posts
export function mapBlogPost(post) {
  if (!post) return null
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.cover_image,
    category: post.category,
    tags: post.tags || [],
    authorName: post.author_name || 'Sahed Alom Sumit',
    authorRole: post.author_role || 'Product Designer & AI-Enhanced Web Developer',
    authorAvatar: post.author_avatar || '/img/sahedalomsumit-profile-purple.png',
    readingTime: calculateReadingTime(post.content),
    publishedAt: post.published_at,
    isPublished: post.is_published,
    isFeatured: post.is_featured,
    views: typeof post.views === 'number' ? post.views : 0,
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
  }
}

// Fetch published blog posts with optional category/tag filters
export async function fetchBlogPosts({ category = null, tag = null, limit = null, featuredOnly = false } = {}) {
  if (!supabase) {
    let posts = [...fallbackBlogPosts]
    if (category && category !== 'All') {
      posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase())
    }
    if (tag) {
      posts = posts.filter(p => p.tags.includes(tag))
    }
    if (featuredOnly) {
      posts = posts.filter(p => p.isFeatured)
    }
    if (limit) {
      posts = posts.slice(0, limit)
    }
    return posts
  }

  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (category && category !== 'All') {
      query = query.eq('category', category)
    }
    if (featuredOnly) {
      query = query.eq('is_featured', true)
    }
    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching blog posts from Supabase, using fallback:', error)
      return fallbackBlogPosts
    }

    let results = (data || []).map(mapBlogPost)
    if (tag) {
      results = results.filter(p => p.tags?.includes(tag))
    }
    return results.length > 0 ? results : fallbackBlogPosts
  } catch (err) {
    console.error('Exception fetching blog posts:', err)
    return fallbackBlogPosts
  }
}

// Fetch single blog post by slug
export async function fetchBlogPostBySlug(slug) {
  if (!supabase) {
    return fallbackBlogPosts.find(p => p.slug === slug) || null
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) {
      console.error('Error fetching blog post by slug from Supabase, using fallback:', error)
      return fallbackBlogPosts.find(p => p.slug === slug) || null
    }

    return mapBlogPost(data)
  } catch (err) {
    console.error('Exception fetching blog post by slug:', err)
    return fallbackBlogPosts.find(p => p.slug === slug) || null
  }
}

// Fetch adjacent blog posts for navigation
export async function fetchAdjacentBlogPosts(slug) {
  const allPosts = await fetchBlogPosts()
  if (!allPosts || allPosts.length === 0) return { prev: null, next: null }

  const idx = allPosts.findIndex(p => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }

  const prev = idx > 0 ? allPosts[idx - 1] : null
  const next = idx < allPosts.length - 1 ? allPosts[idx + 1] : null

  return { prev, next }
}

// Increment post views via database RPC and return real-time updated count
export async function incrementBlogPostViews(slug) {
  if (!supabase) return null
  try {
    const { data, error } = await supabase.rpc('increment_blog_post_views', { post_slug: slug })
    if (error) {
      console.warn('Could not increment post views:', error)
      return null
    }
    return data
  } catch (err) {
    console.warn('Could not increment post views:', err)
    return null
  }
}

