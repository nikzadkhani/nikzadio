import { PUBLICATIONS } from 'data/portfolio'
import { formatDate } from 'utils/date'
import { GlassCard } from '@/components/ui/glass-card'

export function Publications() {
    return (
        <section className="mb-16 relative z-10" data-name="publications-section">
            <h2 className="mb-6 text-xl font-semibold tracking-tighter ml-4 text-stone-800 dark:text-stone-200">Publications</h2>
            <div className="space-y-6">
                {PUBLICATIONS.map((pub, index) => (
                    <GlassCard key={index} className="flex flex-col space-y-3 p-8 pr-12" intensity="high" data-name="publication-card">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                            <h3 className="font-medium text-lg text-stone-900 dark:text-stone-100">
                                {pub.link ? (
                                    <a
                                        href={pub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-500 transition-colors"
                                    >
                                        {pub.title}
                                    </a>
                                ) : (
                                    pub.title
                                )}
                            </h3>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums whitespace-nowrap shrink-0">
                                {formatDate(pub.date)}
                            </span>
                        </div>
                        <div className="text-neutral-700 dark:text-neutral-300">
                            <p className="font-medium text-sm text-blue-600 dark:text-blue-400 mb-2">{pub.conference}</p>
                            <div className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                                {Array.isArray(pub.description) ? (
                                    <ul className="list-disc list-outside ml-4 space-y-2">
                                        {pub.description.map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>{pub.description}</p>
                                )}
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    )
}
