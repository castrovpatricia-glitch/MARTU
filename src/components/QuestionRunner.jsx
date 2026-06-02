import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Btn, Card } from './ui'
import { evaluateOpen } from '../utils/evaluator'
import { shuffle } from '../data'
import { sfx } from '../utils/sound'

// Reúne datos para registrar el error si se falla
function errMeta(question) {
  const text =
    question.q ||
    question.statement ||
    (question.title ? `Comparación: ${question.title}` : 'Pregunta')
  let correctText = question.explain || question.why || question.model || ''
  if (question.type === 'mc' || question.type === 'complete') {
    correctText = `Correcta: ${question.options[question.answer]}. ${question.explain || ''}`
  } else if (question.type === 'tf') {
    correctText = `${question.answer ? 'Verdadero' : 'Falso'}. ${question.explain || ''}`
  }
  return { questionId: question.id, world: question.world, question: text, correctText, type: question.type }
}

export default function QuestionRunner({ question, onResult, hideMeta }) {
  switch (question.type) {
    case 'mc':
    case 'complete':
      return <ChoiceQ question={question} onResult={onResult} />
    case 'tf':
      return <TrueFalseQ question={question} onResult={onResult} />
    case 'claim':
      return <ClaimQ question={question} onResult={onResult} />
    case 'order':
      return <OrderQ question={question} onResult={onResult} />
    case 'match':
      return <MatchQ question={question} onResult={onResult} />
    case 'open':
    case 'compare':
      return <OpenQ question={question} onResult={onResult} />
    default:
      return <div className="text-white">Tipo de pregunta no soportado.</div>
  }
}

// --------------------------- Stem (enunciado) ------------------------------
function Stem({ children, kicker }) {
  return (
    <div className="mb-4">
      {kicker && <div className="mb-1 text-xs font-bold uppercase tracking-wide text-brand-500">{kicker}</div>}
      <h2 className="font-display text-xl font-extrabold leading-snug text-slate-800">{children}</h2>
    </div>
  )
}

function Explain({ ok, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 rounded-2xl p-4 text-sm font-semibold ${
        ok ? 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200' : 'bg-rose-50 text-rose-900 ring-1 ring-rose-200'
      }`}
    >
      <div className="mb-1 font-extrabold">{ok ? '¡Correcto! 🎉' : 'Para tener en cuenta 👇'}</div>
      {text}
    </motion.div>
  )
}

function Continue({ onClick, label = 'Continuar' }) {
  return (
    <div className="mt-5 flex justify-end">
      <Btn color="green" onClick={onClick}>
        {label} →
      </Btn>
    </div>
  )
}

// --------------------------- Multiple choice / complete --------------------
function ChoiceQ({ question, onResult }) {
  const [sel, setSel] = useState(null)
  const answered = sel !== null
  const correct = sel === question.answer

  const choose = (i) => {
    if (answered) return
    setSel(i)
    i === question.answer ? sfx.correct() : sfx.wrong()
  }

  return (
    <Card>
      <Stem kicker={question.type === 'complete' ? 'Completá' : 'Elegí la correcta'}>{question.q}</Stem>
      <div className="grid gap-2.5">
        {question.options.map((opt, i) => {
          let cls = 'bg-white ring-1 ring-slate-200 hover:ring-brand-300 text-slate-700'
          if (answered && i === question.answer) cls = 'bg-emerald-500 text-white ring-2 ring-emerald-500'
          else if (answered && i === sel) cls = 'bg-rose-500 text-white ring-2 ring-rose-500'
          else if (answered) cls = 'bg-white ring-1 ring-slate-200 text-slate-400'
          return (
            <motion.button
              key={i}
              whileTap={{ scale: answered ? 1 : 0.98 }}
              onClick={() => choose(i)}
              className={`rounded-2xl px-4 py-3 text-left font-bold transition-all ${cls}`}
            >
              <span className="mr-2 opacity-60">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </motion.button>
          )
        })}
      </div>
      {answered && <Explain ok={correct} text={question.explain} />}
      {answered && <Continue onClick={() => onResult({ correct, ...errMeta(question) })} />}
    </Card>
  )
}

// --------------------------- True / False ----------------------------------
function TrueFalseQ({ question, onResult }) {
  const [sel, setSel] = useState(null)
  const answered = sel !== null
  const correct = sel === question.answer
  const choose = (v) => {
    if (answered) return
    setSel(v)
    v === question.answer ? sfx.correct() : sfx.wrong()
  }
  return (
    <Card>
      <Stem kicker="¿Verdadero o falso?">{question.q}</Stem>
      <div className="grid grid-cols-2 gap-3">
        {[true, false].map((v) => {
          let cls = 'bg-white ring-1 ring-slate-200 hover:ring-brand-300 text-slate-700'
          if (answered && v === question.answer) cls = 'bg-emerald-500 text-white'
          else if (answered && v === sel) cls = 'bg-rose-500 text-white'
          else if (answered) cls = 'bg-white ring-1 ring-slate-200 text-slate-400'
          return (
            <motion.button
              key={String(v)}
              whileTap={{ scale: answered ? 1 : 0.97 }}
              onClick={() => choose(v)}
              className={`rounded-2xl px-4 py-5 text-center text-lg font-extrabold transition-all ${cls}`}
            >
              {v ? '✅ Verdadero' : '❌ Falso'}
            </motion.button>
          )
        })}
      </div>
      {answered && <Explain ok={correct} text={question.explain} />}
      {answered && <Continue onClick={() => onResult({ correct, ...errMeta(question) })} />}
    </Card>
  )
}

// --------------------------- Claim (No me la creo) -------------------------
function ClaimQ({ question, onResult }) {
  const [sel, setSel] = useState(null)
  const answered = sel !== null
  const correct = sel === question.correct
  const choose = (v) => {
    if (answered) return
    setSel(v)
    v === question.correct ? sfx.correct() : sfx.wrong()
  }
  return (
    <Card>
      <div className="mb-1 text-xs font-bold uppercase tracking-wide text-rose-500">🚨 No me la creo</div>
      <div className="mb-4 rounded-2xl bg-slate-900 p-5 text-center font-display text-lg font-bold text-white">
        “{question.statement}”
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { v: true, label: '✅ Correcto' },
          { v: false, label: '🚨 Incorrecto' },
        ].map(({ v, label }) => {
          let cls = 'bg-white ring-1 ring-slate-200 hover:ring-brand-300 text-slate-700'
          if (answered && v === question.correct) cls = 'bg-emerald-500 text-white'
          else if (answered && v === sel) cls = 'bg-rose-500 text-white'
          else if (answered) cls = 'bg-white ring-1 ring-slate-200 text-slate-400'
          return (
            <motion.button
              key={String(v)}
              whileTap={{ scale: answered ? 1 : 0.97 }}
              onClick={() => choose(v)}
              className={`rounded-2xl px-4 py-4 text-center font-extrabold transition-all ${cls}`}
            >
              {label}
            </motion.button>
          )
        })}
      </div>
      {answered && (
        <Explain ok={correct} text={(question.correct ? '' : '¿Por qué es incorrecta? ') + question.why} />
      )}
      {answered && <Continue onClick={() => onResult({ correct, ...errMeta(question) })} />}
    </Card>
  )
}

// --------------------------- Ordenar proceso -------------------------------
function OrderQ({ question, onResult }) {
  const shuffled = useMemo(() => shuffle(question.items.map((t, i) => ({ t, i }))), [question.id])
  const [picked, setPicked] = useState([]) // array de índices originales
  const [checked, setChecked] = useState(false)
  const correct = picked.length === question.items.length && picked.every((idx, pos) => idx === pos)

  const pick = (idx) => {
    if (checked || picked.includes(idx)) return
    sfx.tap()
    setPicked((p) => [...p, idx])
  }
  const undo = () => !checked && setPicked((p) => p.slice(0, -1))
  const check = () => {
    setChecked(true)
    correct ? sfx.correct() : sfx.wrong()
  }

  return (
    <Card>
      <Stem kicker="Ordená el proceso">{question.q}</Stem>

      {/* Secuencia elegida */}
      <div className="mb-3 min-h-[3rem] rounded-2xl bg-slate-50 p-2 ring-1 ring-slate-200">
        {picked.length === 0 ? (
          <div className="px-2 py-2 text-sm font-semibold text-slate-400">Tocá los pasos en orden…</div>
        ) : (
          <ol className="space-y-1.5">
            {picked.map((idx, pos) => {
              const ok = checked ? idx === pos : null
              return (
                <li
                  key={idx}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${
                    ok === null ? 'bg-white ring-1 ring-slate-200 text-slate-700' : ok ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-black/10 text-xs">{pos + 1}</span>
                  {question.items[idx]}
                </li>
              )
            })}
          </ol>
        )}
      </div>

      {/* Opciones disponibles */}
      {!checked && (
        <div className="flex flex-wrap gap-2">
          {shuffled.map(({ t, i }) => (
            <button
              key={i}
              disabled={picked.includes(i)}
              onClick={() => pick(i)}
              className={`rounded-xl px-3 py-2 text-sm font-bold ring-1 transition-all ${
                picked.includes(i)
                  ? 'cursor-default bg-slate-100 text-slate-300 ring-slate-100'
                  : 'bg-white text-slate-700 ring-slate-200 hover:ring-brand-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {!checked ? (
        <div className="mt-5 flex items-center justify-between">
          <button onClick={undo} disabled={!picked.length} className="text-sm font-bold text-slate-500 disabled:opacity-30">
            ↶ Deshacer
          </button>
          <Btn color="green" onClick={check} disabled={picked.length !== question.items.length}>
            Comprobar
          </Btn>
        </div>
      ) : (
        <>
          {!correct && (
            <Explain
              ok={false}
              text={
                <span>
                  Orden correcto:{' '}
                  <b>{question.items.join(' → ')}</b>. {question.explain}
                </span>
              }
            />
          )}
          {correct && <Explain ok text={question.explain} />}
          <Continue onClick={() => onResult({ correct, ...errMeta(question) })} />
        </>
      )}
    </Card>
  )
}

// --------------------------- Relacionar (match) ----------------------------
function MatchQ({ question, onResult }) {
  const lefts = question.pairs.map((p) => p[0])
  const rights = useMemo(() => shuffle(question.pairs.map((p) => p[1])), [question.id])
  const [conn, setConn] = useState({}) // leftIndex -> rightValue
  const [activeLeft, setActiveLeft] = useState(null)
  const [checked, setChecked] = useState(false)

  const usedRights = new Set(Object.values(conn))
  const allConnected = Object.keys(conn).length === lefts.length
  const correct = lefts.every((_, i) => conn[i] === question.pairs[i][1])

  const tapLeft = (i) => {
    if (checked) return
    sfx.tap()
    setActiveLeft(i === activeLeft ? null : i)
  }
  const tapRight = (val) => {
    if (checked || activeLeft === null) return
    sfx.tap()
    setConn((c) => {
      const next = { ...c }
      // saca ese valor de cualquier otra conexión
      for (const k of Object.keys(next)) if (next[k] === val) delete next[k]
      next[activeLeft] = val
      return next
    })
    setActiveLeft(null)
  }
  const check = () => {
    setChecked(true)
    correct ? sfx.correct() : sfx.wrong()
  }

  return (
    <Card>
      <Stem kicker="Relacioná">{question.q}</Stem>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {lefts.map((l, i) => {
            const has = conn[i] !== undefined
            const ok = checked ? conn[i] === question.pairs[i][1] : null
            return (
              <button
                key={i}
                onClick={() => tapLeft(i)}
                className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold ring-2 transition-all ${
                  activeLeft === i
                    ? 'bg-brand-500 text-white ring-brand-500'
                    : ok === null
                    ? has
                      ? 'bg-brand-50 text-brand-800 ring-brand-200'
                      : 'bg-white text-slate-700 ring-slate-200'
                    : ok
                    ? 'bg-emerald-500 text-white ring-emerald-500'
                    : 'bg-rose-500 text-white ring-rose-500'
                }`}
              >
                {l}
                {has && <span className="mt-0.5 block text-xs font-semibold opacity-80">↳ {conn[i]}</span>}
              </button>
            )
          })}
        </div>
        <div className="space-y-2">
          {rights.map((r, i) => {
            const used = usedRights.has(r)
            return (
              <button
                key={i}
                onClick={() => tapRight(r)}
                disabled={checked}
                className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold ring-1 transition-all ${
                  used ? 'bg-slate-100 text-slate-400 ring-slate-100' : 'bg-white text-slate-700 ring-slate-200 hover:ring-brand-300'
                }`}
              >
                {r}
              </button>
            )
          })}
        </div>
      </div>

      {!checked ? (
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {activeLeft === null ? 'Tocá un concepto y luego su par.' : 'Ahora tocá su par a la derecha.'}
          </span>
          <Btn color="green" onClick={check} disabled={!allConnected}>
            Comprobar
          </Btn>
        </div>
      ) : (
        <>
          {!correct && (
            <div className="mt-4 rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-900 ring-1 ring-rose-200">
              <div className="mb-1 font-extrabold">Relaciones correctas:</div>
              <ul className="space-y-0.5">
                {question.pairs.map((p, i) => (
                  <li key={i}>
                    <b>{p[0]}</b> ↳ {p[1]}
                  </li>
                ))}
              </ul>
              {question.explain && <div className="mt-2">{question.explain}</div>}
            </div>
          )}
          {correct && <Explain ok text={question.explain} />}
          <Continue onClick={() => onResult({ correct, ...errMeta(question) })} />
        </>
      )}
    </Card>
  )
}

// --------------------------- Respuesta abierta (oral) ----------------------
export function OpenQ({ question, onResult, kicker = 'Respondé con tus palabras' }) {
  const [text, setText] = useState('')
  const [res, setRes] = useState(null)
  const [showModel, setShowModel] = useState(false)

  const correct = () => {
    const r = evaluateOpen(text, question)
    setRes(r)
    r.score >= 7 ? sfx.correct() : sfx.wrong()
  }
  const retry = () => {
    setRes(null)
    setShowModel(false)
  }

  const scoreColor =
    !res ? '' : res.score >= 9 ? 'text-emerald-500' : res.score >= 7 ? 'text-brand-500' : res.score >= 5 ? 'text-amber-500' : 'text-rose-500'

  return (
    <Card>
      {question.type === 'compare' ? (
        <div className="mb-4">
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-brand-500">⚔️ Compará</div>
          <h2 className="font-display text-xl font-extrabold text-slate-800">{question.title}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Explicá: 1) qué es cada uno, 2) la diferencia principal y 3) un ejemplo.
          </p>
        </div>
      ) : (
        <Stem kicker={kicker}>{question.q}</Stem>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!!res}
        rows={5}
        placeholder="Escribí tu respuesta como si se la estuvieras explicando al profesor…"
        className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-[15px] font-medium text-slate-800 outline-none focus:border-brand-400"
      />

      {!res ? (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{text.trim().split(/\s+/).filter(Boolean).length} palabras</span>
          <Btn color="violet" onClick={correct} disabled={!text.trim()}>
            👩‍🏫 Corregir
          </Btn>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            {/* Nota */}
            <div className="flex items-center gap-4 rounded-2xl bg-slate-900 p-4 text-white">
              <div className={`font-display text-4xl font-black ${scoreColor}`}>{res.score}<span className="text-xl text-white/40">/10</span></div>
              <div className="text-sm font-semibold">{res.verdict}</div>
            </div>

            {/* Conceptos cubiertos / faltantes */}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-200">
                <div className="mb-1 text-xs font-extrabold uppercase text-emerald-700">✔ Mencionaste</div>
                {res.covered.length ? (
                  <ul className="space-y-1 text-sm font-semibold text-emerald-900">
                    {res.covered.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-emerald-700/70">Nada todavía…</div>
                )}
              </div>
              <div className="rounded-2xl bg-rose-50 p-3 ring-1 ring-rose-200">
                <div className="mb-1 text-xs font-extrabold uppercase text-rose-700">✗ Para un 10 te faltó</div>
                {res.toImprove.length ? (
                  <ul className="space-y-1 text-sm font-semibold text-rose-900">
                    {res.toImprove.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-rose-700/70">¡Nada! Cubriste todo. 🏆</div>
                )}
              </div>
            </div>

            {/* Pista de estrategia */}
            {res.hasStrategy && !res.strategyHit && res.strategy && (
              <div className="mt-3 rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-900 ring-1 ring-amber-200">
                💡 {res.strategy}
              </div>
            )}

            {/* Respuesta modelo */}
            <button
              onClick={() => setShowModel((v) => !v)}
              className="mt-3 text-sm font-bold text-brand-600 hover:underline"
            >
              {showModel ? '▲ Ocultar' : '▼ Ver'} respuesta modelo del profe
            </button>
            {showModel && (
              <div className="mt-2 space-y-2 rounded-2xl bg-brand-50 p-4 text-sm text-slate-700 ring-1 ring-brand-100">
                <p className="font-semibold">{res.model}</p>
                {question.type === 'compare' && (
                  <div className="rounded-xl bg-white/70 p-2">
                    <b>Diferencia principal:</b> {question.difference}
                  </div>
                )}
                {res.example && (
                  <p className="text-brand-800">
                    <b>Ejemplo:</b> {res.example}
                  </p>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <button onClick={retry} className="text-sm font-bold text-slate-500 hover:text-slate-700">
                ↺ Reintentar
              </button>
              <Btn color="green" onClick={() => onResult({ correct: res.score >= 7, score: res.score, ...errMeta(question) })}>
                Continuar →
              </Btn>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </Card>
  )
}
