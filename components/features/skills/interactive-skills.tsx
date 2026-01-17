'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { GlassCard } from '@/components/ui/glass-card'
import { SKILLS, EXPERIENCE, PUBLICATIONS, Experience, Publication } from 'data/portfolio'
import { formatDate } from 'utils/date'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

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
        totalYears: totalYears > 0 ? totalYears : 0.5 // Minimum 0.5 for appearance if mentioned
    }
}

export function InteractiveSkills() {


    const categories = Object.entries(SKILLS).map(([category, skills]) => {
        // Sort skills by years of experience (descending)
        const sortedSkills = [...skills].sort((a, b) => {
            const yearsA = getAllSkillExperience(a).totalYears
            const yearsB = getAllSkillExperience(b).totalYears
            return yearsB - yearsA
        })
        return [category, sortedSkills] as const
    })
    // Flatten skills to get the first one for default selection
    const allSkills = categories.flatMap(([, skills]) => skills)
    const [selectedSkill, setSelectedSkill] = useState<string | null>(allSkills[0])
    const detailsRef = useRef<HTMLDivElement>(null)


    const handleSkillClick = (skill: string) => {
        if (selectedSkill === skill) {
            // Keep at least one selected or allow deselect? User asked for no veil, so keeping one selected is safer.
            // But let's allow re-clicking to do nothing, preventing closure.
            return
        } else {
            setSelectedSkill(skill)
            // Small delay to allow state update and DOM render
            setTimeout(() => {
                if (window.innerWidth < 1024 && detailsRef.current) {
                    detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }, 100)
        }
    }

    const { relatedExperience, relatedPublications, totalYears } = selectedSkill
        ? getAllSkillExperience(selectedSkill)
        : { relatedExperience: [], relatedPublications: [], totalYears: 0 }

    return (
        <section className="mb-16" data-name="skills-section">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                {/* Left Column: Skills Bubbles */}
                <div className="lg:col-span-5 space-y-6">
                    {categories.map(([category, items]) => (
                        <div key={category}>
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => {
                                    const isSelected = selectedSkill === skill
                                    return (
                                        <motion.button
                                            key={skill}
                                            onClick={() => handleSkillClick(skill)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border backdrop-blur-md",
                                                isSelected
                                                    ? "bg-black/10 dark:bg-white/20 text-black dark:text-white border-black/20 dark:border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105"
                                                    : "bg-white/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 hover:bg-white/80 dark:hover:bg-white/15"
                                            )}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            layout
                                            data-name="skill-button"
                                        >
                                            {skill}
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Details */}
                <div
                    ref={detailsRef}
                    className="lg:col-span-7 min-h-[400px] border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 pt-8 lg:pt-0 lg:pl-8 lg:pr-12"
                    data-name="skill-details-panel"
                >
                    <AnimatePresence mode="wait">
                        {selectedSkill ? (
                            <motion.div
                                key={selectedSkill}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="flex items-baseline justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                                    <h3 id={selectedSkill} className="text-3xl font-bold tracking-tight scroll-mt-24">{selectedSkill}</h3>
                                    <span className="text-lg text-neutral-500 font-mono">
                                        {totalYears.toFixed(1)}+ Years
                                    </span>
                                </div>

                                {/* Experience Chart / Visual */}
                                <div className="space-y-2">
                                    <div className="text-xs uppercase tracking-widest text-neutral-500">Experience Activity</div>
                                    <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-neutral-900 dark:bg-white"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((totalYears / 8) * 100, 100)}%` }} // Assume 8 years is max bar
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg">Applied Roles & Projects</h4>
                                    {relatedExperience.length === 0 && relatedPublications.length === 0 && (
                                        <p className="text-neutral-500 italic">No specific tagged experience found.</p>
                                    )}

                                    <div className="space-y-4">
                                        {relatedExperience.map((exp, idx) => (
                                            <motion.div
                                                key={`exp-${idx}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-100 dark:border-neutral-800"
                                            >
                                                <div className="flex justify-between items-baseline gap-4 mb-2">
                                                    <div>
                                                        <div className="font-medium text-neutral-900 dark:text-neutral-100 leading-tight">{exp.title}</div>
                                                        <div className="text-sm text-neutral-500">{exp.company}</div>
                                                    </div>
                                                    <div className="text-xs font-mono text-neutral-400 shrink-0 whitespace-nowrap text-right">
                                                        <span>{formatDate(exp.start)}</span>
                                                        {' - '}
                                                        <span>{exp.end ? formatDate(exp.end) : 'Present'}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}

                                        {relatedPublications.map((pub, idx) => (
                                            <motion.div
                                                key={`pub-${idx}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (relatedExperience.length + idx) * 0.1 }}
                                                className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-100 dark:border-neutral-800"
                                            >
                                                <div className="flex justify-between items-baseline gap-4 mb-2">
                                                    <div>
                                                        <div className="font-medium text-neutral-900 dark:text-neutral-100 leading-tight">{pub.title}</div>
                                                        <div className="text-sm text-neutral-500">Publication • {pub.conference}</div>
                                                    </div>
                                                    <div className="text-xs font-mono text-neutral-400 shrink-0 whitespace-nowrap text-right">
                                                        {pub.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-center text-neutral-400 space-y-4 p-8 min-h-[200px]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                <p>Select a technology from the above to view experience details.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
