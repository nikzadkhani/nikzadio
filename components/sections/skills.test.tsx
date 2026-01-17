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

    it('renders skill items as a flattened list', () => {
        render(<Skills />)
        // Skills should be joined by comma and space
        expect(screen.getByText('Skill 1, Skill 2, Skill A')).toBeDefined()
    })
})
