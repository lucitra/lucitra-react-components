import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import './Input.css'

/**
 * Input Component
 * 
 * A flexible input component that supports various types, validation states,
 * and accessibility features. Designed to be consistent with the design system.
 * 
 * @component
 * @example
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 *   error="Please enter a valid email"
 * />
 */
const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  className = '',
  id,
  name,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  size = 'medium',
  variant = 'outlined',
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error)
  
  const sizeClasses = {
    small: 'input--small',
    medium: 'input--medium',
    large: 'input--large'
  }
  
  const variantClasses = {
    outlined: 'input--outlined',
    filled: 'input--filled',
    standard: 'input--standard'
  }
  
  const inputClasses = [
    'input',
    sizeClasses[size],
    variantClasses[variant],
    hasError && 'input--error',
    disabled && 'input--disabled',
    readOnly && 'input--readonly',
    fullWidth && 'input--full-width',
    (startIcon || endIcon) && 'input--with-icons',
    className
  ].filter(Boolean).join(' ')
  
  const containerClasses = [
    'input-container',
    fullWidth && 'input-container--full-width'
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`input-label ${required ? 'input-label--required' : ''}`}
        >
          {label}
          {required && <span className="input-label-required" aria-hidden="true">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {startIcon && (
          <span className="input-icon input-icon--start" aria-hidden="true">
            {startIcon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          aria-invalid={hasError}
          aria-describedby={
            [
              error && `${inputId}-error`,
              helperText && `${inputId}-helper`
            ].filter(Boolean).join(' ') || undefined
          }
          {...props}
        />
        
        {endIcon && (
          <span className="input-icon input-icon--end" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </div>
      
      {error && (
        <div id={`${inputId}-error`} className="input-error" role="alert">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div id={`${inputId}-helper`} className="input-helper">
          {helperText}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  /** Label text for the input */
  label: PropTypes.string,
  /** Input type */
  type: PropTypes.oneOf([
    'text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 
    'datetime-local', 'month', 'time', 'week', 'color'
  ]),
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Controlled value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Default value for uncontrolled input */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Change handler */
  onChange: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Error message */
  error: PropTypes.string,
  /** Helper text */
  helperText: PropTypes.string,
  /** Required field */
  required: PropTypes.bool,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Read-only state */
  readOnly: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Input ID */
  id: PropTypes.string,
  /** Input name */
  name: PropTypes.string,
  /** Autocomplete attribute */
  autoComplete: PropTypes.string,
  /** Maximum length */
  maxLength: PropTypes.number,
  /** Minimum length */
  minLength: PropTypes.number,
  /** Pattern for validation */
  pattern: PropTypes.string,
  /** Size variant */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Visual variant */
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  /** Full width */
  fullWidth: PropTypes.bool,
  /** Start icon element */
  startIcon: PropTypes.node,
  /** End icon element */
  endIcon: PropTypes.node
}

export default Input