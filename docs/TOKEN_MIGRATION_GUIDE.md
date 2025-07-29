# Design Token Migration Guide

This guide helps you migrate from the old token system to the new comprehensive design token system.

## Overview

The new design token system provides:
- Platform-specific typography scales (desktop, mobile, iOS, Android)
- Comprehensive color palettes with semantic naming
- Extended spacing scale from 9xs to 16xl
- Theme support (light, dark, black)
- Improved token references and CSS custom properties

## Token Changes

### Color Tokens

**Old Format:**
```css
--color-primary: #667eea;
--color-background: #ffffff;
--color-text-primary: #111827;
```

**New Format:**
```css
--color-background-Primary: #ffffff;
--color-content-Primary: #111827;
--color-brand-500: #2d9bd3;
```

#### Migration Examples:
- `--color-background` → `--color-background-Primary`
- `--color-surface` → `--color-surface-L0` to `--color-surface-L6` (layered surfaces)
- `--color-text-primary` → `--color-content-Primary`
- `--color-text-secondary` → `--color-content-Secondary`
- `--color-border` → `--color-border-Primary`

### Typography Tokens

**Old Format:**
```css
font-size: var(--font-size-lg);
font-weight: var(--font-weight-semibold);
```

**New Format:**
```css
/* Use typography scale tokens */
font-size: var(--typography-lg-semibold-font-size);
line-height: var(--typography-lg-semibold-line-height);
letter-spacing: var(--typography-lg-semibold-letter-spacing);
font-weight: var(--typography-lg-semibold-font-weight);

/* Or use utility classes */
class="text-lg-semibold"
```

#### Typography Scale Sizes:
- `6xs`, `5xs`, `4xs`, `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`

#### Typography Variants:
- `regular`, `semibold`, `bold`, `italic`

### Spacing Tokens

**Old Format:**
```css
padding: var(--space-4);
margin: var(--space-8);
```

**New Format:**
```css
padding: var(--spacing-md);
margin: var(--spacing-2xl);
```

#### Spacing Scale:
- Negative: `9xs` to `2xs` (negative spacing)
- Small: `xs`, `sm`, `md`
- Medium: `lg`, `xl`, `2xl`, `3xl`
- Large: `4xl` to `16xl`

### Border Radius Tokens

**Old Format:**
```css
border-radius: var(--radius-md);
```

**New Format:**
```css
border-radius: var(--radius-md);  /* Same, but new values */
```

#### Available Radii:
- `xs`, `sm`, `md`, `lg`, `pill`, `circle`

## Component Migration

### Button Component Example

**Before:**
```jsx
const Button = styled.button`
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
`;
```

**After:**
```jsx
const Button = styled.button`
  background: var(--color-background-Brand);
  color: var(--color-content-Primary-Inverse);
  font-size: var(--typography-md-regular-font-size);
  font-weight: var(--typography-md-regular-font-weight);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
`;

// Or use utility classes
<button className="text-md-regular">
  Click me
</button>
```

### Card Component Example

**Before:**
```jsx
const Card = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`;
```

**After:**
```jsx
const Card = styled.div`
  background: var(--color-surface-L1);
  border: 1px solid var(--color-border-Tertiary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
```

## Theme Support

The new system supports automatic theme switching:

```jsx
// Light theme (default)
<div data-theme="light">
  <!-- Uses light theme tokens automatically -->
</div>

// Dark theme
<div data-theme="dark">
  <!-- Uses dark theme tokens automatically -->
</div>

// Black theme (OLED-friendly)
<div data-theme="black">
  <!-- Uses black theme tokens automatically -->
</div>
```

## Typography Utilities

Use the new typography utility classes for consistent text styling:

```jsx
// Headings
<h1 className="text-xl-bold">Page Title</h1>
<h2 className="text-lg-semibold">Section Title</h2>
<h3 className="text-md-semibold">Subsection</h3>

// Body text
<p className="text-md-regular">Regular paragraph text</p>
<p className="text-sm-regular">Small text</p>

// Responsive typography (automatically adjusts on mobile)
<h1 className="text-xl-bold">Responsive Heading</h1>
```

## Spacing Utilities

Use spacing utility classes for consistent spacing:

```jsx
// Padding
<div className="p-md">Medium padding all sides</div>
<div className="px-lg py-sm">Large horizontal, small vertical</div>

// Margin
<div className="m-xl">Extra large margin</div>
<div className="my-2xl">2xl vertical margin</div>
```

## Color Palette Reference

### Semantic Colors
- **Content**: Primary, Secondary, Tertiary, Disabled
- **Background**: Primary, Hover, Pressed, Selected, Brand, Info, Notice, Negative, Positive
- **Border**: Primary, Secondary, Tertiary, Focus, Brand
- **Surface**: L0-L6 (layered surfaces for depth)

### Brand Colors
Available in shades 50-1000:
- `orange`, `brown`, `amber`, `yellow`, `green`, `cyan`, `blue`, `purple`, `magenta`, `pink`, `red`, `neutral`, `brand`

Example:
```css
background: var(--color-blue-500);
border-color: var(--color-neutral-200);
```

## Migration Checklist

1. **Update color tokens** to use new semantic naming
2. **Replace typography tokens** with scale-based tokens or utility classes
3. **Update spacing tokens** to new scale
4. **Add theme support** with data-theme attribute
5. **Test in different themes** (light, dark, black)
6. **Update any hardcoded values** to use tokens
7. **Consider using utility classes** for common patterns

## Tools

### Token Converter Script
Use the provided script to convert additional JSON tokens:
```bash
node scripts/convertTokens.js
```

### Design Tokens Editor
Use the built-in Design Tokens Editor in DevTools to:
- Preview tokens in real-time
- Export customized tokens
- Test theme variations

## Need Help?

- Check the generated `tokens.css` file for all available tokens
- Use the Design Tokens Editor in DevTools to explore tokens visually
- Refer to the typography utilities in `typography-utilities.css`