
import { mcpServer } from "@/lib/mcp";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    return mcpServer.handleMessage(req);
}

export async function OPTIONS(req: Request) {
    return new Response(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}
