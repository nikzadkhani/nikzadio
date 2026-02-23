"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center bg-white p-6 font-mono dark:bg-black">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-stone-200 bg-stone-50 p-6 shadow-xl dark:border-stone-800 dark:bg-stone-900/50">
        {/* Terminal Header */}
        <div className="mb-6 flex items-center space-x-2 border-b border-stone-200 pb-4 dark:border-stone-800">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs text-stone-400">
            nikzad@kernel:~ (zsh)
          </span>
        </div>

        {/* Terminal Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-2 text-sm md:text-base"
        >
          <motion.p variants={item} className="text-stone-400">
            $ go run main.go
          </motion.p>

          <motion.div variants={item} className="pt-2">
            <span className="bg-red-500 px-2 py-0.5 font-bold text-white">
              PANIC
            </span>
            <span className="ml-2 font-bold text-red-500">
              runtime error: page not found [404]
            </span>
          </motion.div>

          <motion.div variants={item} className="space-y-1 pt-4 text-stone-500">
            <p className="text-stone-800 dark:text-stone-200">
              goroutine 1 [running]:
            </p>
            <div className="space-y-1 border-l border-stone-200 pl-4 dark:border-stone-800">
              <p>main.SeekPage(0x194, 0x0) </p>
              <p className="pl-4 text-xs opacity-60">
                /Users/nikzad/Developer/nikzadio/app/router.go:404 +0x6b
              </p>

              <p className="pt-2">main.FindHappiness()</p>
              <p className="pl-4 text-xs opacity-60">
                /Users/nikzad/Developer/nikzadio/internal/life.go:88 +0x24
              </p>

              <p className="pt-2 text-amber-500">
                warning: garbage collection failed to find your path
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="pt-8">
            <p className="text-stone-400"># Hint: Try changing directories</p>
            <Link
              href="/"
              className="group mt-4 inline-flex items-center space-x-3 bg-stone-900 px-6 py-3 text-white transition-all hover:opacity-90 dark:bg-white dark:text-black"
            >
              <span className="text-xs font-bold">
                $ cd /home && ./return-to-nikzad.io
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block h-4 w-2 bg-current"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorative Code Snippets */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.03] select-none dark:opacity-[0.05]">
        <div className="absolute top-10 left-10 rotate-12 transform text-xs">
          {`func PageNotFound() error {\n  return fmt.Errorf("page index out of bounds: 404")\n}`}
        </div>
        <div className="absolute right-10 bottom-20 -rotate-6 transform text-right text-xs">
          {`if err != nil {\n  panic(err)\n}`}
        </div>
      </div>
    </section>
  );
}
