"use client";

import { Experience } from '@/components/sections/experience'
import { Education } from '@/components/sections/education'
import { Publications } from '@/components/sections/publications'
import { GlassCard } from '@/components/ui/glass-card'
import { motion } from 'framer-motion'

export default function ResumePage() {
    return (
        <section className="space-y-8 pb-20">
            <GlassCard className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/70 dark:bg-black/70">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white mb-2">
                        Nikzad Khani
                    </h1>
                    <p className="text-stone-600 dark:text-stone-300 font-medium">
                        Senior Software Engineer at Verily
                    </p>
                </div>
            </GlassCard>

            <motion.a
                href="/Nikzad-Khani-Resume.pdf"
                download
                className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.05),inset_4px_4px_8px_rgba(255,255,255,0.6),0_12px_32px_rgba(0,0,0,0.15)] hover:scale-110 active:scale-95 transition-all group"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                title="Download Resume PDF"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-50 rounded-full blur-[2px]" />
                <svg
                    className="h-6 w-6 text-black dark:text-white relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </motion.a>

            <GlassCard intensity="low" className="p-8">
                <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-serif italic">
                    Senior Software Engineer at Verily in Boston, MA. I specialize in building scalable AI-driven applications and robust data pipelines using Go, Python, and cloud-native technologies.
                </p>
            </GlassCard>

            <div className="grid grid-cols-1 gap-16">
                <Experience />
                <Education />
                <Publications />
            </div>
        </section>
    )
}
