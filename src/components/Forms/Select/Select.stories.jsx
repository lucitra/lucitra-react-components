import React from 'react'
import Select from './Select'

export default {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible select dropdown component with consistent styling and accessibility features.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    variant: {
      control: 'radio',
      options: ['outlined', 'filled', 'standard']
    }
  }
}

const Template = (args) => <Select {...args} />

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' }
]

const paymentOptions = [
  { value: 'card', label: 'Credit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank', label: 'Bank Transfer' },
  { value: 'crypto', label: 'Cryptocurrency', disabled: true }
]

export const Default = Template.bind({})
Default.args = {
  label: 'Country',
  placeholder: 'Select a country',
  options: countryOptions
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Payment Method',
  placeholder: 'Choose payment method',
  options: paymentOptions,
  error: 'Please select a payment method'
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  label: 'Country',
  placeholder: 'Select your country',
  options: countryOptions,
  helperText: 'This will determine your shipping options'
}

export const Required = Template.bind({})
Required.args = {
  label: 'Payment Method',
  placeholder: 'Choose payment method',
  options: paymentOptions,
  required: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Country',
  options: countryOptions,
  disabled: true,
  value: 'us'
}

export const WithDisabledOptions = Template.bind({})
WithDisabledOptions.args = {
  label: 'Payment Method',
  placeholder: 'Choose payment method',
  options: paymentOptions
}

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Select 
      label="Small Select" 
      size="small" 
      placeholder="Small size"
      options={countryOptions}
    />
    <Select 
      label="Medium Select" 
      size="medium" 
      placeholder="Medium size (default)"
      options={countryOptions}
    />
    <Select 
      label="Large Select" 
      size="large" 
      placeholder="Large size"
      options={countryOptions}
    />
  </div>
)

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Select 
      label="Outlined" 
      variant="outlined" 
      placeholder="Outlined variant (default)"
      options={countryOptions}
    />
    <Select 
      label="Filled" 
      variant="filled" 
      placeholder="Filled variant"
      options={countryOptions}
    />
    <Select 
      label="Standard" 
      variant="standard" 
      placeholder="Standard variant"
      options={countryOptions}
    />
  </div>
)

export const FullWidth = Template.bind({})
FullWidth.args = {
  label: 'Full Width Select',
  placeholder: 'This select takes full width',
  options: countryOptions,
  fullWidth: true
}

export const WithChildren = () => (
  <Select label="Priority Level" placeholder="Select priority">
    <option value="low">Low Priority</option>
    <option value="medium">Medium Priority</option>
    <option value="high">High Priority</option>
    <option value="urgent" disabled>Urgent (Not Available)</option>
  </Select>
)

export const Controlled = () => {
  const [value, setValue] = React.useState('')
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select
        label="Country"
        placeholder="Select a country"
        options={countryOptions}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p style={{ fontSize: '14px', color: '#6b7280' }}>
        Selected value: {value || 'None'}
      </p>
    </div>
  )
}