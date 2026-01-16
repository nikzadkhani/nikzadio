import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Publications } from './publications'

describe('Publications', () => {
    it('renders publications section', () => {
        render(<Publications />)
        expect(screen.getByText('Publications')).toBeDefined()
    })

    it('renders google scholar link', () => {
        render(<Publications />)
        expect(screen.getAllByText(/Google Scholar/i).length).toBeGreaterThan(0)
    })
})
