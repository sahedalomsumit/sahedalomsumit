import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const deliverables = [
  { icon: '⬡', title: 'React Application Development', desc: 'Component-based React apps with clean architecture, reusable UI components, and state management built to scale.' },
  { icon: '◻', title: 'Supabase Backend Integration', desc: 'PostgreSQL database, real-time subscriptions, authentication, and storage — all through Supabase with clean API design.' },
  { icon: '◈', title: 'Full Custom UI with Tailwind', desc: 'Precision UI built with Tailwind CSS — no template constraints, no override battles, just clean purposeful code.' },
  { icon: '◉', title: 'REST & Third-Party API Integration', desc: 'Payment gateways, CRMs, email providers, AI APIs — I connect the external services your app needs to function.' },
  { icon: '▦', title: 'Performance & Accessibility', desc: 'Lighthouse 90+ scores, semantic HTML, ARIA roles, and Core Web Vitals optimization included as standard.' },
  { icon: '◌', title: 'Deployment & DevOps', desc: 'Vite builds, Vercel/Netlify deployment, environment variable management, and CI/CD pipeline setup.' },
]

const stack = [
  { category: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'TypeScript', 'GSAP', 'Framer Motion'] },
  { category: 'Backend & Data', items: ['Supabase', 'PostgreSQL', 'Node.js', 'REST APIs', 'GraphQL', 'Edge Functions'] },
  { category: 'Tooling & DevOps', items: ['Git', 'Vercel', 'Netlify', 'GitHub Actions', 'ESLint', 'Prettier'] },
]

const process = [
  { num: '01', title: 'Technical Discovery', desc: 'I map out your requirements, data models, and integrations before any code is written. Architecture decisions live here.' },
  { num: '02', title: 'UI Design (if needed)', desc: 'Figma designs or in-browser component design — establishing the visual system before building begins.' },
  { num: '03', title: 'Component Development', desc: 'Atomic components built from the ground up. Every piece tested in isolation before being composed into pages.' },
  { num: '04', title: 'Backend & Integrations', desc: 'Supabase schema, RLS policies, API connections, and third-party service integrations wired up and tested.' },
  { num: '05', title: 'QA, Optimization & Deploy', desc: 'Performance audit, accessibility check, cross-browser testing, and production deployment with monitoring.' },
]

const related = [
  { slug: 'figma-design', title: 'Figma Design', label: 'Design_Module' },
  { slug: 'ai-automation', title: 'AI Automation', label: 'AI_Module' },
  { slug: 'seo-optimization', title: 'SEO & Optimization', label: 'SEO_Module' },
]

export default function CustomDevelopment() {
  useSEO({
    title: 'Custom Web Development Services | React Developer',
    description: 'Custom web development with React, Supabase, Tailwind CSS, and Node.js. Scalable, performant apps built from scratch when no-code platforms fall short.',
    canonical: '/services/custom-development',
  })

  return (
    <>
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-emerald-500 transition">Services</Link>
              <span>/</span>
              <span className="text-white">Custom Development</span>
            </nav>
            <div className="font-mono text-violet-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Custom_Dev_Module // 05</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              Custom<br /><span className="text-violet-500">Dev_</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              Sometimes a no-code tool just doesn't cut it. When you need real applications, complex data flows, or bespoke interactions — I build it from scratch with React, Supabase, and clean code that scales.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/portfolio" className="px-8 py-3 bg-violet-500 text-white font-black rounded-full text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase">
                See Custom Work
              </Link>
              <Link to="/quote"
                className="px-8 py-3 bento-card text-white font-bold rounded-full text-xs tracking-[0.2em] hover:border-violet-500 transition-all uppercase">
                Get a Quote
              </Link>
            </div>
          </header>
        </RevealOnScroll>

        {/* Deliverables */}
        <RevealOnScroll>
          <div className="mb-20">
            <div className="block sm:flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h2 className="text-3xl font-black tracking-tighter text-white uppercase">What_You_Get</h2>
              <span className="font-mono text-xs text-violet-500">06_DELIVERABLES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((d) => (
                <div key={d.title} className="bento-card p-8 group border-violet-500/10 bg-violet-500/5 hover:border-violet-500/40">
                  <div className="text-violet-400 text-3xl mb-5 font-mono">{d.icon}</div>
                  <h3 className="text-base font-bold text-white mb-3 uppercase tracking-tight">{d.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Tech Stack */}
        <RevealOnScroll>
          <div className="mb-20">
            <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-6">/ Tech_Stack</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stack.map((s) => (
                <div key={s.category} className="bento-card p-8 border-violet-500/10 bg-violet-500/5">
                  <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-6">/ {s.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className="skill-tag hover:border-violet-500">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Process */}
        <RevealOnScroll>
          <div className="mb-20">
            <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-4">/ Dev_Process</div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase mb-10">How It Works_</h2>
            <div className="space-y-4">
              {process.map((p) => (
                <div key={p.num} className="bento-card p-8 flex flex-col md:flex-row md:items-center gap-6 group hover:border-violet-500/40">
                  <div className="font-mono text-violet-500/30 text-4xl font-black group-hover:text-violet-500/60 transition-colors shrink-0 w-16">{p.num}_</div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Related */}
        <RevealOnScroll>
          <div>
            <div className="font-mono text-gray-500 text-[10px] uppercase tracking-widest mb-6">/ Related_Services</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} to={`/services/${r.slug}`} className="bento-card p-6 flex items-center justify-between group hover:border-violet-500/40">
                  <div>
                    <div className="font-mono text-violet-400 text-[9px] uppercase tracking-widest mb-1">/ {r.label}</div>
                    <div className="text-white font-bold text-sm">{r.title}</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg>
                </Link>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <ContactSection />
    </>
  )
}
