# Page Composition Guide

This guide demonstrates how to use @lucitra-react-components to build complete pages and applications, similar to HubSpot themes.

## Core Page Components

### Page
The main wrapper component for all pages.

```jsx
import { Page } from '@lucitra/react-components';

<Page 
  backgroundColor="#ffffff"
  minHeight="100vh"
  theme={customTheme} // Optional Mantine theme
>
  {/* Page content */}
</Page>
```

### Header
Navigation header with logo, menu items, and actions.

```jsx
import { Header } from '@lucitra/react-components';

<Header
  logo="Your Brand" // or custom React component
  navigation={[
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
  ]}
  actions={[
    { name: 'Sign In', href: '/signin' },
    <Button key="cta">Get Started</Button>
  ]}
  variant="solid" // 'solid' | 'transparent' | 'blur'
  position="sticky" // 'relative' | 'sticky' | 'absolute'
/>
```

### Hero
Hero section with title, subtitle, and call-to-action buttons.

```jsx
import { Hero } from '@lucitra/react-components';

<Hero
  title="Welcome to Our Platform"
  subtitle="Build amazing things with our components"
  primaryAction={{
    label: 'Get Started',
    href: '/signup',
    variant: 'filled'
  }}
  secondaryAction={{
    label: 'Learn More',
    href: '/docs',
    variant: 'outline'
  }}
/>
```

### Features
Feature grid with icons and descriptions.

```jsx
import { Features } from '@lucitra/react-components';
import { IconRocket, IconShield, IconCode } from '@tabler/icons-react';

<Features
  title="Why Choose Us?"
  subtitle="Everything you need in one place"
  features={[
    {
      icon: IconRocket,
      title: 'Fast Performance',
      description: 'Lightning fast load times',
      iconColor: 'blue'
    },
    {
      icon: IconShield,
      title: 'Secure',
      description: 'Enterprise-grade security',
      iconColor: 'green'
    }
  ]}
  columns={{ base: 1, sm: 2, lg: 3 }}
/>
```

### Footer
Page footer component.

```jsx
import { Footer } from '@lucitra/react-components';

<Footer />
```

## Complete Page Example

Here's how to compose a complete page:

```jsx
import React from 'react';
import { 
  Page, 
  Header, 
  Hero, 
  Features, 
  Footer,
  Container,
  Grid,
  Card,
  Button
} from '@lucitra/react-components';

export default function HomePage() {
  return (
    <Page>
      <Header 
        logo="Your Brand"
        navigation={[
          { name: 'Home', href: '/' },
          { name: 'Features', href: '#features' },
          { name: 'Pricing', href: '#pricing' },
          { name: 'Contact', href: '/contact' },
        ]}
        actions={[
          { name: 'Sign In', href: '/signin' },
          <Button key="signup" variant="filled">Sign Up</Button>
        ]}
      />
      
      <Hero 
        title="Build Amazing Web Applications"
        subtitle="Everything you need to create modern web experiences"
        primaryAction={{ label: 'Get Started', href: '/start' }}
        secondaryAction={{ label: 'View Demo', href: '/demo' }}
      />
      
      <Features 
        title="Powerful Features"
        features={[
          {
            title: 'Component Library',
            description: 'Pre-built, customizable components'
          },
          {
            title: 'Responsive Design',
            description: 'Works on all devices'
          },
          {
            title: 'Easy Integration',
            description: 'Drop-in components for any project'
          }
        ]}
      />
      
      <Footer />
    </Page>
  );
}
```

## HubSpot Theme Integration

These components are designed to work seamlessly with HubSpot themes. Here's an example:

```jsx
// HubSpot Theme Module
import { Page, Header, Hero, Features, Footer } from '@lucitra/react-components';

export default function HubSpotPageModule({ moduleData }) {
  // Map HubSpot module fields to component props
  const headerConfig = {
    logo: moduleData.logo,
    navigation: moduleData.navigation_items,
    actions: moduleData.header_actions
  };

  const heroConfig = {
    title: moduleData.hero_title,
    subtitle: moduleData.hero_subtitle,
    primaryAction: {
      label: moduleData.cta_primary_text,
      href: moduleData.cta_primary_link
    }
  };

  const featuresConfig = {
    title: moduleData.features_title,
    features: moduleData.feature_items
  };

  return (
    <Page>
      <Header {...headerConfig} />
      <Hero {...heroConfig} />
      <Features {...featuresConfig} />
      <Footer />
    </Page>
  );
}
```

## Advanced Layouts

### Landing Page with Pricing

```jsx
import { 
  Page, Header, Hero, Features, Container, 
  Grid, Card, Button, Title, Text, Badge 
} from '@lucitra/react-components';

function LandingPage() {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '$9',
      features: ['10 Projects', 'Basic Support']
    },
    {
      name: 'Pro',
      price: '$29',
      features: ['Unlimited Projects', 'Priority Support'],
      popular: true
    }
  ];

  return (
    <Page>
      <Header logo="SaaS App" />
      
      <Hero title="Start Building Today" />
      
      <Container size="lg" py="xl">
        <Title ta="center" mb="xl">Choose Your Plan</Title>
        
        <Grid>
          {pricingPlans.map(plan => (
            <Grid.Col key={plan.name} span={{ base: 12, md: 6 }}>
              <Card>
                <Card.Section withBorder inheritPadding py="xs">
                  <Group justify="space-between">
                    <Text fw={500}>{plan.name}</Text>
                    {plan.popular && <Badge>Popular</Badge>}
                  </Group>
                </Card.Section>
                
                <Card.Section inheritPadding mt="sm">
                  <Text size="2rem" fw={700}>{plan.price}</Text>
                  <Text size="sm" c="dimmed">/month</Text>
                </Card.Section>
                
                <Card.Section inheritPadding>
                  {plan.features.map(feature => (
                    <Text key={feature} size="sm">✓ {feature}</Text>
                  ))}
                </Card.Section>
                
                <Button fullWidth mt="md">Get Started</Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      
      <Footer />
    </Page>
  );
}
```

## Available Components for Page Building

### Layout Components
- `Page` - Main page wrapper
- `Header` - Navigation header
- `Hero` - Hero/banner section
- `Features` - Feature showcase grid
- `Footer` - Page footer
- `Container` - Content container
- `Grid` - Responsive grid system
- `Stack` - Vertical stack layout
- `Flex` - Flexible box layout

### Content Components
- `Card` - Content cards
- `Badge` - Status badges
- `Button` - Action buttons
- `Title` - Headings
- `Text` - Body text
- `Table` - Data tables

### Form Components
- `Input` - Text inputs
- `Select` - Dropdown selects
- `Checkbox` - Checkboxes
- `Radio` - Radio buttons

### Feedback Components
- `Alert` - Alert messages
- `Toast` - Toast notifications

## Best Practices

1. **Start with Page**: Always wrap your content in a `<Page>` component
2. **Use semantic structure**: Header → Hero → Content → Footer
3. **Responsive by default**: All components are mobile-first
4. **Consistent spacing**: Use the built-in spacing props
5. **Accessibility**: All components follow WCAG guidelines

## Import Example

```jsx
// Import everything you need
import {
  Page,
  Header,
  Hero,
  Features,
  Footer,
  Container,
  Grid,
  Card,
  Button,
  Title,
  Text
} from '@lucitra/react-components';

// Or import from specific categories
import { Page, Header, Hero, Features, Footer } from '@lucitra/react-components/Layout';
import { Button, Input, Select } from '@lucitra/react-components/Forms';
import { Card, Badge, Table } from '@lucitra/react-components/DataDisplay';
```

## Live Examples

Check out the Storybook for live examples:
- Examples/Complete Pages/Home Page Example
- Examples/Complete Pages/Landing Page Example
- Examples/Complete Pages/HubSpot Theme