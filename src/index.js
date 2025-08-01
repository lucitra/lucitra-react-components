// Styles
import './index.css'
import './styles/tokens.css'
import './styles/typography-utilities.css'

// All Components
export * from './components'

// Providers
export { ThemeProvider, useTheme } from './providers/ThemeProvider'

// Hooks
export { useClickOutside } from './hooks/useClickOutside'
export { useResumeVersionControl } from './hooks/useResumeVersionControl'
export { 
  useScrollAnimation, 
  useParallax, 
  useScrollProgress, 
  useStickyScroll 
} from './hooks/useScrollAnimation'

// Utils and configs
export { 
  DEFAULT_LANGUAGES, 
  DEFAULT_REGIONS, 
  DEFAULT_THEME 
} from './utils/defaultConfigs'

// SSR utilities
export * from './utils/ssr'

// Design System
export { DESIGN_TOKENS } from './design-system/tokens'
export { BaseButton } from './design-system/components/BaseButton'
export { Button } from './design-system/components/atoms'

// Component Categories (for organized imports)
export * as Navigation from './components/Navigation'
export * as Forms from './components/Forms'
export * as Layout from './components/Layout'
export * as Feedback from './components/Feedback'
export * as DataDisplay from './components/DataDisplay'
export * as Resume from './components/Resume'
export * as DesignSystem from './design-system/components'

// HubSpot CMS Integration
export * as HubSpot from './components/HubSpot'