import React from 'react'
import Input from './Input'
import { IconMail, IconSearch, IconEye, IconEyeOff } from '@tabler/icons-react'

export default {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible input component that supports various types, validation states, and accessibility features.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date']
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    variant: {
      control: 'radio',
      options: ['outlined', 'filled', 'standard']
    },
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end']
    }
  }
}

const Template = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Email Address',
  placeholder: 'Enter your email',
  type: 'email'
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Email Address',
  placeholder: 'Enter your email',
  type: 'email',
  value: 'invalid-email',
  error: 'Please enter a valid email address'
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  helperText: 'Must be at least 8 characters long'
}

export const Required = Template.bind({})
Required.args = {
  label: 'Full Name',
  placeholder: 'Enter your full name',
  required: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Username',
  placeholder: 'Enter username',
  disabled: true,
  value: 'john_doe'
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
  label: 'User ID',
  value: 'USR-12345',
  readOnly: true
}

export const WithStartIcon = Template.bind({})
WithStartIcon.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  startIcon: <IconMail size={16} />
}

export const WithEndIcon = Template.bind({})
WithEndIcon.args = {
  label: 'Search',
  placeholder: 'Search...',
  type: 'search',
  endIcon: <IconSearch size={16} />
}

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input label="Small Input" size="small" placeholder="Small size" />
    <Input label="Medium Input" size="medium" placeholder="Medium size (default)" />
    <Input label="Large Input" size="large" placeholder="Large size" />
  </div>
)

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input label="Outlined" variant="outlined" placeholder="Outlined variant (default)" />
    <Input label="Filled" variant="filled" placeholder="Filled variant" />
    <Input label="Standard" variant="standard" placeholder="Standard variant" />
  </div>
)

export const Types = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input label="Text" type="text" placeholder="Text input" />
    <Input label="Email" type="email" placeholder="Email input" />
    <Input label="Password" type="password" placeholder="Password input" />
    <Input label="Number" type="number" placeholder="Number input" />
    <Input label="Date" type="date" />
    <Input label="Search" type="search" placeholder="Search input" />
  </div>
)

export const FullWidth = Template.bind({})
FullWidth.args = {
  label: 'Full Width Input',
  placeholder: 'This input takes full width',
  fullWidth: true
}

export const PasswordToggle = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  
  return (
    <Input
      label="Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter your password"
      endIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#6b7280'
          }}
        >
          {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
        </button>
      }
    />
  )
}