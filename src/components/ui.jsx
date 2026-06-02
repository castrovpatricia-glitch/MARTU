import { motion } from 'framer-motion'
import { MAX_LIVES } from '../hooks/useGameState'

// --- Botón "3D" estilo Duolingo --------------------------------------------
export function Btn({ children, color = 'brand', className = '', ...props }) {
  const colors = {
    brand: 'bg-brand-500',
    green: 'bg-emerald-500',
    red: 'bg-rose-500',
    amber: 'bg-amber-500',
    violet: 'bg-violet-500',
    slate: 'bg-slate-700',
    white: 'bg-white !text-slate-800',
  }
  return (
    <button className={`btn-3d ${colors[color] || colors.brand} ${className}`} {...props}>
      {children}
    </button>
  )
}

// --- Barra de progreso ------------------------------------------------------
export function ProgressBar({ value = 0, className = '', barClass = 'bg-emerald-400', height = 'h-3' }) {
  return (
    <div className={`w-full ${height} rounded-full bg-black/10 overflow-hidden ${className}`}>
      <motion.div
        className={`h-full rounded-full ${barClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  )
}

// --- Corazones (vidas) ------------------------------------------------------
export function Hearts({ lives, max = MAX_LIVES }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`text-lg leading-none ${i < lives ? '' : 'grayscale opacity-30'}`}>
          {i < lives ? '❤️' : '🤍'}
        </span>
      ))}
    </div>
  )
}

// --- Chip / etiqueta --------------------------------------------------------
export function Pill({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${className}`}>
      {children}
    </span>
  )
}

// --- Barra superior con stats ----------------------------------------------
export function TopBar({ game, onClose, title, accent = 'bg-white/10' }) {
  const { state, xpLevel } = game
  return (
    <div className="sticky top-0 z-30 w-full">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        {onClose ? (
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Volver"
          >
            ✕
          </button>
        ) : (
          <div className="font-display text-lg font-extrabold text-white">RRHH Quest 🎓</div>
        )}
        {title && <div className="flex-1 truncate text-center font-display font-bold text-white">{title}</div>}
        {!title && <div className="flex-1" />}
        <div className="flex items-center gap-2 text-white">
          <Pill className="bg-amber-400/90 text-amber-950">⭐ Nv {xpLevel}</Pill>
          <Pill className="bg-orange-500/90 text-white">🔥 {state.streak.count}</Pill>
          <Hearts lives={state.lives} />
        </div>
      </div>
    </div>
  )
}

// --- Anillo de dominio (circular) ------------------------------------------
export function MasteryRing({ value = 0, size = 56, stroke = 6, color = '#34d399', label }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (value / 100) * c
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(0,0,0,0.12)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: off }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute text-xs font-extrabold text-slate-700">{label ?? `${value}%`}</span>
    </div>
  )
}

// --- Tarjeta contenedora ----------------------------------------------------
export function Card({ children, className = '' }) {
  return <div className={`card p-5 ${className}`}>{children}</div>
}
