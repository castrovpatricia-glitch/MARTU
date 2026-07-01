import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, CircleCluster, DotGrid, item, stagger } from '../components/ui.jsx'
import eAr from '../assets/eco-ar.jpg'

const POINTS = [
  { t: 'Mundial 2026', d: 'La ventana de máxima visibilidad internacional.', c: 'bg-co-sky' },
  { t: 'Música · fútbol · café · playas · cultura', d: 'El usuario elige su ancla y descubre el resto.', c: 'bg-co-green' },
  { t: 'Contenido generado por usuarios', d: 'El público se vuelve parte activa de la campaña.', c: 'bg-co-orange' },
]

export default function S10FiltroAR() {
  return (
    <Slide bg="navy">
      <CircleCluster className="-right-8 -top-10 h-56 w-56" opacity={0.28} />
      <DotGrid className="right-6 bottom-8 hidden opacity-70 md:block" rows={4} cols={5} />
      <div className="grid items-center gap-9 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
        {/* Mockup */}
        <motion.div
          variants={item}
          className="mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl border border-white/10 shadow-slab"
        >
          <img src={eAr} alt="Mockup del filtro de realidad aumentada" className="w-full" />
        </motion.div>

        <div>
          <motion.div variants={item}>
            <Kicker color="text-co-sky">Filtro AR + participación</Kicker>
          </motion.div>
          <motion.h2
            variants={item}
            className="title-tight mt-4 font-black"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
          >
            Filtro AR:{' '}
            <span className="text-co-sky">descubrí tu Colombia</span>
          </motion.h2>

          <motion.div variants={stagger} className="mt-7 space-y-3">
            {POINTS.map((p) => (
              <motion.div key={p.t} variants={item} className="flex items-start gap-3">
                <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${p.c}`} />
                <div>
                  <p className="text-base font-black sm:text-lg">{p.t}</p>
                  <p className="text-sm font-medium text-white/60">{p.d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-7">
            <span className="slab bg-co-yellow text-co-navy shadow-slab" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.5rem)' }}>
              #YTodavíaNoVisteNada
            </span>
          </motion.div>
        </div>
      </div>
    </Slide>
  )
}
