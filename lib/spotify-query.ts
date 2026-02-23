import { pool } from '@/lib/db';

export type TopArtist = {
    artist: string;
    count: number;
};

export async function getTopArtists(limit: number = 5): Promise<TopArtist[]> {
    const result = await pool.query(
        `
    SELECT
      t.artist,
      COUNT(*) as count
    FROM play_history ph
    JOIN tracks t ON ph.track_id = t.id
    WHERE ph.played_at > NOW() - INTERVAL '30 days'
    GROUP BY t.artist
    ORDER BY count DESC
    LIMIT $1
    `,
        [limit]
    );

    return result.rows.map(row => ({
        artist: row.artist,
        count: parseInt(row.count, 10)
    }));
}
