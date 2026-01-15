import { Experience } from 'app/components/experience'
import { Education } from 'app/components/education'
import { Publications } from 'app/components/publications'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Nikzad Khani
      </h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {`Software engineer with a strong background in Go, Python, and cloud-native technologies. 
        Passionate about building efficient, scalable systems and exploring machine learning applications.`}
      </p>

      <Experience />
      <Education />
      <Publications />
    </section>
  )
}
