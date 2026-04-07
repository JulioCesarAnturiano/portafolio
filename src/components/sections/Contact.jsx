import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react'
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: personalInfo.location,
      href: null
    }
  ]

  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: personalInfo.social.twitter, label: "Twitter" },
  ]

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
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
            ¿Tienes un proyecto en mente?
          </motion.span>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Contacto
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-white/50 max-w-xl mx-auto"
          >
            Estoy disponible para proyectos freelance y oportunidades laborales.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={slideFromLeft}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easings.smoothOut }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Trabajemos juntos
              </h3>
              <p className="text-white/50 leading-relaxed">
                Si tienes un proyecto interesante o simplemente quieres charlar sobre tecnología, 
                no dudes en contactarme.
              </p>
            </motion.div>

            {/* Contact info cards */}
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactInfo.map((info) => (
                <motion.div
                  key={info.label}
                  variants={staggerItem}
                >
                  {info.href ? (
                    <motion.a
                      href={info.href}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-300 group"
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.3, ease: easings.smoothOut }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <info.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <div className="text-white/40 text-sm">{info.label}</div>
                        <div className="text-white font-medium">{info.value}</div>
                      </div>
                    </motion.a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white/40 text-sm">{info.label}</div>
                        <div className="text-white font-medium">{info.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: easings.smoothOut }}
            >
              <h4 className="text-white font-semibold mb-4">Sígueme en redes</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4, ease: easings.smoothOut }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Contact form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={slideFromRight}
          >
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Name field */}
              <motion.div variants={staggerItem}>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Nombre
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300"
                  placeholder="Tu nombre"
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              {/* Email field */}
              <motion.div variants={staggerItem}>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300"
                  placeholder="tu@email.com"
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              {/* Message field */}
              <motion.div variants={staggerItem}>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Mensaje
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300 resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                variants={staggerItem}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar mensaje
                  </>
                )}
              </motion.button>

              {/* Success message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: easings.smoothOut }}
                  className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center"
                >
                  ¡Mensaje enviado con éxito! Te responderé pronto.
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
