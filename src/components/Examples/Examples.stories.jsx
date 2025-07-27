import React from "react";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import HubSpotThemeExample from "./HubSpotThemeExample";

export default {
  title: "Examples/Complete Pages",
  parameters: {
    layout: "fullscreen",
  },
};

export const HomePageExample = () => <HomePage />;

export const LandingPageExample = () => <LandingPage />;

export const HubSpotTheme = () => <HubSpotThemeExample />;

// Code preview example showing how to compose pages
export const CodeExample = () => (
  <div
    style={{ padding: "2rem", backgroundColor: "#f8f9fa", minHeight: "100vh" }}
  >
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Building Pages with Lucitra Components</h1>
      <p>
        Here&apos;s how you can compose complete pages using the component
        library:
      </p>

      <pre
        style={{
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          padding: "1.5rem",
          borderRadius: "8px",
          overflow: "auto",
        }}
      >
        {`import { Page, Header, Hero, Features, Footer } from '@lucitra/react-components';

export default function HomePage() {
  return (
    <Page>
      <Header
        logo="Your Brand"
        navigation={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
          { name: 'Services', href: '/services' },
        ]}
      />

      <Hero
        title="Welcome to Our Site"
        subtitle="Built with Lucitra Components"
        primaryAction={{ label: 'Get Started', href: '/start' }}
      />

      <Features
        title="Our Features"
        features={[
          {
            title: 'Fast',
            description: 'Lightning fast performance'
          },
          {
            title: 'Secure',
            description: 'Enterprise-grade security'
          },
          {
            title: 'Scalable',
            description: 'Grows with your business'
          }
        ]}
      />

      <Footer />
    </Page>
  );
}`}
      </pre>

      <h2>Available Page Components</h2>
      <ul>
        <li>
          <strong>Page</strong> - Main wrapper component
        </li>
        <li>
          <strong>Header</strong> - Navigation header with logo and menu
        </li>
        <li>
          <strong>Hero</strong> - Hero section with CTA buttons
        </li>
        <li>
          <strong>Features</strong> - Feature grid with icons
        </li>
        <li>
          <strong>Footer</strong> - Page footer
        </li>
        <li>
          <strong>Container</strong> - Content container with max-width
        </li>
        <li>
          <strong>Grid</strong> - Responsive grid layout
        </li>
        <li>
          <strong>Card</strong> - Content cards
        </li>
      </ul>

      <h2>HubSpot Integration</h2>
      <p>
        These components can be easily integrated into HubSpot themes. Each
        component accepts configuration props that can be mapped from HubSpot
        module fields.
      </p>
    </div>
  </div>
);
