/**
 * StatusIndicator Component
 * 
 * Consistent status display with minimal color usage
 * Replaces colored badges with standardized indicators
 */

import React from 'react'
import PropTypes from 'prop-types'

export const StatusIndicator = ({ 
  status = 'neutral',
  size = 'md',
  showDot = true,
  children,
  className,
  ...rest 
}) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'success':
      case 'healthy':
      case 'enabled':
        return {
          backgroundColor: 'black',
          borderRadius: '50%'
        }
      
      case 'warning':
      case 'moderate':
      case 'pending':
        return {
          backgroundColor: '#666',
          borderRadius: '2px'
        }
      
      case 'error':
      case 'critical':
      case 'disabled':
        return {
          backgroundColor: 'transparent',
          border: '2px solid black',
          borderRadius: '50%'
        }
      
      case 'info':
      case 'active':
        return {
          backgroundColor: 'black',
          borderRadius: '2px'
        }
      
      case 'neutral':
      default:
        return {
          backgroundColor: '#999',
          borderRadius: '50%'
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return {
          fontSize: '10px',
          padding: '2px 6px',
          dotSize: '6px'
        }
      
      case 'sm':
        return {
          fontSize: '12px',
          padding: '4px 8px',
          dotSize: '8px'
        }
      
      case 'md':
        return {
          fontSize: '14px',
          padding: '6px 12px',
          dotSize: '8px'
        }
      
      case 'lg':
        return {
          fontSize: '16px',
          padding: '8px 16px',
          dotSize: '10px'
        }
      
      default:
        return {
          fontSize: '14px',
          padding: '6px 12px',
          dotSize: '8px'
        }
    }
  }

  const sizeStyles = getSizeStyles()
  const statusStyle = getStatusStyle()

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: showDot ? '8px' : '0',
        backgroundColor: 'white',
        border: '1px solid gray',
        padding: sizeStyles.padding,
        fontSize: sizeStyles.fontSize,
        fontWeight: 600,
        color: 'black',
        ...rest.style
      }}
      className={className}
      {...rest}
    >
      {showDot && (
        <div
          style={{
            width: sizeStyles.dotSize,
            height: sizeStyles.dotSize,
            flexShrink: 0,
            ...statusStyle
          }}
        />
      )}
      {children}
    </div>
  )
}

StatusIndicator.propTypes = {
  status: PropTypes.oneOf([
    'success', 'healthy', 'enabled',
    'warning', 'moderate', 'pending', 
    'error', 'critical', 'disabled',
    'info', 'active',
    'neutral'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  showDot: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

StatusIndicator.displayName = 'StatusIndicator'

export default StatusIndicator