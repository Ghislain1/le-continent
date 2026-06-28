import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

interface SocialLink {
  name: string
  href: string
  icon: string
}

const socials: SocialLink[] = [
  { name: 'Instagram', href: '#', icon: 'M' },
  { name: 'Facebook', href: '#', icon: 'f' },
  { name: 'TikTok', href: '#', icon: 't' },
]

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer data-nav="contact" className="bg-charcoal-900 border-t border-gold-400/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,theme(colors.bronze.700/0.3),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div>
            <div className="flex items-center gap-3 mb-6">
              <ShieldLogoSmall />
              <div>
                <h3 className="font-heading text-gold-400 text-lg">LE CONTINENT</h3>
                <p className="font-script text-cream-100/40 text-xs tracking-[0.3em] uppercase">Lounge &bull; Bar</p>
              </div>
            </div>
            <p className="text-cream-100/60 text-sm leading-relaxed font-body">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-gold-400 text-lg mb-6">{t('footer.visitTitle')}</h4>
            <div className="space-y-3 text-cream-100/70 text-sm font-body">
              <p>{t('footer.addressLine1')}</p>
              <p>{t('footer.addressLine2')}</p>
              <p className="pt-2">
                <span className="text-gold-400">{t('contact.info.phone')}:</span>{' '}
                <a href={`tel:${t('footer.phoneNumber')}`} className="hover:text-gold-400 transition-colors">{t('footer.phoneNumber')}</a>
              </p>
              <p>
                <span className="text-gold-400">{t('contact.info.email')}:</span>{' '}
                <a href={`mailto:${t('footer.emailAddress')}`} className="hover:text-gold-400 transition-colors">{t('footer.emailAddress')}</a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-gold-400 text-lg mb-6">{t('footer.hoursTitle')}</h4>
            <div className="space-y-3 text-cream-100/70 text-sm font-body">
              <div className="flex justify-between">
                <span>{t('footer.hours.0')}</span>
                <span className="text-cream-100/50">{t('footer.hourRanges.0')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.hours.1')}</span>
                <span className="text-cream-100/50">{t('footer.hourRanges.1')}</span>
              </div>
              <div className="flex justify-between text-gold-400">
                <span>{t('footer.hours.2')}</span>
                <span>{t('footer.hourRanges.2')}</span>
              </div>
              <p className="text-xs text-cream-100/40 pt-2">{t('footer.mondayClosed')}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold-400/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex gap-4">
            {socials.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full border border-gold-400/40 flex items-center justify-center text-gold-400 text-sm font-heading hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300"
                aria-label={s.name}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
          <p className="text-cream-100/30 text-xs tracking-wider font-body">
            &copy; {new Date().getFullYear()} LE CONTINENT LOUNGE • BAR. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

function ShieldLogoSmall(): React.JSX.Element {
  return (
    <svg viewBox="0 0 50 60" className="w-8 h-10" aria-hidden="true">
      <defs>
        <linearGradient id="gold-grad-sm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f4d03f" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <path d="M25 2 L48 12 L48 30 Q48 45 25 58 Q2 45 2 30 L2 12 Z"
        fill="none" stroke="url(#gold-grad-sm)" strokeWidth="2" />
      <text x="25" y="32" fontFamily="Playfair Display" fontSize="14" fill="url(#gold-grad-sm)"
        textAnchor="middle" fontWeight="700">LC</text>
    </svg>
  )
}
