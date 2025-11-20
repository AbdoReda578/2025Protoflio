import { useMemo, useRef, useState } from 'react'
import { Code2, Sparkles } from 'lucide-react'
import { SkillRadar } from '@/components/SkillRadar'
import { useIntersectionObserver } from '@/lib/hooks'
import { LogoLoop } from '@/components/LogoLoop'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiSharp,
  SiHtml5,
  SiCss3,
  SiC,
  SiCplusplus,
  SiPhp,
  SiGnubash,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiDotnet,
  SiFlutter,
  SiBootstrap,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiFigma,
  SiAdobexd,
  SiWebflow,
  SiPycharm,
  SiPostman,
  SiArduino
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { Coffee } from 'lucide-react'

type SkillLogo = {
  node: React.ReactNode
  title: string
  ariaLabel: string
}

// Map all skills to their corresponding logos
const skillLogos: SkillLogo[] = [
  { node: <SiPython />, title: 'Python', ariaLabel: 'Python programming language' },
  { node: <SiJavascript />, title: 'JavaScript', ariaLabel: 'JavaScript programming language' },
  { node: <SiTypescript />, title: 'TypeScript', ariaLabel: 'TypeScript programming language' },
  { node: <SiSharp />, title: 'C#', ariaLabel: 'C# programming language' },
  { node: <SiHtml5 />, title: 'HTML', ariaLabel: 'HTML markup language' },
  { node: <SiCss3 />, title: 'CSS', ariaLabel: 'CSS styling language' },
  { node: <SiC />, title: 'C', ariaLabel: 'C programming language' },
  { node: <SiCplusplus />, title: 'C++', ariaLabel: 'C++ programming language' },
  { node: <SiPhp />, title: 'PHP', ariaLabel: 'PHP programming language' },
  { node: <Coffee />, title: 'Java', ariaLabel: 'Java programming language' },
  { node: <SiGnubash />, title: 'Bash', ariaLabel: 'Bash scripting language' },
  { node: <SiReact />, title: 'React.js', ariaLabel: 'React JavaScript library' },
  { node: <SiNodedotjs />, title: 'Node.js', ariaLabel: 'Node.js runtime' },
  { node: <SiExpress />, title: 'Express.js', ariaLabel: 'Express.js framework' },
  { node: <SiDotnet />, title: 'ASP.NET', ariaLabel: 'ASP.NET framework' },
  { node: <SiDotnet />, title: 'WPF', ariaLabel: 'WPF framework' },
  { node: <SiFlutter />, title: 'Flutter', ariaLabel: 'Flutter framework' },
  { node: <SiBootstrap />, title: 'Bootstrap', ariaLabel: 'Bootstrap CSS framework' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', ariaLabel: 'Tailwind CSS framework' },
  { node: <SiMysql />, title: 'MySQL', ariaLabel: 'MySQL database' },
  { node: <SiPostgresql />, title: 'PostgreSQL', ariaLabel: 'PostgreSQL database' },
  { node: <SiMongodb />, title: 'MongoDB', ariaLabel: 'MongoDB database' },
  { node: <SiFirebase />, title: 'Firebase', ariaLabel: 'Firebase platform' },
  { node: <VscVscode />, title: 'VS Code', ariaLabel: 'Visual Studio Code editor' },
  { node: <SiPycharm />, title: 'PyCharm', ariaLabel: 'PyCharm IDE' },
  { node: <SiPostman />, title: 'Postman', ariaLabel: 'Postman API tool' },
  { node: <SiArduino />, title: 'Arduino IDE', ariaLabel: 'Arduino IDE' },
  { node: <SiGit />, title: 'Git', ariaLabel: 'Git version control' },
  { node: <SiGithub />, title: 'GitHub', ariaLabel: 'GitHub platform' },
  { node: <SiFigma />, title: 'Figma', ariaLabel: 'Figma design tool' },
  { node: <SiAdobexd />, title: 'Adobe XD', ariaLabel: 'Adobe XD design tool' },
  { node: <SiWebflow />, title: 'Webflow', ariaLabel: 'Webflow design platform' }
]

export function Skills() {
  const [showRadar, setShowRadar] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef)

  // Memoize skill items with styled icon wrapper
  const skillLoopItems = useMemo(
    () =>
      skillLogos.map((skill) => ({
        node: (
          <div className="flex items-center justify-center w-16 h-16 text-4xl transition-colors duration-300 hover:text-accent-cyan">
            {skill.node}
          </div>
        ),
        title: skill.title,
        ariaLabel: skill.ariaLabel
      })),
    []
  )

  const topSkills = useMemo(
    () => [
      { skill: 'React', level: 90 },
      { skill: 'Python', level: 85 },
      { skill: 'Node.js', level: 80 },
      { skill: 'TypeScript', level: 85 },
      { skill: 'Database', level: 75 },
      { skill: 'UI/UX', level: 80 }
    ],
    []
  )

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2
          className={`heading-lg text-center mb-8 gradient-text transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Technical Skills
        </h2>

        {/* Toggle view buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setShowRadar(false)}
            className={`px-6 py-2 rounded-full transition-all ${
              !showRadar
                ? 'bg-accent-cyan text-bg-primary'
                : 'glass-card text-text-secondary hover:text-accent-cyan'
            }`}
          >
            <Sparkles className="inline w-4 h-4 mr-2" />
            All Skills
          </button>
          <button
            onClick={() => setShowRadar(true)}
            className={`px-6 py-2 rounded-full transition-all ${
              showRadar
                ? 'bg-accent-cyan text-bg-primary'
                : 'glass-card text-text-secondary hover:text-accent-cyan'
            }`}
          >
            <Code2 className="inline w-4 h-4 mr-2" />
            Skill Radar
          </button>
        </div>

        {!showRadar ? (
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="space-y-8 py-6">
              <LogoLoop
                logos={skillLoopItems}
                direction="right"
                speed={100}
                gap={48}
                logoHeight={64}
                scaleOnHover
                hoverSpeed={20}
                ariaLabel="Scrolling list of technical skills"
                className="w-full"
              />
              <LogoLoop
                logos={skillLoopItems.slice().reverse()}
                direction="left"
                speed={80}
                gap={48}
                logoHeight={64}
                scaleOnHover
                hoverSpeed={20}
                ariaLabel="Scrolling list of technical skills mirrored"
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <div
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          >
            <SkillRadar skills={topSkills} isVisible={isVisible} />
            <p className="text-center text-text-muted mt-6 body-sm">
              Interactive visualization of top technical skills
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
