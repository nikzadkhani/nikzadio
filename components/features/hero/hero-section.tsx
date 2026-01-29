"use client";


import { motion, Variants } from "framer-motion";

export function HeroSection() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const item: Variants = {
        hidden: { y: 50, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 60, damping: 20 }
        }
    };

    return (
        <section className="min-h-[70vh] flex flex-col justify-center mb-24">
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
                <div>
                    <motion.h1
                        variants={item}
                        className="text-fluid-h1 text-stone-900 dark:text-stone-50"
                    >
                        Nikzad Khani
                    </motion.h1>
                    <motion.h2
                        variants={item}
                        className="text-fluid-h2 text-stone-500 dark:text-stone-400 mt-2"
                    >
                        Software Engineer.
                    </motion.h2>
                </div>

                <motion.p
                    variants={item}
                    className="text-xl md:text-2xl text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed"
                >
                    Building scalable AI-driven applications and robust data pipelines with <span className="text-stone-900 dark:text-stone-100 font-semibold">Go</span> and <span className="text-stone-900 dark:text-stone-100 font-semibold">Python</span>.
                </motion.p>

                <motion.div variants={item} className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
                    <a
                        href="#experience"
                        className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium text-base sm:text-lg transition-transform active:scale-95 w-full sm:w-auto overflow-hidden"
                    >
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="relative">View Experience</span>
                    </a>
                    <a
                        href="mailto:hello@nikzad.io"
                        className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-full font-medium text-base sm:text-lg transition-all active:scale-95 w-full sm:w-auto overflow-hidden hover:border-stone-300 dark:hover:border-stone-600"
                    >
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-stone-200/40 dark:via-stone-600/40 to-transparent" />
                        <span className="relative">Contact Me</span>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
