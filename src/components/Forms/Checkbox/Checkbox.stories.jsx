import React from 'react'
import Checkbox from './Checkbox'

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible checkbox component with support for controlled/uncontrolled states, indeterminate state, and consistent styling.'
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

const Template = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Accept terms and conditions'
}

export const Checked = Template.bind({})
Checked.args = {
  label: 'I agree to the terms',
  defaultChecked: true
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Accept terms and conditions',
  required: true,
  error: 'You must accept the terms to continue'
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  label: 'Subscribe to newsletter',
  helperText: 'You can unsubscribe at any time'
}

export const Required = Template.bind({})
Required.args = {
  label: 'I confirm that I am over 18 years old',
  required: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'This option is disabled',
  disabled: true
}

export const DisabledChecked = Template.bind({})
DisabledChecked.args = {
  label: 'This option is disabled and checked',
  disabled: true,
  defaultChecked: true
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
  label: 'Select all items',
  indeterminate: true
}

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox label="Small checkbox" size="small" />
    <Checkbox label="Medium checkbox" size="medium" />
    <Checkbox label="Large checkbox" size="large" />
  </div>
)

export const LabelPlacement = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox label="Label on the right (default)" labelPlacement="end" />
    <Checkbox label="Label on the left" labelPlacement="start" />
  </div>
)

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  'aria-label': 'Checkbox without visible label'
}

export const Controlled = () => {
  const [checked, setChecked] = React.useState(false)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox
        label="Controlled checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <p style={{ fontSize: '14px', color: '#6b7280' }}>
        Checked: {checked ? 'Yes' : 'No'}
      </p>
    </div>
  )
}

export const IndeterminateExample = () => {
  const [checkedItems, setCheckedItems] = React.useState({
    item1: false,
    item2: false,
    item3: false
  })
  
  const allChecked = Object.values(checkedItems).every(Boolean)
  const someChecked = Object.values(checkedItems).some(Boolean)
  const indeterminate = someChecked && !allChecked
  
  const handleSelectAll = (e) => {
    const checked = e.target.checked
    setCheckedItems({
      item1: checked,
      item2: checked,
      item3: checked
    })
  }
  
  const handleItemChange = (item) => (e) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: e.target.checked
    }))
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={handleSelectAll}
      />
      <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox
          label="Item 1"
          checked={checkedItems.item1}
          onChange={handleItemChange('item1')}
        />
        <Checkbox
          label="Item 2"
          checked={checkedItems.item2}
          onChange={handleItemChange('item2')}
        />
        <Checkbox
          label="Item 3"
          checked={checkedItems.item3}
          onChange={handleItemChange('item3')}
        />
      </div>
    </div>
  )
}

export const CheckboxGroup = () => {
  const [selected, setSelected] = React.useState([])
  
  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
    { id: 'option4', label: 'Option 4 (disabled)', disabled: true }
  ]
  
  const handleChange = (optionId) => (e) => {
    if (e.target.checked) {
      setSelected(prev => [...prev, optionId])
    } else {
      setSelected(prev => prev.filter(id => id !== optionId))
    }
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
        Select your preferences:
      </h4>
      {options.map(option => (
        <Checkbox
          key={option.id}
          label={option.label}
          checked={selected.includes(option.id)}
          disabled={option.disabled}
          onChange={handleChange(option.id)}
        />
      ))}
      <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
      </p>
    </div>
  )
}