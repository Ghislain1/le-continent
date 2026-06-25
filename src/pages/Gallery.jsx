import { useState, useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../components/SectionTitle'

const categoryIds = ['all', 'ambient', 'food', 'drinks', 'events']

const galleryItems = [
  {
    id: 1, label: 'Interieur', cat: 'ambient', cols: 1, rows: 1.2,
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    alt: 'Luxuriöses Restaurant Interieur mit warmem Licht und edlen Möbeln',
  },
  {
    id: 2, label: 'Ambiente Lounge', cat: 'ambient', cols: 1, rows: 1,
    img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80',
    alt: 'Elegante Lounge-Bar mit Cocktails und gedämpfter Beleuchtung',
  },
  {
    id: 3, label: 'Gerichte', cat: 'food', cols: 1, rows: 1,
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    alt: 'Kunstvoll angerichtetes Gericht auf einem Teller',
  },
  {
    id: 4, label: 'Dimanche Taro', cat: 'food', cols: 1, rows: 1.5,
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    alt: 'Traditionelles Taro-Gericht mit frischen Zutaten',
  },
  {
    id: 5, label: 'Cocktails', cat: 'drinks', cols: 1, rows: 1,
    img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80',
    alt: 'Frisch zubereiteter Cocktail mit Garnitur',
  },
  {
    id: 6, label: 'Bar', cat: 'drinks', cols: 1.5, rows: 1,
    img: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&q=80',
    alt: 'Elegante Bar-Theke mit flaschen und Gläsern',
  },
  {
    id: 7, label: 'Live Music', cat: 'events', cols: 1, rows: 1,
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    alt: 'Live-Musik Performance auf der Bühne mit Scheinwerfern',
  },
  {
    id: 8, label: 'Events', cat: 'events', cols: 1, rows: 1.2,
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
    alt: 'Festliche Veranstaltung mit Gästen und Dekoration',
  },
  {
    id: 9, label: 'Desserts', cat: 'food', cols: 1, rows: 1,
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
    alt: 'Verführerisches Dessert mit Früchten und Sauce',
  },
  {
    id: 10, label: 'Team', cat: 'events', cols: 1, rows: 1,
    img: 'https://images.unsplash.com/photo-1556761175-b413dab2234e?w=600&q=80',
    alt: 'Unser freundliches Team im Restaurant',
  },
  {
    id: 11, label: 'Grill & BBQ', cat: 'food', cols: 1.5, rows: 1,
    img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80',
    alt: 'Saftige Grillgerichte vom offenen Feuer',
  },
  {
    id: 12, label: 'Lounge', cat: 'ambient', cols: 1, rows: 1.3,
    img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80',
    alt: 'Gemütliche Lounge-Ecke mit Sofas und stilvoller Einrichtung',
  },
]

const placeholderSVGs = {
  'Interieur': 'M6 4h12v16H6zM8 6h8v6H8zM12 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM8 17l1-2h6l1 2M12 4V2M9 3l3-1 3 1',
  'Ambiente Lounge': 'M4 16h16v2H4zM6 16V8a6 6 0 0112 0v8M12 7a1 1 0 100-2 1 1 0 000 2zM14 18l2 3M10 18l-2 3',
  'Cocktails': 'M8 3l6 10v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7L12 3M6 6h8M10 6l1 5M14 4a2 2 0 100-4 2 2 0 000 4z',
  'Gerichte': 'M5 14a7 7 0 0114 0v4H5zM8 11a4 4 0 014-4M12 8V4M10 5l4-2',
  'Dimanche Taro': 'M6 12a6 6 0 0112 0v8H6zM8 15h8M10 18h4M5 20h14M14 7l3-3M16 5l1-1',
  'Bar': 'M3 14h18v3H3zM4 4h5v10H4zM15 4h5v10h-5zM9 6h6v8H9zM11 17v2M13 17v2',
  'Live Music': 'M9 16a3 3 0 100-6 3 3 0 000 6zM12 16V5l6-1v10M15 14a2 2 0 100-4 2 2 0 000 4z',
  'Events': 'M4 6h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1zM7 9h3v3H7zM14 9h3v3h-3zM7 14h10M8 3v3M16 3v3',
  'Desserts': 'M7 12a5 5 0 0110 0v4H7zM6 16h12M10 12l2-1 2 1M9 9l2-2M14 8l1-1',
  'Team': 'M8 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 9a2 2 0 100-4 2 2 0 000 4zM4 17v-2a3 3 0 013-3h2M20 17v-2a3 3 0 00-3-3h-2M7 17v-1a3 3 0 013-3h4a3 3 0 013 3v1',
  'Grill & BBQ': 'M5 12h14v3H5zM8 15v3M16 15v3M12 15v4M9 9l3-4M15 9l-3-4',
  'Lounge': 'M4 10h16v6H4zM6 16l-1 3M18 16l1 3M7 8l10-2M8 6l8-1',
}

export default function Gallery() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(null)
  const [activeCat, setActiveCat] = useState('all')
  const [loadedImages, setLoadedImages] = useState({})

  const categories = categoryIds.map(id => ({ id, label: t(`gallery.categories.${id}`) }))

  const filtered = activeCat === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.cat === activeCat)

  const handleKeyDown = useCallback((e) => {
    if (!selected) return
    if (e.key === 'Escape') setSelected(null)
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const idx = filtered.findIndex(i => i.id === selected.id)
      if (idx > 0) setSelected(filtered[idx - 1])
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const idx = filtered.findIndex(i => i.id === selected.id)
      if (idx < filtered.length - 1) setSelected(filtered[idx + 1])
    }
  }, [selected, filtered])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const selectedIdx = selected ? filtered.findIndex(i => i.id === selected.id) : -1

  return (
    <section className="pt-28 pb-20 lg:pt-32 lg:pb-28 px-4 relative min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.bronze.700/0.1),transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          subtitle={t('gallery.subtitle')}
          title={t('gallery.title')}
          scriptText={t('gallery.script')}
        />

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCat(cat.id); setSelected(null) }}
              className={`relative px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-body font-medium transition-all duration-300 cursor-pointer ${
                activeCat === cat.id
                  ? 'text-charcoal-900'
                  : 'text-cream-100/60 hover:text-cream-100 border border-gold-400/20 hover:border-gold-400/40'
              }`}
            >
              {activeCat === cat.id && (
                <motion.div
                  layoutId="gallery-cat-bg"
                  className="absolute inset-0 bg-gold-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* MASONRY GRID */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                className="break-inside-avoid mb-4"
              >
                <motion.button
                  onClick={() => setSelected(item)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group relative w-full overflow-hidden border border-gold-400/10 hover:border-gold-400/40 transition-all duration-500 cursor-pointer"
                  style={{ aspectRatio: item.rows > 1.2 ? '3/4.5' : item.rows > 1 ? '3/4' : item.cols > 1 ? '4/2.8' : '4/3' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-bronze-700/60 via-charcoal-800/80 to-charcoal-900/90">
                    <svg className="absolute inset-0 w-full h-full p-8 text-gold-400/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d={placeholderSVGs[item.label]} />
                    </svg>
                  </div>

                  <img
                    src={item.img}
                    alt={item.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      loadedImages[item.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [item.id]: true }))}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 p-5 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] tracking-widest uppercase font-body font-medium px-2 py-1 ${
                        item.cat === 'ambient' ? 'text-gold-300 bg-gold-400/10 border border-gold-400/20' :
                        item.cat === 'food' ? 'text-cream-100 bg-bronze-700/50 border border-gold-400/10' :
                        item.cat === 'drinks' ? 'text-gold-400 bg-gold-400/5 border border-gold-400/20' :
                        'text-cream-100/70 bg-charcoal-800/50 border border-gold-400/10'
                      }`}>
                        {t(`gallery.labels.${item.cat}`)}
                      </span>
                    </div>
                    <p className="font-heading text-gold-400 text-sm tracking-wide">
                      {item.label}
                    </p>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center text-cream-100/40 font-body text-sm py-20">
            {t('gallery.empty')}
          </motion.p>
        )}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/95 backdrop-blur-md p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] tracking-widest uppercase font-body font-medium px-2 py-1 ${
                    selected.cat === 'ambient' ? 'text-gold-300 bg-gold-400/10 border border-gold-400/20' :
                    selected.cat === 'food' ? 'text-cream-100 bg-bronze-700/50 border border-gold-400/10' :
                    selected.cat === 'drinks' ? 'text-gold-400 bg-gold-400/5 border border-gold-400/20' :
                    'text-cream-100/70 bg-charcoal-800/50 border border-gold-400/10'
                  }`}>
                    {t(`gallery.labels.${selected.cat}`)}
                  </span>
                  <p className="font-heading text-gold-400 text-lg">{selected.label}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-cream-100/50 hover:text-cream-100 transition-colors font-body text-xs tracking-widest uppercase"
                >
                  {t('gallery.close')}
                </button>
              </div>

              <div className="relative bg-charcoal-900 border border-gold-400/15 overflow-hidden">
                <div className="relative aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-bronze-700/40 to-charcoal-800/90 flex items-center justify-center p-16">
                    <svg className="w-16 h-16 text-gold-400/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d={placeholderSVGs[selected.label]} />
                    </svg>
                  </div>
                  <img
                    src={selected.img}
                    alt={selected.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'brightness(0.95)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-cream-100/40 text-xs font-body">
                  {selectedIdx + 1} / {filtered.length}
                </p>
                <p className="font-script text-cream-100/50 text-sm italic">
                  {t(`gallery.captions.${selected.cat}`)}
                </p>
              </div>

              {selectedIdx > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(filtered[selectedIdx - 1]) }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}
              {selectedIdx < filtered.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(filtered[selectedIdx + 1]) }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}

              <div className="flex justify-center gap-1.5 mt-3">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); setSelected(item) }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      item.id === selected.id ? 'bg-gold-400 w-4' : 'bg-cream-100/20 hover:bg-cream-100/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
