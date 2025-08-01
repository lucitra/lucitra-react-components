import React from 'react';
import { Container, Title, Text, Grid, Stack, Box, Group } from '@mantine/core';
import {
  ScrollAnimationWrapper,
  ParallaxWrapper,
  LenisScrollProvider,
  ScrollProgress,
} from './index';
import { 
  ModularCard,
  StatusIndicator,
  AlertBox,
  ProgressBar,
} from '../Privacy/UI';
// Using existing privacy components from the UI system

export default {
  title: 'Components/Animation/Privacy Components Integration',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Animated Privacy Components

This showcases how to integrate scroll animations with your existing privacy components
to create engaging, modern experiences similar to the referenced websites.

## Key Integration Points

1. **Cookie Consent**: Animate the banner entrance
2. **Dashboard Cards**: Staggered reveal of metrics
3. **Data Tables**: Fade in with scroll
4. **Progress Indicators**: Animate on viewport entry
5. **Alert Messages**: Slide in from sides

## Implementation Patterns

- Use \`ScrollAnimationWrapper\` around existing components
- Add \`ParallaxWrapper\` for background elements
- Implement \`LenisScrollProvider\` at the app root
- Combine animations for sophisticated effects
        `,
      },
    },
  },
};

// Sample data for demonstrations
const sampleDataInventory = [
  {
    id: '1',
    category: 'User Profile',
    dataType: 'Personal Information',
    description: 'Name, email, profile settings',
    purpose: 'Account management',
    retention: '3 years',
    sensitivity: 'medium',
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    category: 'Analytics',
    dataType: 'Usage Data',
    description: 'Page views, click events',
    purpose: 'Product improvement',
    retention: '1 year',
    sensitivity: 'low',
    lastUpdated: '2024-01-10',
  },
];

export const AnimatedPrivacyDashboard = {
  render: () => (
    <LenisScrollProvider>
      <ScrollProgress color="#000" height={2} />
      
      {/* Hero Section */}
      <Box bg="gray.0" py={100}>
        <Container size="xl">
          <ScrollAnimationWrapper animation="fadeIn" duration={1}>
            <Title order={1} size={56} mb="xl" ta="center">
              Privacy-First Design
            </Title>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fadeInUp" delay={0.3}>
            <Text size="xl" c="gray.7" ta="center" maw={800} mx="auto">
              Experience your privacy components with smooth, engaging animations
              that enhance user trust and transparency.
            </Text>
          </ScrollAnimationWrapper>
        </Container>
      </Box>

      {/* Animated Cookie Consent Banner Example */}
      <Container size="xl" py={80}>
        <ScrollAnimationWrapper animation="fadeInUp">
          <Title order={2} mb={40}>Animated Cookie Consent</Title>
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animation="slideInUp" delay={0.2}>
          <ModularCard variant="primary">
            <Stack gap="md">
              <Text fw={600} size="lg">Cookie Consent Banner</Text>
              <Text c="gray.7">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </Text>
              <Group gap="sm">
                <Box
                  component="button"
                  px="md"
                  py="sm"
                  style={{
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                >
                  Accept All
                </Box>
                <Box
                  component="button"
                  px="md"
                  py="sm"
                  style={{
                    background: '#fff',
                    color: '#000',
                    border: '1px solid #000',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                >
                  Manage Preferences
                </Box>
              </Group>
            </Stack>
          </ModularCard>
        </ScrollAnimationWrapper>
      </Container>

      {/* Parallax Privacy Cards */}
      <Box pos="relative" py={100} style={{ overflow: 'hidden' }}>
        <ParallaxWrapper speed={-0.3} style={{ position: 'absolute', inset: 0 }}>
          <Box
            h="120%"
            style={{
              background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
            }}
          />
        </ParallaxWrapper>
        
        <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollAnimationWrapper animation="fadeInUp">
            <Title order={2} mb={60} ta="center">
              Privacy Metrics with Depth
            </Title>
          </ScrollAnimationWrapper>

          <Grid gutter={40}>
            {[
              { title: 'Data Collected', value: '2.3 GB', status: 'success', delay: 0.1 },
              { title: 'Privacy Budget', value: '75%', status: 'warning', delay: 0.2 },
              { title: 'Active Consents', value: '1,234', status: 'success', delay: 0.3 },
              { title: 'Compliance Score', value: '92%', status: 'success', delay: 0.4 },
            ].map((metric, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                <ScrollAnimationWrapper 
                  animation="scaleInUp" 
                  delay={metric.delay}
                  threshold={0.3}
                >
                  <ModularCard variant="primary">
                    <Stack gap="md">
                      <Text fw={600} c="gray.7">{metric.title}</Text>
                      <Title order={2} size={48}>{metric.value}</Title>
                      <StatusIndicator status={metric.status}>
                        Status: Healthy
                      </StatusIndicator>
                    </Stack>
                  </ModularCard>
                </ScrollAnimationWrapper>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Animated Data Table */}
      <Container size="xl" py={80}>
        <ScrollAnimationWrapper animation="fadeInLeft">
          <Title order={2} mb={40}>Data Inventory Animation</Title>
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animation="fadeIn" delay={0.3} duration={0.8}>
          <ModularCard variant="secondary">
            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={600} size="lg">Data Inventory</Text>
                <StatusIndicator status="success">Active</StatusIndicator>
              </Group>
              {sampleDataInventory.map((item, index) => (
                <ScrollAnimationWrapper
                  key={item.id}
                  animation="fadeInUp"
                  delay={0.4 + index * 0.1}
                >
                  <Box
                    p="md"
                    style={{
                      borderBottom: '1px solid #e0e0e0',
                    }}
                  >
                    <Group justify="space-between" mb="xs">
                      <Text fw={600}>{item.category}</Text>
                      <Text size="sm" c="gray.6">{item.retention}</Text>
                    </Group>
                    <Text size="sm" c="gray.7">{item.description}</Text>
                    <Group gap="xs" mt="xs">
                      <Text size="xs" c="gray.6">Purpose:</Text>
                      <Text size="xs">{item.purpose}</Text>
                    </Group>
                  </Box>
                </ScrollAnimationWrapper>
              ))}
            </Stack>
          </ModularCard>
        </ScrollAnimationWrapper>
      </Container>

      {/* Staggered Alert Animations */}
      <Container size="xl" py={80}>
        <ScrollAnimationWrapper animation="fadeInUp">
          <Title order={2} mb={40}>Privacy Notifications</Title>
        </ScrollAnimationWrapper>
        
        <Stack gap="lg">
          {[
            {
              variant: 'success',
              title: 'GDPR Compliance Achieved',
              message: 'All data processing activities meet regulatory requirements',
              animation: 'fadeInRight',
              delay: 0.1,
            },
            {
              variant: 'warning',
              title: 'Privacy Budget Alert',
              message: 'Current privacy budget usage at 75% - review allocation',
              animation: 'fadeInRight',
              delay: 0.2,
            },
            {
              variant: 'info',
              title: 'New Consent Requests',
              message: '12 pending consent requests require review',
              animation: 'fadeInRight',
              delay: 0.3,
            },
          ].map((alert, index) => (
            <ScrollAnimationWrapper 
              key={index}
              animation={alert.animation} 
              delay={alert.delay}
            >
              <AlertBox
                variant={alert.variant}
                title={alert.title}
                closable
              >
                {alert.message}
              </AlertBox>
            </ScrollAnimationWrapper>
          ))}
        </Stack>
      </Container>

      {/* Animated Progress Bars */}
      <Container size="xl" py={80}>
        <ScrollAnimationWrapper animation="fadeInUp">
          <Title order={2} mb={40}>Privacy Budget Visualization</Title>
        </ScrollAnimationWrapper>
        
        <Stack gap="xl">
          {[
            { label: 'Query Budget', value: 85, variant: 'success', delay: 0.1 },
            { label: 'Noise Budget', value: 45, variant: 'warning', delay: 0.2 },
            { label: 'Computation Budget', value: 15, variant: 'error', delay: 0.3 },
          ].map((item, index) => (
            <ScrollAnimationWrapper 
              key={index}
              animation="fadeInUp" 
              delay={item.delay}
            >
              <div>
                <Text fw={600} mb="sm">{item.label}</Text>
                <ProgressBar
                  value={item.value}
                  variant={item.variant}
                  showLabel
                  animate
                  striped
                />
              </div>
            </ScrollAnimationWrapper>
          ))}
        </Stack>
      </Container>

      {/* Full Dashboard with Animations */}
      <Box bg="gray.0" py={100}>
        <Container size="xl">
          <ScrollAnimationWrapper animation="fadeIn" duration={1.2}>
            <Title order={2} mb={60} ta="center">
              Complete Privacy Dashboard
            </Title>
          </ScrollAnimationWrapper>
          
          <Grid gutter={40}>
            {/* Left Column - Metrics */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap="lg">
                {[
                  { title: 'Total Users', value: '12,345', delay: 0.3 },
                  { title: 'Active Consents', value: '8,901', delay: 0.4 },
                  { title: 'Data Requests', value: '234', delay: 0.5 },
                ].map((metric, index) => (
                  <ScrollAnimationWrapper
                    key={index}
                    animation="fadeInLeft"
                    delay={metric.delay}
                  >
                    <ModularCard variant="secondary">
                      <Text fw={600} c="gray.7" size="sm">{metric.title}</Text>
                      <Title order={3} mt="xs">{metric.value}</Title>
                    </ModularCard>
                  </ScrollAnimationWrapper>
                ))}
              </Stack>
            </Grid.Col>
            
            {/* Center Column - Privacy Budget */}
            <Grid.Col span={{ base: 12, md: 8 }}>
              <ScrollAnimationWrapper animation="fadeInUp" delay={0.4}>
                <ModularCard variant="primary">
                  <Title order={3} mb="lg">Privacy Budget Status</Title>
                  <Stack gap="md">
                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text fw={600}>Query Budget</Text>
                        <Text>85%</Text>
                      </Group>
                      <ProgressBar value={85} variant="success" animate striped />
                    </div>
                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text fw={600}>Noise Budget</Text>
                        <Text>45%</Text>
                      </Group>
                      <ProgressBar value={45} variant="warning" animate striped />
                    </div>
                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text fw={600}>Computation Budget</Text>
                        <Text>15%</Text>
                      </Group>
                      <ProgressBar value={15} variant="error" animate striped />
                    </div>
                  </Stack>
                </ModularCard>
              </ScrollAnimationWrapper>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </LenisScrollProvider>
  ),
};

export const ScrollTriggeredComponents = {
  render: () => (
    <Container size="xl" py={50}>
      <Title order={2} mb={40}>Scroll-Triggered Privacy Components</Title>
      
      <Stack gap={100}>
        {/* Different animation styles for ModularCards */}
        <ScrollAnimationWrapper animation="fadeInLeft" triggerOnce={false}>
          <ModularCard variant="primary">
            <Title order={3}>Fade In From Left</Title>
            <Text c="gray.7">This card slides in from the left on scroll</Text>
          </ModularCard>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="scaleIn" triggerOnce={false}>
          <ModularCard variant="accent">
            <Title order={3}>Scale In Effect</Title>
            <Text c="gray.7">This card scales up as it enters the viewport</Text>
          </ModularCard>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="rotateIn" triggerOnce={false}>
          <ModularCard variant="status">
            <Title order={3}>Rotate In Animation</Title>
            <Text c="gray.7">A subtle rotation adds visual interest</Text>
          </ModularCard>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="blur" duration={1} triggerOnce={false}>
          <ModularCard variant="warning">
            <Title order={3}>Blur to Focus</Title>
            <Text c="gray.7">Content becomes clear as you scroll</Text>
          </ModularCard>
        </ScrollAnimationWrapper>
      </Stack>
    </Container>
  ),
};