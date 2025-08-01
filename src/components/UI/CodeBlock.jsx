/**
 * CodeBlock Component
 * 
 * Consistent code/engineering data display using design tokens
 * Replaces inline Code components with standardized styling
 */

import React from 'react'
import PropTypes from 'prop-types'
import './CodeBlock.css'

export const CodeBlock = ({ 
  variant = 'inline',
  showCopy = false,
  children,
  className = '',
  ...rest 
}) => {
  const copyToClipboard = () => {
    if (navigator.clipboard && typeof children === 'string') {
      navigator.clipboard.writeText(children)
    }
  }

  const baseClass = 'code-block'
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    className
  ].filter(Boolean).join(' ')

  if (variant === 'block' || variant === 'data') {
    return (
      <div className={`${baseClass}__container`}>
        <pre
          className={classes}
          {...rest}
        >
          {children}
        </pre>
        {showCopy && (
          <button
            onClick={copyToClipboard}
            className={`${baseClass}__copy-button`}
            type="button"
          >
            COPY
          </button>
        )}
      </div>
    )
  }

  return (
    <code
      className={classes}
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