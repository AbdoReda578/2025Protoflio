import { useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Server, Users, Brain, Eye } from 'lucide-react'
import { useIntersectionObserver } from '@/lib/hooks'

type Project = {
  title: string
  organization: string
  type: string
  duration?: string
  icon: typeof Server
  highlights: string[]
  link?: string
  size: 'large' | 'medium' | 'small'
  image?: string
  imageAlt?: string
  imageBg?: string
  technologies?: string[]
}

const projects: Project[] = [
  {
    title: 'POS System Installation & Network Configuration',
    organization: 'Al-Matam Al-Arabi, Nasr City, Egypt',
    type: 'Technical Project',
    icon: Server,
    highlights: [
      'Engineered and implemented complete cashier (POS) system using local server setup (100% operational readiness)',
      'Configured and integrated 4 network printers via dedicated switch',
      'Managed database integration using local MySQL server for secure billing and order processing',
      'Executed system troubleshooting and device integration under real-world constraints'
    ],
    size: 'large',
    image: 'https://images.pexels.com/photos/12935047/pexels-photo-12935047.jpeg',
    imageAlt: 'iMin Technology on Pexels - Point of sale system',
    imageBg: '#7C7968',
    technologies: ['MySQL', 'Network Config', 'Hardware Setup', 'POS Systems']
  },
  {
    title: 'Nova Technology - Co-Founder & Instructor',
    organization: 'Giza, Egypt',
    type: 'Educational Initiative',
    duration: 'July 2023 – Present',
    icon: Users,
    highlights: [
      'Co-founded youth tech education initiative',
      'Designed beginner-level programming curricula (C++ Basics, Scratch) for Egypt and UAE',
      'Mentored students through interactive, project-based teaching methods'
    ],
    size: 'medium',
    image: 'https://images.unsplash.com/photo-1743834147172-37c12011b321?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxlZHVjYXRpb24lMjBwcm9ncmFtbWluZyUyMGNsYXNzJTIwc3R1ZGVudHMlMjB0ZWNobm9sb2d5JTIwbGVhcm5pbmd8ZW58MHwwfHx8MTc2MzEzNTQzNnww&ixlib=rb-4.1.0&q=85',
    imageAlt: 'Gaurav Tiwari on Unsplash - Online education platform',
    imageBg: '#f3f3f3',
    technologies: ['C++', 'Scratch', 'Teaching', 'Curriculum Design']
  },
  {
    title: 'AI & Automation Projects (COA & Echoo)',
    organization: 'Personal Projects',
    type: 'GitHub Portfolio',
    icon: Brain,
    highlights: [
      'Developing two advanced AI-driven applications focused on automation and intelligent interactions',
      'Engineered robust backend integrations and optimized RESTful API handling',
      'Actively using Git branching, pull requests, and maintaining professional public code portfolio'
    ],
    link: 'https://abdoreda.github.io/testprotofolio/',
    size: 'medium',
    image: 'https://images.pexels.com/photos/8728291/pexels-photo-8728291.jpeg',
    imageAlt: 'Michelangelo Buonarroti on Pexels - Artificial intelligence visualization',
    imageBg: '#A872EC',
    technologies: ['Python', 'AI/ML', 'REST API', 'Git', 'Automation']
  }
]

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef)

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 bg-bg-secondary/50">
      <div className="container mx-auto max-w-7xl">
        <h2 className={`heading-lg text-center mb-16 gradient-text transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Experience & Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((project, index) => {
            const Icon = project.icon
            const colSpan = project.size === 'large' ? 'md:col-span-2' : project.size === 'medium' ? 'md:col-span-1' : 'md:col-span-1'
            const isHovered = hoveredProject === index
            
            return (
              <Card 
                key={index}
                className={`${colSpan} transition-all duration-1000 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group overflow-hidden card-hover`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                {project.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.imageAlt}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundColor: project.imageBg }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent opacity-80" />
                    <div className="absolute top-4 right-4 p-3 rounded-lg bg-accent-cyan/10 backdrop-blur-sm">
                      <Icon className="w-8 h-8 text-accent-cyan" />
                    </div>
                    {isHovered && (
                      <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm animate-[fade-in-up_0.3s_ease-out]">
                        <Eye className="w-12 h-12 text-accent-cyan animate-pulse" />
                      </div>
                    )}
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-accent-cyan transition-colors">{project.title}</CardTitle>
                    {project.link && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => window.open(project.link, '_blank')}
                        className="hover:bg-accent-cyan/20"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  <CardDescription>
                    <div className="space-y-1">
                      <div className="text-accent-cyan font-medium">{project.organization}</div>
                      <div className="text-text-muted">{project.type}</div>
                      {project.duration && <div className="text-text-muted text-sm">{project.duration}</div>}
                    </div>
                  </CardDescription>

                  {/* Technologies */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="body-sm text-text-secondary flex gap-2 group-hover:text-text-primary transition-colors">
                        <span className="text-accent-cyan mt-1 flex-shrink-0">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}