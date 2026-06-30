import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, item } from '../components/ui.jsx'
import icCafe from '../assets/ic-cafe.jpg'
import icHit from '../assets/ic-hit.jpg'
import icGol from '../assets/ic-gol.jpg'
import paisaje from '../assets/paisaje-cocora.jpg'

const LINES = [
  { t: 'Conocen el café.', c: 'text-co-yellow' },
  { t: 'Conocen el hit.', c: 'text-co-sky' },
  { t: 'Conocen el gol.', c: 'text-co-green' },
]

const COLLAGE = [icCafe, icHit, icGol, paisaje]

export default function S06Insight() {
  return (
    <Slide bg="navy">
      <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <motion.div variants={item}>
            <Kicker color="text-co-yellow">Insight estratégico</Kicker>
          </motion.div>
          <motion.h2
            variants={item}
            className="title-tight mt-4 max-w-md font-black"
            style={{ fontSize: 'clamp(1.6rem, 4.4vw, 2.7rem)' }}
          >
            Lo conocido como{' '}
            <span className="text-co-yellow">puerta de entrada</span>
          </motion.h2>

          <div className="mt-7 space-y-1.5">
            {LINES.map((l, i) => (
              <motion.p
                key={l.t}
                className={`font-black ${l.c}`}
                style={{ fontSize: 'clamp(1.5rem, 5vw, 2.6rem)', lineHeight: 1.05 }}
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.25, type: 'spring', stiffness: 120, damping: 14 }}
              >
                {l.t}
              </motion.p>
            ))}
            <motion.p
              className="pt-3 font-black text-white"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 2.6rem)', lineHeight: 1.05 }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, type: 'spring', stiffness: 120, damping: 14 }}
            >
              Pero todavía no conocen{' '}
              <span className="slab co-stripe px-2 text-white">todo el país.</span>
            </motion.p>
          </div>
        </div>

        {/* Collage */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          {COLLAGE.map((src, i) => (
            <motion.div
              key={i}
              className={`overflow-hidden rounded-2xl shadow-slab ${i % 2 ? 'translate-y-4' : ''}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 140, damping: 16 }}
            >
              <img src={src} alt="" className="aspect-square h-full w-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Slide>
  )
}
