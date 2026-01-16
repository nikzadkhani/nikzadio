import { EDUCATION } from 'data/portfolio'

export function Education() {
    return (
        <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tighter">Education</h2>
            <div className="space-y-4">
                {EDUCATION.map((edu, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                            <h3 className="font-medium text-lg">{edu.school}</h3>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums">
                                {edu.start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300">
                            {edu.degree}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
