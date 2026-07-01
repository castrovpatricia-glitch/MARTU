import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { LogoCO, Kicker, DotGrid, item } from '../components/ui.jsx'

const ORBIT = [
  { label: 'Turismo', color: 'bg-co-sky text-white', pos: 'left-0 top-2 sm:-left-6' },
  { label: 'Cultura', color: 'bg-co-red text-white', pos: 'right-0 top-2 sm:-right-6' },
  { label: 'Naturaleza', color: 'bg-co-green text-co-navy', pos: 'left-1 bottom-2 sm:-left-10' },
  { label: 'Talento', color: 'bg-co-violet text-white', pos: 'right-1 bottom-2 sm:-right-8' },
]

export default function S02Marca() {
  return (
    <Slide bg="white">
      <DotGrid className="bottom-2 left-2 hidden opacity-80 sm:block" rows={4} cols={5} />
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <motion.div variants={item}>
            <Kicker color="text-co-blue">Qué marca analizamos</Kicker>
          </motion.div>
          <motion.h2
            variants={item}
            className="title-tight mt-4 font-black text-co-navy"
            style={{ fontSize: 'clamp(2.1rem, 6vw, 4rem)' }}
          >
            Colombia como{' '}
            <span className="text-co-blue">marca país</span>
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-6 max-w-md text-balance text-lg font-semibold text-co-navy/70 sm:text-xl"
          >
            Una marca sistema que articula turismo, cultura, inversión,
            exportaciones e identidad nacional.
          </motion.p>
        </div>

        {/* CO con palabras alrededor */}
        <motion.div variants={item} className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80">
          <div className="absolute inset-6 rounded-full border-2 border-dashed border-co-navy/15" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-float">
              <LogoCO size={168} plate={false} />
            </div>
          </div>
          {ORBIT.map((o, i) => (
            <motion.span
              key={o.label}
              className={`slab absolute text-sm shadow-slab sm:text-base ${o.color} ${o.pos}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 160, damping: 12 }}
            >
              {o.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Slide>
  )
}
