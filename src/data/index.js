// ============================================================================
//  Índice de contenido — compone los niveles del mapa y expone helpers.
// ============================================================================
import { WORLDS, INTEGRACION, AUTORES, getWorld, getConcept } from './worlds'
import { FLASH } from './flash'
import { OPEN } from './open'
import { COMPARISONS } from './comparisons'
import { CLAIMS } from './claims'
import { CONNECT, MALAONDA } from './connect'
import { AUTHOR_ITEMS, AUTHOR_NAMES } from './authors'
import { EMERGENCY } from './emergency'
import { LESSONS, getLesson } from './lessons'
import { STORY } from './story'

export {
  WORLDS,
  INTEGRACION,
  AUTORES,
  FLASH,
  OPEN,
  COMPARISONS,
  CLAIMS,
  CONNECT,
  MALAONDA,
  AUTHOR_ITEMS,
  AUTHOR_NAMES,
  EMERGENCY,
  LESSONS,
  STORY,
  getLesson,
  getWorld,
  getConcept,
}

// ----- Conceptos "completos" (concepto + lección) y orden de aprendizaje ----
export const CONCEPTS_FLAT = WORLDS.flatMap((w, wi) =>
  w.concepts.map((c, ci) => ({
    ...c,
    lesson: getLesson(c.id),
    world: w,
    worldIndex: wi,
    indexInWorld: ci,
  })),
)
const CONCEPT_BY_ID = Object.fromEntries(CONCEPTS_FLAT.map((c) => [c.id, c]))
export const getConceptFull = (id) => CONCEPT_BY_ID[id]
export const conceptsOfWorld = (worldId) => CONCEPTS_FLAT.filter((c) => c.world.id === worldId)

// Pregunta abierta sugerida para "Construí tu respuesta" según el mundo
export const openForWorld = (worldId) => OPEN.filter((q) => q.world === worldId)

// ----- Helpers por mundo ----------------------------------------------------
export const flashByWorld = (w) => FLASH.filter((q) => q.world === w)
export const openByWorld = (w) => OPEN.filter((q) => q.world === w)
export const comparisonsByWorld = (w) => COMPARISONS.filter((q) => q.world === w)
export const claimsByWorld = (w) => CLAIMS.filter((q) => q.world === w)

// Normaliza una comparación a "pregunta" jugable
const compareToQuestion = (c) => ({ ...c, type: 'compare' })
const claimToQuestion = (c) => ({ ...c, type: 'claim' })

// ----- Niveles del mapa (5 por mundo) --------------------------------------
//  1 Conceptos básicos · 2 Diferencias · 3 Aplicación · 4 Difíciles · 5 Oral
export const LEVEL_META = [
  { n: 1, title: 'Conceptos básicos', icon: '🌱', sub: 'Definiciones esenciales' },
  { n: 2, title: 'Diferencias', icon: '⚖️', sub: 'Distinguí conceptos similares' },
  { n: 3, title: 'Aplicación', icon: '🛠️', sub: 'Ejemplos y casos' },
  { n: 4, title: 'Preguntas difíciles', icon: '🔥', sub: 'Trampas y orden de procesos' },
  { n: 5, title: 'Oral del profesor', icon: '🎓', sub: 'Respondé con tus palabras' },
]

export function getLevels(worldId) {
  const flash = flashByWorld(worldId)
  const l1 = flash.filter((q) => q.level === 1)
  const l3 = flash.filter((q) => q.level === 3)
  const l4 = flash.filter((q) => q.level === 4)
  const comps = comparisonsByWorld(worldId).map(compareToQuestion)
  const claims = claimsByWorld(worldId).map(claimToQuestion)
  const opens = openByWorld(worldId)

  const levels = [
    { ...LEVEL_META[0], questions: l1 },
    { ...LEVEL_META[1], questions: comps.length ? comps : l1.slice(0, 2) },
    { ...LEVEL_META[2], questions: l3.length ? l3 : flash.slice(0, 2) },
    { ...LEVEL_META[3], questions: [...l4, ...claims] },
    { ...LEVEL_META[4], questions: opens },
  ]
  return levels.map((lvl, i) => ({
    ...lvl,
    id: `${worldId}-L${i + 1}`,
    worldId,
    // Garantiza que ningún nivel quede vacío
    questions: lvl.questions.length ? lvl.questions : flash.slice(0, 3),
  }))
}

// ----- Examen Viernes: 15 preguntas mezcladas, dificultad creciente ---------
export function buildExam() {
  const pick = (arr, n) => shuffle(arr).slice(0, n)
  const easy = pick(FLASH.filter((q) => q.level === 1), 4)
  const compare = pick(COMPARISONS.map(compareToQuestion), 2)
  const apply = pick(FLASH.filter((q) => q.level === 3), 3)
  const hard = pick(FLASH.filter((q) => q.level === 4), 2)
  const claims = pick(CLAIMS.map(claimToQuestion), 2)
  const open = pick(OPEN, 1)
  const connect = pick(CONNECT, 1)
  // Orden por dificultad creciente
  return [...easy, ...compare, ...apply, ...claims, ...hard, ...open, ...connect].slice(0, 15)
}

// ----- Util -----------------------------------------------------------------
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ----- Modo Autores: cada concepto se vuelve una pregunta de opción múltiple -
export const AUTHOR_MC = AUTHOR_ITEMS.map((it) => ({
  id: it.id,
  world: it.world,
  type: 'mc',
  q: `¿Qué autor corresponde a este aporte?  «${it.concept}»`,
  options: AUTHOR_NAMES,
  answer: AUTHOR_NAMES.indexOf(it.author),
  explain: `${it.author} → ${it.concept}.`,
}))

// ----- Índice global de preguntas (para reconstruir errores y repaso) -------
const COMPARE_Q = COMPARISONS.map((c) => ({ ...c, type: 'compare' }))
const CLAIM_Q = CLAIMS.map((c) => ({ ...c, type: 'claim' }))
const MALAONDA_Q = MALAONDA.map((m) => ({ ...m, type: 'open' }))

export const ALL_QUESTIONS = [
  ...FLASH,
  ...OPEN,
  ...COMPARE_Q,
  ...CLAIM_Q,
  ...CONNECT,
  ...MALAONDA_Q,
  ...AUTHOR_MC,
]
const Q_BY_ID = Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, q]))
export const getQuestionById = (id) => Q_BY_ID[id]

// ----- Construye la lista de preguntas de un modo (opcional: por mundo) ------
export function buildModeQuestions(mode, worldId) {
  const byWorld = (arr) => (worldId ? arr.filter((q) => q.world === worldId) : arr)
  switch (mode) {
    case 'flash':
      return shuffle(byWorld(FLASH))
    case 'profesor':
      return shuffle(byWorld(OPEN))
    case 'comparaciones':
      return shuffle(byWorld(COMPARE_Q))
    case 'nomelacreo':
      return shuffle(byWorld(CLAIM_Q))
    case 'conectar':
      return shuffle(CONNECT) // integradoras: siempre todas
    case 'autores':
      return shuffle(byWorld(AUTHOR_MC))
    default:
      return []
  }
}

// Conteos para estadísticas
export const TOTAL_CONCEPTS = WORLDS.reduce((acc, w) => acc + w.concepts.length, 0)
export const TOTAL_QUESTIONS =
  FLASH.length + OPEN.length + COMPARISONS.length + CLAIMS.length + CONNECT.length + AUTHOR_MC.length

// Mapa worldId -> world (para mostrar de qué mundo es un error/pregunta)
export const WORLD_BY_ID = Object.fromEntries(WORLDS.map((w) => [w.id, w]))
