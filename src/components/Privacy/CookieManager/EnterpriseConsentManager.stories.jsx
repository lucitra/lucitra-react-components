/**
 * Enterprise Consent Manager - Storybook Stories
 * 
 * Professional enterprise-grade cookie consent system
 * Simple yet totally configurable with proper category management
 */

import React, { useState } from 'react'
import { Container, Stack, Text, Group } from '@mantine/core'
import { IconCheck, IconDatabase, IconShield } from '@tabler/icons-react'

import { EnterpriseConsentManager } from './EnterpriseConsentManager.jsx'
import { ModularCard, StatusIndicator, ModularButton, AlertBox } from '../UI'

export default {
  title: 'Business Components/Privacy Suite/Enterprise Consent Manager',
  component: EnterpriseConsentManager,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Enterprise Consent Manager

**Professional enterprise-grade cookie management**

This component provides a professional cookie consent experience that is both simple for users and totally configurable for developers. Perfect for enterprise customers who need professional cookie compliance.

## Key Features
- **Simple UX**: Clear "Accept All", "Necessary Only", "Customize" options
- **Totally Configurable**: Enable/disable categories, custom descriptions, branding
- **Legal Compliance**: Consent ID tracking, timestamps, withdrawal capabilities
- **Enterprise Ready**: Professional design, detailed cookie information
- **Category Management**: Necessary, Preferences, Statistics, Marketing, Unclassified

## Standard Cookie Categories
1. **Necessary**: Required for basic website functionality
2. **Preferences**: Language, region, UI preferences
3. **Statistics**: Anonymous analytics and usage data
4. **Marketing**: Advertising and personalization
5. **Unclassified**: Cookies being classified

## Business Benefits
- **Higher Opt-in Rates**: Clear, professional interface
- **Legal Protection**: Proper consent tracking and documentation
- **Enterprise Sales**: Professional appearance for B2B customers
- **Global Compliance**: GDPR, CCPA, PIPEDA ready
- **Brand Trust**: Transparent, user-friendly privacy controls
        `
      }
    }
  }
}

// Complete Enterprise Demo
export const EnterpriseConsentDemo = {
  name: 'Complete Enterprise Consent Demo',
  render: () => {
    const [consentData, setConsentData] = useState(null)
    const [consentRecord, setConsentRecord] = useState(null)
    
    const handleConsentChange = (consent) => {
      setConsentData(consent)
      console.log('Consent changed:', consent)
    }
    
    const handleConsentSave = (record) => {
      setConsentRecord(record)
      console.log('Consent saved:', record)
    }
    
    return (
      <div>
        <Container size="xl" py="xl">
          <Stack gap="xl">
            {/* Demo Info */}
            <ModularCard variant="primary">
              <Group gap="sm" mb="md">
                <IconShield size={24} color="black" />
                <Text fw={600} c="black" size="lg">Enterprise Consent Manager Demo</Text>
              </Group>
              <Text c="gray.7" mb="lg">
                Professional enterprise-grade cookie consent with full category management. 
                Check the bottom of the page for the consent banner, or use the settings button if you've already made a choice.
              </Text>
              
              {consentData && (
                <AlertBox
                  variant="success"
                  icon={<IconCheck size={16} />}
                  title="Consent Recorded"
                >
                  <Stack gap="xs">
                    <Text size="sm">
                      Categories: {Object.entries(consentData).filter(([_, enabled]) => enabled).map(([cat]) => cat).join(', ')}
                    </Text>
                    {consentRecord && (
                      <>
                        <Text size="sm">
                          Consent ID: {consentRecord.consentId}
                        </Text>
                        <Text size="sm">
                          Timestamp: {new Date(consentRecord.timestamp).toLocaleString()}
                        </Text>
                      </>
                    )}
                  </Stack>
                </AlertBox>
              )}
            </ModularCard>
            
            {/* Demo Features */}
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <Text c="gray.7" size="lg">
                Your main website content would go here...
              </Text>
              <Text c="gray.7" mt="md">
                Scroll down to see the cookie consent banner
              </Text>
            </div>
          </Stack>
        </Container>
        
        {/* Cookie Consent Component */}
        <EnterpriseConsentManager
          websiteName="Lucitra AI Platform"
          onConsentChange={handleConsentChange}
          onConsentSave={handleConsentSave}
          privacyPolicyUrl="https://lucitra.ai/privacy"
          contactInfo="Lucitra Inc. - privacy@lucitra.ai - +1-555-PRIVACY"
          cookieDeclarationUrl="https://lucitra.ai/cookies"
          companyName="Lucitra"
        />
      </div>
    )
  }
}

// Enterprise Configuration Demo
export const EnterpriseConfiguration = {
  name: 'Enterprise Custom Configuration',
  render: () => {
    const customCategories = {
      necessary: {
        name: 'Essential',
        description: 'Required for core platform functionality including authentication, session management, and security features.',
        required: true,
        defaultEnabled: true
      },
      preferences: {
        name: 'User Experience',
        description: 'Stores your UI preferences, language settings, and personalization choices to enhance your experience.',
        required: false,
        defaultEnabled: true
      },
      statistics: {
        name: 'Analytics',
        description: 'Anonymized usage analytics to help us improve platform performance and user experience.',
        required: false,
        defaultEnabled: false
      },
      marketing: {
        name: 'Product Updates',
        description: 'Helps us show you relevant product updates, feature announcements, and educational content.',
        required: false,
        defaultEnabled: false
      }
    }
    
    return (
      <div>
        <Container size="xl" py="xl">
          <ModularCard variant="primary">
            <Group gap="sm" mb="md">
              <IconDatabase size={24} color="black" />
              <Text fw={600} c="black" size="lg">Enterprise Custom Configuration</Text>
            </Group>
            <Text c="gray.7" mb="lg">
              This demo shows how enterprises can customize category names, descriptions, and default settings
              to match their specific use case and brand voice.
            </Text>
            
            <Stack gap="sm">
              <StatusIndicator status="success">Custom category names and descriptions</StatusIndicator>
              <StatusIndicator status="success">Branded contact information</StatusIndicator>
              <StatusIndicator status="success">Custom privacy policy integration</StatusIndicator>
              <StatusIndicator status="success">Configurable default preferences</StatusIndicator>
            </Stack>
          </ModularCard>
          
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Text c="gray.7" size="lg">
              Enterprise B2B SaaS Platform Content...
            </Text>
          </div>
        </Container>
        
        <EnterpriseConsentManager
          websiteName="Enterprise SaaS Platform"
          customCategories={customCategories}
          enabledCategories={['necessary', 'preferences', 'statistics', 'marketing']}
          privacyPolicyUrl="https://company.com/enterprise-privacy"
          contactInfo="Enterprise Support - privacy@company.com - 1-800-ENTERPRISE"
          companyName="Enterprise Corp"
        />
      </div>
    )
  }
}

// GDPR Compliance Demo
export const GDPRCompliance = {
  name: 'GDPR Compliance Features',
  render: () => {
    const [consentLog, setConsentLog] = useState([])
    
    const handleConsentSave = (record) => {
      setConsentLog(prev => [record, ...prev.slice(0, 4)])
    }
    
    return (
      <div>
        <Container size="xl" py="xl">
          <Stack gap="xl">
            <ModularCard variant="primary">
              <Text fw={600} c="black" size="lg" mb="md">GDPR Compliance Features</Text>
              <Text c="gray.7" mb="lg">
                Demonstrates the legal compliance features required for GDPR, CCPA, and other privacy regulations.
              </Text>
              
              <Stack gap="sm">
                <StatusIndicator status="success">Unique consent ID generation</StatusIndicator>
                <StatusIndicator status="success">Timestamp tracking for all consent changes</StatusIndicator>
                <StatusIndicator status="success">Granular category control</StatusIndicator>
                <StatusIndicator status="success">Consent withdrawal capability</StatusIndicator>
                <StatusIndicator status="success">Audit trail maintenance</StatusIndicator>
                <StatusIndicator status="success">Privacy policy integration</StatusIndicator>
              </Stack>
            </ModularCard>
            
            {consentLog.length > 0 && (
              <ModularCard variant="secondary">
                <Text fw={600} c="black" mb="md">Consent Audit Trail</Text>
                <Stack gap="sm">
                  {consentLog.map((record, index) => (
                    <div key={record.consentId} style={{
                      backgroundColor: 'white',
                      border: '1px solid gray',
                      padding: '12px',
                      fontFamily: 'monospace',
                      fontSize: '12px'
                    }}>
                      <Text fw={600} c="black">Consent #{index + 1}</Text>
                      <Text c="gray.7">ID: {record.consentId}</Text>
                      <Text c="gray.7">Time: {new Date(record.timestamp).toISOString()}</Text>
                      <Text c="gray.7">Categories: {Object.entries(record.preferences).filter(([_, enabled]) => enabled).map(([cat]) => cat).join(', ')}</Text>
                    </div>
                  ))}
                </Stack>
              </ModularCard>
            )}
            
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <Text c="gray.7" size="lg">
                GDPR-compliant website content...
              </Text>
            </div>
          </Stack>
        </Container>
        
        <EnterpriseConsentManager
          websiteName="GDPR-Compliant Platform"
          onConsentSave={handleConsentSave}
          privacyPolicyUrl="https://platform.eu/gdpr-privacy"
          contactInfo="Data Protection Officer - dpo@platform.eu - +33-1-PRIVACY"
          cookieDeclarationUrl="https://platform.eu/cookie-declaration"
          companyName="EU Platform Ltd"
        />
      </div>
    )
  }
}

// Minimal Configuration
export const MinimalConfiguration = {
  name: 'Minimal Simple Setup',
  render: () => (
    <div>
      <Container size="xl" py="xl">
        <ModularCard variant="primary">
          <Text fw={600} c="black" size="lg" mb="md">Minimal Configuration</Text>
          <Text c="gray.7">
            Simplest possible setup - just add the component and you're ready for cookie compliance.
            Perfect for small websites that need basic cookie consent.
          </Text>
        </ModularCard>
        
        <div style={{ textAlign: 'center', padding: '200px 0' }}>
          <Text c="gray.7" size="lg">Simple website content...</Text>
        </div>
      </Container>
      
      <EnterpriseConsentManager />
    </div>
  )
}