import { Link } from 'react-router-dom'
import RevealOnScroll from '../components/RevealOnScroll'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function NotFound() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Basic 404 animation
    gsap.fromTo('.not-found-el', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power4.out', delay: 0.3 })
  }, [])

  return (
    <>
      <section ref={containerRef} className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center">
        <RevealOnScroll>
          <div className="space-y-8 flex flex-col items-center">
            <div className="font-mono text-violet-500 text-xs tracking-[0.5em] font-bold uppercase not-found-el">
              Error_Code: 404
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none not-found-el">
              Page<br /><span className="text-emerald-500">Not Found</span>
            </h1>
            <p className="max-w-md mx-auto text-gray-400 text-lg font-light not-found-el">
              The page you are looking for has either drifted into another dimension or never existed in this vibe.
            </p>
            <div className="pt-8 not-found-el">
              <Link 
                to="/" 
                className="px-10 py-4 bg-white text-black font-black rounded-full text-xs tracking-[0.2em] hover:bg-violet-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-violet-500/10 uppercase"
              >
                Return to Base
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  )
}
