import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Experience } from './experience'

describe('Experience', () => {
    it('renders experience section', () => {
        render(<Experience />)
        expect(screen.getByText('Experience')).toBeDefined()
    })

    it('renders job entries', () => {
        render(<Experience />)
        expect(screen.getAllByText(/Verily/i).length).toBeGreaterThan(0)
    })
})
