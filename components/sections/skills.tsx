import { SKILLS } from 'data/portfolio'

export function Skills() {
    return (
        <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tighter">Technical Skills</h2>
            <div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {Array.from(new Set(Object.values(SKILLS).flat())).join(', ')}
                </p>
            </div>
        </section>
    )
}
