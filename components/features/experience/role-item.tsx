import { Experience } from 'data/portfolio'
import { formatDate } from 'utils/date'

interface RoleItemProps {
    role: Experience
    isCurrentRole: boolean
    showDateRange: boolean
}

export function RoleItem({ role, isCurrentRole, showDateRange }: RoleItemProps) {
    return (
        <div className="relative" data-name="role-item">
            {/* Role Content */}
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-base text-stone-700 dark:text-stone-300" data-name="role-title">
                            {role.title}
                        </p>
                        {isCurrentRole && (
                            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full transition-all duration-500 
                                bg-emerald-500/10 dark:bg-emerald-400/10 backdrop-blur-md 
                                border border-emerald-500/20 dark:border-emerald-400/20
                                text-emerald-700 dark:text-emerald-300
                                group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-400/20
                                group-hover:border-emerald-500/30 dark:group-hover:border-emerald-400/30
                                group-hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]"
                                data-name="role-badge-current">
                                Current
                            </span>
                        )}
                    </div>
                    {showDateRange && (
                        <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums shrink-0" data-name="role-date-range">
                            <span className="whitespace-nowrap">{formatDate(role.start)}</span>
                            {' - '}
                            <span className="whitespace-nowrap">{role.end ? formatDate(role.end) : 'Present'}</span>
                        </span>
                    )}
                </div>

                <div className="text-neutral-700 dark:text-neutral-300" data-name="role-details">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 font-mono" data-name="role-location">{role.location}</p>
                    {role.description && (
                        <div className="text-sm leading-snug text-stone-600 dark:text-stone-300" data-name="role-description">
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
