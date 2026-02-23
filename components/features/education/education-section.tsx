"use client";
import { EDUCATION } from "data/portfolio";

import { motion } from "framer-motion";

export function EducationSection() {
  return (
    <section className="mb-32" data-name="education-section">
      <h2 className="mb-8 ml-1 text-sm font-semibold tracking-widest text-stone-900 uppercase dark:text-stone-100">
        Education
      </h2>
      <motion.div
        className="space-y-8"
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
        {EDUCATION.map((edu, idx) => (
          <div
            key={idx}
            className="group flex flex-col justify-between border-t border-stone-200 pt-6 transition-all duration-300 md:flex-row md:items-baseline dark:border-stone-800"
          >
            <div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {edu.school}
              </h3>
              <p className="mt-2 text-lg text-stone-600 dark:text-stone-400">
                {edu.degree}
              </p>
            </div>
            <div className="mt-2 font-mono text-sm text-stone-400 opacity-60 transition-opacity group-hover:opacity-100 md:mt-0">
              {edu.start.getFullYear()} —{" "}
              {edu.end ? edu.end.getFullYear() : "Present"}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
