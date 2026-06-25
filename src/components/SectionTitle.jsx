import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionTitle({ subtitle, title, scriptText, light = false, center = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className={`mb-12 lg:mb-16 ${center ? 'text-center' : ''}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-xs tracking-[0.3em] uppercase font-body font-medium mb-3 ${light ? 'text-cream-100/40' : 'text-cream-100/30'}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-400`}
      >
        {title}
      </motion.h2>
      {scriptText && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`font-script text-xl sm:text-2xl mt-2 italic ${light ? 'text-cream-100/60' : 'text-cream-100/40'}`}
        >
          {scriptText}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mt-6 ${center ? 'mx-auto' : ''}`}
        style={{ width: center ? '120px' : '80px' }}
      />
    </div>
  )
}
