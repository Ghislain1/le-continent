import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'

const galleryItems = [
  { id: 1, label: 'Interieur', cols: 1, rows: 1 },
  { id: 2, label: 'Cocktails', cols: 1, rows: 1 },
  { id: 3, label: 'Gerichte', cols: 1, rows: 1.5 },
  { id: 4, label: 'Events', cols: 1, rows: 1 },
  { id: 5, label: 'Ambiente', cols: 1.5, rows: 1 },
  { id: 6, label: 'Dimanche Taro', cols: 1, rows: 1 },
  { id: 7, label: 'Lounge', cols: 1, rows: 1 },
  { id: 8, label: 'Live Music', cols: 1, rows: 1.5 },
  { id: 9, label: 'Grill', cols: 1, rows: 1 },
  { id: 10, label: 'Desserts', cols: 1, rows: 1 },
  { id: 11, label: 'Team', cols: 1.5, rows: 1 },
  { id: 12, label: 'Bar', cols: 1, rows: 1 },
]

const placeholderIcons = {
  'Interieur': 'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z M9 10a2 2 0 100 4 2 2 0 000-4z',
  'Cocktails': 'M12 2L4 8v2l2 1v9l6 3 6-3v-9l2-1V8l-8-6z',
  'Gerichte': 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z M8 12h8 M12 8v8',
  'Events': 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100-8 4 4 0 000 8z',
  'Ambiente': 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  'Dimanche Taro': 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6',
  'Lounge': 'M2 6h20v8H2z M6 18h12 M8 22h8',
  'Live Music': 'M9 18V5l12-2v13 M6 10l-3 2v3l3 2 M18 13c0 2-1.5 3-3 3',
  'Grill': 'M12 2v20 M2 12h20 M5 5l14 14 M19 5l-14 14',
  'Desserts': 'M12 2a15 15 0 000 20 15 15 0 000-20z M6 12h12',
  'Team': 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
  'Bar': 'M8 2v4 M16 2v4 M3 8h18 M5 8v12a2 2 0 002 2h10a2 2 0 002-2V8',
}

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="pt-28 pb-20 lg:pt-32 lg:pb-28 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.bronze.700/0.1),transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          subtitle="Eindrücke"
          title="Galerie"
          scriptText="Ein Blick in unsere Welt"
        />

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-8">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              layout
              className="break-inside-avoid mb-4"
            >
              <motion.button
                onClick={() => setSelected(item)}
                whileHover={{ scale: 1.02 }}
                className="group relative w-full overflow-hidden border border-gold-400/10 hover:border-gold-400/30 transition-all duration-500 cursor-pointer"
                style={{ aspectRatio: item.rows > 1 ? '3/4' : '4/3' }}
              >
                <div className="w-full h-full bg-gradient-to-br from-bronze-700/50 to-charcoal-800/80 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gold-400/30 group-hover:text-gold-400/50 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d={placeholderIcons[item.label]} />
                  </svg>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  <p className="font-heading text-gold-400 text-sm tracking-wide">{item.label}</p>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/95 backdrop-blur-sm p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-cream-100/60 hover:text-cream-100 transition-colors font-body text-sm tracking-widest uppercase"
              >
                Schließen [Esc]
              </button>

              <div className="aspect-video bg-gradient-to-br from-bronze-700 to-charcoal-800 border border-gold-400/20 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 text-gold-400/30 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d={placeholderIcons[selected.label]} />
                  </svg>
                  <p className="font-heading text-gold-400 text-xl">{selected.label}</p>
                  <p className="font-script text-cream-100/40 text-sm italic mt-1">Bild folgt in Kürze</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
