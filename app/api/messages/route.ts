
import { mcpServer } from "@/lib/mcp";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    return mcpServer.handleMessage(req);
}
