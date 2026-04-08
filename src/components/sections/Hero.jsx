import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '../../data/personal'

const copy = {
  es: {
    hello: 'Hola, soy ',
    availability: 'Disponible para pasantías y proyectos freelance',
    title: 'Desarrollador Full-Stack e Ingeniero de Software',
    subtitle: 'Construyendo sistemas productivos y soluciones de programación competitiva',
    description: 'Estudiante de tercer año de Ingeniería Informática en la UMSS con experiencia desplegando sistemas críticos para instituciones públicas. Competidor ICPC con bases sólidas en algoritmos, estructuras de datos y arquitectura de software.',
    projects: 'Ver proyectos',
    contact: 'Contactarme',
    scroll: 'Scroll',
  },
  en: {
    hello: 'Hi, I am ',
    availability: personalInfo.availability,
    title: personalInfo.title,
    subtitle: personalInfo.subtitle,
    description: personalInfo.description,
    projects: 'View projects',
    contact: 'Contact me',
    scroll: 'Scroll',
  },
}

const Hero = ({ lang = 'es' }) => {
  const t = copy[lang] || copy.es
  return (
    <section id="hero" className="relative min-h-[108vh] flex items-center pt-20 pb-12 overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Left-aligned content to leave space for keyboard on right */}
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {t.availability}
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">{t.hello}</span>
            <span className="text-gradient">{personalInfo.name}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/80 mb-2">
              {t.title}
            </h2>
            <p className="text-lg md:text-xl text-primary-400 font-medium">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/50 text-lg max-w-xl mb-10 leading-relaxed"
          >
            {t.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t.projects}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t.contact}
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            {[
              { icon: Github, href: personalInfo.social.github },
              { icon: Linkedin, href: personalInfo.social.linkedin },
              { icon: Mail, href: `mailto:${personalInfo.email}` },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.icon !== Mail ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-3 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#skills"
            className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors cursor-pointer"
          >
            <span className="text-xs uppercase tracking-widest">{t.scroll}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
