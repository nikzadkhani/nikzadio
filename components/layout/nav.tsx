"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const navItems = {
    '/': { name: 'Skills' },
    '/resume': { name: 'Resume' },
    '/offline': { name: 'Out of Office' },
};

export function Navbar() {
    const pathname = usePathname();

    return (
        <div className="sticky top-4 z-50 flex justify-center mb-12 pointer-events-none w-full" data-name="navbar-container">
            <nav className="flex items-center gap-1 p-1.5 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-[48px] backdrop-brightness-125 backdrop-saturate-[1.8] border border-white/40 dark:border-white/10 ring-1 ring-white/50 dark:ring-white/10 shadow-2xl shadow-black/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_1px_0_0_0_rgba(255,255,255,0.3)] pointer-events-auto relative overflow-hidden" data-name="navbar">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-noise-pattern" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                <div className="relative z-10 flex items-center gap-1">
                    {Object.entries(navItems).map(([path, { name }]) => {
                        const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));

                        return (
                            <Link
                                key={path}
                                href={path}
                                data-name="nav-link"
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 hover:text-black dark:hover:text-white",
                                    isActive ? "text-black dark:text-white" : "text-stone-500 dark:text-stone-400"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/80 dark:bg-white/20 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-md"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{name}</span>
                            </Link>
                        );
                    })}
                    <div className="pl-2 border-l border-white/20 dark:border-white/10 ml-1">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>
        </div>
    );
}
