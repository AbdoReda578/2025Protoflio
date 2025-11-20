import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Education } from '@/components/Education'
import { AdditionalSkills } from '@/components/AdditionalSkills'
import { Contact } from '@/components/Contact'
import { CustomCursor } from '@/components/CustomCursor'
import { CustomScrollbar } from '@/components/CustomScrollbar'
import { ParticleSystem } from '@/components/ParticleSystem'

function App() {
  return (
    <div className="scroll-smooth relative">
      <CustomCursor />
      <CustomScrollbar />
      <ParticleSystem />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <AdditionalSkills />
        <Contact />
      </main>
      <footer className="py-8 px-6 bg-bg-secondary/50 text-center relative z-10">
        <p className="body-sm text-text-muted">
          © {new Date().getFullYear()} Abdulrahman Reda Abuzaid. All rights reserved.
        </p>
        <p className="body-sm text-text-muted mt-2">
          Built with React, TypeScript, Tailwind CSS & shadcn/ui
        </p>
      </footer>
    </div>
  )
}

export default App