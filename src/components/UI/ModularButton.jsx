/**
 * ModularButton Component
 * 
 * Consistent button styling across Privacy dashboard
 * Now uses design tokens for all styling
 */

import React from 'react'
import PropTypes from 'prop-types'
import './ModularButton.css'

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
  className = '',
  ...rest 
}) => {
  const buttonClasses = [
    'modular-button',
    `modular-button--${variant}`,
    `modular-button--${size}`,
    active && 'modular-button--active',
    fullWidth && 'modular-button--full-width',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...rest}
    >
      {leftIcon && <span className="modular-button__icon">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="modular-button__icon">{rightIcon}</span>}
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