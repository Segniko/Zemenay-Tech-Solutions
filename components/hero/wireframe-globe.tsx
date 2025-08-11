'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useAnimation } from 'framer-motion'
import React from 'react'

interface WireframeGlobeProps {
  size?: number // px
  speedSec?: number
  className?: string
  responsive?: boolean
}

export default function WireframeGlobe({ size = 360, speedSec = 22, className = '', responsive = false }: WireframeGlobeProps) {
  const prefersReducedMotion = useReducedMotion()
  const R = size / 2
  const latAngles = [-60, -40, -20, 0, 20, 40, 60]
  const longCount = 9

  const lineAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut" as const,
      },
    },
  }

  return (
    <div className={className} style={{ width: responsive ? '100%' : size, height: responsive ? '100%' : size }}>
      <motion.svg
        width={responsive ? '100%' : size}
        height={responsive ? '100%' : size}
        viewBox={`0 0 ${size} ${size}`}
        initial={false}
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={prefersReducedMotion ? undefined : { duration: speedSec, ease: 'linear', repeat: Infinity }}
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.18)" />
            <stop offset="60%" stopColor="rgba(56,189,248,0.08)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </radialGradient>
          <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(148,163,184,0.6)" />
            <stop offset="50%" stopColor="rgba(56,189,248,0.9)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.6)" />
          </linearGradient>
        </defs>

        {/* soft glow */}
        <circle cx={R} cy={R} r={R * 0.98} fill="url(#glow)" />

        {/* outer ring */}
        <circle cx={R} cy={R} r={R - 2} fill="none" stroke="url(#line)" strokeWidth={1} />

        {/* latitude ellipses (simulate perspective by scaling Y) */}
        {latAngles.map((deg) => {
          const rad = (Math.PI / 180) * deg
          const rx = (R - 8) * Math.cos(rad)
          const ry = (R - 8) * 0.35 // squash for depth
          return (
            <ellipse
              key={`lat-${deg}`}
              cx={R}
              cy={R + (R - 8) * Math.sin(rad) * 0.18}
              rx={Math.max(0, rx)}
              ry={Math.max(2, ry)}
              fill="none"
              stroke="url(#line)"
              strokeWidth={0.8}
              opacity={0.1}
            />
          )
        })}

        {/* longitude ellipses */}
        {Array.from({ length: longCount }).map((_, i) => {
          const angle = (i / longCount) * 180
          return (
            <motion.ellipse
              key={`lon-${i}`}
              cx={R}
              cy={R}
              rx={R - 8}
              ry={(R - 8) * 0.38}
              transform={`rotate(${angle} ${R} ${R})`}
              fill="none"
              stroke="url(#line)"
              strokeWidth={0.8}
              opacity={0.1}
              initial="hidden"
              animate="visible"
              variants={lineAnimation}
            />
          )
        })}

        {/* longitude ellipses */}
        {Array.from({ length: longCount }).map((_, i) => {
          const angle = (i / longCount) * 180
          return (
            <ellipse
              key={`lon-${i}`}
              cx={R}
              cy={R}
              rx={R - 8}
              ry={(R - 8) * 0.38}
              transform={`rotate(${angle} ${R} ${R})`}
              fill="none"
              stroke="url(#line)"
              strokeWidth={0.8}
              opacity={0.6}
            />
          )
        })}

        {/* subtle pole caps */}
        <circle cx={R} cy={R - (R - 8) * 0.38} r={2.2} fill="rgba(56,189,248,0.7)" />
        <circle cx={R} cy={R + (R - 8) * 0.38} r={2.2} fill="rgba(56,189,248,0.7)" />
      </motion.svg>
    </div>
  )
}
