import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Plus, Search, Filter, RefreshCw, Trash2, Edit3, ExternalLink, 
  Eye, CheckCircle2, AlertCircle, Clock, Tag, User, Star, StarOff,
  LogOut, ArrowLeft, BookOpen, Layers, Check, X
} from 'lucide-react'
import RevealOnScroll from '../components/RevealOnScroll'
import AdminAuthGate, { useAdminAuth } from '../components/AdminAuthGate'
import { fetchAllBlogPostsAdmin, updateBlogPost, deleteBlogPost } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'

function BlogAdminDashboardContent() {
  const navigate = useNavigate()
  const { logout, userEmail } = useAdminAuth()

  useSEO({
    title: 'Blog Management Dashboard',
    description: 'Manage, edit, update, and delete blog posts and drafts.',
    canonical: '/blog/admin',
    noindex: true,
  })

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'published' | 'draft'
  const [categoryFilter, setCategoryFilter] = useState('all')
  
  // Delete modal state
  const [postToDelete, setPostToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState(null)

  const loadPosts = async () => {
    setLoading(true)
    const data = await fetchAllBlogPostsAdmin()
    if (data) {
      setPosts(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadPosts()
    setRefreshing(false)
  }

  const showFeedback = (text, type = 'success') => {
    setFeedbackMessage({ text, type })
    setTimeout(() => setFeedbackMessage(null), 4000)
  }

  // Toggle publish status
  const handleTogglePublish = async (post) => {
    const newStatus = !post.isPublished
    // Optimistic update
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, isPublished: newStatus } : p))
    
    const { error } = await updateBlogPost(post.slug, { is_published: newStatus })
    if (error) {
      showFeedback(`Failed to update status: ${error.message || error}`, 'error')
      // Revert on error
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, isPublished: post.isPublished } : p))
    } else {
      showFeedback(`Post marked as ${newStatus ? 'Published' : 'Draft'}.`)
    }
  }

  // Toggle featured status
  const handleToggleFeatured = async (post) => {
    const newFeatured = !post.isFeatured
    // Optimistic update
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, isFeatured: newFeatured } : p))
    
    const { error } = await updateBlogPost(post.slug, { is_featured: newFeatured })
    if (error) {
      showFeedback(`Failed to update featured flag: ${error.message || error}`, 'error')
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, isFeatured: post.isFeatured } : p))
    } else {
      showFeedback(`Post ${newFeatured ? 'featured on homepage' : 'unfeatured'}.`)
    }
  }

  // Confirm and delete
  const handleDeletePost = async () => {
    if (!postToDelete) return
    setIsDeleting(true)

    const targetId = postToDelete.id || postToDelete.slug
    const { error } = await deleteBlogPost(targetId)

    if (error) {
      showFeedback(`Could not delete post: ${error.message || error}`, 'error')
    } else {
      setPosts(prev => prev.filter(p => p.id !== postToDelete.id && p.slug !== postToDelete.slug))
      showFeedback(`Post "${postToDelete.title}" deleted permanently.`)
    }

    setIsDeleting(false)
    setPostToDelete(null)
  }

  // Categories list extracted from posts
  const categories = useMemo(() => {
    const set = new Set(posts.map(p => p.category).filter(Boolean))
    return Array.from(set)
  }, [posts])

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      // Search
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch = !q || 
        p.title?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))

      // Status
      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'published' ? p.isPublished :
        !p.isPublished

      // Category
      const matchesCategory = 
        categoryFilter === 'all' ? true :
        p.category?.toLowerCase() === categoryFilter.toLowerCase()

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [posts, searchQuery, statusFilter, categoryFilter])

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = posts.length
    const published = posts.filter(p => p.isPublished).length
    const drafts = total - published
    const views = posts.reduce((sum, p) => sum + (p.views || 0), 0)
    return { total, published, drafts, views }
  }, [posts])

  return (
    <div className="pt-28 pb-24 px-4 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {feedbackMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl border shadow-2xl flex items-center gap-3 text-xs font-mono tracking-wide animate-slide-up ${
          feedbackMessage.type === 'error'
            ? 'bg-rose-950/90 text-rose-300 border-rose-500/30'
            : 'bg-emerald-950/90 text-emerald-300 border-emerald-500/30'
        }`}>
          {feedbackMessage.type === 'error' ? (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bento-card p-6 sm:p-8 max-w-lg w-full border-rose-500/30 bg-[#0d0d0d] relative shadow-2xl animate-scale-up">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-5">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2">
              Delete Blog Permanently?
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
              You are about to permanently remove <span className="text-white font-medium">"{postToDelete.title}"</span>. This action cannot be reversed.
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setPostToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeletePost}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold bg-rose-600 text-white hover:bg-rose-500 transition shadow-lg shadow-rose-600/30 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar Navigation */}
      <RevealOnScroll>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div>
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
              <Link to="/" className="hover:text-emerald-400 transition">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-emerald-400 transition">Blog</Link>
              <span>/</span>
              <span className="text-white">Admin Management</span>
            </nav>
            <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-1">
              Admin_Console // {userEmail}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              Blog Posts Manager
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh database records"
              className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-emerald-400' : ''}`} />
            </button>

            <button
              onClick={logout}
              title="Sign Out of Admin"
              className="px-4 py-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-mono uppercase tracking-wider transition flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Studio</span>
            </button>

            <Link
              to="/blog/new"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono uppercase tracking-wider font-black transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Blog</span>
            </Link>
          </div>
        </div>
      </RevealOnScroll>

      {/* Metrics Row */}
      <RevealOnScroll delay={0.05}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bento-card p-5 border-white/5 bg-white/[0.02]">
            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1">Total Blogs</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{metrics.total}</div>
          </div>
          <div className="bento-card p-5 border-emerald-500/20 bg-emerald-500/5">
            <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest mb-1">Published Live</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{metrics.published}</div>
          </div>
          <div className="bento-card p-5 border-amber-500/20 bg-amber-500/5">
            <div className="font-mono text-[10px] text-amber-400 uppercase tracking-widest mb-1">Drafts & Staging</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{metrics.drafts}</div>
          </div>
          <div className="bento-card p-5 border-violet-500/20 bg-violet-500/5">
            <div className="font-mono text-[10px] text-violet-400 uppercase tracking-widest mb-1">Total Lifetime Views</div>
            <div className="text-2xl sm:text-3xl font-black text-violet-400 font-mono">{metrics.views}</div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Filters & Search Control Bar */}
      <RevealOnScroll delay={0.1}>
        <div className="bento-card p-4 sm:p-5 mb-8 border-white/5 bg-[#0a0a0a] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, slug, tag, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/5">
            {['all', 'published', 'draft'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition ${
                  statusFilter === s
                    ? 'bg-emerald-500 text-black font-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500 transition"
            >
              <option value="all" className="bg-[#111] text-white">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c} className="bg-[#111] text-white">{c}</option>
              ))}
            </select>
          </div>
        </div>
      </RevealOnScroll>

      {/* Blog Posts List */}
      <RevealOnScroll delay={0.15}>
        {loading ? (
          <div className="py-24 text-center bento-card border-white/5">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin mx-auto mb-4" />
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-500">
              Fetching_Database_Records...
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center bento-card border-white/5 p-8">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white uppercase mb-2">No Blogs Found</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? "No blog posts match your current search query or active filters."
                : "You have not created any blog posts yet. Click the button below to add your first blog."}
            </p>
            <Link
              to="/blog/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-mono text-xs font-black uppercase tracking-wider hover:bg-emerald-400 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Blog Post</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id || post.slug}
                className="bento-card p-5 sm:p-6 border-white/5 bg-[#080808] hover:border-white/10 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 min-w-0">
                  <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0 relative">
                    <img
                      src={post.coverImage || '/img/portfolio/thumbnail-temp.webp'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/img/portfolio/thumbnail-temp.webp'
                      }}
                    />
                    {post.isFeatured && (
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] font-mono font-bold">
                        ★
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-300 font-mono text-[10px] tracking-wider border border-white/5">
                        {post.category || 'App Development'}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime || '2 mins read'}
                      </span>
                      <span className="text-[10px] font-mono text-violet-400 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views || 0} views
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h2>

                    <div className="text-[11px] font-mono text-gray-500 truncate mt-1">
                      /blog/<span className="text-gray-400">{post.slug}</span>
                    </div>

                    {post.excerpt && (
                      <p className="text-xs text-gray-400 font-light line-clamp-2 mt-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Action Buttons (Icons Only) */}
                <div className="flex items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5 shrink-0">
                  {/* Status Toggle (Icon Only) */}
                  <button
                    onClick={() => handleTogglePublish(post)}
                    title={post.isPublished ? "Status: Published (Click to switch to Draft)" : "Status: Draft (Click to Publish)"}
                    className={`p-2 rounded-lg border transition cursor-pointer ${
                      post.isPublished
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                    }`}
                  >
                    {post.isPublished ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </button>

                  {/* Featured Toggle (Icon Only) */}
                  <button
                    onClick={() => handleToggleFeatured(post)}
                    title={post.isFeatured ? "Featured on Home (Click to unfeature)" : "Not featured (Click to feature)"}
                    className={`p-2 rounded-lg border transition cursor-pointer ${
                      post.isFeatured
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                        : 'bg-white/5 text-gray-500 border-white/5 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {post.isFeatured ? <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> : <StarOff className="w-4 h-4" />}
                  </button>

                  {/* View Live (Icon Only) */}
                  <Link
                    to={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View published blog"
                    className="p-2 rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {/* Edit Post (Icon Only) */}
                  <Link
                    to={`/blog/new?edit=${post.slug}`}
                    title="Edit blog in Studio"
                    className="p-2 rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500 hover:text-white transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>

                  {/* Delete Button (Icon Only) */}
                  <button
                    onClick={() => setPostToDelete(post)}
                    title="Delete blog"
                    className="p-2 rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </RevealOnScroll>
    </div>
  )
}

export default function BlogAdminDashboard() {
  return (
    <AdminAuthGate>
      <BlogAdminDashboardContent />
    </AdminAuthGate>
  )
}
