import { motion } from 'framer-motion'

const copy = {
  es: { stack: 'Mi stack tecnológico', subtitle: 'Interactúa con el teclado para explorar mis habilidades' },
  en: { stack: 'My tech stack', subtitle: 'Interact with the keyboard to explore my skills' },
}

const Skills = ({ lang = 'es' }) => {
  const t = copy[lang] || copy.es
  return (
    <section id="skills" className="min-h-screen relative flex flex-col items-center justify-center py-20">
      {/* Title overlay - centered, non-blocking */}
      <motion.div 
        className="absolute top-20 left-0 right-0 z-20 pointer-events-none"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-custom text-center">
          <motion.span 
            className="inline-block text-primary-400 text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.stack}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Skills
          </motion.h2>
          <motion.p 
            className="text-white/50 max-w-xl mx-auto text-lg"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Spacer - allows keyboard to be the main visual focus */}
      <div className="h-[700px] md:h-[750px]" />
    </section>
  )
}

export default Skills
