/**
 * CodeBlock Component
 * 
 * Consistent code/engineering data display
 * Replaces inline Code components with standardized styling
 */

import React from 'react'
import PropTypes from 'prop-types'

export const CodeBlock = ({ 
  variant = 'inline',
  language = 'text',
  showCopy = false,
  children,
  className,
  ...rest 
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: 'black',
      backgroundColor: '#f8f9fa',
      border: '1px solid gray',
      borderRadius: 0
    }

    switch (variant) {
      case 'inline':
        return {
          ...baseStyles,
          display: 'inline',
          padding: '2px 6px'
        }
      
      case 'block':
        return {
          ...baseStyles,
          display: 'block',
          padding: '12px',
          whiteSpace: 'pre-wrap',
          overflow: 'auto'
        }
      
      case 'metric':
        return {
          ...baseStyles,
          display: 'inline-block',
          padding: '4px 8px',
          backgroundColor: '#f8f9fa',
          fontWeight: 600
        }
      
      case 'data':
        return {
          ...baseStyles,
          display: 'block',
          padding: '8px',
          backgroundColor: '#f8f9fa',
          whiteSpace: 'pre-wrap',
          maxHeight: '200px',
          overflow: 'auto'
        }
      
      default:
        return baseStyles
    }
  }

  const copyToClipboard = () => {
    if (navigator.clipboard && typeof children === 'string') {
      navigator.clipboard.writeText(children)
    }
  }

  const variantStyles = getVariantStyles()

  if (variant === 'block' || variant === 'data') {
    return (
      <div style={{ position: 'relative' }}>
        <pre
          style={{
            ...variantStyles,
            margin: 0,
            ...rest.style
          }}
          className={className}
          {...rest}
        >
          {children}
        </pre>
        {showCopy && (
          <button
            onClick={copyToClipboard}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              backgroundColor: 'white',
              border: '1px solid gray',
              color: 'black',
              fontSize: '10px',
              padding: '4px 8px',
              cursor: 'pointer'
            }}
          >
            COPY
          </button>
        )}
      </div>
    )
  }

  return (
    <code
      style={{
        ...variantStyles,
        ...rest.style
      }}
      className={className}
      {...rest}
    >
      {children}
    </code>
  )
}

CodeBlock.propTypes = {
  variant: PropTypes.oneOf(['inline', 'block', 'metric', 'data']),
  language: PropTypes.string,
  showCopy: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock