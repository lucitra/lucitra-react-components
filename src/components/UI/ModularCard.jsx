/**
 * ModularCard Component
 * 
 * Reusable card component with consistent modular design
 * Now uses design tokens for all styling
 */

import React from 'react'
import PropTypes from 'prop-types'
import './ModularCard.css'

export const ModularCard = ({ 
  variant = 'primary',
  padding = 'lg',
  hoverable = false,
  children,
  className = '',
  ...rest 
}) => {
  const cardClasses = [
    'modular-card',
    `modular-card--${variant}`,
    `modular-card--${padding}`,
    hoverable && 'modular-card--hoverable',
    className
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cardClasses}
      {...rest}
    >
      {children}
    </div>
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
  hoverable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ModularCard.displayName = 'ModularCard'

export default ModularCard