import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ModularButton } from '../ModularButton'

describe('ModularButton', () => {
  it('renders with children', () => {
    render(<ModularButton>Test Button</ModularButton>)
    expect(screen.getByRole('button')).toHaveTextContent('Test Button')
  })

  it('applies primary variant styles', () => {
    render(<ModularButton variant="primary">Primary Button</ModularButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ backgroundColor: '#007bff' })
  })

  it('applies secondary variant styles', () => {
    render(<ModularButton variant="secondary">Secondary Button</ModularButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ backgroundColor: '#6c757d' })
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<ModularButton onClick={handleClick}>Click Me</ModularButton>)
    
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<ModularButton disabled>Disabled Button</ModularButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})