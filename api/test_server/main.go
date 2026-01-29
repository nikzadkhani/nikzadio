package main

import (
	"log"
	"net/http"

	handler "github.com/nikzadkhani/nikzadio/api"
)

func main() {
	http.HandleFunc("/", handler.Handler)

	log.Println("🚀 MCP Server running on http://localhost:8080")
	log.Println("📋 Test with: curl -X POST http://localhost:8080 -H 'Content-Type: application/json' -d '{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"initialize\",\"params\":{\"protocolVersion\":\"2024-11-05\",\"clientInfo\":{\"name\":\"test\",\"version\":\"1.0\"}}}'")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
