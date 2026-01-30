
import { mcpServer } from "@/lib/mcp";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    return mcpServer.handleSSE(req);
}
