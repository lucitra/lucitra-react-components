/**
 * AI Data Governance - Storybook Stories
 * 
 * Comprehensive demos of the AI training data governance system
 * Perfect for showing enterprise customers and investors
 */

import { useState } from 'react';
import { Stack, Container, Alert, Group, Badge, Text, Button } from '@mantine/core';
import { IconRocket, IconShield, IconDatabase, IconScale } from '@tabler/icons-react';

import { 
  AIDataGovernanceProvider,
  DataClassificationDashboard,
  ComplianceDashboard,
  LegalFrameworkDisplay,
  AITrainingConsentComponent
} from './index';

export default {
  title: 'Business Components/Privacy Suite/AI Data Governance',
  component: AIDataGovernanceProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AI Training Data Governance System

**The most comprehensive AI privacy compliance platform available**

This system positions Lucitra as the global leader in AI privacy, providing:
- **Enterprise Revenue**: $50K-500K annual compliance platform licenses
- **Legal Compliance**: Exceeds GDPR, CCPA, EU AI Act, PIPEDA, LGPD, COPPA
- **Competitive Moat**: 2-3 year head start over competitors
- **Market Access**: Enter regulated industries worth $100B+ globally

## Key Features
- Automated data classification and risk assessment
- Real-time compliance monitoring across 6+ jurisdictions  
- Granular AI training consent management
- Comprehensive audit trails and reporting
- Privacy-preserving AI training techniques
- Enterprise white-labeling capabilities

## Business Impact
- **3-5x Premium Pricing**: Privacy compliance justifies enterprise pricing
- **Faster Sales Cycles**: Removes major procurement blockers
- **Government Contracts**: Enables public sector opportunities
- **Healthcare Market**: HIPAA-compliant AI for medical applications
        `
      }
    }
  }
}

// Enterprise Data Governance Suite
export const EnterpriseDataGovernance = {
  name: 'Enterprise Data Governance Suite',
  render: () => {
    const [classificationResults, setClassificationResults] = useState(null);
    
    const config = {
      complianceStandards: ['GDPR', 'CCPA', 'PIPEDA', 'LGPD', 'EU_AI_ACT', 'COPPA'],
      dataClassification: 'strict',
      auditLevel: 'comprehensive',
      retentionPolicy: 'minimal',
      anonymizationLevel: 'maximum'
    };
    
    return (
      <AIDataGovernanceProvider config={config}>
        <Container size="xl" py="xl">
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '2px solid black',
            borderRadius: 0,
            padding: '16px',
            marginBottom: '24px'
          }}>
            <Group justify="space-between">
              <div>
                <Text fw={600} c="black">Enterprise AI Data Governance Platform</Text>
                <Text size="sm" c="gray.7">
                  Complete legal compliance for AI training data - exceeds global standards
                </Text>
              </div>
              <div style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 600
              }}>
                REVENUE PRODUCT
              </div>
            </Group>
          </div>
          
          <Stack gap="xl">
            {/* Global Compliance Overview */}
            <ComplianceDashboard 
              onExportReport={(report) => {
                console.log('Exporting compliance report:', report);
                alert('Compliance report exported! Check console for details.');
              }}
            />
            
            {/* Data Classification System */}
            <DataClassificationDashboard 
              onClassificationComplete={setClassificationResults}
            />
            
            {/* Legal Framework Analysis */}
            <LegalFrameworkDisplay selectedJurisdiction="eu" />
            
            {/* Results Summary */}
            {classificationResults && (
              <div style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid gray',
                borderRadius: 0,
                padding: '12px',
                borderLeft: '4px solid black'
              }}>
                <Group gap="xs" mb="xs">
                  <IconDatabase size={16} color="black" />
                  <Text fw={600} c="black">
                    Classification Complete: Dataset {classificationResults.id}
                  </Text>
                </Group>
                <Text size="sm" c="gray.7" style={{ fontFamily: 'monospace' }}>
                  Risk Level: {classificationResults.riskLevel?.level?.toUpperCase()} | 
                  Jurisdictions: {classificationResults.jurisdictions?.join(', ').toUpperCase()} |
                  Data Types: {classificationResults.dataTypes?.length} detected
                </Text>
              </div>
            )}
          </Stack>
        </Container>
      </AIDataGovernanceProvider>
    );
  }
}

// User-Facing AI Training Consent
export const AITrainingConsent = {
  name: 'AI Training Consent Interface',
  render: () => {
    const [consentData, setConsentData] = useState(null);
    
    const config = {
      complianceStandards: ['GDPR', 'CCPA', 'EU_AI_ACT'],
      dataClassification: 'strict'
    };
    
    return (
      <AIDataGovernanceProvider config={config}>
        <Container size="xl" py="xl">
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '2px solid black',
            borderRadius: 0,
            padding: '16px',
            marginBottom: '24px'
          }}>
            <Group justify="space-between">
              <div>
                <Group gap="sm">
                  <IconShield size={20} color="black" />
                  <Text fw={600} c="black">User-Facing AI Training Consent</Text>
                </Group>
                <Text size="sm" c="gray.7">
                  Privacy-first consent management for AI model training
                </Text>
              </div>
              <div style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid gray',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 600
              }}>
                USER INTERFACE
              </div>
            </Group>
          </div>
          
          <AITrainingConsentComponent
            showBannerOnMount={false}
            onConsentChange={setConsentData}
            customBranding={{
              title: 'Lucitra AI Privacy Center',
              subtitle: 'Advanced privacy controls for your text-to-3D AI platform',
              primaryColor: '#7c3aed'
            }}
          />
          
          {consentData && (
            <div style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid gray',
              borderRadius: 0,
              padding: '12px',
              marginTop: '24px',
              borderLeft: '4px solid #28a745'
            }}>
              <Text fw={600} mb="xs" c="black">Consent Recorded Successfully</Text>
              <Text size="sm" c="gray.7" style={{ fontFamily: 'monospace' }}>
                Preferences: {Object.values(consentData.preferences).filter(Boolean).length}/7 enabled |
                Timestamp: {new Date(consentData.timestamp).toLocaleString()} |
                Version: {consentData.version}
              </Text>
            </div>
          )}
        </Container>
      </AIDataGovernanceProvider>
    );
  }
}

// Legal Framework Comparison
export const LegalFrameworkComparison = {
  name: 'Global Legal Framework Analysis',
  render: () => {
    const [selectedFramework, setSelectedFramework] = useState('eu');
    
    const config = {
      complianceStandards: ['GDPR', 'CCPA', 'PIPEDA', 'LGPD', 'EU_AI_ACT', 'COPPA'],
      auditLevel: 'comprehensive'
    };
    
    return (
      <AIDataGovernanceProvider config={config}>
        <Container size="xl" py="xl">
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '2px solid black',
            borderRadius: 0,
            padding: '16px',
            marginBottom: '24px'
          }}>
            <Group justify="space-between">
              <div>
                <Group gap="sm">
                  <IconScale size={20} color="black" />
                  <Text fw={600} c="black">Global Legal Framework Analysis</Text>
                </Group>
                <Text size="sm" c="gray.7">
                  Compare privacy and AI regulations across jurisdictions
                </Text>
              </div>
              <div style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid gray',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 600
              }}>
                LEGAL COMPLIANCE
              </div>
            </Group>
          </div>
          
          <Group mb="lg" gap="xs">
            {['eu', 'california', 'canada', 'healthcare'].map((framework) => (
              <button
                key={framework}
                onClick={() => setSelectedFramework(framework)}
                style={{
                  backgroundColor: selectedFramework === framework ? 'black' : 'white',
                  color: selectedFramework === framework ? 'white' : 'black',
                  border: selectedFramework === framework ? '2px solid black' : '1px solid gray',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                {framework.toUpperCase()}
              </button>
            ))}
          </Group>
          
          <LegalFrameworkDisplay selectedJurisdiction={selectedFramework} />
        </Container>
      </AIDataGovernanceProvider>
    );
  }
}

// Complete Business Demo
export const CompletePlatformDemo = {
  name: 'Complete AI Privacy Platform',
  render: () => {
    const [activeDemo, setActiveDemo] = useState('governance');
    const [consentData, setConsentData] = useState(null);
    const [classificationResults, setClassificationResults] = useState(null);
    
    const config = {
      complianceStandards: ['GDPR', 'CCPA', 'PIPEDA', 'LGPD', 'EU_AI_ACT', 'COPPA'],
      dataClassification: 'strict',
      auditLevel: 'comprehensive',
      retentionPolicy: 'minimal',
      anonymizationLevel: 'maximum'
    };
    
    return (
      <AIDataGovernanceProvider config={config}>
        <Container size="xl" py="xl">
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '2px solid black',
            borderRadius: 0,
            padding: '16px',
            marginBottom: '24px'
          }}>
            <Group justify="space-between">
              <div>
                <Group gap="sm">
                  <IconRocket size={20} color="black" />
                  <Text fw={600} c="black">Complete Lucitra AI Privacy Platform</Text>
                </Group>
                <Text size="sm" c="gray.7">
                  End-to-end privacy compliance for AI training data
                </Text>
              </div>
              <Group gap="xs">
                <div style={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  ENTERPRISE
                </div>
                <div style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid gray',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  USER-FACING
                </div>
                <div style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid gray',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  LEGAL
                </div>
              </Group>
            </Group>
          </div>
          
          {/* Demo Navigation */}
          <Group mb="xl" gap="sm">
            <button
              onClick={() => setActiveDemo('governance')}
              style={{
                backgroundColor: activeDemo === 'governance' ? 'black' : 'white',
                color: activeDemo === 'governance' ? 'white' : 'black',
                border: activeDemo === 'governance' ? '2px solid black' : '1px solid gray',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconDatabase size={16} />
              Data Governance
            </button>
            <button
              onClick={() => setActiveDemo('consent')}
              style={{
                backgroundColor: activeDemo === 'consent' ? 'black' : 'white',
                color: activeDemo === 'consent' ? 'white' : 'black',
                border: activeDemo === 'consent' ? '2px solid black' : '1px solid gray',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconShield size={16} />
              User Consent
            </button>
            <button
              onClick={() => setActiveDemo('legal')}
              style={{
                backgroundColor: activeDemo === 'legal' ? 'black' : 'white',
                color: activeDemo === 'legal' ? 'white' : 'black',
                border: activeDemo === 'legal' ? '2px solid black' : '1px solid gray',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconScale size={16} />
              Legal Framework
            </button>
          </Group>
          
          {/* Demo Content */}
          {activeDemo === 'governance' && (
            <Stack gap="xl">
              <ComplianceDashboard />
              <DataClassificationDashboard 
                onClassificationComplete={setClassificationResults}
              />
            </Stack>
          )}
          
          {activeDemo === 'consent' && (
            <AITrainingConsentComponent
              showBannerOnMount={false}
              onConsentChange={setConsentData}
              customBranding={{
                title: 'Lucitra AI Privacy Center',
                primaryColor: '#7c3aed'
              }}
            />
          )}
          
          {activeDemo === 'legal' && (
            <LegalFrameworkDisplay selectedJurisdiction="eu" />
          )}
          
          {/* Results Summary */}
          <Stack gap="sm" mt="xl">
            {classificationResults && (
              <div style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid gray',
                borderRadius: 0,
                padding: '12px',
                borderLeft: '4px solid black'
              }}>
                <Text fw={600} c="black">Data Classification: {classificationResults.riskLevel?.level?.toUpperCase()} risk detected</Text>
              </div>
            )}
            
            {consentData && (
              <div style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid gray',
                borderRadius: 0,
                padding: '12px',
                borderLeft: '4px solid #28a745'
              }}>
                <Text fw={600} c="black">User Consent: {Object.values(consentData.preferences).filter(Boolean).length}/7 preferences enabled</Text>
              </div>
            )}
          </Stack>
        </Container>
      </AIDataGovernanceProvider>
    );
  }
}

// White-label Enterprise Demo
export const WhiteLabelDemo = {
  name: 'White-label Enterprise Demo',
  render: () => {
    const [selectedBrand, setSelectedBrand] = useState('goldman');
    
    const brandConfigs = {
      goldman: {
        title: 'Goldman Sachs AI Privacy Center',
        subtitle: 'Financial Data Protection Platform',
        primaryColor: '#0066cc'
      },
      johns_hopkins: {
        title: 'Johns Hopkins Privacy Hub',
        subtitle: 'Healthcare Research Platform',
        primaryColor: '#dc2626'
      },
      mit: {
        title: 'MIT AI Governance Center',
        subtitle: 'Academic Research Platform',
        primaryColor: '#7c2d12'
      }
    };
    
    const config = {
      complianceStandards: ['GDPR', 'CCPA', 'HIPAA', 'FERPA'],
      dataClassification: 'strict',
      auditLevel: 'comprehensive'
    };
    
    return (
      <AIDataGovernanceProvider config={config}>
        <Container size="xl" py="xl">
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '2px solid black',
            borderRadius: 0,
            padding: '16px',
            marginBottom: '24px'
          }}>
            <Text fw={600} c="black">White-label Customization Demo</Text>
            <Text size="sm" c="gray.7">See how enterprise customers can brand the platform</Text>
          </div>
          
          <Group mb="lg" gap="sm">
            {Object.entries(brandConfigs).map(([key, brand]) => (
              <button
                key={key}
                onClick={() => setSelectedBrand(key)}
                style={{
                  backgroundColor: selectedBrand === key ? 'black' : 'white',
                  color: selectedBrand === key ? 'white' : 'black',
                  border: selectedBrand === key ? '2px solid black' : '1px solid gray',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                {brand.title.split(' ')[0]}
              </button>
            ))}
          </Group>
          
          <AITrainingConsentComponent
            showBannerOnMount={false}
            customBranding={brandConfigs[selectedBrand]}
          />
        </Container>
      </AIDataGovernanceProvider>
    );
  }
}