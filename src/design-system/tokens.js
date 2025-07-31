/**
 * Design Tokens
 * 
 * Centralized design values for consistent styling across components.
 * Based on IBM.com design language and extracted from existing components.
 */

export const DESIGN_TOKENS = {
  colors: {
    // Text colors
    text: {
      primary: '#161616',
      secondary: '#a8a8a8',
      inverse: '#ffffff',
      disabled: '#c6c6c6',
      muted: '#6b7280',
    },
    
    // Background colors
    background: {
      transparent: 'transparent',
      hover: '#f4f4f4',
      active: '#e0e0e0',
      dropdown: '#000000',
      selected: '#000000',
      unselected: '#ffffff',
      default: '#ffffff',
      muted: '#f9fafb',
      subtle: 'rgba(0, 0, 0, 0.02)',
    },
    
    // Border colors
    border: {
      transparent: 'transparent',
      focus: '#0f62fe',
      divider: '#e5e7eb',
      default: '#e5e7eb',
      strong: '#d1d5db',
    },
    
    // Brand colors
    brand: {
      primary: '#0f62fe',
      secondary: '#393939',
    },
    
    // Dark mode colors
    dark: {
      text: {
        primary: '#f9fafb',
        secondary: '#9ca3af',
        inverse: '#161616',
        disabled: '#4b5563',
        muted: '#9ca3af',
      },
      background: {
        default: '#0a0a0a',
        hover: '#1f2937',
        active: '#374151',
        muted: '#111827',
        subtle: 'rgba(255, 255, 255, 0.03)',
      },
      border: {
        divider: '#374151',
        default: '#374151',
        strong: '#4b5563',
      },
    },
  },

  spacing: {
    // Core spacing scale - 4px base grid
    scale: {
      '2xs': 2,   // 0.5 × base
      'xs': 4,    // 1 × base
      'sm': 8,    // 2 × base
      'md': 12,   // 3 × base
      'lg': 16,   // 4 × base
      'xl': 20,   // 5 × base
      '2xl': 24,  // 6 × base
      '3xl': 32,  // 8 × base
      '4xl': 40,  // 10 × base
      '5xl': 48,  // 12 × base
      '6xl': 56,  // 14 × base
      '7xl': 64,  // 16 × base
      '8xl': 72,  // 18 × base
      '9xl': 80,  // 20 × base
      '10xl': 96, // 24 × base
    },
    
    // Component-specific spacing (using scale values)
    button: {
      iconSize: {
        icon: 20,  // 5 × base
        text: 16,  // 4 × base
      },
      size: {
        width: 48,  // 12 × base
        height: 48, // 12 × base
      },
      gap: 8,     // 2 × base
      padding: {
        vertical: 8,    // 2 × base
        horizontal: 12, // 3 × base
      },
    },
    
    // Menu/Dropdown spacing (using scale values)
    dropdown: {
      width: 300,
      offset: 8,     // 2 × base
      maxHeight: 400,
      itemPadding: {
        vertical: 12,   // 3 × base
        horizontal: 16, // 4 × base
      },
      sectionPadding: {
        vertical: 16,   // 4 × base
        horizontal: 16, // 4 × base
      },
    },
  },

  typography: {
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    round: 9999,
  },

  transitions: {
    fast: '0.1s ease',
    default: '0.15s ease',
    slow: '0.3s ease',
    
    // Specific transition combinations
    button: 'background-color 0.15s ease, outline 0.15s ease, border-color 0.15s ease',
    dropdown: 'opacity 0.2s ease, transform 0.2s ease',
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },

  // Responsive breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    overlay: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
  },

  // Interaction states
  states: {
    disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    hover: {
      backgroundColor: '#f4f4f4',
    },
    focus: {
      outline: '2px solid #0f62fe',
      outlineOffset: '2px',
    },
  },
}

// Helper functions for accessing tokens
export const getColor = (path) => {
  const keys = path.split('.')
  return keys.reduce((obj, key) => obj?.[key], DESIGN_TOKENS.colors)
}

export const getSpacing = (path) => {
  const keys = path.split('.')
  return keys.reduce((obj, key) => obj?.[key], DESIGN_TOKENS.spacing)
}

export const getTypography = (path) => {
  const keys = path.split('.')
  return keys.reduce((obj, key) => obj?.[key], DESIGN_TOKENS.typography)
}

// CSS custom properties generator
export const generateCSSCustomProperties = () => {
  const flattenObject = (obj, prefix = '') => {
    let result = {}
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}-${key}` : key
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result = { ...result, ...flattenObject(value, newKey) }
      } else {
        result[`--${newKey}`] = value
      }
    }
    return result
  }

  return flattenObject(DESIGN_TOKENS)
}

export default DESIGN_TOKENS