// Alternative entry point without Toast components
// Use this for environments where @mantine/notifications causes issues

// Styles
import './index.css'

// All Components except Toast
export * from './components/Navigation'
export * from './components/Forms'
export * from './components/Layout'
export * from './components/DataDisplay'
export * from './components/Typography'
export * from './components/Resume'
export * from './components/HubSpot'
export * from './components/Debug'
export * from './components/Icons'

// Feedback components without Toast
export { default as ErrorBoundary, ErrorFallback } from './components/Feedback/ErrorBoundary'
export { default as Alert, Alert as AlertComponent } from './components/Feedback/Alert'

// Hooks
export { useClickOutside } from './hooks/useClickOutside'
export { useResumeVersionControl } from './hooks/useResumeVersionControl'

// Utils and configs
export { 
  DEFAULT_LANGUAGES, 
  DEFAULT_REGIONS, 
  DEFAULT_THEME 
} from './utils/defaultConfigs'

// Design System
export { DESIGN_TOKENS } from './design-system/tokens'
export { BaseButton } from './design-system/components/BaseButton'
export { Button } from './design-system/components/atoms'

// Component Categories (for organized imports)
export * as Navigation from './components/Navigation'
export * as Forms from './components/Forms'
export * as Layout from './components/Layout'
export * as DataDisplay from './components/DataDisplay'
export * as Resume from './components/Resume'
export * as DesignSystem from './design-system/components'
export * as HubSpot from './components/HubSpot'

// Provide a dummy Toast implementation
export const Toast = () => {
  return null;
};

export const ToastProvider = ({ children }) => children;

export const useToast = () => ({
  show: (options) => console.log('[Toast]', options),
  hide: () => {},
  clean: () => {},
  update: () => {}
});