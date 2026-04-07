import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const deliverables = [
  { icon: '⬡', title: 'Technical SEO Audit', desc: 'Crawl and index analysis, broken links, duplicate content, canonical issues, and structured data — found and fixed.' },
  { icon: '◻', title: 'On-Page Optimization', desc: 'Title tags, meta descriptions, H1-H6 hierarchy, keyword placement, and internal linking — optimized across every page.' },
  { icon: '◈', title: 'Core Web Vitals (LCP, CLS, FID)', desc: 'Lighthouse audits and real-user metric improvements that boost rankings and reduce bounce rate.' },
  { icon: '◉', title: 'Schema Markup & Rich Snippets', desc: 'Structured data for Person, Organization, FAQ, and Service schemas — giving Google richer context about your content.' },
  { icon: '▦', title: 'Page Speed Optimization', desc: 'Image compression, code splitting, lazy loading, CDN setup, and caching — aiming for 90+ Lighthouse scores.' },
  { icon: '◌', title: 'SEO Reporting & Strategy', desc: 'Keyword research, competitor gap analysis, monthly reporting, and a prioritized roadmap for ongoing growth.' },
]

const vitals = [
  { metric: 'LCP', label: 'Largest Contentful Paint', target: '< 2.5s', desc: 'How fast your main content loads.' },
  { metric: 'CLS', label: 'Cumulative Layout Shift', target: '< 0.1', desc: 'Visual stability as the page loads.' },
  { metric: 'FID', label: 'First Input Delay', target: '< 100ms', desc: 'How fast the page responds to interaction.' },
  { metric: 'TTFB', label: 'Time to First Byte', target: '< 600ms', desc: 'Server response speed to first request.' },
]

const process = [
  { num: '01', title: 'Full SEO Audit', desc: 'Technical crawl, performance baseline, on-page analysis, and backlink profile reviewed before any work begins.' },
  { num: '02', title: 'Keyword & Competitor Research', desc: 'Target keywords mapped to business intent, with gap analysis showing where quick wins are available.' },
  { num: '03', title: 'On-Page & Technical Fixes', desc: 'Metadata, internal links, schema, image alt texts, and crawlability issues addressed systematically.' },
  { num: '04', title: 'Performance Optimization', desc: 'Speed improvements across images, scripts, fonts, and caching — measured before and after.' },
  { num: '05', title: 'Reporting & Ongoing Strategy', desc: 'Monthly reports with ranking movement, traffic trends, and the next set of prioritized improvements.' },
]

const tools = ['Google Search Console', 'Google Analytics 4', 'Semrush', 'Ahrefs', 'Lighthouse', 'PageSpeed Insights', 'Screaming Frog', 'Schema Markup', 'Core Web Vitals', 'Yoast SEO', 'RankMath', 'Structured Data', 'XML Sitemaps', 'Robots.txt', 'Canonical Tags', 'Open Graph']

const related = [
  { slug: 'webflow-development', title: 'Webflow Development', label: 'Webflow_Module' },
  { slug: 'wordpress-development', title: 'WordPress Development', label: 'WP_Module' },
  { slug: 'custom-development', title: 'Custom Development', label: 'Custom_Module' },
]

export default function SEOOptimization() {
  useSEO({
    title: 'SEO & Optimization Services | Technical SEO Expert',
    description: 'Technical SEO, Core Web Vitals optimization, schema markup, and page speed tuning. Improve rankings and performance for Webflow, WordPress, and custom sites.',
    canonical: '/services/seo-optimization',
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
              <span className="text-white">SEO & Optimization</span>
            </nav>
            <div className="font-mono text-violet-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">SEO_Module // 07</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              SEO &<br /><span className="text-violet-500">Optimization_</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              A beautiful site that no one finds is a missed opportunity. I layer technical SEO, on-page optimization, and performance tuning into every build — so your site ranks, loads fast, and converts.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/portfolio" className="px-8 py-3 bg-violet-500 text-white font-black rounded-full text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase">
                See Results
              </Link>
              <Link to="/quote"
                className="px-8 py-3 bento-card text-white font-bold rounded-full text-xs tracking-[0.2em] hover:border-violet-500 transition-all uppercase">
                Get an SEO Audit
              </Link>
            </div>
          </header>
        </RevealOnScroll>

        {/* Core Web Vitals */}
        <RevealOnScroll>
          <div className="mb-20">
            <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-6">/ Core_Web_Vitals_Targets</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vitals.map((v) => (
                <div key={v.metric} className="bento-card p-6 border-violet-500/10 bg-violet-500/5 group hover:border-violet-500/40">
                  <div className="font-mono text-violet-400 text-2xl font-black mb-1">{v.metric}</div>
                  <div className="text-white font-bold text-lg mb-1">{v.target}</div>
                  <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-3">{v.label}</div>
                  <p className="text-gray-400 text-xs font-light">{v.desc}</p>
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
            <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-4">/ SEO_Process</div>
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
            <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-8">/ SEO_Toolkit</div>
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
