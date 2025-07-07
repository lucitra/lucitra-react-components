# @lucitra/react-components

A comprehensive, production-ready React component library designed for modern web applications. Built with accessibility, internationalization, and developer experience in mind.

## 🌟 Features

- 🎨 **Consistent Design System** - Unified theming and design tokens
- ♿ **Accessibility First** - WCAG compliant with built-in ARIA support
- 🌍 **Internationalization** - RTL support and i18next integration
- 📱 **Responsive** - Mobile-first approach with flexible layouts
- 🎯 **TypeScript** - Full type safety and excellent IDE support
- 🎪 **Storybook** - Interactive documentation and component playground
- 🔧 **Highly Customizable** - Flexible theming and style overrides
- 📦 **Tree Shakeable** - Import only what you need
- ⚡ **Performance Optimized** - Minimal bundle size and runtime overhead

## 📦 Installation

```bash
npm install @lucitra/react-components
```

### Peer Dependencies

```bash
npm install react react-dom
```

### Optional Dependencies

```bash
# For enhanced icons (recommended)
npm install lucide-react

# For internationalization features
npm install react-i18next
```

## 🚀 Quick Start

```jsx
import { LanguageSwitcher, RegionSwitcher } from '@lucitra/react-components'

function App() {
  return (
    <div>
      <LanguageSwitcher onLanguageChange={(lang) => console.log(lang)} />
      <RegionSwitcher onRegionChange={(region) => console.log(region)} />
    </div>
  )
}
```

## 📚 Component Categories

### 🧭 Navigation Components
- **LanguageSwitcher** - Multi-language dropdown with RTL support
- **RegionSwitcher** - Country/region selector with language integration
- *More navigation components coming soon...*

### 📝 Form Components *(Coming Soon)*
- **Button** - Versatile button component with multiple variants
- **Input** - Text input with validation and accessibility
- **Select** - Dropdown select with search and multi-select options
- **Checkbox** - Checkbox with indeterminate state support
- **Radio** - Radio button groups with keyboard navigation

### 🎨 Layout Components *(Coming Soon)*
- **Container** - Responsive container with max-width constraints
- **Grid** - Flexible CSS Grid system
- **Stack** - Vertical and horizontal spacing utility
- **Card** - Content container with elevation and borders

### 💬 Feedback Components *(Coming Soon)*
- **Alert** - Contextual messages and notifications
- **Toast** - Non-blocking notifications
- **Modal** - Dialog overlays with focus management
- **Tooltip** - Contextual help and information

### 📊 Data Display Components *(Coming Soon)*
- **Table** - Sortable, filterable data tables
- **Badge** - Status indicators and labels
- **Avatar** - User profile images and placeholders
- **Skeleton** - Loading state placeholders

## 🎨 Theming

All components support a unified theming system:

```jsx
import { LanguageSwitcher, DEFAULT_THEME } from '@lucitra/react-components'

const customTheme = {
  ...DEFAULT_THEME,
  colors: {
    ...DEFAULT_THEME.colors,
    primary: '#8b5cf6',
    background: '#f8fafc'
  }
}

<LanguageSwitcher theme={customTheme} />
```

## 🌍 Internationalization

Components include built-in i18n support:

```jsx
import { LanguageSwitcher } from '@lucitra/react-components'
import { useTranslation } from 'react-i18next'

function App() {
  const { i18n } = useTranslation()
  
  return (
    <LanguageSwitcher
      useI18next={true}
      i18nInstance={i18n}
      currentLanguage={i18n.language}
    />
  )
}
```

## 📖 Import Styles

### Individual Components
```jsx
import { LanguageSwitcher } from '@lucitra/react-components'
```

### Category-based Imports
```jsx
import { Navigation } from '@lucitra/react-components'
const { LanguageSwitcher, RegionSwitcher } = Navigation
```

### All Components
```jsx
import * as LucitraComponents from '@lucitra/react-components'
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Run tests
npm test

# Start Storybook
npm run storybook

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation/          # Navigation-related components
│   ├── Forms/              # Form controls and inputs
│   ├── Layout/             # Layout and container components
│   ├── Feedback/           # Alerts, modals, notifications
│   └── DataDisplay/        # Tables, cards, data visualization
├── hooks/                  # Shared React hooks
├── utils/                  # Utility functions and configs
└── styles/                 # Theme definitions and style utilities
```

## 🎯 Component API Design Principles

- **Consistent Props** - Similar components share common prop patterns
- **Composition Over Configuration** - Flexible composition with render props
- **Accessible by Default** - ARIA attributes and keyboard navigation included
- **Theme-aware** - All components respect the global theme
- **TypeScript First** - Full type safety with helpful IntelliSense

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

1. **Component Categories** - Place components in appropriate category folders
2. **TypeScript** - All components must have proper TypeScript definitions
3. **Accessibility** - Follow WCAG 2.1 AA guidelines
4. **Testing** - Include unit tests for all components
5. **Storybook** - Create stories for all component variants
6. **Documentation** - Update README and component docs

## 📜 License

MIT © [Lucitra](https://github.com/lucitra)

## 🔗 Links

- [Storybook Documentation](https://lucitra-components.netlify.app) *(Coming Soon)*
- [GitHub Repository](https://github.com/lucitra/react-components)
- [NPM Package](https://www.npmjs.com/package/@lucitra/react-components)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

---

Built with ❤️ by the Lucitra team for the React community.