import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { DEFAULT_REGIONS, DEFAULT_THEME } from '../../../utils/defaultConfigs'

// Default icons (fallback if lucide-react is not available)
const DefaultMapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const DefaultChevronIcon = ({ isOpen }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ 
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease'
    }}
  >
    <polyline points="6,9 12,15 18,9"/>
  </svg>
)

const DefaultCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
)

const RegionSwitcher = ({
  regions = DEFAULT_REGIONS,
  currentRegion,
  onRegionChange,
  theme = DEFAULT_THEME,
  className = '',
  style = {},
  disabled = false,
  placement = 'bottom-right',
  closeOnSelect = true,
  ariaLabel = 'Select region',
  icons = {},
  renderRegion,
  renderDropdownItem,
  // Language integration props
  syncWithLanguage = false,
  updateDocumentDirection = false,
  onLanguageChange,
  // i18next integration props
  useI18next = false,
  i18nInstance,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [internalCurrentRegion, setInternalCurrentRegion] = useState(
    currentRegion || regions[0]
  )
  
  const dropdownRef = useClickOutside(() => setIsOpen(false), isOpen)

  // Handle i18next integration and language sync
  useEffect(() => {
    if (syncWithLanguage && useI18next && i18nInstance) {
      const currentLanguage = i18nInstance.language
      const regionForLanguage = regions.find(region => region.language === currentLanguage)
      
      if (regionForLanguage && regionForLanguage.code !== internalCurrentRegion?.code) {
        setInternalCurrentRegion(regionForLanguage)
      }
    }
  }, [syncWithLanguage, useI18next, i18nInstance?.language, regions, internalCurrentRegion?.code])

  const currentReg = currentRegion || internalCurrentRegion

  const handleRegionChange = (region) => {
    setInternalCurrentRegion(region)
    
    if (closeOnSelect) {
      setIsOpen(false)
    }

    // Call the provided change handler
    if (onRegionChange) {
      onRegionChange(region)
    }

    // Handle language changes
    if (syncWithLanguage && region.language) {
      if (useI18next && i18nInstance && region.language !== i18nInstance.language) {
        i18nInstance.changeLanguage(region.language)
      }
      
      if (onLanguageChange) {
        onLanguageChange(region.language, region)
      }
    }

    // Update document direction if enabled
    if (updateDocumentDirection && region.language) {
      const isRtl = region.language === 'ar' || region.language === 'he' || region.language === 'fa'
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
      document.documentElement.lang = region.language
    }
  }

  const getDropdownPosition = () => {
    const [vertical, horizontal] = placement.split('-')
    return {
      top: vertical === 'top' ? 'auto' : '100%',
      bottom: vertical === 'top' ? '100%' : 'auto',
      left: horizontal === 'left' ? '0' : 'auto',
      right: horizontal === 'right' ? '0' : 'auto',
      marginTop: vertical === 'bottom' ? '4px' : '0',
      marginBottom: vertical === 'top' ? '4px' : '0'
    }
  }

  const isRtl = currentReg?.language === 'ar' || currentReg?.language === 'he' || currentReg?.language === 'fa'

  // Icon handling
  let MapPinIcon = icons.region || DefaultMapPinIcon
  let ChevronIcon = icons.chevron || DefaultChevronIcon
  let CheckIcon = icons.check || DefaultCheckIcon

  // Try to import lucide-react icons if available
  try {
    if (!icons.region) {
      const { MapPin } = require('lucide-react')
      MapPinIcon = () => <MapPin size={16} />
    }
    if (!icons.chevron) {
      const { ChevronDown } = require('lucide-react')
      ChevronIcon = ({ isOpen }) => <ChevronDown size={16} style={{ 
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease'
      }} />
    }
    if (!icons.check) {
      const { Check } = require('lucide-react')
      CheckIcon = () => <Check size={16} />
    }
  } catch (error) {
    // lucide-react not available, use defaults or provided icons
  }

  return (
    <div 
      style={{ position: 'relative', ...style }} 
      className={className}
      ref={dropdownRef}
      {...props}
    >
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          backgroundColor: theme.colors.background,
          border: `1px solid ${isOpen ? theme.colors.borderFocus : theme.colors.border}`,
          borderRadius: theme.borderRadius,
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          color: disabled ? theme.colors.textSecondary : theme.colors.text,
          transition: `all ${theme.transition.normal}`,
          boxShadow: isOpen ? `0 0 0 3px ${theme.colors.borderFocus}33` : 'none',
          opacity: disabled ? 0.6 : 1
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.target.style.backgroundColor = theme.colors.backgroundHover
            e.target.style.borderColor = isOpen ? theme.colors.borderFocus : theme.colors.borderHover
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.target.style.backgroundColor = theme.colors.background
            e.target.style.borderColor = isOpen ? theme.colors.borderFocus : theme.colors.border
          }
        }}
      >
        <MapPinIcon />
        <span style={{ fontSize: '16px' }}>{currentReg?.flag}</span>
        <span>
          {renderRegion ? renderRegion(currentReg) : currentReg?.name}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          style={{
            position: 'absolute',
            ...getDropdownPosition(),
            minWidth: '200px',
            backgroundColor: theme.colors.background,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius,
            boxShadow: theme.boxShadow.md,
            zIndex: theme.zIndex.dropdown,
            maxHeight: '300px',
            overflowY: 'auto',
            direction: isRtl ? 'rtl' : 'ltr'
          }}
        >
          {regions.map((region) => (
            <div
              key={region.code}
              role="option"
              aria-selected={currentReg?.code === region.code}
              onClick={() => handleRegionChange(region)}
              onMouseEnter={() => setHoveredRegion(region.code)}
              onMouseLeave={() => setHoveredRegion(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                backgroundColor: hoveredRegion === region.code ? theme.colors.backgroundHover : 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                color: theme.colors.text,
                textAlign: isRtl ? 'right' : 'left',
                transition: `background-color ${theme.transition.normal}`,
                borderRadius: '4px',
                margin: '2px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                <span style={{ fontSize: '16px' }}>{region.flag}</span>
                <span>
                  {renderDropdownItem ? 
                    renderDropdownItem(region, currentReg?.code === region.code) :
                    region.name
                  }
                </span>
              </div>
              {currentReg?.code === region.code && (
                <CheckIcon style={{ color: theme.colors.primary }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

RegionSwitcher.propTypes = {
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired,
      language: PropTypes.string
    })
  ),
  currentRegion: PropTypes.object,
  onRegionChange: PropTypes.func,
  theme: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  placement: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  closeOnSelect: PropTypes.bool,
  ariaLabel: PropTypes.string,
  icons: PropTypes.shape({
    region: PropTypes.elementType,
    chevron: PropTypes.elementType,
    check: PropTypes.elementType
  }),
  renderRegion: PropTypes.func,
  renderDropdownItem: PropTypes.func,
  syncWithLanguage: PropTypes.bool,
  updateDocumentDirection: PropTypes.bool,
  onLanguageChange: PropTypes.func,
  useI18next: PropTypes.bool,
  i18nInstance: PropTypes.object
}

export default RegionSwitcher