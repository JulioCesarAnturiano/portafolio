import { useEffect, useRef } from 'react'

export const useFullPageScroll = (sections) => {
  const isScrolling = useRef(false)
  const currentIndex = useRef(0)

  useEffect(() => {
    const getSectionIndexFromScroll = () => {
      const probeY = window.scrollY + window.innerHeight * 0.5

      for (let i = 0; i < sections.length; i += 1) {
        const element = document.getElementById(sections[i])
        if (!element) continue

        const top = element.offsetTop
        const bottom = top + element.offsetHeight

        if (probeY >= top && probeY < bottom) {
          return i
        }
      }

      return currentIndex.current
    }

    const handleWheel = (e) => {
      if (isScrolling.current) return

      const sectionIndex = getSectionIndexFromScroll()
      currentIndex.current = sectionIndex

      const currentSection = document.getElementById(sections[sectionIndex])
      if (!currentSection) return

      const threshold = 8
      const sectionTop = currentSection.offsetTop
      const sectionBottom = sectionTop + currentSection.offsetHeight
      const viewportTop = window.scrollY
      const viewportBottom = viewportTop + window.innerHeight
      const direction = e.deltaY > 0 ? 1 : -1

      const canMoveDown = viewportBottom >= sectionBottom - threshold
      const canMoveUp = viewportTop <= sectionTop + threshold

      if ((direction > 0 && !canMoveDown) || (direction < 0 && !canMoveUp)) {
        return
      }

      const newIndex = Math.max(0, Math.min(sections.length - 1, sectionIndex + direction))

      if (newIndex !== sectionIndex) {
        e.preventDefault()
        isScrolling.current = true
        currentIndex.current = newIndex

        const element = document.getElementById(sections[newIndex])
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        setTimeout(() => {
          isScrolling.current = false
        }, 750)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => window.removeEventListener('wheel', handleWheel)
  }, [sections])
}
