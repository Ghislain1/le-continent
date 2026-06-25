import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

function SteamParticle({ delay, x }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.3, x: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0],
        y: [-20, -60, -100],
        scale: [0.3, 1.2, 0.8, 0],
        x: x,
      }}
      transition={{ duration: 12.5, delay, ease: 'easeOut' }}
      className="absolute bottom-0 pointer-events-none"
      style={{ left: '50%' }}
    >
      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-t from-white/40 via-cream-100/30 to-transparent blur-sm" />
    </motion.div>
  )
}

function SteamBurst({ trigger }) {
  if (!trigger) return null
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 1.8,
    x: (i % 2 === 0 ? 1 : -1) * (10 + Math.random() * 30),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '200px' }}>
      <AnimatePresence>
        {particles.map((p) => (
          <SteamParticle key={p.id} delay={p.delay} x={p.x} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function SectionTitle({ subtitle, title, scriptText, light = false, center = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hasFired, setHasFired] = useState(false)
  const [showSteam, setShowSteam] = useState(false)

  useEffect(() => {
    if (isInView && !hasFired) {
      setHasFired(true)
      const t1 = setTimeout(() => setShowSteam(true), 600)
      const t2 = setTimeout(() => setShowSteam(false), 3500)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [isInView, hasFired])

  return (
    <div ref={ref} className={`mb-12 lg:mb-16 ${center ? 'text-center' : ''}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 3.5, delay: 0.1 }}
          className={`text-xs tracking-[0.3em] uppercase font-body font-medium mb-3 ${light ? 'text-cream-100/40' : 'text-cream-100/30'}`}
        >
          {subtitle}
        </motion.p>
      )}

      <div className="relative inline-block">
        <motion.h2
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={isInView ? {
            opacity: 1, scale: 1, y: 0,
            textShadow: [
              '0 0 40px rgba(244,208,63,0.8), 0 0 80px rgba(255,140,0,0.6), 0 0 120px rgba(255,69,0,0.3)',
              '0 0 60px rgba(244,208,63,0.6), 0 0 100px rgba(255,140,0,0.4), 0 0 140px rgba(255,69,0,0.2)',
              '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.1)',
              'none',
            ],
          } : {}}
          transition={{ duration: 2.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-400 relative`}
        >
          {title}
        </motion.h2>

        {/* Steam overlay */}
        <SteamBurst trigger={showSteam} />
      </div>

      {scriptText && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className={`font-script text-xl sm:text-2xl mt-2 italic ${light ? 'text-cream-100/60' : 'text-cream-100/40'}`}
        >
          {scriptText}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mt-6 ${center ? 'mx-auto' : ''}`}
        style={{ width: center ? '120px' : '80px' }}
      />
    </div>
  )
}
