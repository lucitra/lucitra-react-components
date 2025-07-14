import React from 'react'
import PropTypes from 'prop-types'
import { UnstyledButton, Text, Loader } from '@mantine/core'
import { DESIGN_TOKENS } from '../../../tokens'

/**
 * Button Component
 * 
 * The primary action component following component.gallery patterns.
 * Supports multiple variants, sizes, and states for maximum flexibility.
 * 
 * Based on common patterns from:
 * - Material Design
 * - Ant Design
 * - Chakra UI
 * - IBM Carbon
 * 
 * @component
 * @example
 * // Primary button
 * <Button variant="primary" onClick={handleSubmit}>
 *   Submit Form
 * </Button>
 * 
 * @example
 * // Button with icon
 * <Button variant="secondary" icon={<IconPlus />} iconPosition="left">
 *   Add Item
 * </Button>
 * 
 * @example
 * // Loading state
 * <Button variant="primary" loading>
 *   Processing...
 * </Button>
 */
const Button = ({
  // Content
  children,
  icon,
  iconPosition = 'left',
  
  // Variants
  variant = 'primary',
  size = 'md',
  
  // States
  disabled = false,
  loading = false,
  active = false,
  
  // Styling
  fullWidth = false,
  borderRadius,
  
  // Events
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  
  // HTML attributes
  type = 'button',
  ariaLabel,
  ariaPressed,
  ariaExpanded,
  ariaHaspopup,
  
  // Custom styling
  style = {},
  className = '',
  
  ...htmlProps
}) => {
  // Variant configurations
  const variants = {
    primary: {
      backgroundColor: DESIGN_TOKENS.colors.brand.primary,
      color: DESIGN_TOKENS.colors.text.inverse,
      border: `2px solid ${DESIGN_TOKENS.colors.brand.primary}`,
      hover: {
        backgroundColor: '#0353e9', // Darker blue
        borderColor: '#0353e9',
      },
      active: {
        backgroundColor: '#0246d1',
        borderColor: '#0246d1',
      },
    },
    secondary: {
      backgroundColor: DESIGN_TOKENS.colors.background.transparent,
      color: DESIGN_TOKENS.colors.brand.primary,
      border: `2px solid ${DESIGN_TOKENS.colors.brand.primary}`,
      hover: {
        backgroundColor: DESIGN_TOKENS.colors.background.hover,
        borderColor: DESIGN_TOKENS.colors.brand.primary,
      },
      active: {
        backgroundColor: DESIGN_TOKENS.colors.background.active,
        borderColor: '#0353e9',
      },
    },
    ghost: {
      backgroundColor: DESIGN_TOKENS.colors.background.transparent,
      color: DESIGN_TOKENS.colors.text.primary,
      border: '2px solid transparent',
      hover: {
        backgroundColor: DESIGN_TOKENS.colors.background.hover,
        borderColor: 'transparent',
      },
      active: {
        backgroundColor: DESIGN_TOKENS.colors.background.active,
        borderColor: 'transparent',
      },
    },
    danger: {
      backgroundColor: '#dc2626', // Red
      color: DESIGN_TOKENS.colors.text.inverse,
      border: '2px solid #dc2626',
      hover: {
        backgroundColor: '#b91c1c',
        borderColor: '#b91c1c',
      },
      active: {
        backgroundColor: '#991b1b',
        borderColor: '#991b1b',
      },
    },
  }

  // Size configurations
  const sizes = {
    sm: {
      height: 32,
      padding: '0 12px',
      fontSize: DESIGN_TOKENS.typography.sizes.sm,
      iconSize: 16,
      gap: 6,
    },
    md: {
      height: 40,
      padding: '0 16px',
      fontSize: DESIGN_TOKENS.typography.sizes.md,
      iconSize: 18,
      gap: 8,
    },
    lg: {
      height: 48,
      padding: '0 20px',
      fontSize: DESIGN_TOKENS.typography.sizes.lg,
      iconSize: 20,
      gap: 10,
    },
  }

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  // Calculate border radius
  const calculatedBorderRadius = borderRadius !== undefined 
    ? borderRadius 
    : DESIGN_TOKENS.borderRadius.sm

  // Base button styles
  const buttonStyles = {
    // Layout
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${currentSize.gap}px`,
    height: currentSize.height,
    padding: currentSize.padding,
    width: fullWidth ? '100%' : 'auto',
    
    // Visual styling
    backgroundColor: active ? currentVariant.active.backgroundColor : currentVariant.backgroundColor,
    color: currentVariant.color,
    border: active ? currentVariant.active.borderColor : currentVariant.border,
    borderRadius: `${calculatedBorderRadius}px`,
    fontSize: currentSize.fontSize,
    fontWeight: DESIGN_TOKENS.typography.weights.medium,
    
    // States
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? DESIGN_TOKENS.states.disabled.opacity : 1,
    
    // Transitions
    transition: DESIGN_TOKENS.transitions.button,
    outline: 'none',
    
    // Custom styles override
    ...style,
  }

  // Event handlers
  const handleMouseEnter = (e) => {
    if (!disabled && !loading && !active) {
      e.currentTarget.style.backgroundColor = currentVariant.hover.backgroundColor
      e.currentTarget.style.borderColor = currentVariant.hover.borderColor
    }
    onMouseEnter?.(e)
  }

  const handleMouseLeave = (e) => {
    if (!disabled && !loading && !active) {
      e.currentTarget.style.backgroundColor = currentVariant.backgroundColor
      e.currentTarget.style.borderColor = currentVariant.border.replace('2px solid ', '')
    }
    onMouseLeave?.(e)
  }

  const handleFocus = (e) => {
    if (!disabled && !loading) {
      e.currentTarget.style.outline = `2px solid ${DESIGN_TOKENS.colors.border.focus}`
      e.currentTarget.style.outlineOffset = '2px'
    }
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    e.currentTarget.style.outline = 'none'
    e.currentTarget.style.outlineOffset = '0'
    onBlur?.(e)
  }

  const handleClick = (e) => {
    if (!disabled && !loading) {
      onClick?.(e)
    }
  }

  // Icon with proper sizing
  const iconElement = icon && React.cloneElement(icon, {
    size: currentSize.iconSize,
    style: { 
      flexShrink: 0,
      ...icon.props.style 
    }
  })

  // Loading spinner
  const loadingElement = loading && (
    <Loader 
      size={currentSize.iconSize} 
      color={currentVariant.color}
    />
  )

  return (
    <UnstyledButton
      className={className}
      style={buttonStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      {...htmlProps}
    >
      {/* Left icon or loading */}
      {loading ? loadingElement : (iconPosition === 'left' && iconElement)}
      
      {/* Button text */}
      {children && (
        <Text 
          component="span"
          style={{ 
            lineHeight: 1,
            color: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit'
          }}
        >
          {children}
        </Text>
      )}
      
      {/* Right icon (only if not loading) */}
      {!loading && iconPosition === 'right' && iconElement}
    </UnstyledButton>
  )
}

Button.propTypes = {
  /** Button content */
  children: PropTypes.node,
  /** Icon element */
  icon: PropTypes.element,
  /** Icon position relative to text */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /** Visual variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  /** Button size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Loading state */
  loading: PropTypes.bool,
  /** Active/pressed state */
  active: PropTypes.bool,
  /** Full width button */
  fullWidth: PropTypes.bool,
  /** Custom border radius */
  borderRadius: PropTypes.number,
  /** Click handler */
  onClick: PropTypes.func,
  /** Mouse enter handler */
  onMouseEnter: PropTypes.func,
  /** Mouse leave handler */
  onMouseLeave: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Button type attribute */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** ARIA label */
  ariaLabel: PropTypes.string,
  /** ARIA pressed state */
  ariaPressed: PropTypes.bool,
  /** ARIA expanded state */
  ariaExpanded: PropTypes.bool,
  /** ARIA haspopup attribute */
  ariaHaspopup: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Custom styles */
  style: PropTypes.object,
  /** Custom CSS class */
  className: PropTypes.string,
}

export default Button