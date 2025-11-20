import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 8

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const innerCursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<Array<HTMLDivElement | null>>([])

  const [isPointer, setIsPointer] = useState(false)
  const [isTouchOnly, setIsTouchOnly] = useState(false)
  const [isCursorVisible, setIsCursorVisible] = useState(true)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setIsTouchOnly(true)
    }
  }, [])

  useEffect(() => {
    if (isTouchOnly) return

    const cursor = cursorRef.current
    const innerCursor = innerCursorRef.current

    if (!cursor || !innerCursor) return

    const positions = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }))

    let lastX = window.innerWidth / 2
    let lastY = window.innerHeight / 2
    let ticking = false
    let animationFrameId: number | null = null

    const updateCursor = () => {
      cursor.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`
      innerCursor.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`

      positions[0] = { x: lastX, y: lastY }
      for (let i = 1; i < positions.length; i++) {
        const prev = positions[i - 1]
        const current = positions[i]
        positions[i] = {
          x: current.x + (prev.x - current.x) * 0.35,
          y: current.y + (prev.y - current.y) * 0.35
        }
      }

      trailRefs.current.forEach((element, index) => {
        const position = positions[index]
        if (!element || !position) return
        element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
        element.style.opacity = `${Math.max(0, 1 - index * 0.12)}`
      })

      ticking = false
    }

    const handleMouseMove = (event: MouseEvent) => {
      lastX = event.clientX
      lastY = event.clientY

      if (!ticking) {
        ticking = true
        animationFrameId = requestAnimationFrame(updateCursor)
      }

      const target = event.target as HTMLElement | null
      const clickable = Boolean(target?.closest('a, button, input, textarea, select, [role="button"]'))

      setIsPointer(prev => (prev === clickable ? prev : clickable))
    }

    const handleMouseLeave = () => setIsCursorVisible(false)
    const handleMouseEnter = () => setIsCursorVisible(true)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      trailRefs.current = []
    }
  }, [isTouchOnly])

  if (isTouchOnly) return null

  return (
    <>
      {/* Trail particles */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, index) => (
        <div
          key={`cursor-trail-${index}`}
          ref={element => {
            trailRefs.current[index] = element
          }}
          className="fixed pointer-events-none z-[9998] rounded-full bg-accent-cyan/20 transition-opacity duration-300"
          style={{
            width: `${5 - index * 0.4}px`,
            height: `${5 - index * 0.4}px`,
            opacity: 0,
            transform: 'translate3d(-9999px, -9999px, 0)'
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-200 ease-out"
        style={{
          transform: 'translate3d(-9999px, -9999px, 0)',
          opacity: isCursorVisible ? 1 : 0
        }}
      >
        <div
          className={`rounded-full border-2 border-accent-cyan ${
            isPointer ? 'w-12 h-12 bg-accent-cyan/10' : 'w-8 h-8 bg-transparent'
          }`}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={innerCursorRef}
        className="fixed pointer-events-none z-[9999] transition-all duration-150 ease-out"
        style={{
          transform: 'translate3d(-9999px, -9999px, 0)',
          opacity: isCursorVisible ? 1 : 0
        }}
      >
        <div
          className={`rounded-full bg-accent-cyan ${
            isPointer ? 'w-2 h-2' : 'w-1.5 h-1.5'
          }`}
        />
      </div>
    </>
  )
}