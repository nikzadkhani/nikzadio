import { Experience } from 'data/portfolio'
import { formatDate } from 'utils/date'
import { GlassCard } from '@/components/ui/glass-card'
import { RoleItem } from './role-item'

interface ExperienceCardProps {
    company: string
    roles: Experience[]
    isLatest?: boolean
}

export function ExperienceCard({ company, roles, isLatest = false }: ExperienceCardProps) {
    return (
        <GlassCard className="p-6 pr-10 group relative overflow-visible" intensity="high" data-name="experience-card">
            {/* Company Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-4 border-b border-stone-200 dark:border-stone-800/50 pb-4">
                <h3 className="font-medium text-lg text-stone-900 dark:text-stone-100">{company}</h3>
                {roles.length === 1 && (
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums shrink-0">
                        <span className="whitespace-nowrap">{formatDate(roles[0].start)}</span>
                        {' - '}
                        <span className="whitespace-nowrap">{roles[0].end ? formatDate(roles[0].end) : 'Present'}</span>
                    </span>
                )}
            </div>

            {/* Roles Loop */}
            <div className="space-y-6 relative">
                {roles.map((role, roleIndex) => (
                    <RoleItem
                        key={roleIndex}
                        role={role}
                        isCurrentRole={isLatest && roleIndex === 0}
                        showDateRange={roles.length > 1}
                    />
                ))}
            </div>
        </GlassCard>
    )
}
