# Sahed Alom Sumit | No-Code & AI Expert Portfolio v3.0.0

A high-end cyber-minimalist portfolio built with **React**, **Vite**, and **Tailwind CSS**.  
This project showcases Sahed Alom Sumit — a No-Code Web Developer & AI Automation Expert based in Helsinki, Finland.

---

## 🚀 Overview

This portfolio blends technical structure with visual clarity using a "Coder Mode" aesthetic.  
It features reusable React components, individual project detail pages, GSAP animations, and a Supabase-ready backend for easy project management.

### Core Identity

- **Name:** Sahed Alom Sumit  
- **Role:** No-Code Web Developer & AI Automation Expert  
- **Specialization:** Webflow, Framer, WordPress, AI Workflows, Make.com  
- **Location:** Helsinki, Finland  

---

## 🛠️ Tech Stack

**Frontend Framework**
- React 18 (Vite)
- React Router DOM (client-side routing)

**Styling**
- Tailwind CSS v3 (utility-first framework)
- Custom CSS (bento cards, glassmorphism, cursor effects)

**Animation Engine**
- GSAP (GreenSock)  
- ScrollTrigger (scroll-based reveal animations)  
- TextPlugin (typewriter effects)  

**Typography**
- JetBrains Mono (developer-style aesthetic)  
- Inter (modern sans-serif)  

**Backend (Optional)**
- Supabase (PostgreSQL + REST API with free tier)
- Currently uses local JSON data — switch to Supabase for a web dashboard to manage projects

**Build & Deploy**
- Vite (fast HMR, optimized builds)
- GitHub Pages ready

---

## ✨ Key Features

### 1. React Component Architecture
- 10+ reusable components (TopBar, Header, Footer, ContactSection, ProjectCard, Carousel, etc.)
- Eliminated all HTML duplication from the original static site
- Client-side routing with React Router

### 2. Individual Project Detail Pages
- Each of the 14 portfolio projects has its own `/portfolio/:slug` detail page
- Rich content: overview, challenge, solution, results, key features, tech stack
- Previous/Next navigation between projects

### 3. Cyber-Minimalist Bento UI
- Asymmetric grid layout  
- Structured "data block" presentation  
- Glassmorphism effect with backdrop filters  
- Premium layered visual depth  

### 4. Advanced Interactions
- Custom dot cursor with `mix-blend-mode: difference`  
- Scroll-triggered reveal animations (GSAP ScrollTrigger)
- Typewriter text cycling on hero section
- Background aura gradients that follow the viewport  

### 5. Supabase CMS Backend
- Free-tier PostgreSQL database with REST API
- Web dashboard to add/update/delete projects (no code needed)
- Falls back to local data when not configured

---

## 📂 Project Structure

```
├── .github/                 # GitHub Actions (CI/CD)
│   └── workflows/deploy.yml
├── index.html               # Vite entry point
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
├── package.json             # Dependencies & scripts
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Routes & layout
│   ├── index.css            # Global styles + Tailwind
│   ├── components/
│   │   ├── AuraBackground.jsx
│   │   ├── Carousel.jsx
│   │   ├── ContactSection.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── RevealOnScroll.jsx
│   │   └── TopBar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Process.jsx
│   │   └── ProjectDetail.jsx
│   ├── data/
│   │   └── projects.js      # All 14 projects with detailed content
│   └── lib/
│       └── supabase.js      # Supabase client (optional)
├── public/                  # Static assets (copied to root on build)
│   ├── img/                 # Images & optimized SEO assets
│   │   ├── portfolio/       # Project thumbnails
│   │   ├── certificates/    # Certificate images
│   │   └── testimonials/    # Review screenshots
│   └── robots.txt, etc.
├── _old/                    # Backup of original HTML files
└── README.md
```

---

## 🗄️ Supabase Setup (Optional)

To enable the web dashboard for managing projects:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Create the `projects` table with this SQL:

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

4. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

5. The app will automatically use Supabase when these env vars are set.

---


## 📬 Contact

- **Email:** sahedalomsumit@gmail.com  
- **WhatsApp:** +358 41 576 5539  
- **LinkedIn:** https://linkedin.com/in/sahedalomsumit  

---

© 2026 SAS // ALL SYSTEMS FUNCTIONAL  

Built with React, Vite, Tailwind CSS, GSAP, and ❤️ for high-performing digital experiences.