import { Experience } from 'app/components/experience'
import { Education } from 'app/components/education'
import { Publications } from 'app/components/publications'
import { Skills } from 'app/components/skills'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Nikzad Khani
      </h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {`Senior Software Engineer at Verily in Boston, MA. I specialize in building scalable AI-driven applications and robust data pipelines using Go, Python, and cloud-native technologies.`}
      </p>

      <Experience />
      <Education />
      <Publications />
      <Skills />
    </section>
  )
}
