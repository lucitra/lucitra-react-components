import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu, Text, Box, UnstyledButton, ScrollArea } from '@mantine/core'
import { IconGlobe } from '@tabler/icons-react'
import { DEFAULT_REGIONS } from '../../../utils/defaultConfigs'
import { isBrowser, setDocumentDir } from '../../../utils/ssr'

/**
 * RegionSwitcher Component (SSR-Compatible Version)
 * 
 * An SSR-safe version of the RegionSwitcher that handles server-side rendering.
 * All browser API calls are properly guarded and deferred to client-side.
 * 
 * @component
 * @example
 * // Basic usage
 * <RegionSwitcherSSR 
 *   regions={regions}
 *   onRegionChange={(region) => console.log('Selected:', region)}
 * />
 * 
 * @example
 * // With i18next integration
 * <RegionSwitcherSSR 
 *   regions={regions}
 *   useI18next={true}
 *   i18nInstance={i18n}
 *   syncWithLanguage={true}
 * />
 */
const RegionSwitcherSSR = ({
  regions = DEFAULT_REGIONS,
  currentRegion = null,
  onRegionChange = () => {},
  showCurrentSelection = true,
  syncWithLanguage = false,
  updateDocumentDirection = true,
  useI18next = false,
  i18nInstance = null,
  onLanguageChange = () => {},
  disabled = false,
  displayMode = 'icon', // 'icon' or 'text'
  borderRadius = 0, // 0 for square, or number for rounded corners
  variant = 'dark', // 'dark' (for light backgrounds) or 'light' (for dark backgrounds)
  style = {},
  className = '',
  placeholder = 'Loading...' // SSR placeholder
}) => {
  const [selectedRegion, setSelectedRegion] = useState(currentRegion)
  const [isClient, setIsClient] = useState(false)

  // Handle hydration - critical for SSR
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Sync with external currentRegion changes
  useEffect(() => {
    if (currentRegion !== selectedRegion) {
      setSelectedRegion(currentRegion)
    }
  }, [currentRegion, selectedRegion])

  // Handle i18next language changes (client-side only)
  useEffect(() => {
    if (isClient && useI18next && i18nInstance && syncWithLanguage) {
      const handleLanguageChange = (lng) => {
        // Find region that matches the new language
        const matchingRegion = regions.find(region => 
          region.languages && region.languages.includes(lng)
        )
        
        if (matchingRegion && matchingRegion.code !== selectedRegion) {
          setSelectedRegion(matchingRegion.code)
          onRegionChange(matchingRegion)
        }
      }

      i18nInstance.on('languageChanged', handleLanguageChange)
      
      return () => {
        i18nInstance.off('languageChanged', handleLanguageChange)
      }
    }
  }, [isClient, useI18next, i18nInstance, syncWithLanguage, regions, selectedRegion, onRegionChange])

  // Update document direction based on selected region (client-side only)
  useEffect(() => {
    if (updateDocumentDirection && isClient && selectedRegion && isBrowser()) {
      const region = regions.find(r => r.code === selectedRegion)
      if (region) {
        setDocumentDir(region.direction || 'ltr')
      }
    }
  }, [selectedRegion, regions, updateDocumentDirection, isClient])

  const handleChange = (value) => {
    if (value === selectedRegion) return

    const region = regions.find(r => r.code === value)
    if (!region) return

    setSelectedRegion(value)
    onRegionChange(region)

    // Handle language change if using i18next (client-side only)
    if (isClient && useI18next && i18nInstance && region.language) {
      i18nInstance.changeLanguage(region.language)
      onLanguageChange(region.language)
    }

    // Update document direction (client-side only)
    if (updateDocumentDirection && isBrowser()) {
      setDocumentDir(region.direction || 'ltr')
    }
  }

  // Get current region data
  const currentRegionData = regions.find(r => r.code === selectedRegion)
  
  // Format region name to show language in both native and English
  const formatRegionName = (region) => {
    if (!region.language) return region.name
    
    // Extract the country and language parts from the name if formatted like "Country – Language (English)"
    const match = region.name.match(/^(.+?)\s*–\s*(.+?)\s*\((.+?)\)$/)
    if (match) {
      return region.name // Already formatted correctly
    }
    
    // Otherwise, return as is
    return region.name
  }

  // Colors based on variant
  const colors = {
    dark: {
      icon: '#161616',
      text: '#161616',
      hoverBg: '#f4f4f4',
      focusOutline: '#0f62fe'
    },
    light: {
      icon: '#f4f4f4',
      text: '#f4f4f4',
      hoverBg: 'rgba(255, 255, 255, 0.1)',
      focusOutline: '#78a9ff'
    }
  }

  const currentColors = colors[variant] || colors.dark

  // SSR placeholder - return a simple button that doesn't use Menu
  if (!isClient) {
    return (
      <div
        className={className}
        style={{
          ...(displayMode === 'icon' ? {
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          } : {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
          }),
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          border: '2px solid transparent',
          backgroundColor: 'transparent',
          borderRadius: `${borderRadius}px`,
          ...style,
        }}
        aria-label="Select a region"
        title="Select a region"
      >
        <IconGlobe size={displayMode === 'icon' ? 20 : 16} style={{ color: currentColors.icon }} />
        {displayMode === 'text' && (
          <span style={{ fontSize: '14px', color: currentColors.text, lineHeight: 1 }}>
            {placeholder}
          </span>
        )}
      </div>
    )
  }

  return (
    <Menu
      position="bottom-end"
      width={300}
      offset={8}
      withArrow={false}
      transitionProps={{ transition: 'pop', duration: 200 }}
      disabled={disabled}
    >
      <Menu.Target>
        <UnstyledButton
          className={className}
          style={{
            ...(displayMode === 'icon' ? {
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            } : {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
            }),
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            border: '2px solid transparent', // Transparent border to prevent jumping
            backgroundColor: 'transparent',
            transition: 'background-color 0.15s ease, outline 0.15s ease, border-color 0.15s ease',
            outline: 'none',
            borderRadius: `${borderRadius}px`,
            ...style,
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = currentColors.hoverBg
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.outline = `2px solid ${currentColors.focusOutline}`
              e.currentTarget.style.outlineOffset = '2px'
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
            e.currentTarget.style.outlineOffset = '0'
          }}
          aria-label="Select a region"
          title="Select a region"
        >
          <IconGlobe size={displayMode === 'icon' ? 20 : 16} style={{ color: currentColors.icon }} />
          {displayMode === 'text' && (
            <Text size="sm" c={currentColors.text} style={{ lineHeight: 1 }}>
              {currentRegionData ? formatRegionName(currentRegionData) : 'Select region'}
            </Text>
          )}
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown
        bg="black"
        style={{
          border: 'none',
          padding: 0,
        }}
      >
        {selectedRegion && showCurrentSelection && (
          <Box p="md" style={{ borderBottom: '1px solid #393939' }}>
            <Text size="xs" c="#a8a8a8" tt="uppercase" fw={500} mb={4}>
              Your current region is:
            </Text>
            <Text size="sm" c="white" fw={500}>
              {currentRegionData ? formatRegionName(currentRegionData) : 'Unknown Region'}
            </Text>
          </Box>
        )}
        
        <Box>
          <Text size="xs" c="#a8a8a8" tt="uppercase" fw={500} px="md" pt="md" pb="xs">
            Select a different region:
          </Text>
          <ScrollArea.Autosize mah={400} type="scroll">
            <Box>
              {regions.map((region) => {
                const isSelected = region.code === selectedRegion
                
                if (isSelected) {
                  // Render selected region as non-clickable
                  return (
                    <Box
                      key={region.code}
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '12px 16px',
                        cursor: 'default',
                      }}
                    >
                      <Text size="sm" fw={400}>
                        {formatRegionName(region)}
                      </Text>
                    </Box>
                  )
                }
                
                return (
                  <Menu.Item
                    key={region.code}
                    onClick={() => handleChange(region.code)}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '12px 16px',
                      borderRadius: 0,
                      cursor: 'pointer',
                    }}
                    styles={{
                      item: {
                        '&:hover': {
                          backgroundColor: '#f4f4f4',
                        },
                      },
                    }}
                  >
                    <Text size="sm" fw={400}>
                      {formatRegionName(region)}
                    </Text>
                  </Menu.Item>
                )
              })}
            </Box>
          </ScrollArea.Autosize>
        </Box>
      </Menu.Dropdown>
    </Menu>
  )
}

RegionSwitcherSSR.propTypes = {
  /** Array of region objects */
  regions: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    language: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    direction: PropTypes.oneOf(['ltr', 'rtl'])
  })),
  /** Currently selected region code */
  currentRegion: PropTypes.string,
  /** Callback when region changes */
  onRegionChange: PropTypes.func,
  /** Whether to show current selection */
  showCurrentSelection: PropTypes.bool,
  /** Whether to sync with language changes */
  syncWithLanguage: PropTypes.bool,
  /** Whether to update document direction */
  updateDocumentDirection: PropTypes.bool,
  /** Whether to use i18next integration */
  useI18next: PropTypes.bool,
  /** i18next instance */
  i18nInstance: PropTypes.object,
  /** Callback when language changes */
  onLanguageChange: PropTypes.func,
  /** Whether the component is disabled */
  disabled: PropTypes.bool,
  /** Display mode: 'icon' (square icon button) or 'text' (icon with text) */
  displayMode: PropTypes.oneOf(['icon', 'text']),
  /** Border radius in pixels (0 for square corners, >0 for rounded) */
  borderRadius: PropTypes.number,
  /** Color variant */
  variant: PropTypes.oneOf(['dark', 'light']),
  /** Custom styles */
  style: PropTypes.object,
  /** Custom CSS class */
  className: PropTypes.string,
  /** Placeholder text for SSR */
  placeholder: PropTypes.string
}

export default RegionSwitcherSSR