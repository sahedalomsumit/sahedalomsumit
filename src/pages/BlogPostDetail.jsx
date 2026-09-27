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
} from 'lucide-react'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import MarkdownRenderer from '../components/MarkdownRenderer'
import BlogCard from '../components/BlogCard'
import {
  supabase,
  fetchBlogPostBySlug,
  fetchAdjacentBlogPosts,
  fetchBlogPosts,
  incrementBlogPostViews,
  calculateReadingTime
} from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'

export default function BlogPostDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [adjacent, setAdjacent] = useState({ prev: null, next: null })
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [views, setViews] = useState(0)
  const [copiedLink, setCopiedLink] = useState(false)
  const [instagramToast, setInstagramToast] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  useSEO({
    title: post ? `${post.seoTitle || post.title} | Sahed Alom Sumit` : 'Article Details',
    description: post ? (post.seoDescription || post.excerpt) : 'Read architectural insights, AI workflows, and front-end engineering notes by Sahed Alom Sumit.',
    canonical: `/blog/${slug}`,
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

  // Load Post and Meta
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const postData = await fetchBlogPostBySlug(slug)
        if (postData) {
          setPost(postData)
          setViews(postData.views || 0)

          // Genuine unique session tracking: only count 1 view per user session
          const sessionKey = `viewed_post_${slug}`
          const hasViewedInSession = sessionStorage.getItem(sessionKey)

          if (!hasViewedInSession) {
            sessionStorage.setItem(sessionKey, 'true')
            incrementBlogPostViews(slug).then(newCount => {
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
        console.error('Error loading article:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [slug])

  // Live Realtime listener for dynamic view count updates
  useEffect(() => {
    if (!slug || !supabase) return

    const channel = supabase
      .channel(`post-views-${slug}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'blog_posts',
          filter: `slug=eq.${slug}`,
        },
        (payload) => {
          if (payload.new && typeof payload.new.views === 'number') {
            setViews(payload.new.views)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [slug])

  // Extract Table of Contents from Markdown headings
  const tableOfContents = useMemo(() => {
    if (!post?.content) return []
    const lines = post.content.split('\n')
    const toc = []
    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim()
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        toc.push({ level: 2, text, id })
      } else if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim()
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        toc.push({ level: 3, text, id })
      }
    })
    return toc
  }, [post?.content])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const shareOnTwitter = () => {
    if (!post) return
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`"${post.title}" by @sahedalomsumit`)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=450,noopener,noreferrer')
  }

  const shareOnLinkedIn = () => {
    if (!post) return
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=550,noopener,noreferrer')
  }

  const shareOnFacebook = () => {
    if (!post) return
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=500,noopener,noreferrer')
  }

  const shareOnInstagram = () => {
    navigator.clipboard.writeText(window.location.href)
    setInstagramToast(true)
    setTimeout(() => setInstagramToast(false), 3500)
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
  }

  const dynamicReadingTime = useMemo(() => {
    return calculateReadingTime(post?.content)
  }, [post?.content])

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
            Loading Article...
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
            Article Not Found
          </h2>
          <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            The article you are looking for does not exist or may have been archived.
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
          <nav aria-label="breadcrumb" className="text-xs tracking-wider mb-8 flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
            <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-violet-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-violet-400">{post.category}</span>
            <span>/</span>
            <span style={{ color: 'var(--text-main)' }} className="font-semibold truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </nav>
        </RevealOnScroll>

        {/* Article Header */}
        <RevealOnScroll>
          <header className="max-w-4xl mx-auto mb-10 text-left">
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

            <p className="text-lg sm:text-xl font-light leading-relaxed mb-8"
               style={{ color: 'var(--text-muted)' }}>
              {post.excerpt}
            </p>

            {/* Author bar & Share links */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y relative"
                 style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <img
                  src="/img/sahedalomsumit-profile-purple.png"
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

                {/* Instagram */}
                <button
                  onClick={shareOnInstagram}
                  aria-label="Share on Instagram"
                  title="Share to Instagram Story / Bio"
                  className="p-2 rounded-xl border hover:border-[#e1306c]/50 hover:bg-[#e1306c]/10 transition-all text-gray-300 hover:text-[#e1306c]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
              </div>

              {/* Instagram Story Copy Feedback Toast */}
              {instagramToast && (
                <div className="absolute right-0 -top-12 px-3 py-1.5 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-mono flex items-center gap-1.5 backdrop-blur-md animate-fade-in">
                  <span>📸 Link copied! Paste into your Instagram Story or Bio</span>
                </div>
              )}
            </div>
          </header>
        </RevealOnScroll>

        {/* Hero Cover Image */}
        {post.coverImage && (
          <RevealOnScroll>
            <div className="max-w-5xl mx-auto mb-14 rounded-3xl overflow-hidden border shadow-2xl relative"
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
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents Sidebar (Desktop) */}
          {tableOfContents.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-32 bento-card p-6 border text-left"
                   style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b"
                     style={{ borderColor: 'var(--border)' }}>
                  <Bookmark className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400">
                    Table of Contents
                  </span>
                </div>
                <nav className="space-y-2 text-xs">
                  {tableOfContents.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className={`block py-1 hover:text-violet-400 transition-colors ${
                        item.level === 3 ? 'pl-4 text-gray-400' : 'font-medium'
                      }`}
                      style={{ color: item.level === 3 ? 'var(--text-dim)' : 'var(--text-muted)' }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Article Body */}
          <main className={tableOfContents.length > 0 ? 'lg:col-span-8' : 'max-w-3xl mx-auto col-span-12'}>
            <div className="bento-card p-6 sm:p-10 md:p-12 text-left mb-12">
              <MarkdownRenderer content={post.content} />

              {/* Tags Section */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-xs font-mono uppercase tracking-wider block mb-3 text-violet-400">
                    Categorized In
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-3 py-1.5 rounded-full border bg-white/[0.02]"
                        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Author Profile Card */}
            <div className="bento-card p-8 mb-12 text-left flex flex-col sm:flex-row items-center gap-6"
                 style={{ borderColor: 'var(--border)' }}>
              <img
                src="/img/sahedalomsumit-profile-purple.png"
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
                  Specializing in craft-driven web experiences, high-converting design systems, and AI-accelerated front-end engineering. Available for select international projects and advisory.
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
                      Previous Article
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
                      Next Article
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
          <section className="mt-16 pt-16 border-t text-left" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 block mb-1">
                  Keep Reading
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold" style={{ color: 'var(--text-main)' }}>
                  Related Articles
                </h3>
              </div>
              <Link
                to="/blog"
                className="text-xs font-mono text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
              >
                All Articles <ArrowRight className="w-3.5 h-3.5" />
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
