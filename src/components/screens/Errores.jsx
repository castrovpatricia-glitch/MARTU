import { useState } from 'react'
import { motion } from 'framer-motion'
import Session from '../Session'
import { Btn, TopBar, Pill } from '../ui'
import { getQuestionById, WORLD_BY_ID } from '../../data'

export default function Errores({ game, go }) {
  const [practicing, setPracticing] = useState(false)
  const errors = game.errorList

  if (practicing) {
    // Reconstruye las preguntas reales priorizando las más falladas
    const ids = [...errors].sort((a, b) => b.count - a.count).map((e) => e.id)
    const questions = ids.map(getQuestionById).filter(Boolean)
    return (
      <Session
        title="Reforzando tus errores 🔁"
        questions={questions}
        game={game}
        consumeLives={false}
        accentGradient="from-rose-700 to-rose-500"
        onExit={() => setPracticing(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-rose-950 to-slate-900 pb-24">
      <TopBar game={game} onClose={() => go('home')} title="Lo que todavía no sabés" />
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-4 rounded-2xl bg-white/5 p-4 text-white ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <div className="font-display text-lg font-extrabold">Tu lista de repaso inteligente</div>
              <div className="text-sm text-indigo-200/70">
                Acá quedan los conceptos que fallaste. Repetición espaciada: lo que más fallás, vuelve más seguido.
              </div>
            </div>
          </div>
        </div>

        {errors.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-5xl">🎉</div>
            <h3 className="mt-2 font-display text-xl font-extrabold text-slate-800">¡No tenés errores pendientes!</h3>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Seguí jugando los modos para detectar puntos flojos, o tirá un Examen del Viernes.
            </p>
            <Btn color="green" className="mt-5" onClick={() => go('examen')}>
              🔥 Hacer un simulacro
            </Btn>
          </div>
        ) : (
          <>
            <Btn color="red" className="mb-4 w-full" onClick={() => setPracticing(true)}>
              🔁 Volver a practicar ({errors.length})
            </Btn>
            <div className="space-y-2.5">
              {errors.map((e, idx) => {
                const world = WORLD_BY_ID[e.world]
                return (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="card p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        {world && (
                          <Pill className={`${world.soft} ${world.text} mb-1`}>
                            {world.emoji} {world.title}
                          </Pill>
                        )}
                        <div className="font-bold text-slate-800">{e.q}</div>
                      </div>
                      <span className="shrink-0 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-black text-rose-600">
                        ×{e.count}
                      </span>
                    </div>
                    {e.correct && (
                      <div className="mt-2 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-900 ring-1 ring-emerald-100">
                        ✔ {e.correct}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
