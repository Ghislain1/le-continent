import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../components/SectionTitle'

interface MenuItem {
  id: number
  category: string
  name: string
  price: string
  desc?: string
  tags?: string[]
}

interface MenuItemCardProps {
  item: MenuItem
}

const categoryIds = ['all', 'mains', 'drinks', 'specialties']

const staticItems: MenuItem[] = [
  { id: 1, category: 'mains', name: 'Dimanche Taro', price: '24,90 €' },
  { id: 2, category: 'mains', name: 'Poulet DG', price: '22,50 €' },
  { id: 3, category: 'mains', name: 'Ndolé', price: '26,00 €' },
  { id: 4, category: 'mains', name: 'Poisson Braisé', price: '28,50 €' },
  { id: 5, category: 'drinks', name: 'LE CONTINENT Cocktail', price: '14,00 €' },
  { id: 6, category: 'drinks', name: 'Afrikanischer Eistee', price: '6,50 €' },
  { id: 7, category: 'drinks', name: 'Premium Weinauswahl', price: 'ab 9,00 €' },
  { id: 8, category: 'drinks', name: 'Mocktail Passion', price: '8,50 €' },
  { id: 9, category: 'specialties', name: 'Trio de Dips', price: '12,00 €' },
  { id: 10, category: 'specialties', name: 'Brochettes Variées', price: '18,50 €' },
  { id: 11, category: 'specialties', name: 'Café Touba', price: '5,00 €' },
  { id: 12, category: 'specialties', name: 'Maisch-Mix Platte', price: '34,00 €' },
]

export default function Menu() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const ref = useRef<HTMLDivElement>(null)

  const categories = categoryIds.map(id => ({ id, label: t(`menu.categories.${id}`) }))
  const transItems = t('menu.items', { returnObjects: true }) as Array<{ desc?: string; tags?: string[] }>
  const menuItems = staticItems.map((item, i) => ({
    ...item,
    desc: transItems[i]?.desc || '',
    tags: transItems[i]?.tags || [],
  }))

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <section className="pt-28 pb-20 lg:pt-32 lg:pb-28 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.bronze.700/0.15),transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          subtitle={t('menu.subtitle')}
          title={t('menu.title')}
          scriptText={t('menu.script')}
        />

        {/* FILTER TABS */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" ref={ref}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-body font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'text-charcoal-900'
                  : 'text-cream-100/60 hover:text-cream-100 border border-gold-400/20'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="menu-bg"
                  className="absolute inset-0 bg-gold-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* MENU ITEMS GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group relative bg-gradient-to-b from-bronze-700/30 to-charcoal-800/40 border border-gold-400/10 hover:border-gold-400/30 p-6 transition-all duration-500"
    >
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold-400/20 group-hover:border-gold-400/50 transition-colors" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold-400/20 group-hover:border-gold-400/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold-400/20 group-hover:border-gold-400/50 transition-colors" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold-400/20 group-hover:border-gold-400/50 transition-colors" />

      <div className="flex justify-between items-start mb-3">
        <h3 className="font-heading text-lg text-gold-400 group-hover:text-gold-300 transition-colors">
          {item.name}
        </h3>
        <span className="font-body text-sm text-gold-400 font-semibold whitespace-nowrap ml-4">
          {item.price}
        </span>
      </div>
      <p className="text-cream-100/60 text-sm font-body leading-relaxed mb-4">
        {item.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {item.tags?.map((tag) => (
          <span key={tag}
            className="text-[10px] tracking-wider uppercase font-body font-medium text-gold-400/60 bg-gold-400/5 px-2 py-1 border border-gold-400/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
