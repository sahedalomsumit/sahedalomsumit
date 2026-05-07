import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const linkRef = useRef([])
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
            const tl = gsap.timeline()
            tl.set(menuRef.current, { display: 'flex' })
            tl.to(menuRef.current, { x: 0, opacity: 1, duration: 0.6, ease: 'power4.out' })
            tl.fromTo(linkRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
                "-=0.3"
            )
        } else {
            document.body.style.overflow = 'unset'
            const tl = gsap.timeline()
            // Animate links out أولاً (first)
            tl.to(linkRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in'
            })
            // Then slide the menu overlay out
            tl.to(menuRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power4.in'
            }, "-=0.2")
            tl.set(menuRef.current, { display: 'none' })
        }
    }, [isMenuOpen])

    const navLinks = [
        { to: '/', label: 'ROOT', num: '01' },
        { to: '/portfolio', label: 'PORTFOLIO', num: '02' },
        { to: '/services', label: 'SERVICES', num: '03' },
        { to: '/faq', label: 'FAQ', num: '04' },
        { to: '/quote', label: 'QUOTE', num: '05' },
    ]

    const closeMenu = () => setIsMenuOpen(false)

    const scrollToContact = (e) => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            e.preventDefault();
            contactSection.scrollIntoView({ behavior: 'smooth' });
            closeMenu();
        }
    }

    return (
        <>
            <header
                className={`fixed top-0 w-full z-[70] transition-all duration-300 ${scrolled || isMenuOpen ? 'sticky-header shadow-lg' : ''}`}
                style={{ 
                    backgroundColor: scrolled || isMenuOpen ? 'var(--header-bg)' : 'transparent',
                    backdropFilter: scrolled || isMenuOpen ? 'blur(20px)' : 'none',
                    borderBottom: scrolled || isMenuOpen ? '1px solid var(--header-border)' : '1px solid transparent'
                }}
                id="main-header"
            >
                {/* TopBar Integration */}
                <div
                    className={`w-full px-4 hidden md:flex flex-col md:flex-row justify-center items-center text-[9px] font-mono tracking-[0.2em] transition-all duration-500 overflow-hidden ${scrolled ? 'max-h-0 opacity-0 py-0 border-none' : 'max-h-10 opacity-100 py-2'}`}
                    style={{
                        backgroundColor: 'var(--topbar-bg)',
                        borderBottom: scrolled ? 'none' : '1px solid var(--topbar-border)',
                        color: 'var(--text-muted)',
                    }}
                >
                    <div className="flex items-center gap-2 text-emerald-500">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span style={{ color: 'var(--text-main)' }}>SYSTEM_STATUS:</span>
                        OPEN FOR COLLABORATIONS
                    </div>
                    <span className="mx-4 hidden md:block" style={{ color: 'var(--border)' }}>|</span>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <a
                            href="https://wa.me/+358415765539"
                            className="hover:text-violet-500 transition"
                            style={{ color: 'var(--text-muted)' }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            MESSAGE_WHATSAPP »
                        </a>
                        <span className="hidden md:block" style={{ color: 'var(--border)' }}>|</span>
                        <a
                            href="/img/web-designer-and-developer-sahed-alom-sumit.pdf"
                            className="font-bold hover:text-violet-500 transition underline underline-offset-4 decoration-violet-500/50"
                            style={{ color: 'var(--text-main)' }}
                        >
                            RESUME.PDF
                        </a>
                    </div>
                </div>

                <div className={`px-4 max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${scrolled || isMenuOpen ? 'py-2 md:py-3' : 'py-4'}`}>
                    <Link to="/" onClick={closeMenu} className="flex items-center group cursor-pointer z-[60]">
                        <img
                            className="sas-logo transition-transform group-hover:scale-105 w-32"
                            src="/img/logo-sahed-alom-sumit.png"
                            alt="Sahed Alom Sumit Official Logo"
                        />
                        <div className="hidden md:block h-6 w-[1px] mx-4" style={{ backgroundColor: 'var(--border)' }} />
                        <div className="hidden lg:block text-[9px] font-mono uppercase tracking-tighter" style={{ color: 'var(--text-muted)' }}>
                            Designer & Developer<br />
                            <span className="text-emerald-500 italic">Availability: High</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`text-[10px] font-mono font-bold tracking-widest hover:text-violet-500 transition-all border-b pb-1 ${location.pathname === link.to
                                    ? 'border-violet-500 text-violet-500'
                                    : 'border-transparent hover:border-violet-500/50'
                                    }`}
                                style={location.pathname !== link.to ? { color: 'var(--text-main)' } : {}}
                            >
                                ./{link.label}
                            </Link>
                        ))}
                        <Link
                            to="/#contact"
                            onClick={scrollToContact}
                            className="hidden sm:flex px-6 py-2.5 rounded-full text-[10px] font-black hover:bg-violet-500 hover:text-white transition-all tracking-[0.2em] items-center gap-2"
                            style={{ backgroundColor: 'var(--hire-btn-bg)', color: 'var(--hire-btn-text)' }}
                        >
                            HIRE_ME
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="3" />
                            </svg>
                        </Link>

                        {/* Theme Toggle — Desktop */}
                        <button
                            id="theme-toggle-desktop"
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        >
                            {/* Sun icon */}
                            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                            {/* Moon icon */}
                            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        </button>

                    </nav>

                    {/* Mobile: Theme Toggle + Hamburger */}
                    <div className="md:hidden z-[80] flex items-center gap-3">
                        <button
                            id="theme-toggle-mobile"
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        </button>
                        <button
                            className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            <div className="w-6 flex flex-col items-end gap-1.5">
                                <span className={`block h-0.5 transition-all duration-300 ${isMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`} style={{background: 'var(--text-main)'}}></span>
                                <span className={`block h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0 translate-x-3' : 'w-4'}`} style={{background: 'var(--text-main)'}}></span>
                                <span className={`block h-0.5 transition-all duration-300 ${isMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`} style={{background: 'var(--text-main)'}}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Fullscreen Mobile Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-[55] flex-col items-center justify-center md:hidden hidden opacity-0 translate-x-full"
                style={{ backgroundColor: 'var(--mobile-menu-bg)' }}
            >
                <div className="flex flex-col items-center gap-8">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={closeMenu}
                            ref={el => linkRef.current[i] = el}
                            className="group flex items-baseline gap-4"
                        >
                            <span className="font-mono text-violet-500 text-xs">{link.num}_</span>
                            <span
                                className={`text-4xl sm:text-5xl font-black tracking-tighter uppercase transition-colors`}
                                style={{ color: location.pathname === link.to ? 'var(--text-main)' : 'var(--text-muted)' }}
                            >
                                {link.label}
                            </span>
                        </Link>
                    ))}

                    <div ref={el => linkRef.current[navLinks.length] = el} className="mt-8 flex flex-col items-center gap-6">
                        <div className="w-12 h-[1px] bg-white/10" />
                        <Link
                            to="/#contact"
                            onClick={scrollToContact}
                            className="px-10 py-4 bg-violet-600 text-white rounded-full text-xs font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                        >
                            HIRE_ME
                        </Link>
                        <div className="flex gap-6 mt-4">
                            <span className="text-[10px] font-mono text-gray-500 uppercase">Helsinki, Finland</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
