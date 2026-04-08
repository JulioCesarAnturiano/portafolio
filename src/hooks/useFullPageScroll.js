import { useEffect, useRef } from 'react'

export const useFullPageScroll = (sections) => {
  const isScrolling = useRef(false)
  const currentIndex = useRef(0)

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling.current) return
      
      e.preventDefault()
      
      const direction = e.deltaY > 0 ? 1 : -1
      const newIndex = Math.max(0, Math.min(sections.length - 1, currentIndex.current + direction))
      
      if (newIndex !== currentIndex.current) {
        currentIndex.current = newIndex
        isScrolling.current = true
        
        const element = document.getElementById(sections[newIndex])
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        
        setTimeout(() => {
          isScrolling.current = false
        }, 1000)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => window.removeEventListener('wheel', handleWheel)
  }, [sections])
}
