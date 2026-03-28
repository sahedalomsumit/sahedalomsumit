import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: './ROOT' },
    { to: '/portfolio', label: './PORTFOLIO' },
  ]

  return (
    <header
      className={`sticky top-0 w-full z-50 sticky-header px-6 md:px-12 flex items-center justify-between transition-all ${scrolled ? 'py-3' : 'py-4'}`}
      id="main-header"
    >
      <Link to="/" className="flex items-center group cursor-pointer">
        <img
          className="sas-logo transition-transform group-hover:scale-105 w-32"
          src="/img/logo-sahed-alom-sumit.png"
          alt="Sahed Alom Sumit Official Logo"
        />
        <div className="hidden md:block h-6 w-[1px] bg-white/10 mx-4" />
        <div className="hidden lg:block text-[9px] font-mono text-gray-500 uppercase tracking-tighter">
          Vibe Designer & Dev<br />
          <span className="text-emerald-500 italic">Availability: High</span>
        </div>
      </Link>

      <nav className="flex items-center gap-4 md:gap-8 lg:gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-[10px] font-mono font-bold tracking-widest hover:text-violet-400 transition-all border-b pb-1 ${
              location.pathname === link.to
                ? 'border-violet-500 text-violet-400'
                : 'border-transparent hover:border-violet-500/50'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="#contact"
          className="hidden sm:flex px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-black hover:bg-violet-500 hover:text-white transition-all tracking-[0.2em] items-center gap-2"
        >
          HIRE_ME
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="3" />
          </svg>
        </a>
      </nav>
    </header>
  )
}
