import { createClient } from '@supabase/supabase-js'

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

