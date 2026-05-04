import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const services = [
  {
    num: '01',
    slug: 'figma-design',
    label: 'Design_Module',
    title: 'Figma Design',
    tagline: 'From blank canvas to pixel-perfect prototype — UI/UX that converts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="8" rx="4" />
        <rect x="3" y="13" width="8" height="8" rx="4" />
        <circle cx="17" cy="17" r="4" />
      </svg>
    ),
    color: 'violet',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/10',
  },
  {
    num: '02',
    slug: 'webflow-development',
    label: 'Webflow_Module',
    title: 'Webflow Development',
    tagline: 'Designer-grade sites with client-editable CMS and buttery animations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    color: 'emerald',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
  {
    num: '03',
    slug: 'wordpress-development',
    label: 'WordPress_Module',
    title: 'WordPress Development',
    tagline: 'Powerful, flexible WP builds with WooCommerce, Elementor, and speed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
      </svg>
    ),
    color: 'violet',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/10',
  },
  {
    num: '04',
    slug: 'framer-development',
    label: 'Framer_Module',
    title: 'Framer Development',
    tagline: 'Motion-rich, modern sites built in Framer with fluid interactions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 3h14v8H5zM5 11l7 10 7-10H5z" />
      </svg>
    ),
    color: 'emerald',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
  {
    num: '05',
    slug: 'custom-development',
    label: 'Custom_Dev_Module',
    title: 'Custom Development',
    tagline: 'React, Supabase, and clean code — when no-code simply isn\'t enough.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    color: 'violet',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/10',
  },
  {
    num: '06',
    slug: 'ai-automation',
    label: 'AI_Automation_Module',
    title: 'AI Automation',
    tagline: 'Workflows that think. Make.com, n8n, Zapier, and custom AI pipelines.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z" /><path d="M6 8v2a6 6 0 0012 0V8" /><path d="M12 16v6M9 22h6" />
      </svg>
    ),
    color: 'emerald',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
  {
    num: '07',
    slug: 'seo-optimization',
    label: 'SEO_Module',
    title: 'SEO & Optimization',
    tagline: 'Technical SEO, Core Web Vitals, speed tuning — built to rank and convert.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
      </svg>
    ),
    color: 'violet',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/10',
  },
  {
    num: '08',
    slug: 'shopify-development',
    label: 'Shopify_Module',
    title: 'Shopify Development',
    tagline: 'Custom Shopify themes, migrations, and headless e-commerce builds.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    color: 'emerald',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
  {
    num: '09',
    slug: 'android-app-development',
    label: 'Mobile_Module',
    title: 'Android App Dev',
    tagline: 'High-performance mobile apps built with Flutter and Dart for Android.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    color: 'violet',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/10',
  },
]

const stats = [
  { value: '150+', label: 'Projects_Delivered' },
  { value: '10+', label: 'Countries_Served' },
  { value: '5★', label: 'Avg_Client_Rating' },
  { value: '5yr+', label: 'Years_Experience' },
]

export default function Services() {
  useSEO({
    title: 'Services | Figma, Webflow, WordPress, AI Automation',
    description: 'Explore Sahed Alom Sumit\'s full-stack web services: Figma design, Webflow development, WordPress, Framer, custom coding, AI automation, and SEO optimization.',
    canonical: '/services',
  })

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
              <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
              <span>/</span>
              <span className="text-white">Services</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Service_Stack</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              What I<br /><span className="text-violet-500">Build</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              From Figma concepts to fully deployed, SEO-optimized websites — I cover the full spectrum. Design thinking meets clean code. Vibe-coded to convert.
            </p>
          </header>
        </RevealOnScroll>

        {/* Stats bar */}
        <RevealOnScroll>
          <div className="bento-card p-8 mb-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white tracking-tighter group-hover:text-violet-400 transition-colors">{s.value}</div>
                <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Service Cards Grid */}
        <RevealOnScroll>
          <div className="mb-6">
            <div className="block sm:flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h2 className="text-2xl font-bold tracking-tighter text-white uppercase">Service_Inventory</h2>
              <span className="font-mono text-xs text-emerald-500">09_MODULES_ACTIVE</span>
            </div>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <RevealOnScroll key={s.slug} delay={i * 0.06}>
              <Link
                to={`/services/${s.slug}`}
                className={`bento-card p-8 flex flex-col justify-between group cursor-pointer ${s.border} ${s.bg} hover:shadow-2xl hover:${s.glow} transition-all min-h-[280px]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`${s.text} opacity-80 group-hover:opacity-100 transition-opacity`}>{s.icon}</div>
                    <span className={`font-mono text-[10px] ${s.text} opacity-50`}>{s.num}_</span>
                  </div>
                  <div className={`font-mono ${s.text} text-[10px] uppercase tracking-widest mb-3`}>/ {s.label}</div>
                  <h3 className="text-xl font-black text-white tracking-tighter mb-3 group-hover:text-white/90">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{s.tagline}</p>
                </div>
                <div className={`mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest ${s.text} opacity-70 group-hover:opacity-100 transition-opacity`}>
                  Explore_Module
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5" />
                  </svg>
                </div>
              </Link>
            </RevealOnScroll>
          ))}

          {/* CTA card */}
          <RevealOnScroll delay={0.5}>
            <div className="bento-card p-8 flex flex-col justify-between group border-white/5 min-h-[280px]">
              <div>
                <div className="font-mono text-gray-500 text-[10px] uppercase tracking-widest mb-6">/ Need_Custom_Scope</div>
                <h3 className="text-xl font-black text-white tracking-tighter mb-3">Not sure what you need?</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Let's talk. I'll help you figure out the right stack, scope, and timeline for your project.
                </p>
              </div>
              <Link
                to="/#contact"
                className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white opacity-50 hover:opacity-100 transition-opacity"
              >
                Let's_Chat
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 px-4 border-y border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6">/ How_It_Works</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-16">
              The Process_
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', desc: 'We align on goals, target users, and project scope before a single pixel moves.' },
              { step: '02', title: 'Design', desc: 'Wireframes, UI mockups, and prototypes tuned to your brand and conversion goals.' },
              { step: '03', title: 'Build', desc: 'Clean, performant code — Webflow, WordPress, React, or whichever stack fits best.' },
              { step: '04', title: 'Launch', desc: 'QA, speed testing, SEO checks, and a smooth handoff with full documentation.' },
            ].map((item, i) => (
              <RevealOnScroll key={item.step} delay={i * 0.1}>
                <div className="bento-card p-8 group h-full">
                  <div className="font-mono text-violet-500/40 text-5xl font-black mb-6 group-hover:text-violet-500/60 transition-colors">{item.step}_</div>
                  <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
