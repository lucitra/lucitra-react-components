
import LanguageSwitcher from './LanguageSwitcher'
import { DEFAULT_LANGUAGES, DEFAULT_THEME } from '../../../utils/defaultConfigs'

export default {
  title: 'Navigation/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown component for selecting languages with built-in RTL support and i18n integration.',
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
      description: 'Dropdown placement',
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
    currentLanguage: 'en',
    languages: DEFAULT_LANGUAGES.slice(0, 3), // Show first 3 languages
    theme: DEFAULT_THEME,
    placement: 'bottom-right',
    ariaLabel: 'Select language',
  },
}

// With current selection shown
export const ShowCurrentSelection = {
  args: {
    ...Default.args,
    showCurrentSelection: true,
  },
};

// With all languages
export const AllLanguages = {
  args: {
    ...Default.args,
    languages: DEFAULT_LANGUAGES,
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

// RTL Language selected
export const RTLSelected = {
  args: {
    ...Default.args,
    currentLanguage: 'ar',
    languages: [
      { code: 'ar', name: 'العربية', dir: 'rtl' },
      { code: 'en', name: 'English', dir: 'ltr' },
      { code: 'he', name: 'עברית', dir: 'rtl' },
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
