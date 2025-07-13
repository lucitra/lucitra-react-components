import React from 'react'
import PropTypes from 'prop-types'
import { UnstyledButton, Text } from '@mantine/core'
import { DESIGN_TOKENS } from '../../tokens'

/**
 * BaseButton Component
 * 
 * A foundational button component that provides consistent styling and behavior
 * across the design system. Extracted from RegionSwitcher and LanguageSwitcher.
 * 
 * @component
 * @example
 * // Icon-only button
 * <BaseButton 
 *   icon={<IconGlobe size={20} />}
 *   ariaLabel="Open menu"
 *   onClick={handleClick}
 * />
 * 
 * @example  
 * // Button with text
 * <BaseButton
 *   icon={<IconGlobe size={16} />}
 *   text="Select Region"
 *   displayMode="text"
 *   onClick={handleClick}
 * />
 */
const BaseButton = ({
  // Content
  icon,
  text,
  
  // Display options
  displayMode = 'icon',
  borderRadius = DESIGN_TOKENS.borderRadius.none,
  size = 'default',
  
  // State
  disabled = false,
  active = false,
  
  // Events
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  
  // Accessibility
  ariaLabel,
  ariaExpanded,
  ariaHaspopup,
  
  // Styling
  style = {},
  className = '',
  
  // HTML props
  ...htmlProps
}) => {
  // Size variants
  const sizeConfig = {
    small: {
      icon: { width: 32, height: 32 },
      text: { padding: '6px 10px' },
      iconSize: 16,
    },
    default: {
      icon: { 
        width: DESIGN_TOKENS.spacing.button.size.width, 
        height: DESIGN_TOKENS.spacing.button.size.height 
      },
      text: { 
        padding: `${DESIGN_TOKENS.spacing.button.padding.vertical}px ${DESIGN_TOKENS.spacing.button.padding.horizontal}px` 
      },
      iconSize: displayMode === 'icon' 
        ? DESIGN_TOKENS.spacing.button.iconSize.icon 
        : DESIGN_TOKENS.spacing.button.iconSize.text,
    },
    large: {
      icon: { width: 56, height: 56 },
      text: { padding: '10px 16px' },
      iconSize: 24,
    },
  }

  const currentSize = sizeConfig[size]

  // Base button styles
  const buttonStyles = {
    // Layout
    ...(displayMode === 'icon' ? {
      width: currentSize.icon.width,
      height: currentSize.icon.height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    } : {
      display: 'flex',
      alignItems: 'center',
      gap: `${DESIGN_TOKENS.spacing.button.gap}px`,
      ...currentSize.text,
    }),
    
    // Visual styling
    cursor: disabled ? DESIGN_TOKENS.states.disabled.cursor : 'pointer',
    opacity: disabled ? DESIGN_TOKENS.states.disabled.opacity : 1,
    border: '2px solid transparent', // Prevents layout shift on hover/focus
    backgroundColor: active 
      ? DESIGN_TOKENS.colors.background.active 
      : DESIGN_TOKENS.colors.background.transparent,
    borderRadius: `${borderRadius}px`,
    
    // Transitions
    transition: DESIGN_TOKENS.transitions.button,
    outline: 'none',
    
    // Custom styles override
    ...style,
  }

  // Default event handlers
  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = DESIGN_TOKENS.colors.background.hover
    }
    onMouseEnter?.(e)
  }

  const handleMouseLeave = (e) => {
    if (!active) {
      e.currentTarget.style.backgroundColor = DESIGN_TOKENS.colors.background.transparent
    }
    onMouseLeave?.(e)
  }

  const handleFocus = (e) => {
    if (!disabled) {
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
    if (!disabled) {
      onClick?.(e)
    }
  }

  // Clone icon with proper size
  const iconElement = icon && React.cloneElement(icon, {
    size: currentSize.iconSize,
    style: { 
      color: DESIGN_TOKENS.colors.text.primary,
      ...icon.props.style 
    }
  })

  return (
    <UnstyledButton
      className={className}
      style={buttonStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      {...htmlProps}
    >
      {iconElement}
      {displayMode === 'text' && text && (
        <Text 
          size="sm" 
          c={DESIGN_TOKENS.colors.text.primary} 
          style={{ lineHeight: 1 }}
        >
          {text}
        </Text>
      )}
    </UnstyledButton>
  )
}

BaseButton.propTypes = {
  /** Icon element to display */
  icon: PropTypes.element,
  /** Text to display (only shown in 'text' mode) */
  text: PropTypes.string,
  /** Display mode: 'icon' (icon only) or 'text' (icon + text) */
  displayMode: PropTypes.oneOf(['icon', 'text']),
  /** Border radius in pixels */
  borderRadius: PropTypes.number,
  /** Button size variant */
  size: PropTypes.oneOf(['small', 'default', 'large']),
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Whether the button is in active state */
  active: PropTypes.bool,
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
  /** ARIA label for accessibility */
  ariaLabel: PropTypes.string,
  /** ARIA expanded state */
  ariaExpanded: PropTypes.bool,
  /** ARIA haspopup attribute */
  ariaHaspopup: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Custom styles */
  style: PropTypes.object,
  /** Custom CSS class */
  className: PropTypes.string,
}

export default BaseButton