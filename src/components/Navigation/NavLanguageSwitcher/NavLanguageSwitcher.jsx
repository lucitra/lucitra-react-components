import React from 'react'
import PropTypes from 'prop-types'
import NavButton from '../NavButton/NavButton.jsx'
import { LanguageSwitcher } from '../LanguageSwitcher'

/**
 * NavLanguageSwitcher Component
 * 
 * A language switcher specifically designed for navigation bars.
 * Uses the standardized NavButton wrapper for consistent styling.
 * 
 * @component
 * @example
 * <NavLanguageSwitcher 
 *   languages={languages}
 *   i18nInstance={i18n}
 * />
 */
const NavLanguageSwitcher = ({
  languages,
  useI18next = true,
  i18nInstance,
  updateDocumentDirection = true,
  ariaLabel = "Switch language",
  className = '',
  ...props
}) => {
  return (
    <NavButton 
      ariaLabel={ariaLabel}
      className={className}
    >
      <LanguageSwitcher
        languages={languages}
        showCurrentSelection={false}
        useI18next={useI18next}
        i18nInstance={i18nInstance}
        updateDocumentDirection={updateDocumentDirection}
        displayMode="icon"
        buttonStyle={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        {...props}
      />
    </NavButton>
  )
}

NavLanguageSwitcher.propTypes = {
  /** Array of supported languages */
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dir: PropTypes.oneOf(['ltr', 'rtl'])
    })
  ).isRequired,
  /** Whether to use i18next for language switching */
  useI18next: PropTypes.bool,
  /** i18next instance */
  i18nInstance: PropTypes.object,
  /** Whether to update document direction when language changes */
  updateDocumentDirection: PropTypes.bool,
  /** Accessible label for the button */
  ariaLabel: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default NavLanguageSwitcher