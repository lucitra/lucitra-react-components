/**
 * Production Cookie Consent Banner
 * 
 * Uses real browser cookies instead of localStorage
 * Integrates with the LucitraCookieManager for proper cookie handling
 */

import React, { useState, useEffect } from 'react';
import {
  Paper,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Switch,
  Badge,
  Card,
  Grid,
  Alert,
  Divider,
  Progress
} from '@mantine/core';
import {
  IconShield,
  IconDatabase,
  IconBrain,
  IconUsers,
  IconCheck,
  IconX,
  IconSettings,
  IconLock,
  IconEye,
  IconCookieMan
} from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useCookieManager } from './CookieManager';

// Cookie categories with descriptions
const COOKIE_CATEGORIES = {
  essential: {
    name: 'Essential Cookies',
    description: 'Required for basic site functionality including authentication, security, and core 3D rendering features. Cannot be disabled.',
    icon: IconShield,
    color: 'black',
    required: true,
    examples: ['Session management', 'Authentication', 'Security tokens', 'Load balancing']
  },
  analytics: {
    name: 'Analytics & Performance',
    description: 'Help us understand platform usage patterns to improve performance and user experience.',
    icon: IconDatabase,
    color: 'black',
    required: false,
    examples: ['Page views', 'User journeys', 'Performance metrics', 'Error tracking']
  },
  marketing: {
    name: 'Marketing & Personalization',
    description: 'Enable personalized content recommendations and relevant feature suggestions.',
    icon: IconUsers,
    color: 'black',
    required: false,
    examples: ['Content preferences', 'A/B testing', 'Feature recommendations', 'User targeting']
  },
  ai_training: {
    name: 'AI Training Participation',
    description: 'Allow your anonymized 3D creations and text prompts to help train our AI models.',
    icon: IconBrain,
    color: 'black',
    required: false,
    examples: ['3D content analysis', 'Model improvement', 'Research participation', 'Bias detection']
  }
};

export function CookieConsentBanner({
  showBannerOnMount = true,
  onConsentChange,
  customBranding = {},
  autoShow = true,
  position = 'bottom',
  minimal = false,
  ...rest
}) {
  const { 
    cookieManager, 
    setConsent 
  } = useCookieManager();
  
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    ai_training: false
  });
  const [cookiesEnabled, setCookiesEnabled] = useState(true);

  // Initialize component
  useEffect(() => {
    // Check if cookies are enabled
    const enabled = cookieManager.areCookiesEnabled();
    setCookiesEnabled(enabled);
    
    if (!enabled) {
      console.warn('Cookies are disabled in this browser');
      return;
    }
    
    // Load existing consent preferences
    const existingConsent = cookieManager.getConsentPreferences();
    const hasAnyConsent = Object.values(existingConsent).some(pref => 
      pref.timestamp && new Date(pref.timestamp).getTime() > 0
    );
    
    if (hasAnyConsent) {
      // User has already made consent choices
      const currentPrefs = {};
      Object.keys(COOKIE_CATEGORIES).forEach(category => {
        currentPrefs[category] = existingConsent[category]?.granted || category === 'essential';
      });
      setPreferences(currentPrefs);
    } else if (showBannerOnMount && autoShow) {
      // Show banner for new users
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, [cookieManager, showBannerOnMount, autoShow]);

  // Listen for consent changes from other tabs/components
  useEffect(() => {
    const handleConsentChange = (event) => {
      const { allConsents } = event.detail;
      const newPrefs = {};
      
      Object.keys(COOKIE_CATEGORIES).forEach(category => {
        newPrefs[category] = allConsents[category] || category === 'essential';
      });
      
      setPreferences(newPrefs);
      
      if (onConsentChange) {
        onConsentChange({
          preferences: newPrefs,
          timestamp: new Date().toISOString(),
          source: 'cross_tab_sync'
        });
      }
    };
    
    window.addEventListener('lucitraConsentChange', handleConsentChange);
    
    return () => {
      window.removeEventListener('lucitraConsentChange', handleConsentChange);
    };
  }, [onConsentChange]);

  const saveConsent = async (newPreferences, source = 'user_interaction') => {
    try {
      // Save each category consent
      Object.entries(newPreferences).forEach(([category, granted]) => {
        setConsent(category, granted, {
          source,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        });
      });
      
      setPreferences(newPreferences);
      setShowBanner(false);
      setShowModal(false);
      
      if (onConsentChange) {
        onConsentChange({
          preferences: newPreferences,
          timestamp: new Date().toISOString(),
          source
        });
      }
    } catch (error) {
      console.error('Failed to save consent:', error);
    }
  };

  const acceptAll = () => {
    const allAccepted = {};
    Object.keys(COOKIE_CATEGORIES).forEach(category => {
      allAccepted[category] = true;
    });
    saveConsent(allAccepted, 'accept_all');
  };

  const rejectAll = () => {
    const onlyEssential = {};
    Object.keys(COOKIE_CATEGORIES).forEach(category => {
      onlyEssential[category] = category === 'essential';
    });
    saveConsent(onlyEssential, 'reject_all');
  };

  const handleCustomSave = () => {
    saveConsent(preferences, 'custom_preferences');
  };

  const togglePreference = (category) => {
    if (category === 'essential') return; // Essential cannot be toggled
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const resetConsent = () => {
    cookieManager.clearAllCookies(true); // Keep essential cookies
    
    const resetPrefs = {};
    Object.keys(COOKIE_CATEGORIES).forEach(category => {
      resetPrefs[category] = category === 'essential';
    });
    
    setPreferences(resetPrefs);
    setShowBanner(true);
  };

  // Calculate consent completion percentage
  const totalCategories = Object.keys(COOKIE_CATEGORIES).length;
  const consentedCategories = Object.values(preferences).filter(Boolean).length;
  const consentCompletion = (consentedCategories / totalCategories) * 100;

  if (!cookiesEnabled) {
    return (
      <Alert 
        style={{ 
          backgroundColor: 'white', 
          color: 'black', 
          border: '2px solid black' 
        }}
        icon={<IconX color="black" />}
      >
        <Text fw={600} c="black">Cookies Disabled</Text>
        <Text size="sm" c="gray.7">
          Cookies are disabled in your browser. Some features may not work properly.
        </Text>
      </Alert>
    );
  }

  // Minimal mode - just the banner
  if (minimal) {
    return (
      <div {...rest}>
        {showBanner && (
          <div style={{
            position: 'fixed',
            [position]: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            color: 'black',
            padding: '16px',
            zIndex: 1000,
            border: '1px solid black',
            borderBottom: position === 'top' ? '2px solid black' : undefined,
            borderTop: position === 'bottom' ? '2px solid black' : undefined
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <Group justify="space-between" align="center">
                <Text size="sm" c="black">
                  This site uses cookies for functionality and analytics.
                </Text>
                <Group gap="xs">
                  <Button
                    onClick={acceptAll}
                    variant="filled"
                    color="black"
                    size="xs"
                    style={{ 
                      backgroundColor: 'black',
                      color: 'white',
                      border: '1px solid black'
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={rejectAll}
                    variant="outline"
                    size="xs"
                    style={{ 
                      backgroundColor: 'white',
                      color: 'black',
                      border: '1px solid black'
                    }}
                  >
                    Decline
                  </Button>
                </Group>
              </Group>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div {...rest}>
      {/* Main Consent Interface */}
      <Paper 
        p="xl" 
        style={{ 
          backgroundColor: 'white', 
          border: '2px solid black',
          borderRadius: 0 
        }}
      >
        {/* Header */}
        <Group justify="center" mb="xl">
          <div style={{ 
            backgroundColor: 'black',
            padding: '12px',
            borderRadius: 0,
            border: '1px solid black'
          }}>
            <IconCookieMan size={32} color="white" />
          </div>
        </Group>
        
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title order={1} mb="sm" c="black">
            {customBranding.title || 'Cookie Preferences'}
          </Title>
          <Text c="gray.7">
            {customBranding.subtitle || 'Control how we use cookies and process your data'}
          </Text>
        </div>

        {/* Consent Status */}
        <Card 
          style={{ 
            border: '1px solid gray', 
            backgroundColor: 'white',
            borderRadius: 0
          }} 
          mb="xl" 
          p="lg"
        >
          <Group justify="space-between" mb="md">
            <Group>
              <IconShield size={24} color="black" />
              <Title order={3} c="black">Current Status</Title>
            </Group>
            <div style={{ 
              backgroundColor: 'gray.1', 
              color: 'black',
              padding: '4px 8px',
              border: '1px solid gray',
              fontSize: '12px',
              fontWeight: 600
            }}>
              {consentCompletion.toFixed(0)}% Configured
            </div>
          </Group>
          
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: 'gray.3',
            border: '1px solid gray',
            marginBottom: '12px'
          }}>
            <div style={{ 
              width: `${consentCompletion}%`, 
              height: '100%', 
              backgroundColor: 'black'
            }} />
          </div>
          
          <Text size="sm" c="gray.7">
            {consentedCategories} of {totalCategories} cookie categories enabled
          </Text>
        </Card>

        {/* Cookie Categories */}
        <Stack gap="md" mb="xl">
          <Title order={4} c="black">Cookie Categories</Title>
          
          {Object.entries(COOKIE_CATEGORIES).map(([category, config]) => {
            const IconComponent = config.icon;
            const isEnabled = preferences[category];
            
            return (
              <Card 
                key={category} 
                p="md"
                style={{
                  border: isEnabled ? '2px solid black' : '1px solid gray',
                  backgroundColor: isEnabled ? '#f8f9fa' : 'white',
                  borderRadius: 0
                }}
              >
                <Group justify="space-between" mb="sm">
                  <Group>
                    <IconComponent size={24} color="black" />
                    <div>
                      <Text fw={600} c="black">{config.name}</Text>
                      {config.required && (
                        <div style={{ 
                          backgroundColor: 'black', 
                          color: 'white',
                          padding: '2px 6px',
                          fontSize: '10px',
                          fontWeight: 600,
                          display: 'inline-block',
                          marginTop: '2px'
                        }}>
                          REQUIRED
                        </div>
                      )}
                    </div>
                  </Group>
                  
                  <Switch
                    checked={isEnabled}
                    onChange={() => togglePreference(category)}
                    disabled={config.required}
                    color="dark"
                    size="md"
                  />
                </Group>
                
                <Text size="sm" mb="sm" c="gray.7">
                  {config.description}
                </Text>
                
                <details>
                  <summary style={{ cursor: 'pointer', fontSize: '12px', color: 'gray' }}>
                    Examples ({config.examples.length})
                  </summary>
                  <Stack gap="xs" mt="xs" pl="md">
                    {config.examples.map((example, index) => (
                      <Text key={index} size="xs" c="gray.6">• {example}</Text>
                    ))}
                  </Stack>
                </details>
              </Card>
            );
          })}
        </Stack>

        {/* Action Buttons */}
        <Group justify="center" gap="lg" mb="lg">
          <Button
            onClick={acceptAll}
            leftSection={<IconCheck size={16} />}
            size="md"
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: '2px solid black'
            }}
          >
            Accept All Cookies
          </Button>
          <Button
            onClick={handleCustomSave}
            leftSection={<IconSettings size={16} />}
            variant="outline"
            size="md"
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black'
            }}
          >
            Save Preferences
          </Button>
          <Button
            onClick={rejectAll}
            leftSection={<IconX size={16} />}
            variant="outline"
            size="md"
            style={{
              backgroundColor: 'white',
              color: 'gray.7',
              border: '1px solid gray'
            }}
          >
            Essential Only
          </Button>
        </Group>

        {/* Management Options */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'gray', margin: '24px 0' }} />
        
        <Group justify="center" gap="sm">
          <Button
            variant="subtle"
            size="sm"
            onClick={() => setShowBanner(true)}
            leftSection={<IconEye size={14} color="black" />}
            style={{ color: 'black' }}
          >
            Show Banner
          </Button>
          <Button
            variant="subtle"
            size="sm"
            onClick={resetConsent}
            leftSection={<IconX size={14} color="gray" />}
            style={{ color: 'gray' }}
          >
            Reset All
          </Button>
          <Button
            variant="subtle"
            size="sm"
            onClick={() => {
              const data = cookieManager.exportUserData();
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `lucitra-cookie-data-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            leftSection={<IconDatabase size={14} color="black" />}
            style={{ color: 'black' }}
          >
            Export Data
          </Button>
        </Group>

        {/* Privacy Information */}
        <Alert 
          icon={<IconLock color="black" />} 
          mt="lg"
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid gray',
            borderRadius: 0
          }}
        >
          <Text fw={600} mb="xs" c="black">Your Privacy Rights</Text>
          <Text size="sm" c="gray.7">
            You can change these preferences at any time. We use industry-standard security measures 
            to protect your data. All cookies are set with Secure and SameSite attributes for maximum security.
          </Text>
        </Alert>
      </Paper>

      {/* Cookie Banner (Bottom Position) */}
      {showBanner && (
        <div style={{
          position: 'fixed',
          [position]: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          color: 'black',
          padding: '16px',
          zIndex: 1000,
          border: '2px solid black',
          borderLeft: 0,
          borderRight: 0,
          borderBottom: position === 'bottom' ? 0 : '2px solid black',
          borderTop: position === 'top' ? 0 : '2px solid black'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid align="center" gutter="lg">
              <Grid.Col span={8}>
                <Group gap="lg" align="flex-start">
                  <IconCookieMan size={24} color="black" style={{ marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <Text size="lg" fw={600} c="black" mb="xs">
                      We use cookies to enhance your experience
                    </Text>
                    <Text c="gray.7" size="sm">
                      This website uses cookies to provide core functionality, analytics, and personalized content. 
                      You can customize your preferences or accept all cookies to continue.
                    </Text>
                  </div>
                </Group>
              </Grid.Col>
              
              <Grid.Col span={4}>
                <Group justify="flex-end" gap="sm">
                  <Button
                    onClick={acceptAll}
                    fw={600}
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      border: '2px solid black'
                    }}
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={() => setShowBanner(false)}
                    fw={600}
                    leftSection={<IconSettings size={16} color="black" />}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      border: '1px solid black'
                    }}
                  >
                    Customize
                  </Button>
                  <Button
                    onClick={rejectAll}
                    variant="outline"
                    fw={600}
                    style={{
                      backgroundColor: 'white',
                      color: 'gray',
                      border: '1px solid gray'
                    }}
                  >
                    Essential Only
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
}

CookieConsentBanner.propTypes = {
  showBannerOnMount: PropTypes.bool,
  onConsentChange: PropTypes.func,
  customBranding: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    primaryColor: PropTypes.string
  }),
  autoShow: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'bottom']),
  minimal: PropTypes.bool
};

CookieConsentBanner.displayName = 'CookieConsentBanner';

export default CookieConsentBanner;