import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

import TechIcon from '../components/TechIcon'

const categories = [
  {
    num: '01',
    slug: 'full-stack-development',
    label: 'Full_Stack_Hub',
    title: 'Full-Stack Web Development',
    tagline: 'Custom dashboards, complex data flows, and integrations written from scratch.',
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
    subServices: [
      { name: 'Frontend Development', slug: 'frontend-development', tech: 'react' },
      { name: 'Backend Development', slug: 'backend-development', tech: 'node' },
      { name: 'AI Automation', slug: 'ai-automation', tech: 'zapier' },
      { name: 'SEO & Optimization', slug: 'seo-optimization', tech: 'nextjs' }
    ]
  },
  {
    num: '02',
    slug: 'low-no-code-development',
    label: 'Low_No_Code_Hub',
    title: 'Low/No-Code Web Development',
    tagline: 'Building something powerful without reinventing the wheel.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
      </svg>
    ),
    color: 'violet',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    text: 'text-violet-500',
    glow: 'shadow-violet-500/10',
    subServices: [
      { name: 'WordPress', slug: 'wordpress-development', tech: 'wordpress' },
      { name: 'Webflow', slug: 'webflow-development', tech: 'webflow' },
      { name: 'Shopify', slug: 'shopify-development', tech: 'shopify' }
    ]
  },
  {
    num: '03',
    slug: 'ui-ux-design',
    label: 'Design_Hub',
    title: 'UI/UX Design',
    tagline: 'Every great digital product starts with a conversation, not a canvas.',
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
    text: 'text-violet-500',
    glow: 'shadow-violet-500/10',
    subServices: [
      { name: 'Figma Design', slug: 'figma-design', tech: 'figma' }
    ]
  },
  {
    num: '04',
    slug: 'app-development',
    label: 'App_Hub',
    title: 'App Development',
    tagline: 'Cross-platform mobile apps with Flutter and Dart.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    color: 'emerald',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
    subServices: [
      { name: 'Android App Development', slug: 'android-app-development', tech: 'flutter' },
      { name: 'iOS App Development', slug: 'ios-app-development', tech: 'flutter' }
    ]
  },
  {
    num: '05',
    slug: 'tools',
    label: 'Tools_Hub',
    title: 'Tools',
    tagline: 'Purpose-built browser extensions and developer tools.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    color: 'violet',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    text: 'text-violet-500',
    glow: 'shadow-violet-500/10',
    subServices: [
      { name: 'Google Chrome Extension', slug: 'google-extension', tech: 'chrome' }
    ]
  }
]

const stats = [
  { value: '150+', label: 'Projects_Delivered' },
  { value: '10+', label: 'Countries_Served' },
  { value: '5★', label: 'Avg_Client_Rating' },
  { value: '5yr+', label: 'Years_Experience' },
]

export default function Services() {
  useSEO({
    title: 'Services Hub | Sahed Alom Sumit',
    description: `Explore my specialized service hubs: UI/UX Design, Full-Stack Web Development, Low/No-Code Solutions, App Development, and Custom Tools.`,
    canonical: '/services',
  })

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
              <span>/</span>
              <span className="text-white">Services</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Service_Architecture</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              What I<br /><span className="text-violet-500">Build</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              From Figma concepts to fully deployed, SEO-optimized platforms — I cover the full spectrum. Design thinking meets clean code. Vibe-coded to convert.
            </p>
          </header>
        </RevealOnScroll>

        {/* Stats bar */}
        <RevealOnScroll>
          <div className="bento-card p-8 mb-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white tracking-tighter group-hover:text-violet-500 transition-colors">{s.value}</div>
                <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Category Cards Grid */}
        <RevealOnScroll>
          <div className="mb-6">
            <div className="block sm:flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h2 className="text-2xl font-bold tracking-tighter text-white uppercase">Service_Hubs</h2>
              <span className="font-mono text-xs text-emerald-500">05_HUBS_ACTIVE</span>
            </div>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c, i) => (
            <RevealOnScroll key={c.slug} delay={i * 0.06}>
              <Link 
                to={`/services/${c.slug}`}
                className={`bento-card p-8 flex flex-col justify-between group ${c.border} ${c.bg} hover:shadow-2xl hover:${c.glow} transition-all h-full block cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`${c.text} opacity-80 group-hover:opacity-100 transition-opacity`}>{c.icon}</div>
                    <span className={`font-mono text-[10px] ${c.text} opacity-50`}>{c.num}_</span>
                  </div>
                  <div className={`font-mono ${c.text} text-[10px] uppercase tracking-widest mb-3`}>/ {c.label}</div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-4 group-hover:text-white/90 transition-colors uppercase italic">{c.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light mb-8">{c.tagline}</p>
                  
                  {/* Sub-services list - Now just visual or linking to the same hub */}
                  <div className="space-y-2">
                    {c.subServices.map(sub => (
                      <div 
                        key={sub.slug}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.05] group-hover:border-white/10 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <TechIcon name={sub.tech || sub.name} className={`w-4 h-4 ${c.text} opacity-50 group-hover:opacity-100 transition-all`} />
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{sub.name}</span>
                        </div>
                        <svg className={`w-4 h-4 ${c.text} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={`mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest ${c.text} opacity-70 group-hover:opacity-100 transition-opacity`}
                >
                  Explore_Hub
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5" />
                  </svg>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
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
