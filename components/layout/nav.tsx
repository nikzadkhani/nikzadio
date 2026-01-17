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
      <nav className="flex items-center gap-1 p-1.5 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg pointer-events-auto">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));

          return (
            <Link
              key={path}
              href={path}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white",
                isActive ? "text-black dark:text-white" : "text-stone-500 dark:text-stone-400"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/50 dark:bg-white/10 rounded-full shadow-sm backdrop-blur-sm"
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

