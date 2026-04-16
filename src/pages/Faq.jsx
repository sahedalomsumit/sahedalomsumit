import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { fetchFaqs } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'

function FaqItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="bento-card p-6 md:p-8 cursor-pointer border border-white/5 bg-[#0a0a0a] hover:bg-[#111] transition-colors h-fit"
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(!isOpen); } }}
    >
      <div className="flex items-start justify-between text-lg md:text-xl font-medium text-white outline-none">
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
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')

  useSEO({
    title: 'FAQ',
    description: 'Frequently asked questions about working with Sahed Alom Sumit on web design, development, and AI automation projects.',
    canonical: '/faq',
  })

  useEffect(() => {
    async function loadFaqs() {
      const data = await fetchFaqs()
      setFaqs(data || [])
      setLoading(false)
    }
    loadFaqs()
  }, [])

  const topics = ['All', ...new Set(faqs.map(f => f.topic || 'General'))]

  const filteredFaqs = activeTab === 'All'
    ? faqs
    : faqs.filter(f => (f.topic || 'General') === activeTab)

  const handleTabChange = (topic) => {
    setActiveTab(topic)

    // Smooth scroll back to the start of the FAQ questions (Mobile only)
    if (window.innerWidth < 768) {
      const el = document.getElementById('faq-list')
      if (el) {
        // 180px offset accounts for the sticky Navbar (60px) + sticky mobile dropdown + some padding
        const y = el.getBoundingClientRect().top + window.scrollY - 180
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <main className="py-24 px-4 max-w-7xl mx-auto min-h-screen">
        <RevealOnScroll>
          <header className="mb-16 text-left">
            <nav aria-label="breadcrumb" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-8 flex items-center justify-start gap-2">
              <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
              <span>/</span>
              <span className="text-white">FAQ</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-4">Knowledge_Base</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
              Frequently Asked<br /><span className="text-violet-500">Questions</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg max-w-2xl font-light">
              Everything you need to know about my process, services, and how we can work together to build something that just feels right.
            </p>
          </header>
        </RevealOnScroll>

        {loading ? (
          <div className="text-center font-mono text-emerald-500 uppercase tracking-widest text-xs flex items-center justify-center gap-2 py-20">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            Fetching_Knowledge_Base...
          </div>
        ) : (
          <>
            {/* Mobile Dropdown (Sticky) */}
            <div className="md:hidden sticky top-[60px] z-40 bg-[#0a0a0a]/95 backdrop-blur-xl pb-4 pt-[1.8rem] -mx-4 px-4 mb-8 border-b border-white/5">
              <div className="relative">
                <select
                  value={activeTab}
                  onChange={(e) => handleTabChange(e.target.value)}
                  className="w-full bg-[#111] border border-white/20 text-white text-base py-4 px-4 rounded-xl focus:outline-none focus:border-violet-500 outline-none appearance-none shadow-lg block"
                >
                  {topics.map((topic, i) => (
                    <option key={i} value={topic}>{topic}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-violet-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Desktop Tabs */}
            <RevealOnScroll>
              <div className="hidden md:flex flex-wrap items-center justify-start gap-4 mb-16">
                {topics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => handleTabChange(topic)}
                    className={`px-6 py-3 rounded-xl text-sm md:text-base font-bold transition-all border ${activeTab === topic ? 'bg-violet-500 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'bg-transparent text-gray-300 border-white/20 hover:border-violet-500 hover:text-white'}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </RevealOnScroll>

            <section id="faq-list" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start" aria-label="Frequently Asked Questions">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <RevealOnScroll key={faq.id || index} delay={index * 0.05}>
                    <FaqItem faq={faq} />
                  </RevealOnScroll>
                ))
              ) : (
                <div className="text-gray-400 col-span-1 md:col-span-2 text-center py-10 font-mono text-sm opacity-50">No FAQs available yet.</div>
              )}
            </section>
          </>
        )}
      </main>
      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
