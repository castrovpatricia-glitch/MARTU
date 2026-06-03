import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { TopBar, ProgressBar } from '../ui'
import { CONCEPTS_FLAT } from '../../data'

const ORDER = { red: 0, yellow: 1, unseen: 2, seen: 2, green: 3 }
const META = {
  red: { emoji: '🔴', label: 'Todavía no lo entiendo', tint: 'bg-rose-500' },
  yellow: { emoji: '🟡', label: 'Lo entiendo, no lo explicaría', tint: 'bg-amber-400' },
  seen: { emoji: '👁️', label: 'Visto, sin autoevaluar', tint: 'bg-brand-500' },
  unseen: { emoji: '⚪', label: 'Todavía no lo vi', tint: 'bg-slate-400' },
  green: { emoji: '🟢', label: 'Lo puedo explicar', tint: 'bg-emerald-500' },
}

export default function RepasoInteligente({ game, go }) {
  const [filter, setFilter] = useState('all')

  const items = useMemo(() => {
    return CONCEPTS_FLAT.map((c) => ({ ...c, st: game.conceptState(c.id) })).sort(
      (a, b) => (ORDER[a.st] ?? 2) - (ORDER[b.st] ?? 2),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.state.conceptStates, game.state.visited])

  const shown = filter === 'all' ? items : items.filter((c) => c.st === filter || (filter === 'unseen' && c.st === 'seen'))
  const firstRed = items.find((c) => c.st === 'red') || items.find((c) => c.st === 'unseen' || c.st === 'seen')

  const counts = {
    green: game.greenCount,
    yellow: game.yellowCount,
    red: game.redCount,
    unseen: game.totalConcepts - game.visitedCount,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 pb-24">
      <TopBar game={game} onClose={() => go('home')} title="Repaso inteligente" />
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-4 rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
          <div className="font-display text-lg font-extrabold text-white">El objetivo: 🟢 en todos</div>
          <p className="text-sm font-semibold text-emerald-100/80">No se trata de “respuestas correctas”, sino de poder explicar cada concepto en el oral.</p>
          <ProgressBar value={(counts.green / game.totalConcepts) * 100} barClass="bg-emerald-400" className="mt-3" />
          <div className="mt-1 text-right text-xs font-bold text-emerald-200">{counts.green}/{game.totalConcepts} en verde</div>
        </div>

        {/* filtros */}
        <div className="mb-3 flex flex-wrap gap-2">
          <Chip active={filter === 'all'} onClick={() => setFilter('all')}>Todos</Chip>
          {['red', 'yellow', 'unseen', 'green'].map((k) => (
            <Chip key={k} active={filter === k} onClick={() => setFilter(k)}>
              {META[k].emoji} {counts[k] ?? 0}
            </Chip>
          ))}
        </div>

        {firstRed && (
          <button
            onClick={() => go('lesson', { conceptId: firstRed.id })}
            className="mb-4 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 p-3 font-extrabold text-white shadow-lg"
          >
            🎯 Repasar lo que falta — empezar por “{firstRed.term}”
          </button>
        )}

        <div className="space-y-2">
          {shown.map((c, i) => {
            const m = META[c.st] || META.unseen
            return (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.015, 0.3) }}
                onClick={() => go('lesson', { conceptId: c.id })}
                className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm ${m.tint} text-white`}>{m.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold text-slate-800">{c.term}</div>
                  <div className="text-xs font-semibold text-slate-400">{c.world.emoji} {c.world.title} · {m.label}</div>
                </div>
                <span className="text-slate-300">→</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Chip({ active, children, onClick }) {
  return (
    <button onClick={onClick} className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${active ? 'bg-emerald-500 text-white' : 'bg-white/10 text-emerald-100 hover:bg-white/20'}`}>
      {children}
    </button>
  )
}
