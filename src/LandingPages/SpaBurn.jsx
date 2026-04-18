import { useState } from "react";
import { submitSpaLead } from "../lib/supabase";
import "./SpaBurn.css";
import ScrambleText from "../components/ScrambleText";
import {
  EyeOff,
  LayoutTemplate,
  NavigationOff,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

/* ─── CTA Button ─── */
function CTAButton({
  onClick,
  label = "Get Your Free Homepage Audit",
  className = "",
}) {
  return (
    <button
      type="button"
      className={`bg-[#111827] hover:bg-black text-white px-10 py-5 rounded-full font-black text-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4 group ${className}`}
      onClick={onClick}
    >
      {label}
      <svg
        className="group-hover:translate-x-1 transition-transform duration-300"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </button>
  );
}

/* ─── Audit Modal ─── */
function AuditModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ fullName: "", email: "", websiteUrl: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitSpaLead({
        full_name: form.fullName,
        email: form.email,
        website_url: form.websiteUrl,
      });
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xl z-[10000] flex items-center justify-center p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-12 rounded-[32px] max-w-lg w-full relative shadow-2xl">
        <button
          className="absolute top-6 right-8 text-3xl font-light hover:rotate-90 transition-transform cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>
        {success ? (
          <div className="text-center py-10">
            <h3 className="text-3xl font-black mb-4">Sent Successfully! 🌿</h3>
            <p className="text-gray-500">
              I'll reach out to you within 24 hours to review your website.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-3xl font-black tracking-tighter mb-4">
              Get Your Free Audit
            </h2>
            <input
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-black transition-colors"
              placeholder="Full Name"
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <input
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-black transition-colors"
              type="email"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-black transition-colors"
              type="url"
              placeholder="Your Spa Website URL"
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
              required
            />
            <CTAButton
              label={submitting ? "Submitting..." : "Send Request"}
              className="w-full justify-center mt-4"
            />
          </form>
        )}
      </div>
    </div>
  );
}

export default function SpaBurn() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white text-gray-950 font-['Outfit'] scroll-smooth overflow-y-auto selection:bg-orange-100">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/img/landing/spa-burn-background-hero.jpg"
            alt="Relaxing Spa Interior"
            className="w-full h-full absolute right-0 top-0 object-cover opacity-90"
            style={{
              maskImage: "linear-gradient(225deg, black 35%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(225deg, black 35%, transparent 85%)",
            }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-10 w-full relative z-10 transition-opacity duration-700">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-5 h-5 bg-[#ffb443] rounded-sm rotate-45" />
              <span className="font-black text-4xl tracking-tighter uppercase">
                SPA<span className="text-[#ffb443]">BURN</span>
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-[#111827]">
              Get More Spa Bookings in Bern — <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffb443] to-[#ff85cc]">
                Without Paying for Ads
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-[800px] leading-relaxed mb-12">
              I redesign spa websites for businesses in Bern so visitors
              instantly trust you, feel relaxed, and actually book — instead of
              leaving.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <CTAButton
                onClick={() => setModalOpen(true)}
                className="shadow-2xl shadow-orange-200/50"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#ffb443] tracking-widest uppercase">
                  Special Bern Offer
                </span>
                <span className="text-xl font-black tracking-tight">
                  ✨ 25% off your first project
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  (Limited spots in Bern)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="py-32 border-t border-gray-50">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
                Many spa websites <br />
                in Bern look “okay”…
              </h2>
              <p className="text-2xl text-gray-500 font-medium leading-relaxed">
                but quietly lose potential clients every day.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                {
                  text: "Visitors don’t clearly see what makes your spa different",
                  icon: (
                    <EyeOff className="w-6 h-6 text-red-100 bg-red-500 rounded p-1" />
                  ),
                },
                {
                  text: "The design doesn’t reflect a calm, premium experience",
                  icon: (
                    <LayoutTemplate className="w-6 h-6 text-red-100 bg-red-500 rounded p-1" />
                  ),
                },
                {
                  text: "Booking is hidden or confusing",
                  icon: (
                    <NavigationOff className="w-6 h-6 text-red-100 bg-red-500 rounded p-1" />
                  ),
                },
                {
                  text: "Mobile experience feels frustrating",
                  icon: (
                    <Smartphone className="w-6 h-6 text-red-100 bg-red-500 rounded p-1" />
                  ),
                },
              ].map((problem, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1 shrink-0">{problem.icon}</div>
                  <p className="text-xl font-bold text-gray-700 leading-tight">
                    {problem.text}
                  </p>
                </div>
              ))}
              <div className="mt-8 p-8 bg-gray-50 rounded-3xl border-l-4 border-black">
                <p className="text-2xl font-black tracking-tight">
                  👉 So people leave — and choose another spa in Bern
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ── */}
      <section className="py-32 bg-[#111827] text-white">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
              I help you <span className="text-[#ffb443]">fix it</span>.
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl leading-relaxed">
              I help spa and wellness businesses in Bern turn their website into
              a client-booking experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Clear Path",
                desc: "Visit → Booking in minimum clicks.",
                img: "/img/landing/compass.png",
              },
              {
                title: "First Impression",
                desc: "Strong impact within seconds of arrival.",
                img: "/img/landing/firecrikers.png",
              },
              {
                title: "Premium Design",
                desc: "Aligned with your high-end brand.",
                img: "/img/landing/ruby-logo.png",
              },
              {
                title: "Mobile Smooth",
                desc: "Perfect experience on every device.",
                img: "/img/landing/smartphone.png",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-12 bg-white/5 rounded-[40px] border border-white/10 hover:border-white/30 transition-all group overflow-hidden relative"
              >
                <div className="mb-10 w-20 h-20 flex items-center justify-center bg-white/5 rounded-2xl p-4 group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                  />
                </div>
                <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center text-center">
            <p className="text-3xl md:text-4xl font-black tracking-tight mb-12">
              👉 Result: More visitors become paying clients
            </p>
            <CTAButton
              onClick={() => setModalOpen(true)}
              className="bg-[#ffb443] text-black hover:bg-white"
            />
          </div>
        </div>
      </section>

      {/* ── LIMITED OFFER ── */}
      <section className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="bg-[#ffb443] p-16 md:p-32 rounded-[48px] flex flex-col md:flex-row items-center gap-16 md:gap-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 text-black max-w-xl">
              <span className="text-xs font-black tracking-widest uppercase bg-black text-[#ffb443] px-3 py-1 rounded mb-6 inline-block">
                LOCAL LIMITED OFFER
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                🎁 25% Off for <br />
                Spas in Bern
              </h2>
              <p className="text-2xl font-bold opacity-80 mb-12">
                To make it easy to get started:
              </p>
              <ul className="flex flex-col gap-4 text-xl font-black">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  25% discount on your first project
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Available for a limited number of local spas
                </li>
              </ul>
            </div>

            <div className="relative z-10 flex flex-col gap-6 w-full md:w-auto">
              <div className="p-8 bg-white rounded-3xl shadow-xl">
                <p className="text-2xl font-black mb-2">
                  👉 A simple way to improve your website without full risk
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-6 w-full py-4 bg-black text-white rounded-2xl font-black hover:scale-[1.02] transition-transform"
                >
                  Claim Your Discount
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-20 text-center">
            What you{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              actually
            </span>{" "}
            get
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "More bookings from your website",
                desc: "Your visitors don’t hesitate — they act.",
                icon: <TrendingUp className="w-6 h-6" />,
              },
              {
                title: "Instant trust",
                desc: "Your website reflects the real quality of your spa.",
                icon: <ShieldCheck className="w-6 h-6" />,
              },
              {
                title: "Better mobile experience",
                desc: "Easy booking from phone (where most clients come from).",
                icon: <Smartphone className="w-6 h-6" />,
              },
              {
                title: "More independence",
                desc: "Less reliance on third-party platforms.",
                icon: <CheckCircle2 className="w-6 h-6" />,
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white p-12 rounded-[40px] border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-8">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-xl text-gray-500 font-medium">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE AUDIT SECTION ── */}
      <section className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-sm font-black tracking-[0.3em] uppercase text-gray-400 mb-8 block">
              THE FIRST STEP
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              FREE AUDIT
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 font-medium mb-16 leading-relaxed">
              I’ll personally review your homepage and show you what’s blocking
              your bookings.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
              {[
                "Where you’re losing clients",
                "What’s blocking bookings",
                "What can be improved quickly",
              ].map((text, i) => (
                <div
                  key={i}
                  className="p-8 bg-gray-50 rounded-3xl border border-gray-100"
                >
                  <p className="text-lg font-black leading-tight text-gray-800">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-2xl font-black mb-12">
              👉 Short, clear, and practical
            </p>
            <CTAButton onClick={() => setModalOpen(true)} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-32 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-20">
            HOW IT <span className="text-[#ffb443]">WORKS</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { num: "1", title: "You send your website" },
              { num: "2", title: "I review it" },
              { num: "3", title: "You get clear ideas" },
              { num: "4", title: "We improve it together" },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-[120px] font-black text-gray-50 leading-none absolute -top-12 -left-4 -z-10">
                  {step.num}
                </div>
                <h3 className="text-2xl font-black mt-8 leading-tight">
                  {step.title}
                  {idx === 3 && (
                    <span className="block text-sm font-bold text-[#ffb443] mt-2">
                      (with 25% off)
                    </span>
                  )}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL PREVIEW ── */}
      <section className="py-32 bg-[#111827] text-white">
        <div className="max-w-[1280px] mx-auto px-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 leading-tight">
            VISUAL PREVIEW (HOOK)
          </h2>
          <div className="max-w-3xl">
            <p className="text-2xl text-gray-400 font-medium mb-12">
              For selected businesses in Bern, I also create a quick homepage
              redesign preview.
            </p>
            <div className="p-12 bg-white/5 rounded-[48px] border border-white/10 relative group overflow-hidden">
              <p className="text-3xl font-black relative z-10">
                👉 So you can see the improvement before deciding
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <img
                  src="/img/landing/blob.svg"
                  alt=""
                  className="absolute inset-0 w-full h-full scale-125 opacity-100 group-hover:rotate-12 transition-transform duration-1000"
                />
                <img
                  src="/img/landing/sahedalomsumit-profile-transparent.png"
                  alt="Sahed - Designer"
                  className="relative z-10 w-full h-auto drop-shadow-2xl translate-y-4"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-xs font-black tracking-widest uppercase text-[#ffb443] mb-6 block">
                MEET THE DESIGNER
              </span>
              <h2 className="text-6xl font-black tracking-tighter mb-8 italic">
                👋 HI, I’M SAHED
              </h2>
              <p className="text-2xl text-gray-600 leading-relaxed mb-8">
                I design websites that help businesses get more clients, not
                just look good.
              </p>
              <p className="text-2xl text-gray-600 leading-relaxed">
                I focus on creating clean, modern, and high-converting
                experiences — especially for service-based businesses like spas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-40 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-10 text-center">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.9]">
            If your website isn’t <br />
            bringing you bookings...
          </h2>
          <p className="text-3xl md:text-4xl font-black text-red-500 mb-20 tracking-tight">
            it’s costing you clients.
          </p>

          <div className="flex flex-col items-center gap-12">
            <p className="text-2xl font-bold text-gray-500 max-w-2xl">
              Let’s fix it — with a clear plan and 25% off your first project.
            </p>
            <CTAButton
              onClick={() => setModalOpen(true)}
              className="px-16 py-8 text-2xl"
            />
          </div>
        </div>
      </section>

      <AuditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
