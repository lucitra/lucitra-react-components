/**
 * ModularCard Component
 * 
 * Reusable card component with consistent modular design
 * Replaces inline styled Card components across Privacy dashboard
 */

import React from 'react'
import { Card } from '@mantine/core'
import PropTypes from 'prop-types'

export const ModularCard = ({ 
  variant = 'primary',
  padding = 'lg',
  children,
  className,
  ...rest 
}) => {
  const getCardStyles = () => {
    const baseStyles = {
      borderRadius: 0,
      boxShadow: 'none'
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          border: '2px solid black'
        }
      
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: '#f8f9fa',
          border: '1px solid gray'
        }
      
      case 'accent':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          border: '2px solid black',
          borderLeft: '4px solid black'
        }
      
      case 'status':
        return {
          ...baseStyles,
          backgroundColor: '#f8f9fa',
          border: '1px solid gray',
          borderLeft: '4px solid #28a745'
        }
      
      case 'warning':
        return {
          ...baseStyles,
          backgroundColor: '#f8f9fa',
          border: '1px solid gray',
          borderLeft: '4px solid #ffc107'
        }
      
      case 'critical':
        return {
          ...baseStyles,
          backgroundColor: '#f8f9fa',
          border: '1px solid gray',
          borderLeft: '4px solid #dc3545'
        }
      
      default:
        return baseStyles
    }
  }

  return (
    <Card
      style={getCardStyles()}
      p={padding}
      className={className}
      {...rest}
    >
      {children}
    </Card>
  )
}

ModularCard.propTypes = {
  variant: PropTypes.oneOf([
    'primary', 
    'secondary', 
    'accent', 
    'status', 
    'warning', 
    'critical'
  ]),
  padding: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ModularCard.displayName = 'ModularCard'

export default ModularCard