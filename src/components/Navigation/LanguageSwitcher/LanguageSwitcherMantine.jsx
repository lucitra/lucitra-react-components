import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, Group, Text } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { DEFAULT_LANGUAGES } from '../../../utils/defaultConfigs'

/**
 * LanguageSwitcher Component (Mantine Version)
 * 
 * A dropdown component for selecting languages with i18next integration.
 * Built with Mantine components for consistent styling.
 * 
 * @component
 * @example
 * // Basic usage
 * <LanguageSwitcher 
 *   languages={languages}
 *   onLanguageChange={(language) => console.log('Selected:', language)}
 * />
 * 
 * @example
 * // With i18next integration
 * <LanguageSwitcher 
 *   languages={languages}
 *   useI18next={true}
 *   i18nInstance={i18n}
 * />
 */
const LanguageSwitcher = ({
  languages = DEFAULT_LANGUAGES,
  currentLanguage = null,
  onLanguageChange = () => {},
  placeholder = 'Select language...',
  showCurrentSelection = true,
  updateDocumentDirection = true,
  useI18next = false,
  i18nInstance = null,
  disabled = false,
  size = 'sm',
  variant = 'default',
  style = {},
  className = ''
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage)
  const [isClient, setIsClient] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Sync with external currentLanguage changes
  useEffect(() => {
    if (currentLanguage !== selectedLanguage) {
      setSelectedLanguage(currentLanguage)
    }
  }, [currentLanguage])

  // Initialize with i18next current language
  useEffect(() => {
    if (useI18next && i18nInstance && !selectedLanguage) {
      setSelectedLanguage(i18nInstance.language)
    }
  }, [useI18next, i18nInstance, selectedLanguage])

  // Handle i18next language changes
  useEffect(() => {
    if (useI18next && i18nInstance) {
      const handleLanguageChange = (lng) => {
        if (lng !== selectedLanguage) {
          setSelectedLanguage(lng)
        }
      }

      i18nInstance.on('languageChanged', handleLanguageChange)
      
      return () => {
        i18nInstance.off('languageChanged', handleLanguageChange)
      }
    }
  }, [useI18next, i18nInstance, selectedLanguage])

  // Update document direction based on selected language
  useEffect(() => {
    if (updateDocumentDirection && isClient && selectedLanguage) {
      const language = languages.find(l => l.code === selectedLanguage)
      if (language && typeof document !== 'undefined') {
        document.dir = language.direction || 'ltr'
      }
    }
  }, [selectedLanguage, languages, updateDocumentDirection, isClient])

  const handleChange = (value) => {
    if (value === selectedLanguage) return

    const language = languages.find(l => l.code === value)
    if (!language) return

    setSelectedLanguage(value)
    onLanguageChange(language)

    // Handle language change if using i18next
    if (useI18next && i18nInstance) {
      i18nInstance.changeLanguage(value)
    }

    // Update document direction
    if (updateDocumentDirection && typeof document !== 'undefined') {
      document.dir = language.direction || 'ltr'
    }
  }

  // Prepare data for Mantine Select
  const selectData = languages.map(language => ({
    value: language.code,
    label: language.name,
    nativeName: language.nativeName
  }))

  // Custom item renderer to show native names
  const renderSelectOption = ({ option, checked }) => (
    <Group gap="sm" wrap="nowrap">
      <div>
        <Text size="sm">{option.label}</Text>
        {option.nativeName && option.nativeName !== option.label && (
          <Text size="xs" c="dimmed">{option.nativeName}</Text>
        )}
      </div>
    </Group>
  )

  return (
    <Select
      data={selectData}
      value={selectedLanguage}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      variant={variant}
      style={style}
      className={className}
      leftSection={<IconLanguage size={16} />}
      renderOption={renderSelectOption}
      searchable
      clearable={!showCurrentSelection}
      aria-label="Select language"
      comboboxProps={{
        transitionProps: { transition: 'pop', duration: 200 }
      }}
    />
  )
}

LanguageSwitcher.propTypes = {
  /** Array of language objects */
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nativeName: PropTypes.string,
    direction: PropTypes.oneOf(['ltr', 'rtl'])
  })),
  /** Currently selected language code */
  currentLanguage: PropTypes.string,
  /** Callback when language changes */
  onLanguageChange: PropTypes.func,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Whether to show current selection */
  showCurrentSelection: PropTypes.bool,
  /** Whether to update document direction */
  updateDocumentDirection: PropTypes.bool,
  /** Whether to use i18next integration */
  useI18next: PropTypes.bool,
  /** i18next instance */
  i18nInstance: PropTypes.object,
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

export default LanguageSwitcher