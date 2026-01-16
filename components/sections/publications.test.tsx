import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Publications } from './publications'

describe('Publications', () => {
    it('renders publications section', () => {
        render(<Publications />)
        expect(screen.getByText('Publications')).toBeDefined()
    })

    it('renders publication title', () => {
        render(<Publications />)
        expect(screen.getByText(/An Exploration of Deep Reinforcement Learning Methods/i)).toBeDefined()
    })
})
