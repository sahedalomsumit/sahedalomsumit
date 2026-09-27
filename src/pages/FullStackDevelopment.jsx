import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import { fetchProjects } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import TechIcon from '../components/TechIcon'
import HubNavigation from '../components/HubNavigation'

export default function FullStackDevelopment() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useSEO({
    title: 'Full-Stack Web Development',
    description: `There's a moment in every project when a platform reaches its ceiling. You need a custom dashboard, a complex data flow, an integration that doesn't exist as a plugin. That's when you need someone who writes the architecture from scratch — frontend to backend, database to deployment.`,
    canonical: '/services/full-stack-development',
  })

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects()
      if (data) setProjects(data)
      setLoading(false)
    }
    loadProjects()
  }, [])

  const tags = ["Web Development", "React", "Next.js", "AI", "Automation"]

  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.tags && p.tags.some(tag => tags.includes(tag)))
  }, [projects, tags])

  const [activeTab, setActiveTab] = useState('frontend')

  const tabContent = {
    frontend: {
      title: 'Frontend Development',
      label: 'Service_Module',
      desc: 'The frontend is your handshake with the world. It\'s the first thing people see, the first thing they feel. I build frontends that don\'t just display content — they create moments. Fast, responsive, animated, and pixel-perfect on every screen.',
      deliverables: 'React/Next.js apps, Responsive layouts, GSAP/Framer Motion animations, Component architecture, Core Web Vitals, Cross-browser testing',
      stack: 'React, Next.js, Vite, Tailwind CSS, GSAP, Framer Motion, TypeScript'
    },
    backend: {
      title: 'Backend Development',
      label: 'Service_Module',
      desc: 'Nobody sees the backend. That\'s the point. But everything your users love — the instant search, the real-time updates, the \'how did it know?\' moments — all runs on the invisible architecture underneath. I build backends that are fast, secure, and built to grow with you.',
      deliverables: 'Database design (PostgreSQL), Supabase integration, REST/GraphQL APIs, Auth systems, Real-time data, Serverless functions',
      stack: 'Supabase, PostgreSQL, Node.js, Express, REST APIs, GraphQL, Edge Functions'
    },
    automation: {
      title: 'AI Automation',
      label: 'AI_Module',
      desc: 'Your best team member doesn\'t sleep, doesn\'t make typos, and never misses a follow-up. I build AI-powered automation workflows that handle the repetitive work — so your team focuses on what actually matters.',
      deliverables: 'Lead Gen & CRM Flows, Content Pipelines, Client Onboarding, AI Chatbots & Assistants, Data Sync & Integrations, Notification Systems',
      stack: 'Make.com, n8n, Zapier, Claude / GPT-4, Gemini API, Supabase Functions'
    },
    seo: {
      title: 'SEO & Optimization',
      label: 'SEO_Module',
      desc: 'A beautiful site that no one finds is a missed opportunity. I layer technical SEO, on-page optimization, and performance tuning into every build — so your site ranks, loads fast, and converts.',
      deliverables: 'Technical SEO Audit, On-Page Optimization, Core Web Vitals, Schema Markup, Page Speed Optimization, SEO Reporting',
      stack: 'Google Search Console, GA4, Semrush, Ahrefs, Lighthouse, PageSpeed Insights'
    }
  }

  return (
    <>
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-emerald-500 transition">Services</Link>
              <span>/</span>
              <span className="text-white">Full-Stack Web Development</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Service_Hub</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-8 italic">
              Full-Stack <br />Development
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed border-l-2 border-emerald-500/30 pl-6">
              There's a moment in every project when a platform reaches its ceiling. You need a custom dashboard, a complex data flow, an integration that doesn't exist as a plugin. That's when you need someone who writes the architecture from scratch — frontend to backend, database to deployment.
            </p>
          </header>
        </RevealOnScroll>

        {/* Tab Navigation */}
        <RevealOnScroll delay={0.1}>
          <div className="mb-24">
            <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-10 border-b border-white/5 pb-4">/ Sub_Services_Architecture</div>
            
            <div className="overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 mb-12">
              <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max md:min-w-0">
                {Object.entries(tabContent).map(([id, content]) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === id 
                      ? 'bg-emerald-500 text-black font-black' 
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
                <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-4">/ {tabContent[activeTab].label}</div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6 italic">{tabContent[activeTab].title}</h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                  {tabContent[activeTab].desc}
                </p>
              </div>
              
              <div className="lg:col-span-5 space-y-6">
                <div className="bento-card p-8 border-emerald-500/20 bg-emerald-500/5">
                  <h3 className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-4">/ Deliverables</h3>
                  <p className="text-gray-300 leading-relaxed text-sm font-light">
                    {tabContent[activeTab].deliverables}
                  </p>
                </div>
                <div className="bento-card p-8 border-white/5">
                  <h3 className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-4">/ Tech_Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {tabContent[activeTab].stack.split(', ').map((tech) => (
                      <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group/tech">
                        <TechIcon name={tech} className="w-3.5 h-3.5 text-emerald-500/50 group-hover/tech:text-emerald-500 transition-colors" />
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
              <Link to="/work" className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">View_All_Work →</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
              {loading ? (
                <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed border-white/10 rounded-2xl">
                  <span className="font-mono text-emerald-500 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
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
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <div className="relative z-10 text-center">
                  <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-[0.6em] mb-6 opacity-50 group-hover:opacity-100 transition-opacity">Full_Archive_Access</div>
                  <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none mb-8">
                    Explore_Everything<span className="text-emerald-500">_</span>
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 group-hover:text-white transition-colors duration-500">
                    <span className="h-[1px] w-12 bg-white/10 group-hover:w-20 group-hover:bg-emerald-500/50 transition-all duration-700"></span>
                    <span className="font-mono text-xs uppercase tracking-widest">Enter_Work_Gallery</span>
                    <span className="h-[1px] w-12 bg-white/10 group-hover:w-20 group-hover:bg-emerald-500/50 transition-all duration-700"></span>
                  </div>
                </div>

                {/* Animated Corner Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <HubNavigation currentSlug="full-stack-development" />

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
