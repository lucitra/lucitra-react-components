import React from 'react'
import PropTypes from 'prop-types'
import Stack from './Stack'

export default {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible layout component for arranging children in vertical or horizontal stacks with consistent spacing, alignment, and wrapping options.'
      }
    }
  }
}

// Demo components for examples
const DemoCard = ({ children, style = {} }) => (
  <div style={{
    padding: '12px 16px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
    ...style
  }}>
    {children}
  </div>
)

DemoCard.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

const DemoButton = ({ children, variant = 'primary' }) => (
  <button style={{
    padding: '8px 16px',
    border: 'none',
    backgroundColor: variant === 'primary' ? '#3b82f6' : '#6b7280',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px'
  }}>
    {children}
  </button>
)

DemoButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary'])
}

const Template = (args) => (
  <Stack {...args}>
    <DemoCard>Item 1</DemoCard>
    <DemoCard>Item 2</DemoCard>
    <DemoCard>Item 3</DemoCard>
  </Stack>
)

export const Default = Template.bind({})
Default.args = {
  direction: 'column',
  gap: '16px'
}

export const Directions = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Column (default)</h3>
      <Stack direction="column" gap="16px">
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Stack>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Row</h3>
      <Stack direction="row" gap="16px">
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Stack>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Column Reverse</h3>
      <Stack direction="column-reverse" gap="16px">
        <DemoCard>Item 1 (shows last)</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3 (shows first)</DemoCard>
      </Stack>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Row Reverse</h3>
      <Stack direction="row-reverse" gap="16px">
        <DemoCard>Item 1 (shows last)</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3 (shows first)</DemoCard>
      </Stack>
    </div>
  </div>
)

export const Gaps = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Small Gap (8px)</h3>
      <Stack direction="row" gap="8px">
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Stack>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Medium Gap (16px)</h3>
      <Stack direction="row" gap="16px">
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Stack>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Large Gap (32px)</h3>
      <Stack direction="row" gap="32px">
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Stack>
    </div>
  </div>
)

export const Alignment = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Align Center</h3>
      <div style={{ border: '2px dashed #d1d5db', padding: '16px', minHeight: '120px' }}>
        <Stack direction="row" gap="16px" align="center" style={{ height: '100%' }}>
          <DemoCard style={{ height: '40px' }}>Short</DemoCard>
          <DemoCard style={{ height: '60px' }}>Medium</DemoCard>
          <DemoCard style={{ height: '80px' }}>Tall</DemoCard>
        </Stack>
      </div>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Justify Space Between</h3>
      <div style={{ border: '2px dashed #d1d5db', padding: '16px', width: '400px' }}>
        <Stack direction="row" gap="16px" justify="space-between">
          <DemoCard>Start</DemoCard>
          <DemoCard>Middle</DemoCard>
          <DemoCard>End</DemoCard>
        </Stack>
      </div>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Justify Center</h3>
      <div style={{ border: '2px dashed #d1d5db', padding: '16px', width: '400px' }}>
        <Stack direction="row" gap="16px" justify="center">
          <DemoCard>Item 1</DemoCard>
          <DemoCard>Item 2</DemoCard>
        </Stack>
      </div>
    </div>
  </div>
)

export const WithDividers = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Horizontal Dividers</h3>
      <Stack 
        direction="column" 
        gap="16px" 
        divider={<hr style={{ border: 'none', height: '1px', backgroundColor: '#e5e7eb', margin: 0 }} />}
      >
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Stack>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Vertical Dividers</h3>
      <Stack 
        direction="row" 
        gap="16px" 
        divider={<hr style={{ border: 'none', width: '1px', backgroundColor: '#e5e7eb', margin: 0 }} />}
      >
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Stack>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Custom Divider</h3>
      <Stack 
        direction="row" 
        gap="16px" 
        divider={<span style={{ color: '#6b7280', fontSize: '12px' }}>•</span>}
      >
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Stack>
    </div>
  </div>
)

export const Wrapping = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>No Wrap (default)</h3>
      <div style={{ border: '2px dashed #d1d5db', padding: '16px', width: '300px' }}>
        <Stack direction="row" gap="16px" wrap="nowrap">
          {Array.from({ length: 6 }, (_, i) => (
            <DemoCard key={i} style={{ minWidth: '80px' }}>Item {i + 1}</DemoCard>
          ))}
        </Stack>
      </div>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>With Wrap</h3>
      <div style={{ border: '2px dashed #d1d5db', padding: '16px', width: '300px' }}>
        <Stack direction="row" gap="16px" wrap="wrap">
          {Array.from({ length: 6 }, (_, i) => (
            <DemoCard key={i} style={{ minWidth: '80px' }}>Item {i + 1}</DemoCard>
          ))}
        </Stack>
      </div>
    </div>
  </div>
)

export const ButtonGroups = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Action Buttons</h3>
      <Stack direction="row" gap="8px">
        <DemoButton>Save</DemoButton>
        <DemoButton variant="secondary">Cancel</DemoButton>
        <DemoButton variant="secondary">Reset</DemoButton>
      </Stack>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Navigation with Dividers</h3>
      <Stack 
        direction="row" 
        gap="16px" 
        divider={<span style={{ color: '#d1d5db' }}>|</span>}
      >
        <a href="#" style={{ textDecoration: 'none', color: '#3b82f6' }}>Home</a>
        <a href="#" style={{ textDecoration: 'none', color: '#3b82f6' }}>About</a>
        <a href="#" style={{ textDecoration: 'none', color: '#3b82f6' }}>Contact</a>
        <a href="#" style={{ textDecoration: 'none', color: '#3b82f6' }}>Help</a>
      </Stack>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Form Layout</h3>
      <Stack direction="column" gap="16px" style={{ maxWidth: '300px' }}>
        <input 
          type="text" 
          placeholder="Name" 
          style={{ padding: '8px 12px', border: '1px solid #d1d5db' }}
        />
        <input 
          type="email" 
          placeholder="Email" 
          style={{ padding: '8px 12px', border: '1px solid #d1d5db' }}
        />
        <Stack direction="row" gap="8px" justify="flex-end">
          <DemoButton variant="secondary">Cancel</DemoButton>
          <DemoButton>Submit</DemoButton>
        </Stack>
      </Stack>
    </div>
  </div>
)