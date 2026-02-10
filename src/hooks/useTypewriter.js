import { useState, useEffect } from 'react'

export const useTypewriter = (titles = [], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  useEffect(() => {
    if (titles.length === 0) return

    const currentTitle = titles[loopNum % titles.length]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, currentIndex + 1))
        setCurrentIndex(prev => prev + 1)

        if (currentIndex === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        setDisplayText(currentTitle.substring(0, currentIndex - 1))
        setCurrentIndex(prev => prev - 1)

        if (currentIndex === 0) {
          setIsDeleting(false)
          setLoopNum(prev => prev + 1)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, loopNum, titles, typingSpeed, deletingSpeed, pauseDuration])

  return displayText
}
