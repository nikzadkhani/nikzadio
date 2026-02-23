import { NextRequest, NextResponse } from "next/server";
import { getRefreshToken } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    // The redirect_uri must exactly match what you configured in the Spotify Developer Dashboard
    // and what was used in the initial authorization request.
    const redirect_uri = `${request.nextUrl.origin}/api/spotify/callback`;

    const response = await getRefreshToken(code, redirect_uri);

    return NextResponse.json({
      message:
        "Success! Copy the refresh_token below and add it to your .env file.",
      ...response,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
