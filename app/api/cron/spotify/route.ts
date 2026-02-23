import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/spotify";
import { db } from "@/lib/db";
import { tracks, listening_history } from "@/lib/schema";

// This is required to make Next.js treat this route as an API Endpoint
export const maxDuration = 10;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const recentlyPlayed = await getRecentlyPlayed(50);
    const newHistoryInserted = [];

    // Note: Spotify recently-played returns items in order of most recent first
    for (const item of recentlyPlayed.items) {
      const track = item.track;
      const playedAt = new Date(item.played_at);

      // 1. Insert/Upsert the track metadata into the `tracks` table
      await db
        .insert(tracks)
        .values({
          id: track.id,
          name: track.name,
          artist_name: track.artists.map((a: any) => a.name).join(", "),
          duration_ms: track.duration_ms,
          album_image_url: track.album.images?.[0]?.url || null,
        })
        .onConflictDoUpdate({
          target: tracks.id,
          set: {
            name: track.name,
            artist_name: track.artists.map((a: any) => a.name).join(", "),
            album_image_url: track.album.images?.[0]?.url || null,
          },
        });

      // 2. Insert the listening history entry.
      // If the GitHub Action runs frequently, there will be overlapping tracks.
      // The unique index on `(track_id, played_at)` and `onConflictDoNothing` handles duplicates cleanly.
      const historyInsert = await db
        .insert(listening_history)
        .values({
          track_id: track.id,
          played_at: playedAt,
        })
        .onConflictDoNothing()
        .returning();

      if (historyInsert.length > 0) {
        newHistoryInserted.push(track.name);
      }
    }

    return NextResponse.json({
      success: true,
      tracksInserted: newHistoryInserted.length,
      message: `Inserted ${newHistoryInserted.length} new listening events into the database.`,
      recent: newHistoryInserted,
    });
  } catch (error: any) {
    console.error("Cron Job Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
