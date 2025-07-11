import { DEFAULT_THEME } from '../src/utils/defaultConfigs'
import '../src/index.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      description: {
        component: 'Component from @lucitra/react-components',
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'dark', title: 'Dark' },
          { value: 'high-contrast', title: 'High Contrast' },
        ],
        showName: true,
      },
    },
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ar', title: 'العربية' },
          { value: 'fr', title: 'Français' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, locale } = context.globals
      
      // Apply theme to story container
      const themeStyles = {
        default: DEFAULT_THEME,
        dark: {
          ...DEFAULT_THEME,
          colors: {
            ...DEFAULT_THEME.colors,
            background: '#1f2937',
            text: '#f9fafb',
            border: '#374151',
          }
        },
        'high-contrast': {
          ...DEFAULT_THEME,
          colors: {
            ...DEFAULT_THEME.colors,
            primary: '#000000',
            background: '#ffffff',
            text: '#000000',
            border: '#000000',
          }
        }
      }
      
      // Apply locale direction
      const direction = locale === 'ar' ? 'rtl' : 'ltr'
      
      return (
        <div 
          style={{ 
            padding: '20px',
            backgroundColor: themeStyles[theme].colors.background,
            color: themeStyles[theme].colors.text,
            direction: direction,
            minHeight: '100vh'
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview