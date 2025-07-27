import React from 'react'
import Header from './Header'
import { Button } from '@mantine/core'

export default {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

const navigationItems = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

const actionItems = [
  { name: 'Sign In', href: '#signin' },
  <Button key="signup" variant="filled" size="sm">Sign Up</Button>,
]

export const Default = () => (
  <Header
    logo="Lucitra"
    navigation={navigationItems}
    actions={actionItems}
  />
)

export const SolidHeader = () => (
  <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
    <Header
      logo="Lucitra"
      navigation={navigationItems}
      actions={actionItems}
      variant="solid"
    />
  </div>
)

export const TransparentHeader = () => (
  <div style={{ 
    backgroundImage: 'linear-gradient(to bottom, #1a1a2e, #16213e)', 
    minHeight: '100vh' 
  }}>
    <Header
      logo="Lucitra"
      navigation={navigationItems}
      actions={actionItems}
      variant="transparent"
    />
  </div>
)

export const BlurHeader = () => (
  <div style={{ 
    backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600)',
    backgroundSize: 'cover',
    minHeight: '100vh' 
  }}>
    <Header
      logo="Lucitra"
      navigation={navigationItems}
      actions={actionItems}
      variant="blur"
    />
  </div>
)

export const StickyHeader = () => (
  <div>
    <Header
      logo="Lucitra"
      navigation={navigationItems}
      actions={actionItems}
      variant="solid"
      position="sticky"
    />
    <div style={{ padding: '2rem', height: '200vh', backgroundColor: '#f8f9fa' }}>
      <h2>Scroll down to see sticky header</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    </div>
  </div>
)

export const MinimalHeader = () => (
  <Header
    logo="Lucitra"
    navigation={[
      { name: 'Products', href: '#products' },
      { name: 'Solutions', href: '#solutions' },
    ]}
    actions={[
      <Button key="cta" variant="filled" size="sm">Get Started</Button>,
    ]}
  />
)

export const WithCustomLogo = () => (
  <Header
    logo={
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ 
          width: 32, 
          height: 32, 
          borderRadius: 8, 
          backgroundColor: '#228be6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          L
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Lucitra</span>
      </div>
    }
    navigation={navigationItems}
    actions={actionItems}
  />
)