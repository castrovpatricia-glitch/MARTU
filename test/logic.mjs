import {
  WORLDS,
  getLevels,
  buildExam,
  buildModeQuestions,
  ALL_QUESTIONS,
  getQuestionById,
  TOTAL_QUESTIONS,
  AUTHOR_MC,
  CONCEPTS_FLAT,
  STORY,
  COMPARISONS,
  getConceptFull,
} from '../src/data/index.js'
import { evaluateOpen, normalize } from '../src/utils/evaluator.js'

let fails = 0
const ok = (cond, msg) => {
  if (!cond) {
    console.error('  ✗ FAIL:', msg)
    fails++
  }
}

console.log('— Validando estructura de preguntas —')
const ids = new Set()
for (const q of ALL_QUESTIONS) {
  ok(q.id, `pregunta sin id: ${JSON.stringify(q).slice(0, 60)}`)
  ok(!ids.has(q.id), `id duplicado: ${q.id}`)
  ids.add(q.id)
  ok(q.type, `pregunta ${q.id} sin type`)
  if (q.type === 'mc' || q.type === 'complete') {
    ok(Array.isArray(q.options) && q.options.length >= 2, `${q.id}: options inválidas`)
    ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, `${q.id}: answer fuera de rango`)
  }
  if (q.type === 'tf') ok(typeof q.answer === 'boolean', `${q.id}: tf answer no booleano`)
  if (q.type === 'claim') ok(typeof q.correct === 'boolean', `${q.id}: claim correct no booleano`)
  if (q.type === 'order') ok(Array.isArray(q.items) && q.items.length >= 2, `${q.id}: order items inválidos`)
  if (q.type === 'match') ok(Array.isArray(q.pairs) && q.pairs.every((p) => p.length === 2), `${q.id}: match pairs inválidos`)
  if (q.type === 'open' || q.type === 'compare') {
    ok(Array.isArray(q.keyConcepts) && q.keyConcepts.length > 0, `${q.id}: sin keyConcepts`)
    for (const c of q.keyConcepts) ok(Array.isArray(c.keywords) && c.keywords.length > 0, `${q.id}: keyConcept sin keywords (${c.label})`)
  }
}
console.log(`  ${ALL_QUESTIONS.length} preguntas, TOTAL_QUESTIONS=${TOTAL_QUESTIONS}, AUTHOR_MC=${AUTHOR_MC.length}`)

console.log('— Validando niveles del mapa (5 por mundo, ninguno vacío) —')
for (const w of WORLDS) {
  const levels = getLevels(w.id)
  ok(levels.length === 5, `${w.id}: deberían ser 5 niveles, hay ${levels.length}`)
  levels.forEach((lvl, i) => ok(lvl.questions.length > 0, `${w.id} nivel ${i + 1} vacío`))
  ok(w.concepts.length > 0, `${w.id} sin conceptos`)
}

console.log('— Validando buildExam —')
const exam = buildExam()
ok(exam.length > 0 && exam.length <= 15, `examen tiene ${exam.length} preguntas`)
ok(exam.every((q) => q && q.type), 'examen tiene preguntas inválidas')

console.log('— Validando buildModeQuestions —')
for (const m of ['flash', 'profesor', 'comparaciones', 'nomelacreo', 'conectar', 'autores']) {
  const qs = buildModeQuestions(m)
  ok(Array.isArray(qs) && qs.length > 0, `modo ${m} sin preguntas`)
}
ok(buildModeQuestions('flash', 'w1').every((q) => q.world === 'w1'), 'filtro por mundo falla')

console.log('— Validando getQuestionById —')
ok(getQuestionById('o1_1')?.id === 'o1_1', 'getQuestionById open falla')
ok(getQuestionById('au_1')?.type === 'mc', 'getQuestionById autor->mc falla')

console.log('— Validando el evaluador (Profesor exigente) —')
const sample = getQuestionById('o1_1') // imperativo estratégico
const good = evaluateOpen(sample.model + ' Esto da ventaja competitiva y se alinea con la estrategia del negocio.', sample)
const empty = evaluateOpen('', sample)
const weak = evaluateOpen('No sé bien, algo de buscar gente.', sample)
console.log(`  modelo→${good.score}/10  vacío→${empty.score}/10  flojo→${weak.score}/10`)
ok(good.score >= 9, `respuesta modelo debería dar >=9, dio ${good.score}`)
ok(empty.score === 0, `respuesta vacía debería dar 0, dio ${empty.score}`)
ok(weak.score < good.score, 'flojo debería puntuar menos que modelo')
ok(good.covered.length > 0 && empty.missing.length > 0, 'covered/missing mal calculados')

// normalize quita tildes
ok(normalize('Capacitación Estratégica') === 'capacitacion estrategica', 'normalize falla')

console.log('— Validando contenido de enseñanza (lecciones por capas) —')
for (const c of CONCEPTS_FLAT) {
  ok(c.lesson, `concepto ${c.id} sin lección`)
  ok(Array.isArray(c.lesson?.layers) && c.lesson.layers.length >= 2, `${c.id}: faltan capas`)
  ok(typeof c.lesson?.analogy === 'string' && c.lesson.analogy.length > 5, `${c.id}: sin analogía`)
  ok(Array.isArray(c.lesson?.connections) && c.lesson.connections.length > 0, `${c.id}: sin conexiones`)
  ok(c.simple && c.definition && c.example, `${c.id}: falta simple/definición/ejemplo`)
}
ok(getConceptFull('c10_psicologico')?.term?.includes('psicológico'), 'getConceptFull falla')
console.log(`  ${CONCEPTS_FLAT.length} conceptos con lección completa`)

console.log('— Validando comparaciones (Confusiones) —')
for (const c of COMPARISONS) {
  ok(c.whyConfused && c.difference && c.example, `${c.id}: falta whyConfused/difference/example`)
  ok(c.left?.name && c.right?.name, `${c.id}: faltan lados`)
}

console.log('— Validando Historia TechNova —')
ok(STORY.chapters.length >= 8, 'pocas escenas en la historia')
const cids = new Set(CONCEPTS_FLAT.map((c) => c.id))
for (const ch of STORY.chapters) {
  ok(Array.isArray(ch.options) && ch.options.length >= 2, `${ch.id}: opciones inválidas`)
  ok(Number.isInteger(ch.answer) && ch.answer >= 0 && ch.answer < ch.options.length, `${ch.id}: answer fuera de rango`)
  ok(Array.isArray(ch.teaches) && ch.teaches.every((t) => cids.has(t)), `${ch.id}: enseña conceptos inexistentes`)
  ok(ch.lesson && ch.lesson.length > 20, `${ch.id}: sin texto de enseñanza`)
}
console.log(`  ${STORY.chapters.length} capítulos válidos`)

console.log('')
if (fails === 0) console.log('✅ TODO OK — la lógica y los datos están sanos.')
else {
  console.log(`❌ ${fails} fallos.`)
  process.exit(1)
}
