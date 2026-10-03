# Sahed Alom Sumit | Portfolio & Digital Engineering Platform

[![Website](https://img.shields.io/badge/Live_Site-sahedalomsumit.com-00F5A0?style=for-the-badge&logo=googlechrome&logoColor=black)](https://sahedalomsumit.com)
[![Version](https://img.shields.io/badge/Version-v3.5.0-8B5CF6?style=for-the-badge)](https://sahedalomsumit.com)
[![Status](https://img.shields.io/badge/Status-Available_for_Projects-10B981?style=for-the-badge)](https://sahedalomsumit.com)

A high-performance cyber-minimalist portfolio, digital service hub, and publishing platform engineered by **Sahed Alom Sumit** — Product Designer & AI-Enhanced Web Developer based in **Helsinki, Finland**.

Built with a focus on tactile aesthetics, micro-interactions, headless content architectures, dynamic cost estimation, and intelligent workflows.

---

## ⚡ Overview & Core Identity

- **Designer & Developer:** Sahed Alom Sumit
- **Location:** Helsinki, Finland (Live Local Clock & Availability Integration)
- **Specializations:** UI/UX Design, Full-Stack Web Development, Low/No-Code (Webflow, Framer, WordPress, Kajabi), Headless CMS Architecture, and AI Automations.
- **Philosophy:** Vibe web design paired with clean, purposeful code. Products crafted at the intersection of business strategy, visual depth, and sub-second performance.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies & Libraries |
| :--- | :--- |
| **Frontend Framework** | **React 18**, **Vite 6**, **React Router DOM v6** |
| **Styling & Design System** | **Tailwind CSS v3**, Custom Design Tokens, Bento Grids, Glassmorphism, CSS Variables |
| **Animation & Motion** | **GSAP (GreenSock)**, **ScrollTrigger**, **Framer Motion**, Staggered Timelines |
| **Headless CMS** | **Sanity Studio v3** (`sanity`, `@sanity/client`, `@portabletext/react`, `@sanity/image-url`) |
| **Database & Backend** | **Supabase** (PostgreSQL, REST API, Database Functions, Storage) |
| **Document Generation** | **jsPDF**, **html2canvas** (Client-side interactive PDF proposal & estimate generation) |
| **SEO & Edge Automation** | Automated OpenGraph / Twitter Cards Generator, Dynamic XML Sitemap Generator, Netlify Edge Functions |
| **Icons & Typography** | **Lucide React**, JetBrains Mono, Inter |

---

## 🗺️ Site Architecture & Pages

The platform features comprehensive multi-route navigation, dedicated service landing tracks, an interactive proposal estimator, and an embedded headless CMS:

### 1. Primary Pages

- **`/` — Home:** Hero showcase featuring live Helsinki time, real-time availability status, animated headline sequences, cyber-minimalist Bento grid, featured case studies, service previews, client testimonials, FAQ snapshot, and interactive contact console.
- **`/work` — Work / Portfolio:** Filterable project catalog categorized by discipline (UI/UX Design, Full-Stack Development, Low/No-Code, Custom Web Apps) with live links, tags, and metrics.
- **`/work/:slug` — Project Detail:** In-depth case study presentations detailing project background, challenges, bespoke solutions, technologies used, visual galleries, and next/previous project navigation.
- **`/services` — Services Directory:** Strategic overview of multidisciplinary services across product design, engineering, and platform specialization.
- **`/process` — Design & Development Process:** Comprehensive 16-step methodology featuring:
  - **8-Stage Design Blueprint:** Strategic framing, UX research, asset curation, scalable design system, wireframing, high-fidelity visual design, interactive prototyping, and developer handoff.
  - **8-Stage Development Lifecycle:** Style guide tokens, modular architecture, component engineering, responsive code translation, dynamic backend/CMS integrations, GSAP micro-interactions, Core Web Vitals optimization, and production deployment.
- **`/estimate` — Interactive Project Cost Estimator:** Real-time scope calculator based on project requirements, pages, and deliverables with instant quote calculations and client-side downloadable PDF proposals.
- **`/blog` — Engineering Insights & Articles:** Publishing hub with search query filtering, dynamic category tags, reading time calculations, view counters, and article previews.
- **`/blog/:slug` — Article Detail:** Full-length editorial reading experience powered by Sanity CMS, rich PortableText formatting, custom code syntax highlighting, author spotlight, and social share links.
- **`/sanity` — Embedded Sanity Studio:** Full in-app headless CMS dashboard for drafting, organizing, and publishing articles, assets, and categories directly within the application.
- **`/faq` — Dynamic Knowledge Base:** Comprehensive categorized repository of frequently asked questions with instant search and sticky mobile navigation.

---

### 2. Dedicated Service Tracks

- **`/services/ui-ux-design` — UI/UX Design:** User journeys, information architecture, wireframing, Figma design systems, WCAG accessible components, and high-fidelity clickable prototypes.
- **`/services/full-stack-development` — Full-Stack Development:** Modern React & Node applications, robust REST/GraphQL APIs, database modeling, and performant web apps.
- **`/services/low-no-code-development` — Low/No-Code Solutions:** Rapid turnaround Webflow, Framer, and WordPress implementations enriched with custom JavaScript extensions.
- **`/services/framer` — Framer Development:** High-converting landing pages, fluid scroll-driven animations, interactive components, and production-ready marketing sites.
- **`/services/kajabi` — Kajabi Development:** Scalable course architectures, membership portals, custom sales funnels, and checkout optimizations for creators and businesses.
- **`/services/app-development` — Custom Web Applications & Tools:** Bespoke dashboards, SaaS utilities, automation tools, and internal portals tailored to business operations.

---

## 💎 Key Features & Innovations

### 🤖 Intelligent AI Chatbot Assistant (`SahedChatbot`)
- Floating interactive conversational AI assistant.
- Educated on Sahed's background, skillset, technical stack, pricing structures, and past projects to assist prospective clients in real time.

### 📊 Real-Time Cost Estimator & Instant PDF Blueprint Generator
- Allows prospective clients to customize project parameters (scope, project type, additional pages).
- Dynamic cost calculation engine based on transparent hourly estimates (€30/h).
- Generates and downloads branded, production-ready PDF project blueprints directly in the browser via `jspdf` and `html2canvas`.
- Automatically connects with Supabase to store client leads and upload estimate blueprints.

### 📝 Headless Publishing Engine with Sanity Studio
- Fully embedded Sanity Studio v3 accessible directly at `/sanity`.
- Dynamic article querying via `@sanity/client` with resilient fallback data.
- Custom schemas supporting rich PortableText, responsive images, and syntax-highlighted code blocks.
- Real-time article view counter driven by Netlify Serverless Functions.

### 🚀 Advanced SEO & Automated Social Preview Engine
- **Edge Metadata:** Netlify Edge Function (`social-meta.js`) intercepting social crawler user-agents (Twitter, Facebook, LinkedIn, Discord, Slack) to serve dynamic OpenGraph meta tags.
- **Pre-rendering Automation:** Automated build script (`scripts/generate-social-pages.js`) creating static preview pages with custom titles, descriptions, and feature images for every article.
- **Automated Sitemap Generation:** Script (`scripts/generate-sitemap.js`) that automatically crawls pages and queries published Sanity articles to generate `public/sitemap.xml`.
- **Structured Data:** JSON-LD schema integration for search engine indexing.

### 🎨 Cyber-Minimalist Aesthetic & Theme System
- Built on a "Coder Mode" dark aesthetic with high-contrast emerald and violet accents.
- Seamless Dark/Light theme switching with persisted preferences via `ThemeContext` and CSS variables.
- Asymmetric Bento grid layouts featuring translucent glassmorphic cards and subtle borders.
- Viewport-following Aura gradient glow (`AuraBackground`) and blending custom dot cursor (`CustomCursor`).

### 🎬 Fluid GSAP Motion & Interaction
- Smooth scroll reveals powered by GSAP ScrollTrigger.
- Fullscreen mobile navigation overlay with staggered entrance animations.
- Real-time Helsinki local time clock formatted via the browser's `Intl.DateTimeFormat`.

---

## 📁 Project Directory Structure

```text
├── netlify/
│   ├── edge-functions/     # Edge functions (dynamic social meta tags for crawlers)
│   └── functions/          # Serverless functions (blog views incrementation)
├── public/                 # Static assets, OpenGraph images, robots.txt, sitemap.xml
├── scripts/
│   ├── generate-sitemap.js       # Dynamic XML sitemap generator
│   └── generate-social-pages.js  # Social preview card pre-rendering script
├── src/
│   ├── components/         # Reusable UI components (Header, Footer, Chatbot, Bento cards)
│   ├── context/            # React context providers (ThemeContext)
│   ├── data/               # Local data fallbacks (projects, blog posts)
│   ├── hooks/              # Custom hooks (useSEO, useProjects, useHelsinkiTime)
│   ├── lib/                # Third-party client integrations (sanity.js, supabase.js)
│   ├── pages/              # Application route pages (Home, Work, Services, Process, Blog, etc.)
│   ├── sanity/             # Sanity Studio schemas (post, codeBlock, schema index)
│   ├── App.jsx             # Main router, route definitions, layout wrapper
│   ├── index.css           # Global design system tokens and utility classes
│   └── main.jsx            # React root mount entry point
├── supabase/               # Supabase configuration and database migration scripts
└── package.json            # Project manifest, dependencies, and build scripts
```

---

## 📬 Contact & Connect

- **Website:** [sahedalomsumit.com](https://sahedalomsumit.com)
- **Email:** [sahedalomsumit@gmail.com](mailto:sahedalomsumit@gmail.com)
- **WhatsApp:** [+358 41 576 5539](https://wa.me/358415765539)
- **LinkedIn:** [linkedin.com/in/sahedalomsumit](https://linkedin.com/in/sahedalomsumit)

---

© 2026 SAS // ALL SYSTEMS FUNCTIONAL  
Designed and engineered by Sahed Alom Sumit.
