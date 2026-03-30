import { useEffect } from 'react'

/**
 * Lightweight SEO hook — updates document title and meta description dynamically.
 * @param {string} title - Page <title> text
 * @param {string} description - Meta description content
 * @param {string} [canonical] - Optional canonical URL path (e.g. "/services/figma-design")
 */
export function useSEO({ title, description, canonical }) {
  useEffect(() => {
    // Title
    document.title = title

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)

    // OG title
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    // OG description
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)

    // Canonical
    const canonicalEl = document.querySelector('link[rel="canonical"]')
    if (canonical && canonicalEl) {
      canonicalEl.setAttribute('href', `https://sahedalomsumit.com${canonical}`)
    }

    // Cleanup — restore defaults on unmount
    return () => {
      document.title = 'Sahed Alom Sumit | Vibe Web Designer & Developer'
      if (metaDesc) metaDesc.setAttribute('content', 'Sahed Alom Sumit is a Vibe Web Designer & Developer based in Helsinki, Finland. I build websites that feel alive — where good design meets clean code.')
      if (canonicalEl) canonicalEl.setAttribute('href', 'https://sahedalomsumit.com/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical])
}
