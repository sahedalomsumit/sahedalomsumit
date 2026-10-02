import { useEffect } from 'react'
import { Studio } from 'sanity'
import sanityConfig from '../../sanity.config'

export default function SanityStudio() {
  useEffect(() => {
    // Hide standard document scrollbar so Sanity Studio manages its own full-height layout
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: '#101112',
      }}
    >
      <Studio config={sanityConfig} />
    </div>
  )
}
