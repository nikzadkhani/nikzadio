"use client";

import Image from "next/image";
import {
  StoneCard,
  SocialButton,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/ui";

export function Sidebar() {
  return (
    <StoneCard
      data-name="sidebar"
      intensity="medium"
      className="relative flex h-full flex-col items-start overflow-visible p-8 text-left shadow-xl"
    >
      {/* Content Wrapper */}
      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Main Content */}
        <div
          data-name="sidebar-content"
          className="flex w-full shrink-0 flex-col items-start gap-8"
        >
          {/* Profile Picture */}
          <div className="group relative mx-auto shrink-0">
            <div className="relative h-[180px] w-[180px] overflow-hidden rounded-full border-2 border-white/20 shadow-lg dark:border-white/10">
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
          <div className="flex w-full flex-col items-start gap-2">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-stone-900 dark:text-white">
              Nikzad Khani
            </h1>

            <p className="font-mono text-sm font-bold tracking-wide text-stone-500 dark:text-stone-400">
              Full Stack Engineer in Boston, MA.
            </p>
            <p className="max-w-[280px] text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              I specialize in building scalable AI-driven applications and
              robust data pipelines using Go, Python, and cloud-native
              technologies.
            </p>
          </div>

          {/* Social Pills */}
          <div className="flex w-full flex-row flex-wrap gap-2">
            {[
              {
                icon: GithubIcon,
                href: "https://github.com/nikzadkhani",
                label: "GitHub",
                color:
                  "group-hover/btn:text-purple-400 dark:group-hover/btn:text-purple-300",
              },
              {
                icon: LinkedinIcon,
                href: "https://linkedin.com/in/nikzadkhani",
                label: "LinkedIn",
                color:
                  "group-hover/btn:text-blue-400 dark:group-hover/btn:text-blue-300",
              },
              {
                icon: MailIcon,
                href: "mailto:nikzad@example.com",
                label: "Email",
                color:
                  "group-hover/btn:text-teal-400 dark:group-hover/btn:text-teal-300",
              },
            ].map((social) => (
              <SocialButton
                key={social.label}
                href={social.href}
                label={social.label}
                icon={social.icon}
                color={social.color}
                className="border border-stone-200 bg-stone-100 px-4 py-2 shadow-sm transition-colors hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700"
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          data-name="sidebar-footer"
          className="mt-auto w-full border-t border-stone-200 pt-6 dark:border-stone-800"
        >
          <div className="mb-4 flex flex-col gap-2">
            <a
              href="https://github.com/nikzadkhani/nikzadio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-stone-500 transition-colors duration-200 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                  fill="currentColor"
                />
              </svg>
              <span>view source</span>
            </a>
          </div>
          <p className="font-serif text-[10px] leading-relaxed text-stone-500/70 italic dark:text-stone-500">
            © {new Date().getFullYear()} MIT Licensed. Made in Jamaica Plain,
            Boston.
          </p>
        </div>
      </div>
    </StoneCard>
  );
}

// Icons
