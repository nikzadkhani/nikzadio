'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILLS, EXPERIENCE, PUBLICATIONS } from 'data/portfolio'
import { formatDate } from 'utils/date'
import { cn } from 'utils/cn'

// Helper to calculate duration in years from date objects
export const getDurationInYears = (start: Date, end?: Date): number => {
    const endDate = end || new Date()
    const diffTime = Math.abs(endDate.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays / 365
}

// Get all unique skills from experiences to map them back
export const getAllSkillExperience = (skill: string) => {
    const relatedExperience = EXPERIENCE.filter(exp => exp.skills?.includes(skill))
    const relatedPublications = PUBLICATIONS.filter(pub => pub.skills?.includes(skill))

    // Calculate total years of experience
    let totalYears = 0
    relatedExperience.forEach(exp => {
        totalYears += getDurationInYears(exp.start, exp.end)
    })

    return {
        relatedExperience,
        relatedPublications,
        totalYears: totalYears > 0 ? totalYears : 0.5
    }
}

export function InteractiveSkills() {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

    // Flatten skills to a single list, but unique
    const allSkills = useMemo(() => {
        return Object.values(SKILLS).flat()
    }, [])

    const handleSkillClick = (skill: string) => {
        setSelectedSkill(selectedSkill === skill ? null : skill)
    }

    return (
        <section className="mb-24">
            <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-8">
                Technical Mastery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {allSkills.map((skill) => {
                    const isSelected = selectedSkill === skill
                    const { totalYears, relatedExperience, relatedPublications } = getAllSkillExperience(skill)

                    return (
                        <motion.div
                            key={skill}
                            layout
                            onClick={() => handleSkillClick(skill)}
                            className={cn(
                                "relative overflow-hidden cursor-pointer rounded-xl border bg-white dark:bg-neutral-900 transition-colors p-4 flex flex-col justify-between group",
                                isSelected
                                    ? "col-span-2 row-span-2 border-neutral-800 dark:border-neutral-200 shadow-xl z-20"
                                    : "col-span-1 row-span-1 border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm"
                            )}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        >
                            <div className="flex justify-between items-start">
                                <motion.h3
                                    layout="position"
                                    className={cn(
                                        "font-bold tracking-tight text-neutral-900 dark:text-neutral-100",
                                        isSelected ? "text-2xl mb-4" : "text-sm"
                                    )}
                                >
                                    {skill}
                                </motion.h3>

                                {isSelected && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-xs font-mono text-neutral-600 bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 px-2 py-1 rounded-full"
                                    >
                                        {totalYears.toFixed(1)} Yrs
                                    </motion.span>
                                )}
                            </div>

                            {!isSelected && (
                                <motion.div
                                    layout="position"
                                    className="w-full h-1 bg-neutral-50 dark:bg-neutral-800 mt-4 rounded-full overflow-hidden"
                                >
                                    <div
                                        className="h-full bg-neutral-200 dark:bg-neutral-700 group-hover:bg-neutral-900 dark:group-hover:bg-white transition-colors"
                                        style={{ width: `${Math.min((totalYears / 8) * 100, 100)}%` }}
                                    />
                                </motion.div>
                            )}

                            {isSelected && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex-1 overflow-y-auto pr-2 space-y-3 mt-2 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800"
                                >
                                    {/* Experience Sparkline */}
                                    <div className="h-8 w-full flex items-end gap-1 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                                        {[...Array(12)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-full bg-blue-100 dark:bg-blue-900/20 rounded-t-sm"
                                                style={{ height: `${Math.random() * 100}%` }}
                                            />
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        {[...relatedExperience, ...relatedPublications].slice(0, 3).map((item, idx) => (
                                            <div key={idx} className="text-sm">
                                                <div className="font-medium text-neutral-900 dark:text-white">
                                                    {item.title}
                                                </div>
                                                <div className="text-xs text-neutral-500 truncate">
                                                    {'company' in item ? item.company : item.conference}
                                                </div>
                                            </div>
                                        ))}

                                        {relatedExperience.length + relatedPublications.length === 0 && (
                                            <div className="text-xs text-neutral-400 italic">
                                                Used in personal projects and research.
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
