import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '@mantine/core'
import { DESIGN_TOKENS } from '../../../tokens'

/**
 * Input Component
 * 
 * A text input component following component.gallery patterns.
 * Supports various input types, sizes, and states.
 * 
 * Based on common patterns from major design systems.
 * 
 * @component
 * @example
 * <Input 
 *   label="Email" 
 *   placeholder="Enter your email"
 *   type="email"
 * />
 */
const Input = ({
  // Content
  label,
  placeholder,
  value,
  defaultValue,
  
  // Types and validation
  type = 'text',
  required = false,
  error,
  
  // Sizing
  size = 'md',
  fullWidth = false,
  
  // States
  disabled = false,
  readOnly = false,
  
  // Styling
  borderRadius,
  
  // Events
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  
  // HTML attributes
  id,
  name,
  autoComplete,
  autoFocus,
  maxLength,
  minLength,
  pattern,
  
  // Custom styling
  style = {},
  className = '',
  
  ...htmlProps
}) => {
  // Size configurations
  const sizes = {
    sm: {
      height: 32,
      fontSize: DESIGN_TOKENS.typography.sizes.sm,
      padding: '0 8px',
    },
    md: {
      height: 40,
      fontSize: DESIGN_TOKENS.typography.sizes.md,
      padding: '0 12px',
    },
    lg: {
      height: 48,
      fontSize: DESIGN_TOKENS.typography.sizes.lg,
      padding: '0 16px',
    },
  }

  const currentSize = sizes[size]
  
  // Calculate border radius
  const calculatedBorderRadius = borderRadius !== undefined 
    ? borderRadius 
    : DESIGN_TOKENS.borderRadius.sm

  return (
    <TextInput
      // Content
      label={label}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      
      // Types and validation
      type={type}
      required={required}
      error={error}
      
      // States
      disabled={disabled}
      readOnly={readOnly}
      
      // Events
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      
      // HTML attributes
      id={id}
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      
      // Styling
      className={className}
      style={{
        width: fullWidth ? '100%' : 'auto',
        ...style,
      }}
      
      // Mantine-specific styling
      styles={{
        input: {
          height: currentSize.height,
          fontSize: currentSize.fontSize,
          padding: currentSize.padding,
          borderRadius: `${calculatedBorderRadius}px`,
          border: `2px solid ${error ? '#dc2626' : '#e5e7eb'}`,
          transition: DESIGN_TOKENS.transitions.default,
          
          '&:focus': {
            borderColor: DESIGN_TOKENS.colors.brand.primary,
            outline: 'none',
          },
          
          '&:disabled': {
            opacity: DESIGN_TOKENS.states.disabled.opacity,
            cursor: DESIGN_TOKENS.states.disabled.cursor,
          },
        },
        
        label: {
          fontSize: DESIGN_TOKENS.typography.sizes.sm,
          fontWeight: DESIGN_TOKENS.typography.weights.medium,
          color: DESIGN_TOKENS.colors.text.primary,
          marginBottom: '4px',
        },
        
        error: {
          fontSize: DESIGN_TOKENS.typography.sizes.sm,
          color: '#dc2626',
          marginTop: '4px',
        },
      }}
      
      {...htmlProps}
    />
  )
}

Input.propTypes = {
  /** Input label */
  label: PropTypes.string,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Controlled value */
  value: PropTypes.string,
  /** Default value for uncontrolled input */
  defaultValue: PropTypes.string,
  /** Input type */
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search']),
  /** Required field */
  required: PropTypes.bool,
  /** Error message */
  error: PropTypes.string,
  /** Input size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Full width input */
  fullWidth: PropTypes.bool,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Read-only state */
  readOnly: PropTypes.bool,
  /** Custom border radius */
  borderRadius: PropTypes.number,
  /** Change handler */
  onChange: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Key down handler */
  onKeyDown: PropTypes.func,
  /** Input ID */
  id: PropTypes.string,
  /** Input name */
  name: PropTypes.string,
  /** Autocomplete attribute */
  autoComplete: PropTypes.string,
  /** Auto focus */
  autoFocus: PropTypes.bool,
  /** Maximum length */
  maxLength: PropTypes.number,
  /** Minimum length */
  minLength: PropTypes.number,
  /** Pattern for validation */
  pattern: PropTypes.string,
  /** Custom styles */
  style: PropTypes.object,
  /** Custom CSS class */
  className: PropTypes.string,
}

export default Input