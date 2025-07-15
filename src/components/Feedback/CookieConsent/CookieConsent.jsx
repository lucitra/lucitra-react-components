/**
 * CookieConsent Component
 * 
 * A GDPR-compliant cookie consent banner built with Mantine UI components.
 * Supports customizable cookie categories, internationalization, and accessibility.
 * 
 * @component
 * @example
 * ```jsx
 * import { CookieConsent } from '@lucitra/react-components'
 * 
 * function App() {
 *   return (
 *     <div>
 *       <YourAppContent />
 *       <CookieConsent
 *         translations={{
 *           title: "We use cookies",
 *           description: "We use cookies to enhance your experience...",
 *           // ... other translations
 *         }}
 *         onConsentChange={(preferences) => {
 *           console.log('User preferences:', preferences)
 *         }}
 *         cookieManager={{
 *           setCookie: (name, value, days) => {},
 *           getCookie: (name) => {},
 *           deleteCookie: (name) => {}
 *         }}
 *       />
 *     </div>
 *   )
 * }
 * ```
 */

import { useState, useEffect } from 'react'
import {
  Paper,
  Text,
  Title,
  Button,
  Group,
  Stack,
  Switch,
  Badge,
  Box,
  Collapse,
  Overlay
} from '@mantine/core'
import PropTypes from 'prop-types'
import { COOKIE_TYPES, DEFAULT_TRANSLATIONS, DEFAULT_COOKIE_MANAGER } from './cookieTypes'

/**
 * CookieConsent Component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.translations - Translation object for all text content
 * @param {Function} props.onConsentChange - Callback when user consent changes
 * @param {Object} props.cookieManager - Custom cookie management functions
 * @param {string} props.consentCookieName - Name of the consent cookie
 * @param {number} props.consentCookieExpiry - Days until consent cookie expires
 * @param {Object} props.defaultPreferences - Default cookie preferences
 * @param {Object} props.mantineProps - Additional Mantine component props
 * @param {boolean} props.showOnMount - Whether to show banner on component mount
 */
export function CookieConsent({
  translations = DEFAULT_TRANSLATIONS,
  onConsentChange,
  cookieManager = DEFAULT_COOKIE_MANAGER,
  consentCookieName = 'cookie-consent',
  consentCookieExpiry = 365,
  defaultPreferences = {
    [COOKIE_TYPES.NECESSARY]: true,
    [COOKIE_TYPES.FUNCTIONAL]: false,
    [COOKIE_TYPES.ANALYTICS]: false,
    [COOKIE_TYPES.MARKETING]: false
  },
  mantineProps = {},
  showOnMount = true,
  ...rest
}) {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState(defaultPreferences)

  useEffect(() => {
    if (!showOnMount) return
    
    // Check if consent has already been given
    const hasConsent = cookieManager.getCookie(consentCookieName)
    if (!hasConsent) {
      setShowBanner(true)
    } else {
      // Load existing preferences
      try {
        const consentData = JSON.parse(hasConsent)
        setPreferences({
          [COOKIE_TYPES.NECESSARY]: true,
          [COOKIE_TYPES.FUNCTIONAL]: consentData.functional || false,
          [COOKIE_TYPES.ANALYTICS]: consentData.analytics || false,
          [COOKIE_TYPES.MARKETING]: consentData.marketing || false
        })
      } catch {
        // Invalid JSON, reset consent
        setShowBanner(true)
      }
    }
  }, [showOnMount, cookieManager, consentCookieName])

  const saveConsent = (consentPreferences) => {
    const consentData = {
      [COOKIE_TYPES.NECESSARY]: true,
      [COOKIE_TYPES.FUNCTIONAL]: consentPreferences.functional || false,
      [COOKIE_TYPES.ANALYTICS]: consentPreferences.analytics || false,
      [COOKIE_TYPES.MARKETING]: consentPreferences.marketing || false,
      timestamp: new Date().toISOString()
    }
    
    cookieManager.setCookie(consentCookieName, JSON.stringify(consentData), consentCookieExpiry)
    
    if (onConsentChange) {
      onConsentChange(consentData)
    }
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      functional: true,
      analytics: true,
      marketing: true
    }
    saveConsent(allAccepted)
    setShowBanner(false)
  }

  const handleAcceptNecessary = () => {
    const onlyNecessary = {
      functional: false,
      analytics: false,
      marketing: false
    }
    saveConsent(onlyNecessary)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
    setShowBanner(false)
    setShowDetails(false)
  }

  const togglePreference = (type) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  if (!showBanner) {
    return null
  }

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: 'var(--mantine-spacing-lg)',
      }}
      {...rest}
    >
      <Overlay opacity={0.3} blur={4} />
      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        style={{
          maxWidth: 800,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10000,
        }}
        {...mantineProps}
      >
        <Stack gap="lg">
          <div>
            <Title order={2} size="h3" mb="sm">
              {translations.title}
            </Title>
            <Text size="sm" c="dimmed">
              {translations.description}
            </Text>
          </div>

          <Collapse in={showDetails}>
            <Stack gap="md">
              <Paper bg="gray.0" p="md" radius="md">
                <Group justify="space-between" align="center" mb="xs">
                  <Text fw={600} size="sm">
                    {translations.necessary.title}
                  </Text>
                  <Badge color="green" size="sm">
                    {translations.alwaysActive}
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed">
                  {translations.necessary.description}
                </Text>
              </Paper>

              <Paper bg="gray.0" p="md" radius="md">
                <Group justify="space-between" align="center" mb="xs">
                  <Text fw={600} size="sm">
                    {translations.functional.title}
                  </Text>
                  <Switch
                    checked={preferences[COOKIE_TYPES.FUNCTIONAL]}
                    onChange={() => togglePreference(COOKIE_TYPES.FUNCTIONAL)}
                    aria-label={translations.functional.title}
                  />
                </Group>
                <Text size="xs" c="dimmed">
                  {translations.functional.description}
                </Text>
              </Paper>

              <Paper bg="gray.0" p="md" radius="md">
                <Group justify="space-between" align="center" mb="xs">
                  <Text fw={600} size="sm">
                    {translations.analytics.title}
                  </Text>
                  <Switch
                    checked={preferences[COOKIE_TYPES.ANALYTICS]}
                    onChange={() => togglePreference(COOKIE_TYPES.ANALYTICS)}
                    aria-label={translations.analytics.title}
                  />
                </Group>
                <Text size="xs" c="dimmed">
                  {translations.analytics.description}
                </Text>
              </Paper>

              <Paper bg="gray.0" p="md" radius="md">
                <Group justify="space-between" align="center" mb="xs">
                  <Text fw={600} size="sm">
                    {translations.marketing.title}
                  </Text>
                  <Switch
                    checked={preferences[COOKIE_TYPES.MARKETING]}
                    onChange={() => togglePreference(COOKIE_TYPES.MARKETING)}
                    aria-label={translations.marketing.title}
                  />
                </Group>
                <Text size="xs" c="dimmed">
                  {translations.marketing.description}
                </Text>
              </Paper>
            </Stack>
          </Collapse>

          <Group justify="flex-end" gap="sm">
            {!showDetails ? (
              <>
                <Button 
                  variant="subtle"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                >
                  {translations.customize}
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptNecessary}
                >
                  {translations.acceptNecessary}
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAcceptAll}
                >
                  {translations.acceptAll}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="subtle"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                >
                  {translations.back}
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSavePreferences}
                >
                  {translations.savePreferences}
                </Button>
              </>
            )}
          </Group>
        </Stack>
      </Paper>
    </Box>
  )
}

CookieConsent.propTypes = {
  translations: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    acceptAll: PropTypes.string,
    acceptNecessary: PropTypes.string,
    customize: PropTypes.string,
    savePreferences: PropTypes.string,
    back: PropTypes.string,
    alwaysActive: PropTypes.string,
    necessary: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    }),
    functional: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    }),
    analytics: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    }),
    marketing: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    })
  }),
  onConsentChange: PropTypes.func,
  cookieManager: PropTypes.shape({
    setCookie: PropTypes.func.isRequired,
    getCookie: PropTypes.func.isRequired,
    deleteCookie: PropTypes.func.isRequired
  }),
  consentCookieName: PropTypes.string,
  consentCookieExpiry: PropTypes.number,
  defaultPreferences: PropTypes.object,
  mantineProps: PropTypes.object,
  showOnMount: PropTypes.bool
}

CookieConsent.displayName = 'CookieConsent'

export default CookieConsent