import { useState, useRef, useCallback } from 'react'

export default function Carousel({ children, className = '' }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)
  const startXRef = useRef(0)
  const isDraggingRef = useRef(false)
  const slides = Array.isArray(children) ? children : [children]
  const total = slides.length

  const goTo = useCallback((i) => setIndex(((i % total) + total) % total), [total])
  const next = useCallback(() => goTo(index + 1), [index, goTo])
  const prev = useCallback(() => goTo(index - 1), [index, goTo])

  const handlePointerDown = (e) => {
    isDraggingRef.current = true
    startXRef.current = e.clientX || e.touches?.[0]?.clientX || 0
    trackRef.current?.classList.add('grabbing')
  }
  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return
    const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0
    const diff = endX - startXRef.current
    if (diff > 50) prev()
    else if (diff < -50) next()
    isDraggingRef.current = false
    trackRef.current?.classList.remove('grabbing')
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="carousel-track flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full">{slide}</div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center sm:justify-between items-center mt-8">
        <button onClick={prev} aria-label="Previous Slide" className="hidden sm:block bg-zinc-800 hover:bg-zinc-700 px-6 py-2 rounded-full text-sm transition">Prev</button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition ${i === index ? 'bg-emerald-500' : 'bg-zinc-600'}`}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Next Slide" className="hidden sm:block bg-zinc-800 hover:bg-zinc-700 px-6 py-2 rounded-full text-sm transition">Next</button>
      </div>
    </div>
  )
}
