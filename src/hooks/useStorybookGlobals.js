import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Create a fallback RegionContext
const FallbackRegionContext = React.createContext('US');

// Try to import from Storybook, fallback to local
let RegionContext = FallbackRegionContext;
try {
  RegionContext = require('../../.storybook/contexts').RegionContext;
} catch (e) {
  // Not in Storybook environment
}

/**
 * Hook to access Storybook global settings
 * Returns current theme, language, and region settings
 * Falls back to defaults when not in Storybook
 */
export function useStorybookGlobals() {
  const { i18n } = useTranslation();
  const region = useContext(RegionContext);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get theme from document attribute
    const getTheme = () => {
      const docTheme = document.documentElement.getAttribute('data-mantine-color-scheme');
      setTheme(docTheme || 'light');
    };

    getTheme();

    // Watch for theme changes
    const observer = new MutationObserver(getTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mantine-color-scheme']
    });

    return () => observer.disconnect();
  }, []);

  return {
    theme: theme,
    language: i18n.language || 'en',
    region: region,
    isStorybook: typeof window !== 'undefined' && window.location.pathname.includes('iframe.html'),
  };
}

export default useStorybookGlobals;