import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from '../components/SectionTitle'

const categories = [
  { id: 'all', label: 'Alle' },
  { id: 'mains', label: 'Hauptgerichte' },
  { id: 'drinks', label: 'Getränke' },
  { id: 'specialties', label: 'Spezialitäten' },
]

const menuItems = [
  {
    id: 1, category: 'mains', name: 'Dimanche Taro', price: '24,90 €',
    desc: 'Traditionelles Taro-Gericht mit Erdnuss-Sauce, serviert mit Kochbananen und saisonalem Gemüse.',
    tags: ['Signature', 'Traditionell'],
  },
  {
    id: 2, category: 'mains', name: 'Poulet DG', price: '22,50 €',
    desc: 'Kamerunisches Hähnchengericht mit Plantains, Gemüse und einer würzigen Tomaten-Crema.',
    tags: ['Klassiker'],
  },
  {
    id: 3, category: 'mains', name: 'Ndolé', price: '26,00 €',
    desc: 'Bitterblätter-Eintopf mit Garnelen, Erdnüssen und Palmöl – ein kulinarisches Highlight.',
    tags: ['Traditionell', 'Fisch'],
  },
  {
    id: 4, category: 'mains', name: 'Poisson Braisé', price: '28,50 €',
    desc: 'Gegrillter Zander mit würziger Marinade, dazu Maniok und grüne Bohnen.',
    tags: ['Fisch', 'Gegrillt'],
  },
  {
    id: 5, category: 'drinks', name: 'LE CONTINENT Cocktail', price: '14,00 €',
    desc: 'Hauskreation aus Mango-Passionsfrucht, Wodka, Limette & einem Hauch Minze.',
    tags: ['Signature', 'Cocktail'],
  },
  {
    id: 6, category: 'drinks', name: 'Afrikanischer Eistee', price: '6,50 €',
    desc: 'Hibiskus-Ingwer-Tee mit Honig und frischer Minze – erfrischend & authentisch.',
    tags: ['Erfrischung'],
  },
  {
    id: 7, category: 'drinks', name: 'Premium Weinauswahl', price: 'ab 9,00 €',
    desc: 'Erlesene Weine aus Südafrika, Frankreich und Deutschland – auf Anfrage empfehlen wir gern.',
    tags: ['Wein'],
  },
  {
    id: 8, category: 'drinks', name: 'Mocktail Passion', price: '8,50 €',
    desc: 'Alkoholfreier Genuss aus Maracuja, Kokosmilch und Limette.',
    tags: ['Mocktail'],
  },
  {
    id: 9, category: 'specialties', name: 'Trio de Dips', price: '12,00 €',
    desc: 'Drei hausgemachte Dips: Erdnuss, Avocado, Tomaten-Chili – mit Maniok-Chips.',
    tags: ['Starter', 'Teilen'],
  },
  {
    id: 10, category: 'specialties', name: 'Brochettes Variées', price: '18,50 €',
    desc: 'Spieße vom Rind, Hähnchen und Garnelen mit Yakitori-Glasur und Gemüse.',
    tags: ['Grill', 'Teilen'],
  },
  {
    id: 11, category: 'specialties', name: 'Café Touba', price: '5,00 €',
    desc: 'Senegalesischer Kaffee mit Nelken und schwarzem Pfeffer – ein energiegeladener Genuss.',
    tags: ['Kaffee', 'Authentisch'],
  },
  {
    id: 12, category: 'specialties', name: 'Maisch-Mix Platte', price: '34,00 €',
    desc: 'Große Degustationsplatte für zwei Personen mit verschiedenen kamerunischen Spezialitäten.',
    tags: ['Teilen', 'Degustation'],
  },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const ref = useRef(null)

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <section className="pt-28 pb-20 lg:pt-32 lg:pb-28 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.bronze.700/0.15),transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          subtitle="Unsere Karte"
          title="Speisekarte"
          scriptText="Aromen die verbinden"
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

function MenuItemCard({ item }) {
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
        {item.tags.map((tag) => (
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
