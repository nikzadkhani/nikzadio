'use client'

import { useEffect, useState } from 'react'

export function Konami() {
    const [sequence, setSequence] = useState<string[]>([])
    const KONAMI_CODE = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'b',
        'a',
    ]

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setSequence((prev) => {
                const newSequence = [...prev, e.key]
                if (newSequence.length > KONAMI_CODE.length) {
                    newSequence.shift()
                }
                return newSequence
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if (JSON.stringify(sequence) === JSON.stringify(KONAMI_CODE)) {
            // Trigger Effect
            alert('GEAR 5 ACTIVATED! ⚡️')
            setSequence([])
        }
    }, [sequence])

    return null
}
