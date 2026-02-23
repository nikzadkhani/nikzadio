import { getRefreshToken } from "../lib/spotify";

// Ensure environment variables are loaded if not using a tool that does it automatically
import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });
dotenv.config();

const CODE = process.argv[2];
const REDIRECT_URI = "https://example.com/callback";

if (!CODE) {
    console.error("Please provide the authorization code as an argument.");
    console.error("Usage: npx tsx scripts/get-spotify-token.ts <AUTH_CODE>");
    process.exit(1);
}

async function main() {
    try {
        console.log(`Exchanging code for token...`);
        const response = await getRefreshToken(CODE, REDIRECT_URI);
        console.log("\nSuccess! Here is your response from Spotify:\n");
        console.log("=== REFRESH TOKEN (Save this to your .env file) ===");
        console.log(response.refresh_token);
        console.log("===================================================\n");
        console.log("Full response:");
        console.log(response);
    } catch (error) {
        console.error("Error exchanging code for token:", error);
    }
}

main();
