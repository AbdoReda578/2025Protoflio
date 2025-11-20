import { useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

export function CustomScrollbar() {
  const [progress, setProgress] = useState(0)
  const [isPointerFine, setIsPointerFine] = useState(true)
  const docHeightRef = useRef(1)
  const tickingRef = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    const handleMediaChange = () => {
      setIsPointerFine(mediaQuery.matches)
    }
    handleMediaChange()
    mediaQuery.addEventListener('change', handleMediaChange)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (!isPointerFine) return

    const updateMetrics = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      docHeightRef.current = Math.max(docHeight, 1)
      setProgress(window.scrollY / docHeightRef.current)
    }

    const handleScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(() => {
        setProgress(window.scrollY / docHeightRef.current)
        tickingRef.current = false
      })
    }

    updateMetrics()
    window.addEventListener('resize', updateMetrics)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', updateMetrics)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isPointerFine])

  if (!isPointerFine) return null

  const handleTrackClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const clickRatio = (event.clientY - rect.top) / rect.height
    const targetScroll = clickRatio * docHeightRef.current
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  const indicatorHeight = `${Math.max(6, progress * 100)}%`

  return (
    <div
      className="fixed right-6 top-1/2 hidden h-[55vh] w-3 -translate-y-1/2 select-none items-center justify-center lg:flex"
      style={{ zIndex: 60 }}
    >
      <div
        className="relative h-full w-1.5 cursor-pointer rounded-full bg-white/10 backdrop-blur"
        onClick={handleTrackClick}
      >
        <div
          className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-cyan shadow-[0_0_12px_rgba(0,217,255,0.35)] transition-all duration-200"
          style={{
            height: indicatorHeight
          }}
        />
      </div>
    </div>
  )
}

