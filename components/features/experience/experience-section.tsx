"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCE } from "data/portfolio";
import { formatDate } from "utils/date";
import { cn } from "@/utils/cn";

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(0); // Default open first

  // Grouping logic
  const groupedExperience = EXPERIENCE.reduce(
    (acc, job) => {
      const lastGroup = acc[acc.length - 1];
      if (lastGroup && lastGroup.company === job.company) {
        lastGroup.roles.push(job);
      } else {
        acc.push({
          company: job.company,
          tagline: job.tagline,
          roles: [job],
        });
      }
      return acc;
    },
    [] as { company: string; tagline?: string; roles: typeof EXPERIENCE }[]
  );

  return (
    <section
      className="mb-32"
      data-name="experience-section"
      id="experience-section"
    >
      <h2 className="mb-12 ml-1 text-sm font-semibold tracking-widest text-stone-900 uppercase dark:text-stone-100">
        Professional History
      </h2>

      <motion.div
        className="flex flex-col"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {groupedExperience.map((group, index) => {
          const isOpen = expanded === index;
          return (
            <div
              key={group.company}
              className="border-t border-stone-200 dark:border-stone-800"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : index)}
                className="group flex w-full items-center justify-between py-6"
              >
                <div className="flex flex-col items-start gap-0.5">
                  <h3
                    className={cn(
                      "text-2xl font-bold tracking-tight transition-colors md:text-3xl",
                      isOpen
                        ? "text-stone-900 dark:text-stone-100"
                        : "text-stone-400 group-hover:text-stone-700 dark:text-stone-600 dark:group-hover:text-stone-400"
                    )}
                  >
                    {group.company}
                  </h3>
                  {group.tagline && (
                    <span className="text-xs text-stone-400 dark:text-stone-600">
                      {group.tagline}
                    </span>
                  )}
                </div>

                <span className="font-mono text-xs tracking-wider text-stone-400 uppercase">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false} mode="wait">
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { type: "spring", stiffness: 350, damping: 35 },
                      opacity: { duration: 0.15 },
                    }}
                    className="overflow-hidden will-change-[height]"
                  >
                    <div className="space-y-8 pb-8">
                      {group.roles.map((role, roleIdx) => (
                        <div key={roleIdx} className="max-w-2xl">
                          <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                            <h4 className="text-lg font-medium text-stone-900 dark:text-stone-100">
                              {role.title}
                            </h4>
                            <span className="font-mono text-xs text-stone-500">
                              {formatDate(role.start)} —{" "}
                              {role.end ? formatDate(role.end) : "Present"}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                            {Array.isArray(role.description) ? (
                              <ul className="ml-4 list-outside list-disc space-y-1 marker:text-stone-300 dark:marker:text-stone-700">
                                {role.description.map((desc, i) => (
                                  <li key={i}>{desc}</li>
                                ))}
                              </ul>
                            ) : (
                              <p>{role.description}</p>
                            )}
                          </div>

                          {role.skills && role.skills.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {role.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded border border-stone-200 px-2 py-0.5 text-[10px] text-stone-500 dark:border-stone-800"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
