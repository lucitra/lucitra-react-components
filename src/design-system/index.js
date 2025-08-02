/**
 * Design System Exports
 * Central location for all design system resources
 */

// Export design tokens
export { default as DESIGN_TOKENS } from './tokens.js';

// Export token converter utility
export * from './utils/tokenConverter.js';

// Import and re-export CSS files as modules (for bundlers that support CSS imports)
import '../styles/tokens.css';
import '../styles/typography-utilities.css';

// Export paths to CSS files for manual imports
export const TOKEN_CSS_PATH = '@lucitra/react-components/dist/tokens.css';
export const TYPOGRAPHY_CSS_PATH = '@lucitra/react-components/dist/typography-utilities.css';

// Helper to get all CSS imports
export const getDesignSystemStyles = () => {
  return [
    TOKEN_CSS_PATH,
    TYPOGRAPHY_CSS_PATH
  ];
};

// Theme utilities
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  BLACK: 'black'
};

/**
 * Apply theme to document
 * @param {string} theme - One of THEMES values
 */
export const applyTheme = (theme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
};

/**
 * Get current theme from document
 * @returns {string} Current theme or 'light' as default
 */
export const getCurrentTheme = () => {
  if (typeof document !== 'undefined') {
    return document.documentElement.getAttribute('data-theme') || THEMES.LIGHT;
  }
  return THEMES.LIGHT;
};