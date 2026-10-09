import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { fetchFaqs } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'

function FaqItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false)

  // Auto-detect and format links or emails in answers
  const formattedAnswer = useMemo(() => {
    if (!faq.answer) return ''
    return faq.answer
  }, [faq.answer])

  return (
    <div
      className="bento-card p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsOpen(!isOpen)
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight"
            style={{ color: isOpen ? 'var(--accent-light)' : 'var(--text-main)' }}>
          {faq.question}
        </h3>
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'border-violet-500 bg-violet-500/20 text-violet-300 rotate-180' : 'text-gray-400'
          }`}
          style={{ borderColor: isOpen ? 'var(--accent)' : 'var(--border)' }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div
        className="grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="mt-4 pt-4 text-sm sm:text-base leading-relaxed font-light border-t"
               style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
            <p>{formattedAnswer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useSEO({
    title: 'Frequently Asked Questions & Answers',
    description: `Answers to common questions about working with Sahed Alom Sumit on Webflow, WordPress, React web apps, UI/UX design, and project timelines.`,
    canonical: '/faq',
  })

  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await fetchFaqs()
        setFaqs(data || [])
      } catch (err) {
        console.error('Error fetching FAQs:', err)
      } finally {
        setLoading(false)
      }
    }
    loadFaqs()
  }, [])

  const topics = useMemo(() => {
    return ['All', ...new Set(faqs.map(f => f.topic || 'General').filter(Boolean))]
  }, [faqs])

  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => {
      const matchTopic = activeTab === 'All' || (f.topic || 'General') === activeTab
      const matchQuery =
        !searchQuery ||
        f.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchTopic && matchQuery
    })
  }, [faqs, activeTab, searchQuery])

  return (
    <>
      <main className="py-20 sm:py-24 px-4 max-w-7xl mx-auto min-h-screen">
        <RevealOnScroll>
          <header className="mb-14 text-left">
            <nav aria-label="breadcrumb" className="text-xs tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
              <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-main)' }} className="font-semibold">FAQ</span>
            </nav>

            <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-4 inline-flex">
              Knowledge Base
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight uppercase leading-none mb-6"
                style={{ color: 'var(--text-main)' }}>
              Frequently Asked <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>

            <p className="text-base sm:text-lg max-w-2xl font-light leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
              Everything you need to know about working together, pricing models, project milestones, communication, and ongoing post-launch support.
            </p>

            <div className="site-full-bleed-divider pt-8">
              {/* Search Box */}
              <div className="relative max-w-md mb-8">
                <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search questions (e.g. pricing, timeline, Webflow)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs transition-all outline-none border focus:border-violet-500"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-main)',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 pb-2">
                {topics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(topic)}
                    aria-pressed={activeTab === topic}
                    className={`site-tab-control px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap border ${
                      activeTab === topic
                        ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30'
                        : 'hover:border-white/20'
                    }`}
                    style={activeTab !== topic ? {
                      backgroundColor: 'var(--card-bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)'
                    } : {}}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </header>
        </RevealOnScroll>

        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
            <p className="font-mono text-xs text-violet-400 uppercase tracking-widest">
              Fetching Knowledge Base...
            </p>
          </div>
        ) : (
          <section id="faq-list" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <RevealOnScroll key={faq.id || index} delay={(index % 2) * 0.06}>
                  <FaqItem faq={faq} />
                </RevealOnScroll>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center py-16 border border-dashed rounded-3xl"
                   style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card-bg)' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-main)' }}>
                  No matching questions found
                </p>
                <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
                  Have a specific question? Reach out directly via WhatsApp or email.
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  )
}
