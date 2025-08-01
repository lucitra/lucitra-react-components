/**
 * Privacy UI Design System - Storybook Stories
 * 
 * Showcase of reusable components for consistent dashboard design
 * Demonstrates the modular black/white/gray design system
 */

import React, { useState } from 'react'
import { Container, Stack, Group, Title, Text, Grid } from '@mantine/core'
import { 
  IconDatabase, 
  IconShield, 
  IconSettings, 
  IconAlertTriangle,
  IconCheck,
  IconX
} from '@tabler/icons-react'

import { 
  ModularCard,
  StatusIndicator,
  ModularButton,
  ModularBadge,
  CodeBlock,
  AlertBox,
  ProgressBar,
  TabButton
} from './index'

export default {
  title: 'Components/Molecules/Privacy UI',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Privacy UI Design System

**Reusable components for consistent dashboard design**

This design system provides modular, reusable components that maintain consistency across the Privacy dashboard while reducing inline style dependencies.

## Design Principles
- **Modular**: Black borders for main sections, gray for subsections
- **Monochrome**: Black, white, gray base with minimal color usage
- **Status Indicators**: Green-yellow-orange-red only for necessary status
- **Professional**: Enterprise-ready appearance for B2B customers
- **Consistent**: Standardized spacing, typography, and interactions

## Components
- ModularCard: Consistent card containers with variants
- StatusIndicator: Status display with color-coded dots
- ModularButton: Standardized button styling
- ModularBadge: Labels and tags without color dependency
- CodeBlock: Engineering data and metrics display
- AlertBox: Notifications and messaging
- ProgressBar: Data visualization
- TabButton: Navigation elements
        `
      }
    }
  }
}

// Complete Design System Demo
export const DesignSystemOverview = {
  name: 'Complete Design System',
  render: function Render() {
    const [activeTab, setActiveTab] = useState('cards')
    const [progress, setProgress] = useState(75)
    
    return (
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <Title order={1} c="black" mb="sm">
              Privacy UI Design System
            </Title>
            <Text c="gray.7">
              Modular components for consistent dashboard design
            </Text>
          </div>
          
          {/* Tab Navigation */}
          <Group gap="sm" justify="center">
            <TabButton
              active={activeTab === 'cards'}
              onClick={() => setActiveTab('cards')}
              icon={<IconDatabase size={16} />}
            >
              Cards
            </TabButton>
            <TabButton
              active={activeTab === 'buttons'}
              onClick={() => setActiveTab('buttons')}
              icon={<IconSettings size={16} />}
            >
              Buttons & Badges
            </TabButton>
            <TabButton
              active={activeTab === 'feedback'}
              onClick={() => setActiveTab('feedback')}
              icon={<IconAlertTriangle size={16} />}
            >
              Alerts & Progress
            </TabButton>
          </Group>
          
          {/* Content */}
          {activeTab === 'cards' && (
            <Grid>
              <Grid.Col span={6}>
                <Stack gap="lg">
                  <ModularCard variant="primary">
                    <Group mb="md">
                      <IconShield size={20} color="black" />
                      <Text fw={600} c="black">Primary Card</Text>
                    </Group>
                    <Text c="gray.7">
                      Main content areas with prominent black borders
                    </Text>
                  </ModularCard>
                  
                  <ModularCard variant="secondary">
                    <Text fw={600} c="black" mb="xs">Secondary Card</Text>
                    <Text c="gray.7" size="sm">
                      Subsections and supporting content areas
                    </Text>
                  </ModularCard>
                  
                  <ModularCard variant="accent">
                    <Text fw={600} c="black" mb="xs">Accent Card</Text>
                    <Text c="gray.7" size="sm">
                      Important content with left accent border
                    </Text>
                  </ModularCard>
                </Stack>
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Stack gap="lg">
                  <ModularCard variant="status">
                    <Group justify="space-between" align="flex-start">
                      <div>
                        <Text fw={600} c="black" mb="xs">Status Card - Success</Text>
                        <Text c="gray.7" size="sm">
                          Positive status indicators with green accent
                        </Text>
                      </div>
                      <StatusIndicator status="success">ACTIVE</StatusIndicator>
                    </Group>
                  </ModularCard>
                  
                  <ModularCard variant="warning">
                    <Group justify="space-between" align="flex-start">
                      <div>
                        <Text fw={600} c="black" mb="xs">Warning Card</Text>
                        <Text c="gray.7" size="sm">
                          Moderate alerts and warnings
                        </Text>
                      </div>
                      <StatusIndicator status="warning">PENDING</StatusIndicator>
                    </Group>
                  </ModularCard>
                  
                  <ModularCard variant="critical">
                    <Group justify="space-between" align="flex-start">
                      <div>
                        <Text fw={600} c="black" mb="xs">Critical Card</Text>
                        <Text c="gray.7" size="sm">
                          Critical alerts and errors
                        </Text>
                      </div>
                      <StatusIndicator status="critical">ERROR</StatusIndicator>
                    </Group>
                  </ModularCard>
                </Stack>
              </Grid.Col>
            </Grid>
          )}
          
          {activeTab === 'buttons' && (
            <Grid>
              <Grid.Col span={6}>
                <ModularCard variant="primary">
                  <Text fw={600} c="black" mb="lg">Button Variants</Text>
                  <Stack gap="md">
                    <Group gap="sm">
                      <ModularButton variant="primary">Primary</ModularButton>
                      <ModularButton variant="secondary">Secondary</ModularButton>
                      <ModularButton variant="outline">Outline</ModularButton>
                    </Group>
                    
                    <Group gap="sm">
                      <ModularButton variant="ghost">Ghost</ModularButton>
                      <ModularButton variant="link">Link Button</ModularButton>
                      <ModularButton variant="primary" disabled>Disabled</ModularButton>
                    </Group>
                    
                    <Group gap="sm">
                      <ModularButton 
                        variant="primary" 
                        leftIcon={<IconCheck size={16} />}
                      >
                        With Icon
                      </ModularButton>
                      <ModularButton 
                        variant="outline" 
                        rightIcon={<IconDatabase size={16} />}
                      >
                        Right Icon
                      </ModularButton>
                    </Group>
                    
                    <ModularButton variant="primary" fullWidth>
                      Full Width Button
                    </ModularButton>
                  </Stack>
                </ModularCard>
              </Grid.Col>
              
              <Grid.Col span={6}>
                <ModularCard variant="primary">
                  <Text fw={600} c="black" mb="lg">Badges & Status</Text>
                  <Stack gap="lg">
                    <div>
                      <Text fw={600} c="black" mb="sm" size="sm">Badge Variants</Text>
                      <Group gap="xs">
                        <ModularBadge variant="primary">Primary</ModularBadge>
                        <ModularBadge variant="secondary">Secondary</ModularBadge>
                        <ModularBadge variant="outline">Outline</ModularBadge>
                        <ModularBadge variant="code">API_KEY</ModularBadge>
                      </Group>
                    </div>
                    
                    <div>
                      <Text fw={600} c="black" mb="sm" size="sm">Status Indicators</Text>
                      <Stack gap="xs">
                        <StatusIndicator status="success">System Healthy</StatusIndicator>
                        <StatusIndicator status="warning">Budget Low</StatusIndicator>
                        <StatusIndicator status="critical">Connection Failed</StatusIndicator>
                        <StatusIndicator status="info" showDot={false}>Information</StatusIndicator>
                      </Stack>
                    </div>
                    
                    <div>
                      <Text fw={600} c="black" mb="sm" size="sm">Code Blocks</Text>
                      <Stack gap="xs">
                        <div>
                          Configuration: <CodeBlock variant="inline">epsilon=1.0</CodeBlock>
                        </div>
                        <CodeBlock variant="metric">99.7% uptime</CodeBlock>
                        <CodeBlock variant="block">
{`{
  "privacy_budget": 75.2,
  "epsilon": 1.0,
  "status": "healthy"
}`}
                        </CodeBlock>
                      </Stack>
                    </div>
                  </Stack>
                </ModularCard>
              </Grid.Col>
            </Grid>
          )}
          
          {activeTab === 'feedback' && (
            <Stack gap="lg">
              <Grid>
                <Grid.Col span={6}>
                  <ModularCard variant="primary">
                    <Text fw={600} c="black" mb="lg">Alert Variants</Text>
                    <Stack gap="md">
                      <AlertBox 
                        variant="success" 
                        icon={<IconCheck size={16} />}
                        title="Success"
                      >
                        Operation completed successfully
                      </AlertBox>
                      
                      <AlertBox 
                        variant="warning" 
                        icon={<IconAlertTriangle size={16} />}
                        title="Warning"
                      >
                        Privacy budget is running low
                      </AlertBox>
                      
                      <AlertBox 
                        variant="error" 
                        icon={<IconX size={16} />}
                        title="Error"
                      >
                        Failed to connect to analytics endpoint
                      </AlertBox>
                      
                      <AlertBox 
                        variant="info" 
                        icon={<IconDatabase size={16} />}
                        title="Information"
                        closable
                        onClose={() => console.log('Alert closed')}
                      >
                        Data classification analysis complete
                      </AlertBox>
                    </Stack>
                  </ModularCard>
                </Grid.Col>
                
                <Grid.Col span={6}>
                  <ModularCard variant="primary">
                    <Text fw={600} c="black" mb="lg">Progress Indicators</Text>
                    <Stack gap="lg">
                      <div>
                        <Text fw={600} c="black" mb="sm" size="sm">Basic Progress</Text>
                        <ProgressBar 
                          value={progress} 
                          showLabel 
                          label="Privacy Budget" 
                        />
                      </div>
                      
                      <div>
                        <Text fw={600} c="black" mb="sm" size="sm">Status Variants</Text>
                        <Stack gap="sm">
                          <ProgressBar 
                            value={85} 
                            variant="success" 
                            size="sm"
                            label="Healthy (85%)"
                          />
                          <ProgressBar 
                            value={45} 
                            variant="warning" 
                            size="sm"
                            label="Warning (45%)"
                          />
                          <ProgressBar 
                            value={15} 
                            variant="error" 
                            size="sm"
                            label="Critical (15%)"
                            striped
                            animate
                          />
                        </Stack>
                      </div>
                      
                      <div>
                        <ModularButton
                          variant="outline"
                          size="sm"
                          onClick={() => setProgress(Math.random() * 100)}
                        >
                          Randomize Progress
                        </ModularButton>
                      </div>
                    </Stack>
                  </ModularCard>
                </Grid.Col>
              </Grid>
            </Stack>
          )}
        </Stack>
      </Container>
    )
  }
}

// Individual Component Demos
export const CardVariants = {
  render: () => (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <ModularCard variant="primary">
          <Text fw={600} c="black" mb="xs">Primary Card</Text>
          <Text c="gray.7" size="sm">Black border, white background</Text>
        </ModularCard>
        
        <ModularCard variant="secondary">
          <Text fw={600} c="black" mb="xs">Secondary Card</Text>
          <Text c="gray.7" size="sm">Gray border, light gray background</Text>
        </ModularCard>
        
        <ModularCard variant="accent">
          <Text fw={600} c="black" mb="xs">Accent Card</Text>
          <Text c="gray.7" size="sm">Black left border accent</Text>
        </ModularCard>
        
        <ModularCard variant="status">
          <Text fw={600} c="black" mb="xs">Status Card</Text>
          <Text c="gray.7" size="sm">Green left border for positive status</Text>
        </ModularCard>
      </Stack>
    </Container>
  )
}

export const ButtonAndBadgeShowcase = {
  name: 'Buttons and Badges',
  render: () => (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <div>
          <Text fw={600} c="black" mb="md">Button Variants</Text>
          <Group gap="sm">
            <ModularButton variant="primary">Primary</ModularButton>
            <ModularButton variant="secondary">Secondary</ModularButton>
            <ModularButton variant="outline">Outline</ModularButton>
            <ModularButton variant="ghost">Ghost</ModularButton>
          </Group>
        </div>
        
        <div>
          <Text fw={600} c="black" mb="md">Badge Variants</Text>
          <Group gap="sm">
            <ModularBadge variant="primary">Primary</ModularBadge>
            <ModularBadge variant="secondary">Secondary</ModularBadge>
            <ModularBadge variant="outline">Outline</ModularBadge>
            <ModularBadge variant="code">CODE_VALUE</ModularBadge>
          </Group>
        </div>
        
        <div>
          <Text fw={600} c="black" mb="md">Status Indicators</Text>
          <Stack gap="xs">
            <StatusIndicator status="success">System Operational</StatusIndicator>
            <StatusIndicator status="warning">Performance Degraded</StatusIndicator>
            <StatusIndicator status="critical">Service Unavailable</StatusIndicator>
          </Stack>
        </div>
      </Stack>
    </Container>
  )
}