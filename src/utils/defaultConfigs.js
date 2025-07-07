export const DEFAULT_LANGUAGES = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'zh', name: '中文', dir: 'ltr' },
  { code: 'ja', name: '日本語', dir: 'ltr' },
  { code: 'ko', name: '한국어', dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' }
]

export const DEFAULT_REGIONS = [
  { code: 'US', name: 'United States', flag: '🇺🇸', language: 'en' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', language: 'en' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', language: 'en' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', language: 'en' },
  { code: 'FR', name: 'France', flag: '🇫🇷', language: 'fr' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', language: 'de' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', language: 'es' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', language: 'en' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', language: 'ja' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', language: 'ko' },
  { code: 'CN', name: 'China', flag: '🇨🇳', language: 'zh' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', language: 'ar' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', language: 'ar' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', language: 'pt' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', language: 'ru' }
]

export const DEFAULT_THEME = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff',
    backgroundHover: '#f8fafc',
    border: '#e2e8f0',
    borderHover: '#cbd5e1',
    borderFocus: '#3b82f6',
    text: '#1e293b',
    textSecondary: '#64748b'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px'
  },
  borderRadius: '8px',
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  transition: {
    fast: '0.1s ease',
    normal: '0.2s ease',
    slow: '0.3s ease'
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    tooltip: 1100
  }
}