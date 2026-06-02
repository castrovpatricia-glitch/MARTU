// Corre la suite de tests (lógica + render de componentes) sin navegador.
// Empaqueta cada test con esbuild y lo ejecuta en un proceso node aislado.
import { build } from 'esbuild'
import { spawnSync } from 'child_process'
import { tmpdir } from 'os'
import { join } from 'path'

const tests = [
  { name: 'Lógica y datos', entry: 'test/logic.mjs', jsx: false },
  { name: 'Render de componentes', entry: 'test/screens.mjs', jsx: true },
]

let failed = false
for (const t of tests) {
  const out = join(tmpdir(), `rrhhq_${t.entry.replace(/\W/g, '_')}.cjs`)
  console.log(`\n══════ ${t.name} (${t.entry}) ══════`)
  try {
    await build({
      entryPoints: [t.entry],
      bundle: true,
      platform: 'node',
      format: 'cjs',
      outfile: out,
      resolveExtensions: ['.jsx', '.js', '.json'],
      jsx: t.jsx ? 'automatic' : undefined,
      logLevel: 'error',
    })
  } catch (e) {
    console.error('Error al empaquetar:', e.message)
    failed = true
    continue
  }
  const res = spawnSync('node', [out], { stdio: 'inherit' })
  if (res.status !== 0) failed = true
}

console.log('')
if (failed) {
  console.log('❌ Hay tests que fallaron.')
  process.exit(1)
} else {
  console.log('✅ Suite completa en verde.')
}
