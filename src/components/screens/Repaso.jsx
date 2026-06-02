import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TopBar, Btn } from '../ui'
import { EMERGENCY } from '../../data'

export default function Repaso({ game, go }) {
  const [secs, setSecs] = useState(10 * 60)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [running])

  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  const low = secs <= 60

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 pb-24">
      <TopBar game={game} onClose={() => go('home')} title="Repaso de emergencia" />
      <div className="mx-auto max-w-2xl px-4">
        {/* Timer */}
        <div className="sticky top-16 z-20 mb-4">
          <div className={`flex items-center justify-between rounded-2xl p-4 ring-1 ${low ? 'bg-rose-500/20 ring-rose-400/40' : 'bg-white/10 ring-white/10'}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏱</span>
              <div>
                <div className="text-[11px] font-bold uppercase text-emerald-200/70">Te quedan</div>
                <div className={`font-display text-3xl font-black tabular-nums ${low ? 'text-rose-300' : 'text-white'}`}>
                  {mm}:{ss}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setRunning((r) => !r)} className="rounded-xl bg-white/15 px-3 py-2 text-sm font-bold text-white hover:bg-white/25">
                {running ? '⏸ Pausar' : '▶ Seguir'}
              </button>
              <button onClick={() => { setSecs(600); setRunning(true) }} className="rounded-xl bg-white/15 px-3 py-2 text-sm font-bold text-white hover:bg-white/25">
                ↺
              </button>
            </div>
          </div>
        </div>

        <Intro />

        <Section title="🎯 Conceptos más preguntables" tint="bg-sky-50 ring-sky-100">
          <div className="grid gap-2 sm:grid-cols-2">
            {EMERGENCY.preguntables.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                <div className="font-display text-sm font-extrabold text-slate-800">{p.t}</div>
                <div className="text-sm text-slate-600">{p.d}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="⚖️ Diferencias clave (las que más se confunden)" tint="bg-violet-50 ring-violet-100">
          <ul className="space-y-1.5">
            {EMERGENCY.diferencias.map((d, i) => (
              <li key={i} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-black/5">
                {d}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="📚 Autores (no te los olvides)" tint="bg-amber-50 ring-amber-100">
          <ul className="space-y-1.5">
            {EMERGENCY.autores.map((a, i) => (
              <li key={i} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-black/5">
                {a}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="🚨 Trampas típicas (no caigas)" tint="bg-rose-50 ring-rose-100">
          <ul className="space-y-1.5">
            {EMERGENCY.trampas.map((t, i) => (
              <li key={i} className="flex gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-black/5">
                <span className="text-rose-500">✗</span> {t}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-4 rounded-2xl bg-slate-900 p-5 text-white">
          <div className="font-display text-lg font-extrabold">🧩 Cómo cerrar el oral con criterio</div>
          <p className="mt-2 text-sm text-white/80">{EMERGENCY.cierre}</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Btn color="white" onClick={() => go('home')}>🏠 Inicio</Btn>
          <Btn color="green" onClick={() => go('examen')}>🔥 Probarme ahora</Btn>
        </div>
      </div>
    </div>
  )
}

function Intro() {
  return (
    <div className="mb-4 rounded-2xl bg-white/5 p-4 text-sm font-semibold text-emerald-100 ring-1 ring-white/10">
      Leé de arriba a abajo sin frenar. Es el resumen de lo que más cae. Si algo no te suena, abrí “Explicámelo fácil”.
    </div>
  )
}

function Section({ title, children, tint }) {
  return (
    <div className={`mt-4 rounded-2xl p-4 ring-1 ${tint}`}>
      <h3 className="mb-2 font-display text-base font-extrabold text-slate-800">{title}</h3>
      {children}
    </div>
  )
}
