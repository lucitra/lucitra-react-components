import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu, Group, Text, Box, UnstyledButton, ScrollArea } from '@mantine/core'
import { IconGlobe } from '@tabler/icons-react'
import { DEFAULT_REGIONS } from '../../../utils/defaultConfigs'

/**
 * RegionSwitcher Component (Mantine Version)
 * 
 * An icon-only dropdown button for selecting regions/countries with automatic language 
 * synchronization and RTL support. Displays as a square button with globe icon, 
 * inspired by IBM.com's design.
 * 
 * @component
 * @example
 * // Basic usage
 * <RegionSwitcher 
 *   regions={regions}
 *   onRegionChange={(region) => console.log('Selected:', region)}
 * />
 * 
 * @example
 * // With i18next integration
 * <RegionSwitcher 
 *   regions={regions}
 *   useI18next={true}
 *   i18nInstance={i18n}
 *   syncWithLanguage={true}
 * />
 */
const RegionSwitcher = ({
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
  style = {},
  className = ''
}) => {
  const [selectedRegion, setSelectedRegion] = useState(currentRegion)
  const [isClient, setIsClient] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Sync with external currentRegion changes
  useEffect(() => {
    if (currentRegion !== selectedRegion) {
      setSelectedRegion(currentRegion)
    }
  }, [currentRegion, selectedRegion])

  // Handle i18next language changes
  useEffect(() => {
    if (useI18next && i18nInstance && syncWithLanguage) {
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
  }, [useI18next, i18nInstance, syncWithLanguage, regions, selectedRegion, onRegionChange])

  // Update document direction based on selected region
  useEffect(() => {
    if (updateDocumentDirection && isClient && selectedRegion) {
      const region = regions.find(r => r.code === selectedRegion)
      if (region && typeof document !== 'undefined') {
        document.dir = region.direction || 'ltr'
      }
    }
  }, [selectedRegion, regions, updateDocumentDirection, isClient])

  const handleChange = (value) => {
    if (value === selectedRegion) return

    const region = regions.find(r => r.code === value)
    if (!region) return

    setSelectedRegion(value)
    onRegionChange(region)

    // Handle language change if using i18next
    if (useI18next && i18nInstance && region.language) {
      i18nInstance.changeLanguage(region.language)
      onLanguageChange(region.language)
    }

    // Update document direction
    if (updateDocumentDirection && typeof document !== 'undefined') {
      document.dir = region.direction || 'ltr'
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
              e.currentTarget.style.backgroundColor = '#f4f4f4'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.outline = '2px solid #0f62fe'
              e.currentTarget.style.outlineOffset = '2px'
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
            e.currentTarget.style.outlineOffset = '0'
          }}
          aria-label={`Select region. Current region: ${currentRegionData ? formatRegionName(currentRegionData) : 'None'}`}
        >
          <IconGlobe size={displayMode === 'icon' ? 20 : 16} style={{ color: '#161616' }} />
          {displayMode === 'text' && (
            <Text size="sm" c="#161616" style={{ lineHeight: 1 }}>
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
                      <Group gap="sm" wrap="nowrap">
                        {region.flag && (
                          <Text size="lg" style={{ lineHeight: 1 }}>
                            {region.flag}
                          </Text>
                        )}
                        <Text size="sm" fw={400}>
                          {formatRegionName(region)}
                        </Text>
                      </Group>
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
                    <Group gap="sm" wrap="nowrap">
                      {region.flag && (
                        <Text size="lg" style={{ lineHeight: 1 }}>
                          {region.flag}
                        </Text>
                      )}
                      <Text size="sm" fw={400}>
                        {formatRegionName(region)}
                      </Text>
                    </Group>
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

RegionSwitcher.propTypes = {
  /** Array of region objects */
  regions: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    flag: PropTypes.string,
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
  /** Custom styles */
  style: PropTypes.object,
  /** Custom CSS class */
  className: PropTypes.string
}

export default RegionSwitcher