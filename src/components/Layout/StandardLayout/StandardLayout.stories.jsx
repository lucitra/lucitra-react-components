import React from 'react';
import { StandardPage, StandardPageContainer, StandardHeader, StandardHeroSection } from './index';
import { Button } from '../../Forms/Button';
import { Card } from '../../DataDisplay/Card';
import { Text } from '../../Typography/Text';
import { Heading } from '../../Typography/Heading';

export default {
  title: 'Layout/StandardLayout',
  component: StandardPage,
};

const Logo = () => (
  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>LUCITRA</div>
);

const navigationItems = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
];

const headerActions = (
  <>
    <Button variant="outline" size="sm">Sign In</Button>
    <Button size="sm">Get Started</Button>
  </>
);

export const FullPageWithVideo = () => (
  <StandardPage
    header={{
      logo: <Logo />,
      navigationItems,
      actions: headerActions,
      transparent: true
    }}
    hero={{
      videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
      videoPoster: 'https://via.placeholder.com/1920x1080',
      title: 'Welcome to Lucitra',
      subtitle: 'Build amazing experiences with our component library',
      actions: (
        <>
          <Button size="lg" variant="filled">Get Started</Button>
          <Button size="lg" variant="outline" style={{ color: 'white', borderColor: 'white' }}>Learn More</Button>
        </>
      )
    }}
  >
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
      <Heading level={2} style={{ marginBottom: '24px' }}>Features</Heading>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <Card>
          <Heading level={3}>Consistent Layout</Heading>
          <Text>16px padding on left and right, 12px on top, 24px on bottom. Clean and consistent across all pages.</Text>
        </Card>
        
        <Card>
          <Heading level={3}>Grey Border Box</Heading>
          <Text>A subtle grey border creates a contained content area while maintaining visual hierarchy.</Text>
        </Card>
        
        <Card>
          <Heading level={3}>Transparent Navigation</Heading>
          <Text>Floating transparent navigation bar with backdrop blur for a modern, clean look.</Text>
        </Card>
      </div>

      <Heading level={2} style={{ marginBottom: '24px' }}>About This Layout</Heading>
      <Text>
        This layout system provides a consistent structure for all pages in the Lucitra component libraries.
        The hero section supports video backgrounds similar to thenewindustrials.com, creating an engaging
        first impression while maintaining clean, professional aesthetics.
      </Text>
    </div>
  </StandardPage>
);

export const PageWithoutVideo = () => (
  <StandardPage
    header={{
      logo: <Logo />,
      navigationItems,
      actions: headerActions,
      transparent: false
    }}
    showBorder={true}
  >
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 16px 0' }}>
      <Heading level={1} style={{ marginBottom: '24px' }}>Page Without Video</Heading>
      <Text>
        This example shows the StandardPage component without a hero video section. 
        The content starts immediately after the header, with the same consistent padding applied.
      </Text>
    </div>
  </StandardPage>
);

export const ContainerOnly = () => (
  <StandardPageContainer showBorder={true}>
    <div style={{ padding: '80px 16px' }}>
      <Heading level={2}>StandardPageContainer Example</Heading>
      <Text>
        This shows just the container component with the grey border box. 
        Notice the 16px left/right padding, 12px top padding, and 24px bottom padding.
      </Text>
    </div>
  </StandardPageContainer>
);

export const HeaderOnly = () => (
  <div style={{ height: '200px', position: 'relative', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
    <StandardHeader
      logo={<Logo />}
      navigationItems={navigationItems}
      actions={headerActions}
      transparent={true}
    />
  </div>
);

export const HeroSectionOnly = () => (
  <StandardHeroSection
    videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
    videoPoster="https://via.placeholder.com/1920x1080"
    title="Hero Section Component"
    subtitle="This component can be used independently for video hero sections"
    actions={
      <>
        <Button size="lg" variant="filled">Primary Action</Button>
        <Button size="lg" variant="outline" style={{ color: 'white', borderColor: 'white' }}>Secondary Action</Button>
      </>
    }
  />
);