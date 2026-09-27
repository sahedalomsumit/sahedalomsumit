# Sahed Alom Sumit | Product Designer & AI-Enhanced Web Developer Portfolio v3.5.0

A high-end cyber-minimalist portfolio built with **React**, **Vite**, **Tailwind CSS**, **GSAP**, and **Supabase**.  
This project showcases Sahed Alom Sumit — a Product Designer & AI-Enhanced Web Developer based in Helsinki, Finland.

---

## 🚀 Overview

This portfolio blends technical structure with visual clarity using a "Coder Mode" aesthetic, featuring reusable React components, a dynamic Supabase-powered backend for Projects and FAQ, and high-end GSAP animations.

### Core Identity

- **Name:** Sahed Alom Sumit
- **Role:** Product Designer & AI-Enhanced Web Developer
- **Bio:** Vibe web design. Clean development. AI automation that actually makes sense. That's what I do. Good design and purposeful development should feel effortless. That's what I chase with every project — that moment when someone lands on a site and just gets it without thinking twice. I've spent the past 5+ years working with founders, brands, and agencies across the world, helping them turn rough ideas into polished digital products. My work sits right at the intersection of design thinking and full-stack development. I care about the vibe of a page as much as I care about how fast it loads. Smooth animations that make people stop scrolling. Dynamic systems that just work. Prototypes that feel so real clients forget it's not live yet. Whatever the project needs — I show up with the same care, the same eye, and the same drive to get it right. With a background Bachelor's in Business IT, I also understand the business side of things. So I'm not just making things look good — I'm making sure they actually work for your goals.
- **Specialization:** Webflow, Framer, WordPress, Figma, AI Workflows, Full-stack Web Development, Website Design, UI/UX Design
- **Location:** Helsinki, Finland
- **Availability:** Integrated real-time availability indicator

---

## 🛠️ Tech Stack

**Frontend Framework**

- React 18 (Vite)
- React Router DOM v6 (client-side routing)

**Styling**

- Tailwind CSS v3 (utility-first framework)
- Custom CSS (bento cards, glassmorphism, aura gradients)

**Animation Engine**

- GSAP (GreenSock)
- ScrollTrigger (scroll-based reveal animations)
- Staggered timeline sequences for mobile menu

**Typography**

- JetBrains Mono (developer-style aesthetic)
- Inter (modern sans-serif)

**Backend (Core)**

- Supabase (PostgreSQL + REST API)
- Dynamic data fetching for Projects and FAQ

**Build & Deploy**

- Vite (fast HMR, optimized builds)
- GitHub Pages ready

---

## ✨ Key Features

### 1. Dynamic FAQ Knowledge Base

- All FAQ data is fetched in real-time from Supabase.
- Features categorized filtering system for easy navigation.
- **Sticky Mobile Navigation:** Filter FAQ items on the go with a modern sticky dropdown.
- **Rich Content Support:** Auto-detection for URLs, emails, and WhatsApp numbers in answers.

### 2. Full-Screen GSAP Mobile Menu

- Custom-built mobile navigation with high-end staggered animations.
- Premium UI transitions and menu links animated via GSAP timelines.
- Integrated availability status "High" to attract client interest.

### 3. Individual Project Detail Pages

- Each of the 14+ portfolio projects has its own `/portfolio/:slug` detail page.
- Rich content: overview, challenge, solution, results, and tech stack.
- Previous/Next navigation for a seamless browsing experience.

### 4. Cyber-Minimalist Bento UI

- Asymmetric grid layout structured as "data blocks".
- Glassmorphism effects with backdrop filters.
- Layered visual depth achieved through custom CSS tokens.

### 5. Advanced Interactions

- **Custom Dot Cursor:** Features `mix-blend-mode: difference` for high visibility.
- **Breadcrumb Navigation:** Consistent navigational trail across FAQ and Project pages.
- **Scroll-Triggered Reveals:** GSAP ScrollTrigger ensures elements animate smoothly into view.
- **Aura Background:** Dynamic background gradients that follow the viewport.

---

## 📂 Project Structure

```
├── .github/                 # GitHub Actions (CI/CD)
├── index.html               # Vite entry point
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
├── package.json             # Dependencies & scripts
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Routes & global layout
│   ├── index.css            # Global styles + Tailwind
│   ├── components/
│   │   ├── AuraBackground.jsx
│   │   ├── Carousel.jsx
│   │   ├── ContactSection.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx       # Staggered mobile menu & logic
│   │   ├── ProjectCard.jsx
│   │   ├── RevealOnScroll.jsx
│   │   └── TopBar.jsx
│   ├── pages/
│   │   ├── Home.jsx         # Hero, Services, Featured Projects
│   │   ├── Faq.jsx          # FAQ Knowledge Base with Filtering
│   │   ├── Portfolio.jsx    # Complete projects listing
│   │   ├── Process.jsx      # Workflow & Methodology
│   │   └── ProjectDetail.jsx
│   ├── lib/
│   │   └── supabase.js      # Core Supabase client & fetch helpers
│   └── data/
│       └── projects.js      # Local fallback for project data
├── public/                  # Static assets
└── README.md
```

---

## 🗄️ Supabase Setup

This project uses Supabase for dynamic content management. To replicate:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create the `projects` table:

```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  key_features TEXT[],
  tags TEXT[],
  tech_stack TEXT[],
  industry TEXT,
  live_url TEXT,
  thumbnail_url TEXT,
  gallery_urls TEXT[],
  year TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

3. Create the `faqs` table:

```sql
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  topic TEXT DEFAULT 'General',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

4. Configure `.env`:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📬 Contact

- **Email:** sahedalomsumit@gmail.com
- **WhatsApp:** +358 41 576 5539
- **LinkedIn:** https://linkedin.com/in/sahedalomsumit

---

© 2026 SAS // ALL SYSTEMS FUNCTIONAL  
Built with React, Vite, Tailwind CSS, GSAP, and ❤️ for high-performing digital experiences.
