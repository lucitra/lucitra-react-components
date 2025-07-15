/**
 * ProgressBar Component
 * 
 * Consistent progress display with minimal color usage
 * Replaces colored Progress components with monochrome design
 */

import React from 'react'
import PropTypes from 'prop-types'

export const ProgressBar = ({ 
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label = null,
  animate = false,
  striped = false,
  className,
  ...rest 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return { height: '4px' }
      
      case 'sm':
        return { height: '8px' }
      
      case 'md':
        return { height: '16px' }
      
      case 'lg':
        return { height: '24px' }
      
      case 'xl':
        return { height: '32px' }
      
      default:
        return { height: '16px' }
    }
  }

  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return 'black'
      
      case 'warning':
        return '#666'
      
      case 'error':
        return '#333'
      
      case 'info':
        return 'black'
      
      case 'default':
      default:
        return 'black'
    }
  }

  const sizeStyles = getSizeStyles()
  const fillColor = getVariantColor()

  return (
    <div style={{ width: '100%' }}>
      {/* Label */}
      {(showLabel || label) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
          fontSize: '12px',
          color: 'black'
        }}>
          {label && <span>{label}</span>}
          {showLabel && (
            <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      
      {/* Progress Container */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#f1f3f4',
          border: '1px solid gray',
          position: 'relative',
          overflow: 'hidden',
          ...sizeStyles,
          ...rest.style
        }}
        className={className}
        {...rest}
      >
        {/* Progress Fill */}
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: fillColor,
            transition: animate ? 'width 0.3s ease' : 'none',
            position: 'relative'
          }}
        >
          {/* Striped Pattern */}
          {striped && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 8px)',
                animation: animate ? 'progress-stripes 1s linear infinite' : 'none'
              }}
            />
          )}
        </div>
      </div>
      
      {/* Add CSS animation for striped progress */}
      <style jsx>{`
        @keyframes progress-stripes {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 0;
          }
        }
      `}</style>
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