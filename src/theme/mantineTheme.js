import { createTheme } from '@mantine/core'

export const mantineTheme = createTheme({
  /** Primary color scheme */
  primaryColor: 'blue',
  
  /** Color scheme - can be 'light', 'dark', or 'auto' */
  defaultColorScheme: 'light',
  
  /** Component-specific styles */
  components: {
    Button: {
      styles: {
        root: {
          borderRadius: '6px',
        },
      },
    },
    Paper: {
      styles: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    Select: {
      styles: {
        dropdown: {
          borderRadius: '6px',
          border: '1px solid #e1e5e9',
        },
      },
    },
  },
  
  /** Custom colors */
  colors: {
    // You can add custom color palettes here if needed
  },
  
  /** Spacing values */
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  
  /** Border radius values */
  radius: {
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
  },
})

export default mantineTheme