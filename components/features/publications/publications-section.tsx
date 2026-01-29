"use client";
import { PUBLICATIONS } from "data/portfolio";
import { formatDate } from "utils/date";

import { motion } from "framer-motion";

export function Publications() {
    return (
        <section className="mb-32">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-12 ml-1">Publications</h2>
            <motion.div
                className="space-y-12"
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
                {PUBLICATIONS.map((pub, idx) => (
                    <motion.div
                        key={idx}
                        className="flex flex-col border-t border-stone-200 dark:border-stone-800 pt-6 group"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5, ease: "easeOut" }
                            }
                        }}
                    >

                        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 leading-tight max-w-2xl group-hover:underline decoration-1 underline-offset-4">
                                {pub.link ? (
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer">{pub.title}</a>
                                ) : (
                                    pub.title
                                )}
                            </h3>
                            <div className="font-mono text-stone-400 text-sm mt-2 md:mt-0 whitespace-nowrap">
                                {formatDate(pub.date)}
                            </div>
                        </div>

                        <div className="space-y-4 max-w-3xl">
                            <div className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{pub.conference}</div>
                            <div className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                                {Array.isArray(pub.description) ? (
                                    <ul className="list-disc list-outside ml-5 space-y-2">
                                        {pub.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                    </ul>
                                ) : (
                                    <p>{pub.description}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
