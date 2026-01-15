import { EXPERIENCE } from 'app/data/portfolio'

export function Experience() {
    return (
        <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tighter">Experience</h2>
            <div className="space-y-6">
                {EXPERIENCE.map((job, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                            <h3 className="font-medium text-lg">{job.company}</h3>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums">
                                {job.period}
                            </span>
                        </div>
                        <div className="text-neutral-700 dark:text-neutral-300">
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{job.location}</p>
                            {job.description && (
                                <p className="mt-2 text-sm leading-relaxed">{job.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
