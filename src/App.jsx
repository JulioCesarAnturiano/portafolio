import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Skills3DCanvas from './components/skills/Skills3DCanvas'
import { skills } from './data/skills'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  // Track active section for keyboard visibility
  useEffect(() => {
    const sections = ['hero', 'skills', 'projects', 'about', 'contact']
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const isSkillsActive = activeSection === 'skills'

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed 3D Keyboard Background */}
      <div 
        className="fixed inset-0 transition-opacity duration-700"
        style={{
          opacity: isSkillsActive ? 1 : 0.3,
          zIndex: isSkillsActive ? 5 : 0,
          pointerEvents: isSkillsActive ? 'auto' : 'none',
        }}
      >
        <Skills3DCanvas skills={skills} />
      </div>

      {/* Very subtle gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          zIndex: isSkillsActive ? 4 : 1,
          background: isSkillsActive 
            ? 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
            : 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
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
