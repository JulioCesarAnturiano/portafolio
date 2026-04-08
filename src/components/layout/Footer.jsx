import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Instagram, Heart } from 'lucide-react'
import { personalInfo } from '../../data/personal'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-white/10 bg-transparent">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.a
              href="#hero"
              className="text-2xl font-bold text-white inline-block mb-2"
              whileHover={{ scale: 1.05 }}
            >
              {personalInfo.name.split(' ')[0]}
              <span className="text-primary-500">.</span>
            </motion.a>
            <p className="text-white/40 text-sm">
              © {currentYear} {personalInfo.name}. Todos los derechos reservados.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {Object.entries(personalInfo.social).map(([platform, url]) => {
              const Icon = socialIcons[platform]
              if (!Icon || !url) return null
              
              return (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              )
            })}
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <span>Hecho con</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-red-500 fill-red-500" />
            </motion.span>
            <span>y mucho ☕</span>
          </div>
        </div>

        {/* Back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-8 -top-6 p-3 bg-white text-black rounded-xl shadow-lg transition-shadow"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.button>
      </div>
    </footer>
  )
}

export default Footer
