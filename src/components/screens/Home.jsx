import { motion } from 'framer-motion'
import { ProgressBar, Hearts, MasteryRing } from '../ui'
import { WORLDS, TOTAL_QUESTIONS } from '../../data'

const MODES = [
  { key: 'flash', emoji: '⚡', name: 'Flash', desc: 'Preguntas rápidas', grad: 'from-sky-500 to-cyan-400' },
  { key: 'profesor', emoji: '👩‍🏫', name: 'Profesor exigente', desc: 'Abiertas con nota /10', grad: 'from-violet-500 to-purple-400' },
  { key: 'comparaciones', emoji: '⚔️', name: 'Comparaciones', desc: 'Diferencias del oral', grad: 'from-emerald-500 to-teal-400' },
  { key: 'nomelacreo', emoji: '🚨', name: 'No me la creo', desc: '¿Correcto o incorrecto?', grad: 'from-rose-500 to-red-400' },
  { key: 'conectar', emoji: '🧠', name: 'Conectar ideas', desc: 'Integrar módulos', grad: 'from-indigo-500 to-blue-400' },
  { key: 'autores', emoji: '📚', name: 'Autores', desc: 'Autor → concepto', grad: 'from-amber-500 to-orange-400' },
]

const EXTRAS = [
  { key: 'facil', emoji: '🧒', name: 'Explicámelo fácil' },
  { key: 'repaso', emoji: '⏱', name: 'Repaso 10 min' },
  { key: 'malaonda', emoji: '💀', name: 'Profe mala onda' },
]

function daysToFriday() {
  const now = new Date()
  const day = now.getDay() // 0 dom … 5 vie
  let diff = (5 - day + 7) % 7
  return diff // 0 si hoy es viernes
}

export default function Home({ game, go }) {
  const { state, xpLevel, xpInLevel, xpPerLevel, overallMastery, errorList } = game
  const dleft = daysToFriday()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 pb-24">
      {/* Header */}
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-3xl font-black text-white">RRHH Quest 🎓</div>
            <div className="text-sm font-semibold text-indigo-200/80">Tu juego para sacarte un 10 en el oral</div>
          </div>
          <button
            onClick={() => go('ajustes')}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-lg text-white hover:bg-white/20"
            aria-label="Ajustes"
          >
            ⚙️
          </button>
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 p-3 ring-1 ring-white/10"
        >
          <span className="text-2xl">⏳</span>
          <div className="text-sm font-bold text-white">
            {dleft === 0 ? '¡Hoy es el oral! Repaso final 🔥' : `Faltan ${dleft} día${dleft > 1 ? 's' : ''} para el oral del viernes`}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-display text-xl font-black text-white">Nivel {xpLevel}</div>
                <div className="text-[11px] font-bold text-indigo-200/70">{state.xp} XP</div>
              </div>
            </div>
            <ProgressBar className="mt-2" value={(xpInLevel / xpPerLevel) * 100} barClass="bg-amber-400" height="h-2" />
          </StatCard>

          <StatCard>
            <div className="text-[11px] font-bold uppercase text-indigo-200/70">Racha</div>
            <div className="font-display text-2xl font-black text-white">🔥 {state.streak.count}</div>
            <div className="text-[11px] font-semibold text-indigo-200/60">Mejor: {state.streak.best || 0} días</div>
          </StatCard>

          <StatCard>
            <div className="text-[11px] font-bold uppercase text-indigo-200/70">Vidas</div>
            <div className="mt-1">
              <Hearts lives={state.lives} />
            </div>
            <div className="text-[11px] font-semibold text-indigo-200/60">se recuperan solas</div>
          </StatCard>

          <StatCard>
            <div className="flex items-center gap-2">
              <MasteryRing value={overallMastery} size={48} stroke={6} color="#34d399" />
              <div>
                <div className="text-[11px] font-bold uppercase text-indigo-200/70">Dominio</div>
                <div className="text-[11px] font-semibold text-indigo-200/60">general</div>
              </div>
            </div>
          </StatCard>
        </div>

        {/* CTA principal: mapa */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => go('map')}
          className="mt-4 w-full overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-500 p-5 text-left shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-xl font-black text-white">🗺️ Mapa de aprendizaje</div>
              <div className="text-sm font-semibold text-white/80">6 mundos · niveles desbloqueables · seguí tu camino</div>
            </div>
            <span className="text-3xl">→</span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {WORLDS.map((w) => (
              <div key={w.id} className="flex-1">
                <div className="text-center text-lg">{game.isUnlocked(w.id) ? w.emoji : '🔒'}</div>
                <ProgressBar value={state.mastery[w.id] || 0} barClass="bg-white" height="h-1.5" />
              </div>
            ))}
          </div>
        </motion.button>

        {/* Lo que no sabés */}
        <motion.button
          whileTap={{ scale: 0.99 }}
          onClick={() => go('errores')}
          className="mt-3 flex w-full items-center justify-between rounded-2xl bg-rose-500/15 p-4 ring-1 ring-rose-400/30"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div className="text-left">
              <div className="font-display font-extrabold text-white">Lo que todavía no sabés</div>
              <div className="text-xs font-semibold text-rose-200/80">
                {errorList.length ? `${errorList.length} concepto(s) para reforzar` : 'Sin errores pendientes ¡genial!'}
              </div>
            </div>
          </div>
          <span className="rounded-full bg-rose-500 px-3 py-1 text-sm font-black text-white">{errorList.length}</span>
        </motion.button>

        {/* Modos de juego */}
        <h3 className="mb-2 mt-6 font-display text-lg font-extrabold text-white">Modos de juego</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MODES.map((m) => (
            <ModeCard key={m.key} m={m} onClick={() => go('play', { mode: m.key })} />
          ))}
          <ModeCard
            m={{ emoji: '🔥', name: 'Examen viernes', desc: 'Simulacro /10', grad: 'from-rose-600 to-orange-500' }}
            onClick={() => go('examen')}
            big
          />
        </div>

        {/* Extras */}
        <h3 className="mb-2 mt-6 font-display text-lg font-extrabold text-white">Botones de emergencia</h3>
        <div className="grid grid-cols-3 gap-3">
          {EXTRAS.map((e) => (
            <button
              key={e.key}
              onClick={() => go(e.key)}
              className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/10 transition-all hover:bg-white/20"
            >
              <div className="text-2xl">{e.emoji}</div>
              <div className="mt-1 text-xs font-bold text-white">{e.name}</div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs font-medium text-indigo-200/50">
          Todo el contenido sale exclusivamente de tu guía de estudio (Módulos 6 a 11) · {TOTAL_QUESTIONS}+ preguntas
        </p>
      </div>
    </div>
  )
}

function StatCard({ children }) {
  return <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">{children}</div>
}

function ModeCard({ m, onClick, big }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`overflow-hidden rounded-2xl bg-gradient-to-br ${m.grad} p-4 text-left shadow-lg ${big ? 'col-span-2 sm:col-span-1' : ''}`}
    >
      <div className="text-3xl">{m.emoji}</div>
      <div className="mt-1 font-display font-extrabold leading-tight text-white">{m.name}</div>
      <div className="text-xs font-semibold text-white/80">{m.desc}</div>
    </motion.button>
  )
}
