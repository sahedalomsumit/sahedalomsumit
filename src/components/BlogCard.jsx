import { Link } from 'react-router-dom'
import { Clock, Eye, Calendar, ArrowRight } from 'lucide-react'

const CATEGORY_COLORS = {
  'AI & Automation': 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  'Design Systems': 'text-violet-400 border-violet-500/20 bg-violet-500/10',
  'Engineering': 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
  'UI/UX Design': 'text-amber-400 border-amber-500/20 bg-amber-500/10',
}

export default function BlogCard({ post, isFeatured = false }) {
  if (!post) return null

  const categoryBadgeClass = CATEGORY_COLORS[post.category] || 'text-violet-400 border-violet-500/20 bg-violet-500/10'

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent'

  if (isFeatured) {
    return (
      <article className="bento-card p-6 sm:p-8 md:p-10 mb-14 overflow-hidden group transition-all">
        <Link to={`/blog/${post.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Cover Image */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border"
               style={{ borderColor: 'var(--border)' }}>
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="pill-badge bg-black/60 backdrop-blur-md text-emerald-400 border-emerald-500/30">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Featured Deep Dive
              </span>
            </div>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full text-left">
            <div>
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4"
                   style={{ color: 'var(--text-dim)' }}>
                <span className={`pill-badge ${categoryBadgeClass}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formattedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5" title="Live dynamic views">
                  <Eye className="w-3.5 h-3.5 text-violet-400" />
                  {(post.views || 0).toLocaleString()} {post.views === 1 ? 'read' : 'reads'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4 group-hover:text-violet-400 transition-colors leading-snug"
                  style={{ color: 'var(--text-main)' }}>
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 font-light"
                 style={{ color: 'var(--text-muted)' }}>
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full border bg-white/[0.02]"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    >
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Read CTA */}
            <div className="pt-4 border-t flex items-center justify-between"
                 style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar || '/img/profile.jpg'}
                  alt={post.authorName || 'Sahed Alom Sumit'}
                  className="w-8 h-8 rounded-full object-cover border border-violet-500/30"
                />
                <div>
                  <span className="block text-xs font-semibold" style={{ color: 'var(--text-main)' }}>
                    {post.authorName}
                  </span>
                  <span className="block text-[10px]" style={{ color: 'var(--text-dim)' }}>
                    Helsinki, Finland
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-violet-400 group-hover:text-violet-300">
                Read Blog
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // Standard Bento Card
  return (
    <article className="bento-card flex flex-col justify-between h-full group transition-all overflow-hidden p-6 sm:p-7">
      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full justify-between">
        <div>
          {/* Cover image */}
          {post.coverImage && (
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5 border"
                 style={{ borderColor: 'var(--border)' }}>
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <span className={`pill-badge ${categoryBadgeClass} shadow-md`}>
                  {post.category}
                </span>
              </div>
            </div>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-2.5 text-xs font-mono mb-3"
               style={{ color: 'var(--text-dim)' }}>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-heading font-bold tracking-tight mb-3 group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug"
              style={{ color: 'var(--text-main)' }}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm leading-relaxed line-clamp-3 mb-5 font-light"
             style={{ color: 'var(--text-muted)' }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-white/[0.02]"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t flex items-center justify-between text-xs font-mono"
             style={{ borderColor: 'var(--border)' }}>
          <span className="flex items-center gap-1.5" style={{ color: 'var(--text-dim)' }} title="Live dynamic views">
            <Eye className="w-3.5 h-3.5 text-violet-400" />
            {(post.views || 0).toLocaleString()} {post.views === 1 ? 'read' : 'reads'}
          </span>
          <span className="text-violet-400 group-hover:text-violet-300 font-semibold inline-flex items-center gap-1">
            Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </article>
  )
}
