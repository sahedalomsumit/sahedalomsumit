import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AuraBackground() {
  const aura1Ref = useRef(null)
  const aura2Ref = useRef(null)

  useEffect(() => {
    // Skip heavy mouse tracking on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const aura1 = aura1Ref.current
    const aura2 = aura2Ref.current
    if (!aura1 || !aura2) return

    const setAura1X = gsap.quickTo(aura1, "x", { duration: 2.5, ease: "power1.out" })
    const setAura1Y = gsap.quickTo(aura1, "y", { duration: 2.5, ease: "power1.out" })
    const setAura2X = gsap.quickTo(aura2, "x", { duration: 3, ease: "power1.out" })
    const setAura2Y = gsap.quickTo(aura2, "y", { duration: 3, ease: "power1.out" })

    const handleMouseMove = (e) => {
      const xPercent = (e.clientX / window.innerWidth - 0.5) * 40
      const yPercent = (e.clientY / window.innerHeight - 0.5) * 40
      setAura1X(xPercent)
      setAura1Y(yPercent)
      setAura2X(-xPercent * 0.8)
      setAura2Y(-yPercent * 0.8)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div
        ref={aura1Ref}
        className="aura"
        id="aura-1"
        style={{ top: '-15%', left: '15%' }}
      />
      <div
        ref={aura2Ref}
        className="aura"
        id="aura-2"
        style={{ bottom: '-15%', right: '10%' }}
      />
      {/* Subtle top spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-violet-500/[0.07] to-transparent pointer-events-none"
      />
    </div>
  )
}
