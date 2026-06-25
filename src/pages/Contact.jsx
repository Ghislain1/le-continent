import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../components/SectionTitle'

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section className="pt-28 pb-20 lg:pt-32 lg:pb-28 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.bronze.700/0.15),transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          subtitle={t('contact.subtitle')}
          title={t('contact.title')}
          scriptText={t('contact.script')}
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-8">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-gold-400/30 p-8 text-center"
              >
                <svg className="w-12 h-12 text-gold-400 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="font-heading text-gold-400 text-xl mb-2">{t('contact.form.successTitle')}</p>
                <p className="text-cream-100/60 text-sm font-body">{t('contact.form.successText')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase font-body font-medium text-cream-100/50 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-charcoal-800/50 border border-gold-400/20 px-4 py-3 text-cream-100 font-body text-sm focus:border-gold-400/60 focus:outline-none transition-colors placeholder:text-cream-100/20"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase font-body font-medium text-cream-100/50 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-charcoal-800/50 border border-gold-400/20 px-4 py-3 text-cream-100 font-body text-sm focus:border-gold-400/60 focus:outline-none transition-colors placeholder:text-cream-100/20"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase font-body font-medium text-cream-100/50 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-charcoal-800/50 border border-gold-400/20 px-4 py-3 text-cream-100 font-body text-sm focus:border-gold-400/60 focus:outline-none transition-colors placeholder:text-cream-100/20 resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-full text-charcoal-900 font-body font-semibold text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer animate-fire animate-fire-bg hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #f4d03f, #d4af37, #b8860b)',
                    backgroundSize: '200% 200%',
                  }}
                >
                  <span className="relative z-10">{t('contact.form.send')}</span>
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* INFO + MAP */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoBox
                icon="map"
                title={t('contact.info.address')}
                lines={['Leunastraße 36', '65929 Frankfurt am Main']}
              />
              <InfoBox
                icon="phone"
                title={t('contact.info.phone')}
                lines={['+49 69 00000000']}
                href="tel:+496900000000"
              />
              <InfoBox
                icon="mail"
                title={t('contact.info.email')}
                lines={['info@lecontinent.de']}
                href="mailto:info@lecontinent.de"
              />
              <InfoBox
                icon="clock"
                title={t('contact.info.hours')}
                lines={t('contact.info.hoursLines', { returnObjects: true })}
              />
            </div>

            <div className="border border-gold-400/20 overflow-hidden">
              <div className="aspect-[16/9] bg-gradient-to-br from-bronze-700/50 to-charcoal-800/80 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-gold-400/30 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="font-heading text-gold-400 text-sm">{t('contact.mapLabel')}</p>
                  <p className="text-cream-100/40 text-xs font-body mt-1">Leunastraße 36, 65929 Frankfurt</p>
                </div>
              </div>
            </div>

            <div className="border border-gold-400/10 p-5">
              <p className="font-script text-gold-400 text-lg italic text-center">
                {t('contact.quote')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InfoBox({ icon, title, lines, href }) {
  const icons = {
    map: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z',
    phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z',
    mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
    clock: 'M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z M12 6v6l4 2',
  }

  return (
    <div className="group bg-charcoal-800/30 border border-gold-400/10 hover:border-gold-400/30 p-5 transition-all duration-500">
      <svg className="w-6 h-6 text-gold-400 mb-3 group-hover:text-gold-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={icons[icon]} />
      </svg>
      <h4 className="font-heading text-gold-400 text-sm mb-2">{title}</h4>
      <div className="text-cream-100/60 text-sm font-body leading-relaxed">
        {lines.map((line, i) => (
          <p key={i}>
            {href ? <a href={href} className="hover:text-gold-400 transition-colors">{line}</a> : line}
          </p>
        ))}
      </div>
    </div>
  )
}
