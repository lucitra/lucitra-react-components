// Legacy cookie manager
export { 
  LucitraCookieManager, 
  getCookieManager, 
  useCookieManager, 
  COOKIE_CONFIG 
} from './CookieManager'

// Enhanced granular cookie system
export { 
  GranularAnalytics, 
  GranularAnalyticsProvider, 
  useGranularAnalytics 
} from './GranularAnalytics.jsx'

export { GranularConsentModal } from './GranularConsentModal.jsx'
export { SimplePrivacyNotice } from './SimplePrivacyNotice.jsx'
export { 
  PrivacySettingsButton, 
  CurrentPrivacySettings, 
  InlinePrivacyToggle 
} from './PrivacySettings.jsx'
export { GranularCookieDemo } from './GranularCookieDemo.jsx'

// Enterprise consent management system
export { EnterpriseConsentManager } from './EnterpriseConsentManager.jsx'

// Legacy components for backwards compatibility
export { default as CookieConsentBanner } from './CookieConsentBanner.jsx'