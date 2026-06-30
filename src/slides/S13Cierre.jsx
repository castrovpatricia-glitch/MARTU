import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { LogoCO, item } from '../components/ui.jsx'

export default function S13Cierre() {
  return (
    <Slide bg="navy">
      <Blob className="-left-24 top-10 bg-co-violet/25" />
      <Blob className="-right-20 bottom-0 bg-co-green/20" />

      <div className="flex flex-col items-center text-center">
        <motion.div variants={item}>
          <LogoCO size={92} />
        </motion.div>

        <motion.h2
          variants={item}
          className="title-tight mt-9 max-w-4xl font-black"
          style={{ fontSize: 'clamp(1.8rem, 5.4vw, 3.6rem)' }}
        >
          Colombia ya es reconocida.
          <br />
          Ahora necesita ser{' '}
          <span className="text-co-green">redescubierta.</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-balance text-base font-semibold text-white/70 sm:text-lg"
        >
          La campaña no niega los imaginarios existentes: los usa como punto de
          partida para ampliar la percepción del país y acercarla a su identidad
          real.
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <span
            className="slab co-stripe text-white shadow-slab"
            style={{ fontSize: 'clamp(1.2rem, 4.6vw, 2.6rem)', padding: '0.4em 0.75em' }}
          >
            Y todavía no viste nada
          </span>
        </motion.div>

        <motion.p variants={item} className="mt-9 text-xs font-bold uppercase tracking-[0.3em] text-white/35">
          Martina Castro · Imagen Empresaria I · 2026
        </motion.p>
      </div>
    </Slide>
  )
}

function Blob({ className = '' }) {
  return <div className={`pointer-events-none absolute h-72 w-72 rounded-full blur-3xl ${className}`} />
}
