import { PUBLICATIONS } from 'app/data/portfolio'

export function Publications() {
    return (
        <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tighter">Publications</h2>
            <div className="space-y-4">
                {PUBLICATIONS.map((pub, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                            <h3 className="font-medium text-lg">
                                {pub.link ? (
                                    <a
                                        href={pub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline underline-offset-4"
                                    >
                                        {pub.title}
                                    </a>
                                ) : (
                                    pub.title
                                )}
                            </h3>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums">
                                {pub.date}
                            </span>
                        </div>
                        <div className="text-neutral-700 dark:text-neutral-300">
                            <p className="font-medium text-sm text-neutral-600 dark:text-neutral-400 mb-1">{pub.conference}</p>
                            <p className="text-sm leading-relaxed">{pub.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
