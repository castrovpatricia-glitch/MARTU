import { useCallback, useEffect, useRef, useState } from 'react'
import { WORLDS } from '../data'

// ============================================================================
//  Estado del juego persistido en localStorage:
//  XP / nivel, vidas (con regeneración), racha de estudio, % de dominio por
//  mundo, desbloqueo de mundos, registro de errores y repetición espaciada.
// ============================================================================

const KEY = 'rrhh-quest-v1'
export const MAX_LIVES = 5
const LIFE_REGEN_MS = 6 * 60 * 1000 // 1 vida cada 6 minutos
const XP_PER_LEVEL = 120
const UNLOCK_THRESHOLD = 70 // % de dominio para desbloentar el próximo mundo
const PASS_PCT = 0.6 // % para dar un nivel por "completado"

// Intervalos de repetición espaciada por "caja" (en minutos)
const SRS_INTERVALS = [0, 3, 10, 60, 24 * 60, 3 * 24 * 60]

const todayStr = () => new Date().toISOString().slice(0, 10)

function freshState() {
  return {
    version: 1,
    createdAt: Date.now(),
    xp: 0,
    lives: MAX_LIVES,
    livesUpdatedAt: Date.now(),
    streak: { count: 0, lastDay: null, best: 0 },
    mastery: Object.fromEntries(WORLDS.map((w) => [w.id, 0])),
    accuracy: Object.fromEntries(WORLDS.map((w) => [w.id, { correct: 0, total: 0 }])),
    levels: {}, // id -> { completed:bool, best:0..1 }
    unlocked: ['w1'],
    errors: {}, // questionId -> { id, world, count, q, correct, lastWrong, type }
    srs: {}, // questionId -> { box, due }
    stats: { answered: 0, correct: 0 },
    settings: { sound: true },
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return freshState()
    const data = JSON.parse(raw)
    const base = freshState()
    // merge defensivo por si cambió el esquema
    return {
      ...base,
      ...data,
      mastery: { ...base.mastery, ...(data.mastery || {}) },
      accuracy: { ...base.accuracy, ...(data.accuracy || {}) },
      streak: { ...base.streak, ...(data.streak || {}) },
      stats: { ...base.stats, ...(data.stats || {}) },
      settings: { ...base.settings, ...(data.settings || {}) },
      unlocked: data.unlocked?.length ? data.unlocked : base.unlocked,
    }
  } catch {
    return freshState()
  }
}

// Calcula vidas actuales según regeneración temporal
function computeLives(state) {
  if (state.lives >= MAX_LIVES) return { lives: MAX_LIVES, livesUpdatedAt: Date.now() }
  const elapsed = Date.now() - (state.livesUpdatedAt || Date.now())
  const regen = Math.floor(elapsed / LIFE_REGEN_MS)
  if (regen <= 0) return { lives: state.lives, livesUpdatedAt: state.livesUpdatedAt }
  const lives = Math.min(MAX_LIVES, state.lives + regen)
  const leftover = elapsed - regen * LIFE_REGEN_MS
  return { lives, livesUpdatedAt: Date.now() - leftover }
}

export function useGameState() {
  const [state, setState] = useState(() => {
    const s = load()
    const { lives, livesUpdatedAt } = computeLives(s)
    return { ...s, lives, livesUpdatedAt }
  })
  const stateRef = useRef(state)
  stateRef.current = state

  // Persistencia
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* almacenamiento lleno o no disponible */
    }
  }, [state])

  // Tick para regenerar vidas mientras la app está abierta
  useEffect(() => {
    const t = setInterval(() => {
      setState((s) => {
        const { lives, livesUpdatedAt } = computeLives(s)
        if (lives === s.lives) return s
        return { ...s, lives, livesUpdatedAt }
      })
    }, 15000)
    return () => clearInterval(t)
  }, [])

  // --- Racha ---------------------------------------------------------------
  const touchStreak = (s) => {
    const today = todayStr()
    if (s.streak.lastDay === today) return s.streak
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    let count
    if (s.streak.lastDay === yesterday) count = s.streak.count + 1
    else count = 1
    return { count, lastDay: today, best: Math.max(s.streak.best || 0, count) }
  }

  // --- Registrar una respuesta --------------------------------------------
  // meta: { world, correct, xp, questionId, question, correctText, type }
  const recordAnswer = useCallback((meta) => {
    setState((s) => {
      const next = { ...s }
      next.streak = touchStreak(s)
      next.stats = {
        answered: s.stats.answered + 1,
        correct: s.stats.correct + (meta.correct ? 1 : 0),
      }
      next.xp = s.xp + (meta.xp ?? (meta.correct ? 10 : 2))

      // Accuracy + mastery por mundo
      if (meta.world && next.accuracy[meta.world]) {
        const acc = {
          correct: s.accuracy[meta.world].correct + (meta.correct ? 1 : 0),
          total: s.accuracy[meta.world].total + 1,
        }
        next.accuracy = { ...s.accuracy, [meta.world]: acc }
      }

      // Vidas: se pierde 1 al fallar (mínimo 0)
      if (!meta.correct && meta.costLife !== false) {
        const cur = computeLives(s)
        next.lives = Math.max(0, cur.lives - 1)
        next.livesUpdatedAt = cur.lives >= MAX_LIVES ? Date.now() : cur.livesUpdatedAt
      }

      // Repetición espaciada
      if (meta.questionId) {
        const prev = s.srs[meta.questionId] || { box: 0, due: 0 }
        const box = meta.correct ? Math.min(prev.box + 1, SRS_INTERVALS.length - 1) : 1
        const due = Date.now() + SRS_INTERVALS[box] * 60000
        next.srs = { ...s.srs, [meta.questionId]: { box, due } }

        // Errores: registrar o limpiar
        const errs = { ...s.errors }
        if (!meta.correct) {
          const e = errs[meta.questionId] || {
            id: meta.questionId,
            world: meta.world,
            count: 0,
            q: meta.question,
            correct: meta.correctText,
            type: meta.type,
          }
          errs[meta.questionId] = { ...e, count: e.count + 1, lastWrong: Date.now() }
        } else if (errs[meta.questionId]) {
          // Acierto: si ya lo domina (caja alta) lo saca de la lista
          if (box >= 3) delete errs[meta.questionId]
          else errs[meta.questionId] = { ...errs[meta.questionId], lastRight: Date.now() }
        }
        next.errors = errs
      }
      return next
    })
  }, [])

  // --- Completar un nivel del mapa ----------------------------------------
  const completeLevel = useCallback((levelId, worldId, pct) => {
    setState((s) => {
      const next = { ...s }
      next.streak = touchStreak(s)
      const prev = s.levels[levelId] || { completed: false, best: 0 }
      const best = Math.max(prev.best, pct)
      const completed = prev.completed || pct >= PASS_PCT
      next.levels = { ...s.levels, [levelId]: { completed, best } }

      // XP por completar
      next.xp = s.xp + Math.round(pct * 40) + (completed && !prev.completed ? 50 : 0)

      // Recalcular dominio del mundo: promedio del mejor de sus 5 niveles
      const worldLevels = Object.entries(next.levels).filter(([id]) => id.startsWith(worldId + '-L'))
      const sumBest = worldLevels.reduce((a, [, v]) => a + v.best, 0)
      const mastery = Math.round((sumBest / 5) * 100)
      next.mastery = { ...s.mastery, [worldId]: Math.max(s.mastery[worldId] || 0, mastery) }

      // Desbloquear próximo mundo
      const idx = WORLDS.findIndex((w) => w.id === worldId)
      const nextWorld = WORLDS[idx + 1]
      if (nextWorld && next.mastery[worldId] >= UNLOCK_THRESHOLD && !next.unlocked.includes(nextWorld.id)) {
        next.unlocked = [...next.unlocked, nextWorld.id]
      }
      return next
    })
  }, [])

  const addXP = useCallback((amount) => {
    setState((s) => ({ ...s, xp: s.xp + amount, streak: touchStreak(s) }))
  }, [])

  const refillLives = useCallback(() => {
    setState((s) => ({ ...s, lives: MAX_LIVES, livesUpdatedAt: Date.now() }))
  }, [])

  const setSetting = useCallback((key, value) => {
    setState((s) => ({ ...s, settings: { ...s.settings, [key]: value } }))
  }, [])

  const resetAll = useCallback(() => {
    const fresh = freshState()
    setState(fresh)
    try {
      localStorage.setItem(KEY, JSON.stringify(fresh))
    } catch {
      /* noop */
    }
  }, [])

  // --- Derivados -----------------------------------------------------------
  const xpLevel = Math.floor(state.xp / XP_PER_LEVEL) + 1
  const xpInLevel = state.xp % XP_PER_LEVEL
  const xpToNext = XP_PER_LEVEL - xpInLevel
  const overallMastery = Math.round(
    WORLDS.reduce((a, w) => a + (state.mastery[w.id] || 0), 0) / WORLDS.length,
  )
  const isUnlocked = (worldId) => state.unlocked.includes(worldId)
  const errorList = Object.values(state.errors).sort((a, b) => b.count - a.count)
  const dueForReview = () => {
    const now = Date.now()
    return Object.entries(state.srs)
      .filter(([id, v]) => state.errors[id] || v.due <= now)
      .map(([id]) => id)
  }

  return {
    state,
    xpLevel,
    xpInLevel,
    xpToNext,
    xpPerLevel: XP_PER_LEVEL,
    overallMastery,
    isUnlocked,
    errorList,
    dueForReview,
    recordAnswer,
    completeLevel,
    addXP,
    refillLives,
    setSetting,
    resetAll,
    MAX_LIVES,
    UNLOCK_THRESHOLD,
  }
}
