import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const deliverables = [
  { icon: '⬡', title: 'Custom WordPress Themes', desc: 'Fully custom themes built from scratch or child themes — no bloated page builders unless you want them.' },
  { icon: '◻', title: 'Elementor & WooCommerce Builds', desc: 'Pixel-perfect Elementor sites with pro features, or full WooCommerce stores with product management built in.' },
  { icon: '◈', title: 'Crocoblock / JetPlugins', desc: 'Dynamic content, custom post types, ACF fields — advanced WP development that scales as your site grows.' },
  { icon: '◉', title: 'Plugin Configuration & Integrations', desc: 'SEO plugins, caching, CDN, payment gateways, CRM connections — your WP site fully wired up and ready.' },
  { icon: '▦', title: 'Speed & Performance Optimization', desc: 'Image compression, lazy loading, plugin audits, and caching to hit sub-2s load times on Lighthouse.' },
  { icon: '◌', title: 'Migration & Maintenance', desc: 'Moving from another platform or CMS? I handle full migrations cleanly — content, redirects, and all.' },
]

const process = [
  { num: '01', title: 'Project Scoping', desc: 'Theme, plugins, hosting environment, and feature requirements — I map the full WordPress architecture before touching a line of code.' },
  { num: '02', title: 'Design Integration', desc: 'Your Figma designs translated into pixel-perfect WordPress templates using clean, semantic markup.' },
  { num: '03', title: 'Plugin & Feature Development', desc: 'Custom post types, ACF fields, WooCommerce setup, and third-party integrations configured and tested.' },
  { num: '04', title: 'Speed & Security Hardening', desc: 'Caching layers, image optimization, firewall rules, and SSL — your site locked down and fast.' },
  { num: '05', title: 'Launch & Handoff', desc: 'Full QA, CMS training, hosting setup, and documentation so you can manage the site day-to-day.' },
]

const tools = ['WordPress', 'Elementor Pro', 'WooCommerce', 'Crocoblock', 'JetPlugins', 'ACF (Advanced Custom Fields)', 'WPBakery', 'Yoast SEO', 'WP Rocket', 'Cloudflare CDN', 'PHP', 'MySQL', 'Custom Theme Development', 'Multisite']

const related = [
  { slug: 'webflow-development', title: 'Webflow Development', label: 'Webflow_Module' },
  { slug: 'seo-optimization', title: 'SEO & Optimization', label: 'SEO_Module' },
  { slug: 'custom-development', title: 'Custom Development', label: 'Custom_Module' },
]

export default function WordPressDevelopment() {
  useSEO({
    title: 'WordPress Development Services | Custom WordPress Developer — Sahed Alom Sumit',
    description: 'Expert WordPress development: custom themes, Elementor, WooCommerce, Crocoblock, speed optimization, and migrations. Based in Helsinki, working globally.',
    canonical: '/services/wordpress-development',
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
              <span className="text-white">WordPress Development</span>
            </nav>
            <div className="font-mono text-violet-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">WordPress_Module // 03</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              WordPress<br /><span className="text-violet-500">Dev_</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              WordPress powers 43% of the web — but most WP sites are slow, bloated, and hard to maintain. I build them differently: clean architecture, real performance, and a CMS your team can actually use.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/portfolio" className="px-8 py-3 bg-violet-500 text-white font-black rounded-full text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase">
                See WP Projects
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

        {/* Process */}
        <RevealOnScroll>
          <div className="mb-20">
            <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-4">/ Build_Process</div>
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

        {/* Tools */}
        <RevealOnScroll>
          <div className="bento-card p-8 mb-20 border-violet-500/10 bg-violet-500/5">
            <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-8">/ WordPress_Stack</div>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span key={t} className="skill-tag hover:border-violet-500">{t}</span>
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
