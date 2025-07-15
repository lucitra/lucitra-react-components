/**
 * Granular Cookie Demo
 * 
 * Complete demo showing the single-cookie granular consent system
 * Includes test buttons and real-time consent monitoring
 */

import React from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Card,
  Grid,
  Alert
} from '@mantine/core';
import { IconDatabase, IconEye, IconSettings, IconBrain } from '@tabler/icons-react';
import { 
  GranularAnalyticsProvider, 
  useGranularAnalytics 
} from './GranularAnalytics.jsx';
import { GranularConsentModal } from './GranularConsentModal.jsx';
import { SimplePrivacyNotice } from './SimplePrivacyNotice.jsx';
import { PrivacySettingsButton, CurrentPrivacySettings } from './PrivacySettings.jsx';

const TestingPanel = () => {
  const { 
    trackAnalytics, 
    trackProduct, 
    trackPerformance, 
    track3D, 
    canTrack 
  } = useGranularAnalytics();
  
  const testAnalytics = () => {
    const success = trackAnalytics('demo_analytics_event', { source: 'test' });
    alert(success ? 'Analytics event sent!' : 'Analytics disabled - event not sent');
  };
  
  const testProduct = () => {
    const success = trackProduct('demo_product_event', { feature: 'test' });
    alert(success ? 'Product event sent!' : 'Product insights disabled - event not sent');
  };
  
  const testPerformance = () => {
    const success = trackPerformance('demo_performance_event', { load_time: 123 });
    alert(success ? 'Performance event sent!' : 'Performance tracking disabled - event not sent');
  };
  
  const test3D = () => {
    track3D({
      type: 'rotate',
      tool: 'rotate_tool',
      complexity: 100,
      duration: 5,
      fps: 60,
      memoryUsage: 500,
      success: true
    });
    alert('3D interaction tracked (respects your consent settings)');
  };
  
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
        <IconDatabase size={24} color="black" />
        <Title order={3} c="black">Test Tracking</Title>
      </Group>
      
      <Stack gap="sm">
        <Button
          onClick={testAnalytics}
          fullWidth
          style={{
            backgroundColor: canTrack('analytics') ? 'black' : 'white',
            color: canTrack('analytics') ? 'white' : 'gray',
            border: canTrack('analytics') ? '2px solid black' : '1px solid gray'
          }}
          disabled={!canTrack('analytics')}
        >
          Test Analytics {!canTrack('analytics') && '(Disabled)'}
        </Button>
        
        <Button
          onClick={testProduct}
          fullWidth
          style={{
            backgroundColor: canTrack('product') ? 'black' : 'white',
            color: canTrack('product') ? 'white' : 'gray',
            border: canTrack('product') ? '2px solid black' : '1px solid gray'
          }}
          disabled={!canTrack('product')}
        >
          Test Product Insights {!canTrack('product') && '(Disabled)'}
        </Button>
        
        <Button
          onClick={testPerformance}
          fullWidth
          style={{
            backgroundColor: canTrack('performance') ? 'black' : 'white',
            color: canTrack('performance') ? 'white' : 'gray',
            border: canTrack('performance') ? '2px solid black' : '1px solid gray'
          }}
          disabled={!canTrack('performance')}
        >
          Test Performance {!canTrack('performance') && '(Disabled)'}
        </Button>
        
        <Button
          onClick={test3D}
          fullWidth
          style={{
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid black'
          }}
        >
          Test 3D Interaction (Respects Settings)
        </Button>
      </Stack>
    </Card>
  );
};

const BenefitsPanel = () => {
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
        <IconBrain size={24} color="black" />
        <Title order={3} c="black">Why Granular Control?</Title>
      </Group>
      
      <Grid>
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={600} c="black" size="sm">Benefits</Text>
            <Text size="xs" c="gray.7">• Higher user trust and opt-in rates</Text>
            <Text size="xs" c="gray.7">• Competitive marketing advantage</Text>
            <Text size="xs" c="gray.7">• Transparency builds brand loyalty</Text>
            <Text size="xs" c="gray.7">• Future-proof for privacy regulations</Text>
            <Text size="xs" c="gray.7">• Better than "all or nothing" approach</Text>
          </Stack>
        </Grid.Col>
        
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={600} c="black" size="sm">Still Simple</Text>
            <Text size="xs" c="gray.7">• Single cookie across all domains</Text>
            <Text size="xs" c="gray.7">• 4 simple categories (not 20+)</Text>
            <Text size="xs" c="gray.7">• Quick Accept All / Essential Only</Text>
            <Text size="xs" c="gray.7">• No complex vendor lists</Text>
            <Text size="xs" c="gray.7">• Clean, transparent privacy messaging</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

const GranularCookieDemoInner = () => {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <Title order={1} c="black" mb="sm">
            Granular Cookie Control Demo
          </Title>
          <Text c="gray.7">
            Single cookie, granular control, complete transparency
          </Text>
        </div>
        
        {/* Main Content */}
        <Grid>
          <Grid.Col span={6}>
            <Stack gap="lg">
              <TestingPanel />
              <BenefitsPanel />
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <CurrentPrivacySettings />
          </Grid.Col>
        </Grid>
      </Stack>
      
      {/* Privacy Components */}
      <GranularConsentModal />
      <SimplePrivacyNotice />
      <PrivacySettingsButton />
    </Container>
  );
};

export const GranularCookieDemo = ({ config }) => {
  const defaultConfig = {
    cookieName: 'lucitra_session',
    domain: '.lucitra.ai',
    apiEndpoint: '/api/analytics',
    ...config
  };
  
  return (
    <GranularAnalyticsProvider config={defaultConfig}>
      <GranularCookieDemoInner />
    </GranularAnalyticsProvider>
  );
};

export default GranularCookieDemo;