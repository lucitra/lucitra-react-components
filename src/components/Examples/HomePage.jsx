import React from 'react'
import { Page, Header, Hero, Features, Footer, Button } from '../'
import { IconRocket, IconShield, IconCode } from '@tabler/icons-react'

const HomePage = () => {
  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ]

  const features = [
    {
      icon: IconRocket,
      title: 'Fast Performance',
      description: 'Lightning fast load times with optimized code and efficient rendering.',
    },
    {
      icon: IconShield,
      title: 'Secure by Default',
      description: 'Built with security best practices and regular updates.',
    },
    {
      icon: IconCode,
      title: 'Developer Friendly',
      description: 'Clean, well-documented code with TypeScript support.',
    },
  ]

  return (
    <Page>
      <Header
        logo="Lucitra"
        navigation={navigationItems}
        actions={[
          { name: 'Sign In', href: '#signin' },
          <Button key="signup" variant="filled" size="sm">Get Started</Button>,
        ]}
      />
      
      <Hero
        title="Build Amazing Web Applications"
        subtitle="A comprehensive React component library for modern web development"
        primaryAction={{ label: 'Get Started', href: '#start' }}
        secondaryAction={{ label: 'View Docs', href: '#docs' }}
      />
      
      <Features
        title="Why Choose Lucitra?"
        subtitle="Everything you need to build modern web applications"
        features={features}
      />
      
      <Footer />
    </Page>
  )
}

export default HomePage