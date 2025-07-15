/**
 * Privacy Settings Components
 * 
 * Settings button and current settings display
 * Monochrome design with clear status indicators
 */

import React from 'react';
import { 
  Card, 
  Title, 
  Text, 
  Group, 
  Stack,
  Button,
  ActionIcon
} from '@mantine/core';
import { IconLock, IconSettings } from '@tabler/icons-react';
import { useGranularAnalytics } from './GranularAnalytics.jsx';

// Fixed privacy settings button
export const PrivacySettingsButton = () => {
  const { setShowConsentModal } = useGranularAnalytics();
  
  return (
    <ActionIcon
      onClick={() => setShowConsentModal(true)}
      size="lg"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        backgroundColor: 'black',
        color: 'white',
        border: '2px solid black',
        borderRadius: 0,
        zIndex: 30
      }}
      title="Privacy Settings"
    >
      <IconLock size={18} />
    </ActionIcon>
  );
};

// Current privacy settings dashboard
export const CurrentPrivacySettings = () => {
  const { consentSettings, categories, canTrack } = useGranularAnalytics();
  
  return (
    <Card
      style={{
        backgroundColor: 'white',
        border: '2px solid black',
        borderRadius: 0
      }}
      p="lg"
    >
      <Group mb="lg">
        <IconSettings size={24} color="black" />
        <Title order={3} c="black">Current Privacy Settings</Title>
      </Group>
      
      <Stack gap="sm">
        {Object.entries(categories).map(([key, category]) => (
          <Card
            key={key}
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid gray',
              borderRadius: 0
            }}
            p="md"
          >
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={600} c="black" size="sm" mb="xs">
                  {category.name}
                </Text>
                <Text size="xs" c="gray.7">
                  {category.description}
                </Text>
              </div>
              
              <div
                style={{
                  backgroundColor: canTrack(key) ? 'black' : 'white',
                  color: canTrack(key) ? 'white' : 'gray',
                  border: canTrack(key) ? '1px solid black' : '1px solid gray',
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontWeight: 600
                }}
              >
                {canTrack(key) ? 'ENABLED' : 'DISABLED'}
              </div>
            </Group>
          </Card>
        ))}
      </Stack>
      
      {consentSettings.timestamp && (
        <Text size="xs" c="gray.6" mt="md">
          Last updated: {new Date(consentSettings.timestamp).toLocaleString()}
        </Text>
      )}
    </Card>
  );
};

// Inline settings toggle for pages
export const InlinePrivacyToggle = ({ category, label }) => {
  const { canTrack, setShowConsentModal } = useGranularAnalytics();
  
  return (
    <Group gap="sm">
      <div
        style={{
          backgroundColor: canTrack(category) ? 'black' : 'white',
          color: canTrack(category) ? 'white' : 'gray',
          border: canTrack(category) ? '1px solid black' : '1px solid gray',
          padding: '2px 6px',
          fontSize: '10px',
          fontWeight: 600
        }}
      >
        {label}: {canTrack(category) ? 'ON' : 'OFF'}
      </div>
      
      <Button
        onClick={() => setShowConsentModal(true)}
        variant="subtle"
        size="xs"
        style={{ color: 'blue' }}
      >
        Change
      </Button>
    </Group>
  );
};

export default {
  PrivacySettingsButton,
  CurrentPrivacySettings,
  InlinePrivacyToggle
};