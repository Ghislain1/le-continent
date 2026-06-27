import { useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../components/SectionTitle'
import Badge from '../components/Badge'

const sparklePositions = [
  { x: '10%', y: '15%', size: 4, delay: 0 },
  { x: '85%', y: '20%', size: 3, delay: 0.8 },
  { x: '25%', y: '70%', size: 5, delay: 1.6 },
  { x: '70%', y: '75%', size: 3, delay: 0.4 },
  { x: '50%', y: '10%', size: 4, delay: 2.0 },
  { x: '15%', y: '50%', size: 2, delay: 1.2 },
  { x: '90%', y: '55%', size: 4, delay: 0.6 },
  { x: '40%', y: '85%', size: 3, delay: 1.8 },
  { x: '60%', y: '30%', size: 2, delay: 0.2 },
  { x: '80%', y: '40%', size: 5, delay: 1.4 },
]

const iconPaths = {
  cocktail: 'M12 2L4 8v2l2 1v9l6 3 6-3v-9l2-1V8l-8-6z',
  ambiance: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z M12 8v4l3 3',
  sounds: 'M9 18V5l12-2v13 M6 10l-3 2v3l3 2 M18 13c0 2-1.5 3-3 3',
  events: 'M8 2v4 M16 2v4 M3 8h18 M5 8v12a2 2 0 002 2h10a2 2 0 002-2V8',
}

export default function Home() {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const specialRef = useRef(null)
  const featuresRef = useRef(null)
  const specialInView = useInView(specialRef, { once: true, margin: '-80px' })
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' })

  const features = useMemo(() => t('features.items', { returnObjects: true }), [t])

  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: 0.3 + i * 0.15, duration: 0.8, ease: 'easeOut' },
    }),
  }

  return (
    <>
      {/* HERO */}
      <section id="hero" data-nav="hero" ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero-poster.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/assets/taro_plat.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/80 via-charcoal-900/50 to-charcoal-900/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,10,0.7)_100%)]" />
        </div>

        {/* BLING BLING SPARKLES */}
        <SparkleOverlay />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div custom={0} initial="hidden" animate="visible" variants={heroTextVariants}>
            <ShieldLarge />
          </motion.div>
          <motion.h1 custom={1} initial="hidden" animate="visible" variants={heroTextVariants}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gold-400 tracking-wide"
          >
            LE CONTINENT
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="visible" variants={heroTextVariants}
            className="font-script text-xl sm:text-2xl md:text-3xl text-cream-100/80 italic mt-2"
          >
            Lounge &bull; Bar
          </motion.p>
          <motion.div custom={3} initial="hidden" animate="visible" variants={heroTextVariants}
            className="h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6"
          />
          <motion.p custom={4} initial="hidden" animate="visible" variants={heroTextVariants}
            className="font-body text-sm sm:text-base text-cream-100/50 tracking-[0.3em] uppercase mt-6"
          >
            {t('hero.tagline')}
          </motion.p>
          <motion.div custom={5} initial="hidden" animate="visible" variants={heroTextVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Link to="/menu"
              className="px-8 py-3.5 rounded-full text-charcoal-900 font-body font-semibold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg animate-fire animate-fire-bg hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #d4af37, #f4d03f, #d4af37, #b8860b)',
                backgroundSize: '200% 200%',
              }}
            >
              <span className="relative z-10">{t('hero.viewMenu')}</span>
            </Link>
            <Link to="/contact"
              className="px-8 py-3.5 rounded-full border border-gold-400 text-gold-400 font-body font-semibold text-sm tracking-widest uppercase hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300 animate-fire"
            >
              <span className="relative z-10">{t('hero.reserveTable')}</span>
            </Link>
            <a
              href="https://wa.me/491724730305"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#25D366]/50 text-[#25D366] font-body font-semibold text-sm tracking-widest uppercase hover:bg-[#25D366] hover:text-white transition-all duration-300"
            >
              <WhatsAppIconHero />
              WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute right-0 top-1/3 z-10 hidden lg:block"
        >
          <div className="bg-gradient-to-b from-gold-400/10 to-gold-400/5 backdrop-blur-sm border-l border-gold-400/30 py-6 px-3">
            <p className="font-script text-gold-400 text-sm writing-mode-vertical text-center"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              {t('hero.sideText')}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.svg
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-6 text-gold-400/60"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </motion.svg>
        </motion.div>

        {/* BLING BLING SHIMMER LINE */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #d4af37 20%, #f4d03f 50%, #d4af37 80%, transparent 100%)',
            filter: 'blur(2px)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          }}
        />
      </section>

      {/* SONNTAGS-SPECIAL */}
      <section id="special" data-nav="special" ref={specialRef} className="relative py-20 lg:py-28 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.bronze.700/0.2),transparent_70%)]" />
        <div className="max-w-6xl mx-auto relative">
          <SectionTitle
            subtitle={t('special.subtitle')}
            title={t('special.title')}
            scriptText={t('special.script')}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={specialInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative overflow-hidden border border-gold-400/20">
                <div className="aspect-[4/3] bg-gradient-to-br from-bronze-700 to-charcoal-800 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gold-400/20" viewBox="0 0 100 100" fill="none">
                    <rect x="10" y="20" width="80" height="60" rx="5" stroke="currentColor" strokeWidth="1" />
                    <path d="M30 20L50 5L70 20" stroke="currentColor" strokeWidth="1" fill="none" />
                    <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M35 35L65 65 M65 35L35 65" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="font-heading text-gold-400 text-xs tracking-[0.2em] uppercase bg-charcoal-900/80 px-3 py-1 border border-gold-400/30">
                    {t('special.signature')}
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-6 lg:mt-0 lg:absolute lg:-right-20 lg:top-1/2 lg:-translate-y-1/2">
                <Badge text={t('special.badge1')} />
                <Badge text={t('special.badge2')} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={specialInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-4"
            >
              <div className="border-l-2 border-gold-400/30 pl-6">
                <h3 className="font-heading text-2xl sm:text-3xl text-gold-400 mb-4">
                  {t('special.heading')}
                </h3>
                <p className="text-cream-100/70 font-body leading-relaxed mb-6">
                  {t('special.paragraph', { dish: 'Dimanche Taro' })}
                </p>
                <div className="space-y-3 text-sm text-cream-100/60 font-body">
                  {t('special.points', { returnObjects: true }).map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" data-nav="features" ref={featuresRef} className="relative py-20 lg:py-28 px-4 bg-charcoal-800/30">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            subtitle={t('features.subtitle')}
            title={t('features.title')}
            scriptText={t('features.script')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-8">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} isInView={featuresInView} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-block border border-gold-400/20 px-8 py-4 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold-400/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold-400/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold-400/40" />
              <p className="font-heading text-gold-400 text-lg">{t('features.cta')}</p>
              <p className="font-script text-cream-100/50 italic text-sm mt-1">{t('features.ctaScript')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section id="gallery-preview" data-nav="gallery" className="relative py-20 lg:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            subtitle={t('galleryPreview.subtitle')}
            title={t('galleryPreview.title')}
            scriptText={t('galleryPreview.script')}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
          >
            {[
              'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80',
              'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&q=80',
              'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80',
              'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400&q=80',
            ].map((url, i) => (
              <div key={i} className="aspect-square overflow-hidden border border-gold-400/10">
                <img
                  src={url}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              to="/gallery"
              className="inline-block px-8 py-3 rounded-full border border-gold-400 text-gold-400 text-sm tracking-widest uppercase font-body font-medium hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300 animate-fire"
            >
              {t('galleryPreview.viewAll')}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ feature, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-b from-bronze-700/40 to-charcoal-800/60 border border-gold-400/10 hover:border-gold-400/30 p-6 lg:p-8 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gold-400/0 via-gold-400/0 to-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 mb-5 text-gold-400"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <path d={iconPaths[feature.icon]} />
          </svg>
        </motion.div>
        <h3 className="font-heading text-lg text-gold-400 mb-2 group-hover:text-gold-300 transition-colors">
          {feature.title}
        </h3>
        <p className="text-cream-100/60 text-sm font-body leading-relaxed">
          {feature.desc}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  )
}

function SparkleOverlay() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      {sparklePositions.map((sp, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: sp.x, top: sp.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.8, 0],
            scale: [0, 1, 0.6, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5 + Math.random(),
            delay: sp.delay,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={sp.size * 3}
            height={sp.size * 3}
            viewBox="0 0 20 20"
            className="text-gold-400"
            style={{ filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.6))' }}
          >
            <defs>
              <linearGradient id={`bling-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f4d03f" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
            </defs>
            <path
              d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
              fill={`url(#bling-${i})`}
              opacity={0.8}
            />
          </svg>
        </motion.div>
      ))}
      {/* Floating small circles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full bg-gold-400"
          style={{
            width: (i % 3) + 2,
            height: (i % 3) + 2,
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 4) * 15}%`,
            boxShadow: '0 0 6px rgba(212,175,55,0.4)',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
            y: [-10, 10, -10],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + i * 0.3,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function WhatsAppIconHero() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-1.099-1.004-1.843-2.244-2.058-2.624-.215-.38-.023-.585.163-.774.166-.168.366-.438.549-.657.184-.219.245-.375.367-.625.123-.25.062-.468-.03-.65-.093-.182-.67-1.616-.92-2.213-.242-.575-.487-.575-.67-.585-.173-.01-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.096 3.2 5.077 4.487.71.306 1.264.493 1.696.631.714.227 1.364.195 1.877.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ShieldLarge() {
  return (
    <svg viewBox="0 0 50 60" className="w-14 h-16 sm:w-16 sm:h-20 mx-auto mb-4" aria-hidden="true">
      <defs>
        <linearGradient id="hero-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f4d03f" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <path d="M25 2 L48 12 L48 30 Q48 45 25 58 Q2 45 2 30 L2 12 Z"
        fill="none" stroke="url(#hero-gold)" strokeWidth="2.5" />
      <path d="M25 8 L43 16 L43 30 Q43 42 25 52 Q7 42 7 30 L7 16 Z"
        fill="none" stroke="url(#hero-gold)" strokeWidth="1.2" opacity="0.5" />
      <text x="25" y="32" fontFamily="Playfair Display" fontSize="16" fill="url(#hero-gold)"
        textAnchor="middle" fontWeight="700" letterSpacing="1">LC</text>
    </svg>
  )
}
