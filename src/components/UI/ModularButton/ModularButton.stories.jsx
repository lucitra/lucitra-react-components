import React from 'react'
import { ModularButton } from '../ModularButton'

export default {
  title: 'Privacy/UI/ModularButton',
  component: ModularButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A styled button component for privacy interfaces with monochrome design.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
      description: 'Button style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction'
    }
  }
}

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <ModularButton variant="primary">Primary</ModularButton>
    <ModularButton variant="secondary">Secondary</ModularButton>
    <ModularButton variant="success">Success</ModularButton>
    <ModularButton variant="danger">Danger</ModularButton>
    <ModularButton variant="warning">Warning</ModularButton>
  </div>
)

export const Disabled = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button'
  }
}