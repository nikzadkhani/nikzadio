import { Experience } from '@/components/sections/experience'
import { Education } from '@/components/sections/education'
import { Publications } from '@/components/sections/publications'
import type { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'

export const metadata: Metadata = {
    title: 'Resume',
    description: 'My professional experience and skills.',
}

export default function ResumePage() {
    return (
        <section className="space-y-8 pb-20">
            <GlassCard className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white mb-2">
                        Nikzad Khani
                    </h1>
                    <p className="text-stone-600 dark:text-stone-300 font-medium">
                        Senior Software Engineer at Verily
                    </p>
                </div>

                <a
                    href="/Nikzad-Khani-Resume.pdf"
                    download
                    className="inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-full text-white bg-black hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    <svg
                        className="-ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                </a>
            </GlassCard>

            <GlassCard intensity="low" className="p-8">
                <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-serif italic">
                    Senior Software Engineer at Verily in Boston, MA. I specialize in building scalable AI-driven applications and robust data pipelines using Go, Python, and cloud-native technologies.
                </p>
            </GlassCard>

            <div className="grid grid-cols-1 gap-8">
                <GlassCard className="p-8">
                    <Experience />
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="p-8">
                        <Education />
                    </GlassCard>
                    <GlassCard className="p-8">
                        <Publications />
                    </GlassCard>
                </div>
            </div>
        </section>
    )
}
