import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, item, stagger } from '../components/ui.jsx'
import dGol from '../assets/dupla-gol.jpg'
import dCafe from '../assets/dupla-cafe.jpg'
import dRitmo from '../assets/dupla-ritmo.jpg'
import dPortada from '../assets/dupla-portada.jpg'
import dHit from '../assets/dupla-hit.jpg'

const PIECES = [
  { src: dGol, a: 'Conocés el gol', b: 'Conocé la cancha entera', c: 'text-co-yellow' },
  { src: dCafe, a: 'Conocés el café', b: 'Conocé lo que despierta', c: 'text-co-red' },
  { src: dRitmo, a: 'Conocés el ritmo', b: 'Conocé la raíz', c: 'text-co-green' },
  { src: dPortada, a: 'Conocés la portada', b: 'Conocé el país', c: 'text-co-violet' },
  { src: dHit, a: 'Conocés el hit', b: 'Conocé Colombia', c: 'text-co-sky' },
]

export default function S08Sistema() {
  return (
    <Slide bg="navy" contentClassName="max-w-6xl" >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <motion.div variants={item}>
            <Kicker color="text-co-green">Sistema creativo</Kicker>
          </motion.div>
          <motion.h2
            variants={item}
            className="title-tight mt-3 font-black"
            style={{ fontSize: 'clamp(1.7rem, 5vw, 3rem)' }}
          >
            <span className="text-white/60">Conocés…</span>{' '}
            <span className="text-co-yellow">Conocé…</span>
          </motion.h2>
        </div>
        <motion.p variants={item} className="max-w-xs text-sm font-semibold text-white/55">
          Cada pieza toma lo conocido y revela lo que falta descubrir.
        </motion.p>
      </div>

      <motion.div
        variants={stagger}
        className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3"
      >
        {PIECES.map((p) => (
          <motion.figure
            key={p.a}
            variants={item}
            whileHover={{ scale: 1.03, zIndex: 10 }}
            className="group relative overflow-hidden rounded-xl shadow-slab"
          >
            <img
              src={p.src}
              alt={`${p.a} / ${p.b}`}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ aspectRatio: '16 / 9' }}
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2.5 py-2">
              <span className="text-[11px] font-bold text-white/85 sm:text-xs">
                {p.a} <span className={p.c}>→ {p.b}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}

        {/* Tile final con el claim, completa la grilla */}
        <motion.div
          variants={item}
          className="co-stripe flex flex-col items-center justify-center rounded-xl p-3 text-center shadow-slab"
          style={{ aspectRatio: '16 / 9' }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">Y todavía</span>
          <span className="text-lg font-black leading-tight text-white sm:text-2xl">no viste nada</span>
        </motion.div>
      </motion.div>
    </Slide>
  )
}
