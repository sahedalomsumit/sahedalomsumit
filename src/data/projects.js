/**
 * ALL PROJECTS DATA HAS BEEN MIGRATED TO SUPABASE.
 * 
 * This file is kept as an empty placeholder to prevent unresolved import errors 
 * in case any lingering references exist in the codebase, but the live application 
 * now fetches dynamically via src/lib/supabase.js.
 */

const projects = []

export function getProjects() {
  return []
}

export function getFeaturedProjects() {
  return []
}

export function getProjectBySlug(slug) {
  return null
}

export function getAdjacentProjects(slug) {
  return { prev: null, next: null }
}

export default projects

