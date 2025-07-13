import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, Group, Text } from '@mantine/core'
import { IconWorld } from '@tabler/icons-react'
import { DEFAULT_REGIONS } from '../../../utils/defaultConfigs'

/**
 * RegionSwitcher Component (Mantine Version)
 * 
 * A dropdown component for selecting regions/countries with automatic language synchronization
 * and RTL support. Built with Mantine components for consistent styling.
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
  placeholder = 'Select region...',
  showCurrentSelection = true,
  syncWithLanguage = false,
  updateDocumentDirection = true,
  useI18next = false,
  i18nInstance = null,
  onLanguageChange = () => {},
  disabled = false,
  size = 'sm',
  variant = 'default',
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
  }, [currentRegion])

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

  // Prepare data for Mantine Select
  const selectData = regions.map(region => ({
    value: region.code,
    label: region.name,
    flag: region.flag
  }))

  // Custom item renderer to show flags
  const renderSelectOption = ({ option, checked }) => (
    <Group gap="sm" wrap="nowrap">
      {option.flag && (
        <Text size="lg" style={{ lineHeight: 1 }}>
          {option.flag}
        </Text>
      )}
      <Text size="sm">{option.label}</Text>
    </Group>
  )

  const currentRegionData = regions.find(r => r.code === selectedRegion)

  return (
    <Select
      data={selectData}
      value={selectedRegion}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      variant={variant}
      style={style}
      className={className}
      leftSection={<IconWorld size={16} />}
      renderOption={renderSelectOption}
      searchable
      clearable={!showCurrentSelection}
      aria-label="Select region"
      comboboxProps={{
        transitionProps: { transition: 'pop', duration: 200 }
      }}
    />
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
  /** Placeholder text */
  placeholder: PropTypes.string,
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
  /** Size of the select */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Variant of the select */
  variant: PropTypes.oneOf(['default', 'filled', 'unstyled']),
  /** Custom styles */
  style: PropTypes.object,
  /** Custom CSS class */
  className: PropTypes.string
}

export default RegionSwitcher