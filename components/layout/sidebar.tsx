"use client";

import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { SocialButton, GithubIcon, LinkedinIcon, MailIcon } from '@/components/ui/social-button';

const navItems = {
    '/': { name: 'Home' },
    '/resume': { name: 'Resume' },
};

export function Sidebar() {
    const pathname = usePathname();
    return (
        <GlassCard
            data-name="sidebar"
            intensity="high"
            hoverEffect={false}
            className="relative overflow-visible p-8 flex flex-col items-start text-left h-full border-white/30 dark:border-white/10 shadow-2xl"
        >
            {/* Specular Highlight / Prism Edge */}
            {/* Specular Highlight / Prism Edge */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/10 to-transparent opacity-50 dark:opacity-20" />
            <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/50 dark:from-white/10 via-transparent to-transparent opacity-30 dark:opacity-10" />

            {/* Content Wrapper */}
            <div className="flex flex-col h-full w-full relative z-10">
                {/* Main Content */}
                <div data-name="sidebar-content" className="flex flex-col items-start w-full gap-8 shrink-0">

                    {/* Profile Picture */}
                    <div className="relative group mx-auto shrink-0">
                        <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden border-2 border-white/20 dark:border-white/10 shadow-lg">
                            <Image
                                src="/me.jpg"
                                alt="Nikzad Khani"
                                fill
                                className="object-cover object-[40%_25%] transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>

                    {/* Identity */}
                    <div className="flex flex-col items-start w-full gap-2">
                        <h1 className="text-4xl font-serif font-medium tracking-tight text-stone-900 dark:text-white">
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
                    <div className="flex flex-row flex-wrap gap-2 w-full">
                        {[
                            {
                                icon: GithubIcon,
                                href: "https://github.com/nikzadkhani",
                                label: "GitHub",
                                color: "group-hover/btn:text-purple-400 dark:group-hover/btn:text-purple-300"
                            },
                            {
                                icon: LinkedinIcon,
                                href: "https://linkedin.com/in/nikzadkhani",
                                label: "LinkedIn",
                                color: "group-hover/btn:text-blue-400 dark:group-hover/btn:text-blue-300"
                            },
                            {
                                icon: MailIcon,
                                href: "mailto:nikzad@example.com",
                                label: "Email",
                                color: "group-hover/btn:text-teal-400 dark:group-hover/btn:text-teal-300"
                            }
                        ].map((social) => (
                            <SocialButton
                                key={social.label}
                                href={social.href}
                                label={social.label}
                                icon={social.icon}
                                color={social.color}
                                className="py-2 px-4 bg-stone-50/80 dark:bg-white/10 border border-white/60 dark:border-white/20 shadow-sm hover:shadow-md backdrop-blur-md"
                            />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div data-name="sidebar-footer" className="w-full mt-auto pt-6 border-t border-white/10 dark:border-white/5">
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

