import { StoneCard } from '@/ui'

export function OfflineSection() {
    return (
        <section className="mb-16" data-name="offline-section">


            <StoneCard intensity="medium" className="p-8 pr-12" data-name="offline-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col space-y-8">
                        {/* Coffee */}
                        <div className="flex flex-col space-y-2">
                            <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                                Brewing
                            </span>
                            <p className="text-stone-700 dark:text-stone-300">
                                Fueled by double shots on a Breville Touch Impress. Currently dialing in Barrington Gold beans.
                            </p>
                        </div>

                        {/* Music */}
                        <div className="flex flex-col space-y-2">
                            <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                                On Rotation
                            </span>
                            <a
                                href="https://open.spotify.com/album/0Qc4m4sWGL2X4c07y5XF3R"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-4 p-4 rounded-lg bg-stone-100 dark:bg-stone-800/50 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors group"
                            >
                                <div className="relative w-12 h-12 flex-shrink-0 bg-stone-300 rounded-md overflow-hidden">
                                    {/* Placeholder for Album Art */}
                                    <div className="absolute inset-0 flex items-center justify-center text-stone-500 text-xs">
                                        ♫
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">jazz is for ordinary people</span>
                                    <span className="text-xs text-stone-500">Berlioz</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Kitchen */}
                    <div className="flex flex-col space-y-4">
                        <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                            The Kitchen Lab
                        </span>
                        <div className="flex flex-col space-y-2 text-sm text-stone-600 dark:text-stone-400">
                            <p>
                                <span className="font-medium text-stone-900 dark:text-stone-200">Perfecting:</span> Cacio e Pepe
                            </p>
                            <p>
                                <span className="font-medium text-stone-900 dark:text-stone-200">Recent Favorite:</span> Bar Vlaha
                            </p>
                            <p className="italic text-xs pt-2">
                                "Cooking is like coding, but with better error handling (usually)."
                            </p>
                        </div>
                    </div>
                </div>
            </StoneCard>
        </section>
    )
}
