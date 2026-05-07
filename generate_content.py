import os
import json

src_dir = os.path.join(os.getcwd(), 'src', 'pages')

pages = {
    'UIUXDesign.jsx': {
        'title': 'UI/UX Design',
        'slug': 'ui-ux-design',
        'color': 'violet',
        'tags': ['Web Design', 'UI/UX'],
        'hero': "Every great digital product starts with a conversation, not a canvas. Before I open Figma, before I pick a single color, I sit with you and ask the hard questions: Who's using this? What are they trying to do? What's standing in their way? That's where design begins — at the intersection of empathy and intent.",
        'subServices': [{'name': 'Figma Design', 'slug': 'figma-design'}],
        'isCategory': True
    },
    'FullStackDevelopment.jsx': {
        'title': 'Full-Stack Web Development',
        'slug': 'full-stack-development',
        'color': 'emerald',
        'tags': ['Web Development', 'React', 'Next.js'],
        'hero': "There's a moment in every project when a platform reaches its ceiling. You need a custom dashboard, a complex data flow, an integration that doesn't exist as a plugin. That's when you need someone who writes the architecture from scratch — frontend to backend, database to deployment.",
        'subServices': [{'name': 'Frontend Development', 'slug': 'frontend-development'}, {'name': 'Backend Development', 'slug': 'backend-development'}, {'name': 'SEO & Optimization', 'slug': 'seo-optimization'}],
        'isCategory': True
    },
    'LowNoCodeDevelopment.jsx': {
        'title': 'Low/No-Code Web Development',
        'slug': 'low-no-code-development',
        'color': 'violet',
        'tags': ['WordPress', 'Webflow', 'Framer', 'Shopify'],
        'hero': "Here's an industry secret: most websites don't need custom code. They need the right platform, the right structure, and someone who knows how to push those platforms far beyond their defaults. That's the art of no-code — building something powerful without reinventing the wheel. And when no-code hits its limit? That's when custom coding steps in.",
        'subServices': [{'name': 'WordPress', 'slug': 'wordpress-development'}, {'name': 'Webflow', 'slug': 'webflow-development'}, {'name': 'Framer', 'slug': 'framer-development'}, {'name': 'Shopify', 'slug': 'shopify-development'}, {'name': 'Custom Development', 'slug': 'custom-development'}],
        'isCategory': True
    },
    'AppDevelopment.jsx': {
        'title': 'App Development',
        'slug': 'app-development',
        'color': 'emerald',
        'tags': ['App Development', 'Flutter', 'Mobile'],
        'hero': "Your users live in their pockets. They check their phones before they check the mirror. If your idea needs to reach people where they actually spend their time, that means a real, native-feeling app — not just a responsive website. I build cross-platform mobile apps with Flutter and Dart, so one codebase becomes a beautiful experience on both Android and iOS.",
        'subServices': [{'name': 'Android App Development', 'slug': 'android-app-development'}, {'name': 'iOS App Development', 'slug': 'ios-app-development'}],
        'isCategory': True
    },
    'AIAutomationHub.jsx': {
        'title': 'AI & Automation',
        'slug': 'ai-automation-hub',
        'color': 'emerald',
        'tags': ['AI', 'Automation'],
        'hero': "Here's the thing about manual work: it doesn't scale. You can hire another person, or you can build a system that does the job of five — without getting tired, forgetting a follow-up, or needing a coffee break. That's what AI automation is. It's your invisible workforce.",
        'subServices': [{'name': 'AI Automation', 'slug': 'ai-automation'}],
        'isCategory': True
    },
    'ToolsServices.jsx': {
        'title': 'Tools',
        'slug': 'tools',
        'color': 'violet',
        'tags': ['Extension', 'Chrome Extension'],
        'hero': "Sometimes the best tool for the job doesn't exist yet. That's when you build it. I create purpose-built browser extensions and developer tools that integrate directly into the workflows your team already uses — saving hours of repetitive work every single week.",
        'subServices': [{'name': 'Google Chrome Extension', 'slug': 'google-extension'}],
        'isCategory': True
    },
    'FrontendDevelopment.jsx': {
        'title': 'Frontend Development',
        'slug': 'frontend-development',
        'color': 'emerald',
        'hero': "The frontend is your handshake with the world. It's the first thing people see, the first thing they feel. I build frontends that don't just display content — they create moments. Fast, responsive, animated, and pixel-perfect on every screen.",
        'parentLink': '/services/full-stack-development',
        'parentName': 'Full-Stack',
        'deliverables': 'React/Next.js apps, Responsive layouts, GSAP/Framer Motion animations, Component architecture, Core Web Vitals, Cross-browser testing',
        'stack': 'React, Next.js, Vite, Tailwind CSS, GSAP, Framer Motion, TypeScript',
        'isCategory': False
    },
    'BackendDevelopment.jsx': {
        'title': 'Backend Development',
        'slug': 'backend-development',
        'color': 'violet',
        'hero': "Nobody sees the backend. That's the point. But everything your users love — the instant search, the real-time updates, the 'how did it know?' moments — all runs on the invisible architecture underneath. I build backends that are fast, secure, and built to grow with you.",
        'parentLink': '/services/full-stack-development',
        'parentName': 'Full-Stack',
        'deliverables': 'Database design (PostgreSQL), Supabase integration, REST/GraphQL APIs, Auth systems, Real-time data, Serverless functions',
        'stack': 'Supabase, PostgreSQL, Node.js, Express, REST APIs, GraphQL, Edge Functions',
        'isCategory': False
    },
    'IOSAppDevelopment.jsx': {
        'title': 'iOS App Development',
        'slug': 'ios-app-development',
        'color': 'emerald',
        'hero': "The same Flutter codebase that powers your Android app? It runs beautifully on iOS too. Pixel-perfect on iPhone, fluid on iPad, and published to the App Store with the same care and precision. One codebase, two platforms, zero compromise.",
        'parentLink': '/services/app-development',
        'parentName': 'App Development',
        'deliverables': 'Native-like iOS performance, Custom UI with Cupertino widgets, App Store submission, Push notifications, In-app purchases, Cross-platform shared codebase with Android',
        'stack': 'Flutter, Dart, Provider/Riverpod, Firebase, Supabase, Xcode, TestFlight',
        'isCategory': False
    },
    'GoogleExtension.jsx': {
        'title': 'Google Chrome Extension',
        'slug': 'google-extension',
        'color': 'violet',
        'hero': "That task you repeat 20 times a day inside Chrome? What if one click handled it? I build Google Chrome extensions that turn repetitive browser workflows into single-click actions — from content scrapers to productivity dashboards, from quick formatters to full-blown SaaS tools that live in your browser.",
        'parentLink': '/services/tools',
        'parentName': 'Tools',
        'deliverables': 'Chrome Extension (Manifest V3), Popup & Side Panel UI, Content Scripts & Background Workers, Chrome Storage & Sync, OAuth & API Integration, Chrome Web Store publishing',
        'stack': 'JavaScript/TypeScript, Chrome APIs (Manifest V3), React (for popup UI), HTML/CSS, Chrome Storage, Web APIs',
        'isCategory': False
    }
}

for file_name, data in pages.items():
    content = ""
    if data['isCategory']:
        tags_js_array = json.dumps(data['tags'])
        sub_services_html = "".join([f'<Link to="/services/{s["slug"]}" className="block bento-card p-6 border-white/5 hover:border-{data["color"]}-500/30 transition-all group/card"><div className="flex items-center justify-between"><h3 className="text-xl font-bold text-white tracking-tighter group-hover/card:text-{data["color"]}-400 transition-colors">{s["name"]}</h3><svg className="w-5 h-5 text-{data["color"]}-500 opacity-50 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div></Link>' for s in data['subServices']])
        
        content = f"""import {{ useState, useEffect, useMemo }} from 'react'
import {{ Link }} from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import {{ fetchProjects }} from '../lib/supabase'
import {{ useSEO }} from '../hooks/useSEO'

export default function {file_name.replace('.jsx', '')}() {{
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useSEO({{
    title: '{data["title"]} | Sahed Alom Sumit',
    description: '{data["hero"][:150]}...',
    canonical: '/services/{data["slug"]}',
  }})

  useEffect(() => {{
    async function loadProjects() {{
      const data = await fetchProjects()
      if (data) setProjects(data)
      setLoading(false)
    }}
    loadProjects()
  }}, [])

  const tags = {tags_js_array}

  const filteredProjects = useMemo(() => {{
    return projects.filter(p => p.tags && p.tags.some(tag => tags.includes(tag)))
  }}, [projects])

  return (
    <>
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-{data["color"]}-500 transition">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-{data["color"]}-500 transition">Services</Link>
              <span>/</span>
              <span className="text-white">{data["title"]}</span>
            </nav>
            <div className="font-mono text-{data["color"]}-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Service_Hub</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-8">
              {data["title"]}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed border-l-2 border-{data["color"]}-500/30 pl-6">
              {data["hero"]}
            </p>
          </header>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mb-24">
            <div className="font-mono text-{data["color"]}-500 text-[10px] uppercase tracking-widest mb-6">/ Core_Offerings</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sub_services_html}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="mb-20">
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h2 className="text-2xl font-bold tracking-tighter text-white uppercase">Featured_Builds</h2>
              <Link to="/portfolio" className="font-mono text-[10px] text-{data["color"]}-500 uppercase tracking-widest hover:text-{data["color"]}-400 transition-colors">View_All_Work →</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {{loading ? (
                <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed border-white/10 rounded-2xl">
                  <span className="font-mono text-{data["color"]}-500 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-{data["color"]}-500 rounded-full animate-ping" />
                    Fetching_Builds...
                  </span>
                </div>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.slice(0, 4).map(p => (
                  <ProjectCard key={{p.id || p.slug}} project={{p}} layout="grid" />
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed border-white/10 rounded-2xl">
                  <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">No_Results_Found</p>
                </div>
              )}}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}}
"""
    else:
        content = f"""import {{ Link }} from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import {{ useSEO }} from '../hooks/useSEO'

export default function {file_name.replace('.jsx', '')}() {{
  useSEO({{
    title: '{data["title"]} | Sahed Alom Sumit',
    description: '{data["hero"][:150]}...',
    canonical: '/services/{data["slug"]}',
  }})

  return (
    <>
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-{data["color"]}-500 transition">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-{data["color"]}-500 transition">Services</Link>
              <span>/</span>
              <Link to="{data["parentLink"]}" className="hover:text-{data["color"]}-500 transition">{data["parentName"]}</Link>
              <span>/</span>
              <span className="text-white">{data["title"]}</span>
            </nav>
            <div className="font-mono text-{data["color"]}-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">Service_Module</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-8">
              {data["title"]}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed border-l-2 border-{data["color"]}-500/30 pl-6">
              {data["hero"]}
            </p>
          </header>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bento-card p-8 border-{data["color"]}-500/20">
              <h3 className="font-mono text-[10px] text-{data["color"]}-500 uppercase tracking-widest mb-4">/ Deliverables</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {data["deliverables"]}
              </p>
            </div>
            <div className="bento-card p-8 border-{data["color"]}-500/20">
              <h3 className="font-mono text-[10px] text-{data["color"]}-500 uppercase tracking-widest mb-4">/ Tech_Stack</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {data["stack"]}
              </p>
            </div>
          </div>
        </RevealOnScroll>

      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}}
"""
    
    with open(os.path.join(src_dir, file_name), 'w', encoding='utf-8') as f:
        f.write(content)

print("Generated all files successfully.")
