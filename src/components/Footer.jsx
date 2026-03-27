import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-20 px-6 md:px-12 border-t border-white/5 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <img src="/img/Logo transparent.png" alt="SAS Logo" className="w-full h-auto -ml-4 max-w-48" />
          <p className="mt-6 text-gray-500 text-xs leading-relaxed font-mono max-w-[200px] uppercase">
            ./ No-Code Web Developer<br />./ AI Automation Expert<br />./ UI/UX Designer
          </p>
        </div>

        {/* Links Column */}
        <div className="hidden md:block">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-violet-500">Sitemap_Root</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-500">
            <li><Link to="/" className="hover:text-white transition tracking-widest">./ ROOT</Link></li>
            <li><Link to="/process" className="hover:text-white transition tracking-widest">./ PROCESS</Link></li>
            <li><Link to="/work" className="hover:text-white transition tracking-widest">./ WORK</Link></li>
          </ul>
        </div>

        {/* Follow Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-emerald-500">Follow_Stream</h4>
          <ul className="space-y-4 text-xs font-mono text-gray-500">
            <li><a href="https://www.linkedin.com/in/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">LINKEDIN</a></li>
            <li><a href="https://wa.me/358415765539" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">WHATSAPP</a></li>
            <li><a href="https://t.me/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">TELEGRAM</a></li>
            <li><a href="https://www.facebook.com/sahedalomsumit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition tracking-widest">FACEBOOK</a></li>
          </ul>
        </div>

        {/* Office Column */}
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-8 text-white">Base_Operations</h4>
          <p className="text-xs font-mono text-gray-500 leading-relaxed uppercase tracking-widest">
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
        <p className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">
          © {currentYear} Sahed Alom Sumit // All Systems Functional
        </p>
        <div className="flex gap-4 text-[9px] font-mono text-gray-600">
          <span>V3.0.0_REACT</span>
          <span className="hidden md:block">LATENCY: 12MS</span>
        </div>
      </div>
    </footer>
  )
}
