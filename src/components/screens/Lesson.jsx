import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Btn, Card, ProgressBar, Pill, TopBar } from '../ui'
import ProfesorAlLado from '../ProfesorAlLado'
import { getConceptFull, CONCEPTS_FLAT, conceptsOfWorld } from '../../data'
import { sfx } from '../../utils/sound'

const LAYER_TITLES = [
  { t: 'Capa 1 · Entendé la idea', icon: '🌱' },
  { t: 'Capa 2 · Sumemos palabras profesionales', icon: '📘' },
  { t: 'Capa 3 · Hablalo como alguien de RRHH', icon: '🎓' },
]

const STATE_OPTS = [
  { key: 'red', emoji: '🔴', label: 'Todavía no lo entiendo' },
  { key: 'yellow', emoji: '🟡', label: 'Lo entiendo, pero no podría explicarlo' },
  { key: 'green', emoji: '🟢', label: 'Lo puedo explicar en un oral' },
]

export default function Lesson({ conceptId, game, go }) {
  const concept = getConceptFull(conceptId)
  const L = concept?.lesson || {}
  const [layer, setLayer] = useState(0)
  const [phase, setPhase] = useState('layers') // 'layers' | 'detail'
  const [showAnalogy, setShowAnalogy] = useState(false)

  useEffect(() => {
    if (concept) game.markVisited(concept.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conceptId])

  const { idx, next, posInWorld, totalInWorld } = useMemo(() => {
    const i = CONCEPTS_FLAT.findIndex((c) => c.id === conceptId)
    const wlist = conceptsOfWorld(concept.world.id)
    return {
      idx: i,
      next: CONCEPTS_FLAT[i + 1],
      posInWorld: wlist.findIndex((c) => c.id === conceptId) + 1,
      totalInWorld: wlist.length,
    }
  }, [conceptId, concept])

  if (!concept) return null
  const layers = L.layers || [concept.simple, concept.definition]
  const curState = game.conceptState(concept.id)

  const advanceLayer = () => {
    sfx.tap()
    if (layer + 1 < layers.length) setLayer(layer + 1)
    else setPhase('detail')
  }

  const pickState = (key) => {
    game.setConceptState(concept.id, key)
    if (key === 'green') {
      sfx.win()
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } })
    } else sfx.tap()
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${gradFor(concept.world.id)} pb-28`}>
      <TopBar game={game} onClose={() => go('aprender', { worldId: concept.world.id })} title="Aprendamos juntos" />
      <div className="mx-auto max-w-2xl px-4">
        {/* Encabezado del concepto */}
        <div className="mb-4 rounded-3xl bg-white/15 p-4 text-white ring-1 ring-white/20">
          <div className="flex items-center justify-between">
            <Pill className="bg-white/25 text-white">{concept.world.emoji} M{concept.world.module} · {concept.world.title}</Pill>
            <span className="text-xs font-bold text-white/80">Concepto {posInWorld}/{totalInWorld}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-2xl font-black">📌 <span className="font-display">{concept.term}</span></div>
        </div>

        {phase === 'layers' ? (
          <>
            <div className="mb-3 flex items-center gap-2">
              <ProgressBar value={((layer + 1) / layers.length) * 100} barClass="bg-white" />
              <span className="shrink-0 text-xs font-extrabold text-white/90">{layer + 1}/{layers.length}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={layer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="!p-6">
                  <div className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-500">
                    {LAYER_TITLES[layer]?.icon} {LAYER_TITLES[layer]?.t}
                  </div>
                  <p className="font-display text-2xl font-bold leading-snug text-slate-800">{layers[layer]}</p>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* indicadores de capa */}
            <div className="mt-3 flex justify-center gap-2">
              {layers.map((_, i) => (
                <span key={i} className={`h-2 w-8 rounded-full ${i <= layer ? 'bg-white' : 'bg-white/30'}`} />
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <Btn color="white" onClick={advanceLayer}>
                {layer + 1 < layers.length ? 'Lo entendí, seguir →' : 'Ver la ficha completa →'}
              </Btn>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {/* Ficha de 5 partes */}
            <Card className="space-y-3 !p-5">
              <Block icon="🧠" title="Explicación fácil" tint="bg-amber-50 text-amber-950">{concept.simple}</Block>
              <Block icon="📚" title="Definición formal (para el parcial)" tint="bg-slate-50 text-slate-700">{concept.definition}</Block>
              <Block icon="💡" title="Ejemplo real" tint="bg-emerald-50 text-emerald-900">{concept.example}</Block>
              {L.connections?.length > 0 && (
                <div className="rounded-2xl bg-sky-50 p-3 ring-1 ring-sky-100">
                  <div className="mb-1 text-xs font-extrabold uppercase text-sky-700">🔗 Cómo se conecta</div>
                  <ul className="space-y-1 text-sm font-semibold text-sky-900">
                    {L.connections.map((c, i) => <li key={i}>• {c}</li>)}
                  </ul>
                </div>
              )}
            </Card>

            {/* Explícamelo distinto (analogía) */}
            <button
              onClick={() => { setShowAnalogy((v) => !v); sfx.tap() }}
              className="mt-3 w-full rounded-2xl bg-violet-600 px-4 py-3 text-left font-extrabold text-white shadow-lg"
            >
              🔁 Explícamelo distinto {showAnalogy ? '▲' : '▼'}
            </button>
            <AnimatePresence>
              {showAnalogy && L.analogy && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="mt-2 rounded-2xl bg-violet-50 p-4 text-sm font-semibold text-violet-900 ring-1 ring-violet-200">
                    {L.analogy}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Autoevaluación 🔴🟡🟢 */}
            <div className="mt-5 rounded-3xl bg-white p-5 shadow-xl">
              <div className="font-display text-lg font-extrabold text-slate-800">¿Cómo lo sentís?</div>
              <p className="text-sm font-semibold text-slate-400">No importa “acertar”. El objetivo es llegar a 🟢 en todos los conceptos.</p>
              <div className="mt-3 grid gap-2">
                {STATE_OPTS.map((o) => (
                  <button
                    key={o.key}
                    onClick={() => pickState(o.key)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold ring-2 transition ${
                      curState === o.key ? 'bg-slate-900 text-white ring-slate-900' : 'bg-slate-50 text-slate-700 ring-transparent hover:ring-slate-200'
                    }`}
                  >
                    <span className="text-xl">{o.emoji}</span> {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Btn color="violet" onClick={() => go('construir', { worldId: concept.world.id })}>
                🗣️ Construir mi respuesta
              </Btn>
              {next ? (
                <Btn color="green" onClick={() => go('lesson', { conceptId: next.id })}>
                  Siguiente concepto →
                </Btn>
              ) : (
                <Btn color="green" onClick={() => go('aprender')}>
                  Terminé el recorrido 🎉
                </Btn>
              )}
            </div>
            <button onClick={() => go('aprender', { worldId: concept.world.id })} className="mt-3 w-full text-center text-sm font-bold text-white/80">
              ← Volver al mapa de aprendizaje
            </button>
          </motion.div>
        )}
      </div>

      <ProfesorAlLado concept={concept} />
    </div>
  )
}

function Block({ icon, title, tint, children }) {
  return (
    <div className={`rounded-2xl p-3 ${tint}`}>
      <div className="mb-0.5 text-xs font-extrabold uppercase tracking-wide opacity-70">{icon} {title}</div>
      <p className="text-sm font-semibold leading-relaxed">{children}</p>
    </div>
  )
}

function gradFor(worldId) {
  return {
    w1: 'from-sky-700 to-cyan-600',
    w2: 'from-emerald-700 to-teal-600',
    w3: 'from-violet-700 to-purple-600',
    w4: 'from-amber-600 to-orange-500',
    w5: 'from-rose-700 to-red-600',
    w6: 'from-fuchsia-700 to-pink-600',
  }[worldId] || 'from-brand-700 to-brand-500'
}
