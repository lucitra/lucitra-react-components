import React from 'react'
import Input from './Input/Input'
import Select from './Select/Select'
import Checkbox from './Checkbox/Checkbox'
import Radio from './Radio/Radio'
import Button from './Button/Button'
import { IconMail, IconPhone, IconUser } from '@tabler/icons-react'

export default {
  title: 'Forms/Overview',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Complete form components showcasing the design system in action.'
      }
    }
  }
}

export const CompleteForm = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    newsletter: false,
    notifications: {
      email: false,
      sms: false,
      push: false
    },
    plan: '',
    terms: false
  })
  
  const [errors, setErrors] = React.useState({})
  
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' }
  ]
  
  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  const handleCheckboxChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.checked
    }))
  }
  
  const handleNotificationChange = (type) => (e) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: e.target.checked
      }
    }))
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.country) {
      newErrors.country = 'Please select a country'
    }
    
    if (!formData.plan) {
      newErrors.plan = 'Please select a plan'
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      alert('Form submitted successfully!\n\n' + JSON.stringify(formData, null, 2))
    }
  }
  
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gap: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
          Account Registration
        </h2>
        
        {/* Personal Information */}
        <div style={{ display: 'grid', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>
            Personal Information
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              error={errors.firstName}
              required
              startIcon={<IconUser size={16} />}
            />
            
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              error={errors.lastName}
              required
            />
          </div>
          
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={errors.email}
            required
            startIcon={<IconMail size={16} />}
          />
          
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            helperText="Optional - for account recovery"
            startIcon={<IconPhone size={16} />}
          />
          
          <Select
            label="Country"
            placeholder="Select your country"
            options={countryOptions}
            value={formData.country}
            onChange={handleInputChange('country')}
            error={errors.country}
            required
          />
        </div>
        
        {/* Plan Selection */}
        <div style={{ display: 'grid', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>
            Choose Your Plan
          </h3>
          
          <Radio
            name="plan"
            value="free"
            label="Free Plan"
            helperText="Basic features, up to 5 projects"
            checked={formData.plan === 'free'}
            onChange={handleInputChange('plan')}
            error={formData.plan === 'free' ? errors.plan : ''}
          />
          
          <Radio
            name="plan"
            value="pro"
            label="Pro Plan"
            helperText="Advanced features, unlimited projects - $9.99/month"
            checked={formData.plan === 'pro'}
            onChange={handleInputChange('plan')}
            error={formData.plan === 'pro' ? errors.plan : ''}
          />
          
          <Radio
            name="plan"
            value="enterprise"
            label="Enterprise Plan"
            helperText="Full features, priority support - $29.99/month"
            checked={formData.plan === 'enterprise'}
            onChange={handleInputChange('plan')}
            error={formData.plan === 'enterprise' ? errors.plan : ''}
          />
          
          {errors.plan && !formData.plan && (
            <p style={{ fontSize: '12px', color: '#ef4444', margin: 0 }}>
              {errors.plan}
            </p>
          )}
        </div>
        
        {/* Notification Preferences */}
        <div style={{ display: 'grid', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>
            Notification Preferences
          </h3>
          
          <Checkbox
            label="Email notifications"
            checked={formData.notifications.email}
            onChange={handleNotificationChange('email')}
            helperText="Receive updates about your account and new features"
          />
          
          <Checkbox
            label="SMS notifications"
            checked={formData.notifications.sms}
            onChange={handleNotificationChange('sms')}
            helperText="Receive important alerts via text message"
          />
          
          <Checkbox
            label="Push notifications"
            checked={formData.notifications.push}
            onChange={handleNotificationChange('push')}
            helperText="Receive notifications in your browser"
          />
          
          <Checkbox
            label="Subscribe to newsletter"
            checked={formData.newsletter}
            onChange={handleCheckboxChange('newsletter')}
            helperText="Get monthly updates about new features and tips"
          />
        </div>
        
        {/* Terms and Conditions */}
        <div style={{ display: 'grid', gap: '16px' }}>
          <Checkbox
            label="I agree to the Terms and Conditions and Privacy Policy"
            checked={formData.terms}
            onChange={handleCheckboxChange('terms')}
            error={errors.terms}
            required
          />
        </div>
        
        {/* Submit Button */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
          <Button 
            type="button" 
            variant="outlined"
            onClick={() => {
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                country: '',
                newsletter: false,
                notifications: { email: false, sms: false, push: false },
                plan: '',
                terms: false
              })
              setErrors({})
            }}
          >
            Reset
          </Button>
          <Button type="submit" variant="filled">
            Create Account
          </Button>
        </div>
      </div>
    </form>
  )
}

export const FormVariants = () => (
  <div style={{ display: 'grid', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '500' }}>
        Outlined Variant (Default)
      </h3>
      <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
        <Input label="Name" placeholder="Enter your name" variant="outlined" />
        <Select 
          label="Country" 
          placeholder="Select country" 
          variant="outlined"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' }
          ]}
        />
      </div>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '500' }}>
        Filled Variant
      </h3>
      <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
        <Input label="Name" placeholder="Enter your name" variant="filled" />
        <Select 
          label="Country" 
          placeholder="Select country" 
          variant="filled"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' }
          ]}
        />
      </div>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '500' }}>
        Standard Variant
      </h3>
      <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
        <Input label="Name" placeholder="Enter your name" variant="standard" />
        <Select 
          label="Country" 
          placeholder="Select country" 
          variant="standard"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' }
          ]}
        />
      </div>
    </div>
  </div>
)

export const FormSizes = () => (
  <div style={{ display: 'grid', gap: '32px' }}>
    {['small', 'medium', 'large'].map(size => (
      <div key={size}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '500' }}>
          {size.charAt(0).toUpperCase() + size.slice(1)} Size
        </h3>
        <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
          <Input 
            label="Text Input" 
            placeholder="Enter text" 
            size={size}
          />
          <Select 
            label="Select Input" 
            placeholder="Choose option" 
            size={size}
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' }
            ]}
          />
          <div style={{ display: 'flex', gap: '16px' }}>
            <Checkbox label="Checkbox" size={size} />
            <Radio name={`radio-${size}`} value="radio" label="Radio" size={size} />
          </div>
        </div>
      </div>
    ))}
  </div>
)