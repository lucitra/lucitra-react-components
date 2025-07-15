/**
 * Legal Framework Display Component
 * 
 * Interactive display of global legal compliance frameworks
 */

import { useState } from 'react';
import {
  Paper,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  Card,
  Tabs,
  Alert,
  Code,
  List
} from '@mantine/core';
import {
  IconScale,
  IconShield,
  IconAlertTriangle,
  IconGavel,
  IconWorld,
  IconBook
} from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useAIDataGovernance } from './AIDataGovernance.jsx';

export function LegalFrameworkDisplay({ selectedJurisdiction = 'eu', ...rest }) {
  const { governance } = useAIDataGovernance();
  const [activeFramework, setActiveFramework] = useState(selectedJurisdiction);
  
  const frameworks = governance.legalFrameworks;
  const framework = frameworks[activeFramework];
  
  const getJurisdictionIcon = (jurisdiction) => {
    const icons = {
      us_federal: 'US',
      california: 'CA',
      eu: 'EU',
      canada: 'CN',
      brazil: 'BR',
      healthcare: 'HC'
    };
    return icons[jurisdiction] || 'GL';
  };
  
  const getJurisdictionName = (jurisdiction) => {
    const names = {
      us_federal: 'United States Federal',
      california: 'California State',
      eu: 'European Union',
      canada: 'Canada',
      brazil: 'Brazil',
      healthcare: 'Healthcare Global'
    };
    return names[jurisdiction] || jurisdiction;
  };
  
  const getPenaltySeverity = (penalties) => {
    if (penalties.includes('criminal') || penalties.includes('4_percent_global_revenue')) {
      return { indicator: '#dc3545', level: 'Severe' };
    }
    if (penalties.includes('25_million') || penalties.includes('7500')) {
      return { indicator: '#ffc107', level: 'High' };
    }
    return { indicator: '#28a745', level: 'Moderate' };
  };
  
  if (!framework) {
    return (
      <Paper p="xl" shadow="md" radius="lg">
        <Text>Framework not found</Text>
      </Paper>
    );
  }
  
  const penaltySeverity = getPenaltySeverity(framework.penalties);
  
  return (
    <Paper p="xl" shadow="md" radius="lg" {...rest}>
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <Group>
          <IconScale size={28} color="blue" />
          <div>
            <Title order={2}>Legal Framework Compliance</Title>
            <Text c="dimmed" size="sm">
              Global privacy and AI regulations overview
            </Text>
          </div>
        </Group>
        
        <Badge color="blue" size="lg">
          {Object.keys(frameworks).length} Jurisdictions
        </Badge>
      </Group>
      
      {/* Jurisdiction Selector */}
      <Card withBorder mb="lg" p="md">
        <Text fw={600} mb="sm">Select Jurisdiction</Text>
        <Group gap="xs">
          {Object.keys(frameworks).map((key) => (
            <Button
              key={key}
              onClick={() => setActiveFramework(key)}
              variant={activeFramework === key ? 'filled' : 'outline'}
              size="sm"
              leftSection={<span style={{ fontSize: '16px' }}>{getJurisdictionIcon(key)}</span>}
            >
              {getJurisdictionName(key)}
            </Button>
          ))}
        </Group>
      </Card>
      
      <Tabs value="overview" orientation="horizontal">
        <Tabs.List grow>
          <Tabs.Tab value="overview" leftSection={<IconWorld size={16} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="requirements" leftSection={<IconShield size={16} />}>
            Requirements
          </Tabs.Tab>
          <Tabs.Tab value="penalties" leftSection={<IconGavel size={16} />}>
            Penalties
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" pt="lg">
          <Stack gap="lg">
            {/* Framework Info */}
            <Card withBorder p="lg">
              <Group justify="space-between" mb="md">
                <Group>
                  <Text size="xl">{getJurisdictionIcon(activeFramework)}</Text>
                  <div>
                    <Title order={3}>{getJurisdictionName(activeFramework)}</Title>
                    <Text c="dimmed" size="sm">Legal framework and standards</Text>
                  </div>
                </Group>
                
                <Badge 
                  color={penaltySeverity.color} 
                  size="lg"
                  leftSection={<IconAlertTriangle size={14} />}
                >
                  {penaltySeverity.level} Penalties
                </Badge>
              </Group>
              
              {/* Legal Standards */}
              <div>
                <Group mb="sm">
                  <IconBook size={20} color="blue" />
                  <Text fw={600}>Applicable Standards</Text>
                </Group>
                <Group gap="xs">
                  {framework.standards.map((standard, index) => (
                    <Badge key={index} color="blue" variant="light">
                      {standard.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </Group>
              </div>
            </Card>
            
            {/* Key Highlights */}
            <Card withBorder p="lg">
              <Group mb="md">
                <IconShield size={20} color="green" />
                <Text fw={600}>Compliance Highlights</Text>
              </Group>
              
              <Stack gap="sm">
                {activeFramework === 'eu' && (
                  <>
                    <Alert color="blue" variant="light">
                      <Text fw={600} mb="xs">GDPR Article 6: Lawful Basis Required</Text>
                      <Text size="sm">All AI training requires valid lawful basis (consent, legitimate interest, etc.)</Text>
                    </Alert>
                    <Alert color="purple" variant="light">
                      <Text fw={600} mb="xs">EU AI Act: Risk-Based Approach</Text>
                      <Text size="sm">AI systems classified by risk level with corresponding obligations</Text>
                    </Alert>
                  </>
                )}
                
                {activeFramework === 'california' && (
                  <>
                    <Alert color="orange" variant="light">
                      <Text fw={600} mb="xs">CCPA: Consumer Rights</Text>
                      <Text size="sm">Right to know, delete, opt-out, and non-discrimination</Text>
                    </Alert>
                    <Alert color="red" variant="light">
                      <Text fw={600} mb="xs">CPRA: Enhanced Privacy Rights</Text>
                      <Text size="sm">Sensitive personal information requires explicit consent</Text>
                    </Alert>
                  </>
                )}
                
                {activeFramework === 'healthcare' && (
                  <>
                    <Alert color="red" variant="light">
                      <Text fw={600} mb="xs">HIPAA: PHI Protection</Text>
                      <Text size="sm">Protected Health Information requires enhanced safeguards</Text>
                    </Alert>
                    <Alert color="blue" variant="light">
                      <Text fw={600} mb="xs">FDA AI Guidance</Text>
                      <Text size="sm">AI/ML-based medical devices require clinical validation</Text>
                    </Alert>
                  </>
                )}
              </Stack>
            </Card>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="requirements" pt="lg">
          <Stack gap="md">
            <Text fw={600} size="lg" mb="md">Key Compliance Requirements</Text>
            
            {Object.entries(framework.requirements).map(([requirement, description]) => (
              <Card key={requirement} withBorder p="md">
                <Group justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Text fw={600} mb="xs" tt="capitalize">
                      {requirement.replace(/_/g, ' ')}
                    </Text>
                    <Code block style={{ fontSize: '12px', padding: '8px' }}>
                      {description}
                    </Code>
                  </div>
                  
                  <Badge 
                    color={description.includes('required') || description.includes('mandatory') ? 'red' : 'blue'}
                    variant="light"
                  >
                    {description.includes('required') || description.includes('mandatory') ? 'Mandatory' : 'Recommended'}
                  </Badge>
                </Group>
              </Card>
            ))}
            
            {/* Implementation Checklist */}
            <Card withBorder p="lg" bg="green.0">
              <Group mb="md">
                <IconShield size={20} color="green" />
                <Text fw={600} c="green.9">Lucitra Implementation Status</Text>
              </Group>
              
              <List 
                spacing="xs" 
                size="sm"
                icon={<IconShield size={16} color="green" />}
              >
                <List.Item>Data classification and risk assessment implemented</List.Item>
                <List.Item>Granular consent management with withdrawal rights</List.Item>
                <List.Item>Differential privacy and anonymization techniques</List.Item>
                <List.Item>Comprehensive audit trail and compliance reporting</List.Item>
                <List.Item>Cross-border data transfer safeguards</List.Item>
                <List.Item>AI ethics review and bias assessment processes</List.Item>
              </List>
            </Card>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="penalties" pt="lg">
          <Stack gap="lg">
            {/* Penalty Overview */}
            <Alert 
              icon={<IconAlertTriangle />} 
              style={{
                backgroundColor: penaltySeverity.indicator === '#000000' ? '#e9ecef' : '#f8f9fa',
                border: `1px solid ${penaltySeverity.indicator === '#000000' ? '#adb5bd' : '#dee2e6'}`
              }}
            >
              <Text fw={600} mb="xs">Maximum Penalties: {framework.penalties}</Text>
              <Text size="sm">
                Severity Level: {penaltySeverity.level}
              </Text>
            </Alert>
            
            {/* Penalty Breakdown */}
            <Card withBorder p="lg">
              <Text fw={600} mb="md">Penalty Structure Analysis</Text>
              
              <Stack gap="md">
                {activeFramework === 'eu' && (
                  <div>
                    <Text fw={600} size="sm" mb="xs">GDPR Fines (Article 83)</Text>
                    <List size="sm" spacing="xs">
                      <List.Item>Administrative fines up to €20 million OR</List.Item>
                      <List.Item>4% of total worldwide annual turnover (whichever is higher)</List.Item>
                      <List.Item>Additional damages for material or non-material harm</List.Item>
                    </List>
                  </div>
                )}
                
                {activeFramework === 'california' && (
                  <div>
                    <Text fw={600} size="sm" mb="xs">CCPA/CPRA Penalties</Text>
                    <List size="sm" spacing="xs">
                      <List.Item>Civil penalties up to $2,500 per violation</List.Item>
                      <List.Item>Intentional violations: up to $7,500 per violation</List.Item>
                      <List.Item>Private right of action for data breaches</List.Item>
                    </List>
                  </div>
                )}
                
                {activeFramework === 'healthcare' && (
                  <div>
                    <Text fw={600} size="sm" mb="xs">HIPAA Penalties</Text>
                    <List size="sm" spacing="xs">
                      <List.Item>Civil penalties: $100 - $50,000 per violation</List.Item>
                      <List.Item>Annual maximum: $1.5 million per category</List.Item>
                      <List.Item>Criminal penalties: up to $250,000 fine and 10 years imprisonment</List.Item>
                    </List>
                  </div>
                )}
              </Stack>
            </Card>
            
            {/* Recent Enforcement Examples */}
            <Card withBorder p="lg" bg="red.0">
              <Group mb="md">
                <IconGavel size={20} color="red" />
                <Text fw={600} c="red.9">Recent Enforcement Examples</Text>
              </Group>
              
              <Stack gap="sm">
                {activeFramework === 'eu' && (
                  <>
                    <Text size="sm">• Meta: €1.2 billion fine for inadequate data transfer safeguards (2023)</Text>
                    <Text size="sm">• Amazon: €746 million fine for GDPR violations (2021)</Text>
                    <Text size="sm">• WhatsApp: €225 million fine for transparency violations (2021)</Text>
                  </>
                )}
                
                {activeFramework === 'california' && (
                  <>
                    <Text size="sm">• Sephora: $1.2 million settlement for selling personal information (2022)</Text>
                    <Text size="sm">• CVS Health: $2.25 million settlement for data disclosure violations (2023)</Text>
                  </>
                )}
                
                {activeFramework === 'healthcare' && (
                  <>
                    <Text size="sm">• Anthem: $16 million HIPAA settlement for data breach (2018)</Text>
                    <Text size="sm">• Premera Blue Cross: $6.85 million settlement (2019)</Text>
                  </>
                )}
              </Stack>
            </Card>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}

LegalFrameworkDisplay.propTypes = {
  selectedJurisdiction: PropTypes.oneOf(['us_federal', 'california', 'eu', 'canada', 'brazil', 'healthcare'])
};

LegalFrameworkDisplay.displayName = 'LegalFrameworkDisplay';

export default LegalFrameworkDisplay;