"use client";

import { motion, Variants } from "framer-motion";
import { ConnectButton } from "@/ui";

export function HeroSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item: Variants = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 20 },
    },
  };

  return (
    <section className="mb-24 flex min-h-[70vh] flex-col justify-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <div>
          <motion.h1
            variants={item}
            className="text-fluid-h1 text-stone-900 dark:text-stone-50"
          >
            Nikzad Khani
          </motion.h1>
          <motion.h2
            variants={item}
            className="text-fluid-h2 mt-2 text-stone-500 dark:text-stone-400"
          >
            Software Engineer.
          </motion.h2>
        </div>

        <motion.p
          variants={item}
          className="max-w-xl text-xl leading-relaxed text-stone-600 md:text-2xl dark:text-stone-300"
        >
          Building scalable AI-driven applications and robust data pipelines
          with{" "}
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            Go
          </span>{" "}
          and{" "}
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            Python
          </span>
          .
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col flex-wrap gap-3 pt-4 sm:flex-row"
        >
          <a
            href="#experience"
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-stone-900 px-6 py-3 text-base font-medium text-white transition-transform active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-lg dark:bg-stone-100 dark:text-stone-900"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
            <span className="relative">View Experience</span>
          </a>
          <ConnectButton />
          <a
            href="mailto:hello@nikzad.io"
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-stone-100 px-6 py-3 text-base font-medium text-stone-900 transition-all hover:border-stone-300 active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-lg dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:hover:border-stone-600"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-stone-200/40 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full dark:via-stone-600/40" />
            <span className="relative">Contact Me</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
