import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBar } from '../ui'
import { WORLDS } from '../../data'
import { normalize } from '../../utils/evaluator'

export default function ExplicameFacil({ game, go, worldId }) {
  const [active, setActive] = useState(worldId || 'all')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(null)

  const concepts = useMemo(() => {
    let list = []
    for (const w of WORLDS) {
      if (active !== 'all' && w.id !== active) continue
      for (const c of w.concepts) list.push({ ...c, world: w })
    }
    if (query.trim()) {
      const q = normalize(query)
      list = list.filter(
        (c) => normalize(c.term).includes(q) || normalize(c.simple).includes(q) || normalize(c.definition).includes(q),
      )
    }
    return list
  }, [active, query])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 pb-24">
      <TopBar game={game} onClose={() => go(worldId ? 'world' : 'home', worldId ? { worldId } : undefined)} title="Explicámelo fácil 🧒" />
      <div className="mx-auto max-w-2xl px-4">
        <p className="mb-3 text-center text-sm font-semibold text-indigo-200/70">
          Cada concepto explicado como si tuvieras 12 años, con ejemplo. Tocá para ver la definición formal.
        </p>

        {/* Buscador */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔎 Buscar concepto (ej: contrato psicológico, MBO, burnout)…"
          className="w-full rounded-2xl border-2 border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white placeholder:text-indigo-200/50 outline-none focus:border-brand-400"
        />

        {/* Filtros por mundo */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip active={active === 'all'} onClick={() => setActive('all')}>
            Todos
          </Chip>
          {WORLDS.map((w) => (
            <Chip key={w.id} active={active === w.id} onClick={() => setActive(w.id)}>
              {w.emoji} M{w.module}
            </Chip>
          ))}
        </div>

        {/* Lista */}
        <div className="mt-4 space-y-2.5">
          {concepts.map((c) => {
            const isOpen = open === c.id
            return (
              <motion.div key={c.id} layout className="card overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : c.id)} className="flex w-full items-center gap-3 p-4 text-left">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl ${c.world.soft}`}>{c.world.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-extrabold text-slate-800">{c.term}</div>
                    <div className="truncate text-xs font-semibold text-slate-400">{c.world.title}</div>
                  </div>
                  <span className={`text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
                        <div className="text-xs font-extrabold uppercase tracking-wide text-amber-600">🧒 En fácil</div>
                        <p className="mt-1 text-[15px] font-semibold text-amber-950">{c.simple}</p>
                      </div>
                      <div className="mt-2 rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
                        <span className="text-xs font-extrabold uppercase text-emerald-700">Ejemplo · </span>
                        <span className="text-sm font-semibold text-emerald-900">{c.example}</span>
                      </div>
                      <details className="mt-2 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                        <summary className="cursor-pointer text-xs font-extrabold uppercase text-slate-500">Definición formal (de la guía)</summary>
                        <p className="mt-2 text-sm font-medium text-slate-600">{c.definition}</p>
                      </details>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
          {concepts.length === 0 && (
            <div className="card p-8 text-center text-slate-500">
              <div className="text-4xl">🔍</div>
              <p className="mt-2 font-semibold">No encontré ese concepto. Probá con otra palabra.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-bold transition-all ${
        active ? 'bg-brand-500 text-white' : 'bg-white/10 text-indigo-100 hover:bg-white/20'
      }`}
    >
      {children}
    </button>
  )
}
