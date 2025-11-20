import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Clock, Lightbulb, MessageSquare, FileText, Languages, Heart, Zap } from 'lucide-react'
import { useIntersectionObserver } from '@/lib/hooks'

export function AdditionalSkills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef)

  const softSkills = [
    { icon: Users, label: 'Leadership', color: 'text-accent-cyan' },
    { icon: Heart, label: 'Team Collaboration', color: 'text-accent-purple' },
    { icon: Clock, label: 'Time Management', color: 'text-accent-orange' },
    { icon: Lightbulb, label: 'Self-Learning', color: 'text-accent-cyan' },
    { icon: Zap, label: 'Creativity', color: 'text-accent-purple' },
    { icon: MessageSquare, label: 'Public Speaking', color: 'text-accent-orange' },
    { icon: Users, label: 'Teaching & Mentoring', color: 'text-accent-cyan' },
    { icon: FileText, label: 'Technical Documentation', color: 'text-accent-purple' },
  ]

  const languages = [
    { language: 'Arabic', level: 'Native', percentage: 100 },
    { language: 'English', level: 'Upper-Intermediate (B2)', percentage: 80 },
    { language: 'Spanish', level: 'Basic', percentage: 30 },
  ]

  return (
    <section id="additional-skills" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:py-24 bg-bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <h2
          className={`heading-lg text-center mb-12 sm:mb-16 gradient-text transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Additional Skills
        </h2>

        <div className="grid gap-10 lg:gap-12 lg:grid-cols-2">
          {/* Soft Skills */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="heading-sm mb-4 sm:mb-6 flex items-center gap-2">
              <Lightbulb className="text-accent-cyan" />
              Soft Skills
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {softSkills.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm sm:text-base px-4 py-3 flex items-center justify-between sm:justify-start gap-2 hover:scale-[1.02] transition-transform cursor-default group w-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon size={18} className={`${skill.color} group-hover:scale-110 transition-transform`} />
                    {skill.label}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Languages */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="heading-sm mb-4 sm:mb-6 flex items-center gap-2">
              <Languages className="text-accent-cyan animate-pulse" />
              Languages
            </h3>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <Card key={index} className="card-hover group">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                      <span className="font-semibold text-text-primary group-hover:text-accent-cyan transition-colors text-base sm:text-lg">
                        {lang.language}
                      </span>
                      <Badge variant="secondary" className="body-sm w-fit">{lang.level}</Badge>
                    </div>
                    <div className="h-3 bg-bg-primary rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-orange transition-all duration-1500 relative"
                        style={{ width: isVisible ? `${lang.percentage}%` : '0%' }}
                      >
                        <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs sm:text-sm text-text-muted">
                      <span>{lang.level}</span>
                      <span className="text-sm font-semibold text-accent-cyan">{lang.percentage}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}