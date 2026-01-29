"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCE } from "data/portfolio";
import { formatDate } from "utils/date";

export function Experience() {
    const [expanded, setExpanded] = useState<number | null>(0); // Default open first

    // Grouping logic
    const groupedExperience = EXPERIENCE.reduce((acc, job) => {
        const lastGroup = acc[acc.length - 1];
        if (lastGroup && lastGroup.company === job.company) {
            lastGroup.roles.push(job);
        } else {
            acc.push({
                company: job.company,
                roles: [job],
            });
        }
        return acc;
    }, [] as { company: string; roles: typeof EXPERIENCE }[]);

    return (
        <section className="mb-32" data-name="experience-section" id="experience-section">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-12 ml-1">Professional History</h2>

            <div className="flex flex-col">
                {groupedExperience.map((group, index) => {
                    const isOpen = expanded === index;
                    return (
                        <div key={group.company} className="border-t border-stone-200 dark:border-stone-800">
                            <button
                                onClick={() => setExpanded(isOpen ? null : index)}
                                className="w-full text-left py-5 group transition-colors"
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                                    <h3
                                        className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-100'}`}
                                    >
                                        {group.company}
                                    </h3>
                                    <span className="font-mono text-sm text-stone-400">
                                        {/* Date range of the first role to last role in group? Simplified to just 'Experience' label or open indicator */}
                                        {isOpen ? 'Close' : 'View Roles'}
                                    </span>
                                </div>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-12 pt-2 md:pl-2">
                                            {group.roles.map((role, roleIdx) => (
                                                <div key={roleIdx} className="mb-12 last:mb-0 max-w-2xl text-lg">
                                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                                                        <h4 className="font-medium text-xl text-stone-900 dark:text-stone-100">{role.title}</h4>
                                                        <span className="font-mono text-xs text-stone-500 whitespace-nowrap pt-1 md:pt-0">
                                                            {formatDate(role.start)} — {role.end ? formatDate(role.end) : 'Present'}
                                                        </span>
                                                    </div>

                                                    <div className="text-stone-600 dark:text-stone-400 leading-relaxed space-y-4">
                                                        {Array.isArray(role.description) ? (
                                                            role.description.map((desc, i) => <p key={i}>{desc}</p>)
                                                        ) : (
                                                            <p>{role.description}</p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-wrap gap-2 mt-6">
                                                        {role.skills?.map(skill => (
                                                            <span key={skill} className="text-xs px-2 py-1 rounded border border-stone-200 dark:border-stone-800 text-stone-500">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
