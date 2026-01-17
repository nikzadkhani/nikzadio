import { Experience } from 'data/portfolio'
import { formatDate } from 'utils/date'

interface RoleItemProps {
    role: Experience
    isCurrentRole: boolean
    showDateRange: boolean
}

export function RoleItem({ role, isCurrentRole, showDateRange }: RoleItemProps) {
    return (
        <div className="relative">
            {/* Role Content */}
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <p className={`font-medium text-base ${isCurrentRole ? 'text-blue-600 dark:text-blue-300' : 'text-stone-700 dark:text-stone-300'}`}>
                        {role.title}
                    </p>
                    {showDateRange && (
                        <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums shrink-0">
                            <span className="whitespace-nowrap">{formatDate(role.start)}</span>
                            {' - '}
                            <span className="whitespace-nowrap">{role.end ? formatDate(role.end) : 'Present'}</span>
                        </span>
                    )}
                </div>

                <div className="text-neutral-700 dark:text-neutral-300">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 font-mono">{role.location}</p>
                    {role.description && (
                        <div className="text-sm leading-snug text-stone-600 dark:text-stone-300">
                            {Array.isArray(role.description) ? (
                                <ul className="list-disc list-outside ml-4 space-y-1 marker:text-stone-400">
                                    {role.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{role.description}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
