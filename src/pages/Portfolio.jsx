import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import { fetchProjects } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  useSEO({
    title: 'Portfolio',
    description: 'Explore the selected works of Sahed Alom Sumit, featuring high-performance websites across Webflow, WordPress, and custom development.',
    canonical: '/portfolio',
  })

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects()
      if (data) setProjects(data)
      setLoading(false)
    }
    loadProjects()
  }, [])

  const allTags = useMemo(() => {
    return Array.from(new Set(projects.flatMap(p => p.tags || []))).sort()
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTag = selectedTag ? p.tags?.includes(selectedTag) : true
      return matchesSearch && matchesTag
    })
  }, [projects, searchQuery, selectedTag])

  useEffect(() => {
    // Refresh GSAP ScrollTrigger calculations after DOM updates from filtering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [filteredProjects])

  return (
    <>
      <section id="portfolio" className="py-24 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-16 text-left flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="w-full">
              <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center justify-start gap-2">
                <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
                <span>/</span>
                <span className="text-white">Portfolio</span>
              </nav>
              <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-4">Main_All_Builds</div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
                Curated<br /><span className="text-violet-500">Portfolio</span>
              </h1>
              <p className="mb-8 text-gray-400 text-lg max-w-2xl font-light">
                Explore a collection of high-performance web solutions built with clean code and modern vibe design.
              </p>

              {/* Filter System */}
              {!loading && projects.length > 0 && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                    <span className="font-mono text-gray-400 text-sm uppercase tracking-widest">Filter</span>
                    <span className="font-mono text-emerald-500 text-sm font-bold tracking-widest uppercase">
                      {String(filteredProjects.length).padStart(2, '0')}_{filteredProjects.length === 1 ? 'BUILD' : 'BUILDS'}_ACTIVE
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Search by title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64 bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition focus:ring-1 focus:ring-violet-500"
                    />
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full sm:w-64 bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition focus:ring-1 focus:ring-violet-500 appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
                    >
                      <option value="" className="bg-[#0a0a0a] text-white">All Categories</option>
                      {allTags.map(tag => (
                        <option key={tag} value={tag} className="bg-[#0a0a0a] text-white">{tag}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </header>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 min-h-[50vh]">
          {loading ? (
            <div className="col-span-1 md:col-span-2 text-center font-mono text-emerald-500 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              Fetching_Builds...
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map(p => (
              <RevealOnScroll key={p.id || p.slug}>
                <ProjectCard project={p} layout="grid" />
              </RevealOnScroll>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed border-white/10 rounded-2xl">
              <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">No_Results_Found</p>
              <p className="text-gray-600 text-sm">Try adjusting your filters or search query.</p>
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
