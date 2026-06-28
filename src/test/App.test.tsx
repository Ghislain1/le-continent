import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    }, { timeout: 5000 })
  })
})
