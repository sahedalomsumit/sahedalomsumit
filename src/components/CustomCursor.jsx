import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Disable custom cursor on touch devices or if coarse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // High performance coordinate setters via GSAP quickTo
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power2.out" })
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power2.out" })
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power2.out" })
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power2.out" })

    const handleMouseMove = (e) => {
      setDotX(e.clientX - 4)
      setDotY(e.clientY - 4)
      setRingX(e.clientX - 18)
      setRingY(e.clientY - 18)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = target.closest('a, button, input, select, textarea, .bento-card, [role="button"]')
      if (isInteractive) {
        const styles = getComputedStyle(document.documentElement)
        gsap.to(ring, {
          scale: 1.6,
          borderColor: styles.getPropertyValue('--accent').trim(),
          backgroundColor: styles.getPropertyValue('--accent-glow').trim(),
          duration: 0.2,
        })
        gsap.to(dot, { scale: 0.5, duration: 0.2 })
      } else {
        const styles = getComputedStyle(document.documentElement)
        gsap.to(ring, {
          scale: 1,
          borderColor: styles.getPropertyValue('--border').trim(),
          backgroundColor: 'transparent',
          duration: 0.2,
        })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        id="cursor"
        className="hidden md:block fixed pointer-events-none z-[9999] w-2 h-2 bg-white rounded-full mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="hidden md:block fixed pointer-events-none z-[9998] w-9 h-9 rounded-full border border-white/20 transition-colors"
      />
    </>
  )
}
