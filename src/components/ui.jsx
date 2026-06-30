import { motion } from 'framer-motion'

/* ───────────────────────── Logo CO Marca País ─────────────────────────
   Reconstrucción del identificador "CO" del manual: tile redondeado con
   bloques de color superpuestos y el monograma CO en blanco. */
export function LogoCO({ size = 96, withWord = true, className = '' }) {
  const r = size * 0.22
  return (
    <div className={`inline-flex flex-col items-center ${className}`} style={{ width: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Logo Marca País Colombia"
      >
        <defs>
          <clipPath id="coClip">
            <rect x="0" y="0" width="100" height="100" rx={r / (size / 100)} />
          </clipPath>
        </defs>
        <g clipPath="url(#coClip)">
          <rect width="100" height="100" fill="#0b1a4a" />
          {/* bloques de color de la paleta */}
          <circle cx="22" cy="20" r="30" fill="#ffd200" opacity="0.95" />
          <circle cx="70" cy="16" r="26" fill="#e4002b" opacity="0.92" />
          <circle cx="86" cy="58" r="30" fill="#7b2ff7" opacity="0.9" />
          <circle cx="60" cy="86" r="30" fill="#00b5e2" opacity="0.9" />
          <circle cx="16" cy="74" r="26" fill="#46c93a" opacity="0.92" />
          <circle cx="50" cy="50" r="20" fill="#ff7a00" opacity="0.55" />
        </g>
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontFamily="Montserrat, Arial, sans-serif"
          fontWeight="900"
          fontSize="42"
          fill="#fff"
          style={{ letterSpacing: '-1px' }}
        >
          CO
        </text>
      </svg>
      {withWord && (
        <span
          className="mt-1 font-black uppercase tracking-[0.35em] text-white"
          style={{ fontSize: size * 0.13 }}
        >
          Colombia
        </span>
      )}
    </div>
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
