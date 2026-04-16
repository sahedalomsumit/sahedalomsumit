import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const deliverables = [
  { icon: '⬡', title: 'Custom Webflow Design & Build', desc: 'Pixel-perfect Webflow sites built from your Figma designs or designed from scratch — responsive, fast, and launch-ready.' },
  { icon: '◻', title: 'CMS Architecture', desc: 'Scalable Webflow CMS collections so your team can add blog posts, projects, and products without touching code.' },
  { icon: '◈', title: 'Webflow Animations & Interactions', desc: 'Scroll-triggered animations, hover effects, and micro-interactions that make visitors stop and stare.' },
  { icon: '◉', title: 'Spline 3D Integration', desc: 'Immersive 3D scenes embedded into Webflow — the kind of detail that signals premium brand quality.' },
  { icon: '▦', title: 'E-Commerce (Webflow Store)', desc: 'Product catalogs, cart flows, and payment integration — everything a lean online store needs.' },
  { icon: '◌', title: 'SEO & Performance', desc: 'Clean semantic markup, meta setup, sitemap, and speed-optimized assets baked in from day one.' },
]

const process = [
  { num: '01', title: 'Design Audit / Handoff Review', desc: 'I review your Figma files or brief to identify component patterns, CMS needs, and interaction scope.' },
  { num: '02', title: 'Webflow Setup', desc: 'Project configuration, custom fonts, global styles, and CMS schema are established before building begins.' },
  { num: '03', title: 'Page & Component Build', desc: 'Every section is built with clean symbols, responsive breakpoints, and clean class naming conventions.' },
  { num: '04', title: 'Interactions & Animations', desc: 'Scroll triggers, hover states, and IX2 animations are layered in to bring the design to life.' },
  { num: '05', title: 'QA, SEO & Launch', desc: 'Full cross-browser and device QA, SEO meta, sitemap, robots.txt — then publish to your domain.' },
]

const tools = ['Webflow', 'Webflow CMS', 'Webflow Interactions (IX2)', 'Webflow E-Commerce', 'Spline 3D', 'GSAP in Webflow', 'Custom Code Embeds', 'Lottie Animations', 'SEO Optimization', 'Responsive Design', 'Finsweet Attributes', 'Client-First CSS']

const highlights = [
  { value: '40+', label: 'Webflow Projects' },
  { value: '100%', label: 'JSS Score (Upwork)' },
  { value: '5★', label: 'Avg Rating' },
  { value: 'Expert', label: 'Webflow Certified' },
]

const related = [
  { slug: 'figma-design', title: 'Figma Design', label: 'Design_Module' },
  { slug: 'framer-development', title: 'Framer Development', label: 'Framer_Module' },
  { slug: 'seo-optimization', title: 'SEO & Optimization', label: 'SEO_Module' },
]

export default function WebflowDevelopment() {
  useSEO({
    title: 'Webflow Development Services | Expert Webflow Developer',
    description: 'Expert Webflow development: custom sites, CMS, animations, e-commerce, and Spline 3D. Webflow certified. 40+ projects delivered globally.',
    canonical: '/services/webflow-development',
  })

  return (
    <>
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-emerald-500 transition">Services</Link>
              <span>/</span>
              <span className="text-white">Webflow Development</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Webflow_Module // 02</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              Webflow<br /><span className="text-emerald-500">Dev_</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              I'm a Webflow Expert with 40+ projects delivered across 10+ countries. I build designer-grade Webflow sites with client-editable CMS, buttery animations, and scores that actually rank.
            </p>
            {/* Certified badge */}
            <div className="mt-8 inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Webflow Expert Certified · 101 Course Complete</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/portfolio" className="px-8 py-3 bg-emerald-500 text-black font-black rounded-full text-xs tracking-[0.2em] hover:bg-white transition-all uppercase">
                See Webflow Projects
              </Link>
              <Link to="/quote"
                className="px-8 py-3 bento-card text-white font-bold rounded-full text-xs tracking-[0.2em] hover:border-emerald-500 transition-all uppercase">
                Get a Quote
              </Link>
            </div>
          </header>
        </RevealOnScroll>

        {/* Stats */}
        <RevealOnScroll>
          <div className="bento-card p-8 mb-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-emerald-500/10 bg-emerald-500/5">
            {highlights.map((h) => (
              <div key={h.label} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white tracking-tighter group-hover:text-emerald-400 transition-colors">{h.value}</div>
                <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-2">{h.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Deliverables */}
        <RevealOnScroll>
          <div className="block sm:flex items-center justify-between mb-10 border-b border-white/5 pb-6">
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase">What_You_Get</h2>
            <span className="font-mono text-xs text-emerald-500">06_DELIVERABLES</span>
          </div>
        </RevealOnScroll>
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((d, i) => (
            <RevealOnScroll key={d.title} delay={i * 0.07}>
              <div className="bento-card p-8 group border-emerald-500/10 bg-emerald-500/5 hover:border-emerald-500/40 h-full">
                <div className="text-emerald-400 text-3xl mb-5 font-mono">{d.icon}</div>
                <h3 className="text-base font-bold text-white mb-3 uppercase tracking-tight">{d.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{d.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Process */}
        <RevealOnScroll>
          <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-4">/ Build_Process</div>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase mb-10">How It Works_</h2>
        </RevealOnScroll>
        <div className="mb-20 space-y-4">
          {process.map((p, i) => (
            <RevealOnScroll key={p.num} delay={i * 0.08}>
              <div className="bento-card p-8 flex flex-col md:flex-row md:items-center gap-6 group hover:border-emerald-500/40">
                <div className="font-mono text-emerald-500/30 text-4xl font-black group-hover:text-emerald-500/60 transition-colors shrink-0 w-16">{p.num}_</div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{p.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Tools */}
        <RevealOnScroll>
          <div className="bento-card p-8 mb-20 border-emerald-500/10 bg-emerald-500/5">
            <div className="font-mono text-emerald-400 text-[10px] uppercase tracking-widest mb-8">/ Webflow_Stack</div>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span key={t} className="skill-tag hover:border-emerald-500">{t}</span>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Related */}
        <RevealOnScroll>
          <div className="font-mono text-gray-500 text-[10px] uppercase tracking-widest mb-6">/ Related_Services</div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r, i) => (
            <RevealOnScroll key={r.slug} delay={i * 0.08}>
              <Link to={`/services/${r.slug}`} className="bento-card p-6 flex items-center justify-between group hover:border-emerald-500/40">
                <div>
                  <div className="font-mono text-emerald-400 text-[9px] uppercase tracking-widest mb-1">/ {r.label}</div>
                  <div className="text-white font-bold text-sm">{r.title}</div>
                </div>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
