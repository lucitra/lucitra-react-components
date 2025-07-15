/**
 * AI Training Consent Component
 * 
 * User-facing consent interface for AI training participation
 * Integrates with the comprehensive data governance system
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
  Modal,
  Alert,
  Divider
} from '@mantine/core';
import {
  IconShield,
  IconDatabase,
  IconBrain,
  IconUsers,
  IconCheck,
  IconX,
  IconSettings,
  IconInfoCircle,
  IconLock,
  IconEye
} from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useAIDataGovernance } from './AIDataGovernance.jsx';

// Consent storage utility
const ConsentStorage = {
  load: () => {
    try {
      const stored = localStorage.getItem('lucitra_ai_training_consent');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },
  
  save: (data) => {
    try {
      localStorage.setItem('lucitra_ai_training_consent', JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }));
    } catch (error) {
      console.error('Failed to save consent:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.removeItem('lucitra_ai_training_consent');
    } catch (error) {
      console.error('Failed to clear consent:', error);
    }
  }
};

export function AITrainingConsentComponent({ 
  showBannerOnMount = true,
  onConsentChange,
  customBranding = {},
  ...rest 
}) {
  const { trackConsent, governance } = useAIDataGovernance();
  
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consentData, setConsentData] = useState(null);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    'ai-training': false,
    '3d-content-analysis': false,
    'model-improvement': false,
    'research-participation': false
  });

  useEffect(() => {
    const stored = ConsentStorage.load();
    if (stored) {
      setConsentData(stored);
      setPreferences(stored.preferences);
    } else if (showBannerOnMount) {
      // Show banner after delay to simulate real app loading
      setTimeout(() => setShowBanner(true), 1500);
    }
  }, [showBannerOnMount]);

  const saveConsent = async (newPreferences) => {
    const data = {
      preferences: newPreferences,
      jurisdiction: 'US', // In real app, detect this
      userAgent: navigator.userAgent,
      ipAddress: '192.168.1.1', // In real app, get from server
      consentMethod: 'explicit_checkbox'
    };
    
    // Save to local storage
    ConsentStorage.save(data);
    
    // Track consent in governance system
    if (governance) {
      try {
        const consentDetails = {
          purposes: Object.keys(newPreferences).filter(key => newPreferences[key]),
          dataTypes: ['usage_patterns', '3d_content', 'text_prompts'],
          processingActivities: ['ai_model_training', 'platform_improvement'],
          language: 'english',
          consentMethod: 'explicit_checkbox',
          consentString: JSON.stringify(newPreferences),
          informationProvided: [
            'purpose_of_processing',
            'types_of_data',
            'retention_period',
            'right_to_withdraw'
          ],
          granularOptions: true,
          ...data
        };
        
        await trackConsent('anonymous_user_' + Date.now(), consentDetails);
      } catch (error) {
        console.error('Failed to track consent in governance system:', error);
      }
    }
    
    setConsentData(data);
    setPreferences(newPreferences);
    setShowBanner(false);
    setShowModal(false);
    
    if (onConsentChange) {
      onConsentChange(data);
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      'ai-training': true,
      '3d-content-analysis': true,
      'model-improvement': true,
      'research-participation': true
    };
    saveConsent(allAccepted);
  };

  const rejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      'ai-training': false,
      '3d-content-analysis': false,
      'model-improvement': false,
      'research-participation': false
    };
    saveConsent(onlyEssential);
  };

  const handleCustomSave = () => {
    saveConsent(preferences);
  };

  const resetConsent = () => {
    ConsentStorage.clear();
    setConsentData(null);
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      'ai-training': false,
      '3d-content-analysis': false,
      'model-improvement': false,
      'research-participation': false
    });
    setShowBanner(true);
  };

  const togglePreference = (key) => {
    if (key === 'essential') return; // Essential cannot be toggled
    
    setPreferences(prev => {
      const newPrefs = { ...prev, [key]: !prev[key] };
      
      // If AI training is disabled, disable sub-options
      if (key === 'ai-training' && !newPrefs['ai-training']) {
        newPrefs['3d-content-analysis'] = false;
        newPrefs['model-improvement'] = false;
        newPrefs['research-participation'] = false;
      }
      
      return newPrefs;
    });
  };

  return (
    <div {...rest}>
      <Paper p="xl" shadow="md" radius="lg">
        {/* Header */}
        <Group justify="center" mb="xl">
          <div style={{ 
            background: customBranding.primaryColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '12px',
            borderRadius: '50%'
          }}>
            <IconBrain size={32} color="white" />
          </div>
        </Group>
        
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title order={1} mb="sm" c="black">
            {customBranding.title || 'Lucitra AI Privacy Center'}
          </Title>
          <Text c="dimmed">
            {customBranding.subtitle || 'Advanced privacy controls for your text-to-3D AI platform'}
          </Text>
        </div>

        {/* Current Status */}
        <Card withBorder mb="xl" p="lg">
          <Group mb="lg">
            <IconShield size={24} color="black" />
            <Title order={2}>Privacy Status</Title>
          </Group>
          
          {consentData ? (
            <Stack gap="lg">
              <Alert icon={<IconCheck />} color="green">
                <Text fw={600}>Consent preferences saved</Text>
                <Text size="sm">
                  Last updated: {new Date(consentData.timestamp).toLocaleString()}
                </Text>
              </Alert>
              
              <Grid>
                <Grid.Col span={6}>
                  <Card withBorder p="md" bg="gray.0">
                    <Text fw={600} mb="sm">Active Consents</Text>
                    <Stack gap="xs">
                      {Object.entries(preferences)
                        .filter(([_, enabled]) => enabled)
                        .map(([key]) => (
                          <Group key={key} gap="xs">
                            <IconCheck size={16} color="green" />
                            <Text size="sm">
                              {key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Text>
                          </Group>
                        ))}
                    </Stack>
                  </Card>
                </Grid.Col>
                
                <Grid.Col span={6}>
                  <Card withBorder p="md" bg="gray.0">
                    <Text fw={600} mb="sm">AI Training Impact</Text>
                    <Stack gap="xs">
                      {preferences['ai-training'] ? (
                        <Group gap="xs">
                          <IconDatabase size={16} color="blue" />
                          <Text size="sm" c="blue">
                            Your 3D creations help improve our AI models
                          </Text>
                        </Group>
                      ) : (
                        <Group gap="xs">
                          <IconX size={16} color="gray" />
                          <Text size="sm" c="dimmed">
                            Not participating in AI training
                          </Text>
                        </Group>
                      )}
                    </Stack>
                  </Card>
                </Grid.Col>
              </Grid>
            </Stack>
          ) : (
            <Alert icon={<IconInfoCircle />} color="yellow">
              <Text fw={600}>No privacy preferences set</Text>
              <Text size="sm">The consent banner will appear automatically</Text>
            </Alert>
          )}
          
          <Group mt="lg" gap="sm">
            <Button
              onClick={() => setShowBanner(true)}
              leftSection={<IconEye size={16} />}
            >
              Show Consent Banner
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowModal(true)}
              leftSection={<IconSettings size={16} />}
            >
              Manage Preferences
            </Button>
            <Button
              variant="light"
              color="red"
              onClick={resetConsent}
              leftSection={<IconX size={16} />}
            >
              Reset All
            </Button>
          </Group>
        </Card>

        {/* AI Training Explanation */}
        <Card withBorder p="lg">
          <Group mb="lg">
            <IconBrain size={24} color="purple" />
            <Title order={2}>How Your Data Improves Our AI</Title>
          </Group>
          
          <Grid mb="lg">
            <Grid.Col span={4}>
              <Card 
                p="md" 
                ta="center"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid gray',
                  borderRadius: 0
                }}
              >
                <IconUsers size={32} color="black" style={{ margin: '0 auto 8px' }} />
                <Text fw={600} c="black" mb="xs">Text Prompts</Text>
                <Text size="sm" c="gray.7">
                  Your creative descriptions help our AI understand natural language better
                </Text>
              </Card>
            </Grid.Col>
            
            <Grid.Col span={4}>
              <Card 
                p="md" 
                ta="center"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid gray',
                  borderRadius: 0
                }}
              >
                <IconDatabase size={32} color="black" style={{ margin: '0 auto 8px' }} />
                <Text fw={600} c="black" mb="xs">3D Outputs</Text>
                <Text size="sm" c="gray.7">
                  Generated 3D models help improve our spatial understanding algorithms
                </Text>
              </Card>
            </Grid.Col>
            
            <Grid.Col span={4}>
              <Card 
                p="md" 
                ta="center"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid gray',
                  borderRadius: 0
                }}
              >
                <IconSettings size={32} color="black" style={{ margin: '0 auto 8px' }} />
                <Text fw={600} c="black" mb="xs">User Feedback</Text>
                <Text size="sm" c="gray.7">
                  Your iterations and refinements teach our AI about user preferences
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
          
          <Card bg="gray.0" p="md">
            <Group mb="sm">
              <IconLock size={20} color="gray" />
              <Text fw={600}>Privacy Safeguards</Text>
            </Group>
            <Stack gap="xs">
              <Text size="sm">• All personal data is anonymized before AI training</Text>
              <Text size="sm">• You can opt out at any time without affecting your account</Text>
              <Text size="sm">• Data is encrypted both in transit and at rest</Text>
              <Text size="sm">• We never share individual creations without explicit permission</Text>
              <Text size="sm">• Compliance with GDPR, CCPA, and emerging AI regulations</Text>
            </Stack>
          </Card>
        </Card>
      </Paper>

      {/* Cookie Banner */}
      {showBanner && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          color: 'white',
          padding: '24px',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid align="center" gutter="lg">
              <Grid.Col span={8}>
                <Group gap="lg" align="flex-start">
                  <IconShield size={24} color="black" style={{ marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <Text size="lg" fw={600} c="black" mb="xs">
                      Help Build the Future of 3D AI
                    </Text>
                    <Text c="gray.2">
                      We use cookies and analyze your 3D creations to enhance our AI models. 
                      Your contributions help democratize 3D content creation for everyone. 
                      All data is anonymized and you can opt out anytime.
                    </Text>
                  </div>
                </Group>
              </Grid.Col>
              
              <Grid.Col span={4}>
                <Group justify="flex-end" gap="sm">
                  <Button
                    onClick={acceptAll}
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      border: '2px solid black'
                    }}
                    fw={600}
                  >
                    Accept All & Help Improve AI
                  </Button>
                  <Button
                    onClick={() => setShowModal(true)}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      border: '2px solid black'
                    }}
                    fw={600}
                    leftSection={<IconSettings size={16} />}
                  >
                    Customize
                  </Button>
                  <Button
                    onClick={rejectAll}
                    variant="outline"
                    color="gray"
                    fw={600}
                  >
                    Essential Only
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        title="Privacy Preferences"
        size="lg"
        scrollAreaComponent={Modal.NativeScrollArea}
      >
        <Stack gap="lg">
          {/* Essential Cookies */}
          <Card withBorder p="md" bg="gray.0">
            <Group justify="space-between" mb="sm">
              <Text fw={600}>Essential Cookies</Text>
              <Switch checked={true} disabled color="blue" />
            </Group>
            <Text size="sm" c="dimmed">
              Required for basic site functionality including authentication, security, 
              and core 3D rendering features. Cannot be disabled.
            </Text>
          </Card>

          {/* Analytics */}
          <Card withBorder p="md">
            <Group justify="space-between" mb="sm">
              <Text fw={600}>Analytics & Performance</Text>
              <Switch
                checked={preferences.analytics}
                onChange={() => togglePreference('analytics')}
                color="blue"
              />
            </Group>
            <Text size="sm" c="dimmed">
              Help us understand platform usage patterns to improve performance and user experience.
            </Text>
          </Card>

          {/* Marketing */}
          <Card withBorder p="md">
            <Group justify="space-between" mb="sm">
              <Text fw={600}>Marketing & Personalization</Text>
              <Switch
                checked={preferences.marketing}
                onChange={() => togglePreference('marketing')}
                color="blue"
              />
            </Group>
            <Text size="sm" c="dimmed">
              Enable personalized content recommendations and relevant feature suggestions.
            </Text>
          </Card>

          {/* AI Training */}
          <Card withBorder p="md" bg="blue.0">
            <Group justify="space-between" mb="sm">
              <Group>
                <IconBrain size={16} />
                <Text fw={600} c="blue.9">AI Training Participation</Text>
              </Group>
              <Switch
                checked={preferences['ai-training']}
                onChange={() => togglePreference('ai-training')}
                color="blue"
              />
            </Group>
            <Text size="sm" c="blue.7" mb="md">
              Allow your anonymized 3D creations and text prompts to help train our AI models. 
              This helps improve text-to-3D generation for all users.
            </Text>
            
            {/* Sub-options for AI training */}
            <Stack gap="sm" pl="md" style={{ borderLeft: '2px solid var(--mantine-color-blue-2)' }}>
              <Group justify="space-between">
                <Text size="sm" c="blue.8">3D Content Analysis</Text>
                <Switch
                  size="sm"
                  checked={preferences['3d-content-analysis']}
                  onChange={() => togglePreference('3d-content-analysis')}
                  disabled={!preferences['ai-training']}
                  color="blue"
                />
              </Group>
              
              <Group justify="space-between">
                <Text size="sm" c="blue.8">Model Improvement</Text>
                <Switch
                  size="sm"
                  checked={preferences['model-improvement']}
                  onChange={() => togglePreference('model-improvement')}
                  disabled={!preferences['ai-training']}
                  color="blue"
                />
              </Group>
              
              <Group justify="space-between">
                <Text size="sm" c="blue.8">Research Participation</Text>
                <Switch
                  size="sm"
                  checked={preferences['research-participation']}
                  onChange={() => togglePreference('research-participation')}
                  disabled={!preferences['ai-training']}
                  color="blue"
                />
              </Group>
            </Stack>
          </Card>
        </Stack>
        
        <Divider my="lg" />
        
        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleCustomSave}>
            Save Preferences
          </Button>
        </Group>
      </Modal>
    </div>
  );
}

AITrainingConsentComponent.propTypes = {
  showBannerOnMount: PropTypes.bool,
  onConsentChange: PropTypes.func,
  customBranding: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    primaryColor: PropTypes.string
  })
};

AITrainingConsentComponent.displayName = 'AITrainingConsentComponent';

export default AITrainingConsentComponent;