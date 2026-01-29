"use client";

export function Footer() {
    return (
        <footer className="mt-48 pb-12 border-t border-stone-200 dark:border-stone-800 pt-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-stone-500 dark:text-stone-400">
                {/* Status Column */}
                <div className="space-y-6">
                    <h3 className="uppercase tracking-widest text-xs font-semibold text-stone-900 dark:text-stone-100 mb-4">System Status</h3>

                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>System Online</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-stone-300 dark:bg-stone-700"></span>
                            <span>Brewing: Barrington Gold (Espresso)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-stone-300 dark:bg-stone-700"></span>
                            <span>Rotation: Berlioz - Jazz is for ordinary people</span>
                        </div>
                    </div>
                </div>

                {/* Socials Column */}
                <div className="space-y-6">
                    <h3 className="uppercase tracking-widest text-xs font-semibold text-stone-900 dark:text-stone-100 mb-4">Connect</h3>
                    <div className="flex flex-col gap-2">
                        <a href="mailto:hello@nikzad.io" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">hello@nikzad.io</a>
                        <a href="https://github.com/nikzadio" target="_blank" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">github.com/nikzadio</a>
                        <a href="https://linkedin.com/in/nikzadkhani" target="_blank" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">linkedin.com/in/nikzadkhani</a>
                    </div>
                </div>
            </div>

            <div className="mt-24 text-center text-xs text-stone-300 dark:text-stone-700">
                <p>&copy; {new Date().getFullYear()} Nikzad Khani. Built with Next.js & Tailwind. Deployed on Vercel.</p>
            </div>
        </footer>
    );
}
