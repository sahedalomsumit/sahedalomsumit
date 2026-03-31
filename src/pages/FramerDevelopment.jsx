import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const deliverables = [
  { icon: '⬡', title: 'Motion-Rich Page Design', desc: 'Framer\'s native animation engine lets me create scroll-driven, physics-based, and gesture interactions that feel alive.' },
  { icon: '◻', title: 'Framer CMS Integration', desc: 'Blog posts, case studies, team members — structured CMS collections your editors can manage without developer help.' },
  { icon: '◈', title: 'Portfolio & Agency Sites', desc: 'Framer is the go-to for creatives and studios. I build portfolio sites that make first impressions count.' },
  { icon: '◉', title: 'Component-Based Architecture', desc: 'Every element is a reusable Framer component — making your site easy to scale and maintain over time.' },
  { icon: '▦', title: 'Responsive Across All Devices', desc: 'Smart breakpoints, fluid layouts, and mobile-first interactions so your site looks perfect on every screen.' },
  { icon: '◌', title: 'Custom Code Overrides', desc: 'When Framer\'s native tools aren\'t enough, I write custom code overrides in React/TypeScript to extend any interaction.' },
]

const process = [
  { num: '01', title: 'Design Brief & Scope', desc: 'We align on the vibe, interactions, CMS needs, and timeline before Framer setup begins.' },
  { num: '02', title: 'Framer Setup & Structure', desc: 'Site structure, page layout, breakpoints, and CMS schema are defined and scaffolded.' },
  { num: '03', title: 'Build & Animate', desc: 'Pages built with Framer\'s layout tools. Animations layered using smart components and code overrides.' },
  { num: '04', title: 'CMS Content & Pages', desc: 'CMS collections populated, templates built, and dynamic pages generated and tested.' },
  { num: '05', title: 'QA, Domain & Launch', desc: 'Cross-device testing, SEO meta, custom domain connection, and go-live.' },
]

const tools = ['Framer', 'Framer CMS', 'Framer Motion', 'Code Overrides (React/TS)', 'Smart Components', 'Responsive Breakpoints', 'Custom Animations', 'Lottie', 'CMS Collections', 'SEO Meta', 'Framer Analytics']

const related = [
  { slug: 'figma-design', title: 'Figma Design', label: 'Design_Module' },
  { slug: 'webflow-development', title: 'Webflow Development', label: 'Webflow_Module' },
  { slug: 'custom-development', title: 'Custom Development', label: 'Custom_Module' },
]

export default function FramerDevelopment() {
  useSEO({
    title: 'Framer Development Services | Framer Developer — Sahed Alom Sumit',
    description: 'Expert Framer development: motion-rich sites, CMS integrations, portfolio builds, and custom code overrides. Premium Framer developer based in Helsinki.',
    canonical: '/services/framer-development',
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
              <span className="text-white">Framer Development</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Framer_Module // 04</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              Framer<br /><span className="text-emerald-500">Dev_</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              Framer is where design and code finally meet without compromise. I build Framer sites that move, react, and engage — the kind of digital experiences that make people screenshot and share.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/portfolio" className="px-8 py-3 bg-emerald-500 text-black font-black rounded-full text-xs tracking-[0.2em] hover:bg-white transition-all uppercase">
                See Framer Work
              </Link>
              <Link to="/quote"
                className="px-8 py-3 bento-card text-white font-bold rounded-full text-xs tracking-[0.2em] hover:border-emerald-500 transition-all uppercase">
                Get a Quote
              </Link>
            </div>
          </header>
        </RevealOnScroll>

        {/* Why Framer callout */}
        <RevealOnScroll>
          <div className="bento-card p-8 mb-16 border-emerald-500/10 bg-emerald-500/5">
            <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6">/ Why_Framer</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Designer-First', desc: 'No fighting with code just to change a font. Framer\'s canvas makes design iteration instant.' },
                { title: 'Motion Native', desc: 'Animations aren\'t an afterthought — they\'re built into the platform with physics-based precision.' },
                { title: 'Fast to Launch', desc: 'From Figma import to published site faster than any other platform. Perfect for startups and agencies.' },
              ].map((c) => (
                <div key={c.title}>
                  <h3 className="text-base font-bold text-white mb-2 uppercase tracking-tight">{c.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Deliverables */}
        <RevealOnScroll>
          <div className="mb-20">
            <div className="block sm:flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h2 className="text-3xl font-black tracking-tighter text-white uppercase">What_You_Get</h2>
              <span className="font-mono text-xs text-emerald-500">06_DELIVERABLES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((d) => (
                <div key={d.title} className="bento-card p-8 group border-emerald-500/10 bg-emerald-500/5 hover:border-emerald-500/40">
                  <div className="text-emerald-400 text-3xl mb-5 font-mono">{d.icon}</div>
                  <h3 className="text-base font-bold text-white mb-3 uppercase tracking-tight">{d.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Process */}
        <RevealOnScroll>
          <div className="mb-20">
            <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-4">/ Build_Process</div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase mb-10">How It Works_</h2>
            <div className="space-y-4">
              {process.map((p) => (
                <div key={p.num} className="bento-card p-8 flex flex-col md:flex-row md:items-center gap-6 group hover:border-emerald-500/40">
                  <div className="font-mono text-emerald-500/30 text-4xl font-black group-hover:text-emerald-500/60 transition-colors shrink-0 w-16">{p.num}_</div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Tools */}
        <RevealOnScroll>
          <div className="bento-card p-8 mb-20 border-emerald-500/10 bg-emerald-500/5">
            <div className="font-mono text-emerald-400 text-[10px] uppercase tracking-widest mb-8">/ Framer_Stack</div>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span key={t} className="skill-tag hover:border-emerald-500">{t}</span>
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
                <Link key={r.slug} to={`/services/${r.slug}`} className="bento-card p-6 flex items-center justify-between group hover:border-emerald-500/40">
                  <div>
                    <div className="font-mono text-emerald-400 text-[9px] uppercase tracking-widest mb-1">/ {r.label}</div>
                    <div className="text-white font-bold text-sm">{r.title}</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg>
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
