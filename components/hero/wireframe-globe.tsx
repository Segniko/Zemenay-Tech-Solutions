'use client'

import { motion, useReducedMotion, easeInOut } from 'framer-motion'

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
  
  // Animation variants for the pulsing effect
  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 8,
        ease: easeInOut,
        repeat: Infinity,
        repeatType: 'reverse' as const
      }
    }
  }

  return (
    <div className={className} style={{ width: responsive ? '100%' : size, height: responsive ? '100%' : size, position: 'relative' }}>
      {/* Animated glow effect */}
      <motion.div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'rad-gradient(50% 50% at 50% 50%, rgba(29, 78, 216, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
          filter: 'blur(32px)'
        }}
        animate={prefersReducedMotion ? {} : {
          background: [
            'radial-gradient(50% 50% at 50% 50%, rgba(29, 78, 216, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
            'radial-gradient(50% 50% at 30% 70%, rgba(29, 78, 216, 0.3) 0%, rgba(0, 0, 0, 0) 100%)',
            'radial-gradient(50% 50% at 70% 30%, rgba(29, 78, 216, 0.3) 0%, rgba(0, 0, 0, 0) 100%)',
            'radial-gradient(50% 50% at 50% 50%, rgba(29, 78, 216, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      <motion.svg
        width={responsive ? '100%' : size}
        height={responsive ? '100%' : size}
        viewBox={`0 0 ${size} ${size}`}
        initial="initial"
        animate={prefersReducedMotion ? "initial" : "animate"}
        variants={pulseVariants}
        style={{ position: 'relative' }}
      >
        <motion.g
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={prefersReducedMotion ? {} : { duration: speedSec, ease: 'linear', repeat: Infinity }}
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

        {/* outer ring with glow */}
        <circle 
          cx={R} 
          cy={R} 
          r={R - 2} 
          fill="none" 
          stroke="url(#line)" 
          strokeWidth={1} 
          style={{
            filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.3))'
          }}
        />

        {/* latitude ellipses with subtle animation */}
        {latAngles.map((deg, i) => {
          const rad = (Math.PI / 180) * deg
          const rx = (R - 8) * Math.cos(rad)
          const ry = (R - 8) * 0.35
          const delay = (i / latAngles.length) * 0.5
          
          return (
            <motion.ellipse
              key={`lat-${deg}`}
              cx={R}
              cy={R + (R - 8) * Math.sin(rad) * 0.18}
              rx={Math.max(0, rx)}
              ry={Math.max(2, ry)}
              fill="none"
              stroke="url(#line)"
              strokeWidth={0.8}
              initial={{ opacity: 0.1 }}
              animate={prefersReducedMotion ? {} : {
                opacity: [0.1, 0.2, 0.1],
                transition: {
                  duration: 3,
                  delay,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }
              }}
            />
          )
        })}

        {/* longitude ellipses with staggered animation */}
        {Array.from({ length: longCount }).map((_, i) => {
          const angle = (i / longCount) * 180
          const delay = (i / longCount) * 0.3
          
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
              initial={{ opacity: 0.4 }}
              animate={prefersReducedMotion ? {} : {
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 4,
                  delay,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }
              }}
            />
          )
        })}

        {/* subtle pole caps */}
        <circle cx={R} cy={R - (R - 8) * 0.38} r={2.2} fill="rgba(56,189,248,0.7)" />
        <circle cx={R} cy={R + (R - 8) * 0.38} r={2.2} fill="rgba(56,189,248,0.7)" />
        </motion.g>
      </motion.svg>
    </div>
  )
}