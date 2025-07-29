import React, { useEffect, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import '@mantine/core/styles.css'
import mantineTheme from '../src/theme/mantineTheme'
import { DEFAULT_LANGUAGES, DEFAULT_REGIONS } from '../src/utils/defaultConfigs'
import '../src/index.css'

// Initialize i18next for Storybook with only supported languages
if (!i18n.isInitialized) {
  const resources = {
    en: {
      translation: {
        welcome: 'Welcome',
        hello: 'Hello',
        language: 'Language',
        region: 'Region',
        theme: 'Theme',
        lightTheme: 'Light Theme',
        darkTheme: 'Dark Theme',
        systemTheme: 'System Theme',
      },
    },
    ar: {
      translation: {
        welcome: 'مرحبا',
        hello: 'أهلا',
        language: 'اللغة',
        region: 'المنطقة',
        theme: 'المظهر',
        lightTheme: 'المظهر الفاتح',
        darkTheme: 'المظهر الداكن',
        systemTheme: 'مظهر النظام',
      },
    },
    fr: {
      translation: {
        welcome: 'Bienvenue',
        hello: 'Bonjour',
        language: 'Langue',
        region: 'Région',
        theme: 'Thème',
        lightTheme: 'Thème clair',
        darkTheme: 'Thème sombre',
        systemTheme: 'Thème système',
      },
    },
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    })
}

// Import shared context
import { RegionContext } from './contexts'

// Filter to only supported languages and regions
// Supporting: en-US (English), ar-SA (Arabic), fr-FR (French)
const SUPPORTED_LANGUAGES = DEFAULT_LANGUAGES.filter(lang => 
  ['en', 'ar', 'fr'].includes(lang.code)
)

// Supporting: US (English), SA (Arabic), FR (French)
const SUPPORTED_REGIONS = DEFAULT_REGIONS.filter(region => 
  ['US', 'SA', 'FR'].includes(region.code)
)

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
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'auto', icon: 'browser', title: 'System' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: SUPPORTED_LANGUAGES.map(lang => ({
          value: lang.code,
          title: `${lang.name}${lang.code === 'ar' ? ' (Arabic)' : ''}`
        })),
        showName: true,
        dynamicTitle: true,
      },
    },
    region: {
      description: 'Geographic region',
      defaultValue: 'US',
      toolbar: {
        title: 'Region',
        icon: 'location',
        items: SUPPORTED_REGIONS.map(region => ({
          value: region.code,
          title: `${region.flag} ${region.name}`
        })),
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { colorScheme, locale, region } = context.globals
      const [scheme, setScheme] = useState(colorScheme)
      
      // Update color scheme when toolbar changes
      useEffect(() => {
        setScheme(colorScheme)
        // Also update document color scheme for CSS variables
        document.documentElement.setAttribute('data-mantine-color-scheme', colorScheme)
      }, [colorScheme])
      
      // Update language when toolbar changes
      useEffect(() => {
        if (locale && i18n.language !== locale) {
          i18n.changeLanguage(locale)
        }
        // Apply locale direction from config
        const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === locale)
        if (langConfig) {
          document.dir = langConfig.dir || 'ltr'
        }
      }, [locale])

      // Handle system color scheme
      useEffect(() => {
        if (colorScheme === 'auto') {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          const handleChange = () => {
            setScheme(mediaQuery.matches ? 'dark' : 'light')
          }
          handleChange()
          mediaQuery.addEventListener('change', handleChange)
          return () => mediaQuery.removeEventListener('change', handleChange)
        }
      }, [colorScheme])
      
      return (
        <MantineProvider 
          theme={{
            ...mantineTheme,
          }}
          forceColorScheme={scheme === 'auto' ? undefined : scheme}
        >
          <I18nextProvider i18n={i18n}>
            <RegionContext.Provider value={region}>
              <div 
                style={{ 
                  minHeight: '100vh',
                  backgroundColor: scheme === 'dark' ? '#0a0a0a' : '#ffffff',
                  color: scheme === 'dark' ? '#f9fafb' : '#161616',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
                data-theme={scheme}
                data-mantine-color-scheme={scheme}
              >
                {/* Optional: Show current settings in development */}
                {process.env.NODE_ENV === 'development' && (
                  <div style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    padding: '8px 12px',
                    backgroundColor: scheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    borderRadius: 8,
                    fontSize: 12,
                    fontFamily: 'monospace',
                    zIndex: 9999,
                  }}>
                    Theme: {scheme} | Lang: {locale} | Region: {region}
                  </div>
                )}
                <Story />
              </div>
            </RegionContext.Provider>
          </I18nextProvider>
        </MantineProvider>
      )
    },
  ],
}

// Export region context for components that need it
export { RegionContext }

export default preview