import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import S01Portada from './slides/S01Portada.jsx'
import S02Marca from './slides/S02Marca.jsx'
import S03Identidad from './slides/S03Identidad.jsx'
import S04Atributos from './slides/S04Atributos.jsx'
import S05Diagnostico from './slides/S05Diagnostico.jsx'
import S06Insight from './slides/S06Insight.jsx'
import S07Concepto from './slides/S07Concepto.jsx'
import S08Sistema from './slides/S08Sistema.jsx'
import S09Ecosistema from './slides/S09Ecosistema.jsx'
import S10FiltroAR from './slides/S10FiltroAR.jsx'
import S11ViaPublica from './slides/S11ViaPublica.jsx'
import S12Activacion from './slides/S12Activacion.jsx'
import S13Cierre from './slides/S13Cierre.jsx'

const SLIDES = [
  { id: 'portada', label: 'Portada', theme: 'dark', C: S01Portada },
  { id: 'marca', label: '¿Qué marca?', theme: 'light', C: S02Marca },
  { id: 'identidad', label: 'Identidad', theme: 'dark', C: S03Identidad },
  { id: 'atributos', label: 'Atributos', theme: 'light', C: S04Atributos },
  { id: 'diagnostico', label: 'Diagnóstico', theme: 'dark', C: S05Diagnostico },
  { id: 'insight', label: 'Insight', theme: 'dark', C: S06Insight },
  { id: 'concepto', label: 'Concepto', theme: 'dark', C: S07Concepto },
  { id: 'sistema', label: 'Sistema creativo', theme: 'dark', C: S08Sistema },
  { id: 'ecosistema', label: 'Ecosistema', theme: 'dark', C: S09Ecosistema },
  { id: 'ar', label: 'Filtro AR', theme: 'dark', C: S10FiltroAR },
  { id: 'via', label: 'Vía pública', theme: 'light', C: S11ViaPublica },
  { id: 'activacion', label: 'Activación', theme: 'dark', C: S12Activacion },
  { id: 'cierre', label: 'Cierre', theme: 'dark', C: S13Cierre },
]

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
}

export default function App() {
  const [[index, dir], setState] = useState([0, 0])
  const total = SLIDES.length
  const touch = useRef({ x: 0, y: 0, t: 0 })

  const go = useCallback(
    (next, direction) => {
      setState(([cur]) => {
        const clamped = Math.max(0, Math.min(total - 1, next))
        if (clamped === cur) return [cur, 0]
        return [clamped, direction ?? (clamped > cur ? 1 : -1)]
      })
    },
    [total],
  )

  const next = useCallback(() => setState(([c]) => [Math.min(total - 1, c + 1), 1]), [total])
  const prev = useCallback(() => setState(([c]) => [Math.max(0, c - 1), -1]), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') next()
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev()
      else if (e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'Home') go(0, -1)
      else if (e.key === 'End') go(total - 1, 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, total])

  const onTouchStart = (e) => {
    const t = e.changedTouches[0]
    touch.current = { x: t.clientX, y: t.clientY, t: Date.now() }
  }
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) next()
      else prev()
    }
  }

  const cur = SLIDES[index]
  const Comp = cur.C
  const light = cur.theme === 'light'
  const progress = ((index + 1) / total) * 100

  return (
    <div
      className="relative h-screen-safe w-full overflow-hidden bg-co-navy select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Barra de progreso superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-1.5">
        <div className={`h-full w-full ${light ? 'bg-co-navy/10' : 'bg-white/12'}`} />
        <motion.div
          className="co-stripe absolute left-0 top-0 h-full"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        />
      </div>

      {/* Slides */}
      <AnimatePresence custom={dir} mode="popLayout" initial={false}>
        <motion.div
          key={cur.id}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 90, damping: 18 }, opacity: { duration: 0.3 } }}
          className="absolute inset-0"
        >
          <Comp />
        </motion.div>
      </AnimatePresence>

      {/* Flecha izquierda */}
      <NavArrow
        side="left"
        light={light}
        disabled={index === 0}
        onClick={prev}
      />
      {/* Flecha derecha */}
      <NavArrow
        side="right"
        light={light}
        disabled={index === total - 1}
        onClick={next}
        pulse={index === 0}
      />

      {/* Barra inferior: contador · dots · siguiente */}
      <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:px-8">
        <span
          className={`shrink-0 font-black tabular-nums tracking-wider ${
            light ? 'text-co-navy/70' : 'text-white/70'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
          <span className={light ? 'text-co-navy/35' : 'text-white/35'}> / {String(total).padStart(2, '0')}</span>
        </span>

        <div className="flex flex-1 items-center justify-center gap-1.5 overflow-x-auto px-1">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Ir a slide ${i + 1}: ${s.label}`}
              className="group relative shrink-0 py-2"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === index
                    ? 'h-2.5 w-7 bg-co-yellow'
                    : `h-2.5 w-2.5 ${light ? 'bg-co-navy/25 hover:bg-co-navy/50' : 'bg-white/30 hover:bg-white/60'}`
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={index === total - 1}
          className={`hidden shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition disabled:opacity-0 sm:inline-flex ${
            light
              ? 'bg-co-navy text-white hover:bg-co-blue'
              : 'bg-co-yellow text-co-navy hover:brightness-105'
          }`}
        >
          Siguiente
          <span className="animate-bounce-x">→</span>
        </button>
      </div>
    </div>
  )
}

function NavArrow({ side, onClick, disabled, light, pulse }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={side === 'left' ? 'Slide anterior' : 'Slide siguiente'}
      className={`absolute top-1/2 z-40 -translate-y-1/2 ${
        side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'
      } grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition disabled:pointer-events-none disabled:opacity-0 sm:h-12 sm:w-12 ${
        light
          ? 'border-co-navy/15 bg-white/70 text-co-navy hover:bg-white'
          : 'border-white/15 bg-white/10 text-white hover:bg-white/20'
      } ${pulse ? 'ring-2 ring-co-yellow/70' : ''}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {side === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  )
}
