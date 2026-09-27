-- =============================================
-- Migration: Create blog_posts table and policies
-- =============================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'Engineering',
  tags TEXT[] DEFAULT '{}'::TEXT[],
  author_name TEXT DEFAULT 'Sahed Alom Sumit',
  author_role TEXT DEFAULT 'Product Designer & AI-Enhanced Web Developer',
  author_avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  reading_time TEXT DEFAULT '5 min read',
  published_at TIMESTAMPTZ DEFAULT now(),
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indices for high performance queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published_at DESC) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts (is_featured) WHERE is_featured = true;

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent conflicts
DO $$
BEGIN
  DROP POLICY IF EXISTS "Allow public read access on published blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow authenticated full access on blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow anon read access on published blog posts" ON blog_posts;
END $$;

-- Policy: Allow anyone (including anonymous) to read published blog posts
CREATE POLICY "Allow public read access on published blog posts" ON blog_posts
  FOR SELECT
  USING (is_published = true);

-- Policy: Allow authenticated users full CRUD access
CREATE POLICY "Allow authenticated full access on blog posts" ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Atomic RPC function to increment post views safely
CREATE OR REPLACE FUNCTION increment_blog_post_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER set_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_blog_posts_updated_at();

-- Seed Initial High-Quality Articles
INSERT INTO blog_posts (
  slug,
  title,
  excerpt,
  content,
  cover_image,
  category,
  tags,
  reading_time,
  is_featured,
  views,
  seo_title,
  seo_description,
  published_at
)
VALUES
(
  'fusion-ai-design-engineering-next-gen-web',
  'The Fusion of AI and Design Engineering: Building Next-Generation Web Experiences',
  'How combining Figma component architectures, modern React/Vite ecosystems, and autonomous AI agents accelerates shipping award-grade web apps from weeks to hours.',
  E'# The Fusion of AI and Design Engineering: Building Next-Generation Web Experiences\n\nThe boundary between designer and software engineer has permanently blurred. In 2026, the competitive advantage no longer belongs to those who merely create static Figma artboards or write boilerplate CRUD APIs in isolation.\n\nInstead, the modern digital craftsman operates as a **Design Engineer**—someone who understands typography, visual hierarchy, and micro-interactions, paired with the computational power of LLMs, agentic workflows, and cloud-native databases.\n\n---\n\n## 1. The Design-to-Code Bottleneck Is Dead\n\nFor over two decades, the traditional digital product workflow looked like this:\n1. Wireframing & UX research in Figma\n2. Design review & redlining\n3. Handoff to frontend developers\n4. Weeks of back-and-forth fixing margin misalignment, broken responsive breakpoints, and mismatched hex codes\n\n> "When design and engineering speak the exact same language—tokens, physics, and state machines—friction drops to near zero."\n\nBy leveraging structured AI workflows, we can now translate design intent into production-ready React components with zero fidelity loss.\n\n### The Three Pillars of Modern Design Engineering:\n\n* **Deterministic Tokens:** CSS custom properties (`--bg`, `--accent`, `--border`) synchronized between design tools and stylesheets.\n* **Autonomous Generation:** LLM-assisted scaffolding for complex state orchestration, validation schemas, and database queries.\n* **Tactile Polish:** Manual fine-tuning of physics curves, spring dampening, and accessibility trees.\n\n---\n\n## 2. Real-Time Data and Dynamic Interfaces\n\nStatic mockups fail to capture the fluid nature of modern web apps. Today, pairing Supabase (PostgreSQL with Row Level Security) and React enables real-time reactivity without writing heavy backend infrastructure.\n\n```javascript\n// Subscribing to live updates with Supabase in React\nuseEffect(() => {\n  const channel = supabase\n    .channel(\"realtime-posts\")\n    .on(\"postgres_changes\", { event: \"*\", schema: \"public\", table: \"posts\" }, (payload) => {\n      updatePostState(payload.new);\n    })\n    .subscribe();\n\n  return () => { supabase.removeChannel(channel); };\n}, []);\n```\n\n---\n\n## 3. Why Micro-Interactions Matter More Than Ever\n\nWhen every application can be generated quickly, **craft** becomes the true differentiator.\n\nDelight lives in the subtle details: the magnetic pull of a navigation button, the crisp 60fps blur of a glassmorphic header on scroll, or an interactive terminal chatbot that answers client inquiries with personality.\n\n### The Checklist for Award-Grade Polish:\n- [x] Smooth scroll interpolation with GSAP or Lenis\n- [x] Thoughtful dark and light mode color balancing with WCAG AAA contrast\n- [x] Instant client-side optimistic UI updates\n- [x] Granular SEO and automated open graph metadata generation\n\n---\n\n## Conclusion\n\nAI is not replacing designers or developers; it is empowering solo engineers to operate with the leverage of an entire agency. By mastering both aesthetic vision and full-stack execution, you can build products that feel genuinely alive.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'AI & Automation',
  ARRAY['AI Agents', 'UI/UX', 'Full Stack', 'Vite'],
  '6 min read',
  true,
  342,
  'Fusion of AI & Design Engineering | Sahed Alom Sumit',
  'Discover how AI agents and modern design engineering accelerate shipping award-grade web apps with Figma, React, and Supabase.',
  now() - interval '2 days'
),
(
  'crafting-bento-grids-that-convert-saas-portfolios',
  'Crafting Bento Grids that Convert: The Geometry of Modern SaaS Portfolios',
  'Bento grids are not just an aesthetic trend popularized by Apple and Linear—they are a cognitive layout pattern that maximizes user comprehension and conversion.',
  E'# Crafting Bento Grids that Convert: The Geometry of Modern SaaS Portfolios\n\nLook at the homepage of Linear, Apple, or Vercel, and you will notice a common structural pattern: **The Bento Grid**.\n\nOriginating from the Japanese bento box—where varied compartments organize rice, pickled vegetables, and proteins into a harmonious whole—bento web design organizes disparate features into modular, asymmetric, visually cohesive tiles.\n\n---\n\n## Why Bento Grids Outperform Traditional Columns\n\nTraditional three-column layouts suffer from cognitive monotony: every card has the same height, the same icon position, and the same visual weight. Bento grids, however, establish natural visual hierarchy through proportional scaling.\n\n### Core Psychological Benefits:\n1. **Foveal Anchoring:** Large hero tiles draw the initial eye focus, while smaller satellite tiles provide supporting context.\n2. **Density Without Clutter:** You can pack technical specs, live stats, interactive widgets, and testimonials into a single viewport.\n3. **Mobile Fluidity:** Bento tiles gracefully collapse into single-column stacks on smaller viewports without awkward layout shifts.\n\n---\n\n## The Anatomy of an Award-Grade Bento Card\n\nA truly great bento tile is not just a `div` with a border. It requires multi-layered sensory depth:\n\n```css\n.bento-card {\n  background: var(--card-bg);\n  border: 1px solid var(--border);\n  backdrop-filter: blur(20px);\n  border-radius: 24px;\n  box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.09);\n  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n.bento-card:hover {\n  border-color: var(--border-hover);\n  transform: translateY(-3px);\n  box-shadow: 0 14px 40px -4px rgba(0, 0, 0, 0.2), 0 0 25px -4px var(--accent-glow);\n}\n```\n\n### The Three Key Ingredients:\n* **Inner Bevel Highlight:** `inset 0 1px 0 rgba(255, 255, 255, 0.09)` creates that premium physical glass edge.\n* **Micro-Glow on Hover:** A subtle radial aura in violet or emerald provides tactile feedback.\n* **Typographic Contrast:** Monospace metadata badges paired with bold display headings.\n\n---\n\n## Summary\n\nWhen designing your next SaaS product page or creative portfolio, don''t settle for cookie-cutter columns. Emulate the modularity of the bento box to guide your visitors directly toward your call to action.',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'Design Systems',
  ARRAY['Design Systems', 'Bento Grid', 'Conversion UX', 'Figma'],
  '5 min read',
  false,
  218,
  'Crafting Bento Grids that Convert | Sahed Alom Sumit',
  'Learn how to design high-converting, visually stunning bento grids for SaaS landing pages and modern portfolios.',
  now() - interval '5 days'
),
(
  'zero-to-high-performance-supabase-react-architecture',
  'From Zero to High-Performance Architecture: Real-time Supabase with React',
  'A battle-tested blueprint for setting up PostgreSQL Row Level Security (RLS), real-time listeners, and edge caching for modern single-page applications.',
  E'# From Zero to High-Performance Architecture: Real-time Supabase with React\n\nSelecting a backend stack for modern web applications often feels like choosing between endless configuration complexity (AWS, Kubernetes) and restrictive vendor lock-in (traditional BaaS).\n\nSupabase has emerged as the sweet spot: giving developers the unmatched relational integrity of open-source PostgreSQL combined with instantaneous REST APIs, real-time WebSocket subscriptions, and rock-solid Row Level Security (RLS).\n\n---\n\n## 1. Bulletproof Row Level Security (RLS)\n\nNever expose your database directly to the client without RLS enabled. With Supabase, security rules live directly inside Postgres policies:\n\n```sql\n-- Enable RLS\nALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;\n\n-- Public read for published content\nCREATE POLICY \"Allow public read access\"\n  ON blog_posts FOR SELECT\n  USING (is_published = true);\n\n-- Authenticated write permissions\nCREATE POLICY \"Allow author modification\"\n  ON blog_posts FOR ALL\n  TO authenticated\n  USING (auth.uid() = author_id);\n```\n\n---\n\n## 2. Optimistic UI Updates\n\nNothing makes a web application feel faster than optimistic rendering. When a user likes a post, submits a quote, or increments an analytics counter, update client state immediately while the network request resolves in the background.\n\n```javascript\n// Optimistic state example\nconst handleIncrementViews = async (slug) => {\n  // 1. Optimistic local update\n  setViews((prev) => prev + 1);\n  \n  // 2. Background RPC call\n  try {\n    await supabase.rpc(\"increment_blog_post_views\", { post_slug: slug });\n  } catch (err) {\n    // Revert if critical\n    console.error(\"View update failed:\", err);\n  }\n};\n```\n\n---\n\n## 3. Resilience and Graceful Fallbacks\n\nA hallmark of resilient design is graceful degradation. If a client is on an airplane, behind a strict corporate firewall, or experiencing transient network latency, your frontend should gracefully fall back to local cached snapshots without throwing unhandled exceptions.\n\nBy building resilient client abstractions, you ensure that every visitor enjoys a 100% reliable experience.',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'Engineering',
  ARRAY['Supabase', 'PostgreSQL', 'Architecture', 'React'],
  '7 min read',
  false,
  189,
  'Real-Time Supabase & React Architecture | Sahed Alom Sumit',
  'A battle-tested blueprint for configuring PostgreSQL RLS, real-time sync, and optimistic UI with Supabase and React.',
  now() - interval '9 days'
),
(
  'micro-interactions-and-tactile-ui-design',
  'Micro-Interactions and Spatial Feel: Why Tactile UI Keeps Users Hooked',
  'Exploring the psychology of physics-based spring animations, subtle cursor trailing, and glassmorphic depth in modern web development.',
  E'# Micro-Interactions and Spatial Feel: Why Tactile UI Keeps Users Hooked\n\nHuman beings are physical creatures. When we push a real-world elevator button, we feel the mechanical click, hear the metallic contact, and see the indicator light up.\n\nFor too long, the web was flat, lifeless, and unresponsive. However, the rise of **spatial computing** and **micro-interactions** has reminded us that digital interfaces should feel alive.\n\n---\n\n## The Physics of a Satisfying Click\n\nLinear CSS transitions (`transition: all 0.3s linear`) feel mechanical and robotic because nothing in the natural world moves at a constant velocity without acceleration or inertia.\n\nBy utilizing custom cubic-bezier curves or spring physics, buttons and cards feel tangible:\n\n```css\n/* Natural deceleration curve */\ntransition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),\n            box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n```\n\n### The Three Layers of Tactile Feedback:\n1. **Anticipation (Hover):** A subtle elevation of `-3px` and an ambient glow indicating interactive affordance.\n2. **Action (Active):** A momentary scale-down to `0.97` mimicking physical depression.\n3. **Settling (Release):** Smooth rebound back to base state with gentle damping.\n\n---\n\n## Sound and Motion: The Final Frontier\n\nSubtle haptics, interactive cursor trails that blend with background elements, and smooth scroll synchronization transform a mundane website into an unforgettable digital destination.\n\nWhen you invest in micro-interactions, you demonstrate respect for your user''s time and attention.',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  'UI/UX Design',
  ARRAY['GSAP', 'Micro-Interactions', 'Animation', 'CSS'],
  '4 min read',
  false,
  412,
  'Tactile UI & Micro-Interactions | Sahed Alom Sumit',
  'Discover why physics-based animations, spatial depth, and micro-interactions elevate web user experience and retention.',
  now() - interval '14 days'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  cover_image = EXCLUDED.cover_image,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  reading_time = EXCLUDED.reading_time,
  is_featured = EXCLUDED.is_featured,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;
