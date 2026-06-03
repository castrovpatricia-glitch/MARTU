import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBar } from '../ui'
import { COMPARISONS, WORLD_BY_ID } from '../../data'

export default function Confusiones({ game, go }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-amber-950 to-slate-900 pb-24">
      <TopBar game={game} onClose={() => go('home')} title="Cosas que se confunden" />
      <div className="mx-auto max-w-2xl px-4">
        <p className="mb-4 text-center text-sm font-semibold text-amber-100/80">
          Estas parejas son las que más se mezclan en el oral. Entendé por qué parecen iguales y cuál es la diferencia clave. 🧐
        </p>

        <div className="space-y-3">
          {COMPARISONS.map((c) => {
            const w = WORLD_BY_ID[c.world]
            const isOpen = open === c.id
            return (
              <motion.div layout key={c.id} className="card overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : c.id)} className="w-full p-4 text-left">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">{w?.emoji} {w?.title}</div>
                  <div className="flex items-center justify-center gap-2 font-display text-base font-black text-slate-800">
                    <span className="rounded-xl bg-sky-100 px-2 py-1 text-sky-700">{c.left.name}</span>
                    <span className="text-rose-500">≠</span>
                    <span className="rounded-xl bg-emerald-100 px-2 py-1 text-emerald-700">{c.right.name}</span>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4">
                      {/* definiciones */}
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Side name={c.left.name} def={c.left.def} tint="bg-sky-50 text-sky-900 ring-sky-100" />
                        <Side name={c.right.name} def={c.right.def} tint="bg-emerald-50 text-emerald-900 ring-emerald-100" />
                      </div>
                      {c.whyConfused && (
                        <Row icon="🤔" title="Por qué se confunden" tint="bg-amber-50 text-amber-900 ring-amber-100">{c.whyConfused}</Row>
                      )}
                      <Row icon="🔑" title="Diferencia clave" tint="bg-violet-50 text-violet-900 ring-violet-100">{c.difference}</Row>
                      <Row icon="💡" title="Ejemplo" tint="bg-slate-50 text-slate-700 ring-slate-100">{c.example}</Row>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-6 rounded-2xl bg-white/10 p-4 text-center text-sm font-semibold text-amber-100/80 ring-1 ring-white/10">
          ¿Ya las distinguís? Probá el modo <button onClick={() => go('play', { mode: 'comparaciones' })} className="font-bold text-amber-300 underline">Comparaciones</button> para practicarlas escribiendo.
        </div>
      </div>
    </div>
  )
}

function Side({ name, def, tint }) {
  return (
    <div className={`rounded-2xl p-3 ring-1 ${tint}`}>
      <div className="text-sm font-extrabold">{name}</div>
      <div className="text-sm font-semibold opacity-90">{def}</div>
    </div>
  )
}
function Row({ icon, title, tint, children }) {
  return (
    <div className={`mt-2 rounded-2xl p-3 ring-1 ${tint}`}>
      <div className="text-xs font-extrabold uppercase tracking-wide opacity-70">{icon} {title}</div>
      <div className="text-sm font-semibold">{children}</div>
    </div>
  )
}
