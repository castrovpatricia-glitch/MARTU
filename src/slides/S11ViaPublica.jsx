import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, LogoCO, item, stagger } from '../components/ui.jsx'
import dHit from '../assets/dupla-hit.jpg'

const PLACES = [
  { t: 'Aeropuertos', e: '✈️', c: 'bg-co-sky' },
  { t: 'Shoppings', e: '🛍️', c: 'bg-co-violet' },
  { t: 'Pantallas urbanas', e: '🏙️', c: 'bg-co-red' },
  { t: 'Alto tránsito internacional', e: '🌎', c: 'bg-co-green' },
]

export default function S11ViaPublica() {
  return (
    <Slide bg="white">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <motion.div variants={item}>
            <Kicker color="text-co-blue">Vía pública</Kicker>
          </motion.div>
          <motion.h2
            variants={item}
            className="title-tight mt-4 font-black text-co-navy"
            style={{ fontSize: 'clamp(1.9rem, 5.2vw, 3.4rem)' }}
          >
            Del mundo digital al{' '}
            <span className="text-co-blue">espacio público</span>
          </motion.h2>
          <motion.p variants={item} className="mt-4 max-w-sm text-base font-semibold text-co-navy/60">
            La campaña también vive fuera de las redes.
          </motion.p>

          <motion.div variants={stagger} className="mt-7 grid grid-cols-2 gap-3">
            {PLACES.map((p) => (
              <motion.div
                key={p.t}
                variants={item}
                className="flex items-center gap-3 rounded-xl border border-co-navy/10 bg-white p-3 shadow-slab"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${p.c} text-lg`}>
                  {p.e}
                </span>
                <span className="text-sm font-extrabold leading-tight text-co-navy">{p.t}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mockups de vía pública */}
        <motion.div variants={item} className="relative mx-auto w-full max-w-md">
          {/* Pantalla horizontal tipo aeropuerto */}
          <div className="overflow-hidden rounded-xl border-4 border-co-navy/90 shadow-slab">
            <img src={dHit} alt="Pieza en pantalla de aeropuerto" className="w-full" style={{ aspectRatio: '16/9', objectFit: 'cover' }} />
          </div>
          <div className="mx-auto h-7 w-2 bg-co-navy/80" />
          <div className="mx-auto h-2 w-28 rounded-full bg-co-navy/30" />
          <p className="mt-1 text-center text-[11px] font-bold uppercase tracking-widest text-co-navy/45">
            Aeropuerto Internacional El Dorado
          </p>

          {/* Tótem vertical urbano */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 14 }}
            className="absolute -right-2 -top-6 w-28 rotate-[-3deg] sm:-right-6 sm:w-32"
          >
            <div className="flex aspect-[9/16] flex-col items-center justify-between rounded-lg border-4 border-co-navy/90 bg-co-navy p-3 text-center shadow-slab">
              <LogoCO size={34} withWord={false} />
              <p className="text-[13px] font-black leading-tight text-white">
                Y todavía no viste nada
              </p>
              <span className="h-1.5 w-10 rounded-full co-stripe" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Slide>
  )
}
