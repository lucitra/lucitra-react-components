import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import './Select.css'

/**
 * Select Component
 * 
 * A flexible select dropdown component with consistent styling and accessibility.
 * Supports single selection with options array or children elements.
 * 
 * @component
 * @example
 * <Select
 *   label="Country"
 *   placeholder="Choose a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' }
 *   ]}
 *   required
 * />
 */
const Select = forwardRef(({
  label,
  placeholder = 'Select an option',
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  options = [],
  children,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  id,
  name,
  size = 'medium',
  variant = 'outlined',
  fullWidth = false,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error)
  
  const sizeClasses = {
    small: 'select--small',
    medium: 'select--medium',
    large: 'select--large'
  }
  
  const variantClasses = {
    outlined: 'select--outlined',
    filled: 'select--filled',
    standard: 'select--standard'
  }
  
  const selectClasses = [
    'select',
    sizeClasses[size],
    variantClasses[variant],
    hasError && 'select--error',
    disabled && 'select--disabled',
    fullWidth && 'select--full-width',
    className
  ].filter(Boolean).join(' ')
  
  const containerClasses = [
    'select-container',
    fullWidth && 'select-container--full-width'
  ].filter(Boolean).join(' ')

  // Use options prop if provided, otherwise use children
  const selectOptions = options.length > 0 ? options : null

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={selectId}
          className={`select-label ${required ? 'select-label--required' : ''}`}
        >
          {label}
          {required && <span className="select-label-required" aria-hidden="true">*</span>}
        </label>
      )}
      
      <div className="select-wrapper">
        <select
          ref={ref}
          id={selectId}
          name={name}
          className={selectClasses}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            [
              error && `${selectId}-error`,
              helperText && `${selectId}-helper`
            ].filter(Boolean).join(' ') || undefined
          }
          {...props}
        >
          {placeholder && !value && !defaultValue && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {selectOptions ? (
            selectOptions.map((option, index) => (
              <option 
                key={option.value || index} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))
          ) : (
            children
          )}
        </select>
        
        <span className="select-arrow" aria-hidden="true">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path 
              d="M1 1L6 6L11 1" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      
      {error && (
        <div id={`${selectId}-error`} className="select-error" role="alert">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div id={`${selectId}-helper`} className="select-helper">
          {helperText}
        </div>
      )}
    </div>
  )
})

Select.displayName = 'Select'

Select.propTypes = {
  /** Label text for the select */
  label: PropTypes.string,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Controlled value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Default value for uncontrolled select */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Change handler */
  onChange: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Options array */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  })),
  /** Option elements as children */
  children: PropTypes.node,
  /** Error message */
  error: PropTypes.string,
  /** Helper text */
  helperText: PropTypes.string,
  /** Required field */
  required: PropTypes.bool,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Select ID */
  id: PropTypes.string,
  /** Select name */
  name: PropTypes.string,
  /** Size variant */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Visual variant */
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  /** Full width */
  fullWidth: PropTypes.bool
}

export default Select