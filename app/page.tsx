

import Image from 'next/image'
import { InteractiveSkills } from '@/components/sections/interactive-skills'
import { Offline } from '@/components/sections/offline'


export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nikzad Khani',
    jobTitle: 'Senior Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Verily',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Boston University',
    },
    url: 'https://nikzad.io',
    sameAs: ['https://github.com/nikzadkhani'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Boston',
      addressRegion: 'MA',
      addressCountry: 'US',
    },
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col-reverse md:flex-row justify-between items-center mb-12">
        <div className="flex flex-col md:pr-8 max-w-lg">
          <h1 className="mb-6 text-4xl font-serif font-medium tracking-tight text-stone-900 dark:text-stone-100 italic">
            Nikzad Khani
          </h1>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4 text-lg">
            {`Full Stack Engineer in Boston, MA. I specialize in building scalable AI-driven applications and robust data pipelines using Go, Python, and cloud-native technologies.`}
          </p>
          <p className="text-sm font-mono text-sage-700 dark:text-sage-400">
            B.A. Computer Science, Boston University '21
          </p>
        </div>
        <div className="mb-8 md:mb-0 shrink-0 relative">
          <Image
            src="/me.jpg"
            alt="Nikzad Khani"
            width={180}
            height={180}
            className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out object-cover shadow-xl rotate-3 hover:rotate-0"
            priority
          />
        </div>
      </div>

      <InteractiveSkills />
      <Offline />
    </section>
  )
}
