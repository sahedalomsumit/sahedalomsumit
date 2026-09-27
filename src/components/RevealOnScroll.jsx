import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RevealOnScroll({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // On mobile (<768px), skip horizontal translations to prevent overflow/scroll
    const isMobile = window.innerWidth < 768
    const usesX = (direction === 'left' || direction === 'right') && !isMobile

    // Set initial state based on direction
    const fromVars = { opacity: 0 }
    const toVars = { opacity: 1, duration: 1, delay, ease: 'power3.out' }

    if (usesX) {
      if (direction === 'left') {
        fromVars.x = -40
        toVars.x = 0
      } else {
        fromVars.x = 40
        toVars.x = 0
      }
    } else {
      switch (direction) {
        case 'down':
          fromVars.y = -30
          toVars.y = 0
          break
        case 'up':
        case 'left':
        case 'right':
        default:
          fromVars.y = 24
          toVars.y = 0
          break
      }
    }

    gsap.set(el, fromVars)

    toVars.scrollTrigger = {
      trigger: el,
      start: 'top 95%',
      end: 'top 60%',
      toggleActions: 'play none none none',
    }

    const tween = gsap.to(el, toVars)

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill()
      tween.kill()
    }
  }, [delay, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
