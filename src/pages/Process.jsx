import { useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const designSteps = [
  { num: '01', badge: 'DISCOVERY', color: 'emerald', title: 'Discovery & Define Problem', desc: 'Focus: Understand business needs, user goals, and clearly define the problem.', items: ['Kick-off meeting with stakeholders', 'Define project scope & timeline', 'Understand business vision', 'Identify user pain points'] },
  { num: '02', badge: 'RESEARCH', color: 'emerald', title: 'Research & Define Solution', desc: 'Focus: Gather knowledge through research and define a meaningful solution.', items: ['Conduct competitor analysis', 'Gather user surveys/feedback', 'Define user personas', 'Map key user journeys'] },
  { num: '03', badge: 'CONTENT', color: 'emerald', title: 'Gather Content', desc: 'Focus: Collect all available content and organize it meaningfully.', items: ['Assets (Videos, Lottie, Icons)', 'Plan sitemap & structure', 'Identify content gaps', 'Optimize copy for usability'] },
  { num: '04', badge: 'SYSTEMS', color: 'violet', title: 'Design System & Component', desc: 'Focus: Create a consistent, scalable UI design system with reusable components.', items: ['Build reusable UI components', 'Define scale-ready grid rules', 'Accessibility contrast audits', 'Keyboard navigation rules'] },
  { num: '05', badge: 'STRUCTURE', color: 'violet', title: 'Wireframing (optional)', desc: 'Focus: Define page structure and user flow without visual styling.', items: ['Sketch low-fidelity wireframes', 'Plan navigation & interactions', 'Client feedback iterations', 'Center user goals & usability'] },
  { num: '06', badge: 'VISUALS', color: 'violet', title: 'Visual Design (Figma)', desc: 'Focus: Apply visual styling and create high-fidelity designs.', items: ['Create visual design with assets', 'Use realistic content hierarchy', 'Design responsive layouts', 'Regular client design reviews'] },
  { num: '07', badge: 'INTERACTIVE', color: 'violet', title: 'Prototyping (Figma)', desc: 'Focus: Simulate the website experience with interactive flows.', items: ['Create interactive prototype', 'Simulate key user flows', 'Test with users/stakeholders', 'Accessibility usability checks'] },
  { num: '08', badge: 'HANDOFF', color: 'violet', title: 'Developer Handoff', desc: 'Focus: Prepare design for development and ensure smooth implementation.', items: ['Prepare design assets & docs', 'Leverage Figma Dev View', 'Collaborate during build phase', 'QA staging for visual accuracy'] },
]

const devSteps = [
  { num: '01', badge: 'STYLE_GUIDE', color: 'emerald', title: 'Style Guide Setup', desc: 'Focus: Create a design foundation based on the brand style.', items: ['Set up typography & color tokens', 'Client-First naming conventions', 'Build visual guide in Webflow', 'Ensure design consistency'] },
  { num: '02', badge: 'STRUCTURE', color: 'emerald', title: 'Client-First & Variables', desc: 'Focus: Build with a clear and maintainable structure.', items: ['Define global spacing variables', 'Scalable folder & wrapper logic', 'Organize project structure', 'Easy management for clients'] },
  { num: '03', badge: 'COMPONENTS', color: 'emerald', title: 'Components & Layouts', desc: 'Focus: Develop reusable components for faster builds.', items: ['Build modular navbar & CTAs', 'Create Webflow/Framer symbols', 'Responsive behavior testing', 'Speed-optimized asset loading'] },
  { num: '04', badge: 'LAYOUT', color: 'emerald', title: 'Wireframes to Layout', desc: 'Focus: Translate wireframes into functional, dynamic layouts.', items: ['Recreate structural elements', 'Flow & responsiveness tests', 'Stakeholder alignment checks'] },
  { num: '05', badge: 'VISUALS', color: 'emerald', title: 'Visual Design Implementation', desc: 'Focus: Apply final design visually and interactively.', items: ['Styles based on Figma design', 'Real content & visual hierarchy', 'Alignment & accessibility checks', 'Mobile-first responsive standards'] },
  { num: '06', badge: 'INTERACTIONS', color: 'emerald', title: 'Animation & Interactions', desc: 'Focus: Add smooth, meaningful interactions.', items: ['Hover, click & scroll-based fx', 'GSAP/Framer Motion implementation', 'Fast & purposeful motion tuning', 'Accessible motion safety checks'] },
  { num: '07', badge: 'PERFORMANCE', color: 'emerald', title: 'SEO & Speed Optimization', desc: 'Focus: Optimize for visibility and performance.', items: ['Meta tags & alt text addition', 'Compress image & video assets', 'Core Web Vitals optimization', 'Lazy loading & font tuning'] },
  { num: '08', badge: 'DEPLOYMENT', color: 'emerald', title: 'Domain & Launch', desc: 'Focus: Prepare for live deployment.', items: ['Configure custom domain & SSL', 'Final browser/device QA tests', 'Documentation & handover prep', 'Post-launch support sync'] },
]

function ProcessStep({ step }) {
  const isViolet = step.color === 'violet'
  return (
    <div className="bento-card p-8 group border-white/5">
      <div className="flex items-start justify-between mb-8">
        <span className={`text-6xl font-black text-white/5 ${isViolet ? 'group-hover:text-violet-500/20' : 'group-hover:text-emerald-500/20'} transition-colors`}>
          {step.num} /
        </span>
        <span className={`px-4 py-1.5 ${isViolet ? 'bg-violet-500/10 text-violet-500' : 'bg-emerald-500/10 text-emerald-500'} font-mono text-[10px] rounded-full font-bold`}>
          {step.badge}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 uppercase">{step.title}</h3>
      <p className="text-gray-400 text-sm mb-8 leading-relaxed">{step.desc}</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-mono text-gray-400">
        {step.items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className={isViolet ? 'text-violet-500' : 'text-emerald-500'}>+</span> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Process() {
  const [activeTab, setActiveTab] = useState('design')

  useSEO({
    title: 'My Process',
    description: `Learn about the transparent, efficient, and vibe-driven process Sahed Alom Sumit uses to deliver premium web design and development projects.`,
    canonical: '/process',
  })

  const isDesign = activeTab === 'design'

  const switchTab = (tab) => {
    setActiveTab(tab)
    const el = document.getElementById(`process-${tab}`)
    if (el) gsap.from(el, { opacity: 0, x: tab === 'design' ? -20 : 20, duration: 0.4 })
  }

  const summaryDesign = {
    text: 'My vibe-first design process is human-centered and problem-solving driven. It begins with understanding users and business needs, followed by research, planning, and iterating until the perfect aesthetic and solution are found.',
    tags: ['Usability Focused', 'Inclusive Design', 'Scalable Systems'],
    borderColor: 'border-violet-500/20',
  }
  const summaryDev = {
    text: 'My development process is efficient, scalable, and built for performance. I prioritize clean code architecture, reusable components, and purposeful interactions to ensure fast-loading, dynamic, and engaging websites.',
    tags: ['Fast-Loading (CWV)', 'Clean Code Architecture', 'Modular Build'],
    borderColor: 'border-emerald-500/20',
  }
  const summary = isDesign ? summaryDesign : summaryDev
  const steps = isDesign ? designSteps : devSteps

  return (
    <>
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <RevealOnScroll>
            <header className="mb-16 text-left">
              <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex flex-wrap items-center justify-start gap-2">
                <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
                <span>/</span>
                <span className="text-white">Process</span>
              </nav>
              <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-4">Methodology_Explorer</div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
                My Work<br /><span className="text-violet-500">Process</span>
              </h1>
              <p className="mt-6 text-gray-400 text-lg max-w-2xl font-light">
                A structured breakdown of my vibe-first design methodology and scalable, clean code development engine.
              </p>
            </header>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => switchTab('design')}
                title="Design System Process"
                className={`px-6 py-3 rounded-xl text-xs font-mono font-bold transition-all ${isDesign ? 'bg-[var(--hire-btn-bg)] text-[var(--hire-btn-text)] shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                DESIGN_SYSTEM
              </button>
              <button
                onClick={() => switchTab('dev')}
                title="Development Engine Process"
                className={`px-6 py-3 rounded-xl text-xs font-mono font-bold transition-all ${!isDesign ? 'bg-[var(--hire-btn-bg)] text-[var(--hire-btn-text)] shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                DEVELOPMENT_ENGINE
              </button>
            </div>
          </RevealOnScroll>
        </div>

        <div id={`process-${activeTab}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className={`bento-card p-8 lg:sticky lg:top-32 ${summary.borderColor}`}>
                <div className="text-4xl font-bold text-white mb-6 italic">Summary_</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">{summary.text}</p>
                <div className="space-y-4">
                  {summary.tags.map(tag => (
                    <div key={tag} className="flex items-center gap-3 text-xs font-mono text-emerald-500">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" /> {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
