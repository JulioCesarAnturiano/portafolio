import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen relative flex flex-col items-center justify-center py-20">
      {/* Content overlay - pointer-events-none so canvas receives events */}
      <div className="container-custom relative z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="Mis Skills"
            subtitle="Teclado de tecnologías"
            description="Interactúa con las teclas para explorar mis habilidades"
          />
        </motion.div>

        {/* Spacer to let the keyboard be visible - no pointer events */}
        <div className="h-[500px] md:h-[550px]" />
      </div>
    </section>
  )
}

export default Skills
