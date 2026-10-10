# Sahed Alom Sumit | Portfolio & Digital Engineering Platform

[![Website](https://img.shields.io/badge/Live_Site-sahedalomsumit.com-00F5A0?style=for-the-badge&logo=googlechrome&logoColor=black)](https://sahedalomsumit.com)
[![Version](https://img.shields.io/badge/Version-v3.5.0-8B5CF6?style=for-the-badge)](https://sahedalomsumit.com)
[![Status](https://img.shields.io/badge/Status-Available_for_Projects-10B981?style=for-the-badge)](https://sahedalomsumit.com)

---
## ⚡ Overview & Core Identity

- **Name:** Sahed Alom Sumit
- **Position:** Product Designer & AI-Enhanced Web Developer
- **Location:** Helsinki, Finland
- **Specializations:** UI/UX Design, Full-Stack Web Development (React, Supabase), Low/No-Code (Webflow, Framer, WordPress, Kajabi), Headless CMS Architecture, and AI Automations.
- **About:** You bring the idea. I turn it into a digital product that works.

With 5+ years of experience, I’ve worked with founders, brands, and agencies worldwide, turning rough ideas into 150+ digital projects that are fast, user-friendly, visually polished, and built to support real business goals.

From UI/UX design in Figma to Webflow, WordPress, Kajabi, React, and Supabase, I combine design, development, and AI tools like Cursor, Codex, and Antigravity to build efficiently.

With a background in Business IT, I focus on more than design and code—I build solutions that solve real problems and support business goals.
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

### 🎬 Fluid GSAP Motion & Interaction
- Smooth scroll reveals powered by GSAP ScrollTrigger.
- Fullscreen mobile navigation overlay with staggered entrance animations.
- Real-time Helsinki local time clock formatted via the browser's `Intl.DateTimeFormat`.

---

## 📬 Contact & Connect

- **Website:** [sahedalomsumit.com](https://sahedalomsumit.com)
- **Email:** [sahedalomsumit@gmail.com](mailto:sahedalomsumit@gmail.com)
- **LinkedIn:** [linkedin.com/in/sahedalomsumit](https://linkedin.com/in/sahedalomsumit)

---

© 2026 Sahed Alom Sumit //Built with ❤️ by Sahed