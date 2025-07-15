/**
 * Privacy Enhancing Technology - Storybook Showcase
 * 
 * These stories demonstrate Lucitra's PET business capabilities:
 * 1. Enterprise Privacy Manager ($50K-500K annual licenses)
 * 2. Gaming Privacy Demo (showcase for prospects)
 * 3. Privacy Budget Visualization (key differentiator)
 */

import { useState } from 'react'
import { Stack, Container, Text, Group, Badge, Alert } from '@mantine/core'
import { IconRocket, IconCurrencyDollar, IconTarget } from '@tabler/icons-react'

import { EnterprisePrivacyManager } from './EnterprisePrivacyManager'
import { GamingPrivacyConsent } from './GamingPrivacyConsent'
import { PrivacyBudgetVisualization } from './PrivacyBudgetVisualization'

export default {
  title: 'Business Components/Privacy Suite/PET Business Suite',
  component: EnterprisePrivacyManager,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Privacy Enhancing Technology Business Suite

Lucitra's comprehensive PET platform enabling:
- **Immediate Revenue**: Enterprise privacy solutions ($50K-500K annually)
- **Technology Demonstration**: Gaming platform showcasing capabilities  
- **Future Pipeline**: Training data for robotics/AI applications

## Business Model
- Target Market: $3.8-6.4B market growing at 24-27% CAGR
- Primary customers: Financial services, healthcare, government, tech companies
- Revenue streams: Platform licensing, professional services, API usage, compliance-as-a-service

## Technology Stack
- Differential Privacy with configurable ε-budgets
- Federated Learning (NVIDIA FLARE integration)
- Confidential Computing with TEE protection
- Homomorphic Encryption for ML operations
- Real-time compliance monitoring
        `
      }
    }
  }
}

// Enterprise Privacy Manager - Primary Revenue Product
export const EnterpriseProduct = {
  name: 'Enterprise Privacy Manager',
  render: (args) => {
    const [complianceData, setComplianceData] = useState(null)
    
    return (
      <Container size="xl" py="xl">
        <Alert 
          mb="xl" 
          icon={<IconCurrencyDollar color="black" />}
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid gray',
            borderRadius: 0
          }}
        >
          <Group justify="space-between">
            <div>
              <Text fw={600} c="black">Revenue Product - Enterprise License</Text>
              <Text size="sm" c="gray.7">Target: $50K-500K annual recurring revenue per customer</Text>
            </div>
            <div style={{ 
              backgroundColor: 'black', 
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 600
            }}>
              WHITE-LABEL READY
            </div>
          </Group>
        </Alert>
        
        <EnterprisePrivacyManager
          {...args}
          onComplianceChange={setComplianceData}
          onAuditExport={() => alert('ROPA (Record of Processing Activities) exported')}
        />
        
        {complianceData && (
          <Alert 
            mt="lg" 
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid gray',
              borderRadius: 0
            }}
          >
            <Text size="sm" c="black">
              Real-time compliance data: Score {complianceData.score}% | 
              Updated {new Date(complianceData.timestamp).toLocaleTimeString()}
            </Text>
          </Alert>
        )}
      </Container>
    )
  },
  args: {
    customBranding: {
      title: 'Acme Corp Privacy Manager',
      subtitle: 'Enterprise Privacy Platform',
      primaryColor: '#2563eb',
      borderColor: '#e5e7eb'
    }
  }
}

// Gaming Privacy Demo - Technology Showcase
export const GamingDemo = {
  name: 'Gaming Privacy Demo',
  render: (args) => {
    const [consentData, setConsentData] = useState(null)
    const [privacyBudget, setPrivacyBudget] = useState(100)
    
    return (
      <Container size="xl" py="xl">
        <Alert 
          mb="xl" 
          icon={<IconTarget color="black" />}
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid gray',
            borderRadius: 0
          }}
        >
          <Group justify="space-between">
            <div>
              <Text fw={600} c="black">Technology Demonstration Platform</Text>
              <Text size="sm" c="gray.7">Showcase PET capabilities to enterprise prospects</Text>
            </div>
            <div style={{ 
              backgroundColor: 'black', 
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 600
            }}>
              DEMO & TRAINING DATA
            </div>
          </Group>
        </Alert>
        
        <Stack gap="xl">
          <GamingPrivacyConsent
            {...args}
            onConsentChange={setConsentData}
            onPrivacyBudgetUpdate={setPrivacyBudget}
          />
          
          <PrivacyBudgetVisualization
            currentBudget={privacyBudget}
            epsilon={0.5}
            realTimeUpdates={true}
            onBudgetAlert={(alert) => console.log('Budget alert:', alert)}
          />
        </Stack>
        
        {consentData && (
          <Alert 
            mt="lg" 
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid gray',
              borderRadius: 0
            }}
          >
            <Text size="sm" c="black">
              User Consents: {Object.values(consentData.consents).filter(Boolean).length}/4 | 
              Privacy Budget: {consentData.privacyBudget}% | 
              Estimated Utility: {consentData.estimatedUtility.toFixed(0)}%
            </Text>
          </Alert>
        )}
      </Container>
    )
  },
  args: {
    showTechnicalDetails: true,
    gameConfig: {
      gameTitle: 'Text-to-3D Worlds',
      collectiveAI: true
    }
  }
}

// Privacy Budget Monitor - Key Differentiator
export const PrivacyBudgetMonitor = {
  name: 'Privacy Budget Visualization',
  render: (args) => {
    const [alerts, setAlerts] = useState([])
    
    return (
      <Container size="xl" py="xl">
        <Alert 
          mb="xl" 
          icon={<IconRocket color="black" />}
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid gray',
            borderRadius: 0
          }}
        >
          <Group justify="space-between">
            <div>
              <Text fw={600} c="black">Key Differentiator - Real-time Privacy Monitoring</Text>
              <Text size="sm" c="gray.7">Mathematical privacy guarantees with visual feedback</Text>
            </div>
            <div style={{ 
              backgroundColor: 'black', 
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 600
            }}>
              COMPETITIVE ADVANTAGE
            </div>
          </Group>
        </Alert>
        
        <PrivacyBudgetVisualization
          {...args}
          onBudgetAlert={(alert) => {
            setAlerts(prev => [alert, ...prev.slice(0, 4)])
          }}
        />
        
        {alerts.length > 0 && (
          <Alert mt="lg" color="orange">
            <Text fw={600} size="sm">Recent Alerts ({alerts.length})</Text>
            {alerts.slice(0, 2).map(alert => (
              <Text key={alert.id} size="xs">
                {alert.message} at {alert.timestamp.toLocaleTimeString()}
              </Text>
            ))}
          </Alert>
        )}
      </Container>
    )
  },
  args: {
    currentBudget: 65,
    epsilon: 1.0,
    realTimeUpdates: true
  }
}

// Complete Business Demo - Full PET Suite
export const CompletePETSuite = {
  name: 'Complete PET Business Suite',
  render: () => {
    const [enterpriseData, setEnterpriseData] = useState(null)
    const [gamingData, setGamingData] = useState(null)
    const [privacyBudget, setPrivacyBudget] = useState(85)
    
    return (
      <Container size="xl" py="xl">
        <Alert 
          mb="xl" 
          icon={<IconRocket color="black" />}
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid gray',
            borderRadius: 0
          }}
        >
          <Group justify="space-between">
            <div>
              <Text fw={600}>Complete Lucitra PET Business Platform</Text>
              <Text size="sm">
                Enterprise revenue engine + Gaming demo + Future robotics pipeline
              </Text>
            </div>
            <Group gap="xs">
              <Badge color="green">Revenue</Badge>
              <Badge color="blue">Demo</Badge>
              <Badge color="purple">Pipeline</Badge>
            </Group>
          </Group>
        </Alert>
        
        <Stack gap="xl">
          {/* Enterprise Product */}
          <div>
            <Text fw={600} mb="md" size="lg">💼 Enterprise Privacy Manager</Text>
            <EnterprisePrivacyManager
              customBranding={{
                title: 'Lucitra Security Platform',
                subtitle: 'Privacy Enhancing Technology',
                primaryColor: '#7c3aed'
              }}
              onComplianceChange={setEnterpriseData}
            />
          </div>
          
          {/* Gaming Demo */}
          <div>
            <Text fw={600} mb="md" size="lg">🎮 Gaming Privacy Demo</Text>
            <GamingPrivacyConsent
              showTechnicalDetails={true}
              onConsentChange={setGamingData}
              onPrivacyBudgetUpdate={setPrivacyBudget}
            />
          </div>
          
          {/* Privacy Budget Monitor */}
          <div>
            <Text fw={600} mb="md" size="lg">📊 Real-time Privacy Monitoring</Text>
            <PrivacyBudgetVisualization
              currentBudget={privacyBudget}
              epsilon={0.75}
              realTimeUpdates={true}
            />
          </div>
        </Stack>
        
        {/* Business Metrics Summary */}
        <Alert mt="xl" color="green">
          <Text fw={600} mb="sm">Business Intelligence Dashboard</Text>
          <Group justify="space-between">
            <Text size="sm">
              Enterprise Compliance: {enterpriseData?.score || 85}%
            </Text>
            <Text size="sm">
              Gaming Adoption: {gamingData ? 
                Object.values(gamingData.consents).filter(Boolean).length : 0}/4 features
            </Text>
            <Text size="sm">
              Privacy Budget: {privacyBudget}%
            </Text>
          </Group>
        </Alert>
      </Container>
    )
  }
}

// White-label Customization Demo
export const WhiteLabelDemo = {
  name: 'White-label Customization',
  render: () => (
    <Container size="xl" py="xl">
      <Alert mb="xl" color="teal">
        <Text fw={600}>White-label Customization Options</Text>
        <Text size="sm">Demonstrate how customers can brand the PET platform</Text>
      </Alert>
      
      <Stack gap="xl">
        <EnterprisePrivacyManager
          customBranding={{
            title: 'Goldman Sachs Privacy Center',
            subtitle: 'Financial Data Protection Platform',
            primaryColor: '#0066cc',
            borderColor: '#0066cc'
          }}
        />
        
        <EnterprisePrivacyManager
          customBranding={{
            title: 'Johns Hopkins Privacy Hub',
            subtitle: 'Healthcare Research Platform',
            primaryColor: '#dc2626',
            borderColor: '#dc2626'
          }}
        />
      </Stack>
    </Container>
  )
}