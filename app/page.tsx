import { HeroSection } from '@/components/features/hero/hero-section'
import { InteractiveSkills } from '@/components/features/skills/interactive-skills'
import { Experience } from '@/components/features/experience/experience-section'
import { Education } from '@/components/features/education/education-section'
import { Publications } from '@/components/features/publications/publications-section'
import { Footer } from '@/components/layout/footer'

export default function Page() {
  return (
    <div className="space-y-32">
      <HeroSection />

      <div id="skills" className="scroll-mt-32">
        <InteractiveSkills />
      </div>

      <div id="experience" className="scroll-mt-32">
        <Experience />
      </div>

      <div id="education" className="scroll-mt-32">
        <Education />
      </div>

      <div id="publications" className="scroll-mt-32">
        <Publications />
      </div>

      <div id="contact" className="scroll-mt-32">
        <Footer />
      </div>
    </div>
  )
}
