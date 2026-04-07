import { motion } from 'framer-motion'
import { Code, Sparkles, Zap, Coffee } from 'lucide-react'
import { personalInfo } from '../../data/personal'
import SectionTitle from '../ui/SectionTitle'

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
    <section id="about" className="relative py-20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="container-custom relative z-10">
        <SectionTitle
          title="Sobre Mí"
          subtitle="Conóceme un poco más"
          description="Un desarrollador apasionado por crear experiencias digitales excepcionales."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {personalInfo.about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-white/60 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4"
            >
              <h4 className="text-white font-semibold mb-4">Lo que hago:</h4>
              <div className="grid grid-cols-2 gap-3">
                {personalInfo.about.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-white/50 text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    {highlight}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6"
            >
              {personalInfo.stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
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
