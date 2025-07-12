import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { useSmartPositioning } from '../../../hooks/useSmartPositioning'
import { DEFAULT_REGIONS } from '../../../utils/defaultConfigs'

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
  LucideGlobe = () => <lucide.Globe size={16} />;
  LucideGlobe.displayName = 'LucideGlobe';

  LucideChevron = ({ isOpen }) => (
    <lucide.ChevronDown size={16} className={`transform transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
  );
  LucideChevron.displayName = 'LucideChevron';
  LucideChevron.propTypes = {
    isOpen: PropTypes.bool
  };

  LucideCheck = () => <lucide.Check size={16} />;
  LucideCheck.displayName = 'LucideCheck';
} catch (error) {
  // lucide-react is not installed, defaults will be used.
}


const RegionSwitcher = ({
  regions = DEFAULT_REGIONS,
  currentRegion,
  onRegionChange,
  className = '',
  disabled = false,
  placement,
  closeOnSelect = true,
  ariaLabel = 'Select region',
  icons = {},
  renderRegion,
  showCurrentSelection = false,
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

  // Handle i18next integration and language sync
  useEffect(() => {
    if (syncWithLanguage && useI18next && i18nInstance) {
      const currentLanguage = i18nInstance.language
      const regionForLanguage = regions.find(region => region.language === currentLanguage)
      
      if (regionForLanguage && regionForLanguage.code !== internalCurrentRegion?.code) {
        setInternalCurrentRegion(regionForLanguage)
      }
    }
  }, [syncWithLanguage, useI18next, i18nInstance, regions, internalCurrentRegion?.code])

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

  // Check if current region uses RTL language
  const isRegionRtl = currentReg?.language === 'ar' || currentReg?.language === 'he' || currentReg?.language === 'fa'

  // Icon handling
  const RegionIcon = icons.region || (LucideGlobe || DefaultGlobeIcon);
  const ChevronIcon = icons.chevron || (LucideChevron || DefaultChevronIcon);
  const CheckIcon = icons.check || (LucideCheck || DefaultCheckIcon);

  return (
    <div 
      className={`relative ${className}`}
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
        <RegionIcon />
        {showCurrentSelection && (
          <>
            <span>
              {renderRegion ? renderRegion(currentReg) : currentReg?.name}
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
          className="min-w-[240px] bg-white border border-gray-200 rounded-md shadow-lg max-h-80 flex flex-col overflow-hidden z-50 absolute"
          style={positionStyles}
        >
          {currentReg && (
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-base">{currentReg.flag}</span>
                <span className="font-bold">
                  {renderRegion ? renderRegion(currentReg) : currentReg.name}
                </span>
              </div>
              <CheckIcon className="text-blue-500" />
            </div>
          )}
          <div className="overflow-y-auto">
            {regions
              .filter(region => !currentReg || region.code !== currentReg.code)
              .map((region) => (
              <div
                key={region.code}
                role="option"
                aria-selected={false}
                onClick={() => handleRegionChange(region)}
                onMouseEnter={() => setHoveredRegion(region.code)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`block px-4 py-2 text-sm cursor-pointer ${hoveredRegion === region.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} ${isRegionRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{region.flag}</span>
                  <span>
                    {renderDropdownItem ? 
                      renderDropdownItem(region, false) :
                      region.name
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
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
  className: PropTypes.string,
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
  showCurrentSelection: PropTypes.bool,
  syncWithLanguage: PropTypes.bool,
  updateDocumentDirection: PropTypes.bool,
  onLanguageChange: PropTypes.func,
  useI18next: PropTypes.bool,
  i18nInstance: PropTypes.object
}

export default RegionSwitcher
