import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, LogoCO, item, stagger } from '../components/ui.jsx'

const PALETTE = ['bg-co-blue', 'bg-co-sky', 'bg-co-green', 'bg-co-yellow', 'bg-co-orange', 'bg-co-red', 'bg-co-violet']

const CARDS = [
  {
    t: 'CO como núcleo',
    d: 'Un identificador tipográfico que sintetiza al país.',
    accent: 'text-co-yellow',
    icon: 'co',
  },
  {
    t: 'Paleta vibrante',
    d: 'El color como recurso narrativo de la diversidad.',
    accent: 'text-co-sky',
    icon: 'palette',
  },
  {
    t: 'Tipografía Futura',
    d: 'Geométrica, moderna y de alta legibilidad.',
    accent: 'text-co-green',
    icon: 'type',
  },
  {
    t: 'Sistema adaptable',
    d: 'Flexible: una marca que cambia sin perder identidad.',
    accent: 'text-co-violet',
    icon: 'grid',
  },
]

export default function S03Identidad() {
  return (
    <Slide bg="navy">
      <motion.div variants={item}>
        <Kicker color="text-co-sky">Identidad visual</Kicker>
      </motion.div>
      <motion.h2
        variants={item}
        className="title-tight mt-4 max-w-3xl font-black"
        style={{ fontSize: 'clamp(1.9rem, 5.4vw, 3.6rem)' }}
      >
        Una identidad <span className="text-co-yellow">flexible</span> y{' '}
        <span className="text-co-green">diversa</span>
      </motion.h2>

      {/* Paleta */}
      <motion.div variants={item} className="mt-7 flex h-3 w-full max-w-xl overflow-hidden rounded-full">
        {PALETTE.map((c) => (
          <div key={c} className={`h-full flex-1 ${c}`} />
        ))}
      </motion.div>

      <motion.div
        variants={stagger}
        className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      >
        {CARDS.map((c) => (
          <motion.div key={c.t} variants={item} className="card flex flex-col gap-3 p-4 sm:p-5">
            <div className={`${c.accent}`}>
              <Icon name={c.icon} />
            </div>
            <h3 className="text-base font-black leading-tight sm:text-lg">{c.t}</h3>
            <p className="text-xs font-semibold text-white/60 sm:text-sm">{c.d}</p>
          </motion.div>
        ))}
      </motion.div>
    </Slide>
  )
}

function Icon({ name }) {
  if (name === 'co') return <LogoCO size={40} withWord={false} />
  const common = { width: 40, height: 40, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (name === 'palette')
    return (
      <svg {...common}>
        <circle cx="13.5" cy="6.5" r="1.5" />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <circle cx="6.5" cy="12.5" r="1.5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.5-1.1-.3-.3-.5-.7-.5-1.1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-4.4-4.5-8-10-8z" />
      </svg>
    )
  if (name === 'type')
    return (
      <svg {...common}>
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    )
  return (
    <svg {...common}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
