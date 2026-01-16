import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skills } from './skills'

// Mock the data module
vi.mock('data/portfolio', () => ({
    SKILLS: {
        'Test Category': ['Skill 1', 'Skill 2'],
        'Another Category': ['Skill A']
    }
}))

describe('Skills Section', () => {
    it('renders section title', () => {
        render(<Skills />)
        expect(screen.getByText('Technical Skills')).toBeDefined()
    })

    it('renders skill categories', () => {
        render(<Skills />)
        expect(screen.getByText('Test Category')).toBeDefined()
        expect(screen.getByText('Another Category')).toBeDefined()
    })

    it('renders skill items', () => {
        render(<Skills />)
        expect(screen.getByText('Skill 1, Skill 2')).toBeDefined()
        expect(screen.getByText('Skill A')).toBeDefined()
    })
})
