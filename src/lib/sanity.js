import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { fallbackBlogPosts } from '../data/blogPosts'

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'vbkdnotg'
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

/**
 * Generate optimized image URL from Sanity image asset or fallback string URL
 */
export function urlFor(source) {
  if (!source) return ''
  if (typeof source === 'string') return source
  if (source.asset && source.asset._ref) {
    return builder.image(source).auto('format').fit('max')
  }
  return ''
}

/**
 * Calculate reading time from Portable Text blocks or plain text
 */
export function calculateReadingTime(body) {
  if (!body) return '1 min read'
  let text = ''
  if (typeof body === 'string') {
    text = body
  } else if (Array.isArray(body)) {
    text = body
      .filter((block) => block._type === 'block' && block.children)
      .map((block) => block.children.map((child) => child.text).join(' '))
      .join(' ')
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export const STATIC_AUTHOR = {
  name: 'Sahed Alom Sumit',
  role: 'Product Designer & AI-Enhanced Web Developer',
  avatar: '/img/sahedalomsumit-profile-purple.png',
  description: 'With 5+ years of experience, I’ve worked with founders, brands, and agencies worldwide, turning rough ideas into 150+ digital products that are fast, user-friendly, visually polished, and built to support real business goals.',
}

/**
 * Map Sanity document fields to frontend-friendly camelCase object
 */
export function mapSanityPost(post) {
  if (!post) return null

  let coverImageUrl = ''
  if (post.coverImage) {
    if (typeof post.coverImage === 'string') {
      coverImageUrl = post.coverImage
    } else if (post.coverImage.asset) {
      try {
        coverImageUrl = urlFor(post.coverImage).url()
      } catch (e) {
        console.warn('Failed to build cover image URL:', e)
      }
    }
  }

  return {
    id: post._id,
    slug: typeof post.slug === 'string' ? post.slug : post.slug?.current,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body || null,
    content: typeof post.content === 'string' ? post.content : null,
    coverImage: coverImageUrl || post.coverImage?.asset?.url || '',
    category: post.category || 'General',
    tags: post.tags || [],
    authorName: STATIC_AUTHOR.name,
    authorRole: STATIC_AUTHOR.role,
    authorAvatar: STATIC_AUTHOR.avatar,
    authorDescription: STATIC_AUTHOR.description,
    readingTime: post.readingTime || calculateReadingTime(post.body || post.content),
    publishedAt: post.publishedAt || post._createdAt,
    isFeatured: Boolean(post.isFeatured),
    views: typeof post.views === 'number' ? post.views : 0,
    seoTitle: post.title,
    seoDescription: post.excerpt,
  }
}

/**
 * Fetch all published blog posts with optional filtering
 */
export async function fetchBlogPosts({ category = null, limit = null, featuredOnly = false } = {}) {
  try {
    let filter = `_type == "post" && defined(slug.current)`
    if (category && category !== 'All') {
      filter += ` && category == "${category}"`
    }
    if (featuredOnly) {
      filter += ` && isFeatured == true`
    }

    const limitClause = limit ? `[0...${limit}]` : ''
    const query = `*[${filter}] | order(publishedAt desc) ${limitClause} {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      category,
      tags,
      readingTime,
      publishedAt,
      isFeatured,
      views
    }`

    const posts = await sanityClient.fetch(query)

    if (posts && posts.length > 0) {
      return posts.map(mapSanityPost)
    }

    // Graceful fallback to static posts if Sanity dataset is still empty
    return fallbackBlogPosts
  } catch (err) {
    console.error('Error fetching blog posts from Sanity, using fallback:', err)
    return fallbackBlogPosts
  }
}

/**
 * Fetch single post by slug
 */
export async function fetchBlogPostBySlug(slug) {
  if (!slug) return null
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      body,
      content,
      category,
      tags,
      readingTime,
      publishedAt,
      isFeatured,
      views
    }`

    const post = await sanityClient.fetch(query, { slug })

    if (post) {
      return mapSanityPost(post)
    }

    // Check fallback posts if not found in Sanity
    return fallbackBlogPosts.find((p) => p.slug === slug) || null
  } catch (err) {
    console.error(`Error fetching post by slug (${slug}) from Sanity:`, err)
    return fallbackBlogPosts.find((p) => p.slug === slug) || null
  }
}

/**
 * Fetch adjacent (previous and next) posts for navigation
 */
export async function fetchAdjacentBlogPosts(slug) {
  try {
    const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      category
    }`
    const allPosts = await sanityClient.fetch(query)

    if (!allPosts || allPosts.length === 0) {
      // Use fallback
      const idx = fallbackBlogPosts.findIndex((p) => p.slug === slug)
      if (idx === -1) return { prev: null, next: null }
      const prev = idx > 0 ? fallbackBlogPosts[idx - 1] : fallbackBlogPosts[fallbackBlogPosts.length - 1]
      const next = idx < fallbackBlogPosts.length - 1 ? fallbackBlogPosts[idx + 1] : fallbackBlogPosts[0]
      return { prev, next }
    }

    const idx = allPosts.findIndex((p) => p.slug === slug)
    if (idx === -1) return { prev: null, next: null }

    const prev = idx > 0 ? allPosts[idx - 1] : allPosts[allPosts.length - 1]
    const next = idx < allPosts.length - 1 ? allPosts[idx + 1] : allPosts[0]

    return { prev, next }
  } catch (err) {
    console.error('Error fetching adjacent blog posts from Sanity:', err)
    return { prev: null, next: null }
  }
}
