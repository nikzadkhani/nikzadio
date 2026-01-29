"use client";

import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- Icons (Inline SVGs to avoid dependency install) ---

const IconHome = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);

const IconResume = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
);

const IconOff = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M10 9a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-2.5 2.5V12" /><path d="M12 17h.01" /></svg> // Placeholder for "Out of Office"
);

// --- Component ---

function DockIcon({ mouseX, icon: Icon, href, label }: { mouseX: MotionValue, icon: any, href: string, label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width }}
                className="aspect-square rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 relative group"
            >
                <span className="sr-only">{label}</span>
                <Icon className={`w-1/2 h-1/2 transition-colors duration-300 ${isActive ? 'text-black dark:text-white' : 'text-stone-400 dark:text-stone-500'}`} />

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {label}
                </div>

                {/* Active Dot */}
                {isActive && (
                    <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-black dark:bg-white" />
                )}
            </motion.div>
        </Link>
    );
}

export function Dock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-white/50 dark:bg-black/50 border border-stone-200/50 dark:border-white/10 px-4 pb-3 backdrop-blur-xl shadow-2xl"
            >
                <DockIcon mouseX={mouseX} icon={IconHome} href="/" label="Home" />
                <DockIcon mouseX={mouseX} icon={IconResume} href="/resume" label="Resume" />
                <DockIcon mouseX={mouseX} icon={IconOff} href="/offline" label="Out of Office" />
            </motion.div>
        </div>
    );
}
