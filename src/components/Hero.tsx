import { useState, useEffect } from 'react'
import { MagneticButton } from '@/components/MagneticButton'
import { Github, Linkedin, ChevronDown, Code2, Sparkles, Rocket } from 'lucide-react'
import { useParallax } from '@/lib/hooks'

const HERO_FULL_TEXT =
  'Full-Stack Developer | AI Enthusiast | ERP Technical Specialist | Tech Educator'
export function Hero() {
  const [displayText, setDisplayText] = useState('')
  const parallaxOffset = useParallax(0.3)
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= HERO_FULL_TEXT.length) {
        setDisplayText(HERO_FULL_TEXT.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1608560610603-c7ebd7b0fc05?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2lyY3VpdCUyMGJvYXJkJTIwZGlnaXRhbCUyMG5ldHdvcmslMjBhYnN0cmFjdCUyMHRlY2h8ZW58MHwwfHxibHVlfDE3NjMxMzU0MzZ8MA&ixlib=rb-4.1.0&q=85"
          alt="卡晨 on Unsplash - Abstract technology background"
          className="w-full h-full object-cover opacity-20"
          style={{ 
            transform: `translateY(${parallaxOffset}px)`,
            backgroundColor: '#4059d9'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-bg-primary/60 to-bg-primary" />
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
        <div className="absolute w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-20 h-20 border-2 border-accent-cyan/30 rounded-lg float-animation" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-16 h-16 border-2 border-accent-purple/30 rounded-full float-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-accent-orange/30 rotate-45 float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-20 w-24 h-24 border-2 border-accent-cyan/20 rounded-lg rotate-12 float-animation" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="space-y-8 animate-[fade-in-up_1s_ease-out]">
          {/* Decorative icons */}
          <div className="flex justify-center gap-8 mb-8">
            <Code2 className="w-12 h-12 text-accent-cyan/40 float-animation" style={{ animationDelay: '0s' }} />
            <Sparkles className="w-10 h-10 text-accent-purple/40 float-animation" style={{ animationDelay: '0.5s' }} />
            <Rocket className="w-12 h-12 text-accent-orange/40 float-animation" style={{ animationDelay: '1s' }} />
          </div>

          <h1 className="heading-xl md:text-8xl text-shimmer">
            Abdulrahman Reda Abuzaid
          </h1>
          
          <div className="h-8 md:h-10">
            <p className="body-lg md:text-xl text-text-secondary min-h-[2rem]">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <MagneticButton size="lg" onClick={() => scrollToSection('projects')} strength={0.4}>
              View My Work
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" onClick={() => {
              const link = document.createElement('a')
              link.href = '/cv.pdf'
              link.download = 'Abdulrahman_Reda_CV.pdf'
              link.click()
            }} strength={0.4}>
              Download CV
            </MagneticButton>
            <MagneticButton size="lg" variant="outline" onClick={() => scrollToSection('contact')} strength={0.4}>
              Get In Touch
            </MagneticButton>
          </div>

          <div className="flex gap-6 justify-center pt-8">
            <a 
              href="https://www.linkedin.com/in/abdulrahman-abuzaid-28609b2a2/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-cyan transition-all hover:scale-125 p-3 rounded-full border border-transparent"
            >
              <Linkedin size={32} />
            </a>
            <a 
              href="https://github.com/AbdoReda578" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-cyan transition-all hover:scale-125 p-3 rounded-full border border-transparent"
            >
              <Github size={32} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={40} className="text-accent-cyan" />
        </div>
      </div>
    </section>
  )
}
