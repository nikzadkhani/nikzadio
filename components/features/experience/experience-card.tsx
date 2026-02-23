import { Experience } from "data/portfolio";
import { formatDate } from "utils/date";
import { StoneCard } from "@/ui";
import { RoleItem } from "./role-item";

interface ExperienceCardProps {
  company: string;
  roles: Experience[];
  isLatest?: boolean;
}

export function ExperienceCard({
  company,
  roles,
  isLatest = false,
}: ExperienceCardProps) {
  return (
    <StoneCard
      className="group relative overflow-visible p-6 pr-10"
      intensity="medium"
      data-name="experience-card"
    >
      {/* Company Header */}
      <div className="mb-4 flex flex-col border-b border-stone-200 pb-4 sm:flex-row sm:items-baseline sm:justify-between dark:border-stone-800/50">
        <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100">
          {company}
        </h3>
        {roles.length === 1 && (
          <span className="shrink-0 text-sm text-neutral-600 tabular-nums dark:text-neutral-400">
            <span className="whitespace-nowrap">
              {formatDate(roles[0].start)}
            </span>
            {" - "}
            <span className="whitespace-nowrap">
              {roles[0].end ? formatDate(roles[0].end) : "Present"}
            </span>
          </span>
        )}
      </div>

      {/* Roles Loop */}
      <div className="relative space-y-6">
        {roles.map((role, roleIndex) => (
          <RoleItem
            key={roleIndex}
            role={role}
            isCurrentRole={isLatest && roleIndex === 0}
            showDateRange={roles.length > 1}
          />
        ))}
      </div>
    </StoneCard>
  );
}
