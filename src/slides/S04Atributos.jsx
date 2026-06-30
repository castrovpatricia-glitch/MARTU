import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, item, stagger } from '../components/ui.jsx'

const ATTRS = [
  { t: 'Gastronomía', e: '🍽️', c: 'bg-co-orange' },
  { t: 'Turismo', e: '🧳', c: 'bg-co-sky' },
  { t: 'Naturaleza', e: '🌿', c: 'bg-co-green' },
  { t: 'Hospitalidad', e: '🤝', c: 'bg-co-red' },
  { t: 'Cultura', e: '🎶', c: 'bg-co-violet' },
  { t: 'Seguridad', e: '🛡️', c: 'bg-co-blue' },
]

export default function S04Atributos() {
  return (
    <Slide bg="white">
      <motion.div variants={item}>
        <Kicker color="text-co-red">Atributos de identidad</Kicker>
      </motion.div>
      <motion.h2
        variants={item}
        className="title-tight mt-4 font-black text-co-navy"
        style={{ fontSize: 'clamp(2rem, 5.6vw, 3.8rem)' }}
      >
        ¿Qué representa <span className="text-co-red">Colombia</span>?
      </motion.h2>

      <motion.div
        variants={stagger}
        className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
      >
        {ATTRS.map((a) => (
          <motion.div
            key={a.t}
            variants={item}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-co-navy/10 bg-white p-5 shadow-slab"
          >
            <div className={`absolute inset-x-0 top-0 h-1.5 ${a.c}`} />
            <div className="text-4xl sm:text-5xl">{a.e}</div>
            <h3 className="mt-3 text-lg font-black text-co-navy sm:text-xl">{a.t}</h3>
            <div
              className={`mt-3 h-1 w-8 rounded-full ${a.c} transition-all duration-300 group-hover:w-16`}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        variants={item}
        className="mt-6 text-sm font-bold text-co-navy/50"
      >
        Seis atributos seleccionados según Sanz de la Tajada.
      </motion.p>
    </Slide>
  )
}
