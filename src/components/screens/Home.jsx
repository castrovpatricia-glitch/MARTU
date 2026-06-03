import { motion } from 'framer-motion'
import { ProgressBar, Hearts, MasteryRing } from '../ui'
import { TOTAL_QUESTIONS } from '../../data'

const LEARN_TOOLS = [
  { key: 'historia', emoji: '🏢', name: 'Historia: TechNova', desc: 'Aprendé resolviendo problemas', grad: 'from-indigo-500 to-blue-500', go: ['historia'] },
  { key: 'mapa', emoji: '🧠', name: 'Mapa mental', desc: 'Cómo se conecta todo', grad: 'from-violet-500 to-fuchsia-500', go: ['mapa'] },
  { key: 'construir', emoji: '🗣️', name: 'Construí tu respuesta', desc: 'Armá tu oral paso a paso', grad: 'from-purple-500 to-violet-500', go: ['construir'] },
  { key: 'confusiones', emoji: '🤔', name: 'Cosas que se confunden', desc: 'Las diferencias del oral', grad: 'from-amber-500 to-orange-500', go: ['confusiones'] },
  { key: 'repaso', emoji: '♻️', name: 'Repaso inteligente', desc: '🔴🟡🟢 por concepto', grad: 'from-emerald-500 to-teal-500', go: ['repaso'] },
  { key: 'facil', emoji: '🧒', name: 'Explicámelo fácil', desc: 'Todos los conceptos, simple', grad: 'from-sky-500 to-cyan-500', go: ['facil'] },
]

const PRACTICE = [
  { key: 'flash', emoji: '⚡', name: 'Flash', go: ['play', { mode: 'flash' }] },
  { key: 'profesor', emoji: '👩‍🏫', name: 'Profesor exigente', go: ['play', { mode: 'profesor' }] },
  { key: 'comparaciones', emoji: '⚔️', name: 'Comparaciones', go: ['play', { mode: 'comparaciones' }] },
  { key: 'nomelacreo', emoji: '🚨', name: 'No me la creo', go: ['play', { mode: 'nomelacreo' }] },
  { key: 'conectar', emoji: '🧩', name: 'Conectar ideas', go: ['play', { mode: 'conectar' }] },
  { key: 'autores', emoji: '📚', name: 'Autores', go: ['play', { mode: 'autores' }] },
]

function daysToFriday() {
  const day = new Date().getDay()
  return (5 - day + 7) % 7
}

export default function Home({ game, go }) {
  const { state, xpLevel, xpInLevel, xpPerLevel, learnPct, errorList } = game
  const dleft = daysToFriday()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 pb-24">
      <div className="mx-auto max-w-3xl px-4 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-3xl font-black text-white">RRHH Quest 🎓</div>
            <div className="text-sm font-semibold text-indigo-200/80">Primero aprendés. Después te lucís en el oral.</div>
          </div>
          <button onClick={() => go('ajustes')} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-lg text-white hover:bg-white/20">⚙️</button>
        </div>

        {/* Countdown */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 p-3 ring-1 ring-white/10">
          <span className="text-2xl">⏳</span>
          <div className="text-sm font-bold text-white">
            {dleft === 0 ? '¡Hoy es el oral! Repaso final 🔥' : `Faltan ${dleft} día${dleft > 1 ? 's' : ''} para el oral del viernes`}
          </div>
        </motion.div>

        {/* Stats compactas */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat><span className="text-xl">⭐</span><div><div className="font-display text-lg font-black text-white">Nivel {xpLevel}</div><ProgressBar value={(xpInLevel / xpPerLevel) * 100} barClass="bg-amber-400" height="h-1.5" className="mt-1 w-20" /></div></Stat>
          <Stat><span className="text-xl">🔥</span><div><div className="font-display text-lg font-black text-white">{state.streak.count}</div><div className="text-[11px] font-bold text-indigo-200/60">racha</div></div></Stat>
          <Stat><Hearts lives={state.lives} /></Stat>
        </div>

        {/* HERO: Aprendamos juntos */}
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => go('aprender')} className="mt-4 w-full overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-400 p-5 text-left shadow-xl">
          <div className="flex items-center gap-4">
            <MasteryRing value={learnPct} size={64} stroke={7} color="#ffffff" />
            <div className="flex-1">
              <div className="font-display text-2xl font-black text-white">📖 Aprendamos juntos</div>
              <div className="text-sm font-semibold text-white/85">{game.visitedCount}/{game.totalConcepts} conceptos · seguí tu camino</div>
              <div className="mt-1 text-xs font-bold text-white/80">🟢 {game.greenCount} · 🟡 {game.yellowCount} · 🔴 {game.redCount}</div>
            </div>
            <span className="text-3xl text-white">→</span>
          </div>
        </motion.button>

        {/* Ruta de aprendizaje */}
        <div className="mt-4 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-200/70">Tu ruta para el viernes</div>
          <div className="flex items-center justify-between gap-1 text-center">
            {[['📖', 'Aprendo'], ['🧠', 'Entiendo'], ['🎮', 'Practico'], ['🗣️', 'Explico'], ['📝', 'Evalúo']].map(([e, t], i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <span className="text-xl">{e}</span>
                <span className="text-[11px] font-bold text-indigo-100">{t}</span>
                {i < 4 && <span className="hidden" />}
              </div>
            ))}
          </div>
        </div>

        {/* Herramientas para aprender */}
        <h3 className="mb-2 mt-6 font-display text-lg font-extrabold text-white">Para aprender y entender</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {LEARN_TOOLS.map((m) => (
            <Tool key={m.key} m={m} onClick={() => go(...m.go)} />
          ))}
        </div>

        {/* Lo que no sabés */}
        <motion.button whileTap={{ scale: 0.99 }} onClick={() => go('errores')} className="mt-4 flex w-full items-center justify-between rounded-2xl bg-rose-500/15 p-4 ring-1 ring-rose-400/30">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div className="text-left">
              <div className="font-display font-extrabold text-white">Lo que todavía no sabés</div>
              <div className="text-xs font-semibold text-rose-200/80">{errorList.length ? `${errorList.length} concepto(s) para reforzar` : 'Sin errores pendientes'}</div>
            </div>
          </div>
          <span className="rounded-full bg-rose-500 px-3 py-1 text-sm font-black text-white">{errorList.length}</span>
        </motion.button>

        {/* Practicar (secundario) */}
        <h3 className="mb-2 mt-6 font-display text-lg font-extrabold text-white">Practicá lo aprendido 🎮</h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {PRACTICE.map((m) => (
            <button key={m.key} onClick={() => go(...m.go)} className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/10 transition hover:bg-white/20">
              <div className="text-2xl">{m.emoji}</div>
              <div className="mt-1 text-[11px] font-bold leading-tight text-white">{m.name}</div>
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button onClick={() => go('malaonda')} className="rounded-2xl bg-white/10 p-3 text-center text-sm font-bold text-white ring-1 ring-white/10 hover:bg-white/20">💀 Profe mala onda</button>
          <button onClick={() => go('emergencia')} className="rounded-2xl bg-white/10 p-3 text-center text-sm font-bold text-white ring-1 ring-white/10 hover:bg-white/20">⏱ Repaso de emergencia 10'</button>
        </div>

        {/* EXAMEN (bloqueado hasta aprender) */}
        <ExamCard game={game} go={go} />

        <p className="mt-8 text-center text-xs font-medium text-indigo-200/50">
          Todo sale exclusivamente de tu guía (Módulos 6 a 11). Primero aprender, después evaluar. · {TOTAL_QUESTIONS}+ actividades
        </p>
      </div>
    </div>
  )
}

function ExamCard({ game, go }) {
  const { examUnlocked, examReqs } = game
  const reqs = [
    { ok: examReqs.visited, label: `Recorré los conceptos (${game.visitedCount}/${game.totalConcepts})` },
    { ok: examReqs.story, label: 'Ayudá a TechNova (Historia)' },
    { ok: examReqs.built, label: `Construí 3 respuestas (${game.builtCount}/3)` },
  ]
  if (examUnlocked) {
    return (
      <motion.button initial={{ scale: 0.98 }} animate={{ scale: 1 }} onClick={() => go('examen')} className="mt-6 w-full overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 to-orange-500 p-5 text-left shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-2xl font-black text-white">🔥 Examen del Viernes — ¡Desbloqueado!</div>
            <div className="text-sm font-semibold text-white/85">Ya aprendiste lo suficiente. Probate con el simulacro final.</div>
          </div>
          <span className="text-3xl text-white">→</span>
        </div>
      </motion.button>
    )
  }
  return (
    <div className="mt-6 w-full rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🔒</span>
        <div>
          <div className="font-display text-xl font-black text-white/90">Examen del Viernes</div>
          <div className="text-sm font-semibold text-indigo-200/70">Primero aprendé. Se desbloquea cuando:</div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {reqs.map((r, i) => (
          <div key={i} className={`flex items-center gap-2 text-sm font-bold ${r.ok ? 'text-emerald-300' : 'text-indigo-200/70'}`}>
            <span>{r.ok ? '✅' : '⬜'}</span> {r.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function Stat({ children }) {
  return <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">{children}</div>
}

function Tool({ m, onClick }) {
  return (
    <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={onClick} className={`overflow-hidden rounded-2xl bg-gradient-to-br ${m.grad} p-4 text-left shadow-lg`}>
      <div className="text-3xl">{m.emoji}</div>
      <div className="mt-1 font-display font-extrabold leading-tight text-white">{m.name}</div>
      <div className="text-xs font-semibold text-white/80">{m.desc}</div>
    </motion.button>
  )
}
