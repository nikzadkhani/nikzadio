
"use client";

import { cn } from "@/utils/cn";
import { HTMLMotionProps, motion } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high";
    gradient?: boolean;
}

export const GlassCard = ({
    children,
    className,
    intensity = "medium",
    gradient = false,
    ...props
}: GlassCardProps) => {
    const intensityMap = {
        low: "bg-white/30 dark:bg-black/30 backdrop-blur-md border-white/20 dark:border-white/10",
        medium: "bg-white/40 dark:bg-black/40 backdrop-blur-xl border-white/30 dark:border-white/15 shadow-xl",
        high: "bg-white/60 dark:bg-black/60 backdrop-blur-2xl border-white/40 dark:border-white/20 shadow-2xl",
    };

    const gradientOverlay = gradient ? (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none rounded-[inherit]" />
    ) : null;

    return (
        <motion.div
            className={cn(
                "relative rounded-2xl border overflow-hidden transition-colors",
                intensityMap[intensity],
                className
            )}
            {...props}
        >
            {gradientOverlay}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};
