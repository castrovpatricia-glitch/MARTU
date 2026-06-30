import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, item, stagger } from '../components/ui.jsx'

// Promedios de percepción de la encuesta MEDIA 29 (escala 1–10)
const BARS = [
  { t: 'Naturaleza', v: 8.1, c: 'bg-co-green' },
  { t: 'Turismo', v: 8.0, c: 'bg-co-sky' },
  { t: 'Cultura', v: 7.9, c: 'bg-co-violet' },
  { t: 'Hospitalidad', v: 7.3, c: 'bg-co-orange' },
  { t: 'Gastronomía', v: 6.2, c: 'bg-co-yellow' },
  { t: 'Seguridad', v: 4.7, c: 'bg-co-red', weak: true },
]

const IDEAS = [
  'La experiencia directa mejora la percepción.',
  'Seguridad: el atributo más débil.',
  'Café, música, Cartagena, Medellín y naturaleza: asociaciones fuertes.',
]

export default function S05Diagnostico() {
  return (
    <Slide bg="navy">
      <Blob className="-right-24 top-0 bg-co-red/20" />
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <motion.div variants={item}>
            <Kicker color="text-co-red">Diagnóstico de percepción</Kicker>
          </motion.div>
          <motion.h2
            variants={item}
            className="title-tight mt-4 font-black"
            style={{ fontSize: 'clamp(1.7rem, 4.6vw, 3rem)' }}
          >
            El problema no es de identidad,{' '}
            <span className="text-co-red">es de percepción</span>
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-5 max-w-md text-balance text-base font-semibold text-white/75 sm:text-lg"
          >
            Colombia sabe quién es. El mundo todavía no siempre la percibe así.
          </motion.p>

          <motion.ul variants={stagger} className="mt-6 space-y-2.5">
            {IDEAS.map((i) => (
              <motion.li
                key={i}
                variants={item}
                className="flex items-start gap-3 text-sm font-semibold text-white/80 sm:text-base"
              >
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-co-yellow" />
                {i}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Gráfico de barras */}
        <motion.div variants={item} className="card p-5 sm:p-6">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-white/50">
            Percepción por atributo · escala 1–10
          </p>
          <div className="space-y-3">
            {BARS.map((b, idx) => (
              <div key={b.t}>
                <div className="mb-1 flex items-center justify-between text-xs font-bold sm:text-sm">
                  <span className={b.weak ? 'text-co-red' : 'text-white/80'}>{b.t}</span>
                  <span className={b.weak ? 'text-co-red' : 'text-white/55'}>{b.v.toFixed(1)}</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={`h-full rounded-full ${b.c}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${b.v * 10}%` }}
                    transition={{ delay: 0.4 + idx * 0.1, type: 'spring', stiffness: 80, damping: 18 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  )
}

function Blob({ className = '' }) {
  return <div className={`pointer-events-none absolute h-72 w-72 rounded-full blur-3xl ${className}`} />
}
