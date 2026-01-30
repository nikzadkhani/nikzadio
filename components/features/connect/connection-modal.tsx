"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

interface ConnectionModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ConnectionModal({ isOpen, onClose }: ConnectionModalProps) {
    const [activeTab, setActiveTab] = useState<'setup' | 'test'>('setup')
    const [copied, setCopied] = useState(false)

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    const configSnippet = {
        "mcpServers": {
            "nikzad-resume": {
                "command": "npx",
                "args": [
                    "-y",
                    "@modelcontextprotocol/server-fetch",
                    "https://nikzad.io/api"
                ]
            }
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(configSnippet, null, 2))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-stone-200 dark:border-stone-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-stone-200 dark:border-stone-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                                Connect to Claude
                            </h2>
                            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                                Add Nikzad's resume agent to Claude Desktop
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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
                    <div className="flex gap-2 mt-6">
                        <button
                            onClick={() => setActiveTab('setup')}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'setup'
                                ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                                }`}
                        >
                            Setup Instructions
                        </button>
                        <button
                            onClick={() => setActiveTab('test')}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'test'
                                ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                                }`}
                        >
                            Test Client
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {activeTab === 'setup' ? (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-3 text-stone-900 dark:text-stone-100">
                                    Quick Setup
                                </h3>
                                <ol className="space-y-3 text-sm text-stone-700 dark:text-stone-300">
                                    <li className="flex gap-3">
                                        <span className="font-mono font-bold text-stone-900 dark:text-stone-100">1.</span>
                                        <span>Open Claude Desktop and go to Settings → Developer</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-mono font-bold text-stone-900 dark:text-stone-100">2.</span>
                                        <span>Click "Edit Config" to open your MCP configuration file</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-mono font-bold text-stone-900 dark:text-stone-100">3.</span>
                                        <span>Copy the configuration below and add it to your config</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-mono font-bold text-stone-900 dark:text-stone-100">4.</span>
                                        <span>Restart Claude Desktop to activate the server</span>
                                    </li>
                                </ol>
                            </div>

                            <div className="relative">
                                <div className="absolute top-3 right-3 z-10">
                                    <button
                                        onClick={handleCopy}
                                        className="px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-lg text-xs font-medium hover:opacity-80 transition-opacity"
                                    >
                                        {copied ? '✓ Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <pre className="bg-stone-900 dark:bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono border border-stone-700">
                                    {JSON.stringify(configSnippet, null, 2)}
                                </pre>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <p className="text-sm text-blue-900 dark:text-blue-100">
                                    <strong>💡 Tip:</strong> Once connected, you can ask Claude questions like "What's Nikzad's latest work experience?"
                                    or "List Nikzad's publications" and it will use this MCP server to fetch the data.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                Test the MCP server right here in your browser. Ask questions about Nikzad's background!
                            </p>
                            <TestClient />
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

// Test Client Component
function TestClient() {
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; toolName?: string }>>([])
    const [loading, setLoading] = useState(false)

    const tools = [
        { name: 'get_bio', label: 'Get Bio', icon: '👤' },
        { name: 'get_jobs', label: 'Get Jobs', icon: '💼' },
        { name: 'get_education', label: 'Get Education', icon: '🎓' },
        { name: 'get_skills', label: 'Get Skills', icon: '⚡' },
        { name: 'get_publications', label: 'Get Publications', icon: '📄' },
    ]

    const handleToolCall = async (toolName: string, toolLabel: string) => {
        setMessages(prev => [...prev, { role: 'user', content: `Calling ${toolLabel}...`, toolName }])
        setLoading(true)

        try {
            // Call the MCP server
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: Date.now(),
                    method: 'tools/call',
                    params: {
                        name: toolName,
                        arguments: {}
                    }
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            // Check for JSON-RPC errors
            if (data.error) {
                throw new Error(data.error.message || 'MCP server returned an error')
            }

            // Format the response nicely
            let assistantMessage = ''
            if (data.result && data.result.content) {
                const content = data.result.content[0]
                if (content.type === 'text') {
                    assistantMessage = "```json\n" + content.text + "\n```"
                }
            } else {
                assistantMessage = 'Sorry, I couldn\'t fetch the resume data.'
            }

            setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }])
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Error: ${errorMessage}`
            }])
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="space-y-4">
            {/* Tool Buttons */}
            <div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">Select a tool to test:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tools.map((tool) => (
                        <button
                            key={tool.name}
                            onClick={() => handleToolCall(tool.name, tool.label)}
                            disabled={loading}
                            className="text-left p-3 text-sm bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors text-stone-900 dark:text-stone-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <span className="text-lg">{tool.icon}</span>
                            <span className="font-medium">{tool.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Messages */}
            {messages.length > 0 && (
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-3 rounded-lg text-sm ${msg.role === 'user'
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 ml-8'
                                    : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 mr-8'
                                }`}
                        >
                            {msg.role === "user" ? <div className="whitespace-pre-wrap">{msg.content}</div> : <ReactMarkdown components={{ p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>, strong: ({ children }) => <strong className="font-bold">{children}</strong>, ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>, li: ({ children }) => <li>{children}</li> }}>{msg.content}</ReactMarkdown>}
                        </div>
                    ))}
                    {loading && (
                        <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg mr-8 text-sm text-stone-500 dark:text-stone-400">
                            <span className="mr-2">Fetching data...</span>
                            <span className="inline-block animate-pulse">●</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
