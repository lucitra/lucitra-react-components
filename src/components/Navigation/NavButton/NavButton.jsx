import React from 'react'
import PropTypes from 'prop-types'
import './NavButton.css'

/**
 * NavButton Component
 * 
 * A standardized navigation button that provides consistent styling,
 * hover effects, and focus states for navigation elements.
 * Designed to fit perfectly in a 48px x 42px grid cell.
 * 
 * @component
 * @example
 * <NavButton 
 *   onClick={handleClick}
 *   ariaLabel="Language switcher"
 * >
 *   <LanguageIcon />
 * </NavButton>
 */
const NavButton = ({
  children,
  onClick,
  onKeyDown,
  ariaLabel,
  className = '',
  disabled = false,
  tabIndex = 0,
  ...htmlProps
}) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.(event)
    }
    onKeyDown?.(event)
  }

  return (
    <div
      className={`nav-button ${disabled ? 'nav-button--disabled' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
      tabIndex={disabled ? -1 : tabIndex}
      role="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...htmlProps}
    >
      {children}
    </div>
  )
}

NavButton.propTypes = {
  /** Content to render inside the button */
  children: PropTypes.node.isRequired,
  /** Click handler */
  onClick: PropTypes.func,
  /** Key down handler */
  onKeyDown: PropTypes.func,
  /** Accessible label for screen readers */
  ariaLabel: PropTypes.string.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Tab index for keyboard navigation */
  tabIndex: PropTypes.number,
}

export default NavButton