import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Offline } from './offline-section'

describe('Offline Section', () => {
    // it('renders section title', () => {
    //     render(<Offline />)
    //     expect(screen.getByText('offline')).toBeDefined()
    // })

    it('renders brewing section', () => {
        render(<Offline />)
        expect(screen.getByText('Brewing')).toBeDefined()
        expect(screen.getByText(/Breville Touch Impress/)).toBeDefined()
    })

    it('renders music section with link', () => {
        render(<Offline />)
        expect(screen.getByText('On Rotation')).toBeDefined()

        const link = screen.getByRole('link')
        expect(link.getAttribute('href')).toBe('https://open.spotify.com/album/0Qc4m4sWGL2X4c07y5XF3R')
        expect(trackText('jazz is for ordinary people')).toBeDefined()
    })

    it('renders kitchen section', () => {
        render(<Offline />)
        expect(screen.getByText('The Kitchen Lab')).toBeDefined()
        expect(screen.getByText(/Cacio e Pepe/)).toBeDefined()
    })
})

function trackText(text: string) {
    return screen.getByText(text)
}
