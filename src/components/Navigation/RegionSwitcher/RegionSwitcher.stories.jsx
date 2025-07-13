import { useState } from 'react'
import RegionSwitcher from './RegionSwitcherMantine'
import { DEFAULT_REGIONS, DEFAULT_THEME } from '../../../utils/defaultConfigs'

// Wrapper component to handle state in Storybook
const RegionSwitcherWithState = (args) => {
  const [currentRegion, setCurrentRegion] = useState(args.currentRegion || null)
  
  const handleRegionChange = (region) => {
    setCurrentRegion(region.code)
    args.onRegionChange?.(region)
  }
  
  return (
    <RegionSwitcher 
      {...args} 
      currentRegion={currentRegion}
      onRegionChange={handleRegionChange}
    />
  )
}

export default {
  title: 'Navigation/RegionSwitcher',
  component: RegionSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An icon-only dropdown button for selecting regions/countries. Features a square button with globe icon (IBM.com-inspired), dark dropdown panel, and automatic language synchronization with RTL support.',
      },
    },
  },
  argTypes: {
    regions: {
      control: 'object',
      description: 'Array of available regions',
    },
    currentRegion: {
      control: 'text',
      description: 'Currently selected region code',
    },
    onRegionChange: {
      action: 'region-changed',
      description: 'Callback when region changes',
    },
    syncWithLanguage: {
      control: 'boolean',
      description: 'Sync region selection with language changes',
    },
    updateDocumentDirection: {
      control: 'boolean',
      description: 'Update document direction for RTL languages',
    },
    onLanguageChange: {
      action: 'language-changed',
      description: 'Callback when region changes language',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
    displayMode: {
      control: 'select',
      options: ['icon', 'text'],
      description: 'Display mode: icon-only button or icon with text',
    },
    borderRadius: {
      control: 'number',
      description: 'Border radius in pixels (0 for square, >0 for rounded)',
    },
  },
}

// Default story
export const Default = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    currentRegion: 'US',
    regions: DEFAULT_REGIONS.slice(0, 5), // Show first 5 regions
    syncWithLanguage: false,
    updateDocumentDirection: false,
    showCurrentSelection: true,
    displayMode: 'icon',
  },
}

// Text display mode
export const TextDisplay = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    displayMode: 'text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Region switcher with text display mode showing both icon and current region text.',
      },
    },
  },
};

// With all regions
export const AllRegions = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    regions: DEFAULT_REGIONS,
  },
}

// With language synchronization
export const WithLanguageSync = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    syncWithLanguage: true,
    updateDocumentDirection: true,
    regions: [
      { code: 'US', name: 'United States', flag: '🇺🇸', language: 'en' },
      { code: 'FR', name: 'France', flag: '🇫🇷', language: 'fr' },
      { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', language: 'ar' },
      { code: 'DE', name: 'Germany', flag: '🇩🇪', language: 'de' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Region switcher with language synchronization enabled. Changing regions will trigger language changes.',
      },
    },
  },
}

// RTL Region selected
export const RTLRegion = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    currentRegion: 'AE',
    regions: [
      { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', language: 'ar' },
      { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', language: 'ar' },
      { code: 'US', name: 'United States', flag: '🇺🇸', language: 'en' },
    ],
    updateDocumentDirection: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Component with RTL region selected, showing proper text direction handling and automatic placement adjustment.',
      },
    },
  },
}

// Disabled state
export const Disabled = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    disabled: true,
  },
}

// Different placements
export const TopLeft = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    placement: 'top-left',
  },
}

export const BottomLeft = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    placement: 'bottom-left',
  },
}

// Custom theme
export const CustomTheme = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    theme: {
      ...DEFAULT_THEME,
      colors: {
        ...DEFAULT_THEME.colors,
        primary: '#10b981',
        background: '#f0fdf4',
        border: '#bbf7d0',
      },
    },
  },
}

// Minimal regions
export const MinimalExample = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    currentRegion: 'US',
    regions: [
      { code: 'US', name: 'US', flag: '🇺🇸', language: 'en' },
      { code: 'CA', name: 'CA', flag: '🇨🇦', language: 'en' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal example with just two regions and short names.',
      },
    },
  },
}

// No current region selected
export const NoSelection = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    currentRegion: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Component with no region initially selected.',
      },
    },
  },
}

// Rounded Corners
export const RoundedCorners = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    borderRadius: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Region switcher with rounded corners (8px border radius).',
      },
    },
  },
}

// Keyboard Focus Demo
export const KeyboardFocus = {
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        Use Tab key to focus the button and see the blue outline:
      </p>
      <RegionSwitcherWithState {...args} />
    </div>
  ),
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard accessibility with blue focus outline when tabbing to the button.',
      },
    },
  },
}

// IBM.com Style example
export const IBMStyle = {
  render: (args) => <RegionSwitcherWithState {...args} />,
  args: {
    currentRegion: 'US',
    regions: [
      { code: 'US', name: 'United States – English (English)', flag: '🇺🇸', language: 'en' },
      { code: 'AU', name: 'Australia – English (English)', flag: '🇦🇺', language: 'en' },
      { code: 'BR', name: 'Brazil – Português (Portuguese)', flag: '🇧🇷', language: 'pt' },
      { code: 'CA-EN', name: 'Canada – English (English)', flag: '🇨🇦', language: 'en' },
      { code: 'CA-FR', name: 'Canada – Français (French)', flag: '🇨🇦', language: 'fr' },
      { code: 'CN', name: 'China – 中文 (Simplified Chinese)', flag: '🇨🇳', language: 'zh' },
      { code: 'FR', name: 'France – Français (French)', flag: '🇫🇷', language: 'fr' },
      { code: 'DE', name: 'Germany – Deutsch (German)', flag: '🇩🇪', language: 'de' },
      { code: 'IN', name: 'India – English (English)', flag: '🇮🇳', language: 'en' },
      { code: 'ID', name: 'Indonesia – Bahasa (Indonesian)', flag: '🇮🇩', language: 'id' },
      { code: 'IT', name: 'Italy – Italiano (Italian)', flag: '🇮🇹', language: 'it' },
      { code: 'JP', name: 'Japan – 日本語 (Japanese)', flag: '🇯🇵', language: 'ja' },
      { code: 'MX', name: 'Mexico – Español (Spanish)', flag: '🇲🇽', language: 'es' },
      { code: 'QA', name: 'Qatar – العربية (Arabic)', flag: '🇶🇦', language: 'ar' },
      { code: 'SA', name: 'Saudi Arabia – العربية (Arabic)', flag: '🇸🇦', language: 'ar' },
    ],
    showCurrentSelection: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'IBM.com-inspired styling with dark dropdown, clean typography, and comprehensive region list formatted like IBM.com.',
      },
    },
  },
}