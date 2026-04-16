import { useState, useEffect, useRef, useCallback } from 'react'
import { submitSpaLead } from '../lib/supabase'
import './SpaBurn.css'

import RevealOnScroll from '../components/RevealOnScroll'

/* ─── CTA Button ─── */
function CTAButton({ onClick, label = '→ Get a Free Homepage Audit', pulse = false, className = '' }) {
  return (
    <button
      type="button"
      id="spa-cta-btn"
      className={`spa-btn-primary ${pulse ? 'spa-btn-pulse' : ''} ${className}`}
      onClick={onClick}
    >
      {label}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </button>
  )
}

/* ─── Audit Form Modal ─── */
function AuditModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ fullName: '', email: '', websiteUrl: '', whatsapp: '', note: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fullName.trim() || !form.email.trim() || !form.websiteUrl.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const result = await submitSpaLead({
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        website_url: form.websiteUrl.trim(),
        whatsapp: form.whatsapp.trim() || null,
        note: form.note.trim() || null,
      })

      if (result.error) {
        setError('Something went wrong. Please try again.')
        console.error('Submit error:', result.error)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    // Reset after animation
    setTimeout(() => {
      setForm({ fullName: '', email: '', websiteUrl: '', whatsapp: '', note: '' })
      setSuccess(false)
      setError('')
    }, 300)
  }

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="spa-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}>
      <div className="spa-modal" role="dialog" aria-modal="true" aria-labelledby="audit-modal-title">
        <button type="button" className="spa-modal-close" onClick={handleClose} aria-label="Close">✕</button>

        {success ? (
          <div className="spa-form-success">
            <div className="spa-form-success-icon">✓</div>
            <h3>Thank You! 🌿</h3>
            <p>Your audit request has been submitted. I'll personally review your homepage and get back to you within 24-48 hours.</p>
            <button type="button" className="spa-btn-primary" style={{ marginTop: 24 }} onClick={handleClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="audit-modal-title">Get Your Free Homepage Audit</h2>
            <p>Fill in the details below and I'll personally review your spa website and show you where you're losing potential bookings.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="spa-form-group">
                <label className="spa-form-label" htmlFor="spa-fullName">Full Name *</label>
                <input
                  className="spa-form-input"
                  type="text"
                  id="spa-fullName"
                  name="fullName"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              <div className="spa-form-group">
                <label className="spa-form-label" htmlFor="spa-email">Email *</label>
                <input
                  className="spa-form-input"
                  type="email"
                  id="spa-email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="spa-form-group">
                <label className="spa-form-label" htmlFor="spa-websiteUrl">Website URL *</label>
                <input
                  className="spa-form-input"
                  type="url"
                  id="spa-websiteUrl"
                  name="websiteUrl"
                  placeholder="https://your-spa-website.ch"
                  value={form.websiteUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="spa-form-group">
                <label className="spa-form-label" htmlFor="spa-whatsapp">
                  WhatsApp Number <span className="spa-optional">(optional)</span>
                </label>
                <input
                  className="spa-form-input"
                  type="tel"
                  id="spa-whatsapp"
                  name="whatsapp"
                  placeholder="+41 79 123 45 67"
                  value={form.whatsapp}
                  onChange={handleChange}
                />
              </div>

              <div className="spa-form-group">
                <label className="spa-form-label" htmlFor="spa-note">
                  Note <span className="spa-optional">(optional)</span>
                </label>
                <textarea
                  className="spa-form-textarea"
                  id="spa-note"
                  name="note"
                  placeholder="Anything you'd like me to know about your spa or website…"
                  value={form.note}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              {error && (
                <p style={{ color: '#dc6464', fontSize: '0.9rem', marginBottom: 12, fontWeight: 500 }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="spa-btn-primary spa-form-submit"
                disabled={submitting}
                style={submitting ? { opacity: 0.7, pointerEvents: 'none' } : {}}
              >
                {submitting ? 'Submitting…' : '→ Submit Audit Request'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════
   MAIN LANDING PAGE COMPONENT
   ═══════════════════════════════════════════════ */
export default function SpaBurn() {
  const [modalOpen, setModalOpen] = useState(false)
  const [showFloatingCta, setShowFloatingCta] = useState(false)

  const openModal = useCallback(() => setModalOpen(true), [])

  // Show floating CTA after scrolling past hero
  useEffect(() => {
    const handler = () => setShowFloatingCta(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Set page title & meta
  useEffect(() => {
    document.title = 'Get More Spa Bookings in Bern — Free Homepage Audit | Sahed'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'I redesign spa websites in Bern so visitors trust you, feel relaxed, and actually book. Get a free homepage audit + 25% off your first project.')
    }
  }, [])

  return (
    <div className="spa-burn-page">

      {/* ═══ HERO ═══ */}
      <section className="spa-hero spa-section" id="spa-hero">
        <div className="spa-hero-bg-image">
          <img src="/img/landing/spa-hero-bg.png" alt="" aria-hidden="true" loading="eager" />
        </div>
        <div className="spa-hero-float" />
        <div className="spa-container spa-hero-content">
          <RevealOnScroll direction="down">
            <h1>
              Get More Spa Bookings in Bern —{' '}
              <span>Without Paying for Ads</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p>
              I redesign spa websites for businesses in Bern so visitors instantly trust you,
              feel relaxed, and actually book — instead of leaving.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <CTAButton onClick={openModal} pulse />
          </RevealOnScroll>
          <RevealOnScroll delay={0.45} direction="up">
            <div className="spa-hero-offer">
              ✨ 25% off your first project (limited spots in Bern)
            </div>
          </RevealOnScroll>
        </div>
      </section>


      {/* ═══ PROBLEM ═══ */}
      <section className="spa-section" id="spa-problem">
        <div className="spa-container">
          <RevealOnScroll>
            <div className="spa-section-label">💔 The Problem</div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 style={{ marginBottom: 12 }}>
              Many spa websites in Bern look "okay"…
            </h2>
            <p style={{ marginBottom: 40 }}>
              but quietly lose potential clients every day.
            </p>
          </RevealOnScroll>

          <div style={{ display: 'grid', gap: 16, maxWidth: 700 }}>
            {[
              { icon: '👁', text: "Visitors don't clearly see what makes your spa different" },
              { icon: '🎨', text: "The design doesn't reflect a calm, premium experience" },
              { icon: '📅', text: 'Booking is hidden or confusing' },
              { icon: '📱', text: 'Mobile experience feels frustrating' },
            ].map((pain, i) => (
              <RevealOnScroll key={i} delay={i * 0.1} direction="up">
                <div className="spa-pain-point">
                  <span className="spa-pain-icon">{pain.icon}</span>
                  <span className="spa-pain-text">{pain.text}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.5}>
            <p style={{ marginTop: 32, fontWeight: 600, color: '#2d3436', fontSize: '1.1rem' }}>
              👉 So people leave — and choose another spa in Bern
            </p>
          </RevealOnScroll>
        </div>
      </section>


      {/* ═══ SOLUTION ═══ */}
      <section className="spa-section" id="spa-solution">
        <div className="spa-container">
          <RevealOnScroll>
            <div className="spa-section-label">💡 The Solution</div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 style={{ marginBottom: 12 }}>
              Turn your website into a client-booking experience
            </h2>
            <p style={{ marginBottom: 40 }}>
              I help spa and wellness businesses in Bern transform their online presence.
            </p>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { title: 'Clear path from visit → booking', desc: 'Intuitive user flow that guides visitors naturally from landing to booking.' },
              { title: 'Strong first impression', desc: 'Within seconds, visitors feel the quality of your spa — not confusion.' },
              { title: 'Calm, premium design', desc: 'Aligned with your brand identity — a digital extension of your space.' },
              { title: 'Smooth mobile experience', desc: 'Perfectly optimized for phones, where most of your clients browse.' },
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 0.1} direction="up">
                <div className="spa-glass-card">
                  <div className="spa-check-item">
                    <div className="spa-check-icon">✓</div>
                    <div>
                      <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
                      <p style={{ fontSize: '0.95rem', maxWidth: 'none' }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.4}>
            <p style={{ marginTop: 36, fontWeight: 600, color: '#2d3436', fontSize: '1.1rem' }}>
              👉 Result: More visitors become paying clients
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.5}>
            <div style={{ marginTop: 32 }}>
              <CTAButton onClick={openModal} />
            </div>
          </RevealOnScroll>
        </div>
      </section>


      {/* ═══ LIMITED OFFER ═══ */}
      <section className="spa-section spa-offer-section" id="spa-offer">
        <div className="spa-container" style={{ position: 'relative', zIndex: 2 }}>
          <RevealOnScroll>
            <div className="spa-section-label">💸 Limited Offer</div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="spa-offer-badge" style={{ marginBottom: 24 }}>
              🎁 25% Off for Spa Businesses in Bern
            </div>
            <h2 style={{ color: '#fff', marginBottom: 12 }}>
              A simple way to get started
            </h2>
            <p style={{ marginBottom: 40, color: 'rgba(255,255,255,0.7)' }}>
              To make it easy, here is what you get:
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} direction="up">
            <div className="spa-offer-card" style={{ maxWidth: 600 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>25% discount on your first project</li>
                <li>Available for a limited number of local spa businesses</li>
              </ul>
              <p style={{ marginTop: 32, fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)' }}>
                👉 A simple way to improve your website without full risk
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3} direction="up">
            <div style={{ marginTop: 36 }}>
              <CTAButton onClick={openModal} pulse className="spa-btn-pulse" />
            </div>
          </RevealOnScroll>
        </div>
      </section>


      {/* ═══ BENEFITS ═══ */}
      <section className="spa-section" id="spa-benefits">
        <div className="spa-container">
          <RevealOnScroll>
            <div className="spa-section-label">📈 What You Actually Get</div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 style={{ marginBottom: 48 }}>Real results for your spa business</h2>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { icon: '📅', title: 'More bookings from your website', desc: "Your visitors don't hesitate — they act." },
              { icon: '⭐', title: 'Instant trust', desc: 'Your website reflects the real quality of your spa.' },
              { icon: '📱', title: 'Better mobile experience', desc: 'Easy booking from phone (where most clients come from).' },
              { icon: '🔓', title: 'More independence', desc: 'Less reliance on third-party platforms.' },
            ].map((benefit, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="spa-benefit-card">
                  <div className="spa-benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ FREE AUDIT ═══ */}
      <section className="spa-section" id="spa-audit">
        <div className="spa-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <RevealOnScroll>
              <div className="spa-section-label">🔍 Free Audit</div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 style={{ marginBottom: 16 }}>
                I'll personally review your homepage
              </h2>
              <p style={{ marginBottom: 32 }}>
                Short, clear, and practical. Here is what you will learn:
              </p>
            </RevealOnScroll>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                "Where you\u2019re losing clients",
                "What\u2019s blocking bookings",
                "What can be improved quickly",
              ].map((item, i) => (
                <RevealOnScroll key={i} delay={0.2 + (i * 0.1)}>
                  <div className="spa-check-item">
                    <div className="spa-check-icon">✓</div>
                    <p style={{ fontWeight: 500, maxWidth: 'none', margin: 0 }}>{item}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.5}>
              <div style={{ marginTop: 36 }}>
                <CTAButton onClick={openModal} label="→ Request Your Free Audit" />
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.3} direction="right">
            <div className="spa-preview-image">
              <img src="/img/landing/spa-treatment.png" alt="Spa wellness treatment setup" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>
      </section>


      {/* ═══ HOW IT WORKS ═══ */}
      <section className="spa-section" id="spa-how-it-works">
        <div className="spa-container">
          <RevealOnScroll>
            <div className="spa-section-label">🎯 How It Works</div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 style={{ marginBottom: 48 }}>Four simple steps</h2>
          </RevealOnScroll>

          <div style={{ display: 'grid', gap: 20, maxWidth: 700 }}>
            {[
              { num: '1', title: 'You send your website', desc: 'Share your spa website URL with me.' },
              { num: '2', title: 'I review it', desc: 'I personally analyze your homepage for booking leaks.' },
              { num: '3', title: 'You get clear improvement ideas', desc: 'Actionable, prioritized recommendations.' },
              { num: '4', title: 'We improve it together', desc: 'If you like the plan — we start, with 25% off.' },
            ].map((step, i) => (
              <RevealOnScroll key={i} delay={i * 0.1} direction="up">
                <div className="spa-step">
                  <div className="spa-step-number">{step.num}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ VISUAL PREVIEW ═══ */}
      <section className="spa-section" id="spa-preview">
        <div className="spa-container" style={{ textAlign: 'center' }}>
          <RevealOnScroll>
            <div className="spa-section-label">🎨 Visual Preview</div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 style={{ marginBottom: 12 }}>See the improvement before deciding</h2>
            <p style={{ margin: '0 auto 48px', textAlign: 'center' }}>
              For selected businesses in Bern, I also create a quick homepage redesign preview —
              so you can see the difference with zero commitment.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3} direction="up">
            <div className="spa-preview-image" style={{ maxWidth: 800, margin: '0 auto' }}>
              <img src="/img/landing/spa-website-preview.png" alt="Modern spa website redesign preview on laptop" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>
      </section>


      {/* ═══ ABOUT ═══ */}
      <section className="spa-section" id="spa-about">
        <div className="spa-container">
          <RevealOnScroll>
            <div className="spa-section-label">👋 About</div>
          </RevealOnScroll>

          <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
            <RevealOnScroll delay={0.2} direction="left">
              <div className="spa-about-image">
                <img src="/img/landing/sahed-portrait.png" alt="Sahed — Web Designer" loading="lazy" />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3} direction="right">
              <div style={{ flex: 1, minWidth: 280 }}>
                <h2 style={{ marginBottom: 16 }}>Hi, I'm Sahed</h2>
                <p style={{ marginBottom: 16 }}>
                  I design websites that help businesses get more clients — not just look good.
                </p>
                <p>
                  I focus on creating clean, modern, and high-converting experiences —
                  especially for service-based businesses like spas. Every project I take on
                  is guided by one question: <strong>will this bring more bookings?</strong>
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>


      {/* ═══ FINAL CTA ═══ */}
      <section className="spa-section spa-final-cta" id="spa-final-cta">
        <div className="spa-container" style={{ position: 'relative', zIndex: 2 }}>
          <RevealOnScroll>
            <h2 style={{ marginBottom: 16, color: '#fff' }}>
              If your website isn't bringing you bookings,<br />
              it's costing you clients.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p>
              Let's fix it — with a clear plan and 25% off your first project.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <div style={{ marginTop: 24 }}>
              <CTAButton onClick={openModal} label="→ Get Your Free Homepage Audit" pulse />
            </div>
          </RevealOnScroll>
        </div>
      </section>


      {/* ═══ FLOATING CTA ═══ */}
      <div className={`spa-floating-cta ${showFloatingCta ? 'visible' : ''}`}>
        <button type="button" className="spa-btn-primary" onClick={openModal}>
          → Free Audit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>


      {/* ═══ MODAL ═══ */}
      <AuditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
