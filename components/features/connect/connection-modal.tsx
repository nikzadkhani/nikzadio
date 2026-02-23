"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import React from "react";

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectionModal({ isOpen, onClose }: ConnectionModalProps) {
  const [activeTab, setActiveTab] = useState<"setup" | "test">("setup");
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const configSnippet = {
    mcpServers: {
      "nikzad-resume": {
        url: "https://www.nikzad.io/api/sse",
      },
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(configSnippet, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-stone-200 p-6 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                Connect to Claude
              </h2>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                Add Nikzad&apos;s resume agent to Claude Desktop
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-2">
            <button
              onClick={() => setActiveTab("setup")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === "setup"
                  ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900"
                  : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
                }`}
            >
              Setup Instructions
            </button>
            <button
              onClick={() => setActiveTab("test")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === "test"
                  ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900"
                  : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
                }`}
            >
              Test Client
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {activeTab === "setup" ? (
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Quick Setup
                </h3>
                <ol className="space-y-3 text-sm text-stone-700 dark:text-stone-300">
                  <li className="flex gap-3">
                    <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                      1.
                    </span>
                    <span>
                      Open Claude Desktop and go to Settings → Developer
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                      2.
                    </span>
                    <span>
                      Click &quot;Edit Config&quot; to open your MCP configuration file
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                      3.
                    </span>
                    <span>
                      Copy the configuration below and add it to your config
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                      4.
                    </span>
                    <span>Restart Claude Desktop to activate the server</span>
                  </li>
                </ol>
              </div>

              <div className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={handleCopy}
                    className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-stone-100 transition-opacity hover:opacity-80 dark:bg-stone-100 dark:text-stone-900"
                  >
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-stone-700 bg-stone-900 p-4 font-mono text-xs text-green-400 dark:bg-black">
                  {JSON.stringify(configSnippet, null, 2)}
                </pre>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>💡 Tip:</strong> Once connected, you can ask Claude
                  questions like &quot;What&apos;s Nikzad&apos;s latest work experience?&quot; or
                  &quot;List Nikzad&apos;s publications&quot; and it will use this MCP server
                  to fetch the data.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Test the MCP server right here in your browser. Ask questions
                about Nikzad&apos;s background!
              </p>
              <TestClient />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Test Client Component
function TestClient() {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string; toolName?: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const tools = [
    { name: "get_bio", label: "Get Bio", icon: "👤" },
    { name: "get_jobs", label: "Get Jobs", icon: "💼" },
    { name: "get_education", label: "Get Education", icon: "🎓" },
    { name: "get_skills", label: "Get Skills", icon: "⚡" },
    { name: "get_publications", label: "Get Publications", icon: "📄" },
  ];

  const handleToolCall = async (toolName: string, toolLabel: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `Calling ${toolLabel}...`, toolName },
    ]);
    setLoading(true);

    try {
      // Call the MCP server
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: Date.now(),
          method: "tools/call",
          params: {
            name: toolName,
            arguments: {},
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check for JSON-RPC errors
      if (data.error) {
        throw new Error(data.error.message || "MCP server returned an error");
      }

      // Format the response nicely
      let assistantMessage = "";
      if (data.result && data.result.content) {
        const content = data.result.content[0];
        if (content.type === "text") {
          assistantMessage = "```json\n" + content.text + "\n```";
        }
      } else {
        assistantMessage = "Sorry, I couldn't fetch the resume data.";
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${errorMessage}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tool Buttons */}
      <div>
        <p className="mb-3 text-xs text-stone-600 dark:text-stone-400">
          Select a tool to test:
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {tools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => handleToolCall(tool.name, tool.label)}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-stone-100 p-3 text-left text-sm text-stone-900 transition-colors hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700"
            >
              <span className="text-lg">{tool.icon}</span>
              <span className="font-medium">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      {messages.length > 0 && (
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 text-sm ${msg.role === "user"
                  ? "ml-8 bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100"
                  : "mr-8 bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100"
                }`}
            >
              {msg.role === "user" ? (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              ) : (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-inside list-disc space-y-1">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    pre: ({ children }) => (
                      <pre className="overflow-x-auto rounded bg-stone-200 p-2 dark:bg-stone-900">
                        {children}
                      </pre>
                    ),
                    code: ({ children }) => (
                      <code className="font-mono text-xs">{children}</code>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              )}
            </div>
          ))}
          {loading && (
            <div className="mr-8 rounded-lg bg-stone-100 p-3 text-sm text-stone-500 dark:bg-stone-800 dark:text-stone-400">
              <span className="mr-2">Fetching data...</span>
              <span className="inline-block animate-pulse">●</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
