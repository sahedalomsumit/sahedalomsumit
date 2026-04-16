import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const deliverables = [
  { icon: '⬡', title: 'User Research & Discovery', desc: 'I start every design project by understanding who your users are, what they need, and what\'s blocking conversion.' },
  { icon: '◻', title: 'Wireframes & User Flows', desc: 'Low-fidelity layouts that map out every screen interaction before a drop of color is added.' },
  { icon: '◈', title: 'High-Fidelity UI Design', desc: 'Pixel-perfect Figma screens with typography, color systems, and component libraries — ready for dev handoff.' },
  { icon: '◉', title: 'Interactive Prototypes', desc: 'Clickable prototypes that feel real. Share with stakeholders, test with users, iterate fast.' },
  { icon: '▦', title: 'Design System Creation', desc: 'Scalable component libraries, token-based color/type systems, and documentation that keeps teams aligned.' },
  { icon: '◌', title: 'Dev-Ready Handoff', desc: 'Clean Figma files with auto-layout, variables, and exported specs — so development starts without guesswork.' },
]

const process = [
  { num: '01', title: 'Discovery Call', desc: 'Brand audit, competitor analysis, and defining the UX goals that actually matter for your business.' },
  { num: '02', title: 'Wireframing', desc: 'Rapid low-fi wireframes in Figma to validate information architecture and user flows before committing to visuals.' },
  { num: '03', title: 'UI Design', desc: 'Full color, typography, and component design — your brand, applied systematically across every screen.' },
  { num: '04', title: 'Prototype & Test', desc: 'Interactive prototypes for stakeholder review and user testing. Iterate until it feels right.' },
  { num: '05', title: 'Handoff', desc: 'Organized Figma file with developer annotations, exported assets, and a design system doc.' },
]

const tools = ['Figma', 'FigJam', 'Design Systems', 'Auto Layout', 'Variables', 'Prototyping', 'User Flows', 'Wireframing', 'Component Libraries', 'Accessibility (WCAG)', 'Responsive Design', 'Interaction Design', 'Visual Design']

const related = [
  { slug: 'webflow-development', title: 'Webflow Development', label: 'Dev_Module' },
  { slug: 'framer-development', title: 'Framer Development', label: 'Framer_Module' },
  { slug: 'custom-development', title: 'Custom Development', label: 'Custom_Module' },
]

export default function FigmaDesign() {
  useSEO({
    title: 'Figma UI/UX Design | High-Fidelity Prototypes',
    description: 'Professional Figma UI/UX design services: wireframing, high-fidelity prototypes, design systems, and dev-ready handoffs. Based in Helsinki, working globally.',
    canonical: '/services/figma-design',
  })

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-emerald-500 transition">Services</Link>
              <span>/</span>
              <span className="text-white">Figma Design</span>
            </nav>
            <div className="font-mono text-violet-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Design_Module // 01</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              Figma<br /><span className="text-violet-500">Design_</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              Great products start with great design. I create thoughtful UI/UX in Figma — from rough wireframes to polished, dev-ready prototypes that your team can build from with confidence.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/portfolio" className="px-8 py-3 bg-violet-500 text-white font-black rounded-full text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase">
                See Design Work
              </Link>
              <Link to="/quote"
                className="px-8 py-3 bento-card text-white font-bold rounded-full text-xs tracking-[0.2em] hover:border-violet-500 transition-all uppercase">
                Get a Quote
              </Link>
            </div>
          </header>
        </RevealOnScroll>

        {/* What's included */}
        <RevealOnScroll>
          <div className="block sm:flex items-center justify-between mb-10 border-b border-white/5 pb-6">
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase">What_You_Get</h2>
            <span className="font-mono text-xs text-violet-500">06_DELIVERABLES</span>
          </div>
        </RevealOnScroll>
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((d, i) => (
            <RevealOnScroll key={d.title} delay={i * 0.07}>
              <div className="bento-card p-8 group border-violet-500/10 bg-violet-500/5 hover:border-violet-500/40 h-full">
                <div className="text-violet-400 text-3xl mb-5 font-mono">{d.icon}</div>
                <h3 className="text-base font-bold text-white mb-3 uppercase tracking-tight">{d.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{d.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Process */}
        <RevealOnScroll>
          <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-4">/ Design_Process</div>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase mb-10">How It Works_</h2>
        </RevealOnScroll>
        <div className="mb-20 space-y-4">
          {process.map((p, i) => (
            <RevealOnScroll key={p.num} delay={i * 0.08}>
              <div className="bento-card p-8 flex flex-col md:flex-row md:items-center gap-6 group hover:border-violet-500/40">
                <div className="font-mono text-violet-500/30 text-4xl font-black group-hover:text-violet-500/60 transition-colors shrink-0 w-16">{p.num}_</div>
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
          <div className="bento-card p-8 mb-20 border-violet-500/10 bg-violet-500/5">
            <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-8">/ Design_Toolkit</div>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span key={t} className="skill-tag hover:border-violet-500">{t}</span>
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
              <Link to={`/services/${r.slug}`} className="bento-card p-6 flex items-center justify-between group hover:border-violet-500/40">
                <div>
                  <div className="font-mono text-violet-400 text-[9px] uppercase tracking-widest mb-1">/ {r.label}</div>
                  <div className="text-white font-bold text-sm">{r.title}</div>
                </div>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg>
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
