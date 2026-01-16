import Image from 'next/image'

export function Offline() {
    return (
        <section className="mb-16 glass-panel rounded-2xl p-6 md:p-8">
            <h2 className="mb-8 text-xl font-heading font-serif italic text-neutral-400">
                offline
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-8">
                    {/* Coffee */}
                    <div className="flex flex-col space-y-2">
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                            Brewing
                        </span>
                        <p className="text-neutral-300">
                            Fueled by double shots on a Breville Touch Impress. Currently dialing in Barrington Gold beans.
                        </p>
                    </div>

                    {/* Music */}
                    <div className="flex flex-col space-y-2">
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                            On Rotation
                        </span>
                        <a
                            href="https://open.spotify.com/album/0Qc4m4sWGL2X4c07y5XF3R"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group"
                        >
                            <div className="relative w-12 h-12 flex-shrink-0 bg-white/10 rounded-md overflow-hidden flex items-center justify-center">
                                <span className="text-neutral-500 text-lg">♫</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-sm group-hover:text-cyan-300 transition-colors">jazz is for ordinary people</span>
                                <span className="text-xs text-neutral-500">Berlioz</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Kitchen */}
                <div className="flex flex-col space-y-4">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                        The Kitchen Lab
                    </span>
                    <div className="flex flex-col space-y-2 text-sm text-neutral-400">
                        <p>
                            <span className="font-medium text-neutral-200">Perfecting:</span> Cacio e Pepe
                        </p>
                        <p>
                            <span className="font-medium text-neutral-200">Recent Favorite:</span> Bar Vlaha
                        </p>
                        <p className="italic text-xs pt-2 text-neutral-500">
                            "Cooking is like coding, but with better error handling (usually)."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
