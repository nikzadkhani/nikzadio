'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SKILLS, EXPERIENCE, PUBLICATIONS, Experience, Publication } from 'data/portfolio'

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
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

    const categories = Object.entries(SKILLS)

    const handleSkillClick = (skill: string) => {
        if (selectedSkill === skill) {
            setSelectedSkill(null)
        } else {
            setSelectedSkill(skill)
        }
    }

    const { relatedExperience, relatedPublications, totalYears } = selectedSkill
        ? getAllSkillExperience(selectedSkill)
        : { relatedExperience: [], relatedPublications: [], totalYears: 0 }

    return (
        <section className="mb-16">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                                                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border",
                                                isSelected
                                                    ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white shadow-md scale-105"
                                                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 dark:bg-neutral-950 dark:text-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-700"
                                            )}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            layout
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
                <div className="lg:col-span-7 min-h-[400px] border-l border-neutral-200 dark:border-neutral-800 lg:pl-8">
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
                                    <h3 className="text-3xl font-bold tracking-tight">{selectedSkill}</h3>
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
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-medium text-neutral-900 dark:text-neutral-100">{exp.title}</div>
                                                        <div className="text-sm text-neutral-500">{exp.company}</div>
                                                    </div>
                                                    <div className="text-xs font-mono text-neutral-400">
                                                        {exp.start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                        {' - '}
                                                        {exp.end ? exp.end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
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
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-medium text-neutral-900 dark:text-neutral-100">{pub.title}</div>
                                                        <div className="text-sm text-neutral-500">Publication • {pub.conference}</div>
                                                    </div>
                                                    <div className="text-xs font-mono text-neutral-400">
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
                                className="h-full flex flex-col items-center justify-center text-center text-neutral-400 space-y-4 p-8"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                <p>Select a technology from the left to view experience details.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
