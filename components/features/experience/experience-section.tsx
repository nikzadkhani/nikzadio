import { EXPERIENCE } from 'data/portfolio'
import { ExperienceCard } from './experience-card'


export function Experience() {
    const groupedExperience = EXPERIENCE.reduce((acc, job) => {
        const lastGroup = acc[acc.length - 1]
        if (lastGroup && lastGroup.company === job.company) {
            lastGroup.roles.push(job)
        } else {
            acc.push({
                company: job.company,
                roles: [job],
            })
        }
        return acc
    }, [] as { company: string; roles: typeof EXPERIENCE }[])



    return (
        <section className="mb-4 relative z-10" data-name="experience-section">
            <h2 className="mb-4 text-xl font-semibold tracking-tighter ml-4 text-stone-800 dark:text-stone-200">Experience</h2>

            <div className="flex flex-col gap-4">
                {groupedExperience.map((group, index) => (
                    <div key={index} id={group.company.toLowerCase().replace(/\s+/g, '-')} className="relative scroll-mt-24">
                        <ExperienceCard
                            company={group.company}
                            roles={group.roles}
                            isLatest={index === 0}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
