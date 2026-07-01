import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, DotGrid, item, stagger } from '../components/ui.jsx'
import oohAeropuerto from '../assets/ooh-aeropuerto.jpg'
import oohShopping from '../assets/ooh-shopping.jpg'

const PLACES = [
  { t: 'Aeropuertos', e: '✈️', c: 'bg-co-sky' },
  { t: 'Shoppings', e: '🛍️', c: 'bg-co-violet' },
  { t: 'Pantallas urbanas', e: '🏙️', c: 'bg-co-red' },
  { t: 'Alto tránsito internacional', e: '🌎', c: 'bg-co-green' },
]

const MOCKUPS = [
  { src: oohAeropuerto, t: 'Aeropuerto', d: 'El Dorado', c: 'bg-co-sky' },
  { src: oohShopping, t: 'Shopping', d: 'Retail premium', c: 'bg-co-violet' },
]

export default function S11ViaPublica() {
  return (
    <Slide bg="white" contentClassName="max-w-6xl">
      <DotGrid className="right-4 top-4 hidden sm:block" rows={4} cols={5} opacity={0.9} />

      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <motion.div variants={item}>
            <Kicker color="text-co-blue">Vía pública</Kicker>
          </motion.div>
          <motion.h2
            variants={item}
            className="title-tight mt-3 font-black text-co-navy"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
          >
            Del mundo digital al{' '}
            <span className="text-co-blue">espacio público</span>
          </motion.h2>
          <motion.p variants={item} className="mt-3 max-w-md text-base font-semibold text-co-navy/60">
            La campaña también vive fuera de las redes.
          </motion.p>
        </div>

        {/* Chips de puntos de contacto */}
        <motion.div variants={stagger} className="grid grid-cols-2 gap-2.5">
          {PLACES.map((p) => (
            <motion.div
              key={p.t}
              variants={item}
              className="flex items-center gap-2.5 rounded-xl border border-co-navy/10 bg-white px-3 py-2 shadow-slab"
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${p.c} text-base`}>
                {p.e}
              </span>
              <span className="text-xs font-extrabold leading-tight text-co-navy sm:text-sm">{p.t}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mockups reales de vía pública */}
      <motion.div variants={stagger} className="mt-7 grid grid-cols-2 gap-3 sm:gap-5">
        {MOCKUPS.map((m) => (
          <motion.figure
            key={m.t}
            variants={item}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-co-navy/10 shadow-slab"
          >
            <img
              src={m.src}
              alt={`Pieza de campaña en ${m.t}`}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ aspectRatio: '4 / 3' }}
            />
            <figcaption className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 backdrop-blur">
              <span className={`h-2 w-2 rounded-full ${m.c}`} />
              <span className="text-[11px] font-black uppercase tracking-wide text-co-navy sm:text-xs">
                {m.t}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </Slide>
  )
}
