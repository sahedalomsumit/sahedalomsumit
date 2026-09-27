import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import { fetchProjects } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Work() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  useSEO({
    title: 'Selected Work & Case Studies',
    description: `Explore the selected portfolio of Sahed Alom Sumit, featuring high-performance websites across Webflow, WordPress, React, and custom full-stack solutions.`,
    canonical: '/work',
  })

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects()
        if (data) setProjects(data)
      } catch (err) {
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const allTags = useMemo(() => {
    return Array.from(new Set(projects.flatMap(p => p.tags || []))).sort()
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch =
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTag = selectedTag ? p.tags?.includes(selectedTag) : true
      return matchesSearch && matchesTag
    })
  }, [projects, searchQuery, selectedTag])

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [filteredProjects])

  return (
    <>
      <section id="work" className="py-20 sm:py-24 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-14 text-left">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="text-xs tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
              <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-main)' }} className="font-semibold">Selected Work</span>
            </nav>

            <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-4 inline-flex">
              Curated Work
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight uppercase leading-none mb-6"
                style={{ color: 'var(--text-main)' }}>
              Crafted <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </h1>

            <p className="mb-10 text-base sm:text-lg max-w-2xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              A curated collection of web applications, custom CMS platforms, and design systems engineered for high performance, intuitive UX, and measurable conversion.
            </p>

            {/* Filter & Search Bar */}
            {!loading && projects.length > 0 && (
              <div className="space-y-4 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-80">
                    <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by title, industry, tech..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs transition-all outline-none border focus:border-violet-500"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-main)',
                      }}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Count Display */}
                  <div className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                    Showing <span className="font-bold text-violet-400">{filteredProjects.length}</span> of {projects.length} Projects
                  </div>
                </div>

                {/* Category Filter Pills (Horizontal Scrollable) */}
                <div className="flex overflow-x-auto no-scrollbar gap-2 pt-1 pb-2">
                  <button
                    onClick={() => setSelectedTag('')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap border ${
                      selectedTag === ''
                        ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30'
                        : 'hover:border-white/20'
                    }`}
                    style={selectedTag !== '' ? {
                      backgroundColor: 'var(--card-bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)'
                    } : {}}
                  >
                    All Categories ({projects.length})
                  </button>

                  {allTags.map(tag => {
                    const isSelected = selectedTag === tag
                    const count = projects.filter(p => p.tags?.includes(tag)).length
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(isSelected ? '' : tag)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap border flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30'
                            : 'hover:border-white/20'
                        }`}
                        style={!isSelected ? {
                          backgroundColor: 'var(--card-bg)',
                          borderColor: 'var(--border)',
                          color: 'var(--text-muted)'
                        } : {}}
                      >
                        <span>{tag}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </header>
        </RevealOnScroll>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 min-h-[50vh]">
          {loading ? (
            <div className="col-span-1 md:col-span-2 text-center py-24 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              <p className="font-mono text-xs text-violet-400 uppercase tracking-widest">
                Fetching Project Database...
              </p>
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((p, idx) => (
              <RevealOnScroll key={p.id || p.slug} delay={(idx % 2) * 0.08}>
                <ProjectCard project={p} layout="grid" />
              </RevealOnScroll>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed rounded-3xl p-8"
                 style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card-bg)' }}>
              <div className="w-12 h-12 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p className="font-heading font-bold text-lg mb-1" style={{ color: 'var(--text-main)' }}>
                No Projects Match Your Filter
              </p>
              <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: 'var(--text-muted)' }}>
                Try resetting your search query or selecting a different category.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedTag(''); }}
                className="px-6 py-2.5 rounded-full bg-violet-600 text-white text-xs font-semibold tracking-wide hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/25"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
