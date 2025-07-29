# Design Tokens Migration Guide

This guide helps developers understand how to use design tokens in the Lucitra React Components library.

## Overview

Design tokens are the visual design atoms of our design system. They are named entities that store visual design attributes. When we change a token value, it propagates throughout the entire system.

## Token Categories

### 1. Colors
- **Primitive Colors**: Base color palettes (e.g., `--color-blue-500`, `--color-green-400`)
- **Semantic Colors**: Purpose-driven colors (e.g., `--color-background-Primary`, `--color-content-Secondary`)
- **Theme-aware**: Automatically adjust for light/dark/black themes

### 2. Typography
- **Font Families**: `--font-family-inter`, `--font-family-roboto`
- **Font Sizes**: `--font-size-xs` through `--font-size-10xl`
- **Font Weights**: `--font-weight-regular`, `--font-weight-semi-bold`, `--font-weight-bold`
- **Line Heights**: `--line-height-xs` through `--line-height-10xl`
- **Typography Scales**: Pre-composed text styles (e.g., `--typography-xl-bold-font-size`)

### 3. Spacing
- **Scale**: From `--spacing-9xs` to `--spacing-16xl`
- **Unit-based**: References like `--spacing-unit-16`

### 4. Borders
- **Radius**: `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- **Width**: `--border-width-sm`, `--border-width-md`, `--border-width-lg`

## Migration Examples

### Before: Hardcoded Values
```css
.button {
  background-color: #0056b3;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
}

.button:hover {
  background-color: #004494;
}
```

### After: Using Design Tokens
```css
.button {
  background-color: var(--color-blue-500);
  color: var(--color-primary-White);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-3xs);
  font-weight: var(--font-weight-semi-bold);
}

.button:hover {
  background-color: var(--color-blue-600);
}
```

## Component Examples

### 1. NavButton Component
```css
/* Before */
.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.nav-button:focus {
  border-color: #0056b3;
  outline: 2px solid #0056b3;
}

/* After */
.nav-button:hover {
  background-color: var(--color-background-Hover);
}

.nav-button:focus {
  border-color: var(--color-border-Focus);
  outline: 2px solid var(--color-border-Focus);
}
```

### 2. Badge Component
```jsx
// Before: Inline styles with hardcoded colors
<Badge
  style={{
    border: '2px solid #0056b3',
    backgroundColor: 'white',
    color: '#0056b3'
  }}
>

// After: CSS classes with design tokens
<Badge
  variant="primary"
  style="outline"
/>
```

### 3. Alert Component
```jsx
// Before: Mantine Alert with inline styles
<MantineAlert
  style={{
    border: '2px solid #dc3545',
    backgroundColor: 'white'
  }}
/>

// After: Custom Alert with token-based CSS
<Alert
  variant="error"
  solid={false}
/>
```

## Best Practices

### 1. Use Semantic Tokens When Possible
```css
/* Good: Uses semantic tokens that adapt to theme */
.card {
  background-color: var(--color-background-Primary);
  border: 1px solid var(--color-border-Primary);
  color: var(--color-content-Primary);
}

/* Less ideal: Uses primitive tokens */
.card {
  background-color: var(--color-neutral-50);
  border: 1px solid var(--color-neutral-200);
  color: var(--color-neutral-900);
}
```

### 2. Leverage Typography Scales
```css
/* Good: Uses pre-composed typography scale */
.heading {
  font-size: var(--typography-xl-bold-font-size);
  line-height: var(--typography-xl-bold-line-height);
  font-weight: var(--typography-xl-bold-font-weight);
  letter-spacing: var(--typography-xl-bold-letter-spacing);
}

/* Or use utility class */
.text-xl-bold { }
```

### 3. Consistent Spacing
```css
/* Good: Uses spacing tokens */
.section {
  padding: var(--spacing-xl) var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
}

/* Avoid: Mixed units */
.section {
  padding: 32px 16px;
  margin-bottom: 3rem;
}
```

### 4. Theme-Aware Components
```css
/* Tokens automatically adjust for theme */
.modal {
  background-color: var(--color-surface-L1);
  box-shadow: var(--shadow-lg);
}

/* No need for manual dark mode overrides */
```

## Utility Classes

The library provides utility classes for common patterns:

### Typography
```html
<p class="text-xl-bold">Large bold text</p>
<p class="text-md-regular">Medium regular text</p>
<p class="font-semi-bold">Semi-bold weight</p>
```

### Spacing
```html
<div class="p-md">Medium padding</div>
<div class="mx-lg">Large horizontal margin</div>
<div class="spacing-xl">Extra large spacing</div>
```

## Using the Design Tokens Editor

The library includes a visual Design Tokens Editor in DevTools:

1. Enable DevTools in your app
2. Open the DevTools panel
3. Navigate to the "Design Tokens" tab
4. Live edit colors, typography, spacing, and more
5. Copy the updated CSS variables to your project

## Theme Provider Integration

```jsx
import { ThemeProvider } from '@lucitra/react-components';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

The ThemeProvider automatically:
- Applies the correct theme based on user preference
- Provides theme toggle functionality
- Ensures all tokens update correctly

## Common Patterns

### Responsive Spacing
```css
.content {
  padding: var(--spacing-md);
}

@media (min-width: 640px) {
  .content {
    padding: var(--spacing-lg);
  }
}

@media (min-width: 1024px) {
  .content {
    padding: var(--spacing-xl);
  }
}
```

### State Variants
```css
.button--primary {
  background-color: var(--color-blue-500);
}

.button--primary:hover {
  background-color: var(--color-blue-600);
}

.button--primary:active {
  background-color: var(--color-blue-700);
}

.button--primary:disabled {
  background-color: var(--color-blue-300);
  cursor: not-allowed;
}
```

### Semantic Shadows
```css
.card {
  box-shadow: var(--shadow-sm);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.modal {
  box-shadow: var(--shadow-xl);
}
```

## Migration Checklist

- [ ] Replace hardcoded color values with color tokens
- [ ] Replace pixel values for spacing with spacing tokens
- [ ] Replace font sizes and weights with typography tokens
- [ ] Replace border radius values with radius tokens
- [ ] Use semantic tokens for background, text, and border colors
- [ ] Test components in light, dark, and black themes
- [ ] Update component documentation with token usage
- [ ] Remove theme-specific CSS overrides (tokens handle this)

## Resources

- **Token Reference**: See `src/styles/tokens.css` for all available tokens
- **Typography Utilities**: See `src/styles/typography-utilities.css`
- **Live Editor**: Use the Design Tokens Editor in DevTools
- **Examples**: Check Storybook for component examples using tokens

## Getting Help

If you need help with the migration or have questions about design tokens:
1. Check the Storybook examples
2. Use the Design Tokens Editor to explore available tokens
3. Refer to this guide for patterns and best practices
4. File an issue on GitHub for specific questions