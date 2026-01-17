import { EXPERIENCE } from 'data/portfolio'
import { formatDate } from 'utils/date'
import { GlassCard } from '@/components/ui/glass-card'

export function Experience() {
    return (
        <section className="mb-8 relative z-10">
            <h2 className="mb-6 text-xl font-semibold tracking-tighter ml-4 text-stone-800 dark:text-stone-200">Experience</h2>
            <div className="space-y-8">
                {EXPERIENCE.reduce((acc, job) => {
                    const lastGroup = acc[acc.length - 1]
                    if (lastGroup && lastGroup.company === job.company) {
                        lastGroup.jobs.push(job)
                    } else {
                        acc.push({
                            company: job.company,
                            jobs: [job],
                        })
                    }
                    return acc
                }, [] as { company: string; jobs: typeof EXPERIENCE }[]).map((group, index) => (
                    <GlassCard key={index} className="p-8 group relative overflow-visible" intensity="high">
                        {/* Company Header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-6 pl-8 relative z-10">
                            <h3 className="font-medium text-lg text-stone-800 dark:text-stone-100">{group.company}</h3>
                            {group.jobs.length === 1 && (
                                <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums shrink-0">
                                    <span className="whitespace-nowrap">{formatDate(group.jobs[0].start)}</span>
                                    {' - '}
                                    <span className="whitespace-nowrap">{group.jobs[0].end ? formatDate(group.jobs[0].end) : 'Present'}</span>
                                </span>
                            )}
                        </div>

                        {/* Luminescent Thread (for the whole group) - Adjusted for card */}
                        <div
                            className="absolute left-[2.75rem] top-[4rem] bottom-8 w-[2px] bg-gradient-to-b from-blue-400 via-purple-500/30 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.5)] group-hover:from-blue-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-700 ease-out origin-top"
                        />

                        {/* Jobs Loop */}
                        <div className="space-y-10 relative">
                            {group.jobs.map((job, jobIndex) => {
                                const isVerily = group.company === 'Verily';
                                const isCurrent = index === 0 && jobIndex === 0;

                                return (
                                    <div key={jobIndex} className="relative pl-8">
                                        {/* Glass Bead Node - adjusted position relative to card padding */}
                                        <div
                                            className={`absolute rounded-full transition-all duration-500 z-20
                                                ${isCurrent
                                                    ? 'left-[1px] top-[5px] w-3 h-3 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse ring-4 ring-cyan-400/20'
                                                    : 'left-[3px] top-[7px] w-2 h-2 bg-stone-300 dark:bg-stone-600 border border-stone-400/30 group-hover:bg-blue-300/50 group-hover:scale-125'
                                                }
                                            `}
                                        />

                                        {/* Job Content */}
                                        <div className="flex flex-col space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                                <p className={`font-medium text-lg ${isCurrent ? 'text-blue-600 dark:text-blue-300' : 'text-stone-700 dark:text-stone-300'}`}>
                                                    {job.title}
                                                </p>
                                                {group.jobs.length > 1 && (
                                                    <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums shrink-0">
                                                        <span className="whitespace-nowrap">{formatDate(job.start)}</span>
                                                        {' - '}
                                                        <span className="whitespace-nowrap">{job.end ? formatDate(job.end) : 'Present'}</span>
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-neutral-700 dark:text-neutral-300">
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 font-mono">{job.location}</p>
                                                {job.description && (
                                                    <div className="text-sm leading-8 text-stone-600 dark:text-stone-300">
                                                        {Array.isArray(job.description) ? (
                                                            <ul className="list-disc list-outside ml-4 space-y-2 marker:text-stone-400">
                                                                {job.description.map((desc, i) => (
                                                                    <li key={i}>{desc}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p>{job.description}</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    )
}
