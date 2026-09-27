import { useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const designSteps = [
  { num: '01', badge: 'Discovery', color: 'emerald', title: 'Discovery & Strategic Problem Framing', desc: 'Deep dive into your business objectives, target audience dynamics, and core value proposition.', items: ['Kick-off alignment call', 'Project scope & milestone timeline', 'Competitive landscape analysis', 'User pain point mapping'] },
  { num: '02', badge: 'Research', color: 'emerald', title: 'UX Research & Information Architecture', desc: 'Gathering qualitative insights to architect an intuitive sitemap and high-converting user flow.', items: ['Competitor benchmark audit', 'User journey flowcharts', 'Information architecture map', 'Content strategy outline'] },
  { num: '03', badge: 'Content', color: 'emerald', title: 'Content & Visual Asset Curation', desc: 'Organizing brand copy, typography choices, imagery, and 3D assets into a cohesive narrative.', items: ['Asset library collection', 'SEO-friendly copywriting structure', 'Media optimization specs', 'Tone-of-voice alignment'] },
  { num: '04', badge: 'Design System', color: 'violet', title: 'Scalable UI Design System', desc: 'Building reusable Figma component libraries, accessible color tokens (WCAG), and responsive grids.', items: ['Modular UI components', 'Design token variables', 'Accessibility contrast audit', 'Micro-interaction states'] },
  { num: '05', badge: 'Wireframing', color: 'violet', title: 'Low-Fidelity Wireframes', desc: 'Rapidly prototyping visual structure and page hierarchy to validate user flows early.', items: ['Structural layout sketching', 'Navigation & CTA hierarchy', 'Iterative stakeholder reviews', 'Conversion funnel checks'] },
  { num: '06', badge: 'Visual Design', color: 'violet', title: 'High-Fidelity Visual Design (Figma)', desc: 'Applying refined visual styling, rich aesthetics, typography, and atmospheric depth.', items: ['Pixel-perfect Figma screens', 'Responsive desktop & mobile views', 'Specular lighting & glass accents', 'Collaborative client design sync'] },
  { num: '07', badge: 'Prototyping', color: 'violet', title: 'Interactive Flow Prototyping', desc: 'Simulating the live website experience with clickable transitions and realistic scroll triggers.', items: ['High-fidelity interactive prototype', 'Micro-animation simulations', 'Usability validation tests', 'Motion tuning & haptic feel'] },
  { num: '08', badge: 'Handoff', color: 'violet', title: 'Developer Handoff & Documentation', desc: 'Exporting production-ready assets and design specs with zero ambiguity.', items: ['Figma Dev Mode tokens', 'Exported SVG & WebP assets', 'Animation curve parameters', 'Production visual QA staging'] },
]

const devSteps = [
  { num: '01', badge: 'Style Guide', color: 'emerald', title: 'Style Guide & Token Setup', desc: 'Establishing code-level typography, colors, and layout variables matching the Figma design system.', items: ['Typography & color tokens in Tailwind/CSS', 'Client-First naming conventions', 'Scalable spacing utilities', 'Cross-browser reset rules'] },
  { num: '02', badge: 'Architecture', color: 'emerald', title: 'Modular Architecture & Framework', desc: 'Setting up clean folder structure, route layouts, state management, and backend schemas.', items: ['Folder & component hierarchy', 'Supabase database tables & keys', 'API client configuration', 'Reusable layout primitives'] },
  { num: '03', badge: 'Components', color: 'emerald', title: 'Modular Component Engineering', desc: 'Building responsive, accessible components with fluid layout shifts and fast render performance.', items: ['Modular navbars & bento cards', 'Dynamic CMS collection lists', 'Accessible forms & modals', 'Optimized image loading'] },
  { num: '04', badge: 'Layouts', color: 'emerald', title: 'Translating Screens into Responsive Code', desc: 'Transforming high-fidelity mockups into dynamic, fully responsive layouts across all viewports.', items: ['Pixel-perfect breakpoints (375px–1440px)', 'Fluid typography scaling', 'Zero horizontal scroll on mobile', 'Cross-device constraint checks'] },
  { num: '05', badge: 'Dynamic Systems', color: 'emerald', title: 'Dynamic Backend & CMS Integration', desc: 'Wiring up Supabase databases, headless CMS bindings, and custom API endpoints.', items: ['Real-time project data hooks', 'FAQ search & category filtering', 'Estimate & lead submission logic', 'Form validation & error handling'] },
  { num: '06', badge: 'Interactions', color: 'emerald', title: 'GSAP Animations & Micro-Interactions', desc: 'Implementing buttery-smooth 60fps animations that make visitors stop scrolling.', items: ['GSAP ScrollTrigger reveals', 'Spotlight cards & cursor effects', 'Smooth tab morphing transitions', 'Reduced-motion accessibility support'] },
  { num: '07', badge: 'Performance', color: 'emerald', title: 'Core Web Vitals & Technical SEO', desc: 'Tuning page speed, asset compression, semantic meta tags, and structured data.', items: ['JSON-LD Schema markup', 'WebP/AVIF asset optimization', 'Sub-second Largest Contentful Paint (LCP)', 'Clean semantic HTML hierarchy'] },
  { num: '08', badge: 'Launch', color: 'emerald', title: 'Production Deployment & Handoff', desc: 'Deploying to high-availability CDNs (Vercel / AWS / Cloudflare) with custom domains and SSL.', items: ['DNS & SSL certificate setup', 'Production staging QA check', 'Client CMS training & docs', 'Post-launch support guarantee'] },
]

function ProcessStep({ step }) {
  const isViolet = step.color === 'violet'
  return (
    <div className="bento-card p-6 sm:p-8 group hover:-translate-y-0.5 transition-all">
      <div className="flex items-start justify-between mb-6">
        <span className="text-4xl sm:text-5xl font-heading font-black opacity-20 group-hover:opacity-40 transition-opacity"
              style={{ color: isViolet ? 'var(--accent-light)' : 'var(--emerald)' }}>
          {step.num}
        </span>
        <span className={`pill-badge ${isViolet ? 'text-violet-400 border-violet-500/20 bg-violet-500/10' : 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'}`}>
          {step.badge}
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 tracking-tight" style={{ color: 'var(--text-main)' }}>
        {step.title}
      </h3>

      <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: 'var(--text-muted)' }}>
        {step.desc}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-4 border-t"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
        {step.items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className={isViolet ? 'text-violet-400' : 'text-emerald-400'}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Process() {
  const [activeTab, setActiveTab] = useState('design')

  useSEO({
    title: 'Work Methodology & Engineering Process',
    description: `A transparent, step-by-step breakdown of Sahed Alom Sumit's design methodology and scalable full-stack web engineering process.`,
    canonical: '/process',
  })

  const isDesign = activeTab === 'design'

  const switchTab = (tab) => {
    setActiveTab(tab)
    const el = document.getElementById(`process-${tab}`)
    if (el) gsap.from(el, { opacity: 0, y: 15, duration: 0.35, ease: 'power2.out' })
  }

  const summaryDesign = {
    title: 'Design Philosophy',
    text: 'My design methodology is human-centered, grounded in psychology and conversion principles. It begins with user empathy and business objectives, evolving through rapid iteration until the visual hierarchy feels effortless.',
    tags: ['Conversion Focused', 'WCAG 2.1 Accessible', 'Scalable Design Systems', 'Figma Native'],
  }
  const summaryDev = {
    title: 'Engineering Philosophy',
    text: 'My development process prioritizes clean code architecture, modular components, sub-second load times, and purposeful micro-interactions. Every site is engineered to scale seamlessly and load instantly.',
    tags: ['Core Web Vitals Optimized', 'Modular Architecture', 'Headless & Modern Stack', '60fps Micro-Interactions'],
  }
  const summary = isDesign ? summaryDesign : summaryDev
  const steps = isDesign ? designSteps : devSteps

  return (
    <>
      <section className="py-20 sm:py-24 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-14">
            <nav aria-label="breadcrumb" className="text-xs tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
              <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-main)' }} className="font-semibold">Process</span>
            </nav>

            <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-4 inline-flex">
              End-to-End Methodology
            </span>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-6">
              <div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight uppercase leading-none"
                    style={{ color: 'var(--text-main)' }}>
                  How Great Products <br />
                  <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                    Are Built
                  </span>
                </h1>
                <p className="mt-4 text-base sm:text-lg max-w-2xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  A transparent 8-step blueprint covering discovery, Figma prototyping, clean frontend development, and production launch.
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="p-1 rounded-full border flex items-center gap-1 shadow-sm w-full sm:w-auto justify-center max-w-md mx-auto sm:mx-0"
                   style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                <button
                  onClick={() => switchTab('design')}
                  className={`flex-1 sm:flex-initial px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all whitespace-nowrap text-center ${
                    isDesign
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'hover:text-white'
                  }`}
                  style={!isDesign ? { color: 'var(--text-muted)' } : {}}
                >
                  ✨ UI/UX Design System
                </button>
                <button
                  onClick={() => switchTab('dev')}
                  className={`flex-1 sm:flex-initial px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all whitespace-nowrap text-center ${
                    !isDesign
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'hover:text-white'
                  }`}
                  style={isDesign ? { color: 'var(--text-muted)' } : {}}
                >
                  ⚡ Development Engine
                </button>
              </div>
            </div>
          </header>
        </RevealOnScroll>

        <div id={`process-${activeTab}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sticky Summary Card */}
            <div className="lg:col-span-4">
              <div className="bento-card p-8 lg:sticky lg:top-28">
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 block mb-2">
                  Phase Overview
                </span>
                <h3 className="text-2xl font-heading font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                  {summary.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: 'var(--text-muted)' }}>
                  {summary.text}
                </p>
                <div className="space-y-2.5 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  {summary.tags.map(tag => (
                    <div key={tag} className="flex items-center gap-2.5 text-xs font-medium" style={{ color: 'var(--text-main)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Steps List */}
            <div className="lg:col-span-8 space-y-6">
              {steps.map((step) => (
                <RevealOnScroll key={step.num + step.badge}>
                  <ProcessStep step={step} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
