
"use client";

import { cn } from "@/utils/cn";
import { HTMLMotionProps, motion } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high";
    gradient?: boolean;
    interactive?: boolean;
}

export const GlassCard = ({
    children,
    className,
    intensity = "high",
    gradient = false,
    interactive = false,
    ...props
}: GlassCardProps) => {
    const intensityMap = {
        low: "bg-white/40 dark:bg-black/40 backdrop-blur-[32px] backdrop-saturate-150 border border-white/20 shadow-md ring-1 ring-white/30 ring-inset shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]",
        medium: "bg-white/60 dark:bg-black/60 backdrop-blur-[48px] backdrop-saturate-150 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] ring-1 ring-white/40 ring-inset",
        high: "bg-white/80 dark:bg-black/80 backdrop-blur-[64px] backdrop-saturate-150 border border-white/40 shadow-[0_16px_48px_rgba(0,0,0,0.22)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] ring-1 ring-white/50 ring-inset",
    };

    const gradientOverlay = gradient ? (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none rounded-[inherit] mix-blend-overlay" />
    ) : null;

    return (
        <motion.div
            className={cn(
                "relative rounded-2xl overflow-hidden transition-all duration-500 hover:backdrop-brightness-125 hover:brightness-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]",
                interactive && "cursor-pointer active:scale-[0.98] active:shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
                intensityMap[intensity],
                className
            )}
            {...(interactive ? { whileTap: { scale: 0.98 } } : {})}
            {...props}
        >
            {gradientOverlay}

            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};
