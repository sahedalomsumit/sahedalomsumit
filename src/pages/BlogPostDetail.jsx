import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Eye,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Share2,
  X,
  ExternalLink,
} from 'lucide-react'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import PortableTextRenderer from '../components/PortableTextRenderer'
import BlogCard from '../components/BlogCard'
import {
  fetchBlogPostBySlug,
  fetchAdjacentBlogPosts,
  fetchBlogPosts,
  calculateReadingTime,
  incrementBlogPostViews,
} from '../lib/sanity'
import { useSEO } from '../hooks/useSEO'

export default function BlogPostDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [adjacent, setAdjacent] = useState({ prev: null, next: null })
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [views, setViews] = useState(0)
  const [copiedLink, setCopiedLink] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  const [showSocialCardModal, setShowSocialCardModal] = useState(false)
  const postShareUrl = `https://sahedalomsumit.com/blog/${slug}`

  useSEO({
    title: post?.title || 'Blog Details',
    description: post?.excerpt || 'Read architectural insights, AI workflows, and front-end engineering notes by Sahed Alom Sumit.',
    canonical: `/blog/${slug}`,
    image: post?.coverImage,
    type: 'article',
    publishedTime: post?.publishedAt,
    author: post?.authorName,
    tags: post?.tags,
  })

  // Reading Progress Bar Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
        setReadingProgress(progress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load Post and Meta from Sanity
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const postData = await fetchBlogPostBySlug(slug)
        if (postData) {
          setPost(postData)
          setViews(postData.views || 0)

          // Increment view count organically (once per session per article)
          const sessionKey = `viewed_post_${slug}`
          const hasViewedInSession = sessionStorage.getItem(sessionKey)

          if (!hasViewedInSession) {
            sessionStorage.setItem(sessionKey, 'true')
            incrementBlogPostViews(slug, postData.id, postData.views).then(newCount => {
              if (typeof newCount === 'number' && newCount > 0) {
                setViews(newCount)
              }
            })
          }

          // Fetch adjacent navigation posts
          const adj = await fetchAdjacentBlogPosts(slug)
          setAdjacent(adj)

          // Fetch related posts (same category or others, excluding current)
          const all = await fetchBlogPosts({ limit: 4 })
          const related = all.filter(p => p.slug !== slug).slice(0, 2)
          setRelatedPosts(related)
        }
      } catch (err) {
        console.error('Error loading article from Sanity:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [slug])

  // Extract Table of Contents from Portable Text blocks or Markdown headings
  const tableOfContents = useMemo(() => {
    // If Sanity Portable Text body is present
    if (Array.isArray(post?.body) && post.body.length > 0) {
      const toc = []
      post.body.forEach(block => {
        if (block._type === 'block' && ['h2', 'h3', 'h4'].includes(block.style)) {
          const text = block.children?.map(c => c.text).join('') || ''
          if (text.trim()) {
            const level = block.style === 'h2' ? 2 : block.style === 'h3' ? 3 : 4
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            toc.push({ level, text, id })
          }
        }
      })
      return toc
    }

    // Fallback if markdown content string is present
    if (post?.content) {
      const lines = post.content.split('\n')
      const toc = []
      lines.forEach(line => {
        const match = line.trim().match(/^(#{2,4})\s*(.*)$/)
        if (match && match[2].trim()) {
          const level = match[1].length
          const text = match[2].trim()
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          toc.push({ level, text, id })
        }
      })
      return toc
    }
    return []
  }, [post?.body, post?.content])


  // Track active heading for live TOC highlighting on scroll
  const [activeHeadingId, setActiveHeadingId] = useState('')

  useEffect(() => {
    if (!tableOfContents || tableOfContents.length === 0) return

    const handleScroll = () => {
      // Sections are defined by h2s. Keep nested h3/h4 links in the TOC, but
      // never let them replace the active parent section.
      const headingElements = tableOfContents
        .filter(item => item.level === 2)
        .map(item => document.getElementById(item.id))
        .filter(Boolean)

      // Use the same upper-page offset as TOC navigation. Using the viewport
      // midpoint can skip a short section and highlight the following H2 as
      // soon as its link is clicked.
      const scrollPosition = window.scrollY + 130

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i]
        // offsetTop is relative to an offset parent, while scrollPosition is
        // relative to the document. Compare coordinates in the same space so
        // the active state remains accurate inside this nested article layout.
        const headingPosition = el.getBoundingClientRect().top + window.scrollY
        if (headingPosition <= scrollPosition) {
          setActiveHeadingId(el.id)
          return
        }
      }
      if (
        headingElements.length > 0 &&
        scrollPosition < headingElements[0].getBoundingClientRect().top + window.scrollY
      ) {
        setActiveHeadingId('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tableOfContents])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postShareUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const shareOnTwitter = () => {
    if (!post) return
    const url = encodeURIComponent(postShareUrl)
    const text = encodeURIComponent(`"${post.title}" by @sahedalomsumit`)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=450,noopener,noreferrer')
  }

  const shareOnLinkedIn = () => {
    if (!post) return
    const url = encodeURIComponent(postShareUrl)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=550,noopener,noreferrer')
  }

  const shareOnFacebook = () => {
    if (!post) return
    const url = encodeURIComponent(postShareUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=500,noopener,noreferrer')
  }

  const shareOnWhatsApp = () => {
    if (!post) return
    const text = encodeURIComponent(`"${post.title}" - ${postShareUrl}`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const dynamicReadingTime = useMemo(() => {
    return post?.readingTime || calculateReadingTime(post?.body || post?.content)
  }, [post?.readingTime, post?.body, post?.content])

  const formattedDate = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent'

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="font-mono text-xs text-violet-400 uppercase tracking-widest">
            Loading Blog...
          </p>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="bento-card p-12 text-center max-w-md mx-auto">
          <h1 className="text-6xl font-heading font-black mb-4 text-violet-400">404</h1>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
            Blog Not Found
          </h2>
          <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            The blog you are looking for does not exist or may have been archived.
          </p>
          <Link
            to="/blog"
            className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold uppercase tracking-wider transition-all"
          >
            ← Back to Blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Sticky Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-purple-400 to-emerald-400 z-[100] transition-all duration-100"
        style={{ width: `${readingProgress}%` }}
      />

      <article className="py-12 sm:py-20 px-4 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <RevealOnScroll>
          <nav aria-label="breadcrumb" className="text-xs tracking-wider mb-8 leading-relaxed font-mono" style={{ color: 'var(--text-dim)' }}>
            <Link to="/" className="hover:text-violet-400 transition-colors inline-block whitespace-nowrap">Home</Link>
            <span className="mx-2 inline-block">/</span>
            <Link to="/blog" className="hover:text-violet-400 transition-colors inline-block whitespace-nowrap">Blog</Link>
            <span className="mx-2 inline-block">/</span>
            <span className="text-violet-400 inline-block whitespace-nowrap">{post.category}</span>
            <span className="mx-2 inline-block">/</span>
            <span style={{ color: 'var(--text-main)' }} className="font-semibold inline">
              {post.title}
            </span>
          </nav>
        </RevealOnScroll>

        {/* Article Header */}
        <RevealOnScroll>
          <header className="mb-10 text-left">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4">
              <span className="pill-badge text-violet-400 border-violet-500/20 bg-violet-500/10">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5" style={{ color: 'var(--text-dim)' }}>
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span style={{ color: 'var(--text-dim)' }}>•</span>
              <span className="flex items-center gap-1.5" style={{ color: 'var(--text-dim)' }}>
                <Clock className="w-3.5 h-3.5" />
                {dynamicReadingTime}
              </span>
              <span style={{ color: 'var(--text-dim)' }}>•</span>
              <span className="flex items-center gap-1.5" style={{ color: 'var(--text-dim)' }}>
                <Eye className="w-3.5 h-3.5 text-violet-400" />
                <span className="font-semibold transition-all duration-300" style={{ color: 'var(--text-main)' }}>
                  {views.toLocaleString()}
                </span>{' '}
                {views === 1 ? 'read' : 'reads'}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="Live Realtime counter" />
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight mb-6"
                style={{ color: 'var(--text-main)' }}>
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-4xl"
               style={{ color: 'var(--text-muted)' }}>
              {post.excerpt}
            </p>

            {/* Author bar & Share links */}
            <div className="site-full-bleed-divider site-full-bleed-divider-bottom flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/img/profile.jpg"
                  alt={post.authorName || 'Sahed Alom Sumit'}
                  className="w-11 h-11 rounded-full object-cover border border-violet-500/40 bg-violet-950/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>
                      {post.authorName || 'Sahed Alom Sumit'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      Author
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {post.authorRole || 'Product Designer & AI-Enhanced Web Developer'}
                  </span>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono mr-1" style={{ color: 'var(--text-dim)' }}>
                  Share:
                </span>

                {/* X / Twitter */}
                <button
                  onClick={shareOnTwitter}
                  aria-label="Share on X"
                  title="Share on X (Twitter)"
                  className="p-2 rounded-xl border hover:border-violet-500/50 hover:bg-white/5 transition-all text-gray-300 hover:text-white"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>

                {/* LinkedIn */}
                <button
                  onClick={shareOnLinkedIn}
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                  className="p-2 rounded-xl border hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 transition-all text-gray-300 hover:text-[#0a66c2]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                  </svg>
                </button>

                {/* Facebook */}
                <button
                  onClick={shareOnFacebook}
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                  className="p-2 rounded-xl border hover:border-[#1877f2]/50 hover:bg-[#1877f2]/10 transition-all text-gray-300 hover:text-[#1877f2]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={shareOnWhatsApp}
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                  className="p-2 rounded-xl border hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all text-gray-300 hover:text-[#25D366]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.98-.276-.102-.477-.15-.678.15-.2.302-.779.98-.955 1.18-.176.202-.352.226-.653.076-.301-.15-1.272-.469-2.424-1.496-.896-.798-1.501-1.784-1.677-2.086-.176-.302-.019-.465.132-.615.136-.135.301-.352.452-.528.15-.176.2-.301.301-.502.101-.201.05-.377-.025-.528-.075-.15-.678-1.633-.929-2.235-.245-.586-.494-.506-.678-.515-.176-.009-.377-.01-.578-.01-.201 0-.528.075-.804.377-.276.301-1.055 1.03-1.055 2.512 0 1.482 1.08 2.912 1.231 3.113.15.201 2.126 3.246 5.151 4.551.72.311 1.282.497 1.72.636.723.23 1.38.197 1.9-.12.58-.354 1.78-1.09 2.03-1.758.25-.668.25-1.24.175-1.39-.075-.15-.276-.226-.577-.377zM12.04 21.674c-1.74 0-3.447-.468-4.945-1.355l-.354-.21-3.738.98.997-3.645-.23-.366A9.614 9.614 0 0 1 2.4 12.04C2.4 6.724 6.724 2.4 12.04 2.4c2.574 0 4.994 1.002 6.814 2.822A9.585 9.585 0 0 1 21.674 12.04c0 5.316-4.324 9.634-9.634 9.634zm7.994-17.628A11.93 11.93 0 0 0 12.04 0C5.398 0 .007 5.39.007 12.033c0 2.12.553 4.188 1.604 6.012L0 24l6.136-1.609a11.968 11.968 0 0 0 5.904 1.554h.005c6.638 0 12.03-5.393 12.03-12.037 0-3.216-1.252-6.24-3.526-8.514z" />
                  </svg>
                </button>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                  title="Copy link to clipboard"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border hover:border-violet-500/50 hover:bg-white/5 transition-all text-xs font-mono"
                  style={{ borderColor: 'var(--border)', color: copiedLink ? '#10b981' : 'var(--text-main)' }}
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                </button>

                {/* Social Card Preview Trigger */}
                <button
                  onClick={() => setShowSocialCardModal(true)}
                  aria-label="Preview Social Card"
                  title="Preview how this article appears when shared on social media"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-violet-500/30 hover:border-violet-500 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 transition-all text-xs font-mono"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Social Card</span>
                  <span className="sm:hidden">Card</span>
                </button>
              </div>
            </div>
          </header>
        </RevealOnScroll>

        {/* Social Card Live Preview Modal */}
        {showSocialCardModal && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={() => setShowSocialCardModal(false)}
          >
            <div
              className="bento-card max-w-lg w-full p-6 sm:p-7 rounded-3xl border border-violet-500/40 shadow-2xl relative text-left"
              style={{ background: 'var(--card-bg)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="pill-badge text-[10px] text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
                      Open Graph & Twitter Card
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-dim)' }}>
                      1200 × 630
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-bold" style={{ color: 'var(--text-main)' }}>
                    Social Share Preview Card
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Live preview of the rich card displayed on X (Twitter), LinkedIn, Facebook, Slack, and WhatsApp.
                  </p>
                </div>
                <button
                  onClick={() => setShowSocialCardModal(false)}
                  className="p-1.5 rounded-lg border hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                  style={{ borderColor: 'var(--border)' }}
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* The Realistic Social Preview Card */}
              <div className="rounded-2xl overflow-hidden border shadow-lg mb-5" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                {/* 16:9 Image using the same blog image */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-black/50 relative">
                  <img
                    src={post.coverImage || '/img/portfolio/thumbnail-temp.webp'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/img/og-image.webp'
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 backdrop-blur text-violet-300 border border-white/10">
                      {post.category || 'Article'}
                    </span>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-violet-400">
                    <span>sahedalomsumit.com</span>
                    <span>•</span>
                    <span>sahedalomsumit</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-heading font-bold line-clamp-2 leading-snug" style={{ color: 'var(--text-main)' }}>
                    {post.title}
                  </h4>
                  <p className="text-xs font-light line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Quick Share Actions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                  <span>Share link:</span>
                  <span className="truncate max-w-[280px] text-violet-400">{postShareUrl}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <button
                    onClick={() => {
                      shareOnTwitter()
                      setShowSocialCardModal(false)
                    }}
                    className="py-2 px-3 rounded-xl border hover:border-violet-500/50 hover:bg-white/5 transition-all text-xs font-mono flex items-center justify-center gap-1.5"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-main)' }}
                  >
                    Share X
                  </button>
                  <button
                    onClick={() => {
                      shareOnLinkedIn()
                      setShowSocialCardModal(false)
                    }}
                    className="py-2 px-3 rounded-xl border hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 transition-all text-xs font-mono text-[#0a66c2] flex items-center justify-center gap-1.5"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={() => {
                      shareOnFacebook()
                      setShowSocialCardModal(false)
                    }}
                    className="py-2 px-3 rounded-xl border hover:border-[#1877f2]/50 hover:bg-[#1877f2]/10 transition-all text-xs font-mono text-[#1877f2] flex items-center justify-center gap-1.5"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    Facebook
                  </button>
                  <button
                    onClick={() => {
                      shareOnWhatsApp()
                      setShowSocialCardModal(false)
                    }}
                    className="py-2 px-3 rounded-xl border hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all text-xs font-mono text-[#25D366] flex items-center justify-center gap-1.5"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="py-2 px-3 rounded-xl border bg-violet-600 hover:bg-violet-500 text-white transition-all text-xs font-mono flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Cover Image */}
        {post.coverImage && (
          <RevealOnScroll>
            <div className="w-full mb-14 rounded-3xl overflow-hidden border shadow-2xl relative"
                 style={{ borderColor: 'var(--border)' }}>
              <img
                src={post.coverImage}
                alt={post.title}
                fetchpriority="high"
                decoding="async"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </RevealOnScroll>
        )}

        {/* Main Content Layout with optional Sidebar TOC */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          {/* Table of Contents Sidebar (Desktop Sticky) */}
          {tableOfContents.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 self-start sticky top-28 z-20">
              <div className="bento-card p-6 border text-left max-h-[calc(100vh-8.5rem)] overflow-y-auto custom-scrollbar shadow-xl transition-all"
                   style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b"
                     style={{ borderColor: 'var(--border)' }}>
                  <Bookmark className="w-4 h-4 text-violet-400 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400">
                    Table of Contents
                  </span>
                </div>
                <nav className="space-y-1 text-xs">
                  {tableOfContents.map((item, idx) => {
                    const isActive = activeHeadingId === item.id
                    return (
                      <a
                        key={idx}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          const target = document.getElementById(item.id)
                          if (target) {
                            // Make the selected section visible as active immediately;
                            // the scroll spy then keeps it in sync while reading.
                            if (item.level === 2) setActiveHeadingId(item.id)
                            const y = target.getBoundingClientRect().top + window.pageYOffset - 110
                            window.scrollTo({ top: y, behavior: 'smooth' })
                          }
                        }}
                        className={`block py-1.5 px-2.5 rounded-lg transition-all leading-snug ${
                          item.level === 3 ? 'ml-3 text-[11px]' : 'font-medium'
                        } ${
                          isActive
                            ? 'bg-violet-500/15 text-violet-300 font-semibold border-l-2 border-violet-400 pl-2'
                            : 'hover:text-violet-400 hover:bg-white/[0.02]'
                        }`}
                        style={{
                          color: isActive ? 'var(--accent-light, #c4b5fd)' : item.level === 3 ? 'var(--text-dim)' : 'var(--text-muted)'
                        }}
                      >
                        {item.text}
                      </a>
                    )
                  })}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Article Body */}
          <main className={tableOfContents.length > 0 ? 'lg:col-span-8' : 'w-full col-span-12'}>
            <div className="bento-card p-6 sm:p-10 md:p-12 text-left mb-12">
              <PortableTextRenderer body={post.body} content={post.content} />

              {/* Tags Section */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-xs font-mono uppercase tracking-wider block mb-3 text-violet-400">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-3 py-1.5 rounded-full border bg-white/[0.02]"
                        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                      >
                        #{tag.replace(/^#+/, '')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Author Profile Card */}
            <div className="bento-card p-8 mb-12 text-left flex flex-col sm:flex-row items-start gap-6"
                 style={{ borderColor: 'var(--border)' }}>
              <img
                src="/img/profile.jpg"
                alt={post.authorName || 'Sahed Alom Sumit'}
                className="w-20 h-20 rounded-2xl object-cover border border-violet-500/40 shrink-0 bg-violet-950/40"
              />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
                  Written by
                </span>
                <h3 className="text-xl font-heading font-bold mb-1" style={{ color: 'var(--text-main)' }}>
                  {post.authorName || 'Sahed Alom Sumit'}
                </h3>
                <p className="text-xs font-mono text-violet-400 mb-3">
                  {post.authorRole || 'Product Designer & AI-Enhanced Web Developer'} • Helsinki, Finland
                </p>
                <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {post.authorDescription || 'With 5+ years of experience, I’ve worked with founders, brands, and agencies worldwide, turning rough ideas into 150+ digital projects that are fast, user-friendly, visually polished, and built to support real business goals.'}
                </p>
              </div>
            </div>

            {/* Adjacent Navigation Cards (Previous & Next) */}
            {(adjacent.prev || adjacent.next) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 text-left">
                {adjacent.prev ? (
                  <Link
                    to={`/blog/${adjacent.prev.slug}`}
                    className="bento-card p-5 group flex flex-col justify-between hover:border-violet-500/50 transition-all"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 mb-2 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                      Previous Blog
                    </span>
                    <h4 className="text-sm font-bold line-clamp-2 group-hover:text-violet-400 transition-colors"
                        style={{ color: 'var(--text-main)' }}>
                      {adjacent.prev.title}
                    </h4>
                  </Link>
                ) : <div />}

                {adjacent.next && (
                  <Link
                    to={`/blog/${adjacent.next.slug}`}
                    className="bento-card p-5 group flex flex-col justify-between sm:text-right hover:border-violet-500/50 transition-all"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 mb-2 flex items-center justify-start sm:justify-end gap-1">
                      Next Blog
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <h4 className="text-sm font-bold line-clamp-2 group-hover:text-violet-400 transition-colors"
                        style={{ color: 'var(--text-main)' }}>
                      {adjacent.next.title}
                    </h4>
                  </Link>
                )}
              </div>
            )}
          </main>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="site-full-bleed-divider mt-16 pt-16 text-left">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 block mb-1">
                  Keep Reading
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold" style={{ color: 'var(--text-main)' }}>
                  Related Blogs
                </h3>
              </div>
              <Link
                to="/blog"
                className="text-xs font-mono text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
              >
                All Blogs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {relatedPosts.map(rel => (
                <BlogCard key={rel.slug} post={rel} />
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Global Contact Section */}
      <ContactSection />
    </>
  )
}
