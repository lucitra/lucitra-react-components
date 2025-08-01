import React from 'react';
import { StandardPage } from '../Layout/StandardLayout';
import Button from '../Forms/Button';
import { Card } from '../DataDisplay/Card';
import { Text } from '../Typography/Text';
import { Heading } from '../Typography/Heading';
import { Grid } from '../Layout/Grid';
import { Stack } from '../Layout/Stack';
import { Container } from '../Layout/Container';

const StandardLayoutExample = () => {
  const Logo = () => (
    <div style={{ 
      fontSize: '24px', 
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
      LUCITRA
    </div>
  );

  const navigationItems = [
    { label: 'Products', href: '#products' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Resources', href: '#resources' },
    { label: 'Company', href: '#company' },
  ];

  const headerActions = (
    <>
      <Button variant="outline" size="sm">Sign In</Button>
      <Button size="sm">Start Free Trial</Button>
    </>
  );

  const features = [
    {
      title: 'Component Library',
      description: 'Pre-built React components with consistent design and behavior.',
      icon: '🧩'
    },
    {
      title: 'Design System',
      description: 'Comprehensive design tokens and guidelines for cohesive UIs.',
      icon: '🎨'
    },
    {
      title: 'TypeScript Ready',
      description: 'Full TypeScript support with detailed type definitions.',
      icon: '📘'
    },
    {
      title: 'Accessibility First',
      description: 'WCAG compliant components built with accessibility in mind.',
      icon: '♿'
    },
    {
      title: 'Theme Support',
      description: 'Easy theming with CSS variables and Mantine integration.',
      icon: '🎭'
    },
    {
      title: 'Production Ready',
      description: 'Battle-tested components used in real production applications.',
      icon: '🚀'
    }
  ];

  return (
    <StandardPage
      header={{
        logo: <Logo />,
        navigationItems,
        actions: headerActions,
        transparent: true
      }}
      hero={{
        videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
        videoPoster: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop',
        title: 'Build Better React Apps Faster',
        subtitle: 'A comprehensive component library and design system for modern web applications',
        actions: (
          <>
            <Button size="lg" variant="filled">
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              style={{ color: 'white', borderColor: 'white' }}
            >
              View Components
            </Button>
          </>
        )
      }}
    >
      <Container size="lg">
        <Stack gap="3xl">
          {/* Features Section */}
          <section id="features">
            <Stack gap="xl" align="center">
              <div style={{ textAlign: 'center' }}>
                <Heading level={2} style={{ marginBottom: '16px' }}>
                  Everything You Need
                </Heading>
                <Text size="lg" color="secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
                  Build production-ready applications with our comprehensive suite of components and tools.
                </Text>
              </div>
              
              <Grid cols={3} gap="lg" style={{ width: '100%' }}>
                {features.map((feature, index) => (
                  <Card key={index} padding="lg">
                    <Stack gap="md">
                      <div style={{ fontSize: '48px' }}>{feature.icon}</div>
                      <Heading level={3} size="md">{feature.title}</Heading>
                      <Text color="secondary">{feature.description}</Text>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </section>

          {/* CTA Section */}
          <section style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '80px 40px',
            borderRadius: '16px',
            textAlign: 'center',
            color: 'white'
          }}>
            <Stack gap="lg" align="center">
              <Heading level={2} style={{ color: 'white' }}>
                Ready to Get Started?
              </Heading>
              <Text size="lg" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px' }}>
                Join thousands of developers building better React applications with Lucitra components.
              </Text>
              <Stack direction="horizontal" gap="md">
                <Button size="lg" variant="filled" style={{ background: 'white', color: '#667eea' }}>
                  Start Building
                </Button>
                <Button size="lg" variant="outline" style={{ color: 'white', borderColor: 'white' }}>
                  Read Documentation
                </Button>
              </Stack>
            </Stack>
          </section>

          {/* Stats Section */}
          <section>
            <Grid cols={4} gap="lg">
              {[
                { number: '50+', label: 'Components' },
                { number: '10k+', label: 'Downloads' },
                { number: '99%', label: 'Uptime' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <Heading level={2} size="xl" style={{ color: '#3b82f6', marginBottom: '8px' }}>
                    {stat.number}
                  </Heading>
                  <Text color="secondary">{stat.label}</Text>
                </div>
              ))}
            </Grid>
          </section>
        </Stack>
      </Container>
    </StandardPage>
  );
};

export default StandardLayoutExample;