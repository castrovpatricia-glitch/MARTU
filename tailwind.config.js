/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Futura no es web-safe: usamos Montserrat, una geométrica de la misma familia.
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Paleta del Manual de Marca País Colombia
        co: {
          navy: '#0b1a4a', // azul profundo (fondo)
          navy2: '#0a1538',
          blue: '#1b2fe0', // azul vibrante (hit)
          yellow: '#ffd200', // amarillo (gol / energía)
          red: '#e4002b', // rojo (café / pasión)
          magenta: '#e6007e', // magenta
          green: '#46c93a', // verde (ritmo / naturaleza)
          violet: '#7b2ff7', // violeta (portada / diversidad)
          sky: '#00b5e2', // celeste (agua / cielo)
          orange: '#ff7a00', // naranja (creatividad)
          ink: '#0b1020',
        },
      },
      boxShadow: {
        slab: '0 18px 50px -12px rgba(0,0,0,0.45)',
        glow: '0 0 0 4px rgba(255,255,255,0.06)',
      },
      keyframes: {
        'fade-up': {
          '0%': { transform: 'translateY(22px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'bounce-x': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        float: 'float 4s ease-in-out infinite',
        'bounce-x': 'bounce-x 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
