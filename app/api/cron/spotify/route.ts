import { NextRequest, NextResponse } from 'next/server';
import { getRecentlyPlayed } from '@/lib/spotify';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const { items } = await getRecentlyPlayed(50);

        if (!items || !Array.isArray(items)) {
            return NextResponse.json({ success: true, count: 0, message: "No items found" });
        }

        let insertedCount = 0;

        // Use a client for transaction
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            for (const item of items) {
                const track = item.track;
                const playedAt = item.played_at;

                if (!track || !playedAt) continue;

                const spotifyId = track.id;
                const name = track.name;
                // Handle multiple artists
                const artist = track.artists.map((a: any) => a.name).join(', ');
                const album = track.album.name;
                const coverUrl = track.album.images?.[0]?.url || null;
                const url = track.external_urls?.spotify || null;
                const durationMs = track.duration_ms;

                // 1. Normalized Upsert for Track
                // We only update mutable fields like cover_url/url just in case they changed, 
                // but typically track metadata is static.
                const trackRes = await client.query(
                    `INSERT INTO tracks (spotify_id, name, artist, album, cover_url, url, duration_ms)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (spotify_id)
           DO UPDATE SET
             cover_url = EXCLUDED.cover_url,
             url = EXCLUDED.url
           RETURNING id`,
                    [spotifyId, name, artist, album, coverUrl, url, durationMs]
                );

                const trackId = trackRes.rows[0].id;

                // 2. Insert Play History
                // We ignore if played_at already exists
                const historyRes = await client.query(
                    `INSERT INTO play_history (track_id, played_at)
           VALUES ($1, $2)
           ON CONFLICT (played_at) DO NOTHING`,
                    [trackId, playedAt]
                );

                // Check if a row was actually inserted
                if ((historyRes as any).rowCount > 0) {
                    insertedCount++;
                }
            }

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

        return NextResponse.json({ success: true, count: insertedCount });
    } catch (error) {
        console.error('Error syncing Spotify history:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
