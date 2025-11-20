import { useState, useEffect, useRef, type RefObject } from 'react'

// Hook to track mouse position
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return mousePosition
}

// Hook for intersection observer with animation trigger
export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, { threshold: 0.1, ...options })

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, options])

  return isVisible
}

// Hook for counting animation
export function useCountUp(
  end: number,
  duration: number = 2000,
  start: number = 0,
  isVisible: boolean = true
) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const startValue = start

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = startValue + (end - startValue) * easeOutQuart
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, start, isVisible])

  return count
}

// Hook for parallax effect
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)
  const latestValue = useRef(0)

  useEffect(() => {
    let frame: number | null = null

    const updateOffset = () => {
      const nextValue = window.scrollY * speed

      if (Math.abs(nextValue - latestValue.current) < 0.5) {
        frame = null
        return
      }

      latestValue.current = nextValue
      setOffset(nextValue)
      frame = null
    }

    const handleScroll = () => {
      if (frame !== null) return
      frame = requestAnimationFrame(updateOffset)
    }

    // prime initial value
    updateOffset()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return offset
}

// Hook for magnetic button effect
export function useMagneticEffect(ref: RefObject<HTMLElement | null>, strength: number = 0.3) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      setPosition({ x: deltaX, y: deltaY })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, strength])

  return position
}

// Hook for scroll progress
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.pageYOffset
      const progress = (scrolled / scrollHeight) * 100
      setProgress(progress)
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return progress
}