import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Navbar } from './nav'

// Mock ThemeToggle to isolate Navbar testing
vi.mock('@/components/ui/theme-toggle', () => ({
    ThemeToggle: () => <button>Toggle</button>
}))

describe('Navbar', () => {
    it('renders navigation links', () => {
        render(<Navbar />)
        expect(screen.getByText('home')).toBeDefined()
        expect(screen.getByText('resume')).toBeDefined()
    })

    it('renders theme toggle', () => {
        render(<Navbar />)
        expect(screen.getByText('Toggle')).toBeDefined()
    })
})
