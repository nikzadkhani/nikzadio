"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCE } from "data/portfolio";
import { formatDate } from "utils/date";
import { cn } from "@/utils/cn";

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

            <motion.div
                className="flex flex-col"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {groupedExperience.map((group, index) => {
                    const isOpen = expanded === index;
                    return (
                        <div key={group.company} className="border-t border-stone-200 dark:border-stone-800">
                            <button
                                onClick={() => setExpanded(isOpen ? null : index)}
                                className="w-full flex items-center justify-between py-6 group"
                            >
                                <h3 className={cn(
                                    "text-2xl md:text-3xl font-bold tracking-tight transition-colors",
                                    isOpen
                                        ? "text-stone-900 dark:text-stone-100"
                                        : "text-stone-400 dark:text-stone-600 group-hover:text-stone-700 dark:group-hover:text-stone-400"
                                )}>
                                    {group.company}
                                </h3>

                                <span className="text-xs text-stone-400 font-mono uppercase tracking-wider">
                                    {isOpen ? '−' : '+'}
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
                                            opacity: { duration: 0.15 }
                                        }}
                                        className="overflow-hidden will-change-[height]"
                                    >
                                        <div className="pb-8 space-y-8">
                                            {group.roles.map((role, roleIdx) => (
                                                <div key={roleIdx} className="max-w-2xl">
                                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-3 gap-2">
                                                        <h4 className="font-medium text-lg text-stone-900 dark:text-stone-100">
                                                            {role.title}
                                                        </h4>
                                                        <span className="text-xs text-stone-500 font-mono">
                                                            {formatDate(role.start)} — {role.end ? formatDate(role.end) : 'Present'}
                                                        </span>
                                                    </div>

                                                    <div className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed space-y-2">
                                                        {Array.isArray(role.description) ? (
                                                            <ul className="list-disc list-outside ml-4 space-y-1 marker:text-stone-300 dark:marker:text-stone-700">
                                                                {role.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                                            </ul>
                                                        ) : (
                                                            <p>{role.description}</p>
                                                        )}
                                                    </div>

                                                    {role.skills && role.skills.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5 mt-4">
                                                            {role.skills.map(skill => (
                                                                <span key={skill} className="text-[10px] px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800 text-stone-500">
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
