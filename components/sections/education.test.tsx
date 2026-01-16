import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Education } from './education'

describe('Education', () => {
    it('renders education section', () => {
        render(<Education />)
        expect(screen.getByText('Education')).toBeDefined()
    })

    it('renders university name', () => {
        render(<Education />)
        expect(screen.getAllByText(/Tufts University/i).length).toBeGreaterThan(0)
    })
})
