import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react'
import { personalInfo } from '../../data/personal'
import { 
  heroTitle, 
  heroSubtitle, 
  heroDescription, 
  heroButtons, 
  fadeIn,
  staggerContainer,
  staggerItem,
  easings 
} from '../../hooks/animations'

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Semi-transparent backdrop */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: easings.smooth }}
      />

      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {personalInfo.availability}
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={heroTitle}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">Hola, soy </span>
            <span className="text-gradient">{personalInfo.name}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={heroSubtitle}
            className="mb-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/80 mb-2">
              {personalInfo.title}
            </h2>
            <p className="text-lg md:text-xl text-primary-400 font-medium">
              {personalInfo.subtitle}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={heroDescription}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {personalInfo.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroButtons}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: easings.smooth }}
            >
              Ver proyectos
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: easings.smooth }}
            >
              <Download size={20} />
              Descargar CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeIn}
            className="flex items-center justify-center gap-4"
          >
            <span className="text-white/40 text-sm">Sígueme en:</span>
            <div className="flex items-center gap-3">
              <motion.a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: easings.smoothOut }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#skills"
            className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors cursor-pointer"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
