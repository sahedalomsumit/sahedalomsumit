import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText("sahedalomsumit@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        <span className="pill-badge text-violet-400 border-violet-500/20 bg-violet-500/10 mb-4 inline-flex">
          Let's Collaborate
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold mb-6 tracking-tight uppercase leading-[0.95]"
            style={{ color: 'var(--text-main)' }}>
          Ready to build <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
            something unforgettable?
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg mb-12 font-light leading-relaxed"
           style={{ color: 'var(--text-muted)' }}>
          Whether you need an award-grade website from scratch, a high-converting Webflow build, or an AI-automated digital product, I bring passion and engineering precision to every single pixel.
        </p>

        {/* Contact Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
          {/* Email Card */}
          <div className="bento-card p-6 sm:p-8 flex flex-col justify-between group hover:border-violet-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Guaranteed Reply &lt; 12h
                </span>
                <button
                  onClick={copyEmail}
                  className="text-xs font-mono text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {copied ? 'Copied to Clipboard! ✓' : 'Click to Copy'}
                </button>
              </div>

              <a
                href="mailto:sahedalomsumit@gmail.com"
                className="text-lg sm:text-2xl font-bold truncate block group-hover:text-violet-400 transition-colors"
                style={{ color: 'var(--text-main)' }}
              >
                sahedalomsumit@gmail.com
              </a>
            </div>

            <div className="mt-8 pt-4 border-t flex justify-between items-center text-xs font-medium"
                 style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Send project brief</span>
              <span className="text-violet-400 group-hover:translate-x-1 transition-transform">Send Email →</span>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bento-card p-6 sm:p-8 flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
            <a href="https://wa.me/+358415765539" target="_blank" rel="noopener noreferrer" className="h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                </div>

                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    Instant Messaging
                  </span>
                  <span className="text-xs font-mono text-emerald-400">Online</span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold truncate group-hover:text-emerald-400 transition-colors"
                    style={{ color: 'var(--text-main)' }}>
                  +358 41 576 5539
                </h3>
              </div>

              <div className="mt-8 pt-4 border-t flex justify-between items-center text-xs font-medium"
                   style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Quick chat or voice note</span>
                <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">Start WhatsApp Chat →</span>
              </div>
            </a>
          </div>
        </div>

        {/* Primary Estimator Banner */}
        <div className="bento-card p-6 sm:p-10 border relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 text-left"
             style={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}>
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400 font-bold">
              Transparent Pricing & Blueprint
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold" style={{ color: 'var(--text-main)' }}>
              Want an instant timeline & cost estimate?
            </h3>
            <p className="text-sm max-w-lg" style={{ color: 'var(--text-muted)' }}>
              Use our interactive Project Calculator to configure your scope, pages, and download an official PDF estimate in 30 seconds.
            </p>
          </div>

          <Link
            to="/estimate"
            className="shimmer-button w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: 'var(--hire-btn-bg)',
              color: 'var(--hire-btn-text)',
            }}
          >
            <span>Launch Estimator</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
