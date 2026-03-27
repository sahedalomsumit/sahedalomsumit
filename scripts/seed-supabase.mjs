// Seed script to create the projects table and insert all projects into Supabase
// Run with: node scripts/seed-supabase.mjs

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zcfvrxvttbyhmemdyxfw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjZnZyeHZ0dGJ5aG1lbWR5eGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI5MDAsImV4cCI6MjA5MDIwODkwMH0.I4up28xh08dzrug3VQ28rMuEsfBq49mKji1DPlc71yU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// First, test the connection
async function testConnection() {
  console.log('🔌 Testing Supabase connection...')
  // Try a simple query to see if we can reach the server
  const { data, error } = await supabase.from('projects').select('count').limit(1)
  if (error) {
    if (error.code === '42P01') {
      console.log('⚠️  Table "projects" does not exist yet. You need to create it first.')
      console.log('')
      console.log('📋 Go to your Supabase Dashboard → SQL Editor and run this SQL:')
      console.log('')
      console.log(getCreateTableSQL())
      console.log('')
      return false
    }
    console.log('❌ Connection error:', error.message)
    return false
  }
  console.log('✅ Connected to Supabase successfully!')
  return true
}

function getCreateTableSQL() {
  return `
CREATE TABLE IF NOT EXISTS projects (
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

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access (for the frontend)
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete (for admin)
CREATE POLICY "Allow authenticated write access" ON projects
  FOR ALL USING (auth.role() = 'authenticated');
`.trim()
}

const projects = [
  {
    slug: 'twintwo',
    title: 'TwinTwo',
    short_description: 'A highly interactive and animated Webflow website designed to empower retail and e-commerce businesses with innovative solutions.',
    full_description: "TwinTwo is a strategic consulting brand focused on empowering retail and e-commerce businesses. I developed their website from the ground up in Webflow, creating a highly interactive and animated experience that reflects the brand's innovative approach to helping businesses grow.",
    challenge: "TwinTwo needed a digital presence that would immediately communicate sophistication and expertise in the competitive retail consulting space. The challenge was to create a website that was both visually striking and functionally robust, with complex animations that wouldn't compromise page speed.",
    solution: "I designed and built a fully custom Webflow website featuring scroll-triggered animations, interactive hover states, and a clean information architecture. Each section was carefully crafted to guide visitors through TwinTwo's service offerings while maintaining a premium feel. The site leverages Webflow's native interactions for smooth, GPU-accelerated animations.",
    results: 'The website achieved excellent Core Web Vitals scores, with a Largest Contentful Paint under 2.5s. Client feedback highlighted the "premium, modern feel" of the site, and it has been instrumental in TwinTwo\'s client acquisition strategy.',
    key_features: ['Scroll-triggered animations', 'Interactive service showcases', 'Responsive across all devices', 'Custom CMS for case studies', 'Performance-optimized assets', 'SEO-structured content'],
    tags: ['Web Design', 'Web Development', 'Webflow', 'Retail and E-commerce'],
    tech_stack: ['Webflow', 'GSAP Animations', 'Webflow CMS', 'Custom CSS'],
    industry: 'Retail & E-commerce Consulting',
    live_url: 'http://twintwo.com',
    thumbnail_url: '/img/works/Twintwo.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: true,
    display_order: 1,
  },
  {
    slug: 'james-crossing',
    title: 'James Crossing',
    short_description: 'A unique e-commerce website specializing in fabrics and wallpapers with a timeless European aesthetic, built on WordPress.',
    full_description: 'James Crossing is a Canadian interior design retailer offering curated European fabrics and wallpapers. I developed their complete e-commerce platform on WordPress with WooCommerce, creating a sophisticated shopping experience that matches the elegance of their product line.',
    challenge: 'The client needed an e-commerce platform that could handle complex product variations (fabrics by the yard, wallpaper by the roll), implement a role-based discount system for trade designers, and present their European luxury products in a way that felt premium yet approachable.',
    solution: 'I built a fully custom WordPress website with WooCommerce, implementing a role-based user system where registered designers automatically receive a 10% discount on all products. The product pages feature detailed specifications, high-resolution imagery with zoom capabilities, and a streamlined checkout process. Custom product filtering allows customers to browse by pattern, color, and collection.',
    results: 'The platform successfully launched with over 500 products, serving both retail and trade customers. The role-based discount system has been particularly effective in attracting interior designers, resulting in a growing B2B client base.',
    key_features: ['Role-based pricing (10% designer discount)', 'Custom product filtering', 'WooCommerce integration', 'High-res product zoom', 'Trade account registration', 'Mobile-optimized checkout'],
    tags: ['Web Development', 'WordPress', 'Interior Design and Home Decor'],
    tech_stack: ['WordPress', 'WooCommerce', 'Elementor', 'Custom PHP', 'MySQL'],
    industry: 'Interior Design & Home Decor',
    live_url: 'http://jamescrossing.ca',
    thumbnail_url: '/img/works/Jamescrossing.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: true,
    display_order: 2,
  },
  {
    slug: 'innovation-alliance',
    title: 'Innovation Alliance',
    short_description: 'A responsive Webflow website showcasing world-class innovation capabilities for a global consulting organization.',
    full_description: "The Innovation Alliance is a global network of innovation consultants helping organizations transform through design thinking and strategic innovation. I developed their website in Webflow, creating an authoritative digital presence that communicates their expertise to a worldwide audience.",
    challenge: 'As a global consulting firm, Innovation Alliance needed a website that would resonate with enterprise clients across different cultures and industries. The site needed to clearly communicate complex innovation methodologies while remaining accessible and engaging.',
    solution: "I created a clean, modern Webflow website with intuitive navigation and a content-first approach. Interactive elements and contemporary design trends help communicate the organization's innovative nature, while a carefully structured information architecture ensures visitors can quickly find relevant services, case studies, and team information.",
    results: "The website has become a key tool in Innovation Alliance's lead generation strategy, with improved engagement metrics and longer session durations compared to their previous site.",
    key_features: ['Responsive multi-page architecture', 'Interactive service showcases', 'Team member profiles', 'Case study CMS', 'Contact form integration', 'Multi-language ready structure'],
    tags: ['Web Development', 'Webflow', 'Innovation Consulting'],
    tech_stack: ['Webflow', 'Webflow CMS', 'Custom Interactions'],
    industry: 'Innovation Consulting',
    live_url: 'http://innovationalliance.ai',
    thumbnail_url: '/img/works/innovationalliance.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 3,
  },
  {
    slug: 'notifi',
    title: 'Notifi',
    short_description: 'A user-friendly Webflow website highlighting the key features and benefits of a field management software platform.',
    full_description: "Notifi is a field management software solution designed for home service businesses. I built their marketing website in Webflow, focusing on creating a clear, compelling presentation of the product's features and value proposition to drive signups and conversions.",
    challenge: 'Notifi needed to communicate the value of a complex SaaS product to busy home service business owners who are not tech-savvy. The website had to simplify technical features into clear benefits and build trust through social proof.',
    solution: "I designed and developed a conversion-focused Webflow website using concise feature descriptions paired with compelling visuals. Customer testimonials are prominently featured to build credibility. The site uses a clear visual hierarchy to guide visitors from problem awareness to solution understanding to signup.",
    results: 'The redesigned website contributed to a significant increase in demo requests. The simplified messaging and testimonial integration proved highly effective in building trust with the target audience.',
    key_features: ['Feature-benefit architecture', 'Customer testimonial integration', 'Conversion-optimized CTAs', 'Product demo scheduling', 'Responsive design', 'Fast page load times'],
    tags: ['Web Development', 'Webflow', 'Home Services'],
    tech_stack: ['Webflow', 'Custom CSS', 'Form Integrations'],
    industry: 'Home Services / SaaS',
    live_url: 'http://getnotifi.com',
    thumbnail_url: '/img/works/notifi.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 4,
  },
  {
    slug: 'ovulio-baby',
    title: 'Ovulio Baby',
    short_description: 'An app marketing website with Figma design and Webflow development for a fertility and conception tracking app.',
    full_description: "Ovulio Baby is a mobile application that enhances the conception journey for couples through fertility tracking, educational resources, and interactive features. I designed the UI in Figma and developed the marketing website in Webflow, creating an engaging digital experience that drives app downloads.",
    challenge: "The client needed a marketing website that could sensitively and effectively communicate the benefits of a fertility tracking app. The design had to be warm, trustworthy, and engaging while clearly showcasing app features and driving downloads across iOS and Android.",
    solution: "I started with a complete UI design in Figma, creating a warm and inviting color palette that feels supportive rather than clinical. The Webflow implementation features interactive feature showcases, a gamified scratch-off element to boost engagement, and strategically placed download CTAs. User testimonials and expert endorsements build trust throughout the experience.",
    results: 'The website successfully launched alongside the app, contributing to strong initial download numbers. The scratch-off feature proved particularly effective at increasing time-on-site and engagement rates.',
    key_features: ['Figma-to-Webflow pipeline', 'Interactive scratch-off feature', 'App store download links', 'Feature carousel showcase', 'Expert endorsement section', 'Fertility calendar preview'],
    tags: ['Web Design', 'Web Development', 'Figma', 'Webflow', 'Fertility and Conception'],
    tech_stack: ['Figma', 'Webflow', 'Custom Interactions', 'Lottie Animations'],
    industry: 'Health & Fertility Tech',
    live_url: 'https://www.ovulio-baby.com/',
    thumbnail_url: '/img/works/Ovulio Baby.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 5,
  },
  {
    slug: 'photo-purge',
    title: 'Photo Purge',
    short_description: 'An innovative app marketing site for a camera roll organization tool, designed in Figma and built in Webflow.',
    full_description: "Photo Purge is a mobile utility app that makes organizing your camera roll effortless through a simple swipe interface. I designed the complete UI in Figma and developed the marketing website in Webflow, creating a fun and energetic digital presence that drives downloads.",
    challenge: "Photo Purge needed a website that could quickly communicate a simple concept — swipe to declutter your photos — while making the experience feel fun and engaging. The challenge was to convert casual visitors into app downloaders.",
    solution: "I designed a vibrant, app-like website experience with animated demonstrations of the swipe interface. The visual design mirrors the app's playful UI, creating brand consistency. Interactive elements simulate the app experience directly on the website, giving visitors a taste of the product before downloading.",
    results: "The website effectively communicates the product's value proposition within seconds of landing, contributing to strong conversion rates from visit to download.",
    key_features: ['Animated product demonstrations', 'App store integration', 'Feature comparison sections', 'Storage stats visualization', 'User review highlights', 'Cross-platform download CTAs'],
    tags: ['Web Design', 'Web Development', 'Figma', 'Webflow', 'Mobile Utility'],
    tech_stack: ['Figma', 'Webflow', 'GSAP Animations', 'Custom CSS'],
    industry: 'Mobile Utility',
    live_url: 'https://www.photopurge.com/',
    thumbnail_url: '/img/works/Photopurge.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 6,
  },
  {
    slug: 'flagrant-media',
    title: 'Flagrant Media',
    short_description: 'A vibrant content creator platform connecting audiences with thought-provoking and entertaining media content.',
    full_description: "Flagrant Media Group is a digital media company with millions of monthly views across podcasts, videos, and social media. I designed and developed their website in Figma and Webflow, creating a vibrant platform that connects audiences with their unfiltered, thought-provoking content.",
    challenge: "With millions of followers across platforms, Flagrant Media needed a central hub that would showcase their diverse content portfolio while also serving as a professional platform for brand partnerships and sponsorship opportunities.",
    solution: "I designed and built a dynamic, content-forward website that highlights their recent content, showcases audience metrics, and provides clear pathways for both viewers and potential brand partners. The bold visual design reflects the brand's unapologetic personality.",
    results: "The website successfully serves as both a content discovery platform and a B2B sales tool, helping Flagrant Media secure brand partnerships with professional presentation of their reach and audience demographics.",
    key_features: ['Content aggregation from multiple platforms', 'Brand partnership portal', 'Podcast player integration', 'Social media feeds', 'Audience metrics dashboard', 'Contact form for collaborations'],
    tags: ['Web Design', 'Web Development', 'Figma', 'Webflow', 'Entertainment and Media'],
    tech_stack: ['Figma', 'Webflow', 'CMS Collections', 'API Integrations'],
    industry: 'Entertainment & Media',
    live_url: 'https://flagrantmediagroup.com',
    thumbnail_url: '/img/works/Flagrant Media.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 7,
  },
  {
    slug: 'true-pivot',
    title: 'True Pivot',
    short_description: 'A comprehensive forex trading mentorship platform with courses, mentor profiles, and subscription plans.',
    full_description: "True Pivot Investment is a forex trading education platform offering comprehensive mentorship programs. I designed the UI in Figma and developed the website in Webflow, creating a professional platform that clearly presents their course offerings and builds trust with potential students.",
    challenge: "The forex education space is crowded with dubious offers. True Pivot needed a website that would differentiate them as a legitimate, professional mentorship program while clearly presenting their multi-tier subscription model and course curriculum.",
    solution: "I created a clean, professional design that prioritizes credibility. Expert mentor profiles with real credentials are prominently featured alongside student success stories and detailed course breakdowns. The subscription plan comparison is clear and transparent, and the community section highlights the collaborative learning environment.",
    results: 'The website helped True Pivot establish credibility in a competitive market. The clear subscription comparison and student testimonials contributed to strong enrollment growth.',
    key_features: ['Expert mentor profiles', 'Multi-tier subscription plans', 'Student success stories', 'Course curriculum breakdown', 'Community section', 'Live trading session highlights'],
    tags: ['Web Design', 'Web Development', 'Figma', 'Webflow', 'Forex Trading and Mentorship'],
    tech_stack: ['Figma', 'Webflow', 'Stripe Integration', 'CMS'],
    industry: 'Forex Trading & Education',
    live_url: 'https://www.figma.com/design/x5ASMOhvAwDSD7QDIxnDGI/True-Pivot-website-UI',
    thumbnail_url: '/img/works/Truepivot.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 8,
  },
  {
    slug: 'sourcify',
    title: 'Sourcify',
    short_description: 'A comprehensive platform for remote outsourcing and payroll solutions, designed in Figma and built with WordPress.',
    full_description: "Sourcify HR is a company specializing in remote outsourcing and payroll management solutions. I designed the UI in Figma and developed the website in WordPress, creating a professional platform that communicates their capability to streamline global remote hiring and payroll processing.",
    challenge: "Sourcify needed to convey trust and professionalism to enterprise clients while explaining complex outsourcing and payroll services in an accessible way. The website had to serve both as a lead generation tool and an information resource.",
    solution: "I designed a clean, corporate-friendly interface in Figma and translated it into a fully functional WordPress site. The content architecture progressively reveals complexity — from a clear value proposition on the homepage to detailed service breakdowns on inner pages. Case studies and client logos build enterprise credibility.",
    results: "The redesigned website improved Sourcify's professional image significantly and became a primary channel for lead generation, with improved form submission rates.",
    key_features: ['Enterprise-grade design', 'Service comparison pages', 'Client case studies', 'Payroll calculator', 'Lead capture forms', 'Blog/Resources section'],
    tags: ['Web Design', 'Web Development', 'Figma', 'WordPress', 'Outsourcing and Payroll Management'],
    tech_stack: ['Figma', 'WordPress', 'Elementor', 'Custom PHP', 'Contact Form 7'],
    industry: 'HR & Outsourcing',
    live_url: 'https://thesourcify.com/',
    thumbnail_url: '/img/works/Sourcify.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 9,
  },
  {
    slug: 'crep-circle',
    title: 'Crep Circle',
    short_description: 'A B2B sneaker resale marketplace connecting suppliers with sellers, featuring live inventory of 5,000+ pairs.',
    full_description: "Crep Circle is a B2B platform connecting sneaker suppliers with resellers worldwide. I built their e-commerce platform on WordPress, creating a functional marketplace that handles live inventory, bulk ordering, and membership management.",
    challenge: "The sneaker resale market requires trust and speed. Crep Circle needed a platform that could display live inventory of thousands of pairs, handle bulk ordering logistics, and manage different membership tiers — all while maintaining the street-culture aesthetic that resonates with their audience.",
    solution: "I developed a WordPress-based marketplace with live inventory tracking, bulk purchasing capabilities, and a membership system. The design balances street-culture aesthetics with e-commerce functionality. Product pages show real-time availability, and the checkout process is streamlined for bulk orders.",
    results: 'The platform successfully facilitated B2B transactions with a growing community of resellers. The membership model proved effective in retaining customers and driving repeat purchases.',
    key_features: ['Live inventory (5,000+ SKUs)', 'Bulk ordering system', 'Membership tiers', 'Authenticity guarantees', 'Next-day delivery tracking', 'Supplier portal'],
    tags: ['Web Development', 'WordPress', 'Sneaker Resale'],
    tech_stack: ['WordPress', 'WooCommerce', 'Membership Plugins', 'Custom PHP'],
    industry: 'Sneaker Resale / E-commerce',
    live_url: 'https://crepcircle.com/',
    thumbnail_url: '/img/works/crepcircle.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 10,
  },
  {
    slug: 'bonding',
    title: 'Bonding',
    short_description: 'A German student-company networking platform built in Framer, fostering education and career development connections.',
    full_description: "Bonding is a German student initiative that creates connections between students and companies through career events, workshops, and networking opportunities. I developed their website in Framer, creating an engaging platform that serves both students looking for career opportunities and companies seeking talent.",
    challenge: "Bonding operates across multiple German cities with numerous concurrent events. The website needed to handle complex event listings, company profiles, and chapter-specific content while maintaining a unified, engaging brand experience.",
    solution: "I built a dynamic Framer website with clear navigation pathways for both students and companies. Event listings are organized by city and type, company profiles showcase partnership opportunities, and the design emphasizes the community-driven nature of the initiative. Interactive elements enhance engagement while the responsive design ensures accessibility across devices.",
    results: "The redesigned website improved event registration rates and made it easier for companies to understand and engage with Bonding's partnership opportunities.",
    key_features: ['Multi-city event management', 'Company partnership portal', 'Student community hub', 'Event registration system', 'Chapter-specific content', 'Career resource library'],
    tags: ['Web Development', 'Framer', 'Education and Career Development'],
    tech_stack: ['Framer', 'Framer CMS', 'Custom Components'],
    industry: 'Education & Career Development',
    live_url: 'https://bonding.de/',
    thumbnail_url: '/img/works/Bonding.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 11,
  },
  {
    slug: 'altshare',
    title: 'Altshare',
    short_description: 'An equity management SaaS platform built in Webflow for entrepreneurs to manage cap tables and valuations.',
    full_description: "Altshare is a financial technology platform that helps entrepreneurs manage equity, cap tables, and 409A valuations. I developed their marketing website in Webflow, creating a professional SaaS landing experience that communicates complex financial concepts in an accessible way.",
    challenge: "Equity management is inherently complex. Altshare needed a website that could simplify the concept of cap table management and 409A valuations for founders who may not have a financial background, while still appearing credible to investors and advisors.",
    solution: 'I developed a clean, focused Webflow website that uses progressive disclosure to explain features. The homepage leads with the core value proposition — "focus on building your business" — and progressively reveals the depth of the platform. Automated features like cap table management and valuation reports are presented as time-saving benefits rather than technical features.',
    results: 'The website effectively reduced the perceived complexity of equity management, contributing to improved signup rates. The clear comparison of plans and transparent pricing built trust with potential customers.',
    key_features: ['Progressive feature disclosure', 'Plan comparison tables', 'Automated cap table preview', '409A valuation explainer', 'Investor-ready design', 'Integration showcase'],
    tags: ['Web Development', 'Webflow', 'Financial Technology'],
    tech_stack: ['Webflow', 'Custom Interactions', 'CMS'],
    industry: 'Financial Technology',
    live_url: 'https://altshare.com/',
    thumbnail_url: '/img/works/altshare.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 12,
  },
  {
    slug: 'dcgmwa',
    title: 'DCGMWA',
    short_description: 'A gospel music community hub celebrating the DC Chapter of the Gospel Music Workshop of America.',
    full_description: "The DC Chapter of the Gospel Music Workshop of America (DCGMWA) is a storied organization preserving and promoting gospel music. I designed the UI in Figma and developed the website in WordPress, creating a digital home that celebrates their rich history and engages their community.",
    challenge: "DCGMWA had a wealth of history and content but no modern digital presence. The website needed to honor the organization's legacy while making it accessible to both longtime members and newcomers to the gospel music community.",
    solution: "I designed a warm, welcoming Figma UI and translated it into a WordPress site with intuitive navigation. The site highlights the organization's history, upcoming events, and the DC Chapter's achievements. A media gallery showcases performances and gatherings, while the membership section encourages community participation.",
    results: "The website successfully brought DCGMWA's legacy online, providing a central hub for community engagement, event announcements, and historical preservation.",
    key_features: ['Rich history timeline', 'Event calendar', 'Media gallery', 'Membership portal', 'Community news feed', 'Responsive worship-ready design'],
    tags: ['Web Design', 'Web Development', 'Figma', 'WordPress', 'Music'],
    tech_stack: ['Figma', 'WordPress', 'Custom Theme', 'Events Plugin'],
    industry: 'Music & Community Organization',
    live_url: 'https://www.figma.com/design/p3g494xQiQOSFOkIcNd6gz/DCGWMA',
    thumbnail_url: '/img/works/DCGWMA.webp',
    gallery_urls: [],
    year: '2022',
    is_featured: false,
    display_order: 13,
  },
  {
    slug: 'buildoor',
    title: 'Buildoor',
    short_description: 'A blockchain dApp engagement platform designed in Figma and built in Webflow for the Web3 ecosystem.',
    full_description: "Buildoor is a Web3 platform focused on revolutionizing decentralized application (dApp) engagement through guided journeys and on-chain profiling. I designed the UI in Figma and developed the marketing website in Webflow, creating a visually appealing gateway to the Web3 ecosystem.",
    challenge: "The Web3 space is notoriously difficult to explain to mainstream audiences. Buildoor needed a website that could make concepts like on-chain profiling and guided dApp journeys feel approachable and exciting rather than intimidating.",
    solution: "I created a futuristic yet clean design in Figma with dynamic visuals that evoke blockchain's innovative nature without overwhelming visitors. The Webflow implementation features smooth animations, clear feature explanations using analogy-based copywriting, and a streamlined onboarding flow that reduces friction.",
    results: 'The website effectively bridged the gap between Web3 complexity and user-friendly presentation, helping Buildoor attract both crypto-native and mainstream users.',
    key_features: ['Web3-native design language', 'Guided journey showcase', 'On-chain profiling explainer', 'Wallet connection CTA', 'Animated feature demos', 'Partnership showcase'],
    tags: ['Web Development', 'Figma', 'Webflow', 'Blockchain and Cryptocurrency'],
    tech_stack: ['Figma', 'Webflow', 'Custom Interactions', 'Web3 Integrations'],
    industry: 'Blockchain & Cryptocurrency',
    live_url: 'https://buildoor.xyz/',
    thumbnail_url: '/img/works/Buildoor.webp',
    gallery_urls: [],
    year: '2023',
    is_featured: false,
    display_order: 14,
  },
]

async function seedProjects() {
  const connected = await testConnection()
  if (!connected) {
    console.log('')
    console.log('❗ After creating the table, run this script again to seed the data.')
    process.exit(1)
  }

  // Check if projects already exist
  const { data: existing } = await supabase.from('projects').select('slug')
  if (existing && existing.length > 0) {
    console.log(`⚠️  Found ${existing.length} existing projects. Clearing and re-seeding...`)
    const { error: deleteError } = await supabase.from('projects').delete().neq('slug', '')
    if (deleteError) {
      console.log('❌ Error clearing projects:', deleteError.message)
      process.exit(1)
    }
    console.log('🗑️  Cleared existing projects.')
  }

  console.log('📦 Inserting 14 projects...')
  const { data, error } = await supabase.from('projects').insert(projects).select()

  if (error) {
    console.log('❌ Error inserting projects:', error.message)
    console.log('Details:', error)
    process.exit(1)
  }

  console.log(`✅ Successfully inserted ${data.length} projects!`)
  console.log('')
  data.forEach(p => console.log(`   ✓ ${p.title} → /work/${p.slug}`))
  console.log('')
  console.log('🎉 Supabase is now populated! Your website will fetch projects from the database.')
}

seedProjects()
