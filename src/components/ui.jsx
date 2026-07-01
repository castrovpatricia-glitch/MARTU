import { motion } from 'framer-motion'
import logoCo from '../assets/logo-co.png'

/* ───────────────────────── Logo CO Marca País ─────────────────────────
   Logo oficial de Marca País Colombia. En fondos oscuros se apoya sobre
   una placa blanca (área de reserva), como indica el manual de marca. */
export function LogoCO({ size = 96, plate = true, className = '' }) {
  const img = (
    <img
      src={logoCo}
      alt="Marca País Colombia"
      className="block h-auto w-full select-none"
      draggable="false"
    />
  )
  if (!plate) {
    return (
      <span className={`inline-block ${className}`} style={{ width: size }}>
        {img}
      </span>
    )
  }
  return (
    <span
      className={`inline-block rounded-[22%] bg-white shadow-slab ${className}`}
      style={{ width: size, padding: size * 0.1 }}
    >
      {img}
    </span>
  )
}

/* Etiqueta superior de cada slide */
export function Kicker({ children, color = 'text-co-yellow', className = '' }) {
  return (
    <span className={`kicker ${color} ${className}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {children}
    </span>
  )
}

/* Contenedor sólido de color con texto (recurso del manual) */
export function Slab({ children, color = 'bg-co-yellow', text = 'text-co-navy', className = '' }) {
  return <span className={`slab ${color} ${text} ${className}`}>{children}</span>
}

/* ─────────────────────── Recursos gráficos de marca ───────────────────────
   Círculos superpiestos (la construcción del sistema CO) y grillas de puntos
   de la paleta, para decorar sin agregar texto. */

const PALETTE = ['#1b2fe0', '#00b5e2', '#46c93a', '#ffd200', '#ff7a00', '#e4002b', '#7b2ff7']

// Racimo de círculos translúcidos que evoca el logo CO
export function CircleCluster({ className = '', scale = 1, opacity = 0.5 }) {
  const c = [
    { x: 20, y: 22, r: 34, f: '#ffd200' },
    { x: 70, y: 18, r: 28, f: '#1b2fe0' },
    { x: 82, y: 62, r: 32, f: '#46c93a' },
    { x: 34, y: 74, r: 30, f: '#e6007e' },
    { x: 58, y: 52, r: 22, f: '#ff7a00' },
  ]
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: `scale(${scale})`, opacity }}
      aria-hidden="true"
    >
      {c.map((o, i) => (
        <circle key={i} cx={o.x} cy={o.y} r={o.r} fill={o.f} style={{ mixBlendMode: 'screen' }} />
      ))}
    </svg>
  )
}

// Grilla de puntos de la paleta (esquinas / acentos)
export function DotGrid({ className = '', rows = 4, cols = 6, gap = 15, r = 3.4, mono, opacity = 1 }) {
  const dots = []
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++)
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x * gap + r}
          cy={y * gap + r}
          r={r}
          fill={mono || PALETTE[(x + y) % PALETTE.length]}
        />,
      )
  return (
    <svg
      width={cols * gap}
      height={rows * gap}
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {dots}
    </svg>
  )
}

// Blob difuso de color
export function Blob({ className = '' }) {
  return <div className={`pointer-events-none absolute h-72 w-72 rounded-full blur-3xl ${className}`} />
}

/* Animación de entrada escalonada para listas de tarjetas */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
export const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
}

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const MList = motion.div
