import { Experience } from "data/portfolio";
import { formatDate } from "utils/date";

interface RoleItemProps {
  role: Experience;
  isCurrentRole: boolean;
  showDateRange: boolean;
}

export function RoleItem({
  role,
  isCurrentRole,
  showDateRange,
}: RoleItemProps) {
  return (
    <div className="relative" data-name="role-item">
      {/* Role Content */}
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex items-center gap-2">
            <p
              className="text-base font-medium text-stone-700 dark:text-stone-300"
              data-name="role-title"
            >
              {role.title}
            </p>
            {isCurrentRole && (
              <span
                className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-700 uppercase transition-all duration-500 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:group-hover:border-emerald-400/30 dark:group-hover:bg-emerald-400/20"
                data-name="role-badge-current"
              >
                Current
              </span>
            )}
          </div>
          {showDateRange && (
            <span
              className="shrink-0 text-sm text-neutral-600 tabular-nums dark:text-neutral-400"
              data-name="role-date-range"
            >
              <span className="whitespace-nowrap">
                {formatDate(role.start)}
              </span>
              {" - "}
              <span className="whitespace-nowrap">
                {role.end ? formatDate(role.end) : "Present"}
              </span>
            </span>
          )}
        </div>

        <div
          className="text-neutral-700 dark:text-neutral-300"
          data-name="role-details"
        >
          <p
            className="mb-2 font-mono text-sm text-neutral-500 dark:text-neutral-400"
            data-name="role-location"
          >
            {role.location}
          </p>
          {role.description && (
            <div
              className="text-sm leading-snug text-stone-600 dark:text-stone-300"
              data-name="role-description"
            >
              {Array.isArray(role.description) ? (
                <ul className="ml-4 list-outside list-disc space-y-1 marker:text-stone-400">
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
  );
}
