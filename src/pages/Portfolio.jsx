import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import { fetchProjects } from '../lib/supabase'

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects()
      if (data) setProjects(data)
      setLoading(false)
    }
    loadProjects()
  }, [])

  return (
    <>
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-16 text-left flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center justify-start gap-2">
                 <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
                 <span>/</span>
                 <span className="text-white">Portfolio</span>
              </nav>
              <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-4">Main_All_Builds</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
                Curated<br /><span className="text-violet-500">Portfolio</span>
              </h1>
              <p className="mt-6 text-gray-400 text-lg max-w-2xl font-light">
                Explore a collection of high-performance web solutions built with clean code and modern vibe design.
              </p>
            </div>
          </header>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-16 min-h-[50vh]">
          {loading ? (
            <div className="text-center font-mono text-emerald-500 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              Fetching_Builds...
            </div>
          ) : (
            projects.map(p => (
              <RevealOnScroll key={p.id || p.slug}>
                <ProjectCard project={p} layout="full" />
              </RevealOnScroll>
            ))
          )}
        </div>
      </section>

      <ContactSection />
    </>
  )
}
