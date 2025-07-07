import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { DEFAULT_LANGUAGES, DEFAULT_THEME } from '../../../utils/defaultConfigs'

// Default icons (fallback if lucide-react is not available)
const DefaultGlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
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

const LanguageSwitcher = ({
  languages = DEFAULT_LANGUAGES,
  currentLanguage,
  onLanguageChange,
  theme = DEFAULT_THEME,
  className = '',
  style = {},
  disabled = false,
  placement = 'bottom-right',
  closeOnSelect = true,
  ariaLabel = 'Select language',
  icon: Icon,
  renderLanguage,
  renderDropdownItem,
  // i18next integration props
  useI18next = false,
  i18nInstance,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredLanguage, setHoveredLanguage] = useState(null)
  const [internalCurrentLanguage, setInternalCurrentLanguage] = useState(currentLanguage || languages[0]?.code)
  
  const dropdownRef = useClickOutside(() => setIsOpen(false), isOpen)

  // Handle i18next integration
  useEffect(() => {
    if (useI18next && i18nInstance) {
      setInternalCurrentLanguage(i18nInstance.language)
    }
  }, [useI18next, i18nInstance?.language])

  const currentLang = languages.find(lang => lang.code === (currentLanguage || internalCurrentLanguage)) || languages[0]

  const handleLanguageChange = (language) => {
    setInternalCurrentLanguage(language.code)
    
    if (closeOnSelect) {
      setIsOpen(false)
    }

    // Call the provided change handler
    if (onLanguageChange) {
      onLanguageChange(language.code, language)
    }

    // Handle i18next integration
    if (useI18next && i18nInstance) {
      i18nInstance.changeLanguage(language.code)
    }

    // Update document direction
    if (language.dir) {
      document.documentElement.dir = language.dir
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

  const isRtl = currentLang?.dir === 'rtl'

  // Icon handling
  let GlobeIcon = DefaultGlobeIcon
  let ChevronIcon = DefaultChevronIcon
  let CheckIcon = DefaultCheckIcon

  // Try to import lucide-react icons if available
  try {
    if (!Icon) {
      const { Globe } = require('lucide-react')
      GlobeIcon = () => <Globe size={16} />
    }
    const { ChevronDown, Check } = require('lucide-react')
    ChevronIcon = ({ isOpen }) => <ChevronDown size={16} style={{ 
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease'
    }} />
    CheckIcon = () => <Check size={16} />
  } catch (error) {
    // lucide-react not available, use defaults
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
          opacity: disabled ? 0.6 : 1,
          ':hover': !disabled && {
            backgroundColor: theme.colors.backgroundHover,
            borderColor: theme.colors.borderHover
          }
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
        {Icon ? <Icon /> : <GlobeIcon />}
        <span>
          {renderLanguage ? renderLanguage(currentLang) : currentLang.name}
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
          {languages.map((language) => (
            <div
              key={language.code}
              role="option"
              aria-selected={currentLang.code === language.code}
              onClick={() => handleLanguageChange(language)}
              onMouseEnter={() => setHoveredLanguage(language.code)}
              onMouseLeave={() => setHoveredLanguage(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                backgroundColor: hoveredLanguage === language.code ? theme.colors.backgroundHover : 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                color: theme.colors.text,
                textAlign: isRtl ? 'right' : 'left',
                transition: `background-color ${theme.transition.normal}`,
                borderRadius: '4px',
                margin: '2px'
              }}
            >
              <span>
                {renderDropdownItem ? 
                  renderDropdownItem(language, currentLang.code === language.code) :
                  language.name
                }
              </span>
              {currentLang.code === language.code && (
                <CheckIcon style={{ color: theme.colors.primary }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

LanguageSwitcher.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dir: PropTypes.oneOf(['ltr', 'rtl'])
    })
  ),
  currentLanguage: PropTypes.string,
  onLanguageChange: PropTypes.func,
  theme: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  placement: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  closeOnSelect: PropTypes.bool,
  ariaLabel: PropTypes.string,
  icon: PropTypes.elementType,
  renderLanguage: PropTypes.func,
  renderDropdownItem: PropTypes.func,
  useI18next: PropTypes.bool,
  i18nInstance: PropTypes.object
}

export default LanguageSwitcher