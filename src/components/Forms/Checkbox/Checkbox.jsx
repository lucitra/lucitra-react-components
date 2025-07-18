import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import './Checkbox.css'

/**
 * Checkbox Component
 * 
 * A flexible checkbox component with support for controlled/uncontrolled states,
 * indeterminate state, and consistent styling across the design system.
 * 
 * @component
 * @example
 * <Checkbox
 *   label="Accept terms and conditions"
 *   required
 *   error="You must accept the terms"
 * />
 */
const Checkbox = forwardRef(({
  label,
  checked,
  defaultChecked,
  indeterminate = false,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  id,
  name,
  value,
  size = 'medium',
  labelPlacement = 'end',
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error)
  
  const sizeClasses = {
    small: 'checkbox--small',
    medium: 'checkbox--medium',
    large: 'checkbox--large'
  }
  
  const checkboxClasses = [
    'checkbox-input',
    sizeClasses[size],
    hasError && 'checkbox-input--error',
    disabled && 'checkbox-input--disabled',
    indeterminate && 'checkbox-input--indeterminate'
  ].filter(Boolean).join(' ')
  
  const containerClasses = [
    'checkbox-container',
    `checkbox-container--${labelPlacement}`,
    disabled && 'checkbox-container--disabled',
    className
  ].filter(Boolean).join(' ')

  // Handle indeterminate state
  React.useEffect(() => {
    if (ref?.current) {
      ref.current.indeterminate = indeterminate
    }
  }, [indeterminate, ref])

  const checkboxElement = (
    <div className="checkbox-wrapper">
      <input
        ref={ref}
        id={checkboxId}
        name={name}
        type="checkbox"
        className={checkboxClasses}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        value={value}
        aria-invalid={hasError}
        aria-describedby={
          [
            error && `${checkboxId}-error`,
            helperText && `${checkboxId}-helper`
          ].filter(Boolean).join(' ') || undefined
        }
        {...props}
      />
      
      <span className="checkbox-checkmark" aria-hidden="true">
        {indeterminate ? (
          <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
            <rect width="12" height="2" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path 
              d="M1 5L4.5 8.5L11 1.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </div>
  )

  const labelElement = label && (
    <label 
      htmlFor={checkboxId}
      className={`checkbox-label ${required ? 'checkbox-label--required' : ''}`}
    >
      {label}
      {required && <span className="checkbox-label-required" aria-hidden="true">*</span>}
    </label>
  )

  return (
    <div className={containerClasses}>
      {labelPlacement === 'start' && labelElement}
      {checkboxElement}
      {labelPlacement === 'end' && labelElement}
      
      {error && (
        <div id={`${checkboxId}-error`} className="checkbox-error" role="alert">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div id={`${checkboxId}-helper`} className="checkbox-helper">
          {helperText}
        </div>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

Checkbox.propTypes = {
  /** Label text for the checkbox */
  label: PropTypes.string,
  /** Controlled checked state */
  checked: PropTypes.bool,
  /** Default checked state for uncontrolled checkbox */
  defaultChecked: PropTypes.bool,
  /** Indeterminate state */
  indeterminate: PropTypes.bool,
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
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Checkbox ID */
  id: PropTypes.string,
  /** Checkbox name */
  name: PropTypes.string,
  /** Checkbox value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Size variant */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Label placement */
  labelPlacement: PropTypes.oneOf(['start', 'end'])
}

export default Checkbox