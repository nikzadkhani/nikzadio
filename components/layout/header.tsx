"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/ui";

const navItems = [
  { name: "Skills", path: "#skills" },
  { name: "Experience", path: "#experience" },
  { name: "Education", path: "#education" },
  { name: "Contact", path: "mailto:hello@nikzad.io" },
];

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-x-0 top-6 z-50 mx-auto w-max"
    >
      <div className="flex items-center gap-1 rounded-full border border-stone-800 bg-stone-900 p-1 shadow-2xl shadow-stone-900/40 dark:border-stone-200 dark:bg-stone-100 dark:shadow-stone-100/20">
        {/* Home / Logo */}
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-stone-100 transition-transform hover:scale-105 dark:bg-stone-200 dark:text-stone-900"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
          </svg>
        </Link>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-stone-700 opacity-50 dark:bg-stone-300" />

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-400 transition-all hover:bg-stone-800 hover:text-stone-100 dark:text-stone-500 dark:hover:bg-stone-200 dark:hover:text-stone-900"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-stone-700 opacity-50 dark:bg-stone-300" />

        <div className="flex items-center pr-1 text-stone-400 hover:text-stone-100 dark:text-stone-500 dark:hover:text-stone-900">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
