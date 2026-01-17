import { EXPERIENCE } from 'data/portfolio'
import { formatDate } from 'utils/date'

export function Experience() {
    return (
        <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tighter">Experience</h2>
            <div className="space-y-6">
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
                    <div key={index} className="flex flex-col space-y-1">
                        {group.jobs.length === 1 ? (
                            <div className="flex flex-col space-y-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                    <h3 className="font-medium text-lg">{group.company}</h3>
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums shrink-0">
                                        <span className="whitespace-nowrap">{formatDate(group.jobs[0].start)}</span>
                                        {' - '}
                                        <span className="whitespace-nowrap">{group.jobs[0].end ? formatDate(group.jobs[0].end) : 'Present'}</span>
                                    </span>
                                </div>
                                <div className="text-neutral-700 dark:text-neutral-300">
                                    <p className="font-medium">{group.jobs[0].title}</p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{group.jobs[0].location}</p>
                                    {group.jobs[0].description && (
                                        <div className="mt-2 text-sm leading-relaxed">
                                            {Array.isArray(group.jobs[0].description) ? (
                                                <ul className="list-disc list-outside ml-4 space-y-1">
                                                    {group.jobs[0].description.map((desc, i) => (
                                                        <li key={i}>{desc}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>{group.jobs[0].description}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <h3 className="font-medium text-lg">{group.company}</h3>
                                {group.jobs.map((job, jobIndex) => (
                                    <div key={jobIndex} className="flex flex-col space-y-1 relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                            <p className="font-medium">{job.title}</p>
                                            <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums shrink-0">
                                                <span className="whitespace-nowrap">{formatDate(job.start)}</span>
                                                {' - '}
                                                <span className="whitespace-nowrap">{job.end ? formatDate(job.end) : 'Present'}</span>
                                            </span>
                                        </div>
                                        <div className="text-neutral-700 dark:text-neutral-300">
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{job.location}</p>
                                            {job.description && (
                                                <div className="mt-2 text-sm leading-relaxed">
                                                    {Array.isArray(job.description) ? (
                                                        <ul className="list-disc list-outside ml-4 space-y-1">
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
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
