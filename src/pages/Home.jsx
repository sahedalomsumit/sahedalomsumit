import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import RevealOnScroll from '../components/RevealOnScroll'
import Carousel from '../components/Carousel'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import { useState } from 'react'
import { useSEO } from '../hooks/useSEO'

gsap.registerPlugin(TextPlugin)

const certificates = [
  { id: 1, label: 'Certi_Entry_1', title: 'Google UX Design', date: 'Dec 2024 · Coursera', skills: ['UX Basics', 'UX Process', 'Wireframes & Prototypes', 'UX Research', 'High-Fidelity Designs', 'Dynamic UI', 'Social Good UX & Jobs'], img: '/img/certificates/Google-UX-Design-Coursera-1SHUXJFXGATW.png' },
  { id: 2, label: 'Certi_Entry_2', title: 'Master HTML & CSS', date: 'Aug 2024 · Udemy', skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox & Grid', 'Accessibility', 'Animations'], img: '/img/certificates/master-html-and-css-by-building-real-world-projetcs-certificate-udemy-sahedalomsumit.png' },
  { id: 3, label: 'Certi_Entry_3', title: 'Design Sprint Days', date: 'May 2024 · Alma Talent Oy', skills: ['Understand', 'Ideate', 'Decide', 'Prototype', 'Test'], img: '/img/certificates/design-sprint-days-alma-talent-oy-sahedalomsumit.png' },
  { id: 4, label: 'Certi_Entry_4', title: 'Responsive Web Design', date: 'Dec 2023 · FreeCodeCamp', skills: ['HTML', 'CSS', 'UI/UX Design', 'Responsive Layout', 'Visual Design'], img: '/img/certificates/responsive-web-design-freecodecamp-sahedalomsumit.png' },
  { id: 5, label: 'Certi_Entry_5', title: 'Web Design & Development', date: 'Mar 2021 · LEDP', skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Figma', 'WordPress', 'Webflow'], img: '/img/certificates/web-design-and-development-ledp-sahedalomsumit.png' },
  { id: 6, label: 'Certi_Entry_6', title: 'Webflow Expert', date: 'Mar 2021 · Webflow', skills: ['Webflow Design', 'Webflow Development', 'Webflow Animation', 'Spline 3D', 'Responsive Design', 'SEO Principles'], img: '/img/certificates/webflow-101-sahedalomsumit.png' },
]

const experiences = [
  { id: 1, label: 'Exp_Entry_1', title: 'No-Code Web Developer & UI/UX Designer', period: 'May 2020 – Present · Fiverr (Freelance)', bullets: ['Delivered 50+ websites for clients across 10+ countries with consistent 5-star ratings and a 40% repeat client rate.', 'Built scalable WordPress and Webflow projects with strong focus on UX, performance, responsiveness, and clean structure.', 'Managed full workflow from research and wireframes to final launch.'] },
  { id: 2, label: 'Exp_Entry_2', title: 'No-Code Web Developer & UI/UX Designer', period: 'Mar 2021 – Present · Upwork (Freelance)', bullets: ['Maintains a 100% Job Success Score across over 10 global projects, specializing in creating custom Figma designs and translating them into pixel-perfect Webflow, WordPress, Framer, Kajabi websites.', 'Provides full-cycle services from user research to frontend implementation (HTML/CSS/JS), ensuring optimal performance and SEO.', 'Consistently rated 5/5 stars for technical expertise, successfully delivering complex CMS integrations and immersive animations.'] },
  { id: 3, label: 'Exp_Entry_3', title: 'UI/UX Designer', period: 'Mar 2024 – Feb 2025 · Vesko (Part-time)', bullets: ['As part of a small design team, I\'ve been closely involved in Vesko\'s product design, working on mobile app, desktop webshop, and tablet interface designs.', 'We\'re also developing the Vesko website, which will serve as both a landing page and a multi-page site.', 'Our goal is to create a seamless, user-friendly experience across all platforms, ensuring the product is both functional and visually appealing.'] },
  { id: 4, label: 'Exp_Entry_4', title: 'No-Code Web Designer & Developer', period: 'Feb 2022 – Jan 2024 · Artic Maze (Full-time)', bullets: ['I designed and developed website projects from start to finish, using WordPress and Webflow to create custom sites that exceeded client expectations.', 'In WordPress, I built and customized websites using Elementor, WooCommerce, Crocoblock, and other essential plugins to enhance functionality and user experience.', 'I implemented advanced Webflow features like animations, CMS, and 3D Spline, optimizing performance for speed and functionality.', 'I also quickly resolved technical issues to ensure a seamless user experience.'] },
  { id: 5, label: 'Exp_Entry_5', title: 'Webflow Developer', period: 'Mar 2023 – Nov 2023 · Sixforces (Freelance)', bullets: ['I\'ve completed over 40 projects where I turned designs or older websites into clean, modern Webflow sites.', 'I focused on improving content, adding smooth animations, and making each page feel more engaging.', 'I also worked closely with clients on features, integrations, and deployment to ensure everything ran smoothly.', 'Along the way, I optimized loading speed, responsiveness, and overall user experience, while joining weekly meetings to keep communication clear and steady.'] },
]

const testimonials = [
  { initials: 'RK', name: 'Rahil Khan', role: 'Founder @ Artic Maze', quote: '"Sahed is pretty good at Webflow and WordPress, I have done several projects with him and he always did amazing work."', color: 'bg-violet-600', shadow: 'shadow-violet-500/20' },
  { initials: 'LF', name: 'Leo Fadi', role: 'Founder @ Vesko', quote: '"I had the pleasure to work with Sahed on Vesko\'s UI/UX development."', color: 'bg-emerald-600', shadow: 'shadow-emerald-500/20' },
]

const reviewImages = Array.from({ length: 18 }, (_, i) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 21]
  return nums[i] ? `/img/testimonials/fiverr-review-sahedalomsumit-${nums[i]}.webp` : null
}).filter(Boolean)

const reviewSlides = []
for (let i = 0; i < reviewImages.length; i += 2) {
  reviewSlides.push(reviewImages.slice(i, i + 2))
}

export default function Home() {
  const typewriterRef = useRef(null)
  const heroRef = useRef(null)
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useSEO({
    description: 'Sahed Alom Sumit is a Vibe Web Designer & Developer based in Helsinki, Finland. I build websites that feel alive — where good design meets clean code.',
    canonical: '/',
  })

  useEffect(() => {
    async function loadFeatured() {
      const { fetchFeaturedProjects } = await import('../lib/supabase')
      const data = await fetchFeaturedProjects()
      if (data) setFeatured(data)
      setLoading(false)
    }
    loadFeatured()
    // Hero animations — set initial state then animate in
    gsap.set('.hero-el', { opacity: 0, y: 20 })
    gsap.to('.hero-el', { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' })

    // Typewriter
    const words = [
      'Vibe Web Designer',
      'Vibe Web Developer',
      'Vibe AI Automation',
      'Design. Code. Vibes.'
    ]
    let i = 0
    const typeWord = () => {
      gsap.to(typewriterRef.current, {
        duration: 1.5, text: words[i], ease: 'none',
        onComplete: () => { setTimeout(() => { i = (i + 1) % words.length; typeWord() }, 2000) },
      })
    }
    typeWord()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="min-h-screen flex flex-col justify-center items-center text-center relative">
        <div className="space-y-6 flex flex-col items-center px-4 max-w-7xl mx-auto">
          <div className="font-mono text-violet-500 text-xs tracking-[0.2em] sm:tracking-[0.5em] font-bold uppercase hero-el">
            Loading Good Vibes...
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full hero-el transform transition-all hover:bg-emerald-500/20 mb-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
            <span className="text-[9px] md:text-[11px] font-mono text-white-500 font-bold uppercase tracking-[0.2em]">BASED IN HELSINKI, FINLAND</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-extrabold tracking-tighter text-white hero-el leading-[0.85] mb-2 uppercase">
            SAHED ALOM <span className="text-violet-500">SUMIT<span className="animate-pulse">.</span></span>
          </h1>
          <p className="sr-only">Vibe Web Designer & Developer based in Helsinki, Finland</p>
          <div className="h-10 hero-el">
            <span ref={typewriterRef} className="font-mono text-sm md:text-2xl text-gray-400 uppercase tracking-[0.3em]" />
            <span className="inline-block w-2 h-6 bg-violet-500 animate-pulse align-middle" />
          </div>
          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg font-light hero-el pt-4 leading-relaxed italic">
            Vibe web design. Clean development. AI automation that actually makes sense. That's what I do.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-12 hero-el">
            <Link to="/portfolio" className="px-10 py-4 bg-white text-black font-black rounded-full text-xs tracking-[0.2em] hover:bg-violet-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-violet-500/10 uppercase">View My Portfolio</Link>
            <Link to="/#contact" className="px-10 py-4 bento-card text-white font-bold rounded-full text-xs tracking-[0.2em] hover:border-violet-500 transition-all transform hover:-translate-y-1 uppercase">Connect With Me</Link>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <RevealOnScroll>
        <section id="bio" className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bento-card p-8 md:p-14 flex flex-col justify-between">
            <div>
              <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2">/ About Me</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white leading-tight">
                Vibe web design. Clean development. AI automation that actually makes sense. That's what I do.
              </h2>
              <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
                <p>
                  Good design and purposeful development should feel effortless. That's what I chase with every project — that moment when someone lands on a site and just gets it without thinking twice.
                </p>
                <p>
                  I've spent the past 5+ years working with founders, brands, and agencies across the world, helping them turn rough ideas into polished digital products. My work sits right at the intersection of design thinking and full-stack development. I care about the vibe of a page as much as I care about how fast it loads.
                </p>
                <p>
                  Smooth animations that make people stop scrolling. Dynamic systems that just work. Prototypes that feel so real clients forget it's not live yet. Whatever the project needs — I show up with the same care, the same eye, and the same drive to get it right. With a background Bachelor's in Business IT, I also understand the business side of things. So I'm not just making things look good — I'm making sure they actually work for your goals.
                </p>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="border-l-2 border-emerald-500/30 pl-6 group">
                <div className="text-5xl font-black text-white tracking-tighter group-hover:text-emerald-500 transition-colors">150+</div>
                <div className="font-mono text-[10px] text-gray-400 uppercase mt-2 tracking-widest">Sites Built</div>
              </div>
              <div className="border-l-2 border-violet-500/30 pl-6 group">
                <div className="text-5xl font-black text-white tracking-tighter group-hover:text-violet-500 transition-colors">5yr+</div>
                <div className="font-mono text-[10px] text-gray-400 uppercase mt-2 tracking-widest">Experience</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bento-card p-8">
            <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-8">/ Core_Node</div>
            <div className="space-y-10">
              {[
                { label: 'Location_ID', value: 'Helsinki, Finland', href: 'https://maps.google.com/?q=Helsinki, Finland' },
                { label: 'Primary_Mail', value: 'sahedalomsumit@gmail.com', href: 'mailto:sahedalomsumit@gmail.com' },
                { label: 'WhatsApp_Node', value: '+358415765539', href: 'https://wa.me/+358415765539' },
                { label: 'LinkedIn_Profile', value: 'sahedalomsumit', href: 'https://linkedin.com/in/sahedalomsumit' },
                { label: 'GitHub_Repository', value: 'sahedalomsumit', href: 'https://github.com/sahedalomsumit' },
              ].map((item) => (
                <div key={item.label} className="group">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">{item.label}</p>
                  <p className="text-white text-lg font-semibold truncate group-hover:text-violet-400 transition">
                    <a href={item.href} target="_blank" rel="noopener noreferrer">{item.value}</a>
                  </p>
                </div>
              ))}
              <div className="pt-10 border-t border-white/5">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">Availability_Metrics</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <p className="text-white font-bold text-sm">System_Ready_to_Collab</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Skills Section */}
      <RevealOnScroll>
        <section id="skills" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="block sm:flex items-center justify-between mb-16 border-b border-white/5 pb-8">
            <h2 className="text-4xl font-bold tracking-tighter text-white uppercase">Skill_Inventory</h2>
            <span className="font-mono text-xs text-emerald-500">39_MODULES_LOADED</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bento-card p-8">
              <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-8">/ Design_Dev_Unit</div>
              <div className="flex flex-wrap gap-2">
                {['Design Principles', 'Responsive Design', 'Accessibility'].map(s => (
                  <span key={s} className="skill-tag border-emerald-400/50 bg-white/10 text-white font-bold">{s}</span>
                ))}
                {['Prototyping', 'Wireframing', 'User Research', 'Usability Testing', 'Interaction Design', 'Visual Design', 'User Flows', 'Design Systems'].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="bento-card p-8 border-violet-500/20 bg-violet-500/5">
              <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-8">/ Design_Dev_Stack</div>
              <div className="flex flex-wrap gap-2">
                {['Webflow', 'WordPress', 'Figma', 'Custom Coding Website'].map(s => (
                  <span key={s} className="skill-tag border-violet-400/50 bg-white/10 text-white font-bold">{s}</span>
                ))}
                {['React', 'node.js', 'Tailwind CSS', 'Supabase', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Framer', 'Kajabi', 'SEO', 'Speed Optimization'].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="bento-card p-8">
              <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-8">/ Design_Dev_AI</div>
              <div className="flex flex-wrap gap-2">
                {['Claude Code', 'Antigravity', 'Stitch', 'Make.com', 'n8n', 'Zapier'].map(s => (
                  <span key={s} className="skill-tag border-emerald-400/50 bg-white/10 text-white font-bold">{s}</span>
                ))}
                {['AI-Assisted Design', 'AI Content Workflows', 'Prompt Engineering', 'AI Website Building', 'Vibe Coding', 'AI UI Generation', 'Automated Testing'].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Education, Experience, Certificates */}
      <RevealOnScroll>
        <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
            {/* Education */}
            <div className="bento-card p-8 md:p-14 flex flex-col justify-between">
              <div>
                <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2">/ Edu_Entry</div>
                <h2 className="text-xl md:text-3xl font-bold mb-6 text-white leading-tight">Bachelor's | 2023 - 2025</h2>
                <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
                  <p>
                    Haaga-Helia University of Applied Sciences<br />
                    <b className="text-white">Business Information Technology</b><br />
                    <b className="text-white">Major:</b> Design Services<br />
                    <b className="text-white">Thesis:</b> The Future of No-code Web Development: Evaluating the Potential and Limitations of Webflow
                  </p>
                  <div>
                    <p className="text-white font-medium mb-2">Key Areas of Study:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-400">
                      {['Digital User Experience', 'Website Design & Development', 'Digital Service Design', 'Innovation & Prototyping', 'React Fundamentals', 'Cloud Technologies (AWS)', 'Data Management & Databases', 'Applied AI', 'ICT Project Management', 'Linux Basics'].map(a => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Certificates Carousel */}
            <div className="max-w-5xl mx-auto py-8">
              <Carousel>
                {certificates.map(cert => (
                  <div key={cert.id} className="bg-zinc-900 rounded-3xl p-8">
                    <p className="text-emerald-500 text-xs uppercase tracking-widest mb-4">/ {cert.label}</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{cert.title}</h2>
                    <p className="text-emerald-300 text-sm mb-6">{cert.date}</p>
                    <ul className="grid md:grid-cols-2 gap-3 text-gray-400 text-sm">
                      {cert.skills.map(s => <li key={s}>{s}</li>)}
                    </ul>
                    <img src={cert.img} className="rounded-2xl mt-6 w-full" alt={`${cert.title} Certificate for Sahed Alom Sumit`} loading="lazy" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="md:col-span-6">
            {/* Experience Carousel */}
            <div className="max-w-5xl mx-auto mb-8">
              <Carousel>
                {experiences.map(exp => (
                  <div key={exp.id} className="bg-zinc-900 rounded-3xl p-8 md:p-14 flex flex-col justify-between">
                    <div>
                      <div className="text-emerald-500 text-[10px] uppercase tracking-widest mb-6">/ {exp.label}</div>
                      <h2 className="text-xl md:text-3xl font-bold mb-4">{exp.title}</h2>
                      <div className="space-y-4 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
                        <p className="text-emerald-300 text-sm">{exp.period}</p>
                        {exp.bullets.map((b, i) => <p key={i}>{b}</p>)}
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            {/* Intro Video */}
            <div className="bento-card p-8 md:p-14 flex flex-col justify-between">
              <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2">/ Intro_Entry</div>
              <iframe
                className="w-full h-auto rounded-xl sm:h-64"
                src="https://www.youtube-nocookie.com/embed/ODVpG64Nf40?si=VCRHoR0iD-OpQFDC"
                srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube-nocookie.com/embed/ODVpG64Nf40?autoplay=1><img src=https://img.youtube.com/vi/ODVpG64Nf40/hqdefault.jpg alt='Video'><span>▶</span></a>"
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Featured Portfolio */}
      <RevealOnScroll>
        <section id="work" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tighter text-white uppercase">Main_Builds</h2>
              <p className="text-gray-400 mt-3 text-lg italic">Curated high-performance web solutions.</p>
            </div>
            <Link to="/portfolio" className="px-8 py-3 bento-card text-[10px] font-mono font-bold hover:bg-white hover:text-black transition uppercase tracking-widest">Explore_Portfolio</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {loading ? (
              <div className="md:col-span-2 text-center font-mono text-emerald-500 uppercase tracking-widest text-xs flex items-center justify-center gap-2 py-10">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                Fetching_Featured_Builds...
              </div>
            ) : (
              featured.map(p => <ProjectCard key={p.id || p.slug} project={p} />)
            )}
          </div>
        </section>
      </RevealOnScroll>

      {/* Testimonials */}
      <RevealOnScroll>
        <section className="py-32 bg-[#030303] border-y border-white/5">
          <div className="max-w-7xl px-4 mx-auto">
            <h2 className="text-2xl sm:text-6xl font-bold text-center mb-20 text-white uppercase tracking-[0.2em]">Validation_Logs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bento-card p-8 flex flex-col justify-between hover:bg-white/[0.03]">
                  <p className="text-gray-400 italic text-lg leading-relaxed mb-10">{t.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${t.color} rounded-2xl flex items-center justify-center text-sm font-black shadow-lg ${t.shadow}`}>{t.initials}</div>
                    <div>
                      <p className="text-white font-bold">{t.name}</p>
                      <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Review screenshots carousel */}
            <div className="relative bento-card p-8 mt-8">
              <Carousel>
                {reviewSlides.map((pair, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pair.map((imgSrc) => (
                      <div key={imgSrc} className="rounded-xl overflow-hidden">
                        <img
                          src={imgSrc}
                          alt="5-star Fiverr client review for Sahed Alom Sumit"
                          className="w-full h-auto object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <ContactSection />
    </>
  )
}
