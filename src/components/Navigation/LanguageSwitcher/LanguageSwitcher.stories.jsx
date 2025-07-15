import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcherMantine'
import { DEFAULT_LANGUAGES, DEFAULT_THEME } from '../../../utils/defaultConfigs'

// Wrapper component to handle state in Storybook
const LanguageSwitcherWithState = (args) => {
  const [currentLanguage, setCurrentLanguage] = useState(args.currentLanguage || null)
  
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language.code)
    args.onLanguageChange?.(language)
  }
  
  return (
    <LanguageSwitcher 
      {...args} 
      currentLanguage={currentLanguage}
      onLanguageChange={handleLanguageChange}
    />
  )
}

export default {
  title: 'Components/Organisms/Navigation/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An icon-only dropdown button for selecting languages. Features a square button with language icon (modern enterprise-inspired), dark dropdown panel, and built-in RTL support with i18n integration.',
      },
    },
  },
  argTypes: {
    languages: {
      control: 'object',
      description: 'Array of available languages',
    },
    currentLanguage: {
      control: 'text',
      description: 'Currently selected language code',
    },
    onLanguageChange: {
      action: 'language-changed',
      description: 'Callback when language changes',
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
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
  },
}

// Default story
export const Default = {
  render: (args) => <LanguageSwitcherWithState {...args} />,
  args: {
    currentLanguage: 'en',
    languages: DEFAULT_LANGUAGES.slice(0, 5), // Show first 5 languages
    showCurrentSelection: true,
    displayMode: 'icon',
  },
}

// Text display mode
export const TextDisplay = {
  render: (args) => <LanguageSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    displayMode: 'text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Language switcher with text display mode showing both icon and current language text.',
      },
    },
  },
};

// With all languages
export const AllLanguages = {
  render: (args) => <LanguageSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    languages: DEFAULT_LANGUAGES,
  },
}

// Disabled state
export const Disabled = {
  render: (args) => <LanguageSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    disabled: true,
  },
}


// Rounded Corners
export const RoundedCorners = {
  render: (args) => <LanguageSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    borderRadius: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Language switcher with rounded corners (8px border radius).',
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
      <LanguageSwitcherWithState {...args} />
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

// RTL Language selected
export const RTLSelected = {
  render: (args) => <LanguageSwitcherWithState {...args} />,
  args: {
    ...Default.args,
    currentLanguage: 'ar',
    languages: [
      { code: 'ar', name: 'العربية', direction: 'rtl' },
      { code: 'en', name: 'English', direction: 'ltr' },
      { code: 'he', name: 'עברית', direction: 'rtl' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Component with RTL language selected, showing proper text direction handling.',
      },
    },
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
        primary: '#8b5cf6',
        background: '#f8fafc',
        border: '#e2e8f0',
      },
    },
  },
}

// Minimal languages
export const MinimalExample = {
  args: {
    currentLanguage: 'en',
    languages: [
      { code: 'en', name: 'EN', dir: 'ltr' },
      { code: 'es', name: 'ES', dir: 'ltr' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal example with just two languages and short names.',
      },
    },
  },
}

// Interactive example
export const Interactive = {
  args: {
    ...Default.args,
  },
}
