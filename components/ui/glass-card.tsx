
"use client";

import { cn } from "@/utils/cn";
import { HTMLMotionProps, motion } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high";
    gradient?: boolean;
    interactive?: boolean;
    hoverEffect?: boolean;
}

export const GlassCard = ({
    children,
    className,
    intensity = "high",
    gradient = false,
    interactive = false,
    hoverEffect = false,
    ...props
}: GlassCardProps) => {
    const intensityMap = {
        low: "bg-white/20 dark:bg-black/20 backdrop-blur-md backdrop-saturate-150 border border-white/10 shadow-sm",
        medium: "bg-gradient-to-br from-white/30 to-white/10 dark:from-white/15 dark:to-white/5 backdrop-blur-xl backdrop-saturate-[1.8] border border-white/20 shadow-lg shadow-black/5 ring-1 ring-white/20 ring-inset",
        high: "bg-gradient-to-br from-white/30 to-white/10 dark:from-white/15 dark:to-white/5 backdrop-blur-[64px] backdrop-saturation-[180%] border border-white/20 shadow-[0_45px_90px_rgba(0,0,0,0.25)] ring-1 ring-white/30 ring-inset",
        // Additional custom style for 'ultra' if needed, but 'high' is used by sidebar
    };

    const gradientOverlay = gradient ? (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none rounded-[inherit] mix-blend-overlay" />
    ) : null;

    const noiseOverlay = (
        <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
            }}
        />
    );

    return (
        <motion.div
            data-name="glass-container"
            className={cn(
                "relative rounded-2xl overflow-hidden transition-all duration-[5000ms] ease-out",
                hoverEffect && "hover:backdrop-brightness-[1.1] hover:brightness-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]",
                interactive && "cursor-pointer active:scale-[0.98] active:shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
                intensityMap[intensity],
                className
            )}
            {...(interactive ? { whileTap: { scale: 0.98 } } : {})}
            {...props}
        >
            {gradientOverlay}
            {noiseOverlay}

            <div data-name="glass-content" className="relative z-10 h-full w-full">{children}</div>
        </motion.div>
    );
};
