import { EDUCATION } from 'data/portfolio'
import { GlassCard } from '@/components/ui/glass-card'

export function Education() {
    return (
        <section className="mb-8 relative z-10">
            <h2 className="mb-6 text-xl font-semibold tracking-tighter ml-4 text-stone-800 dark:text-stone-200">Education</h2>
            <div className="space-y-6">
                {EDUCATION.map((edu, index) => (
                    <GlassCard key={index} className="flex flex-col space-y-2 p-8" intensity="high">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                            <h3 className="font-medium text-lg text-stone-900 dark:text-stone-100">{edu.school}</h3>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums whitespace-nowrap shrink-0">
                                {edu.start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                            {edu.degree}
                        </p>
                    </GlassCard>
                ))}
            </div>
        </section>
    )
}
