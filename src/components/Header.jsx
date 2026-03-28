import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export default function Header() {
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const linkRef = useRef([])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
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
        { to: '/process', label: 'PROCESS', num: '03' },
        { to: '/faqs', label: 'FAQS', num: '04' },
    ]

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <>
            <header
                className={`sticky top-0 w-full z-[70] sticky-header px-6 md:px-12 flex items-center justify-between transition-all ${scrolled || isMenuOpen ? 'py-3 bg-[#0a0a0a]/80 backdrop-blur-md' : 'py-4'}`}
                id="main-header"
            >
                <Link to="/" onClick={closeMenu} className="flex items-center group cursor-pointer z-[60]">
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

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`text-[10px] font-mono font-bold tracking-widest hover:text-violet-400 transition-all border-b pb-1 ${location.pathname === link.to
                                ? 'border-violet-500 text-violet-400'
                                : 'border-transparent hover:border-violet-500/50'
                                }`}
                        >
                            ./{link.label}
                        </Link>
                    ))}
                    <a
                        href="/#contact"
                        className="hidden sm:flex px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-black hover:bg-violet-500 hover:text-white transition-all tracking-[0.2em] items-center gap-2"
                    >
                        HIRE_ME
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="3" />
                        </svg>
                    </a>
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden z-[80] relative w-10 h-10 flex items-center justify-center focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className="w-6 flex flex-col items-end gap-1.5">
                        <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
                        <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 translate-x-3' : 'w-4'}`}></span>
                        <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`}></span>
                    </div>
                </button>
            </header>

            {/* Fullscreen Mobile Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 bg-[#0a0a0a] z-[55] flex-col items-center justify-center md:hidden hidden opacity-0 translate-x-full"
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
                            <span className={`text-4xl sm:text-5xl font-black tracking-tighter uppercase transition-colors ${location.pathname === link.to ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                                {link.label}
                            </span>
                        </Link>
                    ))}

                    <div ref={el => linkRef.current[navLinks.length] = el} className="mt-8 flex flex-col items-center gap-6">
                        <div className="w-12 h-[1px] bg-white/10" />
                        <a
                            href="/#contact"
                            onClick={closeMenu}
                            className="px-10 py-4 bg-violet-600 text-white rounded-full text-xs font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                        >
                            HIRE_ME
                        </a>
                        <div className="flex gap-6 mt-4">
                            <span className="text-[10px] font-mono text-gray-500 uppercase">Helsinki, Finland</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
