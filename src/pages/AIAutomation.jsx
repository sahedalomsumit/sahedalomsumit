import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'

const useCases = [
  { icon: '⬡', title: 'Lead Generation & CRM Workflows', desc: 'Auto-qualify leads, send personalized follow-ups, and push data into your CRM — without lifting a finger after setup.' },
  { icon: '◻', title: 'Content Pipelines', desc: 'AI-generated drafts, auto-publishing, and multi-channel distribution pipelines that produce at scale without burning out your team.' },
  { icon: '◈', title: 'Client Onboarding Automation', desc: 'Form submission → welcome email → contract sent → folder created → Slack notified. All automated, all instant.' },
  { icon: '◉', title: 'AI Chatbots & Assistants', desc: 'Custom GPT and Claude-powered assistants trained on your business data — for support, sales, or internal use.' },
  { icon: '▦', title: 'Data Sync & Integrations', desc: 'Connect your SaaS stack. Google Sheets, Notion, Airtable, HubSpot, Stripe — synced and flowing without manual exports.' },
  { icon: '◌', title: 'Notification & Alert Systems', desc: 'Real-time Slack, email, or SMS alerts triggered by business events — from new signups to payment failures.' },
]

const tools = [
  { name: 'Make.com', desc: 'Visual automation builder for complex multi-step flows.', color: 'violet' },
  { name: 'n8n', desc: 'Self-hosted, code-friendly workflows for advanced automation.', color: 'emerald' },
  { name: 'Zapier', desc: 'Rapid prototyping and simple trigger-action automations.', color: 'violet' },
  { name: 'Claude / GPT-4', desc: 'AI reasoning, content generation, and decision logic embedded in flows.', color: 'emerald' },
  { name: 'Gemini API', desc: 'Multimodal AI for vision, text, and structured data tasks.', color: 'violet' },
  { name: 'Supabase Functions', desc: 'Serverless edge functions for custom automation triggers.', color: 'emerald' },
]

const process = [
  { num: '01', title: 'Workflow Audit', desc: 'I map your current manual processes and identify the highest-impact areas to automate first.' },
  { num: '02', title: 'Tool Selection', desc: 'Based on your stack, budget, and complexity — I pick the right automation platform for the job.' },
  { num: '03', title: 'Flow Architecture', desc: 'Trigger → Logic → Action. Every automation is designed to be readable, maintainable, and error-handled.' },
  { num: '04', title: 'Build & Test', desc: 'Automations built with real data, tested across edge cases, and documented so you understand what\'s running.' },
  { num: '05', title: 'Monitor & Iterate', desc: 'Live monitoring, error alerts, and iterative improvements as your business workflows evolve.' },
]

const skills = ['Make.com', 'n8n', 'Zapier', 'Claude API', 'OpenAI GPT-4', 'Gemini API', 'Prompt Engineering', 'AI Workflows', 'Webhook Design', 'API Integration', 'Supabase Edge Functions', 'Airtable', 'Notion API', 'Google Sheets API', 'HubSpot', 'Stripe Webhooks']

const related = [
  { slug: 'custom-development', title: 'Custom Development', label: 'Custom_Module' },
  { slug: 'seo-optimization', title: 'SEO & Optimization', label: 'SEO_Module' },
  { slug: 'webflow-development', title: 'Webflow Development', label: 'Webflow_Module' },
]

export default function AIAutomation() {
  useSEO({
    title: 'AI Automation Services | Make.com, n8n, Zapier',
    description: 'AI automation and workflow design using Make.com, n8n, Zapier, Claude, and GPT-4. Build systems that work while you sleep.',
    canonical: '/services/ai-automation',
  })

  return (
    <>
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-emerald-500 transition">Services</Link>
              <span>/</span>
              <span className="text-white">AI Automation</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-6">AI_Automation_Module // 06</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              AI<br /><span className="text-emerald-500">Automation_</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
              Your best team member doesn't sleep, doesn't make typos, and never misses a follow-up. I build AI-powered automation workflows that handle the repetitive work — so your team focuses on what actually matters.
            </p>

            {/* Live vibe badge */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Vibe Automation · Active</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="/portfolio" className="px-8 py-3 bg-emerald-500 text-black font-black rounded-full text-xs tracking-[0.2em] hover:bg-white transition-all uppercase">
                See AI Projects
              </Link>
              <Link to="/quote"
                className="px-8 py-3 bento-card text-white font-bold rounded-full text-xs tracking-[0.2em] hover:border-emerald-500 transition-all uppercase">
                Get a Quote
              </Link>
            </div>
          </header>
        </RevealOnScroll>

        {/* Use Cases */}
        <RevealOnScroll>
          <div className="block sm:flex items-center justify-between mb-10 border-b border-white/5 pb-6">
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase">What_I_Automate</h2>
            <span className="font-mono text-xs text-emerald-500">06_USE_CASES</span>
          </div>
        </RevealOnScroll>
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((d, i) => (
            <RevealOnScroll key={d.title} delay={i * 0.07}>
              <div className="bento-card p-8 group border-emerald-500/10 bg-emerald-500/5 hover:border-emerald-500/40 h-full">
                <div className="text-emerald-400 text-3xl mb-5 font-mono">{d.icon}</div>
                <h3 className="text-base font-bold text-white mb-3 uppercase tracking-tight">{d.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{d.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Tool cards */}
        <RevealOnScroll>
          <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6">/ Automation_Stack</div>
        </RevealOnScroll>
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t, i) => (
            <RevealOnScroll key={t.name} delay={i * 0.07}>
              <div className={`bento-card p-6 border-${t.color}-500/20 bg-${t.color}-500/5 hover:border-${t.color}-500/40 h-full`}>
                <div className={`font-mono text-${t.color}-400 text-sm font-black mb-2 uppercase tracking-tight`}>{t.name}</div>
                <p className="text-gray-400 text-xs leading-relaxed font-light">{t.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Process */}
        <RevealOnScroll>
          <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-4">/ Automation_Process</div>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase mb-10">How It Works_</h2>
        </RevealOnScroll>
        <div className="mb-20 space-y-4">
          {process.map((p, i) => (
            <RevealOnScroll key={p.num} delay={i * 0.08}>
              <div className="bento-card p-8 flex flex-col md:flex-row md:items-center gap-6 group hover:border-emerald-500/40">
                <div className="font-mono text-emerald-500/30 text-4xl font-black group-hover:text-emerald-500/60 transition-colors shrink-0 w-16">{p.num}_</div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{p.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Skills */}
        <RevealOnScroll>
          <div className="bento-card p-8 mb-20 border-emerald-500/10 bg-emerald-500/5">
            <div className="font-mono text-emerald-400 text-[10px] uppercase tracking-widest mb-8">/ AI_Toolkit</div>
            <div className="flex flex-wrap gap-2">
              {skills.map((t) => (
                <span key={t} className="skill-tag hover:border-emerald-500">{t}</span>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Related */}
        <RevealOnScroll>
          <div className="font-mono text-gray-500 text-[10px] uppercase tracking-widest mb-6">/ Related_Services</div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r, i) => (
            <RevealOnScroll key={r.slug} delay={i * 0.08}>
              <Link to={`/services/${r.slug}`} className="bento-card p-6 flex items-center justify-between group hover:border-emerald-500/40">
                <div>
                  <div className="font-mono text-emerald-400 text-[9px] uppercase tracking-widest mb-1">/ {r.label}</div>
                  <div className="text-white font-bold text-sm">{r.title}</div>
                </div>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
