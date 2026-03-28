import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const buildVersion = "3.5.0"
  const [latency, setLatency] = React.useState(12)

  React.useEffect(() => {
    // Generate a subtle random latency change for "Coder Mode" vibe
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (16 - 8 + 1) + 8))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="py-20 px-6 md:px-12 border-t border-white/5 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <img src="/img/logo-transparent.png" alt="Sahed Alom Sumit Transparent Logo" className="w-full h-auto -ml-4 max-w-48" />
          <p className="mt-6 text-gray-400 text-xs leading-relaxed font-mono max-w-[200px] uppercase">
            ./ Vibe Web Designer<br />./ Vibe Web Developer<br />./ Vibe AI Automation<br />./ Design. Code. Vibes.
          </p>
        </div>

        {/* Favourite Projects Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-violet-500">Featured_Build</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-400">
            <li><Link to="/portfolio/twintwo" className="hover:text-white transition tracking-widest">TWINTWO</Link></li>
            <li><Link to="/portfolio/ongaro-metodo" className="hover:text-white transition tracking-widest">ONGARO METODO</Link></li>
            <li><Link to="/portfolio/e-service" className="hover:text-white transition tracking-widest">E-SERVICE</Link></li>
            <li><Link to="/portfolio/notifi" className="hover:text-white transition tracking-widest">NOTIFI</Link></li>
            <li><Link to="/portfolio/ovulio-baby" className="hover:text-white transition tracking-widest">OVULIO BABY</Link></li>
          </ul>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-emerald-500">Sitemap_Root</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-400">
            <li><Link to="/" className="hover:text-white transition tracking-widest">./ ROOT</Link></li>
            <li><Link to="/process" className="hover:text-white transition tracking-widest">./ PROCESS</Link></li>
            <li><Link to="/portfolio" className="hover:text-white transition tracking-widest">./ PORTFOLIO</Link></li>
            <li><Link to="/faq" className="hover:text-white transition tracking-widest">./ FAQ</Link></li>
          </ul>
        </div>

        {/* Follow Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-violet-500">Follow_Stream</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-400">
            <li><a href="https://www.linkedin.com/in/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">LINKEDIN</a></li>
            <li><a href="https://wa.me/358415765539" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">WHATSAPP</a></li>
            <li><a href="https://t.me/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">TELEGRAM</a></li>
            <li><a href="https://www.facebook.com/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">FACEBOOK</a></li>
          </ul>
        </div>

        {/* Office Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-emerald-500">Base_Operation</h4>
          <p className="text-xs font-mono text-gray-400 leading-relaxed uppercase tracking-widest">
            [encrypted]<br />00420, Helsinki<br />Finland, Europe
          </p>
          <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-emerald-500">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            GMT +2:00
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
          © {currentYear} Sahed Alom Sumit // Built with good vibes and clean code
        </p>
        <div className="flex gap-4 text-[9px] font-mono text-gray-400">
          <span>V{buildVersion}_BUILD</span>
          <span className="hidden md:block">LATENCY: {latency}MS</span>
        </div>
      </div>
    </footer>
  )
}
