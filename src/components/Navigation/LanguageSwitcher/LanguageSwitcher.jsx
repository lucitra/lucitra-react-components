import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { useSmartPositioning } from '../../../hooks/useSmartPositioning'
import { DEFAULT_LANGUAGES } from '../../../utils/defaultConfigs'

// --- Icon Components ---

// Default (fallback) icons
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
    className={`transform transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
    <polyline points="6,9 12,15 18,9"/>
  </svg>
)
DefaultChevronIcon.propTypes = {
  isOpen: PropTypes.bool
}

const DefaultCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
)

// Lucide-react icons (loaded dynamically)
let LucideGlobe, LucideChevron, LucideCheck;
try {
  const lucide = require('lucide-react');
  const LucideGlobeComponent = () => <lucide.Globe size={16} />;
  LucideGlobeComponent.displayName = 'LucideGlobe';
  LucideGlobe = LucideGlobeComponent;

  const LucideChevronComponent = ({ isOpen }) => (
    <lucide.ChevronDown size={16} className={`transform transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
  );
  LucideChevronComponent.displayName = 'LucideChevron';
  LucideChevronComponent.propTypes = {
    isOpen: PropTypes.bool
  };
  LucideChevron = LucideChevronComponent;

  const LucideCheckComponent = () => <lucide.Check size={16} />;
  LucideCheckComponent.displayName = 'LucideCheck';
  LucideCheck = LucideCheckComponent;
} catch (error) {
  // lucide-react is not installed, defaults will be used.
}


const LanguageSwitcher = ({
  languages = DEFAULT_LANGUAGES,
  currentLanguage,
  onLanguageChange,
  className = '',
  style = {},
  disabled = false,
  placement,
  closeOnSelect = true,
  ariaLabel = 'Select language',
  icon: Icon,
  renderLanguage,
  showCurrentSelection = false,
  renderDropdownItem,
  // i18next integration props
  useI18next = false,
  i18nInstance,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredLanguage, setHoveredLanguage] = useState(null)
  const [internalCurrentLanguage, setInternalCurrentLanguage] = useState(currentLanguage || languages[0]?.code)
  
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  
  // Use click outside hook with the container ref
  const containerRef = useClickOutside(() => setIsOpen(false), isOpen)
  
  // Get smart positioning
  const isRtl = typeof document !== 'undefined' && document.documentElement.dir === 'rtl'
  const defaultPlacement = placement || (isRtl ? 'bottom-left' : 'bottom-right')
  const { styles: positionStyles } = useSmartPositioning(
    triggerRef,
    dropdownRef,
    isOpen,
    defaultPlacement
  )

  // Handle i18next integration
  useEffect(() => {
    if (useI18next && i18nInstance) {
      setInternalCurrentLanguage(i18nInstance.language)
    }
  }, [useI18next, i18nInstance])

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

  const isLangRtl = currentLang?.dir === 'rtl'

  // Icon handling
  const GlobeIcon = Icon || (LucideGlobe || DefaultGlobeIcon);
  const ChevronIcon = LucideChevron || DefaultChevronIcon;
  const CheckIcon = LucideCheck || DefaultCheckIcon;

  return (
    <div 
      className={`relative ${className}`}
      style={style}
      ref={containerRef}
      {...props}
    >
      <button
        ref={triggerRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-md text-sm transition-all duration-200
          ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-gray-100 hover:border-gray-300'}
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'border-gray-200'}`}
      >
        <GlobeIcon />
        {showCurrentSelection && (
          <>
            <span>
              {renderLanguage ? renderLanguage(currentLang) : currentLang.name}
            </span>
            <ChevronIcon isOpen={isOpen} />
          </>
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          aria-label={ariaLabel}
          className="min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto"
          style={positionStyles}
        >
          {languages.map((language) => (
            <div
              key={language.code}
              role="option"
              aria-selected={currentLang.code === language.code}
              onClick={() => handleLanguageChange(language)}
              onMouseEnter={() => setHoveredLanguage(language.code)}
              onMouseLeave={() => setHoveredLanguage(null)}
              className={`block px-4 py-2 text-sm ${hoveredLanguage === language.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} ${isLangRtl ? 'text-right' : 'text-left'}`}
            >
              <span>
                {renderDropdownItem ? 
                  renderDropdownItem(language, currentLang.code === language.code) :
                  language.name
                }
              </span>
              {currentLang.code === language.code && (
                <CheckIcon className="text-blue-500" />
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
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  placement: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  closeOnSelect: PropTypes.bool,
  ariaLabel: PropTypes.string,
  icon: PropTypes.elementType,
  renderLanguage: PropTypes.func,
  renderDropdownItem: PropTypes.func,
  showCurrentSelection: PropTypes.bool,
  useI18next: PropTypes.bool,
  i18nInstance: PropTypes.object
}

export default LanguageSwitcher