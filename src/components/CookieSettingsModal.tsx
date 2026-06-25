import { useEffect, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface CookieSettings {
  analytics: boolean
  preferences: boolean
}

interface CookieSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  onSave: (settings: CookieSettings) => void
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden: { y: '120%', opacity: 0, rotate: -2, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 18,
      stiffness: 140,
      mass: 0.9,
    },
  },
  exit: {
    y: '80%',
    opacity: 0,
    rotate: 1,
    scale: 0.95,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  },
}

const particles = [
  { x: -60, y: 30, size: 6, delay: 0.1, driftX: -20 },
  { x: 50, y: -20, size: 4, delay: 0.25, driftX: 15 },
  { x: -30, y: -50, size: 5, delay: 0.4, driftX: -12 },
  { x: 70, y: 40, size: 3, delay: 0.55, driftX: 18 },
  { x: 0, y: -60, size: 4, delay: 0.7, driftX: -8 },
  { x: -80, y: -10, size: 5, delay: 0.85, driftX: 14 },
]

const contentVariants = {
  hidden: () => ({
    opacity: 0,
    y: 40,
    scale: 0.96,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.25 + i * 0.08,
      duration: 0.5,
      ease: [0.19, 0.51, 0.32, 1] as [number, number, number, number],
    },
  }),
}

const sections = ['essential', 'analytics', 'preferences', 'manage'] as const

export function CookieSettingsModal({ isOpen, onClose, onAccept, onSave }: CookieSettingsModalProps) {
  const { t } = useTranslation()
  const [analytics, setAnalytics] = useState(false)
  const [preferences, setPreferences] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setAnalytics(false)
      setPreferences(true)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            key="cookie-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <m.div
            key="cookie-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none"
          >
            {particles.map((p, i) => (
              <m.div
                key={i}
                className="absolute pointer-events-none"
                initial={{ opacity: 0, y: 60, x: p.x, scale: 0 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  y: [60, -20, -80],
                  x: [p.x, p.x + p.driftX, p.x + p.driftX * 2],
                  scale: [0, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  delay: p.delay,
                  ease: 'easeOut',
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                style={{
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  opacity: 0.4,
                }}
              />
            ))}

            <div className="pointer-events-auto w-full max-w-lg max-h-[80vh] bg-(--color-bg) rounded-2xl shadow-2xl border border-(--color-border) overflow-y-auto">
              <div className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 bg-(--color-bg) border-b border-(--color-border) rounded-t-2xl">
                <Cookie className="h-5 w-5 text-(--color-primary)" />
                <h2 className="text-lg font-bold text-(--color-text) flex-1">
                  {t('cookie.title')}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-(--color-bg-alt) text-(--color-text-muted) hover:text-(--color-text) transition-colors cursor-pointer"
                  aria-label={t('cookie.close')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-5 text-sm text-(--color-text-muted) leading-relaxed">
                {sections.map((key, i) => (
                  <m.div
                    key={key}
                    custom={i}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-(--color-text) mb-1 text-base">
                          {t(`cookie.${key}.heading`)}
                        </h3>
                        <p>{t(`cookie.${key}.body`)}</p>
                      </div>
                      {key !== 'essential' && (
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={key === 'analytics' ? analytics : preferences}
                            onChange={() =>
                              key === 'analytics'
                                ? setAnalytics((v) => !v)
                                : setPreferences((v) => !v)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 rounded-full bg-(--color-border) peer-checked:bg-(--color-primary) transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                        </label>
                      )}
                    </div>
                  </m.div>
                ))}

                <m.div
                  custom={4}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col sm:flex-row gap-3 pt-2"
                >
                  <button
                    type="button"
                    onClick={() => { onAccept(); onClose() }}
                    className="flex-1 px-4 py-2.5 rounded-xl font-medium text-sm bg-(--color-primary) text-white hover:brightness-110 transition-all cursor-pointer"
                  >
                    {t('cookie.acceptAll')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { onSave({ analytics, preferences }); onClose() }}
                    className="flex-1 px-4 py-2.5 rounded-xl font-medium text-sm border border-(--color-border) text-(--color-text-muted) hover:bg-(--color-bg-alt) transition-all cursor-pointer"
                  >
                    {t('cookie.save')}
                  </button>
                </m.div>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
