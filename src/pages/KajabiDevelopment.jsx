import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import { fetchProjects } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import TechIcon from '../components/TechIcon'
import HubNavigation from '../components/HubNavigation'

export default function KajabiDevelopment() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useSEO({
    title: 'Kajabi Development',
    description: 'Custom Kajabi portal architecture, high-converting membership sites, course platforms, and sales funnels designed and built by Sahed Alom Sumit.',
    canonical: '/services/kajabi',
  })

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects()
      if (data) setProjects(data)
      setLoading(false)
    }
    loadProjects()
  }, [])

  const tags = ["Kajabi", "WordPress", "Webflow", "Web Development", "Shopify"]

  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.tags && p.tags.some(tag => tags.includes(tag)))
  }, [projects, tags])

  const deliverables = [
    'Bespoke Kajabi website and landing page design',
    'Membership portal & premium course area architecture',
    'High-converting checkout flows with 1-click upsells & order bumps',
    'Automated email nurture sequences and onboarding pipelines',
    'Custom CSS and Liquid tweaks for unique brand experiences',
    'Payment gateway integrations with Stripe and PayPal',
    'Community hub setup, access tiers & content gating'
  ]

  const stack = ['Kajabi', 'CSS', 'Figma', 'Zapier', 'Stripe', 'Liquid']

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
              <Link to="/services/low-no-code-development" className="hover:text-violet-500 transition">Low/No-Code</Link>
              <span>/</span>
              <span className="text-white">Kajabi Development</span>
            </nav>

            <div className="font-mono text-violet-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Sub_Service_Architecture</div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-8 italic">
              Kajabi <br />Development
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed border-l-2 border-violet-500/30 pl-6">
              Turn knowledge into recurring digital revenue. I design and architect high-converting Kajabi portals, course websites, membership dashboards, and email sales funnels that make premium education platforms feel effortless and profitable.
            </p>
          </header>
        </RevealOnScroll>

        {/* Feature Grid & Tech Stack */}
        <RevealOnScroll delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-7 bento-card p-8 sm:p-10 border-violet-500/20 bg-violet-500/5">
              <div className="font-mono text-violet-500 text-[10px] uppercase tracking-widest mb-4">/ What_I_Deliver</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Course & Membership Scalability</h2>
              <ul className="space-y-3.5">
                {deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                    <span className="text-violet-400 mt-1 font-mono text-xs">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bento-card p-8 border-white/5">
                <div className="font-mono text-violet-500 text-[10px] uppercase tracking-widest mb-4">/ Tooling_Stack</div>
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all">
                      <TechIcon name={tech} className="w-4 h-4 text-violet-400" />
                      <span className="text-gray-200 text-xs font-light">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bento-card p-8 border-white/5 bg-white/[0.01]">
                <div className="font-mono text-emerald-400 text-[10px] uppercase tracking-widest mb-3">/ Why_Kajabi</div>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Kajabi unites your website, courses, memberships, email marketing, and checkout funnels in one robust system. Custom tailoring ensures your brand stands out from generic out-of-the-box templates.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Featured Projects */}
        <RevealOnScroll delay={0.2}>
          <div className="mb-20">
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h2 className="text-2xl font-bold tracking-tighter text-white uppercase">Featured_Digital_Products</h2>
              <Link to="/work" className="font-mono text-[10px] text-violet-500 uppercase tracking-widest hover:text-violet-400 transition-colors">
                View_All_Work →
              </Link>
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
                filteredProjects.slice(0, 4).map((p) => (
                  <ProjectCard key={p.id || p.slug} project={p} layout="grid" />
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed border-white/10 rounded-2xl">
                  <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">No_Results_Found</p>
                </div>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <HubNavigation currentSlug="low-no-code-development" />
      <RevealOnScroll><ContactSection /></RevealOnScroll>
    </>
  )
}
