import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from '../components/SectionTitle'

const events = [
  {
    title: 'Dimanche Taro',
    subtitle: 'Sonntags-Special',
    day: 'Jeden Sonntag',
    time: '10:00 – 22:00 Uhr',
    desc: 'Unser Signature-Event: Genießen Sie traditionelle kamerunische Gerichte in entspannter Lounge-Atmosphäre. Live-Kochstationen und authentische Musik begleiten Ihren Sonntag.',
    highlights: ['Live-Kochshow', 'Signature Cocktails', 'Family-Friendly'],
    gradient: 'from-gold-400/20 to-bronze-700/20',
    border: 'border-gold-400/30',
  },
  {
    title: 'Live Music Nights',
    subtitle: 'Wochenend-Event',
    day: 'Jeden Freitag & Samstag',
    time: '20:00 – 02:00 Uhr',
    desc: 'Erleben Sie Live-Performances von regionalen und internationalen Künstlern. Von Afrobeat über Jazz bis hin zu modernen Lounge-Klängen – für jede Stimmung ist gesorgt.',
    highlights: ['Live-Bands & DJs', 'Tanzen & Genießen', 'VIP-Area'],
    gradient: 'from-gold-400/15 to-charcoal-800/30',
    border: 'border-gold-400/20',
  },
  {
    title: 'VIP Events',
    subtitle: 'Exklusiv & Privat',
    day: 'Nach Vereinbarung',
    time: 'Individuelle Planung',
    desc: 'Ob Geburtstage, Firmenevents oder besondere Anlässe – wir gestalten Ihren Abend exklusiv nach Ihren Wünschen. Unser Team kümmert sich um jedes Detail.',
    highlights: ['Private Lounge', 'Personalisiertes Menü', 'Full Service'],
    gradient: 'from-gold-400/10 to-bronze-700/30',
    border: 'border-gold-400/20',
  },
  {
    title: 'Kulinarische Reise',
    subtitle: 'Monats-Special',
    day: 'Jeden 1. Samstag im Monat',
    time: '18:00 – 23:00 Uhr',
    desc: 'Lassen Sie sich von einem mehrgängigen Überraschungsmenü durch die Aromen Zentralafrikas führen. Jeder Monat enthüllt eine neue kulinarische Geschichte.',
    highlights: ['4-Gänge-Menü', 'Weinbegleitung', 'Limited Seats'],
    gradient: 'from-gold-400/12 to-charcoal-800/25',
    border: 'border-gold-400/15',
  },
]

export default function Events() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="pt-28 pb-20 lg:pt-32 lg:pb-28 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.bronze.700/0.15),transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          subtitle="Events & Veranstaltungen"
          title="Erlebe LE CONTINENT"
          scriptText="Momente die bleiben"
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

function EventCard({ event, index, isInView }) {
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
