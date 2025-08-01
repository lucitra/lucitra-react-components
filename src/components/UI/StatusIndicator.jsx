/**
 * StatusIndicator Component
 * 
 * Consistent status display using design tokens
 * Replaces colored badges with standardized indicators
 */

import React from 'react'
import PropTypes from 'prop-types'
import './StatusIndicator.css'

export const StatusIndicator = ({ 
  status = 'neutral',
  size = 'md',
  showDot = true,
  children,
  className = '',
  ...rest 
}) => {
  const baseClass = 'status-indicator'
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    `${baseClass}--${status}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      {...rest}
    >
      {showDot && (
        <div className={`${baseClass}__dot`} />
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