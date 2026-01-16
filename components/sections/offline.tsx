import Image from 'next/image'

export function Offline() {
    return (
        <section className="mb-24 border-t border-neutral-200 dark:border-neutral-800 pt-16">
            <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-8">
                Offline
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    {/* Coffee */}
                    <div className="space-y-3">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                            Brewing
                        </span>
                        <p className="text-neutral-900 dark:text-neutral-100 font-medium">
                            Fueled by double shots on a Breville Touch Impress. Currently dialing in Barrington Gold beans.
                        </p>
                    </div>

                    {/* Music */}
                    <div className="space-y-3">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                            On Rotation
                        </span>
                        <a
                            href="https://open.spotify.com/album/0Qc4m4sWGL2X4c07y5XF3R"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-4 p-4 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                        >
                            <div className="relative w-10 h-10 flex-shrink-0 bg-neutral-200 dark:bg-neutral-700 rounded-md overflow-hidden flex items-center justify-center group-hover:bg-neutral-300 dark:group-hover:bg-neutral-600 transition-colors">
                                <span className="text-neutral-500 text-xs text-xl leading-none pb-1">♫</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">jazz is for ordinary people</span>
                                <span className="text-xs text-neutral-500">Berlioz</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Kitchen */}
                <div className="space-y-4">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        The Kitchen Lab
                    </span>
                    <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                            <span>Perfecting</span>
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">Cacio e Pepe</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                            <span>Recent Favorite</span>
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">Bar Vlaha</span>
                        </div>
                        <p className="italic text-xs pt-2 text-neutral-500">
                            "Cooking is like coding, but with better error handling (usually)."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
