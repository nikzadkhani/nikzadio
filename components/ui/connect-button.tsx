"use client"

import { useState } from 'react'
import { ConnectionModal } from '@/components/features/connect/connection-modal'

export function ConnectButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-stone-900 to-stone-800 dark:from-stone-200 dark:to-stone-100 text-white dark:text-stone-900 rounded-full font-medium text-base sm:text-lg transition-all active:scale-95 w-full sm:w-auto overflow-hidden shadow-lg hover:shadow-xl"
            >
                {/* Shine effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <span className="relative flex items-center gap-2">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span>Connect to Claude</span>
                </span>
            </button>

            <ConnectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}
