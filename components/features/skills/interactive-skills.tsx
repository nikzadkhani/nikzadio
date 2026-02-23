"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SpotlightCard } from "@/ui";
import { SKILLS, EXPERIENCE, PUBLICATIONS } from "data/portfolio";
import { formatDate } from "utils/date";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDurationInYears = (start: Date, end?: Date): number => {
  const endDate = end || new Date();
  const diffTime = Math.abs(endDate.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays / 365;
};

export const getAllSkillExperience = (skill: string) => {
  const relatedExperience = EXPERIENCE.filter((exp) =>
    exp.skills?.includes(skill)
  );
  const relatedPublications = PUBLICATIONS.filter((pub) =>
    pub.skills?.includes(skill)
  );

  let totalYears = 0;
  relatedExperience.forEach((exp) => {
    totalYears += getDurationInYears(exp.start, exp.end);
  });

  return {
    relatedExperience,
    relatedPublications,
    totalYears: totalYears > 0 ? totalYears : 0.5,
  };
};

export function InteractiveSkills() {
  const categories = Object.entries(SKILLS).map(([category, skills]) => {
    const sortedSkills = [...skills].sort((a, b) => {
      const yearsA = getAllSkillExperience(a).totalYears;
      const yearsB = getAllSkillExperience(b).totalYears;
      return yearsB - yearsA;
    });
    return [category, sortedSkills] as const;
  });

  const allSkills = categories.flatMap(([, skills]) => skills);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(
    allSkills[0]
  );
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleSkillClick = (skill: string) => {
    if (selectedSkill === skill) return;
    setSelectedSkill(skill);
    setTimeout(() => {
      if (window.innerWidth < 1024 && detailsRef.current) {
        detailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const { relatedExperience, relatedPublications, totalYears } = selectedSkill
    ? getAllSkillExperience(selectedSkill)
    : { relatedExperience: [], relatedPublications: [], totalYears: 0 };

  return (
    <section className="mb-24" data-name="skills-section">
      <h2 className="text-fluid-h2 mb-12 text-stone-900 dark:text-stone-100">
        Expertise
      </h2>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Skills List */}
        <div className="space-y-8 lg:col-span-4">
          {categories.map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-4 border-b border-stone-200 pb-2 text-sm font-semibold tracking-widest text-stone-900 uppercase dark:border-stone-800 dark:text-stone-100">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => {
                  const isSelected = selectedSkill === skill;
                  return (
                    <button
                      key={skill}
                      onClick={() => handleSkillClick(skill)}
                      className={cn(
                        "rounded-md border px-3 py-1 text-sm font-medium transition-all duration-200",
                        isSelected
                          ? "scale-105 transform border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-black"
                          : "border-stone-200 bg-transparent text-stone-500 hover:border-stone-400 hover:text-stone-900 dark:border-stone-800 dark:text-stone-400 dark:hover:border-stone-600 dark:hover:text-stone-200"
                      )}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Details */}
        <div
          ref={detailsRef}
          className="lg:col-span-8"
          data-name="skill-details-panel"
        >
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <SpotlightCard key={selectedSkill} className="min-h-[400px] p-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  <div className="flex items-baseline justify-between border-b border-stone-100 pb-6 dark:border-stone-800">
                    <h3 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                      {selectedSkill}
                    </h3>
                    <span className="font-mono text-xl text-stone-400">
                      {totalYears.toFixed(1)}+ Years
                    </span>
                  </div>

                  {/* Experience Bar */}
                  <div className="h-1 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                    <motion.div
                      className="h-full bg-stone-900 dark:bg-stone-100"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min((totalYears / 8) * 100, 100)}%`,
                      }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                    />
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                      Applied Context
                    </h4>

                    {relatedExperience.length === 0 &&
                      relatedPublications.length === 0 && (
                        <p className="text-stone-400 italic">
                          No specific tagged experience found.
                        </p>
                      )}

                    <div className="space-y-4">
                      {relatedExperience.map((exp, idx) => (
                        <div
                          key={`exp-${idx}`}
                          className="group relative border-l-2 border-stone-200 pl-4 transition-colors hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
                        >
                          <div className="mb-1 flex items-baseline justify-between">
                            <div className="font-medium text-stone-900 dark:text-stone-100">
                              {exp.title}
                            </div>
                            <div className="font-mono text-xs text-stone-400">
                              {exp.end ? formatDate(exp.end) : "Present"}
                            </div>
                          </div>
                          <div className="text-sm text-stone-500">
                            {exp.company}
                          </div>
                        </div>
                      ))}

                      {relatedPublications.map((pub, idx) => (
                        <div
                          key={`pub-${idx}`}
                          className="group relative border-l-2 border-stone-200 pl-4 transition-colors hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
                        >
                          <div className="mb-1 flex items-baseline justify-between">
                            <div className="font-medium text-stone-900 dark:text-stone-100">
                              {pub.title}
                            </div>
                            <div className="font-mono text-xs text-stone-400">
                              {pub.date.getFullYear()}
                            </div>
                          </div>
                          <div className="text-sm text-stone-500">
                            Publication • {pub.conference}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </SpotlightCard>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
