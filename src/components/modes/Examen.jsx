import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Session from '../Session'
import { Btn, TopBar, ProgressBar } from '../ui'
import { buildExam, WORLDS } from '../../data'

export default function Examen({ game, go }) {
  const [questions, setQuestions] = useState(buildExam)
  const [report, setReport] = useState(null)

  if (report) {
    return <ExamReport report={report} game={game} go={go} onRetry={() => { setReport(null); setQuestions(buildExam()) }} />
  }

  return (
    <Session
      title="Examen del Viernes 🔥"
      questions={questions}
      game={game}
      consumeLives={false}
      showSummary={false}
      accentGradient="from-rose-700 via-red-700 to-orange-600"
      onExit={() => go('home')}
      onFinish={(rep) => {
        const nota = computeNota(rep.results)
        if (nota >= 8) confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } })
        setReport({ ...rep, nota })
      }}
    />
  )
}

function computeNota(results) {
  if (!results.length) return 0
  const pts = results.reduce((a, r) => {
    if (r.q.type === 'open' || r.q.type === 'compare') return a + (r.res.score ?? 0) / 10
    return a + (r.res.correct ? 1 : 0)
  }, 0)
  return Math.round((pts / results.length) * 10)
}

function classifyWorlds(results, game) {
  // Combina el resultado del examen por mundo con el dominio guardado
  const perWorld = {}
  for (const r of results) {
    const w = r.q.world && r.q.world !== 'all' ? r.q.world : null
    if (!w) continue
    perWorld[w] = perWorld[w] || { correct: 0, total: 0 }
    perWorld[w].total++
    const ok = r.q.type === 'open' || r.q.type === 'compare' ? (r.res.score ?? 0) >= 7 : r.res.correct
    if (ok) perWorld[w].correct++
  }
  return WORLDS.map((w) => {
    const e = perWorld[w.id]
    const examPct = e ? e.correct / e.total : null
    const mastery = (game.state.mastery[w.id] || 0) / 100
    // pondera examen (si hubo) con dominio histórico
    const score = examPct === null ? mastery : examPct * 0.7 + mastery * 0.3
    let band = score >= 0.75 ? 'green' : score >= 0.45 ? 'yellow' : 'red'
    return { world: w, score, band, inExam: !!e }
  })
}

function ExamReport({ report, game, go, onRetry }) {
  const cls = classifyWorlds(report.results, game)
  const green = cls.filter((c) => c.band === 'green')
  const yellow = cls.filter((c) => c.band === 'yellow')
  const red = cls.filter((c) => c.band === 'red')
  const nota = report.nota
  const notaColor = nota >= 8 ? 'text-emerald-400' : nota >= 6 ? 'text-amber-400' : 'text-rose-400'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-rose-950 to-slate-900 pb-24">
      <TopBar game={game} onClose={() => go('home')} title="Resultado del simulacro" />
      <div className="mx-auto max-w-2xl px-4">
        {/* Nota */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-6 text-center">
          <div className="text-sm font-bold uppercase tracking-wide text-slate-400">Nota final del oral simulado</div>
          <div className={`font-display text-7xl font-black ${notaColor}`}>
            {nota}
            <span className="text-3xl text-slate-300">/10</span>
          </div>
          <div className="text-sm font-semibold text-slate-500">
            {report.correct}/{report.total} respuestas bien · +{report.xpGained} XP
          </div>
          <div className="mt-2 font-display text-lg font-extrabold text-slate-800">
            {nota >= 9 ? '¡Estás para un 10! 🏆' : nota >= 7 ? '¡Aprobás con ganas! Pulí los amarillos 💪' : nota >= 5 ? 'Aprobás justo. Hay que reforzar 📚' : 'Todavía no. A darle a los rojos 🔴'}
          </div>
        </motion.div>

        {/* Semáforo de temas */}
        <div className="mt-4 grid gap-3">
          <Band title="🟢 Temas dominados" items={green} color="emerald" empty="Todavía ninguno consolidado." />
          <Band title="🟡 Para repasar" items={yellow} color="amber" empty="Nada en amarillo, ¡bien!" />
          <Band title="🔴 No sabés todavía" items={red} color="rose" empty="¡Nada en rojo! 🎉" />
        </div>

        {/* Plan de estudio */}
        <StudyPlan red={red} yellow={yellow} go={go} />

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Btn color="white" onClick={() => go('home')}>
            🏠 Inicio
          </Btn>
          <Btn color="red" onClick={onRetry}>
            🔁 Otro simulacro
          </Btn>
        </div>
      </div>
    </div>
  )
}

function Band({ title, items, color, empty }) {
  const ring = { emerald: 'ring-emerald-200 bg-emerald-50', amber: 'ring-amber-200 bg-amber-50', rose: 'ring-rose-200 bg-rose-50' }[color]
  return (
    <div className={`rounded-2xl p-4 ring-1 ${ring}`}>
      <div className="mb-2 font-display font-extrabold text-slate-800">{title}</div>
      {items.length ? (
        <div className="flex flex-wrap gap-2">
          {items.map((c) => (
            <span key={c.world.id} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-700 ring-1 ring-black/5">
              {c.world.emoji} {c.world.title}
            </span>
          ))}
        </div>
      ) : (
        <div className="text-sm font-semibold text-slate-400">{empty}</div>
      )}
    </div>
  )
}

function StudyPlan({ red, yellow, go }) {
  const steps = []
  if (red.length) {
    steps.push({
      icon: '🔴',
      t: `Atacá lo urgente: ${red.map((c) => c.world.title).join(', ')}`,
      d: 'Abrí "Explicámelo fácil" de esos mundos y después practicá en Modo Flash hasta que dejen de fallar.',
      action: { label: 'Ir a Explicámelo fácil', to: 'facil' },
    })
  }
  if (yellow.length) {
    steps.push({
      icon: '🟡',
      t: `Reforzá: ${yellow.map((c) => c.world.title).join(', ')}`,
      d: 'Usá Comparaciones y No me la creo para afinar diferencias y trampas.',
      action: { label: 'Ir a Comparaciones', to: 'play', params: { mode: 'comparaciones' } },
    })
  }
  steps.push({
    icon: '🧠',
    t: 'Practicá el oral de verdad',
    d: 'Pasá por el Modo Profesor exigente y el Profe mala onda para defender cada tema y conectarlo con la estrategia.',
    action: { label: 'Profesor exigente', to: 'play', params: { mode: 'profesor' } },
  })
  steps.push({
    icon: '⏱',
    t: 'Última hora antes del oral',
    d: 'Hacé el "Repaso de emergencia 10 minutos" y volvé a tirar otro Examen del Viernes.',
    action: { label: 'Repaso 10 min', to: 'repaso' },
  })

  return (
    <div className="mt-4 rounded-2xl bg-slate-900 p-5 text-white">
      <div className="font-display text-lg font-extrabold">📋 Tu plan para las horas que quedan</div>
      <ol className="mt-3 space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-xl">{s.icon}</span>
            <div className="flex-1">
              <div className="font-bold">
                {i + 1}. {s.t}
              </div>
              <div className="text-sm text-white/70">{s.d}</div>
              {s.action && (
                <button
                  onClick={() => go(s.action.to, s.action.params)}
                  className="mt-1 text-sm font-bold text-amber-300 hover:underline"
                >
                  {s.action.label} →
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
