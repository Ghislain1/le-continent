import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../components/SectionTitle'

interface EventItem {
  subtitle: string
  title: string
  day: string
  time: string
  desc: string
  highlights: string[]
  gradient: string
  border: string
}

interface EventCardProps {
  event: EventItem
  index: number
  isInView: boolean
}

const eventTitles = ['Dimanche Taro', 'Live Music Nights', 'VIP Events', 'Kulinarische Reise']
const eventGradients = [
  'from-gold-400/20 to-bronze-700/20',
  'from-gold-400/15 to-charcoal-800/30',
  'from-gold-400/10 to-bronze-700/30',
  'from-gold-400/12 to-charcoal-800/25',
]
const eventBorders = [
  'border-gold-400/30',
  'border-gold-400/20',
  'border-gold-400/20',
  'border-gold-400/15',
]

export default function Events() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const transEvents = t('events.items', { returnObjects: true }) as Array<Omit<EventItem, 'title' | 'gradient' | 'border'>>
  const events: EventItem[] = transEvents.map((e, i) => ({
    ...e,
    title: eventTitles[i],
    gradient: eventGradients[i],
    border: eventBorders[i],
  }))

  return (
    <section className="pt-28 pb-20 lg:pt-32 lg:pb-28 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.bronze.700/0.15),transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          subtitle={t('events.subtitle')}
          title={t('events.title')}
          scriptText={t('events.script')}
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {events.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EventCard({ event, index, isInView }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className={`group relative bg-gradient-to-b ${event.gradient} border ${event.border} hover:border-gold-400/50 p-6 lg:p-8 transition-all duration-500 overflow-hidden`}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 border border-gold-400/5 rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-gold-400/5 rounded-full" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-body font-medium text-cream-100/40">
              {event.subtitle}
            </p>
            <h3 className="font-heading text-xl sm:text-2xl text-gold-400 mt-1 group-hover:text-gold-300 transition-colors">
              {event.title}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-script text-gold-400 text-sm">{event.day}</p>
            <p className="text-xs text-cream-100/50 font-body mt-1">{event.time}</p>
          </div>
        </div>

        <p className="text-cream-100/65 text-sm font-body leading-relaxed mb-6">
          {event.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {event.highlights.map((h) => (
            <span key={h}
              className="text-[10px] tracking-wider uppercase font-body font-medium text-gold-400/70 bg-gold-400/5 px-3 py-1.5 border border-gold-400/10"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
