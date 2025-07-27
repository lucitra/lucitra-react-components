import React from 'react'
import { Page, Header, Hero, Features, Footer } from '../'

// This example demonstrates how to use the component library
// to build a complete page, similar to a HubSpot theme

const HubSpotThemeExample = () => {
  // Configuration objects that could come from HubSpot modules
  const headerConfig = {
    logo: 'Your Brand',
    navigation: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' },
    ],
    actions: [
      { name: 'Get Quote', href: '/quote' },
    ],
  }

  const heroConfig = {
    title: 'Welcome to Our Website',
    subtitle: 'This page is built entirely with Lucitra React Components',
    primaryAction: { label: 'Learn More', href: '/learn-more' },
    secondaryAction: { label: 'Contact Us', href: '/contact' },
  }

  const featuresConfig = {
    title: 'Our Services',
    subtitle: 'We offer a wide range of solutions for your business',
    features: [
      {
        title: 'Web Development',
        description: 'Custom websites built with modern technologies',
      },
      {
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications',
      },
      {
        title: 'Consulting',
        description: 'Expert advice to help grow your business',
      },
    ],
  }

  return (
    <Page>
      <Header {...headerConfig} />
      <Hero {...heroConfig} />
      <Features {...featuresConfig} />
      <Footer />
    </Page>
  )
}

export default HubSpotThemeExample