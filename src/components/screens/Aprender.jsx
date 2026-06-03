import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { TopBar, ProgressBar, MasteryRing } from '../ui'
import { WORLDS, CONCEPTS_FLAT, conceptsOfWorld } from '../../data'

const STATE_STYLE = {
  green: { bg: 'bg-emerald-500', ring: 'ring-emerald-300', emoji: '🟢' },
  yellow: { bg: 'bg-amber-400', ring: 'ring-amber-200', emoji: '🟡' },
  red: { bg: 'bg-rose-500', ring: 'ring-rose-300', emoji: '🔴' },
  seen: { bg: 'bg-brand-500', ring: 'ring-brand-200', emoji: '👁️' },
  unseen: { bg: 'bg-slate-300', ring: 'ring-slate-200', emoji: '▶️' },
}

export default function Aprender({ game, go }) {
  // Desbloqueo secuencial: un concepto se abre cuando visitaste el anterior.
  const { unlocked, frontier } = useMemo(() => {
    const set = new Set()
    let front = CONCEPTS_FLAT[0]?.id
    for (let i = 0; i < CONCEPTS_FLAT.length; i++) {
      const prev = CONCEPTS_FLAT[i - 1]
      const isUnlocked = i === 0 || game.state.visited[prev.id]
      if (isUnlocked) set.add(CONCEPTS_FLAT[i].id)
    }
    front = CONCEPTS_FLAT.find((c) => set.has(c.id) && !game.state.visited[c.id])?.id || CONCEPTS_FLAT.find((c) => !game.state.visited[c.id])?.id
    return { unlocked: set, frontier: front }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.state.visited])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 pb-24">
      <TopBar game={game} onClose={() => go('home')} title="Aprendamos juntos" />
      <div className="mx-auto max-w-xl px-4">
        {/* Progreso de aprendizaje */}
        <div className="mb-5 flex items-center gap-4 rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
          <MasteryRing value={game.learnPct} size={64} stroke={7} color="#34d399" />
          <div className="flex-1">
            <div className="font-display text-lg font-extrabold text-white">Tu recorrido</div>
            <div className="text-sm font-semibold text-indigo-200/80">
              {game.visitedCount}/{game.totalConcepts} conceptos vistos
            </div>
            <div className="mt-1 flex gap-2 text-xs font-bold">
              <span className="text-emerald-300">🟢 {game.greenCount}</span>
              <span className="text-amber-300">🟡 {game.yellowCount}</span>
              <span className="text-rose-300">🔴 {game.redCount}</span>
            </div>
          </div>
        </div>

        {frontier && (
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => go('lesson', { conceptId: frontier })}
            className="mb-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 p-4 text-left font-extrabold text-white shadow-xl"
          >
            ▶️ Continuar aprendiendo
            <div className="text-sm font-semibold text-white/80">Seguí donde quedaste</div>
          </motion.button>
        )}

        {/* Camino por mundos */}
        <div className="space-y-8">
          {WORLDS.map((w) => {
            const concepts = conceptsOfWorld(w.id)
            const seen = concepts.filter((c) => game.state.visited[c.id]).length
            return (
              <div key={w.id}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">{w.emoji}</span>
                  <div className="flex-1">
                    <div className="font-display font-extrabold text-white">M{w.module} · {w.title}</div>
                    <ProgressBar value={(seen / concepts.length) * 100} barClass="bg-emerald-400" height="h-1.5" className="mt-1" />
                  </div>
                  <span className="text-xs font-bold text-indigo-200/70">{seen}/{concepts.length}</span>
                </div>

                <div className="flex flex-col items-center gap-0">
                  {concepts.map((c, i) => {
                    const isUnlocked = unlocked.has(c.id)
                    const st = game.conceptState(c.id)
                    const style = STATE_STYLE[st] || STATE_STYLE.unseen
                    const align = i % 2 === 0 ? 'self-start ml-6' : 'self-end mr-6'
                    return (
                      <div key={c.id} className={`flex w-full items-center gap-3 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <motion.button
                          whileTap={{ scale: isUnlocked ? 0.92 : 1 }}
                          whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
                          disabled={!isUnlocked}
                          onClick={() => isUnlocked && go('lesson', { conceptId: c.id })}
                          className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full text-xl font-black text-white shadow-lg ring-4 ${
                            isUnlocked ? `${style.bg} ${style.ring}` : 'bg-white/10 ring-white/5'
                          } ${frontier === c.id ? 'animate-float' : ''}`}
                        >
                          {!isUnlocked ? '🔒' : st === 'unseen' ? i + 1 : style.emoji}
                        </motion.button>
                        <div className={`flex-1 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
                          <button
                            disabled={!isUnlocked}
                            onClick={() => isUnlocked && go('lesson', { conceptId: c.id })}
                            className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-white/30'}`}
                          >
                            {c.term}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
