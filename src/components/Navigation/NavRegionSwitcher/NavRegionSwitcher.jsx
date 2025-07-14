import React from 'react'
import PropTypes from 'prop-types'
import NavButton from '../NavButton/NavButton'
import { RegionSwitcher } from '../RegionSwitcher'

/**
 * NavRegionSwitcher Component
 * 
 * A region switcher specifically designed for navigation bars.
 * Uses the standardized NavButton wrapper for consistent styling.
 * 
 * @component
 * @example
 * <NavRegionSwitcher 
 *   regions={regions}
 *   i18nInstance={i18n}
 * />
 */
const NavRegionSwitcher = ({
  regions,
  useI18next = true,
  i18nInstance,
  syncWithLanguage = true,
  updateDocumentDirection = false,
  ariaLabel = "Switch region",
  className = '',
  ...props
}) => {
  return (
    <NavButton 
      ariaLabel={ariaLabel}
      className={className}
    >
      <RegionSwitcher
        regions={regions}
        showCurrentSelection={false}
        useI18next={useI18next}
        i18nInstance={i18nInstance}
        syncWithLanguage={syncWithLanguage}
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

NavRegionSwitcher.propTypes = {
  /** Array of supported regions */
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      flag: PropTypes.string
    })
  ).isRequired,
  /** Whether to use i18next for region switching */
  useI18next: PropTypes.bool,
  /** i18next instance */
  i18nInstance: PropTypes.object,
  /** Whether to sync region with language */
  syncWithLanguage: PropTypes.bool,
  /** Whether to update document direction when region changes */
  updateDocumentDirection: PropTypes.bool,
  /** Accessible label for the button */
  ariaLabel: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default NavRegionSwitcher