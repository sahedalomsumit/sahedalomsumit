import { useEffect } from 'react'

const BASE_TITLE = 'Sahed Alom Sumit'

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

export function useSEO({ title, description, canonical, noindex = false }) {
  useEffect(() => {
    // 1. Update Title Tag
    const fullTitle = formatDocumentTitle(title)
    document.title = fullTitle

    // 2. Prepare Defaults
    const defaultDescription = "Sahed Alom Sumit is a Product Designer & AI-Enhanced Web Developer based in Helsinki, Finland. I build websites that feel alive — where good design meets clean code."
    const activeDescription = description || defaultDescription

    // 3. Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', activeDescription)

    // 4. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', fullTitle)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', activeDescription)

    // 5. Update Twitter Tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', fullTitle)

    const twitterDesc = document.querySelector('meta[name="twitter:description"]')
    if (twitterDesc) twitterDesc.setAttribute('content', activeDescription)

    // 6. Update Canonical Link
    const canonicalEl = document.querySelector('link[rel="canonical"]')
    if (canonicalEl) {
      const fullCanonical = canonical ? `https://sahedalomsumit.com${canonical.startsWith('/') ? '' : '/'}${canonical}` : 'https://sahedalomsumit.com/'
      canonicalEl.setAttribute('href', fullCanonical)
    }

    // 7. Update Robots Tag (noindex for private/admin pages)
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

    // Cleanup — optionally restore robots meta on unmount
    return () => {
      if (noindex && robotsEl) {
        robotsEl.setAttribute('content', 'index, follow')
      }
    }
  }, [title, description, canonical, noindex])
}
