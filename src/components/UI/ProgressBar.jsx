/**
 * ProgressBar Component
 * 
 * Consistent progress display with minimal color usage
 * Now uses design tokens for all styling
 */

import React from 'react'
import PropTypes from 'prop-types'
import './ProgressBar.css'

export const ProgressBar = ({ 
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label = null,
  animate = false,
  striped = false,
  className = '',
  ...rest 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const containerClasses = [
    'progress-bar__container',
    `progress-bar__container--${size}`
  ].join(' ')

  const fillClasses = [
    'progress-bar__fill',
    `progress-bar__fill--${variant}`,
    !animate && 'progress-bar__fill--no-animation'
  ].filter(Boolean).join(' ')

  const stripesClasses = [
    'progress-bar__stripes',
    animate && 'progress-bar__stripes--animated'
  ].filter(Boolean).join(' ')

  return (
    <div className={`progress-bar ${className}`} {...rest}>
      {/* Label */}
      {(showLabel || label) && (
        <div className="progress-bar__label">
          {label && <span className="progress-bar__label-text">{label}</span>}
          {showLabel && (
            <span className="progress-bar__label-value">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      
      {/* Progress Container */}
      <div className={containerClasses}>
        {/* Progress Fill */}
        <div
          className={fillClasses}
          style={{ width: `${percentage}%` }}
        >
          {/* Striped Pattern */}
          {striped && (
            <div className={stripesClasses} />
          )}
        </div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']),
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  animate: PropTypes.bool,
  striped: PropTypes.bool,
  className: PropTypes.string
}

ProgressBar.displayName = 'ProgressBar'

export default ProgressBar