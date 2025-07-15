import { IconGlobe, IconLanguage, IconPlus, IconDownload } from '@tabler/icons-react'
import BaseButton from './BaseButton'
import { DESIGN_TOKENS } from '../../tokens'

export default {
  title: 'Foundation/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The foundational button component extracted from RegionSwitcher and LanguageSwitcher. Provides consistent styling, behavior, and accessibility across the design system.',
      },
    },
  },
  argTypes: {
    icon: {
      control: false,
      description: 'Icon element to display',
    },
    text: {
      control: 'text',
      description: 'Text to display (only shown in text mode)',
    },
    displayMode: {
      control: 'select',
      options: ['icon', 'text'],
      description: 'Display mode: icon only or icon with text',
    },
    borderRadius: {
      control: 'number',
      description: 'Border radius in pixels',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Button size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    active: {
      control: 'boolean',
      description: 'Whether the button is in active state',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
  },
}

// Default story
export const Default = {
  args: {
    icon: <IconGlobe />,
    ariaLabel: 'Globe icon button',
    displayMode: 'icon',
    borderRadius: DESIGN_TOKENS.borderRadius.none,
    size: 'default',
    disabled: false,
    active: false,
  },
}

// Text mode
export const WithText = {
  args: {
    ...Default.args,
    displayMode: 'text',
    text: 'Select Option',
    ariaLabel: 'Select option button',
  },
}

// Different icons
export const DifferentIcons = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <BaseButton icon={<IconGlobe />} ariaLabel="Globe" />
      <BaseButton icon={<IconLanguage />} ariaLabel="Language" />
      <BaseButton icon={<IconPlus />} ariaLabel="Add" />
      <BaseButton icon={<IconDownload />} ariaLabel="Download" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BaseButton works with any Tabler icon.',
      },
    },
  },
}

// Size variants
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <BaseButton icon={<IconGlobe />} size="small" ariaLabel="Small button" />
      <BaseButton icon={<IconGlobe />} size="default" ariaLabel="Default button" />
      <BaseButton icon={<IconGlobe />} size="large" ariaLabel="Large button" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants: small (32px), default (48px), and large (56px).',
      },
    },
  },
}

// Text mode sizes
export const TextSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexDirection: 'column' }}>
      <BaseButton 
        icon={<IconGlobe />} 
        text="Small Button" 
        size="small" 
        displayMode="text"
        ariaLabel="Small text button" 
      />
      <BaseButton 
        icon={<IconGlobe />} 
        text="Default Button" 
        size="default" 
        displayMode="text"
        ariaLabel="Default text button" 
      />
      <BaseButton 
        icon={<IconGlobe />} 
        text="Large Button" 
        size="large" 
        displayMode="text"
        ariaLabel="Large text button" 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text mode with different sizes.',
      },
    },
  },
}

// Border radius variants
export const BorderRadius = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <BaseButton 
        icon={<IconGlobe />} 
        borderRadius={0} 
        ariaLabel="Square button" 
      />
      <BaseButton 
        icon={<IconGlobe />} 
        borderRadius={4} 
        ariaLabel="Slightly rounded button" 
      />
      <BaseButton 
        icon={<IconGlobe />} 
        borderRadius={8} 
        ariaLabel="Rounded button" 
      />
      <BaseButton 
        icon={<IconGlobe />} 
        borderRadius={24} 
        ariaLabel="Very rounded button" 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different border radius options: 0px (square), 4px, 8px, and 24px (very rounded).',
      },
    },
  },
}

// States
export const States = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <BaseButton icon={<IconGlobe />} ariaLabel="Normal state" />
      <BaseButton icon={<IconGlobe />} active={true} ariaLabel="Active state" />
      <BaseButton icon={<IconGlobe />} disabled={true} ariaLabel="Disabled state" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states: normal, active, and disabled.',
      },
    },
  },
}

// Focus demonstration
export const KeyboardFocus = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        Use Tab key to focus the button and see the blue outline:
      </p>
      <BaseButton icon={<IconGlobe />} ariaLabel="Focus demo button" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard accessibility with blue focus outline.',
      },
    },
  },
}

// Design tokens showcase
export const DesignTokens = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '16px' }}>Design Tokens Used:</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div>
          <h4>Colors</h4>
          <ul style={{ fontSize: '14px', lineHeight: '1.5' }}>
            <li>Text: {DESIGN_TOKENS.colors.text.primary}</li>
            <li>Hover: {DESIGN_TOKENS.colors.background.hover}</li>
            <li>Focus: {DESIGN_TOKENS.colors.border.focus}</li>
          </ul>
        </div>
        <div>
          <h4>Spacing</h4>
          <ul style={{ fontSize: '14px', lineHeight: '1.5' }}>
            <li>Button: {DESIGN_TOKENS.spacing.button.size.width}×{DESIGN_TOKENS.spacing.button.size.height}px</li>
            <li>Gap: {DESIGN_TOKENS.spacing.button.gap}px</li>
            <li>Icon: {DESIGN_TOKENS.spacing.button.iconSize.icon}px</li>
          </ul>
        </div>
        <div>
          <h4>Transitions</h4>
          <ul style={{ fontSize: '14px', lineHeight: '1.5' }}>
            <li>Default: {DESIGN_TOKENS.transitions.default}</li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <BaseButton icon={<IconGlobe />} ariaLabel="Example button" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows the design tokens used by BaseButton.',
      },
    },
  },
}