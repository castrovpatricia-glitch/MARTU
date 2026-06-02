import { motion } from 'framer-motion'
import { WORLDS, getLevels } from '../../data'
import { TopBar, MasteryRing, ProgressBar } from '../ui'

// --------------------------- Mapa de mundos --------------------------------
export function MapScreen({ game, go }) {
  const { state } = game
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 pb-20">
      <TopBar game={game} onClose={() => go('home')} title="Mapa de aprendizaje" />
      <div className="mx-auto max-w-xl px-4">
        <p className="mb-4 text-center text-sm font-semibold text-indigo-200/70">
          Dominá cada mundo (≥ {game.UNLOCK_THRESHOLD}%) para desbloquear el siguiente 🔓
        </p>

        <div className="relative space-y-3">
          {WORLDS.map((w, idx) => {
            const unlocked = game.isUnlocked(w.id)
            const mastery = state.mastery[w.id] || 0
            const align = idx % 2 === 0 ? 'mr-auto' : 'ml-auto'
            return (
              <motion.button
                key={w.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: unlocked ? 1.02 : 1 }}
                whileTap={{ scale: unlocked ? 0.98 : 1 }}
                disabled={!unlocked}
                onClick={() => unlocked && go('world', { worldId: w.id })}
                className={`flex w-[88%] items-center gap-4 rounded-3xl p-4 text-left shadow-xl ${align} ${
                  unlocked ? `bg-gradient-to-br ${w.gradient}` : 'bg-white/5 ring-1 ring-white/10'
                }`}
              >
                <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl ${unlocked ? 'bg-white/25' : 'bg-white/5'}`}>
                  {unlocked ? w.emoji : '🔒'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-white/70">Mundo {idx + 1} · Módulo {w.module}</div>
                  <div className={`truncate font-display text-lg font-black ${unlocked ? 'text-white' : 'text-white/40'}`}>{w.title}</div>
                  {unlocked ? (
                    <ProgressBar className="mt-1.5" value={mastery} barClass="bg-white" height="h-2" />
                  ) : (
                    <div className="mt-1 text-xs font-semibold text-white/40">Dominá el mundo anterior para abrir</div>
                  )}
                </div>
                {unlocked && <MasteryRing value={mastery} size={48} stroke={6} color="#ffffff" label={`${mastery}%`} />}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// --------------------------- Niveles de un mundo ---------------------------
export function WorldScreen({ game, worldId, go }) {
  const world = WORLDS.find((w) => w.id === worldId)
  const levels = getLevels(worldId)
  const { state } = game

  const isLevelUnlocked = (idx) => {
    if (idx === 0) return true
    const prev = levels[idx - 1]
    return !!state.levels[prev.id]?.completed
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${world.gradient} pb-20`}>
      <TopBar game={game} onClose={() => go('map')} title={world.title} />
      <div className="mx-auto max-w-xl px-4">
        <div className="mb-5 rounded-3xl bg-white/15 p-4 text-white ring-1 ring-white/20">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{world.emoji}</span>
            <div>
              <div className="font-display text-xl font-black">{world.title}</div>
              <div className="text-sm font-semibold text-white/80">{world.tagline}</div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => go('facil', { worldId })}
              className="flex-1 rounded-xl bg-white/20 px-3 py-2 text-sm font-bold text-white hover:bg-white/30"
            >
              🧒 Conceptos
            </button>
            <button
              onClick={() => go('play', { mode: 'flash', worldId })}
              className="flex-1 rounded-xl bg-white/20 px-3 py-2 text-sm font-bold text-white hover:bg-white/30"
            >
              ⚡ Practicar todo
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {levels.map((lvl, idx) => {
            const unlocked = isLevelUnlocked(idx)
            const prog = state.levels[lvl.id]
            const best = prog ? Math.round(prog.best * 100) : 0
            const completed = prog?.completed
            return (
              <motion.button
                key={lvl.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileTap={{ scale: unlocked ? 0.98 : 1 }}
                disabled={!unlocked}
                onClick={() => unlocked && go('level', { worldId, levelIndex: idx })}
                className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left ${
                  unlocked ? 'bg-white shadow-lg' : 'bg-white/10 ring-1 ring-white/10'
                }`}
              >
                <div
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl ${
                    unlocked ? 'bg-slate-100' : 'bg-white/5'
                  }`}
                >
                  {unlocked ? (completed ? '✅' : lvl.icon) : '🔒'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-[11px] font-bold uppercase tracking-wide ${unlocked ? 'text-slate-400' : 'text-white/40'}`}>
                    Nivel {lvl.n}
                  </div>
                  <div className={`font-display text-base font-extrabold ${unlocked ? 'text-slate-800' : 'text-white/40'}`}>{lvl.title}</div>
                  <div className={`text-xs font-semibold ${unlocked ? 'text-slate-400' : 'text-white/30'}`}>{lvl.sub}</div>
                </div>
                {unlocked && (
                  <div className="text-right">
                    <div className={`font-display text-lg font-black ${completed ? 'text-emerald-500' : 'text-slate-300'}`}>{best}%</div>
                    <div className="text-[10px] font-bold uppercase text-slate-400">{lvl.questions.length} preg.</div>
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
