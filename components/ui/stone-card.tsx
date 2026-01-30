"use client";

import { cn } from "@/utils/cn";
import { HTMLMotionProps, motion } from "framer-motion";

interface StoneCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high";
    interactive?: boolean;
}

export const StoneCard = ({
    children,
    className,
    intensity = "medium",
    interactive = false,
    ...props
}: StoneCardProps) => {
    const intensityMap = {
        low: "bg-stone-50/50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800",
        medium: "bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-sm",
        high: "bg-white dark:bg-black border border-stone-200 dark:border-stone-800 shadow-md",
    };

    return (
        <motion.div
            data-name="stone-card"
            className={cn(
                "relative rounded-2xl overflow-hidden transition-all duration-300",
                interactive && "cursor-pointer active:scale-[0.99] hover:border-stone-400 dark:hover:border-stone-600",
                intensityMap[intensity],
                className
            )}
            {...(interactive ? { whileTap: { scale: 0.99 } } : {})}
            {...props}
        >
            <div data-name="stone-content" className="relative z-10 h-full w-full">{children}</div>
        </motion.div>
    );
};
