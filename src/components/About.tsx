import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Award, GitBranch, GraduationCap, Code2, Zap, Trophy } from 'lucide-react'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { useIntersectionObserver } from '@/lib/hooks'
import heroPortrait from '@/assets/hero-profile.jpg'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef)

  const stats = [
    { icon: GitBranch, label: 'GitHub Repositories', value: 10, suffix: '+', decimals: 0, color: 'text-accent-cyan' },
    { icon: GraduationCap, label: 'GPA', value: 3.6, suffix: '', decimals: 1, color: 'text-accent-purple' },
    { icon: Award, label: 'NASA Awards', value: 2, suffix: '', decimals: 0, color: 'text-accent-orange' },
  ]

  const additionalStats = [
    { icon: Code2, label: 'Technologies', value: 25, suffix: '+', color: 'text-accent-cyan' },
    { icon: Zap, label: 'Projects Completed', value: 15, suffix: '+', color: 'text-accent-purple' },
    { icon: Trophy, label: 'Certifications', value: 5, suffix: '+', color: 'text-accent-orange' },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className={`heading-lg text-center mb-16 gradient-text transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan via-accent-purple to-accent-orange rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
              <div className="absolute -inset-1 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-2xl opacity-20" />
              <img 
                src={heroPortrait}
                alt="Abdulrahman Reda portrait"
                className="relative rounded-2xl w-full aspect-square object-cover glass-card transform group-hover:scale-[1.02] transition-transform duration-500"
                style={{ backgroundColor: '#2F3136' }}
              />
              {/* Decorative corner elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-accent-cyan rounded-tl-2xl opacity-60" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-accent-purple rounded-br-2xl opacity-60" />
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="body-lg text-text-secondary leading-relaxed">
              Highly motivated and technically versatile student with a robust foundation in Full-Stack Development 
              (Python, JavaScript, C#, ASP.NET, React.js, Node.js) and Enterprise IT Systems. Proven ability to 
              deliver practical solutions, including configuring LAN networks, managing MySQL/PostgreSQL databases, 
              and developing a strong technical understanding of Odoo ERP.
            </p>
            <p className="body-lg text-text-secondary leading-relaxed">
              Maintains an active GitHub portfolio with 10+ public repositories including AI, backend, and web-based 
              projects. Passionate about leveraging technology to solve real-world problems and continuously learning 
              new skills.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="text-center card-hover group">
                    <CardContent className="pt-6">
                      <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      <div className={`heading-md ${stat.color}`}>
                        <AnimatedCounter 
                          end={stat.value} 
                          decimals={stat.decimals}
                          suffix={stat.suffix}
                          isVisible={isVisible}
                        />
                      </div>
                      <div className="body-sm text-text-muted mt-1">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Additional stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {additionalStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center p-4 glass-card rounded-lg card-hover group">
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      <AnimatedCounter 
                        end={stat.value} 
                        suffix={stat.suffix}
                        isVisible={isVisible}
                      />
                    </div>
                    <div className="body-sm text-text-muted mt-1">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}