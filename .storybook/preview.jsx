import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import mantineTheme from '../src/theme/mantineTheme'
import '../src/index.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
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
    colorScheme: {
      description: 'Mantine color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Color Scheme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'auto', title: 'Auto' },
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
      const { colorScheme, locale } = context.globals
      
      // Apply locale direction
      const direction = locale === 'ar' ? 'rtl' : 'ltr'
      
      return (
        <MantineProvider theme={mantineTheme} defaultColorScheme={colorScheme}>
          <div 
            style={{ 
              padding: '20px',
              direction: direction,
              minHeight: '100vh'
            }}
          >
            <Story />
          </div>
        </MantineProvider>
      )
    },
  ],
}

export default preview