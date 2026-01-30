import { HeroSection } from '@/features/hero'
import { InteractiveSkills } from '@/features/skills'
import { ExperienceSection } from '@/features/experience'
import { EducationSection } from '@/features/education'
import { PublicationsSection } from '@/features/publications'
import { Footer } from '@/layout'

export default function Page() {
  return (
    <div className="space-y-32">
      <HeroSection />

      <div id="skills" className="scroll-mt-32">
        <InteractiveSkills />
      </div>

      <div id="experience" className="scroll-mt-32">
        <ExperienceSection />
      </div>

      <div id="education" className="scroll-mt-32">
        <EducationSection />
      </div>

      <div id="publications" className="scroll-mt-32">
        <PublicationsSection />
      </div>

      <div id="contact" className="scroll-mt-32">
        <Footer />
      </div>
    </div>
  )
}
