import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const deliverables = [
  { icon: '📱', title: 'Native-like Performance', desc: 'High-performance Android applications built with Flutter and Dart, ensuring smooth 60fps+ animations and responsiveness.' },
  { icon: '🎨', title: 'Custom UI/UX Design', desc: 'Beautiful, tailored user interfaces using Flutter\'s rich set of customizable widgets.' },
  { icon: '🔗', title: 'API & Backend Integration', desc: 'Seamless connection with RESTful APIs, Firebase, Supabase, or your custom backend.' },
  { icon: '🔔', title: 'Push Notifications', desc: 'Integration of Firebase Cloud Messaging for engaging and timely user notifications.' },
  { icon: '🛒', title: 'In-App Purchases', desc: 'Implementation of Google Play Billing for subscriptions and one-time purchases.' },
  { icon: '🚀', title: 'Play Store Deployment', desc: 'Full assistance with App Bundle generation, testing, and Google Play Store submission.' },
]

const stack = [
  { category: 'Frontend', items: ['Flutter', 'Dart', 'Provider/Riverpod', 'BLoC', 'Material Design'] },
  { category: 'Backend & Data', items: ['Firebase', 'Supabase', 'REST APIs', 'SQLite', 'Shared Preferences'] },
  { category: 'Tooling & DevOps', items: ['Android Studio', 'Git', 'Fastlane', 'Codemagic'] },
]

const process = [
  { num: '01', title: 'Discovery & Planning', desc: 'Defining the app architecture, core features, and user flows before writing any Dart code.' },
  { num: '02', title: 'UI/UX Prototyping', desc: 'Designing the app interface in Figma, ensuring it feels native to Android users.' },
  { num: '03', title: 'App Development', desc: 'Building the app using Flutter and Dart, creating reusable widgets and managing state efficiently.' },
  { num: '04', title: 'Integration & Testing', desc: 'Connecting APIs and rigorously testing on various Android devices and emulators.' },
  { num: '05', title: 'Launch & Support', desc: 'Publishing to the Google Play Store and providing ongoing maintenance and feature updates.' },
]

const related = [
  { slug: 'custom-development', title: 'Custom Web Development', label: 'Custom_Dev_Module' },
  { slug: 'figma-design', title: 'Figma Design', label: 'Design_Module' },
  { slug: 'ai-automation', title: 'AI Automation', label: 'AI_Module' },
]

export default function AndroidAppDevelopment() {
  useSEO({
    title: 'Android App Development | Flutter & Dart Expert',
    description: 'Custom Android app development using Flutter and Dart. Fast, beautiful, and scalable mobile applications for your business.',
    canonical: '/services/android-app-development',
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
              <span className="text-white">Android App Development</span>
            </nav>
            <div className="font-mono text-violet-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Mobile_Module // 09</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              Android<br /><span className="text-violet-500">App Dev_</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              Transform your ideas into powerful mobile experiences. I specialize in building high-performance, visually stunning Android applications using <strong>Flutter</strong> and the <strong>Dart</strong> programming language, delivering native-like quality with a single codebase.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/portfolio" className="px-8 py-3 bg-violet-500 text-white font-black rounded-full text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase">
                See App Work
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

        {/* Tech Stack */}
        <RevealOnScroll>
          <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-6">/ Tech_Stack</div>
        </RevealOnScroll>
        <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stack.map((s, i) => (
            <RevealOnScroll key={s.category} delay={i * 0.1}>
              <div className="bento-card p-8 border-violet-500/10 bg-violet-500/5 h-full">
                <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-6">/ {s.category}</div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="skill-tag hover:border-violet-500">{item}</span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Process */}
        <RevealOnScroll>
          <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-4">/ Dev_Process</div>
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
