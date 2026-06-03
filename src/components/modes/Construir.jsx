import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Btn, Card, TopBar, ProgressBar, Pill } from '../ui'
import { OPEN, openForWorld, WORLD_BY_ID } from '../../data'
import { evaluateOpen } from '../../utils/evaluator'
import { sfx } from '../../utils/sound'

const STEPS = [
  { key: 'q', icon: '1️⃣', prompt: 'Para arrancar… ¿qué es? Definilo con tus palabras.' },
  { key: 'why', icon: '2️⃣', prompt: 'Muy bien. Ahora sumemos: ¿por qué es importante / estratégico para el negocio?' },
  { key: 'ej', icon: '3️⃣', prompt: 'Cerremos con un ejemplo concreto de empresa.' },
]

const titleOf = (q) => q.q.replace(/^(Explicá|Explicame|Compará|¿|Diferenciá|Hablame de[l]?)\s*/i, '').slice(0, 60)

export default function Construir({ game, go, worldId }) {
  const startTopic = useMemo(() => (worldId ? openForWorld(worldId)[0] : null), [worldId])
  const [topic, setTopic] = useState(startTopic)

  if (!topic) return <Picker game={game} go={go} onPick={setTopic} />
  return <Builder key={topic.id} topic={topic} game={game} go={go} onChange={() => setTopic(null)} />
}

function Picker({ game, go, onPick }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-800 to-purple-700 pb-20">
      <TopBar game={game} onClose={() => go('home')} title="Construí tu respuesta" />
      <div className="mx-auto max-w-xl px-4">
        <p className="mb-4 text-center text-sm font-semibold text-violet-100">
          Elegí un tema y te ayudo a armar la respuesta de oral, paso a paso. 🗣️
        </p>
        <div className="space-y-2">
          {OPEN.map((t) => {
            const w = WORLD_BY_ID[t.world]
            const done = game.state.built[t.id]
            return (
              <button
                key={t.id}
                onClick={() => onPick(t)}
                className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-lg"
              >
                <span className="text-2xl">{w?.emoji}</span>
                <span className="flex-1 font-bold text-slate-800">{titleOf(t)}</span>
                {done && <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-600">✓ hecho</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Builder({ topic, game, go, onChange }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(['', '', ''])
  const [done, setDone] = useState(false)
  const [res, setRes] = useState(null)
  const w = WORLD_BY_ID[topic.world]

  const setAns = (v) => setAnswers((a) => a.map((x, i) => (i === step ? v : x)))

  const nextStep = () => {
    sfx.tap()
    if (step + 1 < STEPS.length) setStep(step + 1)
    else finish()
  }

  const finish = () => {
    const combined = answers.join('. ')
    const r = evaluateOpen(combined, topic)
    setRes(r)
    setDone(true)
    game.markBuilt(topic.id)
    if (r.score >= 7) {
      sfx.win()
      confetti({ particleCount: 110, spread: 75, origin: { y: 0.65 } })
    } else sfx.levelup()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-800 to-purple-700 pb-24">
      <TopBar game={game} onClose={() => go('home')} title="Construí tu respuesta" />
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-4 rounded-2xl bg-white/15 p-4 text-white ring-1 ring-white/20">
          <Pill className="bg-white/25 text-white mb-1">{w?.emoji} {w?.title}</Pill>
          <div className="font-display text-lg font-extrabold">{topic.q}</div>
        </div>

        {!done ? (
          <>
            <div className="mb-3 flex items-center gap-2">
              <ProgressBar value={(step / STEPS.length) * 100} barClass="bg-white" />
              <span className="shrink-0 text-xs font-extrabold text-white/90">Paso {step + 1}/{STEPS.length}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <Card>
                  <div className="mb-2 font-display text-lg font-extrabold text-slate-800">{STEPS[step].icon} {STEPS[step].prompt}</div>
                  {/* respuestas anteriores como contexto */}
                  {step > 0 && (
                    <div className="mb-3 space-y-1">
                      {answers.slice(0, step).map((a, i) =>
                        a ? <div key={i} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500">{STEPS[i].icon} {a}</div> : null,
                      )}
                    </div>
                  )}
                  <textarea
                    autoFocus
                    value={answers[step]}
                    onChange={(e) => setAns(e.target.value)}
                    rows={4}
                    placeholder="Escribí acá…"
                    className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-[15px] font-medium text-slate-800 outline-none focus:border-violet-400"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <button onClick={() => (step > 0 ? setStep(step - 1) : onChange())} className="text-sm font-bold text-slate-500">
                      {step > 0 ? '← Atrás' : 'Cambiar tema'}
                    </button>
                    <Btn color="violet" onClick={nextStep} disabled={!answers[step].trim()}>
                      {step + 1 < STEPS.length ? 'Siguiente →' : 'Ver mi respuesta 🎯'}
                    </Btn>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {/* Comparación: tu respuesta vs respuesta nivel 10 */}
            <div className="grid gap-3 md:grid-cols-2">
              <Card className="!p-4">
                <div className="mb-1 text-xs font-extrabold uppercase text-slate-400">🗣️ Tu respuesta</div>
                <p className="text-sm font-semibold text-slate-700">{answers.join('. ')}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-black text-white">
                  Nota orientativa: {res.score}/10
                </div>
              </Card>
              <Card className="!p-4 ring-2 ring-emerald-300">
                <div className="mb-1 text-xs font-extrabold uppercase text-emerald-600">🏆 Respuesta nivel 10</div>
                <p className="text-sm font-semibold text-slate-700">{topic.model}</p>
                {topic.strategy && <p className="mt-2 rounded-xl bg-amber-50 p-2 text-sm font-semibold text-amber-900">💡 {topic.strategy}</p>}
                {topic.example && <p className="mt-2 text-sm text-emerald-800"><b>Ejemplo:</b> {topic.example}</p>}
              </Card>
            </div>

            {/* qué sumar */}
            {res.toImprove.length > 0 && (
              <div className="mt-3 rounded-2xl bg-rose-50 p-4 ring-1 ring-rose-200">
                <div className="mb-1 text-xs font-extrabold uppercase text-rose-700">Para que sea nivel 10, sumá:</div>
                <ul className="space-y-1 text-sm font-semibold text-rose-900">
                  {res.toImprove.map((t, i) => <li key={i}>• {t}</li>)}
                </ul>
              </div>
            )}
            {res.toImprove.length === 0 && (
              <div className="mt-3 rounded-2xl bg-emerald-50 p-4 text-center font-bold text-emerald-800 ring-1 ring-emerald-200">
                ¡Tu respuesta ya cubre todo lo importante! 🏆
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Btn color="white" onClick={() => { setDone(false); setStep(0); setAnswers(['', '', '']) }}>
                🔁 Reintentar
              </Btn>
              <Btn color="violet" onClick={onChange}>Otro tema →</Btn>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
