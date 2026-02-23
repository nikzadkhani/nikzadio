import { getTopArtists } from '@/lib/spotify-query';

export default async function TopArtists() {
    const artists = await getTopArtists();

    if (artists.length === 0) {
        return <div className="text-sm text-neutral-500">No listening history yet.</div>;
    }

    return (
        <div className="w-full max-w-md">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-500">
                Top Artists (Last 30 Days)
            </h3>
            <ul className="space-y-2">
                {artists.map((artist, index) => (
                    <li
                        key={artist.artist}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                                {index + 1}
                            </span>
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                {artist.artist}
                            </span>
                        </div>
                        <span className="text-xs text-neutral-400">
                            {artist.count} plays
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
