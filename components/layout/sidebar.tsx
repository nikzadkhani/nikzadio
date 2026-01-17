"use client";

import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';

const navItems = {
    '/': { name: 'Home' },
    '/resume': { name: 'Resume' },
};

export function Sidebar() {
    const pathname = usePathname();
    return (
        <GlassCard
            intensity="high"
            hoverEffect={false}
            className="relative overflow-visible p-8 flex flex-col items-start text-left h-full border-white/30 dark:border-white/10 shadow-2xl"
        >
            {/* Specular Highlight / Prism Edge */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50" />
            <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/50 via-transparent to-transparent opacity-30" />

            {/* Content Wrapper */}
            <div className="flex flex-col h-full w-full relative z-10">
                {/* Main Content */}
                <div data-name="sidebar-content" className="flex flex-col items-start w-full gap-8 shrink-0">

                    {/* Profile Orb */}
                    <div className="relative group mx-auto shrink-0">
                        <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden ring-4 ring-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_10px_20px_rgba(255,255,255,0.2)]">
                            <Image
                                src="/me.jpg"
                                alt="Nikzad Khani"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            {/* Orb Specular Highlight */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute top-4 left-6 w-8 h-4 bg-white/40 blur-md rounded-[100%] rotate-[-20deg]" />
                        </div>
                    </div>

                    {/* Identity */}
                    <div className="flex flex-col items-start w-full gap-2">
                        <h1 className="text-4xl font-serif font-medium tracking-tight text-stone-900 dark:text-white italic">
                            Nikzad Khani
                        </h1>

                        <p className="text-sm font-mono text-stone-500 dark:text-stone-400 font-bold tracking-wide">
                            Full Stack Engineer in Boston, MA.
                        </p>
                        <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm max-w-[280px]">
                            I specialize in building scalable AI-driven applications and robust data pipelines using Go, Python, and cloud-native technologies.
                        </p>
                    </div>

                    {/* Social Pills */}
                    <div className="flex flex-col gap-1 w-full max-w-[240px]">
                        {[
                            {
                                icon: GithubIcon,
                                href: "https://github.com/nikzadkhani",
                                label: "GitHub",
                                colorClass: "group-hover/btn:text-purple-400 dark:group-hover/btn:text-purple-300"
                            },
                            {
                                icon: LinkedinIcon,
                                href: "https://linkedin.com/in/nikzadkhani",
                                label: "LinkedIn",
                                colorClass: "group-hover/btn:text-blue-400 dark:group-hover/btn:text-blue-300"
                            },
                            {
                                icon: MailIcon,
                                href: "mailto:nikzad@example.com",
                                label: "Email",
                                colorClass: "group-hover/btn:text-teal-400 dark:group-hover/btn:text-teal-300"
                            }
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/10 transition-all duration-200"
                                aria-label={social.label}
                            >
                                <social.icon
                                    className={cn(
                                        "w-4 h-4 text-stone-500/70 dark:text-stone-500 transition-colors duration-200",
                                        social.colorClass
                                    )}
                                />

                                <span className="text-sm font-medium text-stone-600 dark:text-stone-400 group-hover/btn:text-stone-900 dark:group-hover/btn:text-stone-100 transition-colors duration-200">
                                    {social.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div data-name="sidebar-footer" className="w-full mt-auto pt-6 border-t border-white/10">
                    <div className="flex flex-col gap-2 mb-4">
                        <a
                            href="https://github.com/nikzadkhani/nikzadio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
                        >
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor" />
                            </svg>
                            <span>view source</span>
                        </a>
                    </div>
                    <p className="text-[10px] text-stone-500/70 dark:text-stone-500 font-serif italic leading-relaxed">
                        © {new Date().getFullYear()} MIT Licensed. Made in Jamaica Plain, Boston.
                    </p>
                </div>
            </div>
        </GlassCard>
    );
}

// Icons
function GithubIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.398.1 2.651.64.7 1.028 1.597 1.028 2.688 0 3.848-2.339 4.685-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" /></svg>
    )
}
function LinkedinIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
    )
}
function MailIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
    )
}
