import React from "react";
import { Link } from "react-router-dom";
import packageMetadata from "../../package.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const buildVersion = packageMetadata.version;

  return (
    <footer className="site-footer py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--topbar-bg)' }}>
      <div className="site-footer-inner grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 relative z-10 justify-between">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <Link to="/" className="inline-block group">
            <img
              src="/img/logo-sahed-alom-sumit.png"
              alt="Sahed Alom Sumit Transparent Logo"
              width="128"
              height="32"
              loading="lazy"
              decoding="async"
              className="sas-logo transition-transform duration-300 group-hover:scale-105 w-28 md:w-32 h-auto"
            />
          </Link>
          <p className="mt-4 text-xs leading-relaxed max-w-[200px]" style={{ color: 'var(--text-muted)' }}>
            Product Designer & AI-Enhanced Web Developer. Based in Helsinki, Finland.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-400">Available for Hire</span>
          </div>
        </div>

        {/* Main Navigation Column */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-6 text-violet-400">
            Navigation
          </h4>
          <ul className="space-y-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            <li>
              <Link to="/" className="hover:text-violet-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/work" className="hover:text-violet-400 transition-colors">
                Selected Work
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-violet-400 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link to="/process" className="hover:text-violet-400 transition-colors">
                Design Process
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-violet-400 transition-colors">
                Knowledge Base (FAQ)
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-violet-400 transition-colors">
                Blog & Insights
              </Link>
            </li>
            <li>
              <Link to="/estimate" className="text-emerald-400 hover:underline font-semibold flex items-center gap-1">
                <span>Project Estimator</span>
                <span>↗</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Featured Case Studies */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-6 text-emerald-400">
            Featured Work
          </h4>
          <ul className="space-y-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            <li>
              <Link to="/work/twintwo" className="hover:text-white transition-colors" style={{ color: 'var(--text-main)' }}>
                TwinTwo
              </Link>
            </li>
            <li>
              <Link to="/work/ongaro-metodo" className="hover:text-white transition-colors" style={{ color: 'var(--text-main)' }}>
                Ongaro Metodo
              </Link>
            </li>
            <li>
              <Link to="/work/e-service" className="hover:text-white transition-colors" style={{ color: 'var(--text-main)' }}>
                E-Service Platform
              </Link>
            </li>
            <li>
              <Link to="/work/notifi" className="hover:text-white transition-colors" style={{ color: 'var(--text-main)' }}>
                Notifi AI
              </Link>
            </li>
            <li>
              <Link to="/work/ovulio-baby" className="hover:text-white transition-colors" style={{ color: 'var(--text-main)' }}>
                Ovulio Baby
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Master */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-6 text-violet-400">
            Services
          </h4>
          <ul className="space-y-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            <li>
              <Link to="/services/full-stack-development" className="hover:text-white transition-colors">
                Full-Stack Development
              </Link>
            </li>
            <li>
              <Link to="/services/low-no-code-development" className="hover:text-white transition-colors">
                Low/No-Code & CMS
              </Link>
            </li>
            <li>
              <Link to="/services/ui-ux-design" className="hover:text-white transition-colors">
                UI/UX Design
              </Link>
            </li>
            <li>
              <Link to="/services/app-development" className="hover:text-white transition-colors">
                App Development & Tools
              </Link>
            </li>
          </ul>
        </div>

        {/* Digital Products Column */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-6 text-emerald-400">
            Digital Products
          </h4>
          <ul className="space-y-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=com.sahed.salah_tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Salah Tracker App</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://spagrow.sahedalomsumit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Spa Grow System</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://sahedalomsumit.github.io/outreach-os/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Outreach OS</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Follow / Connect Column */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-6 text-violet-400">
            Connect
          </h4>
          <ul className="space-y-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            <li>
              <a
                href="https://www.linkedin.com/in/sahedalomsumit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sahedalomsumit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/358415765539"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-400"
              >
                <span>WhatsApp</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/sahedalomsumit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Telegram</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/sahedalomsumit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Instagram</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="site-footer-bottom pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[9px] uppercase tracking-widest text-center md:text-left flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1" style={{ color: 'var(--text-muted)' }}>
          <span>© {currentYear} Sahed Alom Sumit //</span>
          <a
            href="https://sahedalomsumit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            style={{ textDecoration: "none" }}
          >
            <span className="normal-case tracking-normal">Built with</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="#ef4444"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transformOrigin: "center",
                flexShrink: 0,
                animation: "pulseHeart 1.2s infinite ease-in-out",
              }}
              aria-hidden="true"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
            </svg>
            <span className="normal-case tracking-normal">by</span>
            <span
              style={{ color: "var(--primary)", fontWeight: "700" }}
              className="normal-case tracking-normal"
            >
              Sahed
            </span>
          </a>
        </p>

        <div className="flex items-center gap-4 text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
          <span>v{buildVersion}</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Helsinki (EEST / UTC+3)
          </span>
        </div>
      </div>
    </footer>
  );
}
