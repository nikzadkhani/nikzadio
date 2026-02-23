import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/spotify";
import { db } from "@/lib/db";
import { tracks, listening_history } from "@/lib/schema";
import { sql } from "drizzle-orm";

// This is required to make Next.js treat this route as an API Endpoint
export const maxDuration = 10;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (authHeader !== `Bearer ${cronSecret}`) {
    // Safe debug logging — never log actual secret values
    console.error("[cron/spotify] Auth failed:", {
      cronSecretSet: !!cronSecret,
      cronSecretLength: cronSecret?.length ?? 0,
      authHeaderSet: !!authHeader,
      authHeaderLength: authHeader?.length ?? 0,
      // Compare first 4 chars of each to spot obvious mismatches
      cronSecretPrefix: cronSecret?.slice(0, 4) ?? "n/a",
      authHeaderPrefix: authHeader?.replace("Bearer ", "").slice(0, 4) ?? "n/a",
    });
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const recentlyPlayed = await getRecentlyPlayed(50);

    if (!recentlyPlayed?.items?.length) {
      return NextResponse.json({
        success: true,
        tracksInserted: 0,
        message: "No recently played tracks found.",
        recent: [],
      });
    }

    const trackValuesMap = new Map();
    const historyValues: { track_id: string; played_at: Date }[] = [];

    // Note: Spotify recently-played returns items in order of most recent first
    for (const item of recentlyPlayed.items) {
      const track = item.track;
      const playedAt = new Date(item.played_at);

      trackValuesMap.set(track.id, {
        id: track.id,
        name: track.name,
        artist_name: track.artists.map((a: any) => a.name).join(", "),
        duration_ms: track.duration_ms,
        album_image_url: track.album.images?.[0]?.url || null,
      });

      historyValues.push({
        track_id: track.id,
        played_at: playedAt,
      });
    }

    const uniqueTrackValues = Array.from(trackValuesMap.values());

    // 1. Batch Insert/Upsert tracks
    if (uniqueTrackValues.length > 0) {
      await db
        .insert(tracks)
        .values(uniqueTrackValues)
        .onConflictDoUpdate({
          target: tracks.id,
          set: {
            name: sql`EXCLUDED.name`,
            artist_name: sql`EXCLUDED.artist_name`,
            album_image_url: sql`EXCLUDED.album_image_url`,
          },
        });
    }

    // 2. Batch Insert listening history
    let newHistoryInserted: string[] = [];
    if (historyValues.length > 0) {
      const historyInsert = await db
        .insert(listening_history)
        .values(historyValues)
        .onConflictDoNothing()
        .returning();

      // Match inserted track IDs back to their names for the response
      newHistoryInserted = historyInsert.map((h) => {
        const t = uniqueTrackValues.find((track) => track.id === h.track_id);
        return t ? t.name : h.track_id;
      });
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
