import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import { fetchProjects } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import TechIcon from '../components/TechIcon'
import HubNavigation from '../components/HubNavigation'

export default function UIUXDesign() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useSEO({
    title: 'UI/UX Design | Sahed Alom Sumit',
    description: `Every great digital product starts with a conversation, not a canvas. Before I open Figma, before I pick a single color, I sit with you and ask the hard questions: Who's using this? What are they trying to do? What's standing in their way? That's where design begins — at the intersection of empathy and intent.`,
    canonical: '/services/ui-ux-design',
  })

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects()
      if (data) setProjects(data)
      setLoading(false)
    }
    loadProjects()
  }, [])

  const tags = ["Web Design", "UI/UX"]

  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.tags && p.tags.some(tag => tags.includes(tag)))
  }, [projects, tags])

  const [activeTab, setActiveTab] = useState('figma')

  const tabContent = {
    figma: {
      title: 'Figma Design',
      label: 'Design_Module',
      desc: 'Great products start with great design. I create thoughtful UI/UX in Figma — from rough wireframes to polished, dev-ready prototypes that your team can build from with confidence.',
      deliverables: 'User Research, Wireframes, High-Fidelity UI Design, Interactive Prototypes, Design Systems, Dev-Ready Handoff',
      stack: 'Figma, FigJam, Design Systems, Auto Layout, Variables, Prototyping'
    }
  }

  return (
    <>
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-violet-500 transition">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-violet-500 transition">Services</Link>
              <span>/</span>
              <span className="text-white">UI/UX Design</span>
            </nav>
            <div className="font-mono text-violet-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Service_Hub</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-8 italic">
              UI/UX <br />Design
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed border-l-2 border-violet-500/30 pl-6">
              Every great digital product starts with a conversation, not a canvas. Before I open Figma, before I pick a single color, I sit with you and ask the hard questions: Who's using this? What are they trying to do? What's standing in their way? That's where design begins — at the intersection of empathy and intent.
            </p>
          </header>
        </RevealOnScroll>

        {/* Tab Navigation */}
        <RevealOnScroll delay={0.1}>
          <div className="mb-24">
            <div className="font-mono text-violet-500 text-[10px] uppercase tracking-widest mb-10 border-b border-white/5 pb-4">/ Sub_Services_Architecture</div>
            
            <div className="overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 mb-12">
              <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max md:min-w-0">
                {Object.entries(tabContent).map(([id, content]) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === id 
                      ? 'bg-violet-500 text-black font-black' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {content.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="font-mono text-violet-500 text-[10px] uppercase tracking-widest mb-4">/ {tabContent[activeTab].label}</div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6 italic">{tabContent[activeTab].title}</h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                  {tabContent[activeTab].desc}
                </p>
              </div>
              
              <div className="lg:col-span-5 space-y-6">
                <div className="bento-card p-8 border-violet-500/20 bg-violet-500/5">
                  <h3 className="font-mono text-[10px] text-violet-500 uppercase tracking-widest mb-4">/ Deliverables</h3>
                  <p className="text-gray-300 leading-relaxed text-sm font-light">
                    {tabContent[activeTab].deliverables}
                  </p>
                </div>
                <div className="bento-card p-8 border-white/5">
                  <h3 className="font-mono text-[10px] text-violet-500 uppercase tracking-widest mb-4">/ Tech_Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {tabContent[activeTab].stack.split(', ').map((tech) => (
                      <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all group/tech">
                        <TechIcon name={tech} className="w-3.5 h-3.5 text-violet-500/50 group-hover/tech:text-violet-500 transition-colors" />
                        <span className="text-gray-300 text-xs font-light group-hover/tech:text-white transition-colors">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="mb-20">
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h2 className="text-2xl font-bold tracking-tighter text-white uppercase">Featured_Builds</h2>
              <Link to="/work" className="font-mono text-[10px] text-violet-500 uppercase tracking-widest hover:text-violet-400 transition-colors">View_All_Work →</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
              {loading ? (
                <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed border-white/10 rounded-2xl">
                  <span className="font-mono text-violet-500 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-ping" />
                    Fetching_Builds...
                  </span>
                </div>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.slice(0, 4).map(p => (
                  <ProjectCard key={p.id || p.slug} project={p} layout="grid" />
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed border-white/10 rounded-2xl">
                  <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">No_Results_Found</p>
                </div>
              )}
            </div>

            <div className="mt-20">
              <Link 
                to="/work" 
                className="group relative flex flex-col items-center justify-center py-20 px-4 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <div className="relative z-10 text-center">
                  <div className="font-mono text-violet-500 text-[10px] uppercase tracking-[0.6em] mb-6 opacity-50 group-hover:opacity-100 transition-opacity">Full_Archive_Access</div>
                  <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none mb-8">
                    Explore_Everything<span className="text-violet-500">_</span>
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 group-hover:text-white transition-colors duration-500">
                    <span className="h-[1px] w-12 bg-white/10 group-hover:w-20 group-hover:bg-violet-500/50 transition-all duration-700"></span>
                    <span className="font-mono text-xs uppercase tracking-widest">Enter_Work_Gallery</span>
                    <span className="h-[1px] w-12 bg-white/10 group-hover:w-20 group-hover:bg-violet-500/50 transition-all duration-700"></span>
                  </div>
                </div>

                {/* Animated Corner Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <HubNavigation currentSlug="ui-ux-design" />

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
