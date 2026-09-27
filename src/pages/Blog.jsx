import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, Sparkles, BookOpen } from 'lucide-react'
import RevealOnScroll from '../components/RevealOnScroll'
import BlogCard from '../components/BlogCard'
import ContactSection from '../components/ContactSection'
import { fetchBlogPosts, supabase } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CATEGORIES = ['All', 'AI & Automation', 'Design Systems', 'Engineering', 'UI/UX Design']

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useSEO({
    title: 'Blog & Engineering Insights | Sahed Alom Sumit',
    description: 'Deep-dives into AI engineering, modern design systems, Supabase architectures, and tactile front-end craftsmanship by Sahed Alom Sumit in Helsinki, Finland.',
    canonical: '/blog',
  })

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchBlogPosts()
        if (data) setPosts(data)
      } catch (err) {
        console.error('Error loading blog posts:', err)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  // Live Realtime listener to sync views across all cards instantly
  useEffect(() => {
    if (!supabase) return

    const channel = supabase
      .channel('realtime-blog-index-views')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'blog_posts',
        },
        (payload) => {
          if (payload.new && payload.new.slug && typeof payload.new.views === 'number') {
            setPosts((prevPosts) =>
              prevPosts.map((p) =>
                p.slug === payload.new.slug
                  ? { ...p, views: payload.new.views }
                  : p
              )
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        post.category?.toLowerCase().includes(query)

      const matchesCategory =
        selectedCategory === 'All' ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

  const featuredPost = useMemo(() => {
    return posts.find(p => p.isFeatured) || posts[0]
  }, [posts])

  const regularPosts = useMemo(() => {
    if (searchQuery || selectedCategory !== 'All') {
      return filteredPosts
    }
    return filteredPosts.filter(p => p.id !== featuredPost?.id)
  }, [filteredPosts, featuredPost, searchQuery, selectedCategory])

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [filteredPosts])

  return (
    <>
      <section id="blog-index" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-14 text-left">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="text-xs tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
              <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-main)' }} className="font-semibold">Blog & Insights</span>
            </nav>

            <span className="pill-badge text-violet-400 border-violet-500/20 bg-violet-500/10 mb-4 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Perspectives & Architecture
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight uppercase leading-none mb-6"
                style={{ color: 'var(--text-main)' }}>
              Thinking in <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Code, Design & AI
              </span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg font-light leading-relaxed mb-10"
               style={{ color: 'var(--text-muted)' }}>
              Architectural blueprints, tactile UI explorations, and field notes on shipping production-grade digital products. Grounded in real-world engineering.
            </p>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center pb-8 border-b"
                 style={{ borderColor: 'var(--border)' }}>
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => {
                  const isActive = selectedCategory === category
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                        isActive
                          ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                          : 'border hover:border-violet-500/50'
                      }`}
                      style={{
                        backgroundColor: isActive ? undefined : 'rgba(255, 255, 255, 0.02)',
                        borderColor: isActive ? undefined : 'var(--border)',
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                      }}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>

              {/* Search Input */}
              <div className="relative min-w-[240px] sm:min-w-[280px]">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search articles by topic, stack..."
                  className="w-full pl-10 pr-9 py-2 rounded-full text-xs border bg-transparent focus:outline-none focus:border-violet-500 transition-colors"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-main)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </header>
        </RevealOnScroll>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
            <p className="font-mono text-xs text-violet-400 uppercase tracking-widest">
              Connecting to Supabase...
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post (Only show on default filter state) */}
            {!searchQuery && selectedCategory === 'All' && featuredPost && (
              <RevealOnScroll>
                <BlogCard post={featuredPost} isFeatured={true} />
              </RevealOnScroll>
            )}

            {/* Articles Grid Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono uppercase tracking-wider text-violet-400">
                {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'Latest Articles'} ({filteredPosts.length})
              </span>
              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All')
                  }}
                  className="text-xs font-mono text-emerald-400 hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Articles Grid */}
            {filteredPosts.length === 0 ? (
              <div className="bento-card p-12 text-center max-w-md mx-auto my-12">
                <BookOpen className="w-10 h-10 mx-auto mb-4 text-violet-400/60" />
                <h3 className="text-xl font-heading font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                  No articles found
                </h3>
                <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                  No articles matched your query "{searchQuery}". Try searching for terms like "AI", "Supabase", "Bento", or "React".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All')
                  }}
                  className="px-5 py-2.5 rounded-full bg-violet-600 text-white text-xs font-mono font-medium hover:bg-violet-500 transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {regularPosts.map((post, i) => (
                  <RevealOnScroll key={post.slug} delay={i * 0.08}>
                    <BlogCard post={post} />
                  </RevealOnScroll>
                ))}
              </div>
            )}
          </>
        )}

        {/* Project Estimator & Collaboration Banner */}
        <RevealOnScroll>
          <div className="mt-20 bento-card p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-left border-violet-500/20"
               style={{ background: 'radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.12), transparent 70%), var(--card-bg)' }}>
            <div>
              <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-3 inline-flex">
                Collaborative Innovation
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight mb-2"
                  style={{ color: 'var(--text-main)' }}>
                Have an architecture or design challenge?
              </h3>
              <p className="text-sm font-light max-w-xl" style={{ color: 'var(--text-muted)' }}>
                I partner with high-growth teams and forward-thinking founders to build high-performance web applications and design systems from inception to launch.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                to="/estimate"
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-violet-600/30"
              >
                Estimate Project
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 rounded-full border hover:border-violet-400 text-xs font-semibold uppercase tracking-wider transition-all"
                style={{ borderColor: 'var(--border)', color: 'var(--text-main)' }}
              >
                Explore Services
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Global Contact Section */}
      <ContactSection />
    </>
  )
}
