/**
 * ModularButton Component
 * 
 * Consistent button styling across Privacy dashboard
 * Replaces inline styled buttons with standardized variants
 */

import React from 'react'
import PropTypes from 'prop-types'

export const ModularButton = ({ 
  variant = 'primary',
  size = 'md',
  active = false,
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  children,
  onClick,
  className,
  ...rest 
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: leftIcon || rightIcon ? '8px' : '0',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s ease',
      width: fullWidth ? '100%' : 'auto',
      justifyContent: fullWidth ? 'center' : 'flex-start'
    }

    if (active) {
      switch (variant) {
        case 'primary':
          return {
            ...baseStyles,
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid black'
          }
        
        case 'secondary':
          return {
            ...baseStyles,
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid black'
          }
        
        case 'outline':
          return {
            ...baseStyles,
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid black'
          }
        
        case 'tab':
          return {
            ...baseStyles,
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid black'
          }
      }
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: 'black',
          color: 'white',
          border: '2px solid black'
        }
      
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          color: 'black',
          border: '2px solid black'
        }
      
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid gray'
        }
      
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: 'black',
          border: 'none'
        }
      
      case 'tab':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid gray'
        }
      
      case 'link':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: 'black',
          border: 'none',
          textDecoration: 'underline'
        }
      
      default:
        return baseStyles
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return {
          fontSize: '12px',
          padding: '4px 8px'
        }
      
      case 'sm':
        return {
          fontSize: '12px',
          padding: '6px 12px'
        }
      
      case 'md':
        return {
          fontSize: '14px',
          padding: '8px 16px'
        }
      
      case 'lg':
        return {
          fontSize: '16px',
          padding: '12px 24px'
        }
      
      default:
        return {
          fontSize: '14px',
          padding: '8px 16px'
        }
    }
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  return (
    <button
      style={{
        ...variantStyles,
        ...sizeStyles,
        ...rest.style
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  )
}

ModularButton.propTypes = {
  variant: PropTypes.oneOf([
    'primary', 
    'secondary', 
    'outline', 
    'ghost', 
    'tab', 
    'link'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}

ModularButton.displayName = 'ModularButton'

export default ModularButton