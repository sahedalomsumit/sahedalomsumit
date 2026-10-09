import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [helsinkiTime, setHelsinkiTime] = useState('')
    const menuRef = useRef(null)
    const linkRef = useRef([])
    const bodyOverflowBeforeMenuRef = useRef('')
    const { theme, toggleTheme } = useTheme()

    // Real-time Helsinki Clock
    useEffect(() => {
        let formatter;
        try {
            formatter = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Europe/Helsinki',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        } catch {
            // fallback if timezone not supported
        }

        const updateTime = () => {
            try {
                if (formatter) {
                    setHelsinkiTime(`${formatter.format(new Date())} EEST`);
                } else {
                    setHelsinkiTime('Helsinki, FI');
                }
            } catch {
                setHelsinkiTime('Helsinki, FI');
            }
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu()
            }
        }
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                closeMenu()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('resize', handleResize)
        }
    }, [isMenuOpen])

    useEffect(() => {
        if (isMenuOpen) {
            bodyOverflowBeforeMenuRef.current = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                gsap.set(menuRef.current, { display: 'flex', x: 0, opacity: 1 })
                gsap.set(linkRef.current, { y: 0, opacity: 1 })
                return () => {
                    document.body.style.overflow = bodyOverflowBeforeMenuRef.current
                    gsap.set(menuRef.current, { display: 'none' })
                }
            }

            const tl = gsap.timeline()
            tl.set(menuRef.current, { display: 'flex' })
            tl.to(menuRef.current, { x: 0, opacity: 1, duration: 0.4, ease: 'power4.out' })
            tl.fromTo(linkRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power3.out' },
                "-=0.15"
            )
            return () => {
                tl.kill()
                document.body.style.overflow = bodyOverflowBeforeMenuRef.current
            }
        } else {
            document.body.style.overflow = bodyOverflowBeforeMenuRef.current
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                gsap.set(menuRef.current, { display: 'none', x: '100%', opacity: 0 })
                gsap.set(linkRef.current, { y: 20, opacity: 0 })
                return
            }

            const tl = gsap.timeline()
            tl.to(linkRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.2,
                stagger: 0.03,
                ease: 'power2.in'
            })
            tl.to(menuRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.35,
                ease: 'power4.in'
            }, "-=0.1")
            tl.set(menuRef.current, { display: 'none' })
            return () => tl.kill()
        }
    }, [isMenuOpen])

    const navLinks = [
        { to: '/', label: 'Home', num: '01' },
        { to: '/work', label: 'Work', num: '02' },
        { to: '/services', label: 'Services', num: '03' },
        { to: '/process', label: 'Process', num: '04' },
        { to: '/blog', label: 'Blog', num: '05' },
        { to: '/faq', label: 'FAQ', num: '06' },
        { to: '/estimate', label: 'Estimate', num: '07' },
    ]

    const isLinkActive = (to) => {
        if (to === '/') return location.pathname === '/'
        if (to === '/work') return location.pathname.startsWith('/work') || location.pathname.startsWith('/portfolio')
        if (to === '/estimate') return location.pathname === '/estimate' || location.pathname === '/quote'
        return location.pathname.startsWith(to)
    }

    const closeMenu = () => setIsMenuOpen(false)

    const scrollToContact = (e) => {
        closeMenu()
        const contactSection = document.getElementById('contact')
        if (contactSection) {
            e.preventDefault()
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <>
            <header
                className={`site-header fixed top-0 w-full z-[70] transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100'
                } ${scrolled ? 'sticky-header py-2.5' : 'py-3 md:py-4'}`}
                style={{
                    backgroundColor: scrolled ? 'var(--header-bg)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid var(--header-border)' : '1px solid transparent'
                }}
                id="main-header"
            >
                {/* Top Status Bar */}
                <div
                    className={`site-status-bar hidden lg:block transition-all duration-500 overflow-hidden ${scrolled ? 'is-collapsed max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}
                >
                    <div className="site-status-inner px-6 flex justify-between items-center text-[10px] tracking-wider pt-2 pb-2.5" style={{ color: 'var(--text-dim)' }}>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                Available for Upcoming Projects
                            </span>
                            <span className="text-gray-500">•</span>
                            <span>Product Designer & AI-Enhanced Web Developer</span>
                        </div>

                        <div className="flex items-center gap-5">
                            {helsinkiTime && (
                                <span className="flex items-center gap-1.5 font-mono text-[9px]">
                                    <span className="opacity-60">Helsinki:</span>
                                    <span className="font-semibold text-emerald-400">{helsinkiTime}</span>
                                </span>
                            )}
                            <span className="text-gray-600">|</span>
                            <a
                                href="https://wa.me/+358415765539"
                                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                                </svg>
                                Direct WhatsApp
                            </a>
                            <span className="text-gray-600">|</span>
                            <a
                                href="/img/web-designer-and-developer-sahed-alom-sumit.pdf"
                                className="hover:text-violet-400 transition-colors font-medium flex items-center gap-1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Resume
                                <svg className="w-2.5 h-2.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Bar */}
                <div className="site-header-inner px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between">
                    {/* Brand */}
                    <Link to="/" onClick={closeMenu} className="site-brand flex min-w-0 items-center gap-2 md:gap-3.5 group cursor-pointer z-[60]">
                        <div className="relative">
                            <img
                                className="sas-logo transition-transform duration-300 group-hover:scale-105 w-28 md:w-32"
                                src="/img/logo-sahed-alom-sumit.png"
                                alt="Sahed Alom Sumit Official Logo"
                            />
                            <div className="absolute -inset-1 rounded-lg bg-violet-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="h-6 w-px shrink-0" style={{ backgroundColor: 'var(--border)' }} />
                        <div className="flex min-w-0 flex-col">
                            <span className="whitespace-nowrap text-[10px] sm:text-[11px] font-semibold tracking-tight" style={{ color: 'var(--text-main)' }}>
                                Sahed Alom Sumit
                            </span>
                            <span className="text-[8px] sm:text-[9px] leading-tight uppercase tracking-wide sm:tracking-wider font-mono text-emerald-400">
                                Product Designer & AI-Enhanced Dev
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Pill Dock */}
                    <nav className="site-nav hidden md:flex items-center gap-1 p-1.5 rounded-full border shadow-sm backdrop-blur-xl transition-all"
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        {navLinks.map((link) => {
                            const isActive = isLinkActive(link.to)
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`site-nav-link relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${isActive ? 'is-active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right Action Group */}
                    <div className="site-header-actions hidden md:flex items-center gap-3">
                        <Link
                            to="/#contact"
                            onClick={scrollToContact}
                            className="site-header-cta shimmer-button flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md transform hover:-translate-y-0.5 hover:shadow-violet-500/20"
                            style={{
                                backgroundColor: 'var(--hire-btn-bg)',
                                color: 'var(--hire-btn-text)',
                            }}
                        >
                            <span>Let's Talk</span>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            id="theme-toggle-desktop"
                            onClick={toggleTheme}
                            className="site-theme-toggle theme-toggle"
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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
                    </div>

                    {/* Mobile: Toggle & Hamburger Button */}
                    <div className="md:hidden z-[80] flex items-center gap-2.5">
                        <button
                            id="theme-toggle-mobile"
                            onClick={toggleTheme}
                            className="site-theme-toggle theme-toggle"
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
                            className="w-10 h-10 rounded-full border flex items-center justify-center focus:outline-none transition-all hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: 'var(--card-bg)',
                                borderColor: 'var(--border)',
                            }}
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Open Navigation Menu"
                        >
                            <div className="w-5 flex flex-col items-end gap-1.5">
                                <span className="block h-0.5 w-5 rounded-full" style={{ background: 'var(--text-main)' }}></span>
                                <span className="block h-0.5 w-3.5 rounded-full" style={{ background: 'var(--text-main)' }}></span>
                                <span className="block h-0.5 w-4 rounded-full" style={{ background: 'var(--text-main)' }}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Fullscreen Mobile Drawer */}
            <div
                ref={menuRef}
                className={`fixed inset-0 z-[100000] flex flex-col justify-between p-6 sm:p-8 md:hidden backdrop-blur-2xl overflow-y-auto min-h-[100dvh] ${
                    isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                style={{ backgroundColor: 'var(--mobile-menu-bg)', display: 'none' }}
                role="dialog"
                aria-modal="true"
                aria-hidden={!isMenuOpen}
                aria-label="Mobile Navigation"
            >
                {/* Mobile Drawer Top Bar - Replaces the navbar when open */}
                <div className="flex justify-between items-center w-full pb-4 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-2.5">
                        <Link to="/" onClick={closeMenu} className="group flex items-center gap-2">
                            <img
                                className="sas-logo w-24 xs:w-28 transition-transform duration-300 group-hover:scale-105"
                                src="/img/logo-sahed-alom-sumit.png"
                                alt="Sahed Alom Sumit Official Logo"
                            />
                        </Link>
                        <span className="pill-badge text-emerald-400 text-[10px] py-0.5 px-2">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            Available
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            id="theme-toggle-drawer"
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
                            onClick={closeMenu}
                            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: 'var(--card-bg)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-main)',
                            }}
                            aria-label="Close Navigation Menu"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-3 sm:gap-4 my-auto py-6">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={closeMenu}
                            ref={el => linkRef.current[i] = el}
                            className="group flex items-center justify-between py-2 border-b transition-colors"
                            aria-current={isLinkActive(link.to) ? 'page' : undefined}
                            style={{ borderColor: 'var(--border-light)' }}
                        >
                            <span
                                className={`text-2xl sm:text-3xl font-heading font-bold tracking-tight uppercase transition-colors ${isLinkActive(link.to) ? 'is-active' : ''}`}
                                style={{ color: isLinkActive(link.to) ? 'var(--accent)' : 'var(--text-main)' }}
                            >
                                {link.label}
                            </span>
                            <span className="font-mono text-xs text-gray-500 group-hover:text-violet-400 transition-colors">
                                {link.num} →
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Drawer Footer CTA */}
                <div ref={el => linkRef.current[navLinks.length] = el} className="flex flex-col gap-4 shrink-0 pt-2 pb-2">
                    <Link
                        to="/#contact"
                        onClick={scrollToContact}
                        className="site-header-cta shimmer-button flex w-full items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-full text-sm font-semibold tracking-wide transition-all shadow-md"
                        style={{
                            backgroundColor: 'var(--hire-btn-bg)',
                            color: 'var(--hire-btn-text)',
                        }}
                    >
                        <span>Let's Talk</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <div className="flex justify-between items-center text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                        <span>Helsinki, Finland 🇫🇮</span>
                        {helsinkiTime && <span className="text-emerald-400 font-semibold">{helsinkiTime}</span>}
                    </div>
                </div>
            </div>
        </>
    )
}
