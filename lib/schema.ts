import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const tracks = pgTable("tracks", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: text("name").notNull(),
  artist_name: text("artist_name").notNull(),
  duration_ms: integer("duration_ms").notNull(),
  album_image_url: text("album_image_url"),
});

export const listening_history = pgTable(
  "listening_history",
  {
    id: serial("id").primaryKey(),
    track_id: varchar("track_id", { length: 255 })
      .notNull()
      .references(() => tracks.id),
    played_at: timestamp("played_at", { withTimezone: true }).notNull(),
  },
  (table) => {
    return {
      uniquePlay: uniqueIndex("unique_play_idx").on(
        table.track_id,
        table.played_at
      ),
    };
  }
);
