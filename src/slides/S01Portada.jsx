import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { LogoCO, item } from '../components/ui.jsx'

export default function S01Portada() {
  return (
    <Slide bg="navy">
      {/* Blobs de color de la paleta */}
      <Blob className="-left-24 -top-24 bg-co-violet/30" />
      <Blob className="-bottom-28 -right-20 bg-co-sky/25" />
      <Blob className="bottom-10 left-1/4 h-44 w-44 bg-co-yellow/20" />

      <div className="flex flex-col items-center text-center">
        <motion.div variants={item}>
          <LogoCO size={104} />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-8 text-xs font-extrabold uppercase tracking-[0.45em] text-co-sky sm:text-sm"
        >
          Marca País
        </motion.p>

        <motion.h1
          variants={item}
          className="title-tight mt-2 font-black text-white"
          style={{ fontSize: 'clamp(2.8rem, 9vw, 6.5rem)' }}
        >
          Colombia
        </motion.h1>

        <motion.div variants={item} className="mt-6">
          <span
            className="slab co-stripe text-white shadow-slab"
            style={{ fontSize: 'clamp(1.1rem, 4.4vw, 2.4rem)', padding: '0.4em 0.7em' }}
          >
            Y todavía no viste nada
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 max-w-md text-balance text-sm font-semibold text-white/70 sm:text-base"
        >
          Martina Castro · Imagen Empresaria I · Prof. Stiegwardt · 2026
        </motion.p>

        <motion.p
          variants={item}
          className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40"
        >
          <span className="hidden sm:inline">Usá las flechas ← →</span>
          <span className="sm:hidden">Deslizá</span>
          para navegar
        </motion.p>
      </div>
    </Slide>
  )
}

function Blob({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute -z-0 h-72 w-72 rounded-full blur-3xl ${className}`}
    />
  )
}
