/**
 * Enterprise Consent Manager
 * 
 * Simple yet totally configurable cookie consent system
 * Professional enterprise-grade cookie management with proper categories
 */

import React, { useState, useEffect } from 'react'
import { Text, Group, Stack, Grid } from '@mantine/core'
import { IconCookieMan, IconCheck, IconX, IconSettings, IconInfoCircle } from '@tabler/icons-react'
import PropTypes from 'prop-types'

import {
  ModularCard,
  StatusIndicator,
  ModularButton,
  ModularBadge,
  CodeBlock,
  AlertBox,
  TabButton
} from '../UI'

// Cookie category definitions matching Cookiebot standard
const COOKIE_CATEGORIES = {
  necessary: {
    name: 'Necessary',
    description: 'Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.',
    required: true,
    defaultEnabled: true
  },
  preferences: {
    name: 'Preferences', 
    description: 'Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in.',
    required: false,
    defaultEnabled: false
  },
  statistics: {
    name: 'Statistics',
    description: 'Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.',
    required: false,
    defaultEnabled: false
  },
  marketing: {
    name: 'Marketing',
    description: 'Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
    required: false,
    defaultEnabled: false
  },
  unclassified: {
    name: 'Unclassified',
    description: 'Unclassified cookies are cookies that we are in the process of classifying, together with the providers of individual cookies.',
    required: false,
    defaultEnabled: false
  }
}

export const EnterpriseConsentManager = ({
  websiteName = 'This website',
  showBanner = true,
  enabledCategories = Object.keys(COOKIE_CATEGORIES),
  customCategories = {},
  onConsentChange = () => {},
  onConsentSave = () => {},
  privacyPolicyUrl = null,
  contactInfo = null,
  cookieDeclarationUrl = null,
  position = 'bottom',
  companyName = 'Lucitra',
  ...rest
}) => {
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [activeTab, setActiveTab] = useState('consent')
  const [consent, setConsent] = useState({})
  const [consentId, setConsentId] = useState(null)
  const [consentDate, setConsentDate] = useState(null)
  const [hasUserChoice, setHasUserChoice] = useState(false)

  // Merge custom categories with defaults
  const categories = { ...COOKIE_CATEGORIES, ...customCategories }
  const activeCategories = enabledCategories.filter(cat => categories[cat])

  useEffect(() => {
    // Load existing consent from localStorage
    const savedConsent = localStorage.getItem('lucitra_cookie_consent')
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent)
        setConsent(parsed.preferences || {})
        setConsentId(parsed.consentId)
        setConsentDate(parsed.timestamp)
        setHasUserChoice(true)
      } catch (e) {
        console.warn('Failed to parse saved consent:', e)
      }
    } else {
      // Initialize with defaults
      const defaultConsent = {}
      activeCategories.forEach(categoryKey => {
        defaultConsent[categoryKey] = categories[categoryKey].defaultEnabled
      })
      setConsent(defaultConsent)
    }
  }, [])

  const generateConsentId = () => {
    return 'consent_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  const saveConsent = (consentData) => {
    const timestamp = new Date().toISOString()
    const newConsentId = generateConsentId()
    
    const consentRecord = {
      consentId: newConsentId,
      timestamp,
      preferences: consentData,
      version: '1.0',
      website: websiteName
    }

    localStorage.setItem('lucitra_cookie_consent', JSON.stringify(consentRecord))
    
    setConsent(consentData)
    setConsentId(newConsentId)
    setConsentDate(timestamp)
    setHasUserChoice(true)
    
    onConsentChange(consentData)
    onConsentSave(consentRecord)
  }

  const handleAcceptAll = () => {
    const allAccepted = {}
    activeCategories.forEach(categoryKey => {
      allAccepted[categoryKey] = true
    })
    saveConsent(allAccepted)
    setShowConsentModal(false)
  }

  const handleAcceptNecessary = () => {
    const necessaryOnly = {}
    activeCategories.forEach(categoryKey => {
      necessaryOnly[categoryKey] = categories[categoryKey].required
    })
    saveConsent(necessaryOnly)
    setShowConsentModal(false)
  }

  const handleCategoryToggle = (categoryKey) => {
    if (categories[categoryKey].required) return
    
    setConsent(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }))
  }

  const handleSavePreferences = () => {
    saveConsent(consent)
    setShowConsentModal(false)
  }

  // Don't show banner if user has already made a choice
  if (!showBanner || hasUserChoice) {
    return (
      <>
        {/* Settings button for returning users */}
        {hasUserChoice && (
          <ModularButton
            variant="ghost"
            size="sm"
            onClick={() => setShowConsentModal(true)}
            leftIcon={<IconSettings size={16} />}
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              zIndex: 1000,
              backgroundColor: 'white',
              border: '1px solid gray'
            }}
          >
            Cookie Settings
          </ModularButton>
        )}
        
        {showConsentModal && (
          <CookieConsentModal
            categories={categories}
            activeCategories={activeCategories}
            consent={consent}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onCategoryToggle={handleCategoryToggle}
            onAcceptAll={handleAcceptAll}
            onAcceptNecessary={handleAcceptNecessary}
            onSavePreferences={handleSavePreferences}
            onClose={() => setShowConsentModal(false)}
            websiteName={websiteName}
            privacyPolicyUrl={privacyPolicyUrl}
            contactInfo={contactInfo}
            cookieDeclarationUrl={cookieDeclarationUrl}
            consentId={consentId}
            consentDate={consentDate}
            companyName={companyName}
          />
        )}
      </>
    )
  }

  return (
    <>
      {/* Simple Banner */}
      <div style={{
        position: 'fixed',
        bottom: position === 'bottom' ? 0 : 'auto',
        top: position === 'top' ? 0 : 'auto',
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ModularCard variant="primary">
            <Group justify="space-between" align="flex-start">
              <Group gap="lg" style={{ flex: 1 }}>
                <IconCookieMan size={32} color="black" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <Text fw={600} c="black" mb="xs">
                    {websiteName} uses cookies
                  </Text>
                  <Text size="sm" c="gray.7">
                    We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. 
                    We also share information about your use of our site with our partners.
                  </Text>
                </div>
              </Group>
              
              <Group gap="sm" style={{ flexShrink: 0 }}>
                <ModularButton
                  variant="primary"
                  onClick={handleAcceptAll}
                  leftIcon={<IconCheck size={16} />}
                >
                  Accept All
                </ModularButton>
                
                <ModularButton
                  variant="outline"
                  onClick={handleAcceptNecessary}
                >
                  Necessary Only
                </ModularButton>
                
                <ModularButton
                  variant="ghost"
                  onClick={() => setShowConsentModal(true)}
                  leftIcon={<IconSettings size={16} />}
                >
                  Customize
                </ModularButton>
              </Group>
            </Group>
          </ModularCard>
        </div>
      </div>

      {/* Detailed Modal */}
      {showConsentModal && (
        <CookieConsentModal
          categories={categories}
          activeCategories={activeCategories}
          consent={consent}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCategoryToggle={handleCategoryToggle}
          onAcceptAll={handleAcceptAll}
          onAcceptNecessary={handleAcceptNecessary}
          onSavePreferences={handleSavePreferences}
          onClose={() => setShowConsentModal(false)}
          websiteName={websiteName}
          privacyPolicyUrl={privacyPolicyUrl}
          contactInfo={contactInfo}
          cookieDeclarationUrl={cookieDeclarationUrl}
          consentId={consentId}
          consentDate={consentDate}
          companyName={companyName}
        />
      )}
    </>
  )
}

// Detailed consent modal component
const CookieConsentModal = ({
  categories,
  activeCategories,
  consent,
  activeTab,
  onTabChange,
  onCategoryToggle,
  onAcceptAll,
  onAcceptNecessary,
  onSavePreferences,
  onClose,
  websiteName,
  privacyPolicyUrl,
  contactInfo,
  cookieDeclarationUrl,
  consentId,
  consentDate,
  companyName
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <ModularCard variant="primary" padding="xl">
          {/* Header */}
          <Group justify="space-between" mb="xl">
            <Group gap="sm">
              <IconCookieMan size={28} color="black" />
              <Text fw={600} size="xl" c="black">Cookie Settings</Text>
            </Group>
            <ModularButton
              variant="ghost"
              onClick={onClose}
              leftIcon={<IconX size={16} />}
            >
              Close
            </ModularButton>
          </Group>

          {/* Tab Navigation */}
          <Group mb="xl" gap="sm">
            <TabButton
              active={activeTab === 'consent'}
              onClick={() => onTabChange('consent')}
            >
              Consent
            </TabButton>
            <TabButton
              active={activeTab === 'details'}
              onClick={() => onTabChange('details')}
            >
              Details
            </TabButton>
            <TabButton
              active={activeTab === 'about'}
              onClick={() => onTabChange('about')}
            >
              About
            </TabButton>
          </Group>

          {/* Consent Tab */}
          {activeTab === 'consent' && (
            <Stack gap="lg">
              <Text c="gray.7" mb="md">
                {websiteName} uses cookies to personalise content and ads, to provide social media features and to analyse our traffic. 
                We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you've provided to them or that they've collected from your use of their services.
              </Text>

              {/* Cookie Categories */}
              <Stack gap="md">
                {activeCategories.map(categoryKey => {
                  const category = categories[categoryKey]
                  const isEnabled = consent[categoryKey]
                  
                  return (
                    <ModularCard key={categoryKey} variant="secondary">
                      <Group justify="space-between" align="flex-start">
                        <div style={{ flex: 1 }}>
                          <Group gap="sm" mb="xs">
                            <Text fw={600} c="black">{category.name}</Text>
                            {category.required && (
                              <ModularBadge variant="primary" size="xs">
                                REQUIRED
                              </ModularBadge>
                            )}
                          </Group>
                          <Text size="sm" c="gray.7">
                            {category.description}
                          </Text>
                        </div>
                        
                        <ModularButton
                          variant={isEnabled ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => onCategoryToggle(categoryKey)}
                          disabled={category.required}
                          leftIcon={isEnabled ? <IconCheck size={16} /> : <IconX size={16} />}
                        >
                          {isEnabled ? 'Enabled' : 'Disabled'}
                        </ModularButton>
                      </Group>
                    </ModularCard>
                  )
                })}
              </Stack>

              {/* Action Buttons */}
              <Group justify="center" gap="md" mt="xl">
                <ModularButton
                  variant="primary"
                  onClick={onAcceptAll}
                  leftIcon={<IconCheck size={16} />}
                >
                  Accept All Cookies
                </ModularButton>
                <ModularButton
                  variant="secondary"
                  onClick={onSavePreferences}
                >
                  Save My Preferences
                </ModularButton>
                <ModularButton
                  variant="outline"
                  onClick={onAcceptNecessary}
                >
                  Accept Necessary Only
                </ModularButton>
              </Group>
            </Stack>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <Stack gap="lg">
              <Text fw={600} c="black" size="lg">Cookie Declaration</Text>
              
              <AlertBox variant="info" icon={<IconInfoCircle size={16} />}>
                Cookie declaration last updated on {new Date().toLocaleDateString()} by {companyName}
              </AlertBox>

              <Text c="gray.7">
                Cookies are small text files that can be used by websites to make a user's experience more efficient.
              </Text>

              <Text c="gray.7">
                The law states that we can store cookies on your device if they are strictly necessary for the operation of this site. 
                For all other types of cookies we need your permission.
              </Text>

              <Text c="gray.7">
                This site uses different types of cookies. Some cookies are placed by third party services that appear on our pages.
              </Text>

              <Text c="gray.7">
                You can at any time change or withdraw your consent from the Cookie Declaration on our website.
              </Text>

              {/* Consent Information */}
              {consentId && (
                <ModularCard variant="accent">
                  <Text fw={600} c="black" mb="sm">Your Consent Information</Text>
                  <Stack gap="xs">
                    <Group gap="sm">
                      <Text size="sm" c="gray.7">Consent ID:</Text>
                      <CodeBlock variant="inline">{consentId}</CodeBlock>
                    </Group>
                    <Group gap="sm">
                      <Text size="sm" c="gray.7">Consent Date:</Text>
                      <CodeBlock variant="inline">
                        {consentDate ? new Date(consentDate).toLocaleString() : 'Not set'}
                      </CodeBlock>
                    </Group>
                  </Stack>
                  <Text size="xs" c="gray.6" mt="sm">
                    Please state your consent ID and date when you contact us regarding your consent.
                  </Text>
                </ModularCard>
              )}

              {cookieDeclarationUrl && (
                <ModularButton
                  variant="link"
                  onClick={() => window.open(cookieDeclarationUrl, '_blank')}
                >
                  View Full Cookie Declaration
                </ModularButton>
              )}
            </Stack>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <Stack gap="lg">
              <Text fw={600} c="black" size="lg">About Cookies & Privacy</Text>
              
              <Text c="gray.7">
                Learn more about who we are, how you can contact us and how we process personal data in our Privacy Policy.
              </Text>

              <Text c="gray.7">
                Please state your consent ID and date when you contact us regarding your consent.
              </Text>

              <Stack gap="md">
                {privacyPolicyUrl && (
                  <ModularButton
                    variant="link"
                    onClick={() => window.open(privacyPolicyUrl, '_blank')}
                  >
                    View Privacy Policy
                  </ModularButton>
                )}

                {contactInfo && (
                  <ModularCard variant="secondary">
                    <Text fw={600} c="black" mb="sm">Contact Information</Text>
                    <Text size="sm" c="gray.7">{contactInfo}</Text>
                  </ModularCard>
                )}
              </Stack>
            </Stack>
          )}
        </ModularCard>
      </div>
    </div>
  )
}

EnterpriseConsentManager.propTypes = {
  websiteName: PropTypes.string,
  showBanner: PropTypes.bool,
  enabledCategories: PropTypes.arrayOf(PropTypes.string),
  customCategories: PropTypes.object,
  onConsentChange: PropTypes.func,
  onConsentSave: PropTypes.func,
  privacyPolicyUrl: PropTypes.string,
  contactInfo: PropTypes.string,
  cookieDeclarationUrl: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  companyName: PropTypes.string
}

EnterpriseConsentManager.displayName = 'EnterpriseConsentManager'

export default EnterpriseConsentManager