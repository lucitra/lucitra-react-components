import React from 'react'
import { Input } from './Input'

export default {
  title: 'Design System/Atoms/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'A flexible text input component following component.gallery patterns. Supports various input types, sizes, and states for building robust forms.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
    },
    borderRadius: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
      description: 'Custom border radius in pixels',
    },
  },
  tags: ['autodocs'],
}

// Basic input
export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
}

// With label
export const WithLabel = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
}

// Required field
export const Required = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
}

// Error state
export const WithError = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
}

// Different sizes
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="md" placeholder="Medium input" label="Medium" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  ),
}

// Input types
export const InputTypes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input type="text" placeholder="Text input" label="Text" />
      <Input type="email" placeholder="Email input" label="Email" />
      <Input type="password" placeholder="Password input" label="Password" />
      <Input type="number" placeholder="Number input" label="Number" />
      <Input type="tel" placeholder="Phone input" label="Phone" />
      <Input type="url" placeholder="URL input" label="URL" />
      <Input type="search" placeholder="Search input" label="Search" />
    </div>
  ),
}

// States
export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input placeholder="Normal state" label="Normal" />
      <Input placeholder="Disabled state" label="Disabled" disabled />
      <Input placeholder="Read-only state" label="Read-only" readOnly value="Read-only value" />
      <Input placeholder="Error state" label="Error" error="Something went wrong" />
    </div>
  ),
}

// Full width
export const FullWidth = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes full width',
    fullWidth: true,
  },
}

// Custom border radius
export const CustomBorderRadius = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input placeholder="No radius" label="Square (0px)" borderRadius={0} />
      <Input placeholder="Small radius" label="Small radius (4px)" borderRadius={4} />
      <Input placeholder="Medium radius" label="Medium radius (8px)" borderRadius={8} />
      <Input placeholder="Large radius" label="Large radius (16px)" borderRadius={16} />
    </div>
  ),
}

// Form example
export const FormExample = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Input 
        label="First Name" 
        placeholder="Enter your first name"
        required
        fullWidth
      />
      <Input 
        label="Last Name" 
        placeholder="Enter your last name"
        required
        fullWidth
      />
      <Input 
        label="Email Address" 
        type="email"
        placeholder="Enter your email"
        required
        fullWidth
      />
      <Input 
        label="Phone Number" 
        type="tel"
        placeholder="Enter your phone number"
        fullWidth
      />
    </form>
  ),
}