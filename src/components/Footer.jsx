import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const buildVersion = "3.5.0"

  return (
    <footer className="py-16 border-t border-white/5 bg-black relative overflow-hidden">
      <div className="max-w-7xl px-4 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 relative z-10  justify-between">
        {/* Brand Column */}
        <div>
          <img src="/img/logo-sahed-alom-sumit.png" alt="Sahed Alom Sumit Transparent Logo" className="sas-logo transition-transform group-hover:scale-105 w-32" />
          <p className="mt-6 text-gray-400 text-xs leading-relaxed font-mono max-w-[200px] uppercase">
            ./ Vibe Web Designer<br />./ Vibe Web Developer<br />./ Vibe AI Automation<br />./ Design. Code. Vibes.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-violet-500">Sitemap_Root</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-400">
            <li><Link to="/" className="hover:text-white transition tracking-widest">./ ROOT</Link></li>
            <li><Link to="/process" className="hover:text-white transition tracking-widest">./ PROCESS</Link></li>
            <li><Link to="/services" className="hover:text-white transition tracking-widest">./ SERVICES</Link></li>
            <li><Link to="/portfolio" className="hover:text-white transition tracking-widest">./ PORTFOLIO</Link></li>
            <li><Link to="/faq" className="hover:text-white transition tracking-widest">./ FAQ</Link></li>
            <li><Link to="/quote" className="hover:text-emerald-400 transition tracking-widest font-bold">./ QUOTE</Link></li>
          </ul>
        </div>


        {/* Favourite Projects Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-emerald-500">Featured_Build</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-400">
            <li><Link to="/portfolio/twintwo" className="hover:text-white transition tracking-widest">./ TWINTWO</Link></li>
            <li><Link to="/portfolio/ongaro-metodo" className="hover:text-white transition tracking-widest">./ ONGARO METODO</Link></li>
            <li><Link to="/portfolio/e-service" className="hover:text-white transition tracking-widest">./ E-SERVICE</Link></li>
            <li><Link to="/portfolio/notifi" className="hover:text-white transition tracking-widest">./ NOTIFI</Link></li>
            <li><Link to="/portfolio/ovulio-baby" className="hover:text-white transition tracking-widest">./ OVULIO BABY</Link></li>
          </ul>
        </div>


        {/* Services Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-violet-500">Services_Master</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-400 uppercase">
            <li><Link to="/services/figma-design" className="hover:text-white transition tracking-widest">./ Figma Design</Link></li>
            <li><Link to="/services/webflow-development" className="hover:text-white transition tracking-widest">./ Webflow Dev</Link></li>
            <li><Link to="/services/wordpress-development" className="hover:text-white transition tracking-widest">./ WordPress Dev</Link></li>
            <li><Link to="/services/framer-development" className="hover:text-white transition tracking-widest">./ Framer Dev</Link></li>
            <li><Link to="/services/custom-development" className="hover:text-white transition tracking-widest">./ Custom Dev</Link></li>
            <li><Link to="/services/ai-automation" className="hover:text-white transition tracking-widest">./ AI Automation</Link></li>
            <li><Link to="/services/seo-optimization" className="hover:text-white transition tracking-widest">./ SEO strategy</Link></li>
          </ul>
        </div>

        {/* Other Builds Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-emerald-500">OTHER_BUILD</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-400">
            <li><a href="https://sahedalomsumit.github.io/my-cover-letter-generator/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">./ COVER LETTER GEN</a></li>
            <li><a href="/salah-tracker-app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">./ SALAH TRACKER</a></li>
          </ul>
        </div>

        {/* Follow Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-violet-500">Follow_Stream</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-400">
            <li><a href="https://www.linkedin.com/in/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">./ LINKEDIN</a></li>
            <li><a href="https://github.com/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">./ GITHUB</a></li>
            <li><a href="https://wa.me/358415765539" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">./ WHATSAPP</a></li>
            <li><a href="https://t.me/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">./ TELEGRAM</a></li>
            <li><a href="https://www.facebook.com/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">./ FACEBOOK</a></li>
            <li><a href="https://www.instagram.com/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">./ INSTAGRAM</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest text-center md:text-left">
          © {currentYear} Sahed Alom Sumit // Built with good vibes and clean code
        </p>
        <div className="hidden md:flex gap-4 text-[9px] font-mono text-gray-400">
          <span>V{buildVersion}_BUILD</span>
          <div className="flex items-center gap-2 text-emerald-500">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            GMT +2:00
          </div>
        </div>
      </div>
    </footer>
  )
}
