/**
 * ModularBadge Component
 * 
 * Consistent badge/label styling for Privacy dashboard
 * Now uses design tokens for all styling
 */

import React from 'react'
import PropTypes from 'prop-types'
import './ModularBadge.css'

export const ModularBadge = ({ 
  variant = 'default',
  size = 'md',
  uppercase = true,
  children,
  className = '',
  ...rest 
}) => {
  const badgeClasses = [
    'modular-badge',
    `modular-badge--${variant}`,
    `modular-badge--${size}`,
    uppercase && 'modular-badge--uppercase',
    className
  ].filter(Boolean).join(' ')

  return (
    <span
      className={badgeClasses}
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