import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const langs = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
]

const sectionToNav = { hero: 0, special: 1, features: 2, gallery: 3, contact: 4 }
const sectionIds = Object.keys(sectionToNav)

const navPaths = ['/', '/menu', '/events', '/gallery', '/contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [sectionProgress, setSectionProgress] = useState(0)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { t, i18n } = useTranslation()

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/menu', label: t('nav.menu') },
    { path: '/events', label: t('nav.events') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (!isHome) { setActiveSection(null); setSectionProgress(0); return }

    const observers = []

    sectionIds.forEach((id) => {
      const el = document.querySelector(`[data-nav="${id}"]`)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    const scrollHandler = () => {
      const docEl = document.documentElement
      const scrollTop = window.scrollY
      const scrollHeight = docEl.scrollHeight - window.innerHeight
      setSectionProgress(scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0)
    }
    window.addEventListener('scroll', scrollHandler)
    scrollHandler()

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [isHome])

  const bgClass = scrolled || !isHome
    ? 'bg-charcoal-900/95 backdrop-blur-md shadow-lg shadow-black/30'
    : 'bg-transparent'

  const sectionIndex = activeSection ? sectionIds.indexOf(activeSection) : -1

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}>
      {isHome && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal-800/50">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400"
            style={{ width: `${sectionProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link to="/" className="flex items-center gap-3 group">
            <ShieldLogo />
            <div className="hidden sm:block">
              <h1 className="font-heading text-gold-400 text-xl leading-tight tracking-wider group-hover:text-gold-300 transition-colors">
                LE CONTINENT
              </h1>
              <p className="font-script text-cream-100/60 text-xs tracking-[0.3em] uppercase">
                Lounge &bull; Bar
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const isRouteActive = location.pathname === link.path
              const isSpyActive = isHome && activeSection && sectionToNav[activeSection] === i
              const gold = isHome ? isSpyActive : isRouteActive
              return (
                <div key={link.path} className="relative">
                  <NavLink
                    to={link.path}
                    className={`relative px-4 py-2 text-sm tracking-widest uppercase font-body font-medium transition-colors duration-300 ${
                      gold ? 'text-gold-400' : 'text-cream-100/70 hover:text-cream-100'
                    }`}
                  >
                    {link.label}
                    {gold && (
                      <motion.div
                        layoutId={isHome ? 'nav-underline' : `nav-underline-${i}`}
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-gold-400 to-gold-300"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </NavLink>
                </div>
              )
            })}
            {isHome && activeSection && (
              <div className="flex gap-1.5 ml-3 mr-3">
                {sectionIds.map((sec) => (
                  <div
                    key={sec}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      sec === activeSection
                        ? 'bg-gold-400 scale-125'
                        : 'bg-cream-100/20 scale-100'
                    }`}
                  />
                ))}
              </div>
            )}
            <Link
              to="/contact"
              className="ml-3 px-6 py-2.5 rounded-full border border-gold-400 text-gold-400 text-sm tracking-widest uppercase font-body font-medium hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300 animate-fire"
            >
              <span className="relative z-10">{t('nav.reserve')}</span>
            </Link>
            <a
              href="https://wa.me/491724730305"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 w-10 h-10 rounded-full border border-gold-400/50 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300 animate-fire"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <div className="ml-4 flex gap-1.5 border-l border-gold-400/20 pl-4">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => i18n.changeLanguage(l.code)}
                  className={`text-[11px] tracking-widest uppercase font-body font-medium px-2 py-1 transition-all duration-300 ${
                    i18n.language === l.code ? 'text-gold-400' : 'text-cream-100/30 hover:text-cream-100/60'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-cream-100"
            aria-label={t('nav.openMenu')}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-current transition-colors"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-current"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-charcoal-900/98 backdrop-blur-md border-t border-gold-400/20"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    className={`block px-4 py-3 text-sm tracking-widest uppercase font-body font-medium transition-colors ${
                      (isHome ? activeSection && sectionToNav[activeSection] === i : location.pathname === link.path)
                        ? 'text-gold-400 bg-gold-400/5'
                        : 'text-cream-100/70 hover:text-cream-100'
                    }`}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt-4 px-4 space-y-3">
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 rounded-full border border-gold-400 text-gold-400 text-sm tracking-widest uppercase font-body font-medium hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300 animate-fire"
                >
                <span className="relative z-10">{t('nav.reserve')}</span>
              </Link>
              <a
                href="https://wa.me/491724730305"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-[#25D366]/50 text-[#25D366] text-sm tracking-widest uppercase font-body font-medium hover:bg-[#25D366] hover:text-white transition-all duration-300"
              >
                <WhatsAppIconSmall />
                WhatsApp
              </a>
              <div className="flex justify-center gap-4 pt-2">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => i18n.changeLanguage(l.code)}
                    className={`text-xs tracking-widest uppercase font-body font-medium transition-all duration-300 ${
                      i18n.language === l.code ? 'text-gold-400' : 'text-cream-100/30 hover:text-cream-100/60'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-1.099-1.004-1.843-2.244-2.058-2.624-.215-.38-.023-.585.163-.774.166-.168.366-.438.549-.657.184-.219.245-.375.367-.625.123-.25.062-.468-.03-.65-.093-.182-.67-1.616-.92-2.213-.242-.575-.487-.575-.67-.585-.173-.01-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.096 3.2 5.077 4.487.71.306 1.264.493 1.696.631.714.227 1.364.195 1.877.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function WhatsAppIconSmall() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-1.099-1.004-1.843-2.244-2.058-2.624-.215-.38-.023-.585.163-.774.166-.168.366-.438.549-.657.184-.219.245-.375.367-.625.123-.25.062-.468-.03-.65-.093-.182-.67-1.616-.92-2.213-.242-.575-.487-.575-.67-.585-.173-.01-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.096 3.2 5.077 4.487.71.306 1.264.493 1.696.631.714.227 1.364.195 1.877.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ShieldLogo() {
  return (
    <svg viewBox="0 0 50 60" className="w-10 h-12 lg:w-12 lg:h-14" aria-hidden="true">
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f4d03f" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <path d="M25 2 L48 12 L48 30 Q48 45 25 58 Q2 45 2 30 L2 12 Z"
        fill="none" stroke="url(#gold-grad)" strokeWidth="2.5" />
      <path d="M25 8 L43 16 L43 30 Q43 42 25 52 Q7 42 7 30 L7 16 Z"
        fill="none" stroke="url(#gold-grad)" strokeWidth="1.2" opacity="0.5" />
      <text x="25" y="32" fontFamily="Playfair Display" fontSize="16" fill="url(#gold-grad)"
        textAnchor="middle" fontWeight="700" letterSpacing="1">LC</text>
      <path d="M18 18 L18 22 M32 18 L32 22 M18 38 Q25 42 32 38"
        fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
    </svg>
  )
}
