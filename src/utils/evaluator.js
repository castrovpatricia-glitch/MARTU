// ============================================================================
//  Evaluador de respuestas abiertas (100% offline, basado en la guía).
//  Detecta qué conceptos clave mencionó el alumno y cuáles le faltaron,
//  premia la conexión con la estrategia (lo que diferencia un 7 de un 10)
//  y devuelve una corrección tipo profesor.
// ============================================================================

export function normalize(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // saca tildes
    .replace(/[^a-z0-9ñ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function conceptHit(normAnswer, concept) {
  return concept.keywords.some((kw) => normAnswer.includes(normalize(kw)))
}

function anyKeyword(normAnswer, keywords = []) {
  return keywords.some((kw) => normAnswer.includes(normalize(kw)))
}

// question: { keyConcepts:[{label,keywords,weight}], strategyKeywords?, strategy?, model, example }
export function evaluateOpen(answer, question) {
  const norm = normalize(answer)
  const words = norm ? norm.split(' ').filter(Boolean).length : 0
  const concepts = question.keyConcepts || []
  const totalWeight = concepts.reduce((a, c) => a + (c.weight || 1), 0) || 1

  const results = concepts.map((c) => ({
    label: c.label,
    weight: c.weight || 1,
    hit: norm.length > 0 && conceptHit(norm, c),
  }))

  const matchedWeight = results.filter((r) => r.hit).reduce((a, r) => a + r.weight, 0)
  const base = matchedWeight / totalWeight // 0..1

  const hasStrategy = Array.isArray(question.strategyKeywords) && question.strategyKeywords.length > 0
  const strategyHit = hasStrategy && anyKeyword(norm, question.strategyKeywords)
  const gaveExample = anyKeyword(norm, ['ejemplo', 'por ejemplo', 'como cuando'])

  // Puntaje
  let score
  if (hasStrategy) {
    score = base * 8 + (strategyHit ? 2 : 0)
  } else {
    score = base * 10
  }
  // Castigo por respuesta vacía o demasiado corta sin conceptos
  if (words < 4 && matchedWeight === 0) score = 0
  score = Math.max(0, Math.min(10, Math.round(score)))

  const covered = results.filter((r) => r.hit).map((r) => r.label)
  const missing = results.filter((r) => !r.hit).map((r) => r.label)

  // Construye la devolución estilo profesor
  let verdict
  if (score >= 9) verdict = '¡Excelente! Respuesta de oral redondo. 🏆'
  else if (score >= 7) verdict = 'Muy bien, aprobás con comodidad. Pulamos para el 10. 💪'
  else if (score >= 5) verdict = 'Vas por buen camino, pero falta sustancia. 📌'
  else if (score > 0) verdict = 'Flojo: te faltan los conceptos centrales. A repasar. 📖'
  else verdict = 'Casi en blanco. Mirá la respuesta modelo y volvé a intentar. 📖'

  const toImprove = [...missing]
  if (hasStrategy && !strategyHit) {
    toImprove.push('Conectar con la ESTRATEGIA del negocio (' + (question.strategy ? 'ver pista' : '') + ')')
  }

  return {
    score,
    words,
    results,
    covered,
    missing,
    strategyHit,
    hasStrategy,
    gaveExample,
    verdict,
    toImprove,
    model: question.model,
    example: question.example,
    strategy: question.strategy,
  }
}

// Decide si un puntaje "domina" el concepto (para la repetición espaciada)
export const isMastered = (score) => score >= 8
