import { SKILLS } from 'data/portfolio'

export function Skills() {
    return (
        <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tighter">Technical Skills</h2>
            <div className="space-y-4">
                {Object.entries(SKILLS).map(([category, items]) => (
                    <div key={category} className="flex flex-col space-y-2">
                        <h3 className="font-medium text-lg">{category}</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                            {items.join(', ')}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
