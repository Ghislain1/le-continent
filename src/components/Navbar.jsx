import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Speisekarte' },
  { path: '/events', label: 'Events' },
  { path: '/gallery', label: 'Galerie' },
  { path: '/contact', label: 'Kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const bgClass = scrolled || !isHome
    ? 'bg-charcoal-900/95 backdrop-blur-md shadow-lg shadow-black/30'
    : 'bg-transparent'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}>
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
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm tracking-widest uppercase font-body font-medium transition-colors duration-300 ${
                    isActive ? 'text-gold-400' : 'text-cream-100/70 hover:text-cream-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-gold-400 to-gold-300"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="ml-6 px-6 py-2.5 border border-gold-400 text-gold-400 text-sm tracking-widest uppercase font-body font-medium hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300"
            >
              Reservieren
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-cream-100"
            aria-label="Menü öffnen"
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
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm tracking-widest uppercase font-body font-medium transition-colors ${
                        isActive ? 'text-gold-400 bg-gold-400/5' : 'text-cream-100/70 hover:text-cream-100'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt-4 px-4">
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 border border-gold-400 text-gold-400 text-sm tracking-widest uppercase font-body font-medium hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300"
                >
                  Reservieren
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
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
