/**
 * Simple Privacy Notice
 * 
 * Minimal bottom banner for cookie consent
 * Clean black/white design with simple messaging
 */

import React, { useState, useEffect } from 'react';
import { Button, Group, Text, Paper } from '@mantine/core';
import { IconCookieMan } from '@tabler/icons-react';
import { useGranularAnalytics } from './GranularAnalytics.jsx';

export const SimplePrivacyNotice = () => {
  const { 
    consentSettings, 
    updateConsent, 
    setShowConsentModal 
  } = useGranularAnalytics();
  
  const [showNotice, setShowNotice] = useState(false);
  
  useEffect(() => {
    // Show simple notice if no granular choice made
    const hasChoice = consentSettings.timestamp;
    if (!hasChoice) {
      setShowNotice(true);
    }
  }, [consentSettings]);
  
  const handleAccept = () => {
    updateConsent({
      essential: true,
      analytics: true,
      product: true,
      performance: true
    });
    setShowNotice(false);
  };
  
  const handleDecline = () => {
    updateConsent({
      essential: true,
      analytics: false,
      product: false,
      performance: false
    });
    setShowNotice(false);
  };
  
  const handleCustomize = () => {
    setShowNotice(false);
    setShowConsentModal(true);
  };
  
  if (!showNotice || consentSettings.timestamp) return null;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Paper
          p="lg"
          style={{
            backgroundColor: 'white',
            border: '2px solid black',
            borderRadius: 0
          }}
        >
          <Group justify="space-between" align="flex-start">
            <Group gap="lg" style={{ flex: 1 }}>
              <IconCookieMan size={24} color="black" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <Text fw={600} c="black" mb="xs">
                  We use a single cookie
                </Text>
                <Text size="sm" c="gray.7">
                  Lucitra.ai uses one first-party cookie for analytics and platform functionality.
                  <br />
                  No third-party tracking. Complete privacy control.
                </Text>
              </div>
            </Group>
            
            <Group gap="sm" style={{ flexShrink: 0 }}>
              <Button
                onClick={handleAccept}
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  border: '2px solid black'
                }}
                size="sm"
              >
                Accept
              </Button>
              
              <Button
                onClick={handleDecline}
                variant="outline"
                style={{
                  backgroundColor: 'white',
                  color: 'gray',
                  border: '1px solid gray'
                }}
                size="sm"
              >
                Essential Only
              </Button>
              
              <Button
                onClick={handleCustomize}
                variant="subtle"
                style={{ color: 'black' }}
                size="sm"
              >
                Customize
              </Button>
            </Group>
          </Group>
        </Paper>
      </div>
    </div>
  );
};

export default SimplePrivacyNotice;