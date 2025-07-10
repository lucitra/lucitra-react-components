import RegionSwitcher from './RegionSwitcher'
import { DEFAULT_REGIONS, DEFAULT_THEME } from '../../../utils/defaultConfigs'

export default {
  title: 'Navigation/RegionSwitcher',
  component: RegionSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown component for selecting regions/countries with automatic language synchronization and RTL support. The component now features a globe icon and a redesigned dropdown menu showing the current selection prominently.',
      },
    },
  },
  argTypes: {
    regions: {
      control: 'object',
      description: 'Array of available regions',
    },
    currentRegion: {
      control: 'object',
      description: 'Currently selected region object',
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
    theme: {
      control: 'object',
      description: 'Theme configuration object',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
    placement: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      description: 'Dropdown placement. If not set, it will auto-detect based on document direction.',
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
    currentRegion: DEFAULT_REGIONS[0], // US
    regions: DEFAULT_REGIONS.slice(0, 5), // Show first 5 regions
    theme: DEFAULT_THEME,
    ariaLabel: 'Select region',
    syncWithLanguage: false,
    updateDocumentDirection: false,
  },
}

// With current selection shown
export const ShowCurrentSelection = {
  args: {
    ...Default.args,
    showCurrentSelection: true,
  },
};

// With all regions
export const AllRegions = {
  args: {
    ...Default.args,
    regions: DEFAULT_REGIONS,
  },
}

// With language synchronization
export const WithLanguageSync = {
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
  args: {
    ...Default.args,
    currentRegion: { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', language: 'ar' },
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
  args: {
    ...Default.args,
    disabled: true,
  },
}

// Different placements
export const TopLeft = {
  args: {
    ...Default.args,
    placement: 'top-left',
  },
}

export const BottomLeft = {
  args: {
    ...Default.args,
    placement: 'bottom-left',
  },
}

// Custom theme
export const CustomTheme = {
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
  args: {
    currentRegion: { code: 'US', name: 'US', flag: '🇺🇸', language: 'en' },
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