/**
 * Privacy Provider - Context for Managing Privacy State
 * 
 * Provides privacy management context across applications
 * Essential for both enterprise and gaming implementations
 */

import { createContext, useContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { 
  PET_TECHNOLOGIES, 
  AUDIT_EVENT_TYPES, 
  DEFAULT_PRIVACY_CONFIG 
} from '../constants/privacyConstants'

// Privacy Context
const PrivacyContext = createContext(null)

// Privacy State Management
const privacyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONSENT':
      return {
        ...state,
        consents: {
          ...state.consents,
          [action.payload.purpose]: action.payload.consent
        },
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_PRIVACY_BUDGET':
      return {
        ...state,
        privacyBudget: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'ADD_AUDIT_EVENT':
      return {
        ...state,
        auditTrail: [action.payload, ...state.auditTrail.slice(0, 999)], // Keep last 1000 events
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_COMPLIANCE_STATUS':
      return {
        ...state,
        complianceStatus: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'UPDATE_PRIVACY_METRICS':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          ...action.payload
        },
        lastUpdated: new Date().toISOString()
      }
    
    case 'RESET_PRIVACY_STATE':
      return {
        ...initialPrivacyState,
        config: state.config // Preserve config
      }
    
    default:
      return state
  }
}

// Initial Privacy State
const initialPrivacyState = {
  consents: {},
  privacyBudget: 100,
  auditTrail: [],
  complianceStatus: {
    score: 0,
    frameworks: {},
    lastCheck: null
  },
  metrics: {
    usersConsented: 0,
    epsilonConsumed: 0,
    federatedParticipants: 0,
    privacyViolations: 0
  },
  config: DEFAULT_PRIVACY_CONFIG.enterprise,
  lastUpdated: new Date().toISOString()
}

/**
 * Privacy Provider Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} props.config - Privacy configuration
 * @param {string} props.mode - 'enterprise' or 'gaming'
 * @param {Function} props.onAuditEvent - Audit event callback
 * @param {Function} props.onComplianceChange - Compliance change callback
 * @param {boolean} props.persistState - Whether to persist state to localStorage
 */
export function PrivacyProvider({
  children,
  config = {},
  mode = 'enterprise',
  onAuditEvent,
  onComplianceChange,
  persistState = true
}) {
  const [state, dispatch] = useReducer(privacyReducer, {
    ...initialPrivacyState,
    config: {
      ...DEFAULT_PRIVACY_CONFIG[mode],
      ...config
    }
  })

  // Load persisted state on mount
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      try {
        const savedState = localStorage.getItem('lucitra-privacy-state')
        if (savedState) {
          const parsed = JSON.parse(savedState)
          // Merge with current state, preserving config
          Object.keys(parsed).forEach(key => {
            if (key !== 'config' && parsed[key] !== undefined) {
              dispatch({
                type: 'UPDATE_PRIVACY_METRICS',
                payload: { [key]: parsed[key] }
              })
            }
          })
        }
      } catch (error) {
        console.warn('Failed to load privacy state from localStorage:', error)
      }
    }
  }, [persistState])

  // Persist state changes
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      try {
        localStorage.setItem('lucitra-privacy-state', JSON.stringify(state))
      } catch (error) {
        console.warn('Failed to save privacy state to localStorage:', error)
      }
    }
  }, [state, persistState])

  // Privacy Actions
  const setConsent = (purpose, consent, metadata = {}) => {
    dispatch({
      type: 'SET_CONSENT',
      payload: { purpose, consent }
    })

    // Create audit event
    const auditEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: consent ? AUDIT_EVENT_TYPES.CONSENT_GIVEN : AUDIT_EVENT_TYPES.CONSENT_WITHDRAWN,
      purpose,
      consent,
      metadata,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null
    }

    dispatch({
      type: 'ADD_AUDIT_EVENT',
      payload: auditEvent
    })

    if (onAuditEvent) {
      onAuditEvent(auditEvent)
    }
  }

  const updatePrivacyBudget = (budget, consumed = 0) => {
    dispatch({
      type: 'SET_PRIVACY_BUDGET',
      payload: Math.max(0, Math.min(100, budget))
    })

    if (consumed > 0) {
      const auditEvent = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: AUDIT_EVENT_TYPES.PRIVACY_BUDGET_CONSUMED,
        consumed,
        remaining: budget,
        timestamp: new Date().toISOString()
      }

      dispatch({
        type: 'ADD_AUDIT_EVENT',
        payload: auditEvent
      })

      if (onAuditEvent) {
        onAuditEvent(auditEvent)
      }
    }
  }

  const recordDataProcessing = (activity, data = {}) => {
    const auditEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: AUDIT_EVENT_TYPES.DATA_PROCESSED,
      activity,
      data,
      petTechnology: data.petTechnology || PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY,
      timestamp: new Date().toISOString()
    }

    dispatch({
      type: 'ADD_AUDIT_EVENT',
      payload: auditEvent
    })

    if (onAuditEvent) {
      onAuditEvent(auditEvent)
    }
  }

  const updateComplianceStatus = (status) => {
    dispatch({
      type: 'SET_COMPLIANCE_STATUS',
      payload: status
    })

    if (onComplianceChange) {
      onComplianceChange(status)
    }
  }

  const updateMetrics = (metrics) => {
    dispatch({
      type: 'UPDATE_PRIVACY_METRICS',
      payload: metrics
    })
  }

  const exportAuditTrail = (format = 'json') => {
    const auditData = {
      exportedAt: new Date().toISOString(),
      totalEvents: state.auditTrail.length,
      events: state.auditTrail,
      complianceStatus: state.complianceStatus,
      config: state.config
    }

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(auditData, null, 2)], {
        type: 'application/json'
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `privacy-audit-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    return auditData
  }

  const resetPrivacyState = () => {
    dispatch({ type: 'RESET_PRIVACY_STATE' })
    
    const auditEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'PRIVACY_STATE_RESET',
      timestamp: new Date().toISOString()
    }

    dispatch({
      type: 'ADD_AUDIT_EVENT',
      payload: auditEvent
    })
  }

  // Context Value
  const contextValue = {
    // State
    ...state,
    
    // Actions
    setConsent,
    updatePrivacyBudget,
    recordDataProcessing,
    updateComplianceStatus,
    updateMetrics,
    exportAuditTrail,
    resetPrivacyState,
    
    // Computed Values
    hasConsent: (purpose) => state.consents[purpose] === true,
    getConsentCount: () => Object.values(state.consents).filter(Boolean).length,
    getAuditEventsByType: (type) => state.auditTrail.filter(event => event.type === type),
    
    // Utilities
    isPrivacyBudgetLow: () => state.privacyBudget < 30,
    isPrivacyBudgetCritical: () => state.privacyBudget < 10,
    getPrivacyScore: () => {
      // Calculate overall privacy score based on budget, compliance, etc.
      const budgetScore = state.privacyBudget
      const complianceScore = state.complianceStatus.score || 0
      return Math.round((budgetScore + complianceScore) / 2)
    }
  }

  return (
    <PrivacyContext.Provider value={contextValue}>
      {children}
    </PrivacyContext.Provider>
  )
}

// Privacy Hook
export function usePrivacy() {
  const context = useContext(PrivacyContext)
  
  if (!context) {
    throw new Error('usePrivacy must be used within a PrivacyProvider')
  }
  
  return context
}

PrivacyProvider.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.object,
  mode: PropTypes.oneOf(['enterprise', 'gaming']),
  onAuditEvent: PropTypes.func,
  onComplianceChange: PropTypes.func,
  persistState: PropTypes.bool
}

PrivacyProvider.displayName = 'PrivacyProvider'

export default PrivacyProvider