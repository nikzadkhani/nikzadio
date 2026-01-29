package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nikzadkhani/nikzadio/data"
)

var httpServer *server.StreamableHTTPServer

func init() {
	// Initialize the MCP server
	s := server.NewMCPServer("Nikzad's Resume Agent", "1.0.0")

	// Register the get_resume tool
	tool := mcp.NewTool("get_resume",
		mcp.WithDescription("Fetch Nikzad Khani's resume data, including bio, work experience, education, publications, and skills."),
	)

	// Tool handler with context
	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		resumeData := data.GetResumeData()

		jsonData, err := json.MarshalIndent(resumeData, "", "  ")
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("Failed to serialize resume data: %v", err)), nil
		}

		return mcp.NewToolResultText(string(jsonData)), nil
	}

	s.AddTool(tool, handler)

	// Create Streamable HTTP Server (Vercel-compatible)
	// This transport works with serverless functions because:
	// - POST requests are stateless (each request is independent)
	// - GET requests support optional streaming but don't require it
	// - No persistent connections required for basic functionality
	httpServer = server.NewStreamableHTTPServer(s,
		server.WithStateLess(true), // Stateless mode for Vercel compatibility
	)
}

// Handler is the Vercel Serverless Function entrypoint
func Handler(w http.ResponseWriter, r *http.Request) {
	httpServer.ServeHTTP(w, r)
}
