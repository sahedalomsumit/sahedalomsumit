import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { fetchProjectBySlug, fetchAdjacentProjects } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [adjacent, setAdjacent] = useState({ prev: null, next: null })
  const [loading, setLoading] = useState(true)

  useSEO({
    title: project ? `${project.title} — Case Study` : 'Project Detail',
    description: project ? project.shortDescription : 'Explore detailed project insights, design process, and technical implementation by Sahed Alom Sumit.',
    canonical: `/work/${slug}`,
    image: project?.thumbnailUrl || project?.thumbnail_url,
  })

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const projectData = await fetchProjectBySlug(slug)
        if (projectData) {
          setProject(projectData)
          const adj = await fetchAdjacentProjects(slug)
          setAdjacent(adj)
        }
      } catch (err) {
        console.error('Error loading project detail:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [slug])

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="font-mono text-xs text-violet-400 uppercase tracking-widest">
            Loading Case Study...
          </p>
        </div>
      </section>
    )
  }

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-heading font-black mb-4" style={{ color: 'var(--text-main)' }}>404</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Case study not found or currently unavailable.</p>
          <Link
            to="/work"
            className="px-6 py-3 rounded-full bg-violet-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-violet-600/30"
          >
            Back to Selected Works
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 sm:py-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-12">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="text-xs tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
              <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/work" className="hover:text-violet-400 transition-colors">Work</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-main)' }} className="font-semibold truncate max-w-xs">{project.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
              <div>
                <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-4 inline-flex">
                  {project.industry || 'Case Study'}
                </span>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight uppercase leading-[0.95]"
                    style={{ color: 'var(--text-main)' }}>
                  {project.title}
                </h1>

                <p className="mt-4 text-base sm:text-lg max-w-2xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {project.shortDescription || `A custom digital experience engineered for high performance, intuitive UX, and conversion.`}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {(project.tags || []).map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono uppercase border"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-button w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 shrink-0 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--hire-btn-bg)',
                    color: 'var(--hire-btn-text)',
                  }}
                >
                  <span>Visit Live Project</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </header>
        </RevealOnScroll>

        {/* Hero Showcase Image */}
        <RevealOnScroll>
          <div className="aspect-[16/9] bento-card overflow-hidden relative border shadow-2xl mb-16 rounded-3xl"
               style={{ borderColor: 'var(--border)' }}>
            <img
              src={project.thumbnailUrl}
              alt={`${project.title} - Showcase Presentation`}
              fetchpriority="high"
              decoding="async"
              className="object-cover w-full h-full"
            />
          </div>
        </RevealOnScroll>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Quick Stats Sidebar */}
          <RevealOnScroll className="lg:col-span-4">
            <div className="bento-card p-6 sm:p-8 h-full space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-violet-400 block">
                Project Specs
              </span>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-dim)' }}>
                    Industry Domain
                  </span>
                  <p className="text-base font-bold" style={{ color: 'var(--text-main)' }}>
                    {project.industry}
                  </p>
                </div>

                {project.year && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-dim)' }}>
                      Year Delivered
                    </span>
                    <p className="text-base font-bold" style={{ color: 'var(--text-main)' }}>
                      {project.year}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider block mb-2" style={{ color: 'var(--text-dim)' }}>
                    Core Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(project.techStack || []).map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase bg-violet-500/10 border border-violet-500/20 text-violet-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.liveUrl && (
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-dim)' }}>
                      Verified URL
                    </span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-400 hover:underline break-all block"
                    >
                      {project.liveUrl} ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>

          {/* Narrative Blocks */}
          <div className="lg:col-span-8 space-y-6">
            {project.fullDescription && (
              <RevealOnScroll>
                <div className="bento-card p-8 sm:p-10">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-3">
                    Project Overview
                  </span>
                  <p className="text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                    {project.fullDescription}
                  </p>
                </div>
              </RevealOnScroll>
            )}

            {project.challenge && (
              <RevealOnScroll>
                <div className="bento-card p-8 sm:p-10">
                  <span className="text-xs font-mono uppercase tracking-wider text-violet-400 block mb-3">
                    The Challenge
                  </span>
                  <p className="text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                    {project.challenge}
                  </p>
                </div>
              </RevealOnScroll>
            )}

            {project.solution && (
              <RevealOnScroll>
                <div className="bento-card p-8 sm:p-10">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-3">
                    The Solution
                  </span>
                  <p className="text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                    {project.solution}
                  </p>
                </div>
              </RevealOnScroll>
            )}

            {project.results && (
              <RevealOnScroll>
                <div className="bento-card p-8 sm:p-10">
                  <span className="text-xs font-mono uppercase tracking-wider text-violet-400 block mb-3">
                    Business Results & Impact
                  </span>
                  <p className="text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                    {project.results}
                  </p>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </div>

        {/* Key Features Highlights */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <RevealOnScroll>
            <div className="mb-16">
              <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-3 inline-flex">
                Highlights
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold uppercase mb-8" style={{ color: 'var(--text-main)' }}>
                Key Technical Features
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.keyFeatures.map((feature, i) => (
                  <div key={i} className="bento-card p-6 flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-violet-500/20">
                      0{i + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed" style={{ color: 'var(--text-main)' }}>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Adjacent Navigation */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            {adjacent.prev && (
              <Link to={`/work/${adjacent.prev.slug}`} className="bento-card p-6 sm:p-8 group hover:-translate-y-1 transition-all">
                <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider block mb-2">
                  ← Previous Case Study
                </span>
                <h4 className="text-xl font-bold group-hover:text-violet-400 transition-colors" style={{ color: 'var(--text-main)' }}>
                  {adjacent.prev.title}
                </h4>
                <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
                  {adjacent.prev.industry}
                </p>
              </Link>
            )}

            {adjacent.next && (
              <Link to={`/work/${adjacent.next.slug}`} className="bento-card p-6 sm:p-8 group hover:-translate-y-1 transition-all sm:text-right sm:ml-auto w-full">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-2">
                  Next Case Study →
                </span>
                <h4 className="text-xl font-bold group-hover:text-emerald-400 transition-colors" style={{ color: 'var(--text-main)' }}>
                  {adjacent.next.title}
                </h4>
                <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
                  {adjacent.next.industry}
                </p>
              </Link>
            )}
          </div>
        </RevealOnScroll>
      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
