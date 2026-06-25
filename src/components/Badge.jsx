import { motion } from 'framer-motion'

export default function Badge({ text, icon = 'crown', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, type: 'spring' }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      className={`relative ${className}`}
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-slow" aria-hidden="true">
          <defs>
            <linearGradient id="badge-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#f4d03f" />
              <stop offset="100%" stopColor="#b8860b" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="none" stroke="url(#badge-border)" strokeWidth="2" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="url(#badge-border)" strokeWidth="0.5" opacity="0.5" />
          <circle cx="60" cy="60" r="48" fill="none" stroke="url(#badge-border)" strokeWidth="0.3" opacity="0.3" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
          {icon === 'crown' && (
            <svg viewBox="0 0 24 16" className="w-5 h-4 mb-1" aria-hidden="true">
              <defs>
                <linearGradient id="crown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#f4d03f" />
                </linearGradient>
              </defs>
              <path d="M2 14 L2 4 L7 8 L12 2 L17 8 L22 4 L22 14 Z" fill="url(#crown-grad)" />
              <rect x="8" y="11" width="8" height="3" rx="1" fill="url(#crown-grad)" />
            </svg>
          )}
          <span className="text-[10px] sm:text-xs font-body font-bold text-cream-100 leading-tight tracking-wide uppercase">
            {text}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
