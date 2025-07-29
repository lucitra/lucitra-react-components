import React from 'react'
import { 
  Page, 
  Header, 
  Hero, 
  Features, 
  Footer, 
  Container,
  Button
} from '../'
import { Card, Title, Text, Badge, Grid } from '@mantine/core'
import { 
  IconBolt, 
  IconPalette, 
  IconDeviceMobile,
  IconLock,
  IconCloud,
  IconUsers
} from '@tabler/icons-react'

const LandingPage = () => {
  const navigation = [
    { name: 'Product', href: '#product' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Company', href: '#company' },
  ]

  const mainFeatures = [
    {
      icon: IconBolt,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant load times and smooth interactions.',
      iconColor: '#667eea'
    },
    {
      icon: IconPalette,
      title: 'Beautiful Design',
      description: 'Modern, clean interfaces with customizable themes and components.',
      iconColor: '#667eea'
    },
    {
      icon: IconDeviceMobile,
      title: 'Mobile First',
      description: 'Responsive design that works perfectly on all screen sizes.',
      iconColor: '#667eea'
    },
    {
      icon: IconLock,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with end-to-end encryption.',
      iconColor: '#667eea'
    },
    {
      icon: IconCloud,
      title: 'Cloud Native',
      description: 'Deploy anywhere with automatic scaling and high availability.',
      iconColor: '#667eea'
    },
    {
      icon: IconUsers,
      title: 'Team Collaboration',
      description: 'Real-time collaboration tools for teams of any size.',
      iconColor: '#667eea'
    },
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      features: ['Up to 3 projects', 'Basic components', 'Community support'],
      badge: 'Free',
      badgeColor: 'green'
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      features: ['Unlimited projects', 'All components', 'Priority support', 'Custom themes'],
      badge: 'Popular',
      badgeColor: 'blue'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: ['Everything in Pro', 'Custom components', 'Dedicated support', 'SLA guarantee'],
      badge: 'Custom',
      badgeColor: 'violet'
    },
  ]

  return (
    <Page backgroundColor="#fafbfc">
      <Header
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: 36, 
              height: 36, 
              borderRadius: 8, 
              background: '#667eea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              L
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Lucitra</span>
          </div>
        }
        navigation={navigation}
        actions={[
          { name: 'Sign In', href: '#signin' },
          <Button key="demo" variant="filled">
            Request Demo
          </Button>,
        ]}
        variant="blur"
        position="sticky"
      />
      
      <Hero
        title="The Ultimate React Component Library"
        subtitle="Build beautiful, responsive web applications faster than ever with our comprehensive component library"
        primaryAction={{ 
          label: 'Start Building', 
          href: '#start'
        }}
        secondaryAction={{ 
          label: 'View Components', 
          href: '#components',
          variant: 'outline'
        }}
        style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      />
      
      <Features
        title="Everything You Need"
        subtitle="A complete toolkit for modern web development"
        features={mainFeatures}
        columns={{ base: 1, sm: 2, lg: 3 }}
        spacing="xl"
      />

      <Container size="lg" py="xl">
        <Title order={2} size="h1" ta="center" mb="lg">
          Simple, Transparent Pricing
        </Title>
        <Text size="lg" c="dimmed" ta="center" mb="xl" maw={600} mx="auto">
          Choose the perfect plan for your needs. Always flexible to scale
        </Text>
        
        <Grid gutter="lg">
          {pricingPlans.map((plan) => (
            <Grid.Col key={plan.name} span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                <Card.Section withBorder inheritPadding py="xs">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text fw={500}>{plan.name}</Text>
                    {plan.badge && <Badge color={plan.badgeColor}>{plan.badge}</Badge>}
                  </div>
                </Card.Section>

                <Card.Section inheritPadding mt="sm" pb="md">
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <Text size="2rem" fw={700}>{plan.price}</Text>
                    <Text size="sm" c="dimmed">/{plan.period}</Text>
                  </div>
                </Card.Section>

                <Card.Section inheritPadding py="sm">
                  {plan.features.map((feature, index) => (
                    <Text key={index} size="sm" mb="xs">
                      ✓ {feature}
                    </Text>
                  ))}
                </Card.Section>

                <Card.Section inheritPadding pt="sm">
                  <Button fullWidth variant={plan.name === 'Professional' ? 'filled' : 'light'}>
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </Card.Section>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      
      <Footer />
    </Page>
  )
}

export default LandingPage