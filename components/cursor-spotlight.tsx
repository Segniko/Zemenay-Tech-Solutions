'use client'

import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function CursorSpotlight() {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xs = useSpring(x, { stiffness: 300, damping: 40, mass: 0.6 })
  const ys = useSpring(y, { stiffness: 300, damping: 40, mass: 0.6 })

  useEffect(() => {
    if (prefersReducedMotion) return
    const handle = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', handle, { passive: true })
    return () => window.removeEventListener('pointermove', handle)
  }, [prefersReducedMotion, x, y])

  return (
    <>
      {/* Light theme: render normally (no blend) so it is clearly visible on white */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] block dark:hidden"
        style={{
          background: useMotionTemplate`radial-gradient(280px 280px at ${xs}px ${ys}px, rgba(56,189,248,0.32), transparent 60%)`,
        }}
      />
      {/* Dark theme: softer, soft-light blend to avoid overpowering */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-soft-light hidden dark:block"
        style={{
          background: useMotionTemplate`radial-gradient(260px 260px at ${xs}px ${ys}px, rgba(56,189,248,0.20), transparent 60%)`,
        }}
      />
    </>
  )
}
