import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './footer'

describe('Footer', () => {
    it('renders github links', () => {
        render(<Footer />)
        expect(screen.getByText('github')).toBeDefined()
        expect(screen.getByText('view source')).toBeDefined()
    })

    it('renders copyright with current year', () => {
        render(<Footer />)
        const year = new Date().getFullYear().toString()
        expect(screen.getByText((content) => content.includes(year))).toBeDefined()
    })
})
