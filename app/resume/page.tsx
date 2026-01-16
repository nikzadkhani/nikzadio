import { Experience } from '@/components/sections/experience'
import { Education } from '@/components/sections/education'
import { Publications } from '@/components/sections/publications'
import { Skills } from '@/components/sections/skills'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Resume',
    description: 'Professional resume of Nikzad Khani, Senior Software Engineer at Verily. Experience in Go, Python, and Cloud-Native technologies.',
    openGraph: {
        images: [
            {
                url: '/og?title=Resume',
                width: 1200,
                height: 630,
                alt: 'Nikzad Khani Resume',
            },
        ],
    },
}

export default function ResumePage() {
    return (
        <section>
            <div className="mb-8 flex flex-col-reverse md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tighter">
                        Nikzad Khani
                    </h1>
                    <p className="text-neutral-700 dark:text-neutral-300">
                        Senior Software Engineer at Verily
                    </p>
                </div>

                <a
                    href="/Nikzad-Khani-Resume.pdf"
                    download
                    className="mb-4 md:mb-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-colors"
                >
                    <svg
                        className="-ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                </a>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Senior Software Engineer at Verily in Boston, MA. I specialize in building scalable AI-driven applications and robust data pipelines using Go, Python, and cloud-native technologies.
                </p>

                <Experience />
                <Education />
                <Publications />
                <Skills />
            </div>
        </section>
    )
}
