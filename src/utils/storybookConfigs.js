// Storybook-specific configurations
// Only supporting ar-sa (ar), en-us (en), and fr-fr (fr)

import { DEFAULT_LANGUAGES, DEFAULT_REGIONS } from './defaultConfigs';

// Filter to only supported languages for Storybook
export const STORYBOOK_LANGUAGES = DEFAULT_LANGUAGES.filter(lang => 
  ['en', 'ar', 'fr'].includes(lang.code)
);

// Filter to only supported regions for Storybook
export const STORYBOOK_REGIONS = DEFAULT_REGIONS.filter(region => 
  ['US', 'SA', 'FR'].includes(region.code)
);

// Map of locale codes to full locale identifiers
export const LOCALE_MAP = {
  'en': 'en-US',
  'ar': 'ar-SA', 
  'fr': 'fr-FR'
};

// Get full locale from language code
export const getFullLocale = (langCode) => {
  return LOCALE_MAP[langCode] || langCode;
};

export default {
  STORYBOOK_LANGUAGES,
  STORYBOOK_REGIONS,
  LOCALE_MAP,
  getFullLocale
};