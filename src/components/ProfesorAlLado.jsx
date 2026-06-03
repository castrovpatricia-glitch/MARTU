import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Asistente paciente disponible en las lecciones.
// Cuando estás perdido: simplifica, da ejemplos, otra analogía o cómo decirlo en el oral.
export default function ProfesorAlLado({ concept }) {
  const [open, setOpen] = useState(false)
  const [reply, setReply] = useState(null)

  if (!concept) return null
  const L = concept.lesson || {}

  const actions = [
    { key: 'simple', label: '🐣 Simplificámelo', text: L.layers?.[0] || concept.simple },
    { key: 'ej', label: '💡 Dame un ejemplo', text: concept.example },
    { key: 'analog', label: '🔁 Otra analogía', text: L.analogy || concept.simple },
    { key: 'oral', label: '🗣️ ¿Cómo lo digo en el oral?', text: L.layers?.[2] || concept.definition },
  ]

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { setOpen((o) => !o); setReply(null) }}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 font-extrabold text-white shadow-2xl ring-4 ring-indigo-300/40"
      >
        <span className="text-xl">🧑‍🏫</span>
        <span className="hidden sm:inline">Profe al lado</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 sm:items-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card w-full max-w-md p-5"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-indigo-100 text-2xl">🧑‍🏫</span>
                <div>
                  <div className="font-display font-extrabold text-slate-800">Tu profe particular</div>
                  <div className="text-xs font-semibold text-slate-400">Sobre: {concept.term}</div>
                </div>
                <button onClick={() => setOpen(false)} className="ml-auto text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div className="mt-3 rounded-2xl bg-indigo-50 p-3 text-sm font-semibold text-indigo-900">
                {reply
                  ? reply
                  : 'No pasa nada, vamos de a poco. ¿Qué necesitás? Tocá una opción y te lo explico de otra forma. 😊'}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {actions.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => setReply(a.text)}
                    className="rounded-xl bg-slate-100 px-3 py-2 text-left text-sm font-bold text-slate-700 transition hover:bg-indigo-100"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
