import { IconPlus, IconDownload, IconTrash, IconEdit, IconArrowRight, IconArrowLeft } from '@tabler/icons-react'
import Button from './Button'

export default {
  title: 'Design System/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The primary action component following component.gallery patterns. Supports multiple variants, sizes, and states commonly found across design systems like Material Design, Ant Design, and IBM Carbon.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position relative to text',
    },
    borderRadius: {
      control: 'number',
      description: 'Custom border radius in pixels',
    },
  },
}

// Default button
export const Default = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
}

// All variants
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The four main button variants: Primary for main actions, Secondary for secondary actions, Ghost for subtle actions, and Danger for destructive actions.',
      },
    },
  },
}

// All sizes
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three size options: Small (32px), Medium (40px), and Large (48px) heights.',
      },
    },
  },
}

// With icons
export const WithIcons = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button icon={<IconPlus />} iconPosition="left">Add Item</Button>
      <Button icon={<IconDownload />} iconPosition="left" variant="secondary">Download</Button>
      <Button icon={<IconArrowRight />} iconPosition="right" variant="ghost">Next</Button>
      <Button icon={<IconEdit />} variant="ghost" size="sm">Edit</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons on the left or right side. Icons automatically resize based on button size.',
      },
    },
  },
}

// Icon-only buttons
export const IconOnly = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button icon={<IconPlus />} ariaLabel="Add item" />
      <Button icon={<IconEdit />} variant="secondary" ariaLabel="Edit item" />
      <Button icon={<IconTrash />} variant="danger" ariaLabel="Delete item" />
      <Button icon={<IconDownload />} variant="ghost" ariaLabel="Download" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons for compact interfaces. Always include aria-label for accessibility.',
      },
    },
  },
}

// Button states
export const States = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button>Default</Button>
      <Button active>Active</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button loading variant="secondary">Processing...</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states: default, active (pressed), disabled, and loading with spinner.',
      },
    },
  },
}

// Full width buttons
export const FullWidth = {
  render: () => (
    <div style={{ width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button fullWidth>Full Width Primary</Button>
        <Button fullWidth variant="secondary">Full Width Secondary</Button>
        <Button fullWidth variant="ghost" icon={<IconPlus />}>Full Width with Icon</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full width buttons that stretch to fill their container width.',
      },
    },
  },
}

// Different border radius
export const BorderRadius = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button borderRadius={0}>Square</Button>
      <Button borderRadius={4}>Default</Button>
      <Button borderRadius={8}>Rounded</Button>
      <Button borderRadius={20}>Pill</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom border radius options from square to pill-shaped buttons.',
      },
    },
  },
}

// Form examples
export const FormExamples = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="ghost" fullWidth>Cancel</Button>
        <Button fullWidth>Save</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="secondary" icon={<IconArrowLeft />}>Back</Button>
        <Button icon={<IconArrowRight />} iconPosition="right">Continue</Button>
      </div>
      <Button variant="danger" icon={<IconTrash />} fullWidth>Delete Account</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common form button patterns: Cancel/Save, Back/Continue, and destructive actions.',
      },
    },
  },
}

// Accessibility demo
export const Accessibility = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        Use Tab to navigate and Enter/Space to activate buttons:
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button>Accessible Button</Button>
        <Button variant="secondary" ariaPressed={true}>Toggle (Pressed)</Button>
        <Button variant="ghost" ariaExpanded={false} ariaHaspopup="menu">Menu Button</Button>
        <Button icon={<IconPlus />} ariaLabel="Add new item">Add</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates proper ARIA attributes and keyboard navigation support.',
      },
    },
  },
}

// Real-world usage
export const RealWorldExamples = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      {/* CTA Section */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '16px' }}>Call to Action</h3>
        <Button size="lg" icon={<IconDownload />}>Download Now</Button>
      </div>
      
      {/* Toolbar */}
      <div>
        <h4 style={{ marginBottom: '12px' }}>Toolbar</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="ghost" icon={<IconPlus />} size="sm">New</Button>
          <Button variant="ghost" icon={<IconEdit />} size="sm">Edit</Button>
          <Button variant="ghost" icon={<IconTrash />} size="sm">Delete</Button>
        </div>
      </div>
      
      {/* Dialog Actions */}
      <div>
        <h4 style={{ marginBottom: '12px' }}>Dialog Actions</h4>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage patterns: call-to-action sections, toolbars, and dialog actions.',
      },
    },
  },
}