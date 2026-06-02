import { renderToString } from 'react-dom/server'
import { jsx } from 'react/jsx-runtime'
import App from '../src/App.jsx'
try {
  const html = renderToString(jsx(App, {}))
  if (!html.includes('RRHH Quest')) { console.error('NO renderizó el título'); process.exit(1) }
  console.log('✅ App renderizó OK · longitud HTML:', html.length, 'chars')
  for (const t of ['Mapa de aprendizaje', 'Modos de juego', 'Examen viernes', 'Lo que todavía no sabés']) {
    if (!html.includes(t)) { console.error('Falta en el render:', t); process.exit(1) }
  }
  console.log('✅ Secciones clave presentes en el Home.')
} catch (e) {
  console.error('💥 Error de render:', e.stack || e.message); process.exit(1)
}
