import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import RevealOnScroll from "../components/RevealOnScroll";
import Carousel from "../components/Carousel";
import ProjectCard from "../components/ProjectCard";
import ContactSection from "../components/ContactSection";
import { useSEO } from "../hooks/useSEO";

gsap.registerPlugin(TextPlugin);

/* ─── Accordion Item ─────────────────────────────────────────────────── */
function AccordionItem({ id, openId, setOpenId, label, title, subtitle, children, isFirst, isLast }) {
  const bodyRef = useRef(null);
  const isOpen = openId === id;

  const toggle = useCallback(() => {
    setOpenId(prev => (prev === id ? null : id));
  }, [id, setOpenId]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      // Expand
      gsap.set(el, { display: 'block' });
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.45, ease: 'power3.out' }
      );
    } else {
      // Collapse
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => gsap.set(el, { display: 'none' }),
      });
    }
  }, [isOpen]);

  return (
    <div
      onClick={toggle}
      className="accordion-item"
      style={{
        borderBottom: isLast ? 'none' : (isOpen ? '1px solid rgba(139,92,246,0.3)' : '1px solid var(--border)'),
        cursor: 'pointer',
        padding: '1.25rem 0',
        userSelect: 'none',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--emerald, #10b981)', display: 'block', marginBottom: '4px' }}>
            / {label}
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.35, display: 'block' }}>
            {title}
          </span>
          {subtitle && (
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '3px', display: 'block', opacity: 0.7 }}>
              {subtitle}
            </span>
          )}
        </div>
        {/* Chevron */}
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 4,
            transition: 'all 0.3s ease',
            background: isOpen ? 'rgba(139,92,246,0.2)' : 'transparent',
            borderColor: isOpen ? 'rgba(139,92,246,0.4)' : 'var(--border)',
          }}
        >
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
          >
            <path d="M2 4l4 4 4-4" stroke={isOpen ? 'var(--emerald, #10b981)' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {/* Body */}
      <div ref={bodyRef} style={{ display: isFirst ? 'block' : 'none', overflow: 'hidden' }}>
        <div style={{ paddingTop: '0.875rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const certificates = [
  {
    id: 1,
    label: "Certi_Entry_1",
    title: "Google UX Design",
    date: "Dec 2024 · Coursera",
    skills: [
      "UX Basics",
      "UX Process",
      "Wireframes & Prototypes",
      "UX Research",
      "High-Fidelity Designs",
      "Dynamic UI",
      "Social Good UX & Jobs",
    ],
    img: "/img/certificates/Google-UX-Design-Coursera-1SHUXJFXGATW.png",
  },
  {
    id: 2,
    label: "Certi_Entry_2",
    title: "Master HTML & CSS",
    date: "Aug 2024 · Udemy",
    skills: [
      "HTML5",
      "CSS3",
      "Responsive Design",
      "Flexbox & Grid",
      "Accessibility",
      "Animations",
    ],
    img: "/img/certificates/master-html-and-css-by-building-real-world-projetcs-certificate-udemy-sahedalomsumit.png",
  },
  {
    id: 3,
    label: "Certi_Entry_3",
    title: "Design Sprint Days",
    date: "May 2024 · Alma Talent Oy",
    skills: ["Understand", "Ideate", "Decide", "Prototype", "Test"],
    img: "/img/certificates/design-sprint-days-alma-talent-oy-sahedalomsumit.png",
  },
  {
    id: 4,
    label: "Certi_Entry_4",
    title: "Responsive Web Design",
    date: "Dec 2023 · FreeCodeCamp",
    skills: [
      "HTML",
      "CSS",
      "UI/UX Design",
      "Responsive Layout",
      "Visual Design",
    ],
    img: "/img/certificates/responsive-web-design-freecodecamp-sahedalomsumit.png",
  },
  {
    id: 5,
    label: "Certi_Entry_5",
    title: "Web Design & Development",
    date: "Mar 2021 · LEDP",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "Figma",
      "WordPress",
      "Webflow",
    ],
    img: "/img/certificates/web-design-and-development-ledp-sahedalomsumit.png",
  },
  {
    id: 6,
    label: "Certi_Entry_6",
    title: "Webflow Expert",
    date: "Mar 2021 · Webflow",
    skills: [
      "Webflow Design",
      "Webflow Development",
      "Webflow Animation",
      "Spline 3D",
      "Responsive Design",
      "SEO Principles",
    ],
    img: "/img/certificates/webflow-101-sahedalomsumit.png",
  },
];

const experiences = [
  {
    id: 1,
    label: "Exp_Entry_1",
    title: "No-Code Web Developer & UI/UX Designer",
    period: "May 2020 – Present · Fiverr (Freelance)",
    bullets: [
      "Delivered 50+ websites for clients across 10+ countries with consistent 5-star ratings and a 40% repeat client rate.",
      "Built scalable WordPress and Webflow projects with strong focus on UX, performance, responsiveness, and clean structure.",
      "Managed full workflow from research and wireframes to final launch.",
    ],
  },
  {
    id: 2,
    label: "Exp_Entry_2",
    title: "No-Code Web Developer & UI/UX Designer",
    period: "Mar 2021 – Present · Upwork (Freelance)",
    bullets: [
      "Maintains a 100% Job Success Score across over 10 global projects, specializing in creating custom Figma designs and translating them into pixel-perfect Webflow, WordPress, Framer, Kajabi websites.",
      "Provides full-cycle services from user research to frontend implementation (HTML/CSS/JS), ensuring optimal performance and SEO.",
      "Consistently rated 5/5 stars for technical expertise, successfully delivering complex CMS integrations and immersive animations.",
    ],
  },
  {
    id: 3,
    label: "Exp_Entry_3",
    title: "UI/UX Designer",
    period: "Mar 2024 – Feb 2025 · Vesko (Part-time)",
    bullets: [
      "As part of a small design team, I've been closely involved in Vesko's product design, working on mobile app, desktop webshop, and tablet interface designs.",
      "We're also developing the Vesko website, which will serve as both a landing page and a multi-page site.",
      "Our goal is to create a seamless, user-friendly experience across all platforms, ensuring the product is both functional and visually appealing.",
    ],
  },
  {
    id: 4,
    label: "Exp_Entry_4",
    title: "No-Code Web Designer & Developer",
    period: "Feb 2022 – Jan 2024 · Artic Maze (Full-time)",
    bullets: [
      "I designed and developed website projects from start to finish, using WordPress and Webflow to create custom sites that exceeded client expectations.",
      "In WordPress, I built and customized websites using Elementor, WooCommerce, Crocoblock, and other essential plugins to enhance functionality and user experience.",
      "I implemented advanced Webflow features like animations, CMS, and 3D Spline, optimizing performance for speed and functionality.",
      "I also quickly resolved technical issues to ensure a seamless user experience.",
    ],
  },
  {
    id: 5,
    label: "Exp_Entry_5",
    title: "Webflow Developer",
    period: "Mar 2023 – Nov 2023 · Sixforces (Freelance)",
    bullets: [
      "I've completed over 40 projects where I turned designs or older websites into clean, modern Webflow sites.",
      "I focused on improving content, adding smooth animations, and making each page feel more engaging.",
      "I also worked closely with clients on features, integrations, and deployment to ensure everything ran smoothly.",
      "Along the way, I optimized loading speed, responsiveness, and overall user experience, while joining weekly meetings to keep communication clear and steady.",
    ],
  },
];

const testimonials = [
  {
    initials: "RK",
    name: "Rahil Khan",
    role: "Founder @ Artic Maze",
    quote:
      '"Sahed is pretty good at Webflow and WordPress, I have done several projects with him and he always did amazing work."',
    color: "bg-violet-600",
    shadow: "shadow-violet-500/20",
  },
  {
    initials: "FO",
    name: "Filippo O.",
    role: "Co-founder & President @ Metodo Ongaro",
    quote:
      '"Sahed has proven to be fast, reliable, capable and dedicated. We have found in him a very valuable partner."',
    color: "bg-emerald-600",
    shadow: "shadow-emerald-500/20",
  },
];

const reviewImages = Array.from({ length: 18 }, (_, i) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 21];
  return nums[i]
    ? `/img/testimonials/fiverr-review-sahedalomsumit-${nums[i]}.webp`
    : null;
}).filter(Boolean);

const reviewSlides = [];
for (let i = 0; i < reviewImages.length; i += 2) {
  reviewSlides.push(reviewImages.slice(i, i + 2));
}

export default function Home() {
  const typewriterRef = useRef(null);
  const heroRef = useRef(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCert, setOpenCert] = useState(null); // collapsed by default
  const [openExp, setOpenExp] = useState(1);    // first exp open by default
  const [activeSkillTab, setActiveSkillTab] = useState(1);

  useSEO({
    description:
      "Sahed Alom Sumit is a Web Designer & Developer based in Helsinki, Finland. I build websites that feel alive — where good design meets clean code.",
    canonical: "/",
  });

  useEffect(() => {
    async function loadFeatured() {
      const { fetchFeaturedProjects } = await import("../lib/supabase");
      const data = await fetchFeaturedProjects();
      if (data) setFeatured(data);
      setLoading(false);
    }
    loadFeatured();
    // Hero animations — set initial state then animate in
    gsap.set(".hero-el", { opacity: 0, y: 20 });
    gsap.to(".hero-el", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
    });

    // Typewriter
    const words = [
      "Web Designer",
      "Web Developer",
      "AI Automation",
      "Design. Code. Deploy.",
    ];
    let i = 0;
    const typeWord = () => {
      gsap.to(typewriterRef.current, {
        duration: 1.5,
        text: words[i],
        ease: "none",
        onComplete: () => {
          setTimeout(() => {
            i = (i + 1) % words.length;
            typeWord();
          }, 2000);
        },
      });
    };
    typeWord();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center text-center relative"
      >
        <div className="space-y-6 flex flex-col items-center px-4 max-w-7xl mx-auto">
          <div className="font-mono text-violet-500 text-xs tracking-[0.2em] sm:tracking-[0.5em] font-bold uppercase hero-el">
            Loading Systems...
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full hero-el transform transition-all hover:bg-emerald-500/20 mb-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
            <span className="text-[9px] md:text-[11px] font-mono text-white-500 font-bold uppercase tracking-[0.2em]">
              BASED IN HELSINKI, FINLAND
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-extrabold tracking-tighter text-white hero-el leading-[0.85] mb-2 uppercase">
            SAHED ALOM{" "}
            <span className="text-violet-500">
              SUMIT<span className="animate-pulse">.</span>
            </span>
          </h1>
          <p className="sr-only">
            Web Designer & Developer based in Helsinki, Finland
          </p>
          <div className="h-10 hero-el">
            <span
              ref={typewriterRef}
              className="font-mono text-sm md:text-2xl text-gray-400 uppercase tracking-[0.3em]"
            />
            <span className="inline-block w-2 h-6 bg-violet-500 animate-pulse align-middle" />
          </div>
          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg font-light hero-el pt-4 leading-relaxed italic">
            Your website problem becomes my problem the moment you share it. I
            don't stop until it's solved—that's how I'm wired. That's why I call
            this my passion, not my job.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-12 hero-el">
            <Link
              to="/portfolio"
              className="px-10 py-4 bg-white text-black font-black rounded-full text-xs tracking-[0.2em] hover:bg-violet-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-violet-500/10 uppercase"
            >
              View My Portfolio
            </Link>
            <Link
              to="/#contact"
              className="px-10 py-4 bento-card text-white font-bold rounded-full text-xs tracking-[0.2em] hover:border-violet-500 transition-all transform hover:-translate-y-1 uppercase"
            >
              Connect With Me
            </Link>
          </div>
        </div>
      </section>

      {/* ── Intro Video Section ────────────────────────────────────────── */}
      <section id="intro-video" className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
        <RevealOnScroll direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="font-mono text-violet-500 text-[10px] uppercase tracking-widest flex items-center gap-3 mb-4">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                  </span>
                  / Stream_Intro
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter uppercase leading-[0.9]">
                  Designing the <br />
                  <span className="text-violet-500">Future</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                <p>
                  Experience the journey behind the pixels. This video captures my transition from a curious developer to a professional web designer & developer, highlighting the passion that fuels every project I undertake.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-[1px] bg-violet-500/50" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-violet-500/80">Sahed Alom Sumit</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="bento-card p-2 md:p-4 relative group">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/40">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/sPwLfagEq9M?si=fe5J85hzHyWzQokb"
                    title="My Journey as a Web Designer & Developer | Sahed Alom Sumit"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Bio Section */}
      <section
        id="bio"
        className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        <RevealOnScroll className="md:col-span-8" direction="left">
          <div className="bento-card p-8 md:p-14 flex flex-col justify-between h-full">
            <div>
              <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2">
                / About Me
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white leading-tight">
                Modern web design. Clean development. AI automation that
                actually makes sense. That's what I do.
              </h2>
              <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
                <p>
                  Your website problem becomes my problem the moment you share
                  it. I don't stop until it's solved—that's how I'm wired.
                  That's why I call this my passion, not my job.{" "}
                </p>
                <p>
                  For 5+ years, I've worked with founders, brands, and agencies
                  worldwide—turning rough ideas into sites that load fast, look
                  right, and actually convert. I work at the intersection of
                  design and full-stack development. I care about the vibe of a
                  page as much as the code behind it.
                </p>
                <p>
                  I also understand the business side because of my bachelor's
                  in Business IT. So nothing I build is just pretty—it works
                  toward your goals.
                </p>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="border-l-2 border-emerald-500/30 pl-6 group">
                <div className="text-5xl font-black text-white tracking-tighter group-hover:text-emerald-500 transition-colors">
                  150+
                </div>
                <div className="font-mono text-[10px] text-gray-400 uppercase mt-2 tracking-widest">
                  Sites Built
                </div>
              </div>
              <div className="border-l-2 border-violet-500/30 pl-6 group">
                <div className="text-5xl font-black text-white tracking-tighter group-hover:text-violet-500 transition-colors">
                  5yr+
                </div>
                <div className="font-mono text-[10px] text-gray-400 uppercase mt-2 tracking-widest">
                  Experience
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll
          className="md:col-span-4"
          delay={0.15}
          direction="right"
        >
          <div className="bento-card p-8 h-full">
            <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-8">
              / Core_Node
            </div>
            <div className="space-y-10">
              {[
                {
                  label: "Location_ID",
                  value: "Helsinki, Finland",
                  href: "https://maps.google.com/?q=Helsinki, Finland",
                },
                {
                  label: "Primary_Mail",
                  value: "sahedalomsumit@gmail.com",
                  href: "mailto:sahedalomsumit@gmail.com",
                },
                {
                  label: "WhatsApp_Node",
                  value: "+358415765539",
                  href: "https://wa.me/+358415765539",
                },
                {
                  label: "LinkedIn_Profile",
                  value: "sahedalomsumit",
                  href: "https://linkedin.com/in/sahedalomsumit",
                },
                {
                  label: "GitHub_Repository",
                  value: "sahedalomsumit",
                  href: "https://github.com/sahedalomsumit",
                },
              ].map((item) => (
                <div key={item.label} className="group">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">
                    {item.label}
                  </p>
                  <p className="text-white text-lg font-semibold truncate group-hover:text-violet-500 transition">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.value}
                    </a>
                  </p>
                </div>
              ))}
              <div className="pt-10 border-t border-white/5">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">
                  Availability_Metrics
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <p className="text-white font-bold text-sm">
                    System_Ready_to_Collab
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="block sm:flex items-center justify-between mb-16 border-b border-white/5 pb-8">
            <h2 className="text-4xl font-bold tracking-tighter text-white uppercase">
              Skill_Inventory
            </h2>
            <span className="font-mono text-xs text-emerald-500">
              40_MODULES_LOADED
            </span>
          </div>
        </RevealOnScroll>
        {/* Tabbed Skills */}
        <div className="w-full">
          {/* Tab Buttons - scrollable on mobile */}
          <div className="flex overflow-x-auto no-scrollbar gap-4 mb-8 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {[
              { label: 'Design & UX', id: 0, count: '13' },
              { label: 'Core Stack', id: 1, count: '16' },
              { label: 'AI & Automation', id: 2, count: '13' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSkillTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 border whitespace-nowrap ${
                  activeSkillTab === tab.id
                    ? 'bg-accent/10 border-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className={`${activeSkillTab === tab.id ? 'text-accent' : 'text-gray-600'}`}>{tab.step || (tab.id + 1).toString().padStart(2, '0')}_</span>
                {tab.label}
                <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[8px] ${activeSkillTab === tab.id ? 'bg-accent/20 text-accent' : 'bg-white/5 text-gray-600'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <RevealOnScroll key={activeSkillTab}>
            <div className="bento-card p-10 md:p-14 relative overflow-hidden min-h-[300px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -mr-32 -mt-32" />
              
              <div className="relative z-10">
                {activeSkillTab === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6">/ Design_Dev_Unit</div>
                      <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">User Experience & Interface</h3>
                      <p className="text-gray-400 leading-relaxed max-w-md mb-8">
                        My approach to design is rooted in psychology and accessibility, ensuring every pixel serves a purpose and every interaction feels natural.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 content-start">
                      {["UI/UX Design", "Responsive Design", "Design Systems"].map(s => (
                        <span key={s} className="skill-tag border-emerald-400/50 bg-white/10 text-white font-bold">{s}</span>
                      ))}
                      {["User Research", "Wireframing", "Prototyping", "Accessibility (WCAG)", "Typography", "Visual Design", "Information Architecture", "Interaction Design", "Figma", "Adobe Creative Suite"].map(s => (
                        <span key={s} className="skill-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {activeSkillTab === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="font-mono text-violet-500 text-[10px] uppercase tracking-widest mb-6">/ Design_Dev_Stack</div>
                      <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">Development & Infrastructure</h3>
                      <p className="text-gray-400 leading-relaxed max-w-md mb-8">
                        I leverage a diverse set of technologies to build scalable, high-performance web applications that look great and run faster.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 content-start">
                      {["Webflow", "WordPress", "React", "Next.js"].map(s => (
                        <span key={s} className="skill-tag border-violet-400/50 bg-white/10 text-white font-bold">{s}</span>
                      ))}
                      {["JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS", "Node.js", "Supabase", "Git/GitHub", "REST APIs", "Technical SEO", "Shopify", "CMS Management", "Performance Tuning", "Vercel/AWS"].map(s => (
                        <span key={s} className="skill-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {activeSkillTab === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6">/ Design_Dev_AI</div>
                      <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">AI & Workflow Automation</h3>
                      <p className="text-gray-400 leading-relaxed max-w-md mb-8">
                        Integrating artificial intelligence and automation into creative workflows to increase efficiency and unlock new creative possibilities.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 content-start">
                      {["AI-Assisted Dev", "Workflow Automation", "Prompt Engineering"].map(s => (
                        <span key={s} className="skill-tag border-emerald-400/50 bg-white/10 text-white font-bold">{s}</span>
                      ))}
                      {["Claude Code", "Antigravity", "Make.com", "n8n", "Zapier", "AI UI Generation", "Low-code Solutions", "Automated Testing", "AI Integration", "Vibe Coding"].map(s => (
                        <span key={s} className="skill-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Education, Experience, Certificates */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        {/* Education — full width */}
        <RevealOnScroll direction="left">
          <div className="bento-card p-8 md:p-14 mb-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-violet-500/10 transition-colors" />
            <div className="font-mono text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: 'var(--emerald, #10b981)' }}>
              / Edu_Entry
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-xl md:text-3xl font-bold mb-4 leading-tight" style={{ color: 'var(--text-main)' }}>
                  Bachelor's <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.8em', marginLeft: '10px', opacity: 0.7 }}>| 2023 – 2025</span>
                </h2>
                <p className="text-base leading-relaxed mb-1" style={{ color: 'var(--text-muted)' }}>
                  Haaga-Helia University of Applied Sciences
                </p>
                <p className="font-semibold mb-1 text-accent">Business Information Technology</p>
                <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}><span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Major:</span> Design Services</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}><span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Thesis:</span> The Future of No-code Web Development: Evaluating the Potential and Limitations of Webflow</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-main)' }}>Key Areas of Study</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                  {[
                    "Digital User Experience",
                    "Website Design & Development",
                    "Digital Service Design",
                    "Innovation & Prototyping",
                    "React Fundamentals",
                    "Cloud Technologies (AWS)",
                    "Data Management & Databases",
                    "Applied AI",
                    "ICT Project Management",
                    "Linux Basics",
                  ].map((a) => (
                    <li key={a} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--emerald, #10b981)', flexShrink: 0, display: 'inline-block' }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Certs + Exp side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Accordion */}
          <RevealOnScroll delay={0.1} direction="left">
            <div className="bento-card p-6 md:p-10">
              <div className="font-mono text-[10px] uppercase tracking-widest mb-5 text-violet-500">
                / Work_Experience
              </div>
              {experiences.map((exp, idx) => (
                <AccordionItem
                  key={exp.id}
                  id={exp.id}
                  openId={openExp}
                  setOpenId={setOpenExp}
                  label={exp.label}
                  title={exp.title}
                  subtitle={exp.period}
                  isFirst={idx === 0}
                  isLast={idx === experiences.length - 1}
                >
                  <div className="space-y-2.5">
                    {exp.bullets.map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: '#a78bfa', flexShrink: 0, display: 'inline-block' }} />
                        <p style={{ fontSize: '0.82rem', lineHeight: 1.65, color: 'var(--text-muted)', margin: 0 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </div>
          </RevealOnScroll>

          {/* Certificates Accordion */}
          <RevealOnScroll delay={0.1} direction="right">
            <div className="bento-card p-6 md:p-10">
              <div className="font-mono text-[10px] uppercase tracking-widest mb-5 text-violet-500">
                / Certifications
              </div>
              {certificates.map((cert, idx) => (
                <AccordionItem
                  key={cert.id}
                  id={cert.id}
                  openId={openCert}
                  setOpenId={setOpenCert}
                  label={cert.label}
                  title={cert.title}
                  subtitle={cert.date}
                  isFirst={idx === 0}
                  isLast={idx === certificates.length - 1}
                >
                  <ul
                    className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs mb-4"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {cert.skills.map((s) => (
                      <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--emerald, #10b981)', flexShrink: 0, display: 'inline-block' }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <img
                    src={cert.img}
                    className="rounded-xl w-full"
                    alt={`${cert.title} Certificate for Sahed Alom Sumit`}
                    loading="lazy"
                    style={{ maxHeight: 'none', objectFit: 'contain', background: 'rgba(0,0,0,0.2)', padding: '4px' }}
                  />
                </AccordionItem>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section id="work" className="py-24 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
            <div>
              <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tighter text-white uppercase">
                Main_Builds
              </h2>
              <p className="text-gray-400 mt-3 text-lg italic">
                Curated high-performance web solutions.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="px-8 py-3 bento-card text-[10px] font-mono font-bold hover:bg-white hover:text-black transition uppercase tracking-widest"
            >
              Explore_Portfolio
            </Link>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {loading ? (
            <div className="md:col-span-2 text-center font-mono text-emerald-500 uppercase tracking-widest text-xs flex items-center justify-center gap-2 py-10">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              Fetching_Featured_Builds...
            </div>
          ) : (
            featured.map((p, i) => (
              <RevealOnScroll key={p.id || p.slug} delay={i * 0.1}>
                <ProjectCard project={p} />
              </RevealOnScroll>
            ))
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 border-y" style={{ backgroundColor: 'var(--topbar-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl px-4 mx-auto">
          <RevealOnScroll>
            <h2 className="text-2xl sm:text-6xl font-bold text-center mb-20 uppercase tracking-[0.2em]" style={{ color: 'var(--text-main)' }}>
              Validation_Logs
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <RevealOnScroll key={i} delay={i * 0.12}>
                <div className="bento-card p-8 flex flex-col justify-between hover:bg-white/[0.03] h-full">
                  <p className="text-gray-400 italic text-lg leading-relaxed mb-10">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${t.color} rounded-2xl flex items-center justify-center text-sm font-black shadow-lg ${t.shadow}`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-white font-bold">{t.name}</p>
                      <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          {/* Review screenshots carousel */}
          <RevealOnScroll delay={0.15}>
            <div className="relative bento-card p-8 mt-8">
              <Carousel>
                {reviewSlides.map((pair, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
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
          </RevealOnScroll>
        </div>
      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  );
}
