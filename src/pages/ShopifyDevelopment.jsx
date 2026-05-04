import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const deliverables = [
  { icon: '🛍', title: 'Custom Theme Development', desc: 'Unique, high-converting Shopify themes built from scratch using Liquid, HTML, CSS, and JS.' },
  { icon: '⚡', title: 'Store Optimization', desc: 'Speed optimization, Core Web Vitals improvements, and conversion rate optimization for your existing store.' },
  { icon: '🔌', title: 'App Integration & Setup', desc: 'Seamless integration of third-party apps, payment gateways, and shipping providers.' },
  { icon: '📱', title: 'Mobile-First Design', desc: 'Fully responsive designs ensuring flawless shopping experiences across all devices.' },
  { icon: '🔄', title: 'Migration to Shopify', desc: 'Smooth transition from other e-commerce platforms (WooCommerce, Magento) to Shopify.' },
  { icon: '⚙', title: 'Custom Functionality', desc: 'Bespoke features using Shopify APIs, metaobjects, and custom app development.' },
]

const stack = [
  { category: 'Frontend', items: ['Liquid', 'HTML5', 'CSS3/Tailwind', 'JavaScript', 'Alpine.js'] },
  { category: 'Platform', items: ['Shopify Plus', 'Shopify Storefront API', 'Metafields', 'Hydrogen'] },
  { category: 'Tooling', items: ['Shopify CLI', 'Theme Kit', 'Git', 'Webpack'] },
]

const process = [
  { num: '01', title: 'Discovery & Strategy', desc: 'Understanding your brand, target audience, and specific e-commerce goals to plan the right architecture.' },
  { num: '02', title: 'UI/UX Design', desc: 'Creating wireframes and high-fidelity mockups focused on user journey and conversion optimization.' },
  { num: '03', title: 'Theme Development', desc: 'Coding your custom Shopify theme using best practices for performance and accessibility.' },
  { num: '04', title: 'Integration & Setup', desc: 'Configuring products, collections, apps, and payment gateways for a complete ecosystem.' },
  { num: '05', title: 'Testing & Launch', desc: 'Rigorous testing across devices and browsers, followed by a smooth launch and handover.' },
]

const related = [
  { slug: 'wordpress-development', title: 'WordPress Development', label: 'WordPress_Module' },
  { slug: 'seo-optimization', title: 'SEO & Optimization', label: 'SEO_Module' },
  { slug: 'figma-design', title: 'Figma Design', label: 'Design_Module' },
]

export default function ShopifyDevelopment() {
  useSEO({
    title: 'Shopify Development Services | E-commerce Expert',
    description: 'Custom Shopify development services. High-converting, fast, and fully customized e-commerce stores tailored to your brand.',
    canonical: '/services/shopify-development',
  })

  return (
    <>
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-emerald-500 transition">Services</Link>
              <span>/</span>
              <span className="text-white">Shopify Development</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Shopify_Module // 08</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              Shopify<br /><span className="text-emerald-500">Dev_</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              Elevate your e-commerce game with a custom Shopify store. I build fast, high-converting, and scalable themes tailored to your unique brand identity, ensuring a seamless shopping experience for your customers.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/portfolio" className="px-8 py-3 bg-emerald-500 text-black font-black rounded-full text-xs tracking-[0.2em] hover:bg-white transition-all uppercase">
                See Shopify Work
              </Link>
              <Link to="/quote"
                className="px-8 py-3 bento-card text-white font-bold rounded-full text-xs tracking-[0.2em] hover:border-emerald-500 transition-all uppercase">
                Get a Quote
              </Link>
            </div>
          </header>
        </RevealOnScroll>

        {/* Deliverables */}
        <RevealOnScroll>
          <div className="block sm:flex items-center justify-between mb-10 border-b border-white/5 pb-6">
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase">What_You_Get</h2>
            <span className="font-mono text-xs text-emerald-500">06_DELIVERABLES</span>
          </div>
        </RevealOnScroll>
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((d, i) => (
            <RevealOnScroll key={d.title} delay={i * 0.07}>
              <div className="bento-card p-8 group border-emerald-500/10 bg-emerald-500/5 hover:border-emerald-500/40 h-full">
                <div className="text-emerald-400 text-3xl mb-5 font-mono">{d.icon}</div>
                <h3 className="text-base font-bold text-white mb-3 uppercase tracking-tight">{d.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{d.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Tech Stack */}
        <RevealOnScroll>
          <div className="font-mono text-emerald-400 text-[10px] uppercase tracking-widest mb-6">/ Tech_Stack</div>
        </RevealOnScroll>
        <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stack.map((s, i) => (
            <RevealOnScroll key={s.category} delay={i * 0.1}>
              <div className="bento-card p-8 border-emerald-500/10 bg-emerald-500/5 h-full">
                <div className="font-mono text-emerald-400 text-[10px] uppercase tracking-widest mb-6">/ {s.category}</div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="skill-tag hover:border-emerald-500">{item}</span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Process */}
        <RevealOnScroll>
          <div className="font-mono text-emerald-400 text-[10px] uppercase tracking-widest mb-4">/ Dev_Process</div>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase mb-10">How It Works_</h2>
        </RevealOnScroll>
        <div className="mb-20 space-y-4">
          {process.map((p, i) => (
            <RevealOnScroll key={p.num} delay={i * 0.08}>
              <div className="bento-card p-8 flex flex-col md:flex-row md:items-center gap-6 group hover:border-emerald-500/40">
                <div className="font-mono text-emerald-500/30 text-4xl font-black group-hover:text-emerald-500/60 transition-colors shrink-0 w-16">{p.num}_</div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{p.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Related */}
        <RevealOnScroll>
          <div className="font-mono text-gray-500 text-[10px] uppercase tracking-widest mb-6">/ Related_Services</div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r, i) => (
            <RevealOnScroll key={r.slug} delay={i * 0.08}>
              <Link to={`/services/${r.slug}`} className="bento-card p-6 flex items-center justify-between group hover:border-emerald-500/40">
                <div>
                  <div className="font-mono text-emerald-400 text-[9px] uppercase tracking-widest mb-1">/ {r.label}</div>
                  <div className="text-white font-bold text-sm">{r.title}</div>
                </div>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg>
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
