

import Image from 'next/image'
import { InteractiveSkills } from '@/components/sections/interactive-skills'
import { Offline } from '@/components/sections/offline'


export default function Page() {
  return (
    <section>

      <div className="flex flex-col-reverse md:flex-row justify-between items-center mb-16">
        <div className="flex flex-col md:pr-8 max-w-lg">
          <h1 className="mb-6 text-4xl font-serif font-medium tracking-tight text-white text-glow italic">
            Nikzad Khani
          </h1>
          <p className="text-neutral-300 leading-relaxed mb-4 text-lg">
            {`Full Stack Engineer in Boston, MA. I specialize in building scalable AI-driven applications and robust data pipelines using Go, Python, and cloud-native technologies.`}
          </p>
          <p className="text-sm font-mono text-cyan-400">
            B.A. Computer Science, Boston University '21
          </p>
        </div>
        <div className="mb-8 md:mb-0 shrink-0 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Image
            src="/me.jpg"
            alt="Nikzad Khani"
            width={180}
            height={180}
            className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out object-cover shadow-2xl ring-1 ring-white/10 rotate-3 hover:rotate-0"
            priority
          />
        </div>
      </div>

      <InteractiveSkills />
      <Offline />
    </section>
  )
}
