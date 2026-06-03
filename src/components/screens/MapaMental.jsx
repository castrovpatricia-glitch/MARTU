import { motion } from 'framer-motion'
import { TopBar } from '../ui'
import { WORLDS, INTEGRACION, conceptsOfWorld } from '../../data'

const FLOW = {
  w1: 'Atraigo talento',
  w2: 'Lo desarrollo',
  w3: 'Mido su desempeño',
  w4: 'Lo recompenso',
  w5: 'Cuido la relación y la salud',
  w6: 'Gestiono la diversidad',
}

export default function MapaMental({ game, go }) {
  const goWorld = (w) => {
    const first = conceptsOfWorld(w.id)[0]
    if (first) go('lesson', { conceptId: first.id })
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 pb-24">
      <TopBar game={game} onClose={() => go('home')} title="Mapa mental de RRHH" />
      <div className="mx-auto max-w-md px-4">
        <p className="mb-5 text-center text-sm font-semibold text-indigo-200/80">
          Así se conecta TODO. Si entendés este recorrido, podés cerrar cualquier oral con criterio. 🧠
        </p>

        {/* Nodo raíz */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-2 w-full rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-500 p-4 text-center text-white shadow-xl">
          <div className="font-display text-xl font-black">🎯 RRHH estratégico</div>
          <div className="text-xs font-semibold text-white/80">Todo arranca del análisis y descripción de puestos</div>
        </motion.div>

        {WORLDS.map((w, i) => (
          <div key={w.id}>
            <Arrow label={FLOW[w.id]} delay={i * 0.08} />
            <motion.button
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goWorld(w)}
              className={`flex w-full items-center gap-3 rounded-2xl bg-gradient-to-br ${w.gradient} p-4 text-left text-white shadow-lg`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/25 text-2xl">{w.emoji}</span>
              <div className="flex-1">
                <div className="text-[11px] font-bold uppercase tracking-wide text-white/70">Módulo {w.module}</div>
                <div className="font-display font-extrabold leading-tight">{w.title}</div>
              </div>
              <span className="text-white/80">→</span>
            </motion.button>
          </div>
        ))}

        {/* Principio rector */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-5 rounded-3xl bg-amber-500/15 p-4 text-center ring-1 ring-amber-400/30">
          <div className="font-display font-extrabold text-amber-200">⭐ El principio que une todo</div>
          <p className="mt-1 text-sm font-semibold text-amber-100/90">{INTEGRACION.principio}</p>
        </motion.div>
      </div>
    </div>
  )
}

function Arrow({ label, delay }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }} className="flex flex-col items-center py-1.5">
      <div className="h-4 w-0.5 bg-white/30" />
      <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-indigo-100">↓ {label}</div>
      <div className="h-4 w-0.5 bg-white/30" />
    </motion.div>
  )
}
