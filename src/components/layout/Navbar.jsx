import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import { navLinks, personalInfo } from '../../data/personal'

const labels = {
  es: { contact: 'Contáctame', cv: 'CV' },
  en: { contact: 'Contact me', cv: 'CV' },
}

const Navbar = ({ lang = 'es', onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const links = navLinks[lang] || navLinks.es
  const t = labels[lang] || labels.es

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#080511]/85 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="text-xl md:text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {personalInfo.name.split(' ')[0]}
            <span className="text-primary-500">.</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <motion.a
              href="/CV/cv_julio_academic_FINAL_CLEAN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <FileText size={16} />
              {t.cv}
            </motion.a>
          </div>

          {/* CTA Button - Desktop */}
          <motion.a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t.contact}
          </motion.a>

          <div className="hidden md:flex items-center gap-1 ml-3">
            {['es', 'en'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => onLanguageChange?.(code)}
                className={`px-2.5 py-1 rounded-md text-xs uppercase border transition-colors ${
                  lang === code ? 'bg-white text-black border-white' : 'text-white/70 border-white/20 hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-[#080511]/95 backdrop-blur-xl rounded-2xl mt-2 border border-white/10"
            >
              <div className="py-4 px-4 space-y-1">
                {links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="/CV/cv_julio_academic_FINAL_CLEAN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="inline-flex items-center gap-2">
                    <FileText size={16} />
                    {t.cv}
                  </span>
                </motion.a>
                <motion.a
                  href="#contact"
                  className="block mt-4 px-4 py-3 bg-white text-black text-center font-semibold rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.contact}
                </motion.a>
                <div className="mt-3 flex gap-2 px-1">
                  {['es', 'en'].map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => onLanguageChange?.(code)}
                      className={`px-3 py-2 rounded-md text-xs uppercase border ${
                        lang === code ? 'bg-white text-black border-white' : 'text-white/70 border-white/20'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navbar
