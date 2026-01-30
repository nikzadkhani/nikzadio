"use client";

import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/ui";
import { usePathname } from "next/navigation";


const navItems = [
    { name: 'Skills', path: '#skills' },
    { name: 'Experience', path: '#experience' },
    { name: 'Education', path: '#education' },
    { name: 'Contact', path: 'mailto:hello@nikzad.io' },
];

export function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const pathname = usePathname();

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
                hidden: { y: -100, opacity: 0 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-6 inset-x-0 mx-auto z-50 w-max"
        >
            <div className="flex items-center gap-1 p-1 bg-stone-900 dark:bg-stone-100 rounded-full shadow-2xl shadow-stone-900/40 dark:shadow-stone-100/20 border border-stone-800 dark:border-stone-200">

                {/* Home / Logo */}
                <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-800 dark:bg-stone-200 text-stone-100 dark:text-stone-900 hover:scale-105 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
                    </svg>
                </Link>

                {/* Divider */}
                <div className="w-px h-6 bg-stone-700 dark:bg-stone-300 mx-1 opacity-50" />

                <nav className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all text-stone-400 dark:text-stone-500 hover:text-stone-100 dark:hover:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Divider */}
                <div className="w-px h-6 bg-stone-700 dark:bg-stone-300 mx-1 opacity-50" />

                <div className="pr-1 flex items-center text-stone-400 dark:text-stone-500 hover:text-stone-100 dark:hover:text-stone-900">
                    <ThemeToggle />
                </div>
            </div >
        </motion.header >
    );
}
