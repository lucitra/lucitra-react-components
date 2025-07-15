/**
 * ModularBadge Component
 * 
 * Consistent badge/label styling for Privacy dashboard
 * Replaces colored badges with monochrome alternatives
 */

import React from 'react'
import PropTypes from 'prop-types'

export const ModularBadge = ({ 
  variant = 'default',
  size = 'md',
  uppercase = true,
  children,
  className,
  ...rest 
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      display: 'inline-block',
      fontWeight: 600,
      textTransform: uppercase ? 'uppercase' : 'none',
      letterSpacing: uppercase ? '0.5px' : 'normal'
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: 'black',
          color: 'white',
          border: '1px solid black'
        }
      
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid gray'
        }
      
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: 'black',
          border: '1px solid black'
        }
      
      case 'code':
        return {
          ...baseStyles,
          backgroundColor: '#f8f9fa',
          color: 'black',
          border: '1px solid gray',
          fontFamily: 'monospace',
          textTransform: 'none',
          letterSpacing: 'normal'
        }
      
      case 'status':
        return {
          ...baseStyles,
          backgroundColor: '#f8f9fa',
          color: 'black',
          border: '1px solid gray'
        }
      
      default:
        return {
          ...baseStyles,
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid gray'
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return {
          fontSize: '10px',
          padding: '2px 6px'
        }
      
      case 'sm':
        return {
          fontSize: '12px',
          padding: '4px 8px'
        }
      
      case 'md':
        return {
          fontSize: '12px',
          padding: '6px 12px'
        }
      
      case 'lg':
        return {
          fontSize: '14px',
          padding: '8px 16px'
        }
      
      default:
        return {
          fontSize: '12px',
          padding: '6px 12px'
        }
    }
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  return (
    <span
      style={{
        ...variantStyles,
        ...sizeStyles,
        ...rest.style
      }}
      className={className}
      {...rest}
    >
      {children}
    </span>
  )
}

ModularBadge.propTypes = {
  variant: PropTypes.oneOf([
    'default',
    'primary', 
    'secondary', 
    'outline', 
    'code',
    'status'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  uppercase: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ModularBadge.displayName = 'ModularBadge'

export default ModularBadge