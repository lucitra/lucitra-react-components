# Theme System Documentation

## Overview

The Lucitra React Components library includes a comprehensive theming system built on CSS custom properties (design tokens). This enables:

- **Light/Dark Mode**: Full support for light and dark themes
- **Design Tokens**: Consistent spacing, colors, typography, and more
- **Live Editing**: Visual design token editor in DevTools
- **Type Safety**: Full TypeScript support
- **Performance**: CSS variables for instant theme switching

## Quick Start

### 1. Wrap Your App with ThemeProvider

```jsx
import { ThemeProvider } from '@lucitra/react-components';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 2. Add Theme Toggle

```jsx
import { ThemeToggle } from '@lucitra/react-components';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
}
```

### 3. Import CSS Tokens

```jsx
// In your main entry file
import '@lucitra/react-components/dist/styles/tokens.css';
```

## Design Tokens

### Color Tokens

```css
/* Light Theme (default) */
--color-background: #ffffff;
--color-surface: #fafbfc;
--color-border: #e5e7eb;
--color-text-primary: #111827;
--color-text-secondary: #6b7280;
--color-text-muted: #9ca3af;
--color-primary: #667eea;
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

### Typography Tokens

```css
/* Font Families */
--font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
--font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', ...;

/* Font Sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Spacing Tokens

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
```

## Using Tokens in Components

### With CSS

```css
.my-component {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  transition: var(--transition-colors);
}
```

### With Inline Styles

```jsx
<div
  style={{
    backgroundColor: 'var(--color-surface)',
    padding: 'var(--space-4)',
    borderRadius: 'var(--radius-md)',
  }}
>
  Content
</div>
```

### With useThemeTokens Hook

```jsx
import { useThemeTokens } from '@lucitra/react-components';

function MyComponent() {
  const { getColor, getSpace, isDark } = useThemeTokens();
  
  return (
    <div
      style={{
        backgroundColor: getColor('surface'),
        padding: getSpace('4'),
        color: isDark ? 'white' : 'black',
      }}
    >
      Content
    </div>
  );
}
```

## Visual Design Token Editor

The DevTools component includes a visual design token editor:

```jsx
import { DevTools } from '@lucitra/react-components';

// In development mode
<DevTools showInProduction={false} />
```

Features:
- Live preview of token changes
- Export tokens as CSS or JSON
- Category-based organization
- Search functionality
- Theme switching

## Programmatic Theme Control

### Using ThemeProvider Context

```jsx
import { useTheme } from '@lucitra/react-components';

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('light')}>Light Mode</button>
    </div>
  );
}
```

### Updating Individual Tokens

```jsx
const { updateToken } = useTheme();

// Update a single token
updateToken('--color-primary', '#5b21b6');

// Update multiple tokens
const { updateTokens } = useThemeTokens();
updateTokens({
  'color-primary': '#5b21b6',
  'color-primary-hover': '#4c1d95',
});
```

## Mantine Integration

The theme system automatically applies to Mantine components:

```css
/* Automatic Mantine overrides */
.mantine-Paper-root {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}

.mantine-Input-input {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}
```

## Best Practices

1. **Always use tokens** instead of hardcoded values
2. **Test both themes** when developing components
3. **Use semantic token names** (e.g., `color-text-primary` not `color-gray-900`)
4. **Provide fallbacks** for older browsers if needed
5. **Keep contrast ratios** WCAG AA compliant in both themes

## TypeScript Support

```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  tokens: Record<string, string>;
  updateToken: (tokenName: string, value: string) => void;
}
```

## Examples

### Card Component with Theme

```jsx
function ThemedCard({ children }) {
  return (
    <div className="themed-card">
      {children}
    </div>
  );
}

// CSS
.themed-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-all);
}

.themed-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Custom Theme Toggle

```jsx
import { useTheme } from '@lucitra/react-components';
import { IconSun, IconMoon } from '@tabler/icons-react';

function CustomThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-2)',
        cursor: 'pointer',
        transition: 'var(--transition-all)',
      }}
    >
      {theme === 'light' ? <IconMoon /> : <IconSun />}
    </button>
  );
}
```

## Troubleshooting

### Tokens not updating
- Ensure ThemeProvider is at the root of your app
- Check that tokens.css is imported
- Verify CSS specificity isn't overriding tokens

### Flash of unstyled content
- Set initial theme in localStorage
- Use SSR-friendly theme detection
- Apply theme class to html element

### Performance issues
- Use CSS transitions wisely
- Avoid animating expensive properties
- Consider using will-change for animations