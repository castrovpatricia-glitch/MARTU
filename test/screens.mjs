// Smoke-test de render para TODOS los componentes interactivos.
// Stubs mínimos de browser para que los imports (canvas-confetti) no rompan en Node.
globalThis.window = globalThis.window || { matchMedia: () => ({ matches: false, addListener() {}, removeListener() {} }), scrollTo() {} }
globalThis.document = globalThis.document || { createElement: () => ({ getContext: () => ({}), style: {} }), documentElement: { style: {} }, body: {} }
globalThis.navigator = globalThis.navigator || { userAgent: 'node' }

import { renderToString } from 'react-dom/server'
import { jsx } from 'react/jsx-runtime'

import QuestionRunner from '../src/components/QuestionRunner.jsx'
import Session from '../src/components/Session.jsx'
import Home from '../src/components/screens/Home.jsx'
import { MapScreen, WorldScreen } from '../src/components/screens/Map.jsx'
import Errores from '../src/components/screens/Errores.jsx'
import ExplicameFacil from '../src/components/screens/ExplicameFacil.jsx'
import Repaso from '../src/components/screens/Repaso.jsx'
import Examen from '../src/components/modes/Examen.jsx'
import MalaOnda from '../src/components/modes/MalaOnda.jsx'

import { ALL_QUESTIONS, getLevels, buildExam } from '../src/data/index.js'

let fails = 0
const test = (name, fn) => {
  try {
    const html = fn()
    if (typeof html !== 'string' || html.length < 10) throw new Error('render vacío')
    console.log('  ✓', name)
  } catch (e) {
    console.error('  ✗', name, '→', e.message)
    fails++
  }
}

// --- Mock del estado del juego ---------------------------------------------
const mockGame = {
  state: {
    xp: 250, lives: 4,
    streak: { count: 3, best: 5, lastDay: '2026-06-02' },
    mastery: { w1: 80, w2: 40, w3: 0, w4: 0, w5: 0, w6: 0 },
    accuracy: {}, levels: { 'w1-L1': { completed: true, best: 0.9 } },
    unlocked: ['w1', 'w2'], errors: {}, srs: {}, settings: { sound: true },
  },
  xpLevel: 3, xpInLevel: 10, xpToNext: 110, xpPerLevel: 120, overallMastery: 33,
  isUnlocked: (id) => ['w1', 'w2'].includes(id),
  errorList: [{ id: 'f1_5', world: 'w1', count: 2, q: 'Pregunta fallada', correct: 'Respuesta correcta' }],
  dueForReview: () => [],
  recordAnswer() {}, completeLevel() {}, addXP() {}, refillLives() {}, setSetting() {}, resetAll() {},
  MAX_LIVES: 5, UNLOCK_THRESHOLD: 70,
}
const go = () => {}

console.log('— QuestionRunner: un caso de cada tipo —')
const byType = {}
for (const q of ALL_QUESTIONS) if (!byType[q.type]) byType[q.type] = q
for (const [type, q] of Object.entries(byType)) {
  test(`tipo "${type}" (${q.id})`, () => renderToString(jsx(QuestionRunner, { question: q, onResult: () => {} })))
}

console.log('— Session con preguntas mixtas —')
test('Session', () =>
  renderToString(jsx(Session, { title: 'Test', questions: buildExam(), game: mockGame, onExit: () => {} })))

console.log('— Pantallas principales —')
test('Home', () => renderToString(jsx(Home, { game: mockGame, go })))
test('MapScreen', () => renderToString(jsx(MapScreen, { game: mockGame, go })))
test('WorldScreen', () => renderToString(jsx(WorldScreen, { game: mockGame, worldId: 'w1', go })))
test('Errores (lista)', () => renderToString(jsx(Errores, { game: mockGame, go })))
test('ExplicameFacil', () => renderToString(jsx(ExplicameFacil, { game: mockGame, go })))
test('Repaso', () => renderToString(jsx(Repaso, { game: mockGame, go })))
test('Examen', () => renderToString(jsx(Examen, { game: mockGame, go })))
test('MalaOnda', () => renderToString(jsx(MalaOnda, { game: mockGame, go })))

console.log('— Niveles del mapa (Session con cada nivel) —')
for (const wid of ['w1', 'w2', 'w3', 'w4', 'w5', 'w6']) {
  const levels = getLevels(wid)
  levels.forEach((lvl, i) =>
    test(`${wid} nivel ${i + 1} (${lvl.title})`, () =>
      renderToString(jsx(Session, { title: lvl.title, questions: lvl.questions, game: mockGame, onExit: () => {} }))),
  )
}

console.log('')
if (fails === 0) console.log('✅ TODOS los componentes renderizan sin errores.')
else { console.log(`❌ ${fails} componentes fallaron al renderizar.`); process.exit(1) }
