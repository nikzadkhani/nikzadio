

import Image from 'next/image'
import { GlassCard } from '@/components/ui/glass-card'
import { InteractiveSkills } from '@/components/sections/interactive-skills'
import { Offline } from '@/components/sections/offline'


export default function Page() {
  return (
    <section>

      <GlassCard
        intensity="low"
        className="relative overflow-visible p-8 pt-32 md:pt-12 md:pr-48 flex flex-col md:flex-row items-center md:items-start gap-8 mb-12"
      >
        <div className="flex flex-col max-w-lg relative z-10 text-center md:text-left">
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

        {/* Floating Identity: Top-Center on Mobile, Top-Right Layout on Desktop */}
        <div className="absolute top-0 left-1/2 md:left-auto md:right-8 -translate-x-1/2 md:translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-[2rem] blur-xl opacity-50 dark:opacity-70 animate-pulse delay-1000" />
          <Image
            src="/me.jpg"
            alt="Nikzad Khani"
            fill
            className="rounded-[2rem] transition-all duration-700 ease-in-out object-cover shadow-2xl border-4 border-white/10 ring-1 ring-white/20"
            priority
          />
        </div>
      </GlassCard>

      <InteractiveSkills />
      <Offline />
    </section>
  )
}
