import { motion } from 'framer-motion'
import { stagger } from './ui'

/* Marco común de cada slide: ocupa casi toda la pantalla, centra el
   contenido y dispara la animación escalonada de los hijos. */
export default function Slide({
  children,
  bg = 'navy',
  className = '',
  contentClassName = '',
  pad = true,
}) {
  const backgrounds = {
    navy: 'bg-co-navy text-white',
    navy2: 'bg-co-navy2 text-white',
    white: 'bg-white text-co-navy',
    none: '',
  }
  return (
    <section
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${
        backgrounds[bg] || ''
      } ${className}`}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className={`relative z-10 w-full max-w-6xl ${
          pad ? 'px-5 py-16 sm:px-10 sm:py-20 md:px-14' : ''
        } ${contentClassName}`}
      >
        {children}
      </motion.div>
    </section>
  )
}
