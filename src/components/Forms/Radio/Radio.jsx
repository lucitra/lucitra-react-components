import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import './Radio.css'

/**
 * Radio Component
 * 
 * A flexible radio button component for single selection within a group.
 * Supports controlled/uncontrolled states and consistent styling.
 * 
 * @component
 * @example
 * <Radio
 *   name="payment"
 *   value="card"
 *   label="Credit Card"
 *   checked={selectedPayment === 'card'}
 *   onChange={handlePaymentChange}
 * />
 */
const Radio = forwardRef(({
  label,
  checked,
  defaultChecked,
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
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error)
  
  const sizeClasses = {
    small: 'radio--small',
    medium: 'radio--medium',
    large: 'radio--large'
  }
  
  const radioClasses = [
    'radio-input',
    sizeClasses[size],
    hasError && 'radio-input--error',
    disabled && 'radio-input--disabled'
  ].filter(Boolean).join(' ')
  
  const containerClasses = [
    'radio-container',
    `radio-container--${labelPlacement}`,
    disabled && 'radio-container--disabled',
    className
  ].filter(Boolean).join(' ')

  const radioElement = (
    <div className="radio-wrapper">
      <input
        ref={ref}
        id={radioId}
        name={name}
        type="radio"
        className={radioClasses}
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
            error && `${radioId}-error`,
            helperText && `${radioId}-helper`
          ].filter(Boolean).join(' ') || undefined
        }
        {...props}
      />
      
      <span className="radio-checkmark" aria-hidden="true">
        <span className="radio-dot"></span>
      </span>
    </div>
  )

  const labelElement = label && (
    <label 
      htmlFor={radioId}
      className={`radio-label ${required ? 'radio-label--required' : ''}`}
    >
      {label}
      {required && <span className="radio-label-required" aria-hidden="true">*</span>}
    </label>
  )

  return (
    <div className={containerClasses}>
      {labelPlacement === 'start' && labelElement}
      {radioElement}
      {labelPlacement === 'end' && labelElement}
      
      {error && (
        <div id={`${radioId}-error`} className="radio-error" role="alert">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div id={`${radioId}-helper`} className="radio-helper">
          {helperText}
        </div>
      )}
    </div>
  )
})

Radio.displayName = 'Radio'

Radio.propTypes = {
  /** Label text for the radio button */
  label: PropTypes.string,
  /** Controlled checked state */
  checked: PropTypes.bool,
  /** Default checked state for uncontrolled radio */
  defaultChecked: PropTypes.bool,
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
  /** Radio ID */
  id: PropTypes.string,
  /** Radio name (for grouping) */
  name: PropTypes.string.isRequired,
  /** Radio value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Size variant */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Label placement */
  labelPlacement: PropTypes.oneOf(['start', 'end'])
}

export default Radio