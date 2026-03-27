import { useState, useEffect } from 'react'
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase">Main_All_Builds</h2>
              <p className="text-gray-500 mt-3 text-lg italic">Curated high-performance web solutions.</p>
            </div>
          </div>
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
