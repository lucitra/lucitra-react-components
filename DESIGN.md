# @lucitra/react-components

## Component Library Design Document

### Overview
A comprehensive, production-ready React component library designed for modern web applications. Provides a full suite of UI components including navigation, forms, layout, feedback, and data display components with built-in accessibility, internationalization, and theming support.

### Target Frameworks
- React 18+ applications
- Next.js 13+ (App Router & Pages Router)
- Vite/React SPAs
- Any React-based framework

### Component Categories

#### Navigation Components

##### 1. LanguageSwitcher
**Enhanced Props API:**
```javascript
{
  // Configuration
  languages: [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'ar', name: 'العربية', dir: 'rtl' }
  ],
  currentLanguage: 'en',
  onLanguageChange: (langCode, language) => {},
  
  // Styling & Theming
  theme: {
    colors: { primary: '#3b82f6', secondary: '#64748b' },
    spacing: { sm: '8px', md: '12px', lg: '16px' },
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  className: 'custom-language-switcher',
  style: {},
  
  // Behavior
  disabled: false,
  placement: 'bottom-right', // 'bottom-left', 'top-right', 'top-left'
  closeOnSelect: true,
  
  // Accessibility
  ariaLabel: 'Select language',
  
  // Icons & Rendering
  icon: <Globe size={16} />,
  renderLanguage: (lang) => lang.name,
  renderDropdownItem: (lang, isSelected) => (
    <div>{lang.name} {isSelected && <Check />}</div>
  )
}
```

##### 2. RegionSwitcher
**Enhanced Props API:**
```javascript
{
  // Configuration
  regions: [
    { code: 'US', name: 'United States', flag: '🇺🇸', language: 'en' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', language: 'ar' }
  ],
  currentRegion: null,
  onRegionChange: (region) => {},
  
  // Integration Options
  syncWithLanguage: true,
  updateDocumentDirection: true,
  onLanguageChange: (langCode) => {}, // Called when region changes language
  
  // Styling & Theming
  theme: defaultTheme,
  className: '',
  style: {},
  
  // Behavior
  disabled: false,
  placement: 'bottom-right',
  closeOnSelect: true,
  
  // Accessibility
  ariaLabel: 'Select region',
  
  // Icons & Rendering
  icons: {
    region: <MapPin size={16} />,
    chevron: <ChevronDown size={16} />,
    check: <Check size={16} />
  },
  renderRegion: (region) => `${region.flag} ${region.name}`,
  renderDropdownItem: (region, isSelected) => (
    <div>
      {region.flag} {region.name}
      {isSelected && <Check />}
    </div>
  )
}
```

#### Future Component Categories

##### Form Components (Planned)
- **Button** - Versatile button with multiple variants
- **Input** - Text inputs with validation
- **Select** - Dropdown selects with search
- **Checkbox** - Checkbox with indeterminate state
- **Radio** - Radio button groups

##### Layout Components (Planned)
- **Container** - Responsive containers
- **Grid** - CSS Grid system
- **Card** - Content containers
- **Stack** - Spacing utilities

##### Feedback Components (Planned)
- **Alert** - Contextual messages
- **Toast** - Non-blocking notifications
- **Modal** - Dialog overlays
- **Tooltip** - Contextual help

##### Data Display Components (Planned)
- **Table** - Sortable data tables
- **Badge** - Status indicators
- **Avatar** - Profile images
- **Skeleton** - Loading states

### Package Configuration

#### package.json
```json
{
  "name": "@lucitra/react-components",
  "version": "1.0.0",
  "description": "A comprehensive React component library for modern web applications",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "files": [
    "dist/",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "vitest",
    "lint": "eslint src/",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "peerDependenciesMeta": {
    "react-i18next": {
      "optional": true
    },
    "lucide-react": {
      "optional": true
    }
  },
  "devDependencies": {
    "@rollup/plugin-babel": "^6.0.0",
    "@rollup/plugin-commonjs": "^25.0.0",
    "@rollup/plugin-node-resolve": "^15.0.0",
    "@rollup/plugin-terser": "^0.4.0",
    "@storybook/react": "^7.0.0",
    "@storybook/react-vite": "^7.0.0",
    "rollup": "^4.0.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "dependencies": {
    "prop-types": "^15.8.0"
  },
  "keywords": [
    "react",
    "components",
    "ui",
    "design-system",
    "accessibility",
    "i18n",
    "internationalization",
    "navigation",
    "forms",
    "layout",
    "typescript"
  ]
}
```

### Build Configuration

#### rollup.config.js
```javascript
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

const packageJson = require('./package.json')

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react']
    }),
    postcss({
      extract: false,
      inject: false,
      modules: false
    }),
    terser()
  ],
  external: ['react', 'react-dom', 'react-i18next', 'lucide-react']
}
```

### Default Configurations

#### src/utils/defaultConfigs.js
```javascript
export const DEFAULT_LANGUAGES = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' }
]

export const DEFAULT_REGIONS = [
  { code: 'US', name: 'United States', flag: '🇺🇸', language: 'en' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', language: 'en' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', language: 'en' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', language: 'en' },
  { code: 'FR', name: 'France', flag: '🇫🇷', language: 'fr' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', language: 'de' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', language: 'es' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', language: 'ar' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', language: 'ar' }
]
```

### Theming System

#### src/styles/defaultTheme.js
```javascript
export const defaultTheme = {
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
```

### Integration Examples

#### With react-i18next
```javascript
import { LanguageSwitcher } from '@lucitra/react-components'
import { useTranslation } from 'react-i18next'

function App() {
  const { i18n, t } = useTranslation()
  
  return (
    <LanguageSwitcher
      currentLanguage={i18n.language}
      onLanguageChange={(langCode) => i18n.changeLanguage(langCode)}
      ariaLabel={t('aria.selectLanguage')}
    />
  )
}
```

#### Standalone (without i18next)
```javascript
import { LanguageSwitcher } from '@lucitra/react-components'
import { useState } from 'react'

function App() {
  const [currentLang, setCurrentLang] = useState('en')
  
  return (
    <LanguageSwitcher
      currentLanguage={currentLang}
      onLanguageChange={(langCode) => {
        setCurrentLang(langCode)
        // Custom logic for language change
      }}
    />
  )
}
```

### Publishing Strategy

#### For Lucitra Enterprise (Public)
- Publish to npm with `@lucitra/` scope
- GitHub repository: `lucitra/react-components`
- Public documentation site with Storybook
- Open source license (MIT)

#### For Private Use
- Private npm registry or GitHub Packages
- Private GitHub repository
- Internal documentation

### Next Steps

1. **Setup Development Environment**
   - Initialize new repository
   - Setup build pipeline with Rollup
   - Configure Storybook for component development

2. **Component Migration**
   - Extract current components with enhanced API
   - Add TypeScript definitions
   - Implement theme system

3. **Testing & Documentation**
   - Unit tests with Vitest
   - Integration tests
   - Comprehensive Storybook stories
   - API documentation

4. **Release Pipeline**
   - Automated testing on PR
   - Semantic versioning
   - Automated npm publishing
   - Changelog generation

This design provides a solid foundation for a reusable, well-documented component library that can serve multiple React-based projects while maintaining the quality and functionality of the original components.