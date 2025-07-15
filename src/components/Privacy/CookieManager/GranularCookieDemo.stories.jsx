/**
 * Granular Cookie System - Storybook Stories
 * 
 * Clean privacy design with granular control
 * Single cookie, maximum transparency
 */

import { GranularCookieDemo } from './GranularCookieDemo.jsx';
import { 
  GranularAnalyticsProvider, 
  useGranularAnalytics 
} from './GranularAnalytics.jsx';
import { SimplePrivacyNotice } from './SimplePrivacyNotice.jsx';
import { GranularConsentModal } from './GranularConsentModal.jsx';
import { CurrentPrivacySettings } from './PrivacySettings.jsx';
import { Container, Stack, Alert, Text } from '@mantine/core';

export default {
  title: 'Business Components/Privacy Suite/Granular Cookie System',
  component: GranularCookieDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Granular Cookie System

**Single cookie with granular consent categories**

## Key Features
- **Single Cookie**: One \`lucitra_session\` cookie across all domains
- **Granular Control**: 4 simple categories (Essential, Analytics, Product, Performance)
- **Clean UX**: Transparent messaging
- **Cross-Domain**: Works across *.lucitra.ai
- **Privacy First**: No third-party tracking, complete transparency

## Design Philosophy
- Minimal but powerful
- Higher opt-in rates through transparency
- Marketing advantage over competitors
- Future-proof for privacy regulations

## Categories
- **Essential**: Required for platform functionality
- **Analytics**: Platform usage insights
- **Product**: 3D interaction tracking
- **Performance**: Technical metrics and errors
        `
      }
    }
  }
}

// Complete Demo
export const CompleteDemoSystem = {
  name: 'Complete Granular Cookie Demo',
  render: () => (
    <GranularCookieDemo />
  )
}

// Simple Notice Only
export const SimpleNoticeOnly = {
  name: 'Clean Privacy Notice',
  render: () => {
    const config = {
      cookieName: 'lucitra_session',
      domain: '.lucitra.ai',
      apiEndpoint: '/api/analytics'
    };
    
    return (
      <GranularAnalyticsProvider config={config}>
        <Container size="xl" py="xl">
          <Alert
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid gray',
              borderRadius: 0
            }}
            mb="xl"
          >
            <Text fw={600} c="black">Clean Privacy Notice</Text>
            <Text size="sm" c="gray.7">
              Clean, minimal privacy notice that appears at the bottom of the page
            </Text>
          </Alert>
          
          <div style={{ height: '300px' }}>
            <Text c="gray.7" ta="center" mt="xl">
              Your main page content would go here...
            </Text>
          </div>
        </Container>
        
        <SimplePrivacyNotice />
      </GranularAnalyticsProvider>
    );
  }
}

// Granular Modal Only
export const GranularModalOnly = {
  name: 'Granular Consent Modal',
  render: () => {
    const config = {
      cookieName: 'lucitra_session',
      domain: '.lucitra.ai',
      apiEndpoint: '/api/analytics'
    };
    
    // Mock component to show modal
    const ModalDemo = () => {
      const { setShowConsentModal } = useGranularAnalytics();
      
      return (
        <Container size="xl" py="xl">
          <Alert
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid gray',
              borderRadius: 0
            }}
            mb="xl"
          >
            <Text fw={600} c="black">Granular Consent Modal</Text>
            <Text size="sm" c="gray.7">
              Detailed privacy controls with 4 granular categories
            </Text>
          </Alert>
          
          <button
            onClick={() => setShowConsentModal(true)}
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: '2px solid black',
              padding: '12px 24px',
              cursor: 'pointer'
            }}
          >
            Show Granular Consent Modal
          </button>
          
          <GranularConsentModal />
        </Container>
      );
    };
    
    return (
      <GranularAnalyticsProvider config={config}>
        <ModalDemo />
      </GranularAnalyticsProvider>
    );
  }
}

// Privacy Settings Dashboard
export const PrivacyDashboard = {
  name: 'Privacy Settings Dashboard',
  render: () => {
    const config = {
      cookieName: 'lucitra_session',
      domain: '.lucitra.ai',
      apiEndpoint: '/api/analytics'
    };
    
    return (
      <GranularAnalyticsProvider config={config}>
        <Container size="md" py="xl">
          <Alert
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid gray',
              borderRadius: 0
            }}
            mb="xl"
          >
            <Text fw={600} c="black">Privacy Settings Dashboard</Text>
            <Text size="sm" c="gray.7">
              Current consent status and settings management
            </Text>
          </Alert>
          
          <CurrentPrivacySettings />
        </Container>
      </GranularAnalyticsProvider>
    );
  }
}

// Cross-Domain Demo
export const CrossDomainDemo = {
  name: 'Cross-Domain Cookie Sharing',
  render: () => {
    const config = {
      cookieName: 'lucitra_session',
      domain: '.lucitra.ai',
      apiEndpoint: '/api/analytics'
    };
    
    return (
      <GranularAnalyticsProvider config={config}>
        <Container size="xl" py="xl">
          <Stack gap="lg">
            <Alert
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid gray',
                borderRadius: 0
              }}
            >
              <Text fw={600} c="black">Cross-Domain Cookie Sharing</Text>
              <Text size="sm" c="gray.7">
                Single consent works across all Lucitra domains
              </Text>
            </Alert>
            
            <Text c="black">
              This demo shows how consent preferences are shared across multiple Lucitra subdomains:
            </Text>
            
            <ul style={{ color: 'gray' }}>
              <li>app.lucitra.ai (main 3D platform)</li>
              <li>docs.lucitra.ai (documentation)</li>
              <li>blog.lucitra.ai (marketing site)</li>
              <li>marketplace.lucitra.ai (asset store)</li>
            </ul>
            
            <Alert
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid gray',
                borderRadius: 0
              }}
            >
              <Text fw={600} c="black" mb="xs">How it works:</Text>
              <Text size="sm" c="gray.7">
                1. Consent is stored with domain=.lucitra.ai<br/>
                2. All subdomains can read the consent cookie<br/>
                3. Changes sync automatically across tabs/domains<br/>
                4. Users only need to consent once across all properties
              </Text>
            </Alert>
            
            <CurrentPrivacySettings />
          </Stack>
        </Container>
      </GranularAnalyticsProvider>
    );
  }
}