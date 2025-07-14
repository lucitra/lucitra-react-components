import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu, Text, Box, UnstyledButton, ScrollArea } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { DEFAULT_LANGUAGES } from '../../../utils/defaultConfigs'

/**
 * LanguageSwitcher Component (Mantine Version)
 * 
 * An icon-only dropdown button for selecting languages with i18next integration.
 * Displays as a square button with language icon, inspired by IBM.com's design.
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
  showCurrentSelection = true,
  updateDocumentDirection = true,
  useI18next = false,
  i18nInstance = null,
  disabled = false,
  displayMode = 'icon', // 'icon' or 'text'
  borderRadius = 0, // 0 for square, or number for rounded corners
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
  }, [currentLanguage, selectedLanguage])

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

  // Get current language data
  const currentLanguageData = languages.find(l => l.code === selectedLanguage)
  
  // Format language name to show both English and native names
  const formatLanguageName = (language) => {
    if (!language.nativeName || language.nativeName === language.name) {
      return language.name
    }
    return `${language.name} (${language.nativeName})`
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
          aria-label="Select a language"
          title="Select a language"
        >
          <IconLanguage size={displayMode === 'icon' ? 20 : 16} style={{ color: '#161616' }} />
          {displayMode === 'text' && (
            <Text size="sm" c="#161616" style={{ lineHeight: 1 }}>
              {currentLanguageData ? formatLanguageName(currentLanguageData) : 'Select language'}
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
        {selectedLanguage && showCurrentSelection && (
          <Box p="md" style={{ borderBottom: '1px solid #393939' }}>
            <Text size="xs" c="#a8a8a8" tt="uppercase" fw={500} mb={4}>
              Your current language is:
            </Text>
            <Text size="sm" c="white" fw={500}>
              {currentLanguageData ? formatLanguageName(currentLanguageData) : 'Unknown Language'}
            </Text>
          </Box>
        )}
        
        <Box>
          <Text size="xs" c="#a8a8a8" tt="uppercase" fw={500} px="md" pt="md" pb="xs">
            Select a different language:
          </Text>
          <ScrollArea.Autosize mah={400} type="scroll">
            <Box>
              {languages.map((language) => {
                const isSelected = language.code === selectedLanguage
                
                if (isSelected) {
                  // Render selected language as non-clickable
                  return (
                    <Box
                      key={language.code}
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '12px 16px',
                        cursor: 'default',
                      }}
                    >
                      <Text size="sm" fw={400}>
                        {formatLanguageName(language)}
                      </Text>
                    </Box>
                  )
                }
                
                return (
                  <Menu.Item
                    key={language.code}
                    onClick={() => handleChange(language.code)}
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
                      {formatLanguageName(language)}
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
  /** Display mode: 'icon' (square icon button) or 'text' (icon with text) */
  displayMode: PropTypes.oneOf(['icon', 'text']),
  /** Border radius in pixels (0 for square corners, >0 for rounded) */
  borderRadius: PropTypes.number,
  /** Custom styles */
  style: PropTypes.object,
  /** Custom CSS class */
  className: PropTypes.string
}

export default LanguageSwitcher