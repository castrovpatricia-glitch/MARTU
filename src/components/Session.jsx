import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import QuestionRunner from './QuestionRunner'
import { Btn, ProgressBar, Hearts, TopBar } from './ui'
import { sfx } from '../utils/sound'

const xpFor = (q, res) => {
  if (q.type === 'open' || q.type === 'compare') return (res.score ?? 0) * 2
  return res.correct ? 10 : 2
}

export default function Session({ title, questions, game, onExit, onFinish, consumeLives = true, showSummary = true, accentGradient = 'from-brand-600 to-brand-500' }) {
  const [i, setI] = useState(0)
  const [done, setDone] = useState(false)
  const [outOfLives, setOutOfLives] = useState(false)
  const results = useRef([])
  const xpGained = useRef(0)

  const total = questions.length
  const q = questions[i]

  const handleResult = (res) => {
    results.current.push({ q, res })
    const xp = xpFor(q, res)
    xpGained.current += xp
    game.recordAnswer({
      world: q.world && q.world !== 'all' ? q.world : undefined,
      correct: res.correct,
      xp,
      costLife: consumeLives,
      questionId: res.questionId,
      question: res.question,
      correctText: res.correctText,
      type: res.type,
    })

    // ¿se quedó sin vidas?
    if (consumeLives && !res.correct && game.state.lives <= 1) {
      // todavía mostramos el resultado; se chequea al avanzar
    }
    next()
  }

  const next = () => {
    if (i + 1 >= total) {
      finish()
    } else {
      setI((x) => x + 1)
    }
  }

  const finish = () => {
    setDone(true)
    const correct = results.current.filter((r) => r.res.correct).length
    const pct = total ? correct / total : 0
    if (pct >= 0.8) {
      sfx.win()
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } })
    } else if (pct >= 0.5) {
      sfx.levelup()
    }
    onFinish?.({
      total,
      correct,
      pct,
      xpGained: xpGained.current,
      results: results.current,
    })
  }

  // Bloqueo suave por vidas
  useEffect(() => {
    if (consumeLives && game.state.lives <= 0 && !done) setOutOfLives(true)
  }, [game.state.lives, consumeLives, done])

  if (!total) {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${accentGradient}`}>
        <TopBar game={game} onClose={onExit} title={title} />
        <div className="mx-auto max-w-md px-4 py-20 text-center text-white">
          <div className="text-5xl">🤷</div>
          <p className="mt-3 font-bold">No hay preguntas para esta sección todavía.</p>
          <Btn color="white" className="mt-5" onClick={onExit}>
            Volver
          </Btn>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${accentGradient} pb-16`}>
      <TopBar game={game} onClose={onExit} title={title} />

      {!done && (
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-4 flex items-center gap-3">
            <ProgressBar value={(i / total) * 100} barClass="bg-white" />
            <span className="shrink-0 text-sm font-extrabold text-white/90">
              {i + 1}/{total}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={q.id + i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.22 }}
            >
              <QuestionRunner question={q} onResult={handleResult} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {done && showSummary && (
        <Summary
          results={results.current}
          total={total}
          xp={xpGained.current}
          game={game}
          onExit={onExit}
        />
      )}

      {/* Interstitial sin vidas (no bloquea de verdad: permite seguir) */}
      <AnimatePresence>
        {outOfLives && !done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-6"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="card max-w-sm p-6 text-center">
              <div className="text-5xl">💔</div>
              <h3 className="mt-2 font-display text-xl font-extrabold text-slate-800">Te quedaste sin vidas</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Se recuperan solas con el tiempo. Pero falta poco para el viernes… ¡podés seguir practicando igual!
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Btn color="green" onClick={() => setOutOfLives(false)}>
                  💪 Seguir practicando igual
                </Btn>
                <button onClick={onExit} className="text-sm font-bold text-slate-500">
                  Salir y descansar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// --------------------------- Resumen final ---------------------------------
function Summary({ results, total, xp, game, onExit }) {
  const correct = results.filter((r) => r.res.correct).length
  const pct = total ? Math.round((correct / total) * 100) : 0
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0
  const msg =
    pct >= 90 ? '¡Imparable! Nivel 10. 🏆' : pct >= 70 ? '¡Muy bien! Ya aprobás. 💪' : pct >= 40 ? 'Vas mejorando, seguí. 📈' : 'A repasar y volver. 📖'

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md px-4 pt-6">
      <div className="card p-6 text-center">
        <div className="flex justify-center gap-2 text-4xl">
          {[0, 1, 2].map((s) => (
            <motion.span
              key={s}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15 * s, type: 'spring' }}
              className={s < stars ? '' : 'grayscale opacity-25'}
            >
              ⭐
            </motion.span>
          ))}
        </div>
        <h2 className="mt-3 font-display text-2xl font-black text-slate-800">{msg}</h2>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat label="Aciertos" value={`${correct}/${total}`} />
          <Stat label="Precisión" value={`${pct}%`} />
          <Stat label="XP ganada" value={`+${xp}`} />
        </div>

        {/* Repaso de lo fallado en esta ronda */}
        {results.some((r) => !r.res.correct) && (
          <div className="mt-5 rounded-2xl bg-rose-50 p-3 text-left ring-1 ring-rose-100">
            <div className="mb-1 text-xs font-extrabold uppercase text-rose-600">Para repasar de esta ronda</div>
            <ul className="space-y-1 text-sm font-semibold text-rose-900">
              {results
                .filter((r) => !r.res.correct)
                .slice(0, 5)
                .map((r, idx) => (
                  <li key={idx}>• {r.res.question}</li>
                ))}
            </ul>
          </div>
        )}

        <Btn color="green" className="mt-6 w-full" onClick={onExit}>
          Continuar →
        </Btn>
      </div>
    </motion.div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
      <div className="font-display text-xl font-black text-slate-800">{value}</div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  )
}
