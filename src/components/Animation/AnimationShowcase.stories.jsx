import React from 'react';
import { Container, Title, Text, Grid, Card, Stack, Box } from '@mantine/core';
import {
  ScrollAnimationWrapper,
  ParallaxWrapper,
  LenisScrollProvider,
  StickySection,
  ScrollProgress,
} from './index';
import { StandardHeroSection } from '../Layout/StandardLayout/StandardHeroSection';

export default {
  title: 'Components/Animation/Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Scroll Animation System

A comprehensive animation system inspired by modern websites like:
- deso.com - Smooth scroll with staggered reveals
- gehry.getty.edu - Parallax and sticky sections
- superpower.com - Dynamic scroll-triggered animations
- daylightcomputer.com - Minimalist scroll effects
- lifeworld.wetransfer.com - Creative scroll interactions

## Features

### 1. Lenis Smooth Scroll
Provides buttery smooth scrolling experience with customizable easing and duration.

### 2. Scroll-Triggered Animations
- Fade animations (in, up, down, left, right)
- Slide animations (up, down, left, right)
- Scale animations
- Rotate animations
- Blur effects

### 3. Parallax Effects
Create depth with different scroll speeds for elements.

### 4. Sticky Sections
Pin elements during scroll with progress tracking.

### 5. Scroll Progress
Visual indicator of page scroll progress.

## Usage

\`\`\`jsx
import { 
  LenisScrollProvider,
  ScrollAnimationWrapper,
  ParallaxWrapper,
  StickySection,
  ScrollProgress
} from '@lucitra/privacy-components';

// Wrap your app with Lenis
<LenisScrollProvider>
  <ScrollProgress />
  
  {/* Scroll-triggered animations */}
  <ScrollAnimationWrapper animation="fadeInUp" delay={0.2}>
    <h1>Animated Content</h1>
  </ScrollAnimationWrapper>
  
  {/* Parallax effects */}
  <ParallaxWrapper speed={0.5}>
    <img src="background.jpg" />
  </ParallaxWrapper>
  
  {/* Sticky sections */}
  <StickySection start={1000} end={2000}>
    {({ progress }) => (
      <div style={{ opacity: progress }}>
        Progressive reveal content
      </div>
    )}
  </StickySection>
</LenisScrollProvider>
\`\`\`
        `,
      },
    },
  },
};

// Complete showcase of all animation features
export const CompleteShowcase = {
  render: () => (
    <LenisScrollProvider>
      <ScrollProgress color="#000" height={3} />
      
      {/* Hero Section with Video */}
      <ScrollAnimationWrapper animation="fadeIn" duration={1.2}>
        <StandardHeroSection
          videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          videoPoster="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920"
          title="Scroll Animation System"
          subtitle="Modern scroll-based animations for React"
          style={{ height: '100vh' }}
        />
      </ScrollAnimationWrapper>

      {/* Introduction Section */}
      <Container size="xl" py={100}>
        <ScrollAnimationWrapper animation="fadeInUp" delay={0.2}>
          <Title order={1} size={48} mb="xl" ta="center">
            Inspired by the Best
          </Title>
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animation="fadeInUp" delay={0.4}>
          <Text size="xl" c="gray.7" ta="center" maw={800} mx="auto" mb={80}>
            This animation system brings the sophistication of modern web experiences
            to your React applications with smooth scrolling, parallax effects,
            and engaging scroll-triggered animations.
          </Text>
        </ScrollAnimationWrapper>

        {/* Feature Cards with Staggered Animation */}
        <Grid gutter={40}>
          {[
            {
              title: 'Smooth Scrolling',
              description: 'Lenis-powered smooth scroll with customizable easing curves',
              delay: 0.2,
            },
            {
              title: 'Scroll Triggers',
              description: 'Intersection Observer-based animations that trigger on scroll',
              delay: 0.3,
            },
            {
              title: 'Parallax Effects',
              description: 'Create depth with elements moving at different speeds',
              delay: 0.4,
            },
            {
              title: 'Sticky Sections',
              description: 'Pin elements during scroll with progress-based animations',
              delay: 0.5,
            },
          ].map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
              <ScrollAnimationWrapper animation="fadeInUp" delay={feature.delay}>
                <Card p="xl" radius="md" withBorder h="100%">
                  <Title order={3} mb="md">{feature.title}</Title>
                  <Text c="gray.7">{feature.description}</Text>
                </Card>
              </ScrollAnimationWrapper>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* Parallax Section */}
      <Box pos="relative" h={600} style={{ overflow: 'hidden' }}>
        <ParallaxWrapper speed={-0.5} style={{ position: 'absolute', inset: 0 }}>
          <Box
            h="120%"
            style={{
              background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              opacity: 0.1,
            }}
          />
        </ParallaxWrapper>
        
        <Container size="xl" h="100%" style={{ position: 'relative', zIndex: 1 }}>
          <Stack justify="center" h="100%">
            <ScrollAnimationWrapper animation="fadeIn" duration={1}>
              <Title order={2} size={48} c="black" ta="center">
                Parallax in Action
              </Title>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper animation="fadeInUp" delay={0.3}>
              <Text size="xl" c="gray.7" ta="center">
                Background elements move at different speeds creating depth
              </Text>
            </ScrollAnimationWrapper>
          </Stack>
        </Container>
      </Box>

      {/* Animation Types Demo */}
      <Container size="xl" py={100}>
        <ScrollAnimationWrapper animation="fadeInUp">
          <Title order={2} size={40} mb={60} ta="center">
            Animation Variations
          </Title>
        </ScrollAnimationWrapper>

        <Grid gutter={40}>
          {[
            { animation: 'fadeIn', label: 'Fade In' },
            { animation: 'fadeInUp', label: 'Fade In Up' },
            { animation: 'fadeInLeft', label: 'Fade In Left' },
            { animation: 'fadeInRight', label: 'Fade In Right' },
            { animation: 'scaleIn', label: 'Scale In' },
            { animation: 'scaleInUp', label: 'Scale In Up' },
            { animation: 'rotateIn', label: 'Rotate In' },
            { animation: 'blur', label: 'Blur Effect' },
          ].map((item, index) => (
            <Grid.Col key={index} span={{ base: 6, sm: 3 }}>
              <ScrollAnimationWrapper 
                animation={item.animation} 
                delay={index * 0.1}
                triggerOnce={false}
              >
                <Card p="xl" radius="md" withBorder ta="center">
                  <Text fw={600}>{item.label}</Text>
                </Card>
              </ScrollAnimationWrapper>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* Sticky Progress Section */}
      <StickySection start={2000} end={3000}>
        {({ progress }) => (
          <Box h="100vh" bg="gray.0">
            <Container size="xl" h="100%">
              <Stack justify="center" h="100%" ta="center">
                <Title order={2} size={48}>
                  Sticky Progress: {Math.round(progress * 100)}%
                </Title>
                <Box w="100%" maw={600} mx="auto">
                  <Box
                    h={8}
                    bg="gray.3"
                    style={{ borderRadius: 4, overflow: 'hidden' }}
                  >
                    <Box
                      h="100%"
                      bg="black"
                      style={{
                        width: `${progress * 100}%`,
                        transition: 'width 0.1s linear',
                      }}
                    />
                  </Box>
                </Box>
                <Text size="lg" c="gray.7" style={{ opacity: progress }}>
                  This section reveals content based on scroll progress
                </Text>
              </Stack>
            </Container>
          </Box>
        )}
      </StickySection>

      {/* Final CTA Section */}
      <Container size="xl" py={150}>
        <Stack align="center" gap="xl">
          <ScrollAnimationWrapper animation="scaleInUp">
            <Title order={2} size={48} ta="center">
              Ready to Animate?
            </Title>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animation="fadeInUp" delay={0.3}>
            <Text size="xl" c="gray.7" ta="center" maw={600}>
              Start using these animation components to create engaging,
              modern web experiences in your React applications.
            </Text>
          </ScrollAnimationWrapper>
        </Stack>
      </Container>
    </LenisScrollProvider>
  ),
};

// Individual component demos
export const ScrollAnimations = {
  render: () => (
    <Container size="xl" py={50}>
      <Title order={2} mb={40}>Scroll Animation Types</Title>
      <Stack gap={80}>
        {[
          'fadeIn',
          'fadeInUp',
          'fadeInDown',
          'fadeInLeft',
          'fadeInRight',
          'scaleIn',
          'scaleInUp',
          'rotateIn',
          'blur',
        ].map((animation) => (
          <ScrollAnimationWrapper key={animation} animation={animation}>
            <Card p="xl" withBorder>
              <Title order={3}>{animation}</Title>
              <Text c="gray.7">
                This element animates with {animation} when scrolled into view
              </Text>
            </Card>
          </ScrollAnimationWrapper>
        ))}
      </Stack>
    </Container>
  ),
};

export const ParallaxEffects = {
  render: () => (
    <div style={{ minHeight: '200vh' }}>
      <Container size="xl" py={50}>
        <Title order={2} mb={40}>Parallax Scrolling</Title>
        
        <Box pos="relative" h={400} mb={40}>
          <ParallaxWrapper speed={-0.3}>
            <Card 
              p="xl" 
              withBorder 
              bg="gray.1"
              style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
            >
              <Text>Slow parallax (speed: -0.3)</Text>
            </Card>
          </ParallaxWrapper>
        </Box>

        <Box pos="relative" h={400} mb={40}>
          <ParallaxWrapper speed={0.5}>
            <Card 
              p="xl" 
              withBorder 
              bg="gray.2"
              style={{ position: 'absolute', top: 100, left: 50, right: 50 }}
            >
              <Text>Fast parallax (speed: 0.5)</Text>
            </Card>
          </ParallaxWrapper>
        </Box>

        <Text c="gray.7" mt={100}>
          Scroll to see the parallax effect. Elements move at different speeds.
        </Text>
      </Container>
    </div>
  ),
};

export const StickyProgressDemo = {
  render: () => (
    <div style={{ minHeight: '300vh' }}>
      <ScrollProgress />
      
      <Container size="xl" py={50}>
        <Title order={2} mb={40}>Sticky Section with Progress</Title>
        <Text c="gray.7" mb={100}>
          Scroll down to see the sticky section in action
        </Text>
      </Container>

      <StickySection start={300} end={1500}>
        {({ progress, isSticky }) => (
          <Box 
            h="100vh" 
            bg="gray.0" 
            p="xl"
            style={{ 
              border: isSticky ? '2px solid black' : 'none',
              transition: 'border 0.3s',
            }}
          >
            <Container size="xl" h="100%">
              <Stack justify="center" h="100%">
                <Title order={2} size={72} style={{ opacity: progress }}>
                  {Math.round(progress * 100)}%
                </Title>
                <Text size="xl" c="gray.7">
                  This section is {isSticky ? 'sticky' : 'not sticky'}
                </Text>
              </Stack>
            </Container>
          </Box>
        )}
      </StickySection>

      <Container size="xl" py={100}>
        <Text c="gray.7">Content after sticky section</Text>
      </Container>
    </div>
  ),
};