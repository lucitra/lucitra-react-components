import { createTheme } from '@mantine/core'

// Create theme with design tokens integration
export const mantineTheme = createTheme({
  /** Primary color scheme */
  primaryColor: 'blue',
  
  /** Color scheme - can be 'light', 'dark', or 'auto' */
  defaultColorScheme: 'light',
  
  /** Font family using design tokens */
  fontFamily: 'var(--font-family-sans)',
  fontFamilyMonospace: 'var(--font-family-mono)',
  
  /** Component-specific styles using design tokens */
  components: {
    Button: {
      styles: {
        root: {
          borderRadius: 'var(--radius-md)',
          fontWeight: 'var(--typography-md-semibold-font-weight)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      defaultProps: {
        size: 'md',
      },
    },
    Paper: {
      styles: {
        root: {
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-surface-L1)',
          border: '1px solid var(--color-border-Tertiary)',
        },
      },
    },
    Select: {
      styles: {
        dropdown: {
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border-Secondary)',
          backgroundColor: 'var(--color-background-Primary)',
        },
        input: {
          borderRadius: 'var(--radius-sm)',
          border: '2px solid var(--color-border-Tertiary)',
          backgroundColor: 'var(--color-background-Primary)',
          color: 'var(--color-content-Primary)',
          fontSize: 'var(--typography-sm-regular-font-size)',
          '&:focus': {
            borderColor: 'var(--color-brand-500)',
          },
        },
      },
    },
    TextInput: {
      styles: {
        input: {
          borderRadius: 'var(--radius-sm)',
          border: '2px solid var(--color-border-Tertiary)',
          backgroundColor: 'var(--color-background-Primary)',
          color: 'var(--color-content-Primary)',
          fontSize: 'var(--typography-sm-regular-font-size)',
          '&:focus': {
            borderColor: 'var(--color-brand-500)',
          },
          '&::placeholder': {
            color: 'var(--color-content-Tertiary)',
          },
        },
        label: {
          fontSize: 'var(--typography-sm-semibold-font-size)',
          fontWeight: 'var(--typography-sm-semibold-font-weight)',
          color: 'var(--color-content-Primary)',
          marginBottom: 'var(--spacing-xs)',
        },
      },
    },
    NumberInput: {
      styles: {
        input: {
          borderRadius: 'var(--radius-sm)',
          border: '2px solid var(--color-border-Tertiary)',
          backgroundColor: 'var(--color-background-Primary)',
          color: 'var(--color-content-Primary)',
          fontSize: 'var(--typography-sm-regular-font-size)',
          '&:focus': {
            borderColor: 'var(--color-brand-500)',
          },
        },
      },
    },
    Textarea: {
      styles: {
        input: {
          borderRadius: 'var(--radius-sm)',
          border: '2px solid var(--color-border-Tertiary)',
          backgroundColor: 'var(--color-background-Primary)',
          color: 'var(--color-content-Primary)',
          fontSize: 'var(--typography-sm-regular-font-size)',
          '&:focus': {
            borderColor: 'var(--color-brand-500)',
          },
          '&::placeholder': {
            color: 'var(--color-content-Tertiary)',
          },
        },
      },
    },
    Checkbox: {
      styles: {
        input: {
          borderRadius: 'var(--radius-xs)',
          border: '2px solid var(--color-border-Tertiary)',
          backgroundColor: 'var(--color-background-Primary)',
          '&:checked': {
            backgroundColor: 'var(--color-brand-500)',
            borderColor: 'var(--color-brand-500)',
          },
          '&:focus-visible': {
            outline: '2px solid var(--color-border-Focus)',
            outlineOffset: '2px',
          },
        },
        label: {
          color: 'var(--color-content-Primary)',
          fontSize: 'var(--typography-sm-regular-font-size)',
        },
      },
    },
    Card: {
      styles: {
        root: {
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-surface-L1)',
          border: '1px solid var(--color-border-Tertiary)',
          padding: 'var(--spacing-lg)',
        },
      },
    },
    Modal: {
      styles: {
        content: {
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-background-Primary)',
        },
        header: {
          borderBottom: '1px solid var(--color-border-Tertiary)',
          padding: 'var(--spacing-lg)',
        },
        body: {
          padding: 'var(--spacing-lg)',
        },
      },
    },
    Tabs: {
      styles: {
        tab: {
          borderRadius: 'var(--radius-sm)',
          padding: 'var(--spacing-sm) var(--spacing-md)',
          fontWeight: 'var(--typography-sm-semibold-font-weight)',
          '&[data-active]': {
            backgroundColor: 'var(--color-surface-L2)',
            color: 'var(--color-content-Primary)',
            borderBottom: '2px solid var(--color-brand-500)',
          },
        },
        tabsList: {
          borderBottom: '1px solid var(--color-border-Tertiary)',
        },
      },
    },
    Alert: {
      styles: {
        root: {
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-md)',
        },
      },
    },
    Badge: {
      styles: {
        root: {
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--typography-xs-regular-font-size)',
          fontWeight: 'var(--typography-xs-semibold-font-weight)',
          padding: 'var(--spacing-xs) var(--spacing-sm)',
        },
      },
    },
  },
  
  /** Custom colors from design tokens */
  colors: {
    // Brand colors
    brand: [
      'var(--color-brand-50)',
      'var(--color-brand-100)',
      'var(--color-brand-200)',
      'var(--color-brand-300)',
      'var(--color-brand-400)',
      'var(--color-brand-500)',
      'var(--color-brand-600)',
      'var(--color-brand-700)',
      'var(--color-brand-800)',
      'var(--color-brand-900)',
    ],
  },
  
  /** Spacing values from design tokens */
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  },
  
  /** Border radius values from design tokens */
  radius: {
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-pill)',
  },
  
  /** Font sizes from design tokens */
  fontSizes: {
    xs: 'var(--typography-xs-regular-font-size)',
    sm: 'var(--typography-sm-regular-font-size)',
    md: 'var(--typography-md-regular-font-size)',
    lg: 'var(--typography-lg-regular-font-size)',
    xl: 'var(--typography-xl-regular-font-size)',
  },
  
  /** Headings configuration */
  headings: {
    fontFamily: 'var(--font-family-sans)',
    fontWeight: 'var(--typography-lg-bold-font-weight)',
    sizes: {
      h1: { 
        fontSize: 'var(--typography-3xl-bold-font-size)', 
        lineHeight: 'var(--typography-3xl-bold-line-height)' 
      },
      h2: { 
        fontSize: 'var(--typography-2xl-bold-font-size)', 
        lineHeight: 'var(--typography-2xl-bold-line-height)' 
      },
      h3: { 
        fontSize: 'var(--typography-xl-bold-font-size)', 
        lineHeight: 'var(--typography-xl-bold-line-height)' 
      },
      h4: { 
        fontSize: 'var(--typography-lg-bold-font-size)', 
        lineHeight: 'var(--typography-lg-bold-line-height)' 
      },
      h5: { 
        fontSize: 'var(--typography-md-bold-font-size)', 
        lineHeight: 'var(--typography-md-bold-line-height)' 
      },
      h6: { 
        fontSize: 'var(--typography-sm-bold-font-size)', 
        lineHeight: 'var(--typography-sm-bold-line-height)' 
      },
    },
  },
  
  /** Other theme configurations */
  other: {
    // Custom properties that can be accessed throughout the app
    transitions: {
      fast: '150ms ease',
      normal: '250ms ease',
      slow: '350ms ease',
    },
    shadows: {
      subtle: '0 1px 3px rgba(0, 0, 0, 0.1)',
      medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
      strong: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
  },
})

export default mantineTheme