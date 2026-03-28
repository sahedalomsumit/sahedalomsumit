import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'

const faqs = [
  {
    question: 'What services do you actually provide?',
    answer: 'I specialize in creating websites that feel alive. That covers everything from Vibe Web Design (UI/UX) to Full-Stack Development using tools like React, Webflow, and WordPress. I also build AI Automation systems using Make.com, n8n, and custom APIs to make your business processes run on autopilot.'
  },
  {
    question: 'How long does a typical website project take?',
    answer: 'It usually takes between 2 to 6 weeks, depending on the complexity of the project. A standard landing page might take a couple of weeks, whereas a fully custom web application with CMS and animations will take longer. We establish a clear timeline during the DISCOVERY phase.'
  },
  {
    question: 'Do you only use no-code tools like Webflow?',
    answer: 'Not at all. While I love Webflow and WordPress for their speed and client-friendly CMS, I am also a seasoned developer. I frequently build custom web apps using React, Node.js, Tailwind CSS, and database solutions like Supabase or SQL when a project requires highly custom functionality.'
  },
  {
    question: 'How do you handle AI automation for my business?',
    answer: 'I look at your repetitive, manual tasks and build intelligent workflows to connect your apps. Whether it is automatically generating client reports, syncing CRM data, or building AI-assisted content pipelines, I use platforms like Zapier, Make.com, and Claude to save you hours of work each week.'
  },
  {
    question: 'What is your payment structure?',
    answer: 'For most projects, I work on a standard 50% upfront deposit to secure your slot in my schedule, with the remaining 50% due upon final approval before the website goes live. For larger, ongoing systems, we can arrange milestone-based payments.'
  }
]

function FaqItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="bento-card p-6 md:p-8 cursor-pointer border border-white/5 bg-[#0a0a0a] hover:bg-[#111] transition-colors"
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(!isOpen); } }}
    >
      <div className="flex items-center justify-between text-xl md:text-2xl font-bold text-white uppercase outline-none">
        <span>{faq.question}</span>
        <span 
          className={`text-emerald-500 text-3xl transition-transform duration-500 ml-4 font-light ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </div>
      <div 
        className="grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <article className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed font-light border-t border-white/5 pt-6">
            <p>{faq.answer}</p>
          </article>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <>
      <main className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
        <RevealOnScroll>
          <header className="mb-16 text-center">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center justify-center gap-2">
               <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
               <span>/</span>
               <span className="text-white">FAQs</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-4">Knowledge_Base</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
              Frequently Asked<br /><span className="text-violet-500">Questions</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg mx-auto max-w-2xl font-light">
              Everything you need to know about my process, services, and how we can work together to build something that just feels right.
            </p>
          </header>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="space-y-6" aria-label="Frequently Asked Questions">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </section>
        </RevealOnScroll>
      </main>
      <ContactSection />
    </>
  )
}
