import React from 'react'
import Features from './Features'
import { 
  IconRocket, 
  IconShield, 
  IconCode, 
  IconPalette,
  IconDeviceMobile,
  IconCloud,
  IconLock,
  IconBolt,
  IconUsers
} from '@tabler/icons-react'

export default {
  title: 'Layout/Features',
  component: Features,
  parameters: {
    layout: 'fullscreen',
  },
}

const defaultFeatures = [
  {
    icon: IconRocket,
    title: 'Fast Performance',
    description: 'Lightning fast load times with optimized code and efficient rendering for the best user experience.',
  },
  {
    icon: IconShield,
    title: 'Secure by Default',
    description: 'Built with security best practices and regular updates to keep your application safe.',
  },
  {
    icon: IconCode,
    title: 'Developer Friendly',
    description: 'Clean, well-documented code with TypeScript support and comprehensive API documentation.',
  },
]

export const Default = () => (
  <Features
    title="Amazing Features"
    subtitle="Everything you need to build modern web applications"
    features={defaultFeatures}
  />
)

export const WithoutHeader = () => (
  <Features features={defaultFeatures} />
)

export const TwoColumns = () => (
  <Features
    title="Core Features"
    features={[
      {
        icon: IconPalette,
        title: 'Beautiful Design',
        description: 'Pre-built components with customizable themes and styles.',
      },
      {
        icon: IconDeviceMobile,
        title: 'Mobile First',
        description: 'Responsive design that works perfectly on all devices.',
      },
    ]}
    columns={{ base: 1, sm: 2 }}
  />
)

export const FourColumns = () => (
  <Features
    title="Complete Feature Set"
    subtitle="Everything included out of the box"
    features={[
      {
        icon: IconRocket,
        title: 'Fast',
        description: 'Optimized for speed and performance.',
      },
      {
        icon: IconShield,
        title: 'Secure',
        description: 'Enterprise-grade security features.',
      },
      {
        icon: IconCode,
        title: 'Flexible',
        description: 'Highly customizable components.',
      },
      {
        icon: IconCloud,
        title: 'Cloud Ready',
        description: 'Deploy anywhere with ease.',
      },
    ]}
    columns={{ base: 1, sm: 2, lg: 4 }}
  />
)

export const WithLinks = () => (
  <Features
    title="Learn More About Our Features"
    features={[
      {
        icon: IconRocket,
        title: 'Performance',
        description: 'Our platform is built for speed with advanced caching and optimization.',
        link: { text: 'View benchmarks →', href: '#benchmarks' }
      },
      {
        icon: IconLock,
        title: 'Security',
        description: 'End-to-end encryption and compliance with industry standards.',
        link: { text: 'Security details →', href: '#security' }
      },
      {
        icon: IconUsers,
        title: 'Collaboration',
        description: 'Real-time collaboration tools for teams of any size.',
        link: { text: 'Try it free →', href: '#signup' }
      },
    ]}
  />
)

export const CustomIconColors = () => (
  <Features
    title="Colorful Features"
    features={[
      {
        icon: IconBolt,
        iconColor: 'yellow',
        title: 'Lightning Fast',
        description: 'Incredibly fast performance that your users will love.',
      },
      {
        icon: IconShield,
        iconColor: 'green',
        title: 'Always Secure',
        description: 'Your data is protected with military-grade encryption.',
      },
      {
        icon: IconCode,
        iconColor: 'violet',
        title: 'Clean Code',
        description: 'Well-structured, maintainable code following best practices.',
      },
    ]}
  />
)

export const SmallIcons = () => (
  <Features
    title="Compact Feature List"
    features={defaultFeatures}
    iconSize="sm"
    spacing="md"
  />
)

export const WithCustomBackground = () => (
  <div style={{ backgroundColor: '#f8f9fa' }}>
    <Features
      title="Stand Out Features"
      subtitle="What makes us different"
      features={defaultFeatures}
      iconColor="dark"
    />
  </div>
)