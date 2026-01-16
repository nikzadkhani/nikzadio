

import Image from 'next/image'
import { InteractiveSkills } from '@/components/sections/interactive-skills'
import { Offline } from '@/components/sections/offline'


export default function Page() {
  return (
    <section>

      <div className="flex flex-col-reverse md:flex-row justify-between items-start mb-24 mt-20">
        <div className="flex flex-col md:pr-12 max-w-2xl">
          <h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
            Nikzad Khani
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 text-xl max-w-lg">
            {`Senior Full Stack Engineer. Architecting high-performance systems and intuitive interfaces. Specializing in scalable distributed systems and modern frontend frameworks.`}
          </p>
        </div>
        <div className="mb-8 md:mb-0 shrink-0 relative">
          <Image
            src="/me.jpg"
            alt="Nikzad Khani"
            width={150}
            height={150}
            className="rounded-2xl grayscale transition-all duration-500 ease-in-out object-cover border border-neutral-200 dark:border-neutral-800 shadow-sm"
            priority
          />
        </div>
      </div>

      <InteractiveSkills />
      <Offline />
    </section>
  )
}
