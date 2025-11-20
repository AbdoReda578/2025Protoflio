import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Award, Calendar, Star, BookOpen } from 'lucide-react'
import { useIntersectionObserver } from '@/lib/hooks'

export function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef)

  const awards = [
    {
      title: 'Galactic Problem Solver Award',
      organization: 'NASA International Space Apps Challenge',
      year: '2023'
    },
    {
      title: 'Certificate of Appreciation',
      organization: 'NASA Space Apps Cairo Hackathon',
      year: '2022'
    }
  ]

  const certifications = [
    {
      title: 'Responsive Web Design',
      provider: 'Freecodecamp',
      year: '2024',
      details: '300+ hours of training in HTML, CSS, and layout'
    },
    {
      title: 'DOM Fundamentals Certification',
      provider: 'Satr.codes',
      year: '2023',
      details: 'JavaScript DOM manipulation and web interactivity'
    }
  ]

  return (
    <section id="education" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:py-24">
      <div className="container mx-auto max-w-6xl">
        <h2
          className={`heading-lg text-center mb-12 sm:mb-16 gradient-text transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Education & Achievements
        </h2>

        <div className="space-y-12">
          {/* Education */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="overflow-hidden card-hover group relative">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent-purple/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              
              <CardContent className="p-6 sm:p-8 relative z-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                  <div className="p-4 rounded-lg bg-accent-purple/10 group-hover:bg-accent-purple/20 transition-all group-hover:scale-105 duration-300 self-start">
                    <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-accent-purple" />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="heading-sm mb-3 text-balance">High School Diploma – Applied Technology Track</h3>
                    <div className="space-y-3 text-text-secondary">
                      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                        <Calendar size={16} className="text-accent-cyan" />
                        <span className="font-medium">Expected Graduation:</span>
                        <span>2025</span>
                      </div>
                      <div className="grid gap-1 sm:grid-cols-2 sm:gap-3">
                        <div className="body-md">Eva International Applied Technology School (IATS)</div>
                        <div className="body-md sm:text-right text-text-muted">6th of October, Giza</div>
                      </div>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Badge variant="secondary" className="text-sm sm:text-base px-4 py-2">
                          GPA&nbsp;3.6
                        </Badge>
                        <Badge variant="outline" className="text-sm sm:text-base px-4 py-2">
                          Engineering & Computer Science Focus
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Awards */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="heading-sm mb-6 flex items-center gap-3">
              <Star className="text-accent-cyan animate-pulse" />
              Awards & Recognition
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {awards.map((award, index) => (
                <Card key={index} className="group card-hover relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent-cyan/10 group-hover:bg-accent-cyan/20 transition-all group-hover:rotate-12 duration-300">
                        <Award className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-1 text-sm sm:text-base">{award.title}</h4>
                        <p className="body-sm text-text-secondary text-sm sm:text-base">{award.organization}</p>
                        <Badge variant="outline" className="mt-2">{award.year}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="heading-sm mb-6 flex items-center gap-3">
              <BookOpen className="text-accent-purple" />
              Certifications
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {certifications.map((cert, index) => (
                <Card key={index} className="group card-hover relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <h4 className="font-semibold text-text-primary mb-2 text-sm sm:text-base">{cert.title}</h4>
                    <div className="space-y-1 text-text-secondary body-sm text-sm sm:text-base">
                      <p className="text-accent-purple font-medium">{cert.provider}</p>
                      <p>{cert.details}</p>
                      <Badge variant="secondary" className="mt-2 w-fit">{cert.year}</Badge>
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