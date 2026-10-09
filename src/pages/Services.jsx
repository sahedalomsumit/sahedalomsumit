import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'
import TechIcon from '../components/TechIcon'

const categories = [
  {
    num: '01',
    slug: 'full-stack-development',
    label: 'Architecture & Engineering',
    title: 'Full-Stack Web Development',
    tagline: 'Custom web applications, complex state workflows, and modern cloud integrations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    badge: 'High Performance',
    badgeColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    accentColor: 'text-emerald-400',
    subServices: [
      { name: 'Frontend Development', tech: 'react' },
      { name: 'Backend Development', tech: 'node' },
      { name: 'AI Automation', tech: 'zapier' },
      { name: 'SEO & Optimization', tech: 'nextjs' }
    ]
  },
  {
    num: '02',
    slug: 'low-no-code-development',
    label: 'Rapid Market Velocity',
    title: 'Webflow & CMS Development',
    tagline: 'Building ultra-responsive, easily maintainable platforms without unnecessary friction.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
      </svg>
    ),
    badge: 'Certified Webflow',
    badgeColor: 'text-violet-400 border-violet-500/20 bg-violet-500/10',
    accentColor: 'text-violet-400',
    subServices: [
      { name: 'WordPress', tech: 'wordpress' },
      { name: 'Webflow', tech: 'webflow' },
      { name: 'Framer', tech: 'framer' },
      { name: 'Kajabi', tech: 'kajabi' },
      { name: 'Shopify', tech: 'shopify' }
    ]
  },
  {
    num: '03',
    slug: 'ui-ux-design',
    label: 'Human-Centered Experience',
    title: 'UI/UX Design Systems',
    tagline: 'Every great digital product starts with deep user insight and crystal-clear visual hierarchy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="8" rx="4" />
        <rect x="3" y="13" width="8" height="8" rx="4" />
        <circle cx="17" cy="17" r="4" />
      </svg>
    ),
    badge: 'Google UX Certified',
    badgeColor: 'text-violet-400 border-violet-500/20 bg-violet-500/10',
    accentColor: 'text-violet-400',
    subServices: [
      { name: 'Figma', tech: 'figma' }
    ]
  },
  {
    num: '04',
    slug: 'app-development',
    label: 'Mobile & Tools',
    title: 'App Development & Tools',
    tagline: 'Mobile applications built with Flutter and custom Google Chrome extensions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    badge: 'Flutter & Chrome V3',
    badgeColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    accentColor: 'text-emerald-400',
    subServices: [
      { name: 'Android App Development', tech: 'flutter' },
      { name: 'Chrome Web Extensions', tech: 'chrome' }
    ]
  }
]

const stats = [
  { value: '150+', label: 'Delivered Projects', sub: 'Worldwide' },
  { value: '10+', label: 'Countries Served', sub: 'Global Reach' },
  { value: '5.0★', label: 'Average Client Rating', sub: 'Fiverr & Upwork' },
  { value: '5+ Yrs', label: 'Hands-on Experience', sub: 'Design & Code' },
]

export default function Services() {
  useSEO({
    title: 'Specialized Digital Services',
    description: `Explore my specialized service offerings: UI/UX Design Systems, Full-Stack Web Development, Webflow & CMS Solutions, App Development, and Custom Tools.`,
    canonical: '/services',
  })

  return (
    <>
      {/* Header */}
      <section className="py-20 sm:py-24 px-4 max-w-7xl mx-auto">
        <RevealOnScroll className="site-page-intro-divider">
          <header className="mb-14">
            <nav aria-label="breadcrumb" className="text-xs tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
              <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-main)' }} className="font-semibold">Services</span>
            </nav>

            <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-4 inline-flex">
              Capabilities & Offerings
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight uppercase leading-none mb-6"
                style={{ color: 'var(--text-main)' }}>
              What I <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Design & Build
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg max-w-3xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              From initial Figma wireframes to fully deployed, SEO-optimized web applications — I combine aesthetic mastery with robust technical execution to ensure your brand stands out and converts.
            </p>
          </header>
        </RevealOnScroll>

        {/* Stats Row */}
        <RevealOnScroll>
          <div className="bento-card p-6 sm:p-8 mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="text-3xl sm:text-4xl font-heading font-black tracking-tight group-hover:text-violet-400 transition-colors"
                     style={{ color: 'var(--text-main)' }}>
                  {s.value}
                </div>
                <div className="text-xs font-semibold mt-1" style={{ color: 'var(--text-main)' }}>
                  {s.label}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-dim)' }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((c, i) => (
            <RevealOnScroll key={c.slug} delay={i * 0.08}>
              <Link 
                to={`/services/${c.slug}`}
                className="bento-card p-6 sm:p-10 flex flex-col justify-between group h-full cursor-pointer transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl border bg-white/[0.04] text-violet-400 group-hover:scale-105 transition-transform"
                         style={{ borderColor: 'var(--border)' }}>
                      {c.icon}
                    </div>
                    <span className={`pill-badge ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>

                  <div className="text-xs font-mono uppercase tracking-wider text-violet-400 mb-2">
                    {c.num} // {c.label}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-3 tracking-tight group-hover:text-violet-400 transition-colors"
                      style={{ color: 'var(--text-main)' }}>
                    {c.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: 'var(--text-muted)' }}>
                    {c.tagline}
                  </p>
                  
                  {/* Sub-services */}
                  <div className="space-y-2 mb-8">
                    {c.subServices.map((sub, sIdx) => (
                      <div 
                        key={sIdx}
                        className="flex items-center justify-between p-3.5 rounded-xl border transition-all"
                        style={{
                          backgroundColor: 'var(--card-bg)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <TechIcon name={sub.tech || 'react'} className="w-4 h-4 opacity-75 text-violet-400" />
                          <span className="text-xs font-medium" style={{ color: 'var(--text-main)' }}>
                            {sub.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 group-hover:translate-x-1 group-hover:text-violet-400 transition-all">
                          →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t flex items-center justify-between text-xs font-semibold uppercase tracking-wider"
                     style={{ borderColor: 'var(--border)', color: 'var(--accent-light)' }}>
                  <span>Explore Service Hub</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-24 px-4" style={{ backgroundColor: 'var(--topbar-bg)' }}>
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-3">
                Proven Methodology
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight uppercase"
                  style={{ color: 'var(--text-main)' }}>
                How We Bring Ideas To Life
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery & Vision', desc: 'We align on business goals, target user personas, and clear deliverables before writing a single line of code.' },
              { step: '02', title: 'Wireframes & UI System', desc: 'Figma mockups, interactive component systems, and design tokens crafted for visual impact and usability.' },
              { step: '03', title: 'Clean Development', desc: 'Production-ready code — whether Webflow, React, Next.js, or Supabase. Built for performance and sub-second load times.' },
              { step: '04', title: 'Quality Assurance & Launch', desc: 'Comprehensive cross-device QA, Core Web Vitals optimization, analytics setup, and smooth deployment.' },
            ].map((item, i) => (
              <RevealOnScroll key={item.step} delay={i * 0.08}>
                <div className="bento-card p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl font-black mb-6 text-violet-400/40">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold mb-3 uppercase tracking-tight" style={{ color: 'var(--text-main)' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
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
