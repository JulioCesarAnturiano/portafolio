import { motion } from 'framer-motion'
import { Code, Sparkles, Zap, Coffee } from 'lucide-react'
import { personalInfo } from '../../data/personal'
import { 
  sectionReveal, 
  fadeUp, 
  slideFromLeft, 
  slideFromRight,
  staggerContainer,
  staggerItem,
  viewportSettings,
  easings 
} from '../../hooks/animations'

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Código Limpio",
      description: "Escribo código mantenible, escalable y bien documentado."
    },
    {
      icon: Sparkles,
      title: "UI/UX Moderno",
      description: "Creo interfaces intuitivas y atractivas."
    },
    {
      icon: Zap,
      title: "Alto Rendimiento",
      description: "Optimizo aplicaciones para máxima velocidad."
    },
    {
      icon: Coffee,
      title: "Dedicación Total",
      description: "Me comprometo al 100% con cada proyecto."
    }
  ]

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={sectionReveal}
          className="text-center mb-16"
        >
          <motion.span 
            variants={fadeUp}
            className="inline-block text-primary-400 text-sm font-medium tracking-widest uppercase mb-4"
          >
            Conóceme un poco más
          </motion.span>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Sobre Mí
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-white/50 max-w-xl mx-auto"
          >
            Un desarrollador apasionado por crear experiencias digitales excepcionales.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column - Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={slideFromLeft}
            className="space-y-6"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {personalInfo.about.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={staggerItem}
                  className="text-white/60 leading-relaxed mb-4"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: easings.smoothOut }}
              className="pt-4"
            >
              <h4 className="text-white font-semibold mb-4">Lo que hago:</h4>
              <motion.div 
                className="grid grid-cols-2 gap-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {personalInfo.about.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-center gap-2 text-white/50 text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    {highlight}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: easings.smoothOut }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6"
            >
              {personalInfo.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: easings.smoothOut }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-xs">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Feature cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={slideFromRight}
            className="grid sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: easings.smoothOut }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-300"
              >
                <motion.div 
                  className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="text-white font-semibold mb-2">
                  {feature.title}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
