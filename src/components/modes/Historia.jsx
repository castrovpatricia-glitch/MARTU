import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Btn, Card, TopBar, ProgressBar, Pill } from '../ui'
import { STORY, WORLD_BY_ID, getConceptFull } from '../../data'
import { sfx } from '../../utils/sound'

export default function Historia({ game, go }) {
  const [phase, setPhase] = useState(game.storyDoneCount > 0 ? 'play' : 'intro')
  const [i, setI] = useState(() => {
    // retomar donde quedó
    const idx = STORY.chapters.findIndex((c) => !game.state.storyChapters[c.id])
    return idx === -1 ? 0 : idx
  })
  const [sel, setSel] = useState(null)
  const chapters = STORY.chapters
  const ch = chapters[i]
  const answered = sel !== null
  const correct = answered && sel === ch.answer
  const isLast = i === chapters.length - 1

  const choose = (k) => {
    if (answered) return
    setSel(k)
    k === ch.answer ? sfx.correct() : sfx.wrong()
  }
  const advance = () => {
    game.completeChapter(ch.id, isLast)
    if (isLast) {
      sfx.win()
      confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 } })
      setPhase('done')
      return
    }
    setI(i + 1)
    setSel(null)
  }

  if (phase === 'intro') {
    return (
      <Shell game={game} go={go}>
        <Card className="text-center !p-6">
          <div className="text-6xl">🏢</div>
          <h2 className="mt-2 font-display text-2xl font-black text-slate-800">Bienvenida a {STORY.company}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">{STORY.intro}</p>
          <Btn color="green" className="mt-5 w-full" onClick={() => setPhase('play')}>Empezar mi primer día →</Btn>
        </Card>
      </Shell>
    )
  }

  if (phase === 'done') {
    return (
      <Shell game={game} go={go}>
        <Card className="text-center !p-6">
          <div className="text-6xl">🎉</div>
          <h2 className="mt-2 font-display text-2xl font-black text-slate-800">¡Salvaste a {STORY.company}!</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Resolviste {chapters.length} problemas reales conectando todos los módulos de RRHH con la estrategia del negocio. Eso es exactamente lo que te van a pedir en el oral. 💪
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Btn color="white" onClick={() => go('home')}>🏠 Inicio</Btn>
            <Btn color="green" onClick={() => { setI(0); setSel(null); setPhase('play') }}>Repasar la historia</Btn>
          </div>
        </Card>
      </Shell>
    )
  }

  const w = WORLD_BY_ID[ch.world]
  const taught = getConceptFull(ch.teaches[0])

  return (
    <Shell game={game} go={go}>
      <div className="mb-3 flex items-center gap-2">
        <ProgressBar value={(i / chapters.length) * 100} barClass="bg-white" />
        <span className="shrink-0 text-xs font-extrabold text-white/90">Cap. {i + 1}/{chapters.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={ch.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
          <Card>
            <Pill className="bg-slate-900 text-white">🏢 {STORY.company} · {w?.emoji} {w?.title}</Pill>
            <h2 className="mt-2 font-display text-xl font-extrabold text-slate-800">{ch.title}</h2>
            <div className="mt-2 rounded-2xl bg-slate-100 p-3 text-sm font-semibold text-slate-700">😟 {ch.problem}</div>

            <div className="mt-4 font-bold text-slate-800">{ch.question}</div>
            <div className="mt-2 grid gap-2">
              {ch.options.map((opt, k) => {
                let cls = 'bg-white ring-1 ring-slate-200 hover:ring-brand-300 text-slate-700'
                if (answered && k === ch.answer) cls = 'bg-emerald-500 text-white'
                else if (answered && k === sel) cls = 'bg-rose-500 text-white'
                else if (answered) cls = 'bg-white ring-1 ring-slate-200 text-slate-400'
                return (
                  <motion.button key={k} whileTap={{ scale: answered ? 1 : 0.98 }} onClick={() => choose(k)} className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${cls}`}>
                    {opt}
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence>
              {answered && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <div className={`rounded-2xl p-4 text-sm font-semibold ${correct ? 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200' : 'bg-amber-50 text-amber-900 ring-1 ring-amber-200'}`}>
                    <div className="mb-1 font-extrabold">{correct ? '¡Exacto! 🎯' : 'Casi… mirá esto 👇'}</div>
                    {ch.lesson}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    {taught && (
                      <button onClick={() => go('lesson', { conceptId: taught.id })} className="text-sm font-bold text-brand-600 hover:underline">
                        📖 Aprender “{taught.term}”
                      </button>
                    )}
                    <Btn color="green" onClick={advance}>{isLast ? 'Terminar 🎉' : 'Siguiente capítulo →'}</Btn>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Shell>
  )
}

function Shell({ game, go, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900 pb-24">
      <TopBar game={game} onClose={() => go('home')} title="Historia · TechNova" />
      <div className="mx-auto max-w-2xl px-4">{children}</div>
    </div>
  )
}
