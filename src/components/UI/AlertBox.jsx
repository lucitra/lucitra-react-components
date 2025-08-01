/**
 * AlertBox Component
 * 
 * Consistent alert/notification styling
 * Now uses design tokens for all styling
 */

import React from 'react'
import PropTypes from 'prop-types'
import './AlertBox.css'

export const AlertBox = ({ 
  variant = 'info',
  size = 'md',
  icon = null,
  title = null,
  closable = false,
  onClose = null,
  children,
  className = '',
  ...rest 
}) => {
  const alertClasses = [
    'alert-box',
    `alert-box--${variant}`,
    `alert-box--${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div
      className={alertClasses}
      {...rest}
    >
      {/* Header with icon, title, and close button */}
      {(icon || title || closable) && (
        <div className="alert-box__header">
          <div className="alert-box__header-content">
            {icon && (
              <span className="alert-box__icon">
                {icon}
              </span>
            )}
            {title && (
              <span className="alert-box__title">
                {title}
              </span>
            )}
          </div>
          
          {closable && (
            <button
              onClick={onClose}
              className="alert-box__close"
              aria-label="Close alert"
            >
              ×
            </button>
          )}
        </div>
      )}
      
      {/* Content */}
      {children && (
        <div className="alert-box__content">
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