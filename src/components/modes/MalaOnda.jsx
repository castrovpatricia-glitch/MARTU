import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OpenQ } from '../QuestionRunner'
import { Btn, TopBar, ProgressBar } from '../ui'
import { MALAONDA, shuffle, WORLD_BY_ID } from '../../data'
import { sfx } from '../../utils/sound'

export default function MalaOnda({ game, go }) {
  const [items] = useState(() => shuffle(MALAONDA))
  const [i, setI] = useState(0)
  const [phase, setPhase] = useState('answer') // 'answer' | 'press'
  const [scores, setScores] = useState([])
  const item = items[i]
  const done = i >= items.length

  const onAnswered = (res) => {
    game.recordAnswer({
      world: item.world,
      correct: res.correct,
      xp: (res.score ?? 0) * 2,
      costLife: false,
      questionId: item.id,
      question: item.q,
      correctText: item.model,
      type: 'open',
    })
    setScores((s) => [...s, res.score ?? 0])
    sfx.wrong() // sonido seco, "mala onda"
    setPhase('press')
  }

  const nextVictim = () => {
    if (i + 1 >= items.length) setI(items.length)
    else {
      setI(i + 1)
      setPhase('answer')
    }
  }

  if (done) {
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-20">
        <TopBar game={game} onClose={() => go('home')} title="Profe mala onda" />
        <div className="mx-auto max-w-md px-4 pt-10 text-center">
          <div className="text-6xl">💀</div>
          <h2 className="mt-3 font-display text-2xl font-black text-white">Sobreviviste al profe mala onda</h2>
          <p className="mt-2 text-indigo-200/80">
            Promedio bajo presión: <b className="text-white">{avg}/10</b>. Si aguantás esto, el oral real es un trámite.
          </p>
          <Btn color="white" className="mt-6" onClick={() => go('home')}>
            Volver al inicio
          </Btn>
        </div>
      </div>
    )
  }

  const world = WORLD_BY_ID[item.world]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-20">
      <TopBar game={game} onClose={() => go('home')} title="💀 Profe mala onda" />
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-4 flex items-center gap-3">
          <ProgressBar value={(i / items.length) * 100} barClass="bg-rose-500" />
          <span className="shrink-0 text-sm font-extrabold text-white/80">
            {i + 1}/{items.length}
          </span>
        </div>

        {/* "Avatar" del profe */}
        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-rose-600 text-2xl">😠</div>
          <div className="text-sm font-semibold text-rose-100">
            {phase === 'answer'
              ? 'El profe te mira fijo y espera tu respuesta…'
              : 'No te suelta: te repregunta y te hace justificar.'}
            {world && <span className="ml-1 text-rose-300/70">· {world.title}</span>}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'answer' ? (
            <motion.div key={'a' + i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <OpenQ question={{ ...item, type: 'open' }} onResult={onAnswered} kicker="Defendé tu respuesta" />
            </motion.div>
          ) : (
            <motion.div key={'p' + i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card p-5">
                <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-rose-500">El profe te interrumpe 🔥</div>
                <ul className="space-y-2">
                  {item.followUps.map((f, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.25 }}
                      className="rounded-2xl bg-slate-900 p-3 font-semibold text-white"
                    >
                      “{f}”
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-slate-500">
                  👉 Respondelas en voz alta, como en el oral. Después mirá si tu defensa coincide con lo que esperaba:
                </p>
                <div className="mt-2 space-y-2 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-emerald-200">
                  <p className="font-semibold">{item.model}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Btn color="red" onClick={nextVictim}>
                    Aguanto otra →
                  </Btn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
