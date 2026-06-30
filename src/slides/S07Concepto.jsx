import { motion } from 'framer-motion'
import Slide from '../components/Slide.jsx'
import { Kicker, item } from '../components/ui.jsx'
import paisaje from '../assets/paisaje-cocora.jpg'

export default function S07Concepto() {
  return (
    <Slide bg="none">
      {/* Fondo paisaje colombiano */}
      <motion.img
        src={paisaje}
        alt="Valle del Cocora, Andes colombianos"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-co-navy via-co-navy/70 to-co-navy/30" />
      <div className="absolute inset-0 -z-10 bg-co-navy/25" />

      <div className="flex flex-col items-center text-center">
        <motion.div variants={item}>
          <Kicker color="text-co-yellow">Concepto de campaña</Kicker>
        </motion.div>

        <motion.h2
          variants={item}
          className="title-tight mt-6 font-black text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          style={{ fontSize: 'clamp(2.6rem, 11vw, 7rem)' }}
        >
          Y todavía
          <br />
          no viste nada
        </motion.h2>

        <motion.div variants={item} className="mt-7 h-1.5 w-40 rounded-full co-stripe" />

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-balance text-base font-semibold text-white/90 sm:text-xl"
        >
          Una campaña que parte de lo que el mundo ya conoce de Colombia para
          revelar todo lo que todavía falta descubrir.
        </motion.p>
      </div>
    </Slide>
  )
}
