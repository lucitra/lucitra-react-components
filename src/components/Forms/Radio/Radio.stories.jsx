import React from 'react'
import Radio from './Radio'

export default {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible radio button component for single selection within a group. Supports controlled/uncontrolled states and consistent styling.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end']
    }
  }
}

const Template = (args) => <Radio {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'payment',
  value: 'card',
  label: 'Credit Card'
}

export const Checked = Template.bind({})
Checked.args = {
  name: 'payment',
  value: 'paypal',
  label: 'PayPal',
  defaultChecked: true
}

export const WithError = Template.bind({})
WithError.args = {
  name: 'required-field',
  value: 'option1',
  label: 'Required option',
  required: true,
  error: 'This field is required'
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  name: 'shipping',
  value: 'express',
  label: 'Express Shipping',
  helperText: 'Delivered within 1-2 business days'
}

export const Required = Template.bind({})
Required.args = {
  name: 'terms',
  value: 'agree',
  label: 'I agree to the terms and conditions',
  required: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  name: 'disabled-option',
  value: 'disabled',
  label: 'This option is disabled',
  disabled: true
}

export const DisabledChecked = Template.bind({})
DisabledChecked.args = {
  name: 'disabled-checked',
  value: 'disabled-checked',
  label: 'Disabled and checked',
  disabled: true,
  defaultChecked: true
}

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Radio name="size-demo" value="small" label="Small radio" size="small" />
    <Radio name="size-demo" value="medium" label="Medium radio" size="medium" />
    <Radio name="size-demo" value="large" label="Large radio" size="large" />
  </div>
)

export const LabelPlacement = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Radio 
      name="placement-demo" 
      value="end" 
      label="Label on the right (default)" 
      labelPlacement="end" 
    />
    <Radio 
      name="placement-demo" 
      value="start" 
      label="Label on the left" 
      labelPlacement="start" 
    />
  </div>
)

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  name: 'no-label',
  value: 'no-label',
  'aria-label': 'Radio without visible label'
}

export const RadioGroup = () => {
  const [selectedPayment, setSelectedPayment] = React.useState('')
  
  const paymentOptions = [
    { value: 'card', label: 'Credit Card', helper: 'Visa, MasterCard, American Express' },
    { value: 'paypal', label: 'PayPal', helper: 'Pay with your PayPal account' },
    { value: 'bank', label: 'Bank Transfer', helper: '2-3 business days processing' },
    { value: 'crypto', label: 'Cryptocurrency', helper: 'Bitcoin, Ethereum accepted', disabled: true }
  ]
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
        Payment Method:
      </h4>
      {paymentOptions.map(option => (
        <Radio
          key={option.value}
          name="payment-method"
          value={option.value}
          label={option.label}
          helperText={option.helper}
          disabled={option.disabled}
          checked={selectedPayment === option.value}
          onChange={(e) => setSelectedPayment(e.target.value)}
        />
      ))}
      <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        Selected: {selectedPayment || 'None'}
      </p>
    </div>
  )
}

export const ShippingOptions = () => {
  const [selectedShipping, setSelectedShipping] = React.useState('standard')
  
  const shippingOptions = [
    { value: 'standard', label: 'Standard Shipping', helper: 'FREE - 5-7 business days' },
    { value: 'express', label: 'Express Shipping', helper: '$9.99 - 2-3 business days' },
    { value: 'overnight', label: 'Overnight Shipping', helper: '$24.99 - Next business day' }
  ]
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
        Shipping Options:
      </h4>
      {shippingOptions.map(option => (
        <Radio
          key={option.value}
          name="shipping-method"
          value={option.value}
          label={option.label}
          helperText={option.helper}
          checked={selectedShipping === option.value}
          onChange={(e) => setSelectedShipping(e.target.value)}
        />
      ))}
    </div>
  )
}

export const ControlledWithValidation = () => {
  const [selectedSize, setSelectedSize] = React.useState('')
  const [error, setError] = React.useState('')
  
  const sizeOptions = [
    { value: 'xs', label: 'Extra Small (XS)' },
    { value: 's', label: 'Small (S)' },
    { value: 'm', label: 'Medium (M)' },
    { value: 'l', label: 'Large (L)' },
    { value: 'xl', label: 'Extra Large (XL)' }
  ]
  
  const handleSubmit = () => {
    if (!selectedSize) {
      setError('Please select a size')
    } else {
      setError('')
      alert(`Selected size: ${selectedSize}`)
    }
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
        T-Shirt Size: *
      </h4>
      {sizeOptions.map(option => (
        <Radio
          key={option.value}
          name="tshirt-size"
          value={option.value}
          label={option.label}
          checked={selectedSize === option.value}
          error={error && selectedSize === option.value ? error : ''}
          onChange={(e) => {
            setSelectedSize(e.target.value)
            setError('')
          }}
        />
      ))}
      {error && (
        <p style={{ fontSize: '12px', color: '#ef4444', margin: 0 }}>
          {error}
        </p>
      )}
      <button 
        onClick={handleSubmit}
        style={{
          padding: '8px 16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginTop: '8px',
          alignSelf: 'flex-start'
        }}
      >
        Submit
      </button>
    </div>
  )
}