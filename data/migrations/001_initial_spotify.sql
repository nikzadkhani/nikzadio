-- Create tables for Spotify tracking

CREATE TABLE IF NOT EXISTS tracks (
  id SERIAL PRIMARY KEY,
  spotify_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT NOT NULL,
  cover_url TEXT,
  url TEXT,
  duration_ms INT
);

CREATE TABLE IF NOT EXISTS play_history (
  id SERIAL PRIMARY KEY,
  played_at TIMESTAMP UNIQUE NOT NULL,
  track_id INTEGER REFERENCES tracks(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_played_at ON play_history(played_at);
