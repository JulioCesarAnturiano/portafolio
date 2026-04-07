import { motion } from 'framer-motion'
import { fadeUpScale, viewportSettings, easings } from '../../hooks/animations'

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen relative flex flex-col items-center justify-center py-20">
      {/* Title overlay - pointer-events-none to allow canvas interaction */}
      <motion.div 
        className="absolute top-20 left-0 right-0 z-20 pointer-events-none"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: easings.smoothOut }}
      >
        <div className="container-custom text-center">
          <motion.span 
            className="inline-block text-primary-400 text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: easings.smoothOut }}
          >
            Teclado de tecnologías
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: easings.smoothOut }}
          >
            Mis Skills
          </motion.h2>
          <motion.p 
            className="text-white/50 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: easings.smoothOut }}
          >
            Interactúa con las teclas para explorar mis habilidades
          </motion.p>
        </div>
      </motion.div>

      {/* Spacer - allows keyboard to be the main visual */}
      <div className="h-[600px] md:h-[650px]" />
    </section>
  )
}

export default Skills
