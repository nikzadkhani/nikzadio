const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

const getAccessToken = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error("Missing Spotify environment variables");
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  return response.json();
};

export const getRecentlyPlayed = async (limit: number = 10) => {
  const { access_token } = await getAccessToken();

  const response = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch recently played tracks: ${response.statusText}`
    );
  }

  return response.json();
};

export const getRefreshToken = async (code: string, redirect_uri: string) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    throw new Error("Missing Spotify environment variables");
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error("Spotify API Error response:", errorBody);
    throw new Error(
      `Failed to fetch refresh token: ${response.statusText} - ${errorBody.error_description || errorBody.error}`
    );
  }

  return response.json();
};
