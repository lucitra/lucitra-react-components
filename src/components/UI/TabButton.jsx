/**
 * TabButton Component
 * 
 * Consistent tab navigation styling
 * Now uses design tokens for all styling
 */

import React from 'react'
import PropTypes from 'prop-types'
import './TabButton.css'

export const TabButton = ({ 
  active = false,
  disabled = false,
  icon = null,
  children,
  onClick,
  className = '',
  ...rest 
}) => {
  const tabClasses = [
    'tab-button',
    active && 'tab-button--active',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={tabClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && (
        <span className="tab-button__icon">
          {icon}
        </span>
      )}
      {children}
    </button>
  )
}

TabButton.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}

TabButton.displayName = 'TabButton'

export default TabButton