import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, CircleCluster, DotGrid, item, stagger } from '../components/ui.jsx'

const STATIONS = [
  { t: 'Café', e: '☕', know: 'Conocés el café', unlock: 'Desbloqueás lo que despierta: el origen y el Eje Cafetero.', c: 'co-red', dot: 'bg-co-red' },
  { t: 'Música', e: '🎵', know: 'Conocés el ritmo', unlock: 'Desbloqueás la raíz: vallenato, cumbia, champeta y Pacífico.', c: 'co-green', dot: 'bg-co-green' },
  { t: 'Gastronomía', e: '🍲', know: 'Conocés un plato', unlock: 'Desbloqueás los sabores: Andina, Caribe, Pacífico, Antioquia y Amazonía.', c: 'co-orange', dot: 'bg-co-orange' },
  { t: 'Naturaleza', e: '🌴', know: 'Conocés un paisaje', unlock: 'Desbloqueás la biodiversidad: del Cocora a Tayrona y Caño Cristales.', c: 'co-sky', dot: 'bg-co-sky' },
  { t: 'Fútbol', e: '⚽', know: 'Conocés el gol', unlock: 'Desbloqueás la cancha entera: de la Selección al fútbol de barrio.', c: 'co-yellow', dot: 'bg-co-yellow' },
  { t: 'Foto final', e: '📸', know: 'Conocés Colombia', unlock: 'Te llevás la foto con el claim: “Y todavía no viste nada”.', c: 'co-violet', dot: 'bg-co-violet' },
]

export default function S12Activacion() {
  const [sel, setSel] = useState(0)
  const s = STATIONS[sel]
  return (
    <Slide bg="navy" contentClassName="max-w-5xl">
      <CircleCluster className="-right-8 -top-10 h-56 w-56" opacity={0.26} />
      <DotGrid className="left-2 bottom-2 hidden opacity-70 md:block" rows={4} cols={5} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <motion.div variants={item}>
            <Kicker color="text-co-violet">Activación presencial</Kicker>
          </motion.div>
          <motion.h2
            variants={item}
            className="title-tight mt-3 font-black"
            style={{ fontSize: 'clamp(1.9rem, 5.4vw, 3.4rem)' }}
          >
            Colombia <span className="text-co-violet">Experience</span>
          </motion.h2>
        </div>
        <motion.p variants={item} className="max-w-sm text-sm font-semibold text-white/60">
          Un stand inmersivo donde el público elige algo que ya conoce de Colombia
          y desbloquea una experiencia nueva.
        </motion.p>
      </div>

      {/* Recorrido de estaciones */}
      <motion.div variants={item} className="relative mt-8">
        <div className="absolute left-0 right-0 top-7 -z-0 mx-8 border-t-2 border-dashed border-white/20" />
        <motion.div variants={stagger} className="relative grid grid-cols-3 gap-y-5 sm:grid-cols-6">
          {STATIONS.map((st, i) => (
            <motion.button
              key={st.t}
              variants={item}
              onMouseEnter={() => setSel(i)}
              onClick={() => setSel(i)}
              className="group flex flex-col items-center gap-2 focus:outline-none"
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-full border-2 text-2xl transition-all duration-300 ${
                  sel === i
                    ? `border-transparent ${st.dot} scale-110 shadow-slab`
                    : 'border-white/25 bg-white/5 group-hover:border-white/60'
                }`}
              >
                {st.e}
              </span>
              <span
                className={`text-xs font-extrabold transition ${
                  sel === i ? 'text-white' : 'text-white/55'
                }`}
              >
                {st.t}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Panel de detalle */}
      <motion.div variants={item} className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="card flex flex-col items-start gap-2 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
          >
            <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl ${s.dot} text-3xl shadow-slab`}>
              {s.e}
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/50">{s.know}</p>
              <p className="mt-1 text-lg font-black leading-snug text-white sm:text-2xl">{s.unlock}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <p className="mt-3 text-xs font-bold text-white/40">Pasá el cursor o tocá cada estación.</p>
      </motion.div>
    </Slide>
  )
}
