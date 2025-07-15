/**
 * AlertBox Component
 * 
 * Consistent alert/notification styling
 * Replaces colored Alert components with modular design
 */

import React from 'react'
import PropTypes from 'prop-types'

export const AlertBox = ({ 
  variant = 'info',
  size = 'md',
  icon = null,
  title = null,
  closable = false,
  onClose = null,
  children,
  className,
  ...rest 
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      backgroundColor: '#f8f9fa',
      border: '1px solid gray',
      borderRadius: 0,
      display: 'block'
    }

    switch (variant) {
      case 'success':
        return {
          ...baseStyles,
          borderLeft: '4px solid black'
        }
      
      case 'warning':
        return {
          ...baseStyles,
          borderLeft: '4px solid #666'
        }
      
      case 'error':
      case 'critical':
        return {
          ...baseStyles,
          borderLeft: '4px solid #333'
        }
      
      case 'info':
        return {
          ...baseStyles,
          borderLeft: '4px solid black'
        }
      
      case 'neutral':
        return {
          ...baseStyles,
          borderLeft: '4px solid #999'
        }
      
      default:
        return baseStyles
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '8px 12px',
          fontSize: '12px'
        }
      
      case 'md':
        return {
          padding: '12px 16px',
          fontSize: '14px'
        }
      
      case 'lg':
        return {
          padding: '16px 20px',
          fontSize: '16px'
        }
      
      default:
        return {
          padding: '12px 16px',
          fontSize: '14px'
        }
    }
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  return (
    <div
      style={{
        ...variantStyles,
        ...sizeStyles,
        ...rest.style
      }}
      className={className}
      {...rest}
    >
      {/* Header with icon, title, and close button */}
      {(icon || title || closable) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: children ? '8px' : '0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {icon && (
              <span style={{ 
                color: 'black',
                display: 'flex',
                alignItems: 'center'
              }}>
                {icon}
              </span>
            )}
            {title && (
              <span style={{
                fontWeight: 600,
                color: 'black'
              }}>
                {title}
              </span>
            )}
          </div>
          
          {closable && (
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'black',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '0',
                lineHeight: 1
              }}
            >
              ×
            </button>
          )}
        </div>
      )}
      
      {/* Content */}
      {children && (
        <div style={{
          color: '#6c757d',
          lineHeight: 1.4
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

AlertBox.propTypes = {
  variant: PropTypes.oneOf([
    'success', 
    'warning', 
    'error', 
    'critical', 
    'info', 
    'neutral'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  icon: PropTypes.node,
  title: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
}

AlertBox.displayName = 'AlertBox'

export default AlertBox