"use client";
import { EDUCATION } from "data/portfolio";

export function Education() {
    return (
        <section className="mb-32" data-name="education-section">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-8 ml-1">Education</h2>
            <div className="space-y-8">
                {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-baseline justify-between border-t border-stone-200 dark:border-stone-800 pt-6 group hover:pl-4 transition-all duration-300">
                        <div>
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{edu.school}</h3>
                            <p className="text-stone-600 dark:text-stone-400 mt-2 text-lg">{edu.degree}</p>
                        </div>
                        <div className="font-mono text-stone-400 text-sm mt-2 md:mt-0 opacity-60 group-hover:opacity-100 transition-opacity">
                            {edu.start.getFullYear()} — {edu.end ? edu.end.getFullYear() : 'Present'}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
