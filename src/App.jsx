import { useState, useEffect, useRef } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import PersistentKeyboard from './components/skills/PersistentKeyboard'
import { skills } from './data/skills'
import { useFullPageScroll } from './hooks/useFullPageScroll'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const sections = ['hero', 'skills', 'projects', 'about', 'contact']
  
  // Full page scroll like slideshow
  useFullPageScroll(sections)

  // Track active section with improved scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== sectionId) {
              setActiveSection(sectionId)
            }
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* PERSISTENT 3D KEYBOARD - Always visible, transforms per section */}
      <PersistentKeyboard skills={skills} activeSection={activeSection} />

      {/* Dark overlay that adjusts per section */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-1000"
        style={{
          zIndex: 2,
          background: activeSection === 'skills' 
            ? 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)'
            : 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      
      {/* Navbar - always on top */}
      <div className="relative" style={{ zIndex: 50 }}>
        <Navbar />
      </div>

      {/* Main content - layered above keyboard when not in skills */}
      <div 
        className="relative transition-all duration-500"
        style={{ 
          zIndex: activeSection === 'skills' ? 3 : 10,
          pointerEvents: activeSection === 'skills' ? 'none' : 'auto',
        }}
      >
        <main>
          <Hero />
          <Skills />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
