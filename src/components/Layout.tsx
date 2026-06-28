import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'
import Footer from './Footer'
import { CookieSettingsModal } from './CookieSettingsModal'
import { useToast } from '../hooks/useToast'

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -24 },
}

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.4,
}

interface LayoutProps {
  children: React.ReactNode
}

interface CookieSettings {
  analytics: boolean
  preferences: boolean
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const { showToast } = useToast()
  const [showBanner, setShowBanner] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const localAnalyticsPreferencesKey: string = "LeContinent_Cookie_Consent"
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const consent = localStorage.getItem(localAnalyticsPreferencesKey)
    if (!consent) setShowBanner(true)
  }, [])

  // Handle when user  on Accept All Click
  const handleAcceptAll = () => {
    let consentValue = JSON.stringify({ analytics: true, preferences: true })
    localStorage.setItem(localAnalyticsPreferencesKey, consentValue)
    showToast(t('cookie.save'))
    setShowBanner(false)
  }

  const handleSave = (settings: CookieSettings) => {
    localStorage.setItem(localAnalyticsPreferencesKey, JSON.stringify(settings))
    setShowBanner(false)
  }
  // Handle when user  on Cookie Management
  const openModal = () => {
    showToast("COOKKK")
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-charcoal-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-400 focus:text-charcoal-900 focus:text-sm focus:font-body focus:rounded"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      <CookieSettingsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAccept={handleAcceptAll}
        onSave={handleSave}
      />

      <AnimatePresence>
        {showBanner && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('cookie.title')}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-charcoal-900/95 backdrop-blur-md border-t border-gold-400/20 px-4 py-4"
          >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-cream-100/60 text-sm font-body text-center sm:text-left">
                {t('cookie.title')} &mdash; {t('cookie.essential.body')}
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={openModal}
                  className="text-xs tracking-widest uppercase font-body font-medium text-cream-100/50 hover:text-cream-100 transition-colors cursor-pointer"
                >
                  {t('cookie.manage.heading')}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-2 rounded-full bg-gold-400 text-charcoal-900 text-xs tracking-widest uppercase font-body font-semibold hover:brightness-110 transition-all cursor-pointer"
                >
                  {t('cookie.acceptAll')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
