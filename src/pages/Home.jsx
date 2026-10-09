import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import RevealOnScroll from "../components/RevealOnScroll";
import Carousel from "../components/Carousel";
import ProjectCard from "../components/ProjectCard";
import ContactSection from "../components/ContactSection";
import { useSEO } from "../hooks/useSEO";
import { fetchFeaturedProjects } from "../lib/supabase";

gsap.registerPlugin(TextPlugin);

/* ─── Modern Accordion Item ─────────────────────────────────────────────────── */
function AccordionItem({ id, openId, setOpenId, num, title, subtitle, badge, children, isFirst, isLast }) {
  const bodyRef = useRef(null);
  const isOpen = openId === id;

  const toggle = useCallback(() => {
    setOpenId(prev => (prev === id ? null : id));
  }, [id, setOpenId]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.set(el, { display: 'block' });
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => gsap.set(el, { display: 'none' }),
      });
    }
  }, [isOpen]);

  return (
    <div
      onClick={toggle}
      className={`accordion-item transition-all duration-300 py-4 ${
        !isLast ? 'border-b' : ''
      }`}
      style={{
        borderColor: isOpen ? 'rgba(113, 201, 206, 0.3)' : 'var(--border)',
        cursor: 'pointer',
      }}
    >
      <div className="flex items-start justify-between gap-4 select-none">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            {num && (
              <span className="font-mono text-[10px] text-violet-400 font-semibold">
                {num}
              </span>
            )}
            {badge && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {badge}
              </span>
            )}
          </div>
          <h4 className="text-base font-bold text-white transition-colors" style={{ color: isOpen ? 'var(--accent-light)' : 'var(--text-main)' }}>
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'border-violet-500 bg-violet-500/20 text-violet-300 rotate-180' : 'text-gray-400'
          }`}
          style={{ borderColor: isOpen ? 'var(--accent)' : 'var(--border)' }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div ref={bodyRef} style={{ display: isFirst ? 'block' : 'none', overflow: 'hidden' }}>
        <div className="pt-3">
          {children}
        </div>
      </div>
    </div>
  );
}

const certificates = [
  {
    id: 1,
    title: "Google UX Design",
    date: "Dec 2024 · Coursera",
    badge: "Coursera / Google",
    skills: [
      "UX Research",
      "Wireframing & Prototyping",
      "Design Systems",
      "High-Fidelity UI",
      "Usability Testing",
      "Accessibility (WCAG)",
    ],
    img: "/img/certificates/Google-UX-Design-Coursera-1SHUXJFXGATW.png",
  },
  {
    id: 2,
    title: "Master HTML & CSS",
    date: "Aug 2024 · Udemy",
    badge: "Udemy Certified",
    skills: [
      "HTML5 Semantics",
      "CSS3 Architecture",
      "Responsive Layouts",
      "Flexbox & CSS Grid",
      "Micro-Animations",
    ],
    img: "/img/certificates/master-html-and-css-by-building-real-world-projetcs-certificate-udemy-sahedalomsumit.png",
  },
  {
    id: 3,
    title: "Design Sprint Days",
    date: "May 2024 · Alma Talent Oy",
    badge: "Industry Workshop",
    skills: ["Understand", "Ideate", "Decide", "Prototype", "User Testing"],
    img: "/img/certificates/design-sprint-days-alma-talent-oy-sahedalomsumit.png",
  },
  {
    id: 4,
    title: "Responsive Web Design",
    date: "Dec 2023 · FreeCodeCamp",
    badge: "freeCodeCamp",
    skills: [
      "Mobile-First Design",
      "CSS Variables & Grid",
      "Accessible Colors",
      "Media Queries",
    ],
    img: "/img/certificates/responsive-web-design-freecodecamp-sahedalomsumit.png",
  },
  {
    id: 5,
    title: "Web Design & Development",
    date: "Mar 2021 · LEDP",
    badge: "Full-Stack Foundation",
    skills: [
      "HTML/CSS/JS",
      "PHP & MySQL",
      "WordPress Core",
      "Figma UI",
    ],
    img: "/img/certificates/web-design-and-development-ledp-sahedalomsumit.png",
  },
  {
    id: 6,
    title: "Webflow Expert Certification",
    date: "Mar 2021 · Webflow",
    badge: "Webflow Certified",
    skills: [
      "Webflow Architecture",
      "Custom CMS Builds",
      "GSAP & 3D Spline",
      "Interaction Design",
    ],
    img: "/img/certificates/webflow-101-sahedalomsumit.png",
  },
];

const experiences = [
  {
    id: 1,
    title: "Product Designer & AI-Enhanced Web Developer",
    period: "Mar 2021 – Present · Upwork (Freelance · Remote)",
    badge: "Top Rated Plus (99% JSS)",
    bullets: [
      "Top Rated Plus talent maintaining a 99% Job Success Score across 10+ global projects, crafting bespoke Figma designs and translating them into pixel-perfect Webflow, WordPress, Framer, and Kajabi websites.",
      "Provides full-cycle services from user research to frontend implementation (HTML/CSS/JS), ensuring optimal performance, Core Web Vitals, and technical SEO.",
      "Consistently rated 5/5 stars for technical expertise, complex CMS integrations, and smooth cinematic animations.",
    ],
  },
  {
    id: 2,
    title: "Product Designer & AI-Enhanced Web Developer",
    period: "May 2020 – Present · Fiverr (Freelance · Remote)",
    badge: "Level 2 Seller (5.0★)",
    bullets: [
      "Completed 50+ projects independently for clients across 10+ countries worldwide with consistent 5-star ratings and a 40% repeat client rate.",
      "Designed and developed high-performing websites in WordPress and Webflow, integrating advanced features and seamless UI/UX with Figma and Framer.",
      "Long-standing Level 2 Seller showcasing reliability and technical mastery in delivering exceptional digital solutions.",
    ],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    period: "Mar 2024 – Feb 2025 · Vesko (Part-time · Joensuu, Finland)",
    badge: "Multi-Platform Product",
    bullets: [
      "Collaborated within a dedicated design team on Vesko’s product design across mobile app, desktop webshop, and tablet interface experiences.",
      "Designed and developed the Vesko website platform, serving both as high-converting landing pages and a comprehensive multi-page site.",
      "Created seamless, user-friendly experiences across all platforms ensuring both functional precision and visual appeal.",
    ],
  },
  {
    id: 4,
    title: "Low-Code Web Designer & Developer",
    period: "Feb 2022 – Jan 2024 · Artic Maze (Full-time · Remote)",
    badge: "Full-Cycle Delivery",
    bullets: [
      "Designed and developed website projects from start to finish using WordPress and Webflow to build custom sites that exceeded client expectations.",
      "Built and customized WordPress websites using Elementor, WooCommerce, Crocoblock, and essential plugins to enhance functionality and user experience.",
      "Implemented advanced Webflow features like animations, CMS, and 3D Spline, optimizing performance for speed and functionality.",
    ],
  },
  {
    id: 5,
    title: "No-code Web Designer & Developer",
    period: "Mar 2023 – Nov 2023 · Sixforces (Freelance · Quebec, Canada)",
    badge: "40+ Webflow Builds",
    bullets: [
      "Completed over 40 projects turning designs and older websites into clean, modern Webflow sites with engaging smooth animations.",
      "Worked closely with clients on features, integrations, and deployment to ensure everything ran smoothly.",
      "Optimized loading speed, responsiveness, and overall user experience while joining weekly meetings to keep communication clear and steady.",
    ],
  },
];

const testimonials = [
  {
    initials: "RK",
    name: "Rahil Khan",
    role: "Founder @ Artic Maze",
    quote:
      "Sahed is an exceptional talent across Webflow, WordPress, and visual design. We collaborated on multiple high-stakes client projects and he consistently delivered beyond expectations with unmatched speed and precision.",
    rating: 5,
    color: "from-violet-600 to-indigo-600",
  },
  {
    initials: "FO",
    name: "Filippo O.",
    role: "Co-founder & President @ Metodo Ongaro",
    quote:
      "Sahed has proven to be extraordinarily fast, reliable, capable, and dedicated. He solves complex technical problems with effortless design clarity. We have found in him an invaluable digital partner.",
    rating: 5,
    color: "from-emerald-600 to-teal-600",
  },
];

const reviewImages = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 21,
].map(num => `/img/testimonials/fiverr-review-sahedalomsumit-${num}.webp`);

const reviewSlides = [];
for (let i = 0; i < reviewImages.length; i += 2) {
  reviewSlides.push(reviewImages.slice(i, i + 2));
}

// Tech Stack Ribbon Items
const techStackRibbon = [
  { name: "Webflow", category: "No-Code" },
  { name: "React 18", category: "Frontend" },
  { name: "Next.js", category: "Full-Stack" },
  { name: "Figma", category: "UI/UX" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Supabase", category: "Backend" },
  { name: "GSAP Motion", category: "Animation" },
  { name: "WordPress", category: "CMS" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Shopify", category: "E-Commerce" },
  { name: "Claude & AI", category: "Workflows" },
];

export default function Home() {
  const typewriterRef = useRef(null);
  const heroRef = useRef(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCert, setOpenCert] = useState(null);
  const [openExp, setOpenExp] = useState(1);
  const [activeSkillTab, setActiveSkillTab] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useSEO({
    title: "Sahed Alom Sumit | Product Designer & AI-Enhanced Web Developer",
    description:
      "Sahed Alom Sumit is a Product Designer & AI-Enhanced Web Developer based in Helsinki, Finland. Crafting digital products that feel effortless, load at lightspeed, and convert.",
    canonical: "/",
  });

  useEffect(() => {
    let isMounted = true;
    let timerId = null;

    async function loadFeatured() {
      try {
        const data = await fetchFeaturedProjects();
        if (isMounted && data && data.length > 0) {
          setFeatured(data);
        }
      } catch (err) {
        console.error("Error loading featured projects:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadFeatured();

    // Hero GSAP Reveal
    gsap.set(".hero-el", { opacity: 0, y: 25 });
    gsap.to(".hero-el", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
    });

    // Dynamic typewriter subtitle
    const words = [
      "Product Designer",
      "AI-Enhanced Web Developer",
      "Design. Code. Deploy"
    ];
    let wordIdx = 0;
    const typeNext = () => {
      if (!isMounted || !typewriterRef.current) return;
      gsap.to(typewriterRef.current, {
        duration: 1.2,
        text: words[wordIdx],
        ease: "none",
        onComplete: () => {
          if (!isMounted) return;
          timerId = setTimeout(() => {
            wordIdx = (wordIdx + 1) % words.length;
            typeNext();
          }, 2200);
        },
      });
    };
    typeNext();

    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("sahedalomsumit@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      {/* ── 1. Hero Section ── */}
      <section
        id="hero"
        ref={heroRef}
        className="home-hero min-h-[92vh] flex flex-col justify-center relative px-4 sm:px-8 pt-8 pb-24 max-w-7xl mx-auto"
      >
        <div className="home-hero-content space-y-6">
          <div className="hero-el">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 border transition-all duration-300"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full opacity-75"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <span
                  className="relative inline-flex h-2 w-2"
                  style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
                />
              </span>
              <span className="text-[11px] font-medium tracking-wide" style={{ color: 'var(--text-main)' }}>
                Based in Helsinki, Finland
              </span>
            </div>
          </div>

          <h1 className="home-hero-title hero-el">
            <span>Sahed Alom</span>
            <span className="home-hero-accent">Sumit<span>.</span></span>
          </h1>

          <div className="home-hero-role hero-el">
            <span ref={typewriterRef} />
            <span className="home-hero-caret" aria-hidden="true" />
          </div>

          <p className="home-hero-intro hero-el">
            You bring the idea. I turn it into a digital product that works.
          </p>

          <div className="home-hero-actions hero-el">
            <Link
              to="/work"
              className="home-hero-button home-hero-button-primary"
            >
              <span>Explore Selected Work</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link
              to="/estimate"
              className="home-hero-button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="16" y1="14" x2="16" y2="18" />
                <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
              </svg>
              <span>Project Estimator</span>
            </Link>
          </div>

          <div className="home-hero-metrics hero-el">
            {[
              { number: "150+", label: "Websites Delivered", sub: "Global Clients" },
              { number: "99%", label: "Job Success Score", sub: "Top Rated Plus" },
              { number: "5+ Yrs", label: "Crafting Experience", sub: "Product Design & Dev" },
              { number: "40%", label: "Repeat Client Rate", sub: "Long-Term Trust" },
            ].map((stat, i) => (
              <div key={i} className="home-hero-metric">
                <div className="home-hero-metric-number">{stat.number}</div>
                <div className="home-hero-metric-label">{stat.label}</div>
                <div className="home-hero-metric-sub">{stat.sub}</div>
              </div>
            ))}
          </div>
          <div
            className="home-hero-ribbon border-y overflow-hidden py-4"
            style={{
              backgroundColor: 'var(--topbar-bg)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="home-hero-ribbon-inner">
              <div className="flex gap-8 whitespace-nowrap animate-marquee">
                {[...techStackRibbon, ...techStackRibbon].map((item, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2.5 text-xs font-mono font-medium tracking-wider uppercase opacity-75 hover:opacity-100 transition-opacity">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span style={{ color: 'var(--text-main)' }}>{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10" style={{ color: 'var(--text-dim)' }}>
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Cinema-Grade Video Showcase ── */}
      <section id="intro-video" className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
        <RevealOnScroll direction="up">
          <div className="bento-card p-6 md:p-10 relative overflow-hidden">
            {/* Ambient Background Aura */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 blur-[100px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                  Inside The Studio
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight uppercase leading-[0.95]"
                    style={{ color: 'var(--text-main)' }}>
                  Designing The <br />
                  <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    Digital Future
                  </span>
                </h2>

                <p className="text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                  Experience the journey behind every pixel. This story captures my evolution from a curious engineer into a world-class product designer and AI-enhanced web developer who obsesses over aesthetic perfection and business impact.
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <div className="h-10 w-10 rounded-full border flex items-center justify-center bg-violet-600/20 border-violet-500/40 text-violet-300">
                    <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Sahed Alom Sumit</p>
                    <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>Founder & Lead Designer · 2 Min Watch</p>
                  </div>
                </div>
              </div>

              {/* Video Player Card */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border shadow-2xl group/video"
                     style={{
                       borderColor: 'var(--border)',
                       backgroundColor: '#000000',
                     }}>
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full"
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
          </div>
        </RevealOnScroll>
      </section>

      {/* ── 4. Ecosystem & Biography Bento ── */}
      <section id="bio" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Narrative Card */}
          <RevealOnScroll className="lg:col-span-8" direction="left">
            <div className="bento-card p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
                    About My Craft
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-8 leading-snug"
                    style={{ color: 'var(--text-main)' }}>
                  You bring the idea. I turn it into a digital product that works.
                </h2>

                <div className="space-y-5 text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                  <p>
                    With 5+ years of experience, I’ve worked with founders, brands, and agencies worldwide, turning rough ideas into 150+ digital products that are fast, user-friendly, visually polished, and built to support real business goals.
                  </p>
                  <p>
                    I work across design and development—from UI/UX design in Figma and low-code development with Webflow, WordPress, and Kajabi to custom development with React and Supabase. I also use AI-powered tools such as Cursor, Codex, and Antigravity to streamline development, automate repetitive work, and build more efficiently.
                  </p>
                  <p>
                    My background in Business Information Technology also gives me a strong understanding of the business side of digital products. I don’t just focus on how something looks or works—I think about the problem it solves, the users it serves, and the outcome it needs to achieve.
                  </p>
                </div>
              </div>

              {/* Credentials Highlight */}
              <div className="mt-10 pt-8 border-t grid grid-cols-1 sm:grid-cols-3 gap-6"
                   style={{ borderColor: 'var(--border)' }}>
                <div>
                  <p className="text-xs font-mono uppercase text-violet-400 font-semibold mb-1">Education</p>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>B.B.A. Business IT</p>
                  <p className="text-xs" style={{ color: 'var(--text-dim)' }}>Haaga-Helia · GPA 3.57</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-emerald-400 font-semibold mb-1">Specialty</p>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Webflow & React</p>
                  <p className="text-xs" style={{ color: 'var(--text-dim)' }}>Digital Services & UI</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-amber-400 font-semibold mb-1">Location</p>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Helsinki, Finland</p>
                  <p className="text-xs" style={{ color: 'var(--text-dim)' }}>Europe / EEST Time</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Quick Connect Command Card */}
          <RevealOnScroll className="lg:col-span-4" delay={0.15} direction="right">
            <div className="bento-card p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="pill-badge text-violet-400 border-violet-500/20 bg-violet-500/10">
                    Live Node
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Email with copy button */}
                  <div className="p-3.5 rounded-xl border transition-colors group"
                       style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-dim)' }}>
                        Direct Email
                      </span>
                      <button
                        onClick={copyEmail}
                        className="text-[10px] font-mono text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        {copiedEmail ? 'Copied! ✓' : 'Copy'}
                      </button>
                    </div>
                    <a
                      href="mailto:sahedalomsumit@gmail.com"
                      className="text-sm font-semibold truncate block hover:text-violet-400 transition-colors"
                      style={{ color: 'var(--text-main)' }}
                    >
                      sahedalomsumit@gmail.com
                    </a>
                  </div>

                  {/* WhatsApp */}
                  <div className="p-3.5 rounded-xl border transition-colors group"
                       style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                    <span className="text-[10px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-dim)' }}>
                      Instant Messaging
                    </span>
                    <a
                      href="https://wa.me/+358415765539"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-emerald-400 hover:underline flex items-center justify-between"
                    >
                      <span>+358 41 576 5539</span>
                      <span className="text-xs">Chat →</span>
                    </a>
                  </div>

                  {/* Social Network Links */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: 'var(--text-dim)' }}>
                      Verified Profiles
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="https://linkedin.com/in/sahedalomsumit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border text-xs font-semibold text-center hover:border-violet-500 transition-colors"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }}
                      >
                        LinkedIn ↗
                      </a>
                      <a
                        href="https://github.com/sahedalomsumit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border text-xs font-semibold text-center hover:border-violet-500 transition-colors"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }}
                      >
                        GitHub ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Call Prompt */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <Link
                  to="/estimate"
                  className="project-blueprint-button w-full py-3 text-center font-semibold text-xs tracking-wider uppercase block transition-all"
                >
                  Generate Project Blueprint
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── 5. Interactive Skills & Capabilities Matrix ── */}
      <section id="skills" className="py-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="pill-badge text-violet-400 border-violet-500/20 bg-violet-500/10 mb-3">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight uppercase"
                  style={{ color: 'var(--text-main)' }}>
                Skills & Tech Stack
              </h2>
            </div>
            <p className="text-sm font-mono text-emerald-400">
              40+ VERIFIED MODULES & FRAMEWORKS
            </p>
          </div>
        </RevealOnScroll>

        {/* Tab Buttons */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mb-6 pb-2">
          {[
            { label: 'UI/UX & Product Design', id: 0, count: '13', icon: '🎨' },
            { label: 'Frontend & Architecture', id: 1, count: '16', icon: '⚡' },
            { label: 'AI & Workflow Automation', id: 2, count: '13', icon: '🤖' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSkillTab(tab.id)}
              aria-pressed={activeSkillTab === tab.id}
              className="site-tab-control skill-category-tab px-5 py-3 text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-3 border whitespace-nowrap"
              style={{
                backgroundColor: activeSkillTab === tab.id ? 'var(--accent)' : 'var(--card-bg)',
                borderColor: activeSkillTab === tab.id ? 'var(--accent)' : 'var(--border)',
                color: activeSkillTab === tab.id ? 'var(--hire-btn-text)' : 'var(--text-muted)',
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className="px-2 py-0.5 text-[10px] font-mono"
                style={{
                  backgroundColor: activeSkillTab === tab.id ? 'rgba(7, 23, 25, 0.12)' : 'var(--bg-secondary)',
                  color: activeSkillTab === tab.id ? 'var(--hire-btn-text)' : 'var(--text-dim)',
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Active Tab Panel */}
        <RevealOnScroll key={activeSkillTab}>
          <div className="bento-card p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-violet-400">
                  {activeSkillTab === 0 ? "01. Visual Excellence" : activeSkillTab === 1 ? "02. Technical Precision" : "03. Modern Velocity"}
                </span>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
                  {activeSkillTab === 0 && "Human-Centered Design Systems"}
                  {activeSkillTab === 1 && "High-Performance Web Engineering"}
                  {activeSkillTab === 2 && "Automated Workflows & AI Tooling"}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {activeSkillTab === 0 && "Rooted in user psychology, accessible contrast (WCAG), and responsive typography. Every component is designed to elevate the brand and delight the visitor."}
                  {activeSkillTab === 1 && "Clean, maintainable, lightning-fast code built with modern frameworks and headless architectures. Zero bloat, optimal SEO, and smooth GSAP micro-interactions."}
                  {activeSkillTab === 2 && "Leveraging cutting-edge AI integrations, Antigravity, and autonomous workflow pipelines to ship production-ready applications in record time."}
                </p>
              </div>

              {/* Skills Tags Grid */}
              <div className="lg:col-span-8 flex flex-wrap gap-2.5">
                {activeSkillTab === 0 && (
                  <>
                    {["UI/UX Design", "Figma Design Systems", "High-Fidelity Prototyping", "User Journey Mapping"].map(s => (
                      <span key={s} className="skill-tag border-violet-400/50 bg-violet-500/10 text-violet-300 font-semibold">
                        ★ {s}
                      </span>
                    ))}
                    {["User Research", "Wireframing", "WCAG 2.1 Accessibility", "Design Tokens", "Typography Hierarchy", "Visual Branding", "Spline 3D Integration", "Interaction Design", "Adobe Creative Cloud"].map(s => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                  </>
                )}

                {activeSkillTab === 1 && (
                  <>
                    {["Webflow CMS", "React 18", "Next.js", "WordPress / WooCommerce"].map(s => (
                      <span key={s} className="skill-tag border-violet-400/50 bg-violet-500/10 text-violet-300 font-semibold">
                        ★ {s}
                      </span>
                    ))}
                    {["JavaScript (ES6+)", "Tailwind CSS", "Supabase & PostgreSQL", "Node.js", "GSAP & ScrollTrigger", "HTML5 & Modern CSS", "RESTful APIs", "Technical SEO", "Shopify Theme Dev", "Vercel Deployment", "Git & GitHub", "Performance Tuning"].map(s => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                  </>
                )}

                {activeSkillTab === 2 && (
                  <>
                    {["AI-Assisted Engineering", "Workflow Automation", "Autonomous Agents"].map(s => (
                      <span key={s} className="skill-tag border-emerald-400/50 bg-emerald-500/10 text-emerald-300 font-semibold">
                        ★ {s}
                      </span>
                    ))}
                    {["Claude Code", "Google Antigravity SDK", "Make.com & Zapier", "n8n Pipelines", "Prompt Engineering", "Vibe Coding", "Automated QA", "AI Content Strategy", "API Integrations", "Low-Code Speed"].map(s => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── 6. Experience & Education Section ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        {/* University Degree */}
        <RevealOnScroll className="mb-8" direction="left">
          <div className="bento-card p-8 md:p-12 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
                Academic Foundation
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                  Bachelor of Business Administration (BBA)
                </h3>
                <p className="text-sm font-semibold text-violet-400 mb-2">
                  Haaga-Helia University of Applied Sciences · Helsinki, Finland (Jan 2023 – May 2025)
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    Major: Digital Services
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Grade: 75.7%
                  </span>
                </div>
                <div className="p-4 rounded-xl border bg-black/10" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-xs font-mono uppercase text-emerald-400 font-bold mb-1">Bachelor Thesis</p>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-main)' }}>
                    "The Future of No-code Web Development: Evaluating the Potential and Limitations of Webflow"
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">
                  Relevant Coursework & Competencies
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {[
                    "Digital User Experience & Service Design",
                    "Website Design & Development",
                    "React.JS Fundamentals & Software Dev",
                    "Innovation, Prototyping & Design Sprints",
                    "Basic & Applied AI / ChatGPT Workflows",
                    "Cloud Service Technologies (AWS)",
                    "Data Management & SQL Databases",
                    "ICT Project Management & Agile",
                    "Basic 3D Design with Blender & 3D Printing",
                    "Data Analytics for Business",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Experience & Certifications Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Work Experience Accordion */}
          <RevealOnScroll delay={0.1} direction="left">
            <div className="bento-card p-6 md:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-bold uppercase tracking-tight" style={{ color: 'var(--text-main)' }}>
                  Work Experience
                </h3>
                <span className="text-xs font-mono text-violet-400">5+ YEARS PRO</span>
              </div>

              {experiences.map((exp, idx) => (
                <AccordionItem
                  key={exp.id}
                  id={exp.id}
                  openId={openExp}
                  setOpenId={setOpenExp}
                  num={`0${idx + 1}`}
                  title={exp.title}
                  subtitle={exp.period}
                  badge={exp.badge}
                  isFirst={idx === 0}
                  isLast={idx === experiences.length - 1}
                >
                  <ul className="space-y-2 pt-2 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </div>
          </RevealOnScroll>

          {/* Certifications Accordion */}
          <RevealOnScroll delay={0.15} direction="right">
            <div className="bento-card p-6 md:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-bold uppercase tracking-tight" style={{ color: 'var(--text-main)' }}>
                  Certifications
                </h3>
                <span className="text-xs font-mono text-emerald-400">VERIFIED CREDENTIALS</span>
              </div>

              {certificates.map((cert, idx) => (
                <AccordionItem
                  key={cert.id}
                  id={cert.id}
                  openId={openCert}
                  setOpenId={setOpenCert}
                  num={`0${idx + 1}`}
                  title={cert.title}
                  subtitle={cert.date}
                  badge={cert.badge}
                  isFirst={idx === 0}
                  isLast={idx === certificates.length - 1}
                >
                  <div className="pt-2 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10" style={{ color: 'var(--text-muted)' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    {cert.img && (
                      <div className="rounded-xl overflow-hidden border p-1 bg-black/20" style={{ borderColor: 'var(--border)' }}>
                        <img
                          src={cert.img}
                          alt={`${cert.title} Verified Certificate`}
                          className="w-full h-auto rounded-lg"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </AccordionItem>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── 7. Featured Work Showcase ── */}
      <section id="work" className="py-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-3">
                Selected Works
              </span>
              <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight uppercase"
                  style={{ color: 'var(--text-main)' }}>
                Featured Projects
              </h2>
              <p className="mt-2 text-base max-w-xl font-light" style={{ color: 'var(--text-muted)' }}>
                Hand-picked case studies showcasing custom Webflow builds, interactive React web applications, and high-converting design systems.
              </p>
            </div>

            <Link
              to="/work"
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase border hover:border-violet-500 transition-all flex items-center gap-2 group"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border)',
                color: 'var(--text-main)',
              }}
            >
              <span>View All 23+ Projects</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {loading ? (
            <div className="md:col-span-2 text-center py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              <p className="font-mono text-xs text-violet-400 uppercase tracking-widest">
                Loading Featured Case Studies...
              </p>
            </div>
          ) : (
            featured.map((p, i) => (
              <RevealOnScroll key={p.id || p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </RevealOnScroll>
            ))
          )}
        </div>
      </section>

      {/* ── 8. Client Testimonials & Social Proof ── */}
      <section className="py-24 border-y" style={{ backgroundColor: 'var(--topbar-bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl px-4 mx-auto">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="pill-badge text-violet-400 border-violet-500/20 bg-violet-500/10 mb-3">
                Client Testimonials
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight uppercase"
                  style={{ color: 'var(--text-main)' }}>
                Trusted By Founders & Teams
              </h2>
              <p className="mt-3 text-base font-light" style={{ color: 'var(--text-muted)' }}>
                Real feedback from clients and agency partners who experienced the transformational speed and quality of our work.
              </p>
            </div>
          </RevealOnScroll>

          {/* Founder Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((t, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="bento-card p-8 md:p-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Star Rating */}
                    <div className="flex gap-1 text-amber-400 mb-6">
                      {[...Array(5)].map((_, s) => (
                        <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-base sm:text-lg italic leading-relaxed mb-8" style={{ color: 'var(--text-main)' }}>
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-black text-white shadow-lg`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>{t.name}</p>
                      <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* 5-Star Reviews Screenshot Carousel */}
          <RevealOnScroll delay={0.15}>
            <div className="bento-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-base font-bold" style={{ color: 'var(--text-main)' }}>
                    Verified Fiverr & Upwork Reviews
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
                    50+ 5-Star Deliveries across the globe
                  </p>
                </div>
                <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
                  5.0 ★ Top Rated
                </span>
              </div>

              <Carousel>
                {reviewSlides.map((pair, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pair.map((imgSrc) => (
                      <div key={imgSrc} className="rounded-xl overflow-hidden border bg-black/10" style={{ borderColor: 'var(--border)' }}>
                        <img
                          src={imgSrc}
                          alt="5-star client review screenshot for Sahed Alom Sumit"
                          className="w-full h-auto object-cover scale-[1.04] transition-[filter,transform] duration-500 hover:scale-[1.06] hover:brightness-110"
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

      {/* ── 9. Interactive Contact Section ── */}
      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  );
}
