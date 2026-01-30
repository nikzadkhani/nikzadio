import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
// @ts-ignore
import toml from "toml";
import fs from "fs";
import path from "path";

// Define generic interface for resume data
interface ResumeData {
    bio: any;
    jobs: any;
    education: any;
    skills: any;
    publications: any;
}

export class ResumeMcpServer {
    private server: McpServer;
    private data: ResumeData | null = null;
    private transport: SSEServerTransport | null = null;

    constructor() {
        this.server = new McpServer({
            name: "Nikzad's Resume Agent",
            version: "1.0.0",
        });

        this.registerTools();
    }

    private loadData() {
        if (this.data) return this.data;

        try {
            const dataDir = path.join(process.cwd(), "data");

            const readToml = (filename: string) => {
                const filePath = path.join(dataDir, filename);
                const fileContent = fs.readFileSync(filePath, "utf-8");
                return toml.parse(fileContent);
            };

            this.data = {
                bio: readToml("bio.toml"),
                jobs: readToml("jobs.toml"),
                education: readToml("education.toml"),
                skills: readToml("skills.toml"),
                publications: readToml("publications.toml"),
            };
        } catch (error) {
            console.error("Failed to load resume data:", error);
            // Return empty data structure if loading fails
            this.data = { bio: {}, jobs: {}, education: {}, skills: {}, publications: {} };
        }
        return this.data;
    }

    private registerTools() {
        this.server.tool(
            "get_bio",
            "Get Nikzad Khani's bio, name, and current title.",
            {},
            async () => {
                const data = this.loadData();
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(data?.bio || {}, null, 2)
                    }]
                };
            }
        );

        this.server.tool(
            "get_jobs",
            "Get Nikzad Khani's work experience and job history.",
            {},
            async () => {
                const data = this.loadData();
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(data?.jobs || {}, null, 2)
                    }]
                };
            }
        );

        this.server.tool(
            "get_education",
            "Get Nikzad Khani's educational background.",
            {},
            async () => {
                const data = this.loadData();
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(data?.education || {}, null, 2)
                    }]
                };
            }
        );

        this.server.tool(
            "get_skills",
            "Get Nikzad Khani's technical skills organized by category.",
            {},
            async () => {
                const data = this.loadData();
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(data?.skills || {}, null, 2)
                    }]
                };
            }
        );

        this.server.tool(
            "get_publications",
            "Get Nikzad Khani's research publications and papers.",
            {},
            async () => {
                const data = this.loadData();
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(data?.publications || {}, null, 2)
                    }]
                };
            }
        );
    }

    public async handleSSE(req: Request) {
        const transport = new SSEServerTransport("/api/messages", {
            // @ts-ignore
            keepAlive: true,
            keepAliveInterval: 5000,
        });

        // Create a stream that we can write to
        const stream = new TransformStream();
        const writer = stream.writable.getWriter();
        const encoder = new TextEncoder();

        // Override send to write to the stream
        transport.send = async (message) => {
            const sseData = `event: message\ndata: ${JSON.stringify(message)}\n\n`;
            await writer.write(encoder.encode(sseData));
        };

        // Override start to write the endpoint event and handle closure
        // @ts-ignore
        transport.start = async (res: any) => {
            // We ignore 'res' because we are controlling the stream directly
            const endpointEvent = `event: endpoint\ndata: /api/messages\n\n`;
            await writer.write(encoder.encode(endpointEvent));
        };

        // @ts-ignore
        this.transport = transport;

        // Handle closure
        req.signal.addEventListener("abort", () => {
            writer.close().catch(() => { });
            this.server.close();
        });

        // Connect the server to the transport
        // connect call transport.start(), which we overrode
        await this.server.connect(transport);

        return new Response(stream.readable, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        });
    }

    public async handleMessage(req: Request) {
        let body;
        try {
            body = await req.json();
        } catch (e) {
            return new Response("Invalid JSON", { status: 400 });
        }

        return this.processStatelessPost(body);
    }

    private async processStatelessPost(body: any) {
        // Create a temporary server instance for this request
        const tempServer = new McpServer({
            name: "Nikzad's Resume Agent",
            version: "1.0.0"
        });

        this.registerToolsOnServer(tempServer);

        // Mock transport
        let responseData: any = null;
        const mockTransport = {
            start: async () => { },
            send: async (message: any) => {
                responseData = message;
            },
            close: async () => { },
            onmessage: (message: any) => { },
            onclose: () => { },
            onerror: (error: Error) => { },
        };

        await tempServer.connect(mockTransport);

        // Inject the message
        if (mockTransport.onmessage) {
            // @ts-ignore
            mockTransport.onmessage(body);
        }

        // Wait for response
        // @ts-ignore
        if (!responseData) {
            await new Promise<void>((resolve) => {
                const originalSend = mockTransport.send;
                mockTransport.send = async (message) => {
                    responseData = message;
                    resolve();
                };
                setTimeout(resolve, 5000);
            });
        }

        return Response.json(responseData);
    }

    private registerToolsOnServer(server: McpServer) {
        const data = this.loadData();
        server.tool("get_bio", {}, async () => ({ content: [{ type: "text", text: JSON.stringify(data?.bio || {}, null, 2) }] }));
        server.tool("get_jobs", {}, async () => ({ content: [{ type: "text", text: JSON.stringify(data?.jobs || {}, null, 2) }] }));
        server.tool("get_education", {}, async () => ({ content: [{ type: "text", text: JSON.stringify(data?.education || {}, null, 2) }] }));
        server.tool("get_skills", {}, async () => ({ content: [{ type: "text", text: JSON.stringify(data?.skills || {}, null, 2) }] }));
        server.tool("get_publications", {}, async () => ({ content: [{ type: "text", text: JSON.stringify(data?.publications || {}, null, 2) }] }));
    }
}

export const mcpServer = new ResumeMcpServer();
