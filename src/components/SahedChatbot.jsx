import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";

// ════════════════════════════════════════════════════
//  🤖 AI CONFIGURATION
//  Now secured via Supabase Edge Functions
// ════════════════════════════════════════════════════
const GEMINI_MODEL = "gemini-2.5-flash-lite"; // Managed in Supabase Secrets

// ════════════════════════════════════════════════════
//  📄  SOURCE 1 — FAQ DOCUMENT (primary source)
//  Full content of your Google Doc FAQ.
//  Edit/extend whenever you update the doc.
// ════════════════════════════════════════════════════
const FAQ_SOURCE = `
=== FAQ DOCUMENT (Primary Source) ===

GENERAL & BACKGROUND
Q: Who are you and what do you do? (Tell me about yourself)
A: I am Sahed Alom Sumit, a Vibe Web Designer & Developer and AI Automation Expert based in Helsinki, Finland. I build high-performance, accessible, and visually stunning websites.

Q: Where are you based?
A: Helsinki, Finland. Clients across 10+ countries — USA, UK, Europe, Canada, Switzerland.

Q: What is your educational background?
A: B.B.A. in Business Information Technology from Haaga-Helia University of Applied Sciences (Graduated 2025, GPA: 3.57). Thesis: "The Future of No-code Web Development: Evaluating the Potential and Limitations of Webflow."

Q: What languages do you speak?
A: English (Full Professional), Bengali (Native/Bilingual), Hindi/Urdu (Professional Working).

Q: What does "Vibe Web Designer & Developer" mean?
A: Equal focus on aesthetic "vibe" (UI/UX) and technical perfection (clean code). Every site hits 100/100 on Performance, Accessibility, Best Practices, and SEO on Google PageSpeed Insights.

Q: What is your personal motto?
A: "Vibe web design. Clean development. AI automation that actually makes sense."

Q: What makes you different from other web designers?
A: (1) Design sense + real development skills from Figma to deployed product. (2) Consistent 100/100 PageSpeed scores. (3) AI automation integration.

SERVICES & EXPERTISE
Q: What services do you provide?
A: Vibe Web Design (UI/UX), Full-Stack Development (React, Webflow, Framer, WordPress, Kajabi), AI Automation (Make.com, Zapier, n8n, Claude Code, custom APIs), Figma/PSD/XD to live website conversion, eCommerce (WooCommerce, Shopify), SEO & Speed Optimization, Custom Web Apps.

Q: What platforms and tech stacks do you specialize in?
A: Webflow, WordPress, Framer, Kajabi. Custom dev: React, Node.js, Tailwind CSS, HTML, CSS, JavaScript, Supabase, SQL, GSAP, Spline 3D and more. Design: Figma. AI: Claude Code, Antigravity (Google DeepMind), ChatGPT Pro.

Q: Do you only use no-code tools?
A: No. I build fully custom web apps with React, Node.js, Tailwind CSS, JavaScript, and Supabase when needed. My own portfolio is a custom React app with Supabase backend.

Q: Can you help with AI automation?
A: Yes! I build intelligent workflows using Make.com, Zapier, n8n, Claude Code, and Antigravity — CRM syncing, content pipelines, client reporting, and more.

Q: Are you experienced in eCommerce?
A: Absolutely. WooCommerce expert. Notable: TwinTwo (retail marketplace), e-service.parts (UK's first independent spares specialist with complex custom filtering), JamesCrossing, Shopify stores.

Q: Do you build WordPress sites?
A: Yes. Elementor, WooCommerce, Crocoblock, complex CMS integrations, high-performance builds.

Q: Do you offer Webflow development?
A: Yes! 70+ Webflow projects, Webflow 101 certified. Design, development, GSAP/Spline 3D, CMS, responsive, SEO.

Q: Do you offer Framer website development?
A: Yes! Custom Framer websites, components, smooth animations, responsive designs — great for marketing sites.

Q: Can you convert Figma to a live website?
A: Yes! Pixel-perfect Figma/PSD/XD/Sketch to Webflow, WordPress, Framer, or custom React/HTML/CSS.

Q: Do you offer SEO services?
A: SEO is built into every project — meta tags, semantic HTML, Core Web Vitals, speed optimization, JSON-LD structured data, image compression. 100/100 SEO scores on every delivery.

Q: Do you build custom web applications?
A: Yes. React, Node.js, Tailwind CSS, Supabase, SQL — full custom apps when no-code isn't the right fit.

DESIGN & DEVELOPMENT PROCESS
Q: What is your design process?
A: 8 steps: (1) Discovery, (2) Research & Solution, (3) Gather Content, (4) Design System & Components, (5) Wireframing, (6) Visual Design in Figma, (7) Prototyping, (8) Developer Handoff.

Q: What is your development process?
A: 8 steps: (1) Style Guide Setup, (2) Client-First Variables, (3) Components & Layouts, (4) Wireframes to Layout, (5) Visual Design Implementation, (6) Animations & Interactions (GSAP/Framer Motion), (7) SEO & Speed Optimization, (8) Domain & Launch with post-launch support.

Q: How long does a project take?
A: Depends on complexity. Landing page: a few days. Small business website: 1-4 weeks. Full custom website takes longer. Clear timeline set after scoping.

EXPERIENCE & PORTFOLIO
Q: How much experience do you have?
A: 5+ years, 150+ websites, clients across 10+ countries. Top Rated on Upwork (100% Job Success Score), Level 2 Seller on Fiverr (4.9 stars, 80+ projects, 57 reviews). Worked at 3 agencies.

Q: What notable projects have you worked on?
A: e-service.parts (UK's first independent spares specialist — complex WordPress filter), TwinTwo (retail marketplace), Ongaro Metodo (health & wellness Webflow site), Ovulio Baby (fertility app marketing site), Innovation Alliance (global consulting Webflow), Notifi (CRM/SaaS marketing site), James Crossing (European fabrics WordPress), Antico Gusto (restaurant website), Blue Water (luxury towel digital catalog).

Q: What certifications do you have?
A: 8 certifications: AI-3D Render Course (2025), Google UX Design Professional Certificate (Coursera, 2024), Master HTML & CSS (Udemy, 2024), Design Sprint Days (Alma Talent Oy, 2024), Responsive Web Design (FreeCodeCamp, 2023), Webflow 101 (Webflow University, 2023), Web Design & Development (LEDP, 2020), Verified Freelancer Certificate (Bangladesh Gov, valid 2026–2029).

Q: Where have you worked professionally?
A: Fiverr (2020–present), Upwork (2021–present), UI/UX Designer at Vesko (part-time, 2024–2025), No-Code Web Designer at Artic Maze (full-time, 2022–2024), Webflow Developer at Sixforces (40+ projects, 2023).

Q: What is your repeat client rate?
A: 40% — nearly half my clients return for more projects.

PRICING, PAYMENT & AVAILABILITY
Q: What is your hourly rate?
A: €30/hour direct. ~$40/hour on Upwork (10% cut). ~$45/hour on Fiverr (20% cut).

Q: How much does a 5-page website cost?
A: 58–108 hours total at €30/h = €1,740–3,240 (design+development). Fixed price: ~€2,500.

Q: How much does a landing page cost?
A: 18–28 hours at €30/h = €540–840 (design+development). Fixed price: ~€700.

Q: How much does a large website cost?
A: It depends on the number of pages and the complexity of the website. I will estimate the cost after understanding your requirements and how many hours it will take at €30/h.

Q: What is your payment structure?
A: 50% upfront to secure your slot, 50% on final approval(depends on hours it can be less or more). Milestone payments for larger projects.

Q: What payment methods do you accept?
A: Wise/Revolut, Stripe, PayPal, Cryptocurrency (USDT, Bitcoin, Ethereum, Solana), Fiverr/Upwork escrow.

Q: Do you issue invoices?
A: Yes. Invoices for all payments. EU B2B: reverse charge mechanism. Non-EU: no VAT.

Q: Are you available for new projects?
A: Yes! Currently taking on new projects and freelance collaborations.

Q: Do you work with agencies?
A: Yes! Full-time at Artic Maze (2 years), 40+ projects at Sixforces, regular agency partnerships.

Q: Can you work in my time zone?
A: Absolutely. Based in Finland (UTC+2/+3) but flexible with any time zone.

CONTACT & COMMUNICATION
Q: How can I hire you or contact you?
A: Email: sahedalomsumit@gmail.com | WhatsApp: +358 41 576 5539 (preferred) | LinkedIn: linkedin.com/in/sahedalomsumit | Upwork: upwork.com/freelancers/~0109ec295b78baac26 | Fiverr: fiverr.com/sellers/sahedalomsumit | Portfolio: sahedalomsumit.com

Q: How can I get in touch?
A: Email: sahedalomsumit@gmail.com | WhatsApp: +358 41 576 5539 (preferred) | You can also find linkedin, telegram, facebook, instagram links in the footer.

Q: What platform do you prefer to communicate on?
A: WhatsApp (+358 41 576 5539) for fast, regular comms.

Q: What is your response time?
A: Typically within 1 hour.

Q: Do you sign NDAs or contracts?
A: Absolutely. Happy to sign NDAs and contracts to protect your IP.

Q: Can I see work-in-progress?
A: Yes! Regular Figma design reviews, staging previews, and weekly updates throughout the project.

Q: Do you provide a warranty?
A: Yes. 2-week post-launch bug-fix support included. Retainer arrangements available beyond that.

Q: What do you need from me to start?
A: Design only: goals, content, brand assets, references. Development only: final design files, platform access, content, integrations. Full project: goals, brand assets, content, required features, sitemap. I'll guide you if anything is missing.

Q: Do you work as part of a team?
A: Yes. Comfortable with Slack, Teams, Notion, Jira. Worked in teams at Vesko and Sixforces.

TOOLS & TECHNOLOGY
Q: What AI tools do you use?
A: Claude Code, Antigravity (Google DeepMind), ChatGPT Pro, Stitch, Make.com, n8n, Zapier. Skills: AI-Assisted Design, Prompt Engineering, AI Content Workflows, Vibe Coding, AI UI Generation, Automated Testing.

Q: What animation tools do you use?
A: GSAP, Framer Motion, Spline 3D, CSS animations/transitions. All accessible, respecting prefers-reduced-motion.

Q: What design tools do you use?
A: Figma.

Q: What CMS platforms do you work with?
A: Webflow CMS, WordPress, Framer CMS, Kajabi, custom Supabase backends.

Q: Do you use Git/version control?
A: Yes. Git and GitHub, component-based architecture, mobile-first responsive design, CI/CD and GitHub Pages.
`;

// ════════════════════════════════════════════════════
//  🌐  SOURCE 2 — WEBSITE DATA (secondary source)
//  Key content from sahedalomsumit.com that supplements the FAQ.
//  Update this if your site content changes.
// ════════════════════════════════════════════════════
const WEBSITE_SOURCE = `
=== PORTFOLIO WEBSITE DATA (Secondary Source) ===
Source: sahedalomsumit.com

HERO / POSITIONING
- Title: Vibe Web Designer, Developer & AI Automation Expert
- Tagline: "Where good design meets purposeful code — I build digital experiences that just feel right."
- Based in Helsinki, Finland
- 5+ years | 150+ websites | 10+ countries | Top Rated Upwork | Level 2 Fiverr Seller

SERVICES (from site)
1. Vibe Web Design — UI/UX, Figma wireframes, prototyping, design systems
2. Website Development — Webflow, WordPress, Framer, Kajabi, React
3. AI Automation — Make.com, n8n, Zapier, Claude Code, custom API workflows
4. eCommerce — WooCommerce, Shopify, product filtering, checkout optimization
5. SEO & Performance — 100/100 PageSpeed, Core Web Vitals, structured data
6. Custom Web Apps — React, Node.js, Supabase, full-stack

TECH STACK (from site)
Webflow · WordPress · Framer · React · Figma · GSAP · Spline 3D · Supabase · Tailwind CSS · Make.com · n8n · Zapier · Claude Code · Antigravity · Stitch

PORTFOLIO PROJECTS (from site)
- e-service.parts: WordPress WooCommerce with complex parts filtering
- TwinTwo: Retail merchandise marketplace
- Ongaro Metodo: Health & wellness Webflow site
- Ovulio Baby: Fertility app marketing site
- Innovation Alliance: Global consulting Webflow site
- Notifi: SaaS/CRM marketing site
- James Crossing: European fabrics WordPress site
- Antico Gusto: Restaurant website
- Blue Water: Luxury towel digital catalog

TESTIMONIALS (from site)
- Rahil Khan (Founder, Artic Maze): Worked on several projects, always amazing work in Webflow and WordPress.
- Leo Fadi (Founder, Vesko): Worked with Sahed on Vesko's UI/UX development.
- Upwork clients: "most hard-working and committed," "amazing work," "high level of detail and care."

STATS (from site)
150+ websites | 5+ years | 10+ countries | 100% Job Success (Upwork) | 4.9 stars (Fiverr) | 40% repeat client rate

CONTACT (from site)
sahedalomsumit@gmail.com | WhatsApp: +358 41 576 5539
linkedin.com/in/sahedalomsumit | fiverr.com/sellers/sahedalomsumit
upwork.com/freelancers/~0109ec295b78baac26
instagram/facebook/telegram: @sahedalomsumit
`;

// ════════════════════════════════════════════════════
//  🤖  SYSTEM PROMPT
//  Controls bot behavior, source priority, and tone.
//  ✏️  Safe to edit tone/rules. Don't remove SOURCE tags.
// ════════════════════════════════════════════════════
const SYSTEM_PROMPT = `
You are Sahed's Bot — a smart, friendly portfolio assistant for Sahed Alom Sumit.

YOUR ANSWER PRIORITY (strict — follow this exact order every time):

━━━ STEP 1: CHECK FAQ DOCUMENT FIRST ━━━
The FAQ Document is your PRIMARY source. It has detailed answers on services, pricing, process, platforms, experience, and contact info.
Use Gemini's intelligence for fuzzy matching — "how much do you charge" matches "What is your hourly rate?", "what tools do you use" matches "What platforms do you specialize in?", etc.
If the question is similar to anything in the FAQ, answer from there. Exact wording match is NOT required.

━━━ STEP 2: CHECK WEBSITE DATA SECOND ━━━
If the FAQ has no relevant answer, check the Website Data section.
It covers portfolio projects, testimonials, stats, and services shown on the live site.
Use this if it helps answer the visitor's question.

━━━ STEP 3: CONTACT FALLBACK (only if steps 1 and 2 both fail) ━━━
If the question is completely unrelated to Sahed's work, services, background, or portfolio — do NOT make things up.
Reply warmly like: "That's a bit outside what I can help with here! For anything specific, feel free to reach Sahed directly at sahedalomsumit@gmail.com or WhatsApp +358 41 576 5539 — he usually replies within an hour. 😊"

━━━ TONE RULES ━━━
- Short answers: 2–4 sentences unless more detail is clearly needed
- Friendly, warm, confident — like a knowledgeable colleague
- Use "Sahed" (not "I" — you are the bot, not Sahed)
- End with a soft CTA when natural (e.g. "Want to start a project? Reach out on WhatsApp!")
- Never say "I don't know" — always either answer from sources or use the contact fallback
- Keep multi-turn conversation context in mind — if a visitor follows up, connect it to the previous exchange

━━━ FORMATTING RULES ━━━
- IMPORTANT: Never use Markdown (no **bold**, # header, * list)
- For formatting, use basic HTML: <b>bold</b>, <i>italic</i>, <br> for new lines
- For lists, use bullets (•) or numbered lists

━━━ SOURCE TAGGING (internal — strip from visible reply) ━━━
After every answer, on a NEW LINE, write exactly one of:
[SOURCE:faq] — answer came from FAQ Document
[SOURCE:website] — answer came from Website Data
[SOURCE:fallback] — used contact fallback

---

${FAQ_SOURCE}

---

${WEBSITE_SOURCE}
`;

// ════════════════════════════════════════════════════
//  💬  SUGGESTION CHIPS — Curated from FAQ
// ════════════════════════════════════════════════════
const SUGGESTIONS = [
  "Tell me about yourself",
  "'Vibe Web Designer & Developer' mean?",
  "What services do you offer?",
  "What is your hourly rate?",
  "How much does a website cost(design+dev)?",
  "What's your tech stack?",
  "What's your payment structure?",
  "Are you available for hiring?",
  "How can I get in touch?",
  "What is your response time?"
];



const fmt = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ════════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════════
export default function SahedChatbot() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [activeSource, setActiveSource] = useState(null);
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hey! 👋 I'm Sahed's AI Assistant. <br>Feel free to ask me anything about his services, pricing, payment options, availability, projects, or how to get in touch.",
      time: fmt(new Date()),
    },
  ]);

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 100) + "px";
  }, [input]);



  // ── Send to Gemini ──────────────────────────────
  const sendMessage = async (text) => {
    const q = text.trim();
    if (!q || loading) return;

    const now = fmt(new Date());
    setMessages((m) => [...m, { role: "user", text: q, time: now }]);
    setInput("");
    setLoading(true);
    setActiveSource(null);

    // Append internal source-tagging instruction to the question
    const augmented = `${q}

[INTERNAL INSTRUCTION — do not show this line to the user]
After your answer, on a new line write exactly one tag:
[SOURCE:faq] if answer came from FAQ Document
[SOURCE:website] if answer came from Website Data
[SOURCE:fallback] if you used the contact fallback`;

    const turnHistory = [
      ...history,
      { role: "user", parts: [{ text: augmented }] },
    ];

    try {
      const { data: edgeData, error: edgeError } = await supabase.functions.invoke('gemini-chatbot', {
        body: {
          model: GEMINI_MODEL,
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: turnHistory,
          generationConfig: {
            temperature: 0.65,
            maxOutputTokens: 500,
          },
        },
      });

      if (edgeError) throw new Error(edgeError.message || "Edge Function error");

      const data = edgeData;

      const rawReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Extract [SOURCE:...] tag and strip it from visible reply
      let source = "faq";
      const match = rawReply.match(/\[SOURCE:(faq|website|fallback)\]/i);
      if (match) source = match[1].toLowerCase();
      const cleanReply = rawReply
        .replace(/\[SOURCE:(faq|website|fallback)\]/gi, "")
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold
        .replace(/\*(.*?)\*/g, "<i>$1</i>")  // Italic
        .replace(/\n/g, "<br>")              // Newlines
        .trim();

      setActiveSource(source);
      setMessages((m) => [
        ...m,
        { role: "bot", text: cleanReply, time: fmt(new Date()), source },
      ]);

      // Save clean turn to history (without the internal instruction)
      setHistory((h) => [
        ...h,
        { role: "user", parts: [{ text: q }] },
        { role: "model", parts: [{ text: cleanReply }] },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: `⚠️ ${err.message || "Something went wrong. Please try again."}`,
          time: fmt(new Date()),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const sourceMeta = {
    faq: { label: "📄 FAQ", tip: "Answered from FAQ doc" },
    website: { label: "🌐 Website", tip: "Answered from portfolio site" },
    fallback: { label: "📬 Contact", tip: "Redirected to Sahed" },
  };

  // ── RENDER ──────────────────────────────────────
  return (
    <div className="fixed bottom-[26px] right-[26px] z-[99999]">
      {open && (
        <div
          className="absolute bottom-[70px] right-0 w-[385px] h-[590px] bento-card flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
          style={{ background: "rgb(0 0 0 / 50%)" }}
        >

          {/* Header */}
          <div className="p-4 px-[18px] bg-[#15151f] border-b border-white/10 flex items-center gap-[11px] shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c6dfa] to-[#c084fc] flex items-center justify-center font-bold text-[13px] text-white font-mono"><img src="/img/ask-sahed-icon-only-sahedalomsumit.svg" alt="" /></div>
            <div className="flex-1">
              <div className="font-bold text-sm text-[#eeeef5] tracking-wide mono">Ask Sahed</div>
              <div className="text-[11px] text-[#6e6e88] mt-0.5 flex items-center gap-1.5 font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                Sahed's AI Assistant · Always Online
              </div>
            </div>
            <button className="p-1.5 rounded-lg text-[#6e6e88] hover:text-[#eeeef5] hover:bg-[#1e1e2c] transition-all" onClick={() => setOpen(false)} aria-label="Close">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Source indicator — shows which source answered */}
          {activeSource && (
            <div className="pt-2 px-4 flex gap-1.5 items-center shrink-0">
              {Object.entries(sourceMeta).map(([key, { label }]) => (
                <span
                  key={key}
                  className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all font-medium tracking-tight ${activeSource === key ? "text-[#c084fc] border-[#7c6dfa] bg-[#7c6dfa]/10" : "border-white/10 text-[#6e6e88] bg-[#1e1e2c]"}`}
                  title={sourceMeta[key].tip}
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 pb-2.5 flex flex-col gap-3 scroll-smooth scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((m, i) => (
              <div key={i}>
                <div className={`flex gap-2 items-end ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === "bot" && <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7c6dfa] to-[#c084fc] flex items-center justify-center font-bold text-[9px] text-white shrink-0 mb-1"><img src="/img/ask-sahed-icon-only-sahedalomsumit.svg" alt="" /></div>}
                  <div className={`max-w-[85%] p-3 px-4 rounded-[18px] text-[13.5px] leading-relaxed break-words ${m.role === 'bot' ? 'bg-[#1e1e2c] text-[#eeeef5] border border-white/10 rounded-bl-[4px]' : 'bg-gradient-to-br from-[#7c6dfa] to-[#c084fc] text-white rounded-br-[4px]'}`} dangerouslySetInnerHTML={{ __html: m.text }} />
                </div>
                <div className={`text-[10px] text-[#6e6e88] mt-1 px-1 ${m.role === "bot" ? "pl-[31px]" : "text-right"}`}>
                  {m.time}
                </div>
                {/* Suggestions pinned to the first message */}
                {i === 0 && (
                  <div className="p-2 pl-[31px] pb-2.5 flex flex-wrap gap-2 shrink-0 animate-in fade-in slide-in-from-bottom-2 delay-300 duration-500">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} className="bg-[#1e1e2c] border border-white/10 text-[#eeeef5] text-[11.5px] px-3.5 py-1.5 rounded-full transition-all hover:bg-[#7c6dfa]/10 hover:border-[#7c6dfa] hover:-translate-y-0.5 font-medium" onClick={() => sendMessage(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-end">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7c6dfa] to-[#c084fc] flex items-center justify-center font-bold text-[9px] text-white shrink-0 mb-1"><img src="/img/ask-sahed-icon-only-sahedalomsumit.svg" alt="" /></div>
                <div className="bg-[#1e1e2c] text-[#eeeef5] border border-white/10 p-3 px-4 rounded-[18px] rounded-bl-[4px]">
                  <div className="flex gap-1.5 items-center py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6e6e88] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6e6e88] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6e6e88] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 px-4 pb-4 bg-[#15151f] border-t border-white/10 flex gap-2.5 items-end shrink-0">
            <div className="flex-1 bg-[#1e1e2c] border border-white/10 rounded-xl focus-within:border-[#7c6dfa]/50 transition-colors duration-200 overflow-hidden">
              <textarea
                ref={textareaRef}
                className="block w-full bg-transparent border-none text-[#eeeef5] text-[13.5px] p-2.5 px-3.5 resize-none outline-none max-h-[100px] leading-normal placeholder:text-[#6e6e88]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                rows={1}
                placeholder="Ask me anything…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
              />
            </div>
            <button
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c6dfa] to-[#c084fc] flex items-center justify-center shrink-0 transition-all hover:scale-105 hover:rotate-[-3deg] active:scale-95 disabled:opacity-35 disabled:grayscale"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

        </div>
      )}

      {/* Trigger button */}
      <button className="w-[58px] h-[58px] rounded-full bg-gradient-to-br from-[#7c6dfa] to-[#c084fc] flex items-center justify-center shadow-[0_8px_30px_rgba(124,109,250,0.5)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(124,109,250,0.65)] active:scale-95 relative" onClick={() => setOpen((o) => !o)} aria-label="Open chat">
        <span className="absolute -top-0.5 -right-0.5 w-[14px] h-[14px] rounded-full bg-[#4ade80] border-2 border-[#0d0d14]" />
        {open ? (
          <img src="/img/ask-sahed-icon-only-sahedalomsumit.svg" alt="" />
        ) : (
          <img src="/img/ask-sahed-icon-only-sahedalomsumit.svg" alt="" />
        )}
      </button>
    </div>
  );
}
