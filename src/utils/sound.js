// Pequeños efectos de sonido con Web Audio (sin archivos externos).
let ctx
let enabled = true

export function setSoundEnabled(v) {
  enabled = v
}

function tone(freq, duration = 0.12, type = 'sine', when = 0, gain = 0.06) {
  if (!enabled) return
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.value = freq
    o.connect(g)
    g.connect(ctx.destination)
    const t = ctx.currentTime + when
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    o.start(t)
    o.stop(t + duration + 0.02)
  } catch {
    /* audio no disponible */
  }
}

export const sfx = {
  correct() {
    tone(660, 0.1, 'triangle', 0)
    tone(880, 0.14, 'triangle', 0.08)
  },
  wrong() {
    tone(200, 0.18, 'sawtooth', 0, 0.05)
    tone(150, 0.2, 'sawtooth', 0.1, 0.05)
  },
  tap() {
    tone(520, 0.05, 'sine', 0, 0.03)
  },
  win() {
    tone(523, 0.12, 'triangle', 0)
    tone(659, 0.12, 'triangle', 0.12)
    tone(784, 0.12, 'triangle', 0.24)
    tone(1046, 0.22, 'triangle', 0.36)
  },
  levelup() {
    tone(440, 0.1, 'square', 0, 0.04)
    tone(660, 0.1, 'square', 0.1, 0.04)
    tone(880, 0.18, 'square', 0.2, 0.04)
  },
}
