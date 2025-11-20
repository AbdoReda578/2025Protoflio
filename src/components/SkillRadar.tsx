import { useEffect, useRef, useState } from 'react'

type SkillData = {
  skill: string
  level: number // 0-100
}

type SkillRadarProps = {
  skills: SkillData[]
  isVisible: boolean
}

export function SkillRadar({ skills, isVisible }: SkillRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const duration = 1500

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      setAnimationProgress(easeOutCubic)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 300
    const center = size / 2
    const maxRadius = size / 2 - 40

    canvas.width = size
    canvas.height = size

    ctx.clearRect(0, 0, size, size)

    // Draw background circles
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(center, center, (maxRadius / 5) * i, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw axes
    const angleStep = (Math.PI * 2) / skills.length
    skills.forEach((_, index) => {
      const angle = angleStep * index - Math.PI / 2
      const x = center + Math.cos(angle) * maxRadius
      const y = center + Math.sin(angle) * maxRadius

      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.lineTo(x, y)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw skill polygon
    ctx.beginPath()
    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2
      const radius = (skill.level / 100) * maxRadius * animationProgress
      const x = center + Math.cos(angle) * radius
      const y = center + Math.sin(angle) * radius

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()
    ctx.fillStyle = 'rgba(0, 217, 255, 0.2)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.8)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw skill points
    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2
      const radius = (skill.level / 100) * maxRadius * animationProgress
      const x = center + Math.cos(angle) * radius
      const y = center + Math.sin(angle) * radius

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#00D9FF'
      ctx.fill()
    })

    // Draw labels
    ctx.font = '12px Inter'
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2
      const labelRadius = maxRadius + 25
      const x = center + Math.cos(angle) * labelRadius
      const y = center + Math.sin(angle) * labelRadius

      ctx.fillText(skill.skill, x, y)
    })
  }, [skills, animationProgress])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  )
}