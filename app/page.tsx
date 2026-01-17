

import Image from 'next/image'
import { GlassCard } from '@/components/ui/glass-card'
import { InteractiveSkills } from '@/components/sections/interactive-skills'
import { Offline } from '@/components/sections/offline'


export default function Page() {
  return (
    <section>

      <GlassCard intensity="low" className="p-8 mb-12 flex flex-col-reverse md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col max-w-lg">
          <h1 className="mb-6 text-5xl font-serif font-medium tracking-tight text-black dark:text-white italic">
            Nikzad Khani
          </h1>
          <p className="text-stone-800 dark:text-stone-200 leading-relaxed mb-4 text-lg">
            {`Full Stack Engineer in Boston, MA. I specialize in building scalable AI-driven applications and robust data pipelines using Go, Python, and cloud-native technologies.`}
          </p>
          <p className="text-sm font-mono text-stone-600 dark:text-stone-400">
            B.A. Computer Science, Boston University '21
          </p>
        </div>
        <div className="shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-50 dark:opacity-70 animate-pulse" />
          <Image
            src="/me.jpg"
            alt="Nikzad Khani"
            width={180}
            height={180}
            className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out object-cover shadow-2xl rotate-3 hover:rotate-0 border-2 border-white/20"
            priority
          />
        </div>
      </GlassCard>

      <InteractiveSkills />
      <Offline />
    </section>
  )
}
