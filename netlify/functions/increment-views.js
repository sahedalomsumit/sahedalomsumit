import { createClient } from '@sanity/client'

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'vbkdnotg'
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2024-03-01'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.VITE_SANITY_API_WRITE_TOKEN

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { slug, postId } = JSON.parse(event.body || '{}')
    if (!slug && !postId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing slug or postId' }),
      }
    }

    if (!token) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          warning: 'SANITY_API_WRITE_TOKEN not configured in Netlify environment variables',
          views: null,
        }),
      }
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    })

    let docId = postId
    if (!docId) {
      const doc = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{ _id }`, { slug })
      docId = doc?._id
    }

    if (!docId) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Post not found in Sanity' }),
      }
    }

    const res = await client
      .patch(docId)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit({ autoGenerateArrayKeys: true })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ views: typeof res.views === 'number' ? res.views : 1, id: docId }),
    }
  } catch (error) {
    console.error('Error incrementing views in Sanity:', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    }
  }
}
