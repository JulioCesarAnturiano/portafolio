import { motion } from 'framer-motion'
import { Code, Sparkles, Zap, Coffee } from 'lucide-react'
import { personalInfo } from '../../data/personal'

const copy = {
  es: {
    intro: 'Conóceme',
    title: 'Sobre Mí',
    features: [
      { icon: Code, title: 'Código Limpio', description: 'Escribo código mantenible, escalable y bien documentado.' },
      { icon: Sparkles, title: 'UI/UX Moderno', description: 'Creo interfaces intuitivas y atractivas.' },
      { icon: Zap, title: 'Alto Rendimiento', description: 'Optimizo aplicaciones para máxima velocidad.' },
      { icon: Coffee, title: 'Dedicación Total', description: 'Me comprometo al 100% con cada proyecto.' },
    ],
  },
  en: {
    intro: 'Get to know me',
    title: 'About Me',
    features: [
      { icon: Code, title: 'Clean Code', description: 'I write maintainable, scalable and well-documented code.' },
      { icon: Sparkles, title: 'Modern UI/UX', description: 'I create intuitive and attractive interfaces.' },
      { icon: Zap, title: 'High Performance', description: 'I optimize apps for maximum speed.' },
      { icon: Coffee, title: 'Full Commitment', description: 'I give 100% to every project.' },
    ],
  },
}

const About = ({ lang = 'es' }) => {
  const t = copy[lang] || copy.es
  const paragraphs = lang === 'en' ? personalInfo.about.paragraphs : [
    'Soy estudiante de tercer año de Ingeniería Informática en la UMSS con experiencia real desplegando sistemas productivos para instituciones públicas. Como competidor ICPC, tengo bases sólidas en algoritmos, estructuras de datos y resolución de problemas bajo presión.',
    'Me apasiona construir aplicaciones full-stack escalables que resuelvan problemas reales. He trabajado en sistemas críticos como plataformas electorales, apps municipales de transporte y herramientas de captura de movimiento 3D.',
    'Además de programar, me interesa la Inteligencia Artificial, la programación competitiva y los gráficos por computadora. Me gusta explorar tecnologías de punta y crear soluciones con impacto.',
  ]

  return (
    <section id="about" className="relative min-h-screen flex items-center py-24 overflow-hidden">

      <div className="container-custom relative z-10">
        {/* Right-aligned content to leave space for keyboard */}
        <div className="ml-auto max-w-3xl">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span 
              className="inline-block text-primary-400 text-sm font-medium tracking-widest uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
                {t.intro}
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
                {t.title}
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-white/60 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
              >
                {personalInfo.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="text-center p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/40 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column - Feature cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              {t.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-300"
                >
                  <motion.div 
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <h4 className="text-white font-semibold mb-1 text-sm">{feature.title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
