import { useEffect, useState, useCallback } from 'react'
import { useGameState } from './hooks/useGameState'
import { setSoundEnabled } from './utils/sound'
import { WORLDS, getLevels, buildModeQuestions } from './data'

import Home from './components/screens/Home'
import { MapScreen, WorldScreen } from './components/screens/Map'
import Errores from './components/screens/Errores'
import ExplicameFacil from './components/screens/ExplicameFacil'
import Repaso from './components/screens/Repaso'
import Examen from './components/modes/Examen'
import MalaOnda from './components/modes/MalaOnda'
import Session from './components/Session'
import { Btn, TopBar } from './components/ui'
// Aprendizaje (learning-first)
import Aprender from './components/screens/Aprender'
import Lesson from './components/screens/Lesson'
import Confusiones from './components/screens/Confusiones'
import MapaMental from './components/screens/MapaMental'
import RepasoInteligente from './components/screens/RepasoInteligente'
import Construir from './components/modes/Construir'
import Historia from './components/modes/Historia'

const findWorld = (id) => WORLDS.find((w) => w.id === id)

// Qué modos descuentan vidas (los de recall rápido sí; los de escribir no)
const LIVE_MODES = { flash: true, nomelacreo: true, autores: true, comparaciones: false, profesor: false, conectar: false }

const MODE_TITLES = {
  flash: 'Modo Flash ⚡',
  profesor: 'Profesor exigente 👩‍🏫',
  comparaciones: 'Comparaciones ⚔️',
  nomelacreo: 'No me la creo 🚨',
  conectar: 'Conectar ideas 🧠',
  autores: 'Modo Autores 📚',
}
const MODE_GRADS = {
  flash: 'from-sky-700 to-cyan-600',
  profesor: 'from-violet-700 to-purple-600',
  comparaciones: 'from-emerald-700 to-teal-600',
  nomelacreo: 'from-rose-700 to-red-600',
  conectar: 'from-indigo-700 to-blue-600',
  autores: 'from-amber-600 to-orange-500',
}

export default function App() {
  const game = useGameState()
  const [view, setView] = useState({ screen: 'home', params: {} })

  // Sonido según preferencia guardada
  useEffect(() => {
    setSoundEnabled(game.state.settings?.sound !== false)
  }, [game.state.settings?.sound])

  const go = useCallback((screen, params = {}) => {
    setView({ screen, params })
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [])

  const { screen, params } = view

  switch (screen) {
    case 'home':
      return <Home game={game} go={go} />

    case 'map':
      return <MapScreen game={game} go={go} />

    case 'world':
      return <WorldScreen game={game} worldId={params.worldId} go={go} />

    case 'level': {
      const world = findWorld(params.worldId)
      const level = getLevels(params.worldId)[params.levelIndex]
      return (
        <Session
          key={level.id}
          title={`${world.title} · ${level.title}`}
          questions={level.questions}
          game={game}
          consumeLives
          accentGradient={`${gradFor(world)} `}
          onExit={() => go('world', { worldId: params.worldId })}
          onFinish={(rep) => game.completeLevel(level.id, params.worldId, rep.pct)}
        />
      )
    }

    case 'play': {
      const { mode, worldId } = params
      const questions = buildModeQuestions(mode, worldId)
      return (
        <Session
          key={mode + (worldId || '')}
          title={MODE_TITLES[mode] || 'Práctica'}
          questions={questions}
          game={game}
          consumeLives={LIVE_MODES[mode] ?? false}
          accentGradient={MODE_GRADS[mode] || 'from-brand-700 to-brand-500'}
          onExit={() => go(worldId ? 'world' : 'home', worldId ? { worldId } : undefined)}
        />
      )
    }

    case 'aprender':
      return <Aprender game={game} go={go} />

    case 'lesson':
      return <Lesson conceptId={params.conceptId} game={game} go={go} />

    case 'construir':
      return <Construir game={game} go={go} worldId={params.worldId} />

    case 'confusiones':
      return <Confusiones game={game} go={go} />

    case 'historia':
      return <Historia game={game} go={go} />

    case 'mapa':
      return <MapaMental game={game} go={go} />

    case 'examen':
      if (!game.examUnlocked) return <Home game={game} go={go} />
      return <Examen game={game} go={go} />

    case 'malaonda':
      return <MalaOnda game={game} go={go} />

    case 'errores':
      return <Errores game={game} go={go} />

    case 'facil':
      return <ExplicameFacil game={game} go={go} worldId={params.worldId} />

    case 'repaso':
      return <RepasoInteligente game={game} go={go} />

    case 'emergencia':
      return <Repaso game={game} go={go} />

    case 'ajustes':
      return <Ajustes game={game} go={go} />

    default:
      return <Home game={game} go={go} />
  }
}

// Session usa `bg-gradient-to-b ${accentGradient}`: devolvemos solo el from/to
const WORLD_GRAD = {
  w1: 'from-sky-700 to-cyan-600',
  w2: 'from-emerald-700 to-teal-600',
  w3: 'from-violet-700 to-purple-600',
  w4: 'from-amber-600 to-orange-500',
  w5: 'from-rose-700 to-red-600',
  w6: 'from-fuchsia-700 to-pink-600',
}
function gradFor(world) {
  return WORLD_GRAD[world.id] || 'from-brand-700 to-brand-500'
}

// --------------------------- Ajustes ---------------------------------------
function Ajustes({ game, go }) {
  const sound = game.state.settings?.sound !== false
  const [confirm, setConfirm] = useState(false)

  const toggleSound = () => {
    const next = !sound
    setSoundEnabled(next)
    game.setSetting('sound', next)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pb-20">
      <TopBar game={game} onClose={() => go('home')} title="Ajustes" />
      <div className="mx-auto max-w-md px-4">
        <div className="card divide-y divide-slate-100">
          <Row label="🔊 Sonidos" >
            <Toggle on={sound} onClick={toggleSound} />
          </Row>
          <Row label="📊 Tu progreso">
            <span className="text-sm font-bold text-slate-500">
              Nivel {game.xpLevel} · {game.overallMastery}% dominio
            </span>
          </Row>
          <Row label="🔥 Racha">
            <span className="text-sm font-bold text-slate-500">{game.state.streak.count} días (mejor {game.state.streak.best || 0})</span>
          </Row>
        </div>

        <div className="mt-4 card p-4">
          <div className="font-display font-extrabold text-slate-800">Reiniciar progreso</div>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Borra XP, vidas, racha, dominio y errores guardados. No se puede deshacer.
          </p>
          {!confirm ? (
            <Btn color="red" className="mt-3" onClick={() => setConfirm(true)}>
              Reiniciar todo
            </Btn>
          ) : (
            <div className="mt-3 flex gap-2">
              <Btn color="red" onClick={() => { game.resetAll(); go('home') }}>
                Sí, borrar
              </Btn>
              <button onClick={() => setConfirm(false)} className="px-4 font-bold text-slate-500">
                Cancelar
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs font-medium text-slate-500">
          RRHH Quest · Todo el contenido proviene exclusivamente de tu guía de estudio (Módulos 6 a 11).
          Sin teoría externa. Hecho para tu oral del viernes. 💪
        </p>
      </div>
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between p-4">
      <span className="font-bold text-slate-700">{label}</span>
      {children}
    </div>
  )
}

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative h-7 w-12 rounded-full transition-colors ${on ? 'bg-emerald-500' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${on ? 'left-[1.4rem]' : 'left-0.5'}`} />
    </button>
  )
}
