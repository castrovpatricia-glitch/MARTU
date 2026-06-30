import { useState } from 'react'
import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, item, stagger } from '../components/ui.jsx'
import eCarrusel from '../assets/eco-carrusel.jpg'
import eAr from '../assets/eco-ar.jpg'
import eSpotify from '../assets/eco-spotify.jpg'
import eGuia from '../assets/eco-guia.jpg'
import eMaps from '../assets/eco-maps.jpg'
import eMapa from '../assets/eco-mapa.jpg'
import eSocial from '../assets/eco-social.jpg'

const FORMATS = [
  { t: 'Carrusel Instagram', src: eCarrusel, d: 'Placas que contraponen lo conocido con una dimensión más amplia del país.', c: 'bg-co-magenta' },
  { t: 'Historias interactivas', src: eMapa, d: 'El usuario explora, elige y participa en formato story.', c: 'bg-co-violet' },
  { t: 'Filtro AR', src: eAr, d: 'Mostrá tu versión de Colombia rumbo al Mundial 2026.', c: 'bg-co-sky' },
  { t: 'Playlist Spotify', src: eSpotify, d: 'De los hits globales a los sonidos regionales: vallenato, cumbia, champeta.', c: 'bg-co-green' },
  { t: 'Guía gastronómica', src: eGuia, d: 'Sabores por región: Andina, Caribe, Pacífico, Antioquia y Amazonía.', c: 'bg-co-orange' },
  { t: 'Mapa interactivo', src: eMaps, d: 'Tipo Google Maps: Cartagena, Tayrona, Caño Cristales, Nuquí, Leticia.', c: 'bg-co-red' },
  { t: 'Post LinkedIn', src: eSocial, d: 'Tono institucional: cultura, talento y proyección internacional.', c: 'bg-co-blue' },
]

export default function S09Ecosistema() {
  const [active, setActive] = useState(null)
  return (
    <Slide bg="navy" contentClassName="max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <motion.div variants={item}>
            <Kicker color="text-co-magenta">Acciones de campaña</Kicker>
          </motion.div>
          <motion.h2
            variants={item}
            className="title-tight mt-3 font-black"
            style={{ fontSize: 'clamp(1.9rem, 5.4vw, 3.4rem)' }}
          >
            Ecosistema <span className="text-co-magenta">digital</span>
          </motion.h2>
        </div>
        <motion.p variants={item} className="max-w-[16rem] text-sm font-semibold text-white/55">
          Pasá el cursor o tocá cada formato para ver qué hace.
        </motion.p>
      </div>

      <motion.div
        variants={stagger}
        className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-7"
      >
        {FORMATS.map((f, i) => (
          <motion.button
            key={f.t}
            variants={item}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((a) => (a === i ? null : a))}
            onClick={() => setActive((a) => (a === i ? null : i))}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl text-left shadow-slab focus:outline-none focus:ring-2 focus:ring-co-yellow"
          >
            <img src={f.src} alt={f.t} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-6">
              <span className={`h-1.5 w-1.5 rounded-full ${f.c}`} />
              <span className="text-[10px] font-extrabold leading-tight text-white sm:text-[11px]">
                {f.t}
              </span>
            </div>
            {/* Descripción al hover/tap */}
            <motion.div
              initial={false}
              animate={{ opacity: active === i ? 1 : 0 }}
              className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-co-navy/92 p-3"
            >
              <span className={`mb-2 inline-block h-1 w-7 rounded-full ${f.c}`} />
              <p className="text-[11px] font-bold leading-snug text-white sm:text-xs">{f.t}</p>
              <p className="mt-1 text-[10px] font-medium leading-snug text-white/70 sm:text-[11px]">
                {f.d}
              </p>
            </motion.div>
          </motion.button>
        ))}
      </motion.div>

      <motion.p variants={item} className="mt-5 text-sm font-bold text-white/55 sm:text-base">
        Cada formato funciona como una{' '}
        <span className="text-co-yellow">entrada distinta al mismo mensaje.</span>
      </motion.p>
    </Slide>
  )
}
