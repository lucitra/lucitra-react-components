/**
 * Granular Consent Modal - Mantine UI Implementation
 * 
 * Modern modal for granular cookie consent with black/white styling
 * Clean, transparent privacy controls
 */

import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Card, 
  Switch,
  Alert,
  Divider
} from '@mantine/core';
import { IconShield, IconX, IconLock } from '@tabler/icons-react';
import { useGranularAnalytics } from './GranularAnalytics.jsx';

export const GranularConsentModal = () => {
  const { 
    consentSettings, 
    updateConsent, 
    categories, 
    showConsentModal, 
    setShowConsentModal 
  } = useGranularAnalytics();
  
  const [tempSettings, setTempSettings] = useState(consentSettings);
  
  useEffect(() => {
    setTempSettings(consentSettings);
  }, [consentSettings]);
  
  const handleToggle = (category) => {
    if (category === 'essential') return; // Can't disable essential
    
    setTempSettings(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const handleAcceptAll = () => {
    const allEnabled = Object.keys(categories).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    updateConsent(allEnabled);
  };
  
  const handleRejectAll = () => {
    updateConsent({
      essential: true,
      analytics: false,
      product: false,
      performance: false
    });
  };
  
  const handleSaveCustom = () => {
    updateConsent(tempSettings);
  };
  
  return (
    <Modal
      opened={showConsentModal}
      onClose={() => setShowConsentModal(false)}
      title={null}
      size="lg"
      centered
      styles={{
        modal: {
          backgroundColor: 'white',
          border: '2px solid black',
          borderRadius: 0
        },
        header: {
          backgroundColor: 'white',
          borderBottom: '1px solid gray',
          padding: '24px 24px 16px'
        },
        body: {
          padding: '0 24px 24px',
          backgroundColor: 'white'
        }
      }}
    >
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Group>
            <IconShield size={24} color="black" />
            <Title order={2} c="black">Your Privacy Choices</Title>
          </Group>
          <Button
            variant="subtle"
            onClick={() => setShowConsentModal(false)}
            size="xs"
            style={{ color: 'gray' }}
          >
            <IconX size={16} />
          </Button>
        </Group>
        
        {/* Intro */}
        <Stack gap="sm">
          <Text c="gray.7">
            We use a single cookie to improve your 3D platform experience. 
            Choose what data you're comfortable sharing:
          </Text>
          
          <Alert
            icon={<IconLock color="black" />}
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid gray',
              borderRadius: 0
            }}
          >
            <Text fw={600} c="black" size="sm">Privacy Promise:</Text>
            <Text c="gray.7" size="sm">
              All data stays on our servers. No third-party tracking. No data sales.
            </Text>
          </Alert>
        </Stack>
        
        {/* Categories */}
        <Stack gap="md">
          {Object.entries(categories).map(([key, category]) => (
            <Card 
              key={key} 
              style={{
                border: '1px solid gray',
                borderRadius: 0,
                backgroundColor: 'white'
              }}
              p="md"
            >
              <Group justify="space-between" align="flex-start">
                <div style={{ flex: 1 }}>
                  <Group gap="sm" mb="xs">
                    <Text fw={600} c="black">{category.name}</Text>
                    {category.required && (
                      <div style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '2px 6px',
                        fontSize: '10px',
                        fontWeight: 600
                      }}>
                        REQUIRED
                      </div>
                    )}
                  </Group>
                  
                  <Text size="sm" c="gray.7" mb="xs">
                    {category.description}
                  </Text>
                  
                  <Text size="xs" c="gray.6">
                    <span style={{ fontWeight: 600 }}>Examples:</span> {category.examples.join(', ')}
                  </Text>
                </div>
                
                <Switch
                  checked={tempSettings[key]}
                  onChange={() => handleToggle(key)}
                  disabled={category.required}
                  color="dark"
                  size="md"
                  style={{ marginLeft: '16px' }}
                />
              </Group>
            </Card>
          ))}
        </Stack>
        
        <Divider style={{ borderColor: 'gray' }} />
        
        {/* Actions */}
        <Group justify="center" gap="sm">
          <Button
            onClick={handleRejectAll}
            variant="outline"
            style={{
              backgroundColor: 'white',
              color: 'gray',
              border: '1px solid gray'
            }}
          >
            Essential Only
          </Button>
          
          <Button
            onClick={handleSaveCustom}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black'
            }}
          >
            Save Choices
          </Button>
          
          <Button
            onClick={handleAcceptAll}
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: '2px solid black'
            }}
          >
            Accept All
          </Button>
        </Group>
        
        <Text size="xs" c="gray.6" ta="center">
          You can change these settings anytime in your privacy preferences.
        </Text>
      </Stack>
    </Modal>
  );
};

export default GranularConsentModal;