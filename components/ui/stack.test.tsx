import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Stack } from './stack'

describe('Stack Component', () => {
    it('renders all stack items', () => {
        render(<Stack />)
        const expectedItems = [
            'Go',
            'Python',
            'GCP',
            'Atlassian Ops',
            'React',
            'Terraform',
            'Kubernetes',
        ]

        expectedItems.forEach(item => {
            expect(screen.getByText(item)).toBeDefined()
        })
    })
})
