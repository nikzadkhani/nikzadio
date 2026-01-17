"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const navItems = {
  '/': { name: 'Home' },
  '/resume': { name: 'Resume' },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-6 inset-x-0 mx-auto z-50 flex justify-center px-4 pointer-events-none">
      <nav className="flex items-center gap-1 p-1.5 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-[32px] backdrop-saturate-150 border border-white/25 dark:border-white/10 ring-1 ring-white/30 dark:ring-white/10 shadow-2xl shadow-black/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] pointer-events-auto">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));

          return (
            <Link
              key={path}
              href={path}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 hover:text-black dark:hover:text-white",
                isActive ? "text-black dark:text-white" : "text-stone-500 dark:text-stone-400"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/70 dark:bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.6)] backdrop-blur-sm"
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
      </nav>
    </div>
  );
}

