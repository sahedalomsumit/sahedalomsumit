import { useEffect } from 'react'

const BASE_TITLE = 'Sahed Alom Sumit'
const DEFAULT_IMAGE = 'https://sahedalomsumit.com/img/og-image.webp'
const SITE_URL = 'https://sahedalomsumit.com'
const DEFAULT_DESCRIPTION = "Sahed Alom Sumit is a Product Designer & AI-Enhanced Web Developer based in Helsinki, Finland. I build websites that feel alive — where good design meets clean code, and every scroll tells a story."

export function formatDocumentTitle(title) {
  if (!title || !title.trim()) {
    return `${BASE_TITLE} | Product Designer & AI-Enhanced Web Developer`
  }

  let clean = title.trim()

  // Remove any redundant trailing separator + "Sahed Alom Sumit" (e.g. " | Sahed Alom Sumit")
  const trailingRegex = new RegExp(`\\s*[|—–-]\\s*${BASE_TITLE}$`, 'i')
  while (trailingRegex.test(clean)) {
    clean = clean.replace(trailingRegex, '').trim()
  }

  if (!clean) {
    return `${BASE_TITLE} | Product Designer & AI-Enhanced Web Developer`
  }

  // If the title already starts with "Sahed Alom Sumit" (e.g. Home page title), do not append duplicate to the end
  if (clean.toLowerCase().startsWith(BASE_TITLE.toLowerCase())) {
    return clean
  }

  return `${clean} | ${BASE_TITLE}`
}

export function toAbsoluteUrl(url) {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return DEFAULT_IMAGE
  }
  const trimmed = url.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${SITE_URL}${cleanPath}`
}

function setMeta(selector, attribute, value) {
  if (!value) return
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    if (selector.startsWith('meta[name=')) {
      const match = selector.match(/name="([^"]+)"/)
      if (match) el.setAttribute('name', match[1])
    } else if (selector.startsWith('meta[property=')) {
      const match = selector.match(/property="([^"]+)"/)
      if (match) el.setAttribute('property', match[1])
    }
    document.head.appendChild(el)
  }
  el.setAttribute(attribute, value)
}

export function useSEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  publishedTime,
  author,
  tags = [],
  noindex = false,
}) {
  useEffect(() => {
    // 1. Title Tag
    const fullTitle = formatDocumentTitle(title)
    document.title = fullTitle

    // 2. Description & Image
    const activeDescription = description || DEFAULT_DESCRIPTION
    const activeImage = toAbsoluteUrl(image)
    const fullCanonical = canonical
      ? `${SITE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`
      : `${SITE_URL}/`

    // 3. Standard Meta Description
    setMeta('meta[name="description"]', 'content', activeDescription)
    setMeta('meta[name="author"]', 'content', author || BASE_TITLE)

    // 4. OpenGraph Tags
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', activeDescription)
    setMeta('meta[property="og:url"]', 'content', fullCanonical)
    setMeta('meta[property="og:type"]', 'content', type || 'website')
    setMeta('meta[property="og:site_name"]', 'content', BASE_TITLE)
    setMeta('meta[property="og:image"]', 'content', activeImage)
    setMeta('meta[property="og:image:secure_url"]', 'content', activeImage)
    setMeta('meta[property="og:image:alt"]', 'content', title || BASE_TITLE)
    setMeta('meta[property="og:image:width"]', 'content', '1200')
    setMeta('meta[property="og:image:height"]', 'content', '630')

    // 5. Twitter Card Tags
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', activeDescription)
    setMeta('meta[name="twitter:image"]', 'content', activeImage)
    setMeta('meta[name="twitter:image:alt"]', 'content', title || BASE_TITLE)
    setMeta('meta[name="twitter:creator"]', 'content', '@sahedalomsumit')
    setMeta('meta[name="twitter:site"]', 'content', '@sahedalomsumit')

    // 6. Article Specific Tags
    if (type === 'article') {
      if (publishedTime) {
        setMeta('meta[property="article:published_time"]', 'content', new Date(publishedTime).toISOString())
      }
      setMeta('meta[property="article:author"]', 'content', author || BASE_TITLE)
      setMeta('meta[property="article:section"]', 'content', 'Technology')
    }

    // 7. Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]')
    if (!canonicalEl) {
      canonicalEl = document.createElement('link')
      canonicalEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.setAttribute('href', fullCanonical)

    // 8. Robots Tag
    let robotsEl = document.querySelector('meta[name="robots"]')
    if (noindex) {
      if (!robotsEl) {
        robotsEl = document.createElement('meta')
        robotsEl.setAttribute('name', 'robots')
        document.head.appendChild(robotsEl)
      }
      robotsEl.setAttribute('content', 'noindex, nofollow')
    } else if (robotsEl) {
      robotsEl.setAttribute('content', 'index, follow')
    }

    // 9. Article JSON-LD Structured Data
    let schemaEl = document.getElementById('dynamic-article-ldjson')
    if (type === 'article') {
      if (!schemaEl) {
        schemaEl = document.createElement('script')
        schemaEl.id = 'dynamic-article-ldjson'
        schemaEl.type = 'application/ld+json'
        document.head.appendChild(schemaEl)
      }
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': title || fullTitle,
        'image': [activeImage],
        'datePublished': publishedTime ? new Date(publishedTime).toISOString() : new Date().toISOString(),
        'author': {
          '@type': 'Person',
          'name': author || BASE_TITLE,
          'url': SITE_URL,
        },
        'publisher': {
          '@type': 'Person',
          'name': BASE_TITLE,
          'url': SITE_URL,
          'logo': {
            '@type': 'ImageObject',
            'url': `${SITE_URL}/img/favicon-sahed-alom-sumit.png`
          }
        },
        'description': activeDescription,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': fullCanonical
        }
      }
      schemaEl.textContent = JSON.stringify(schemaData)
    } else if (schemaEl) {
      schemaEl.remove()
    }

    // Cleanup on unmount — restore default site OG metadata
    return () => {
      if (noindex && robotsEl) {
        robotsEl.setAttribute('content', 'index, follow')
      }
      if (schemaEl) {
        schemaEl.remove()
      }
    }
  }, [title, description, canonical, image, type, publishedTime, author, tags, noindex])
}
