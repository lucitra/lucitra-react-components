import React from 'react';
import { PageLayout, PageSection, SectionDivider, ModernContainer } from './index';
import Button from '../../Forms/Button';
import { Card } from '../../DataDisplay/Card';
import { Text } from '../../Typography/Text';
import { Heading } from '../../Typography/Heading';
import { Grid, Stack } from '@mantine/core';

export default {
  title: 'Layout/ModernLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => (
  <PageLayout>
    <PageSection>
      <ModernContainer>
        <Heading size="xl" weight="bold" style={{ marginBottom: 16 }}>
          Modern Page Layout
        </Heading>
        <Text color="dimmed">
          This layout features symmetrical padding and borders that extend from top to bottom of the page.
        </Text>
      </ModernContainer>
    </PageSection>
    
    <PageSection background="muted">
      <ModernContainer>
        <Heading size="lg" weight="semibold" style={{ marginBottom: 16 }}>
          Full Width Section
        </Heading>
        <Text color="dimmed">
          Notice how the horizontal lines extend to the edge of the viewport while content remains contained.
        </Text>
      </ModernContainer>
    </PageSection>
    
    <PageSection>
      <ModernContainer>
        <Heading size="lg" weight="semibold" style={{ marginBottom: 16 }}>
          Another Section
        </Heading>
        <Text color="dimmed">
          Each section has subtle borders that will adapt well to dark mode.
        </Text>
      </ModernContainer>
    </PageSection>
  </PageLayout>
);

export const WithSectionDividers = () => (
  <PageLayout>
    <PageSection borderTop={false}>
      <ModernContainer>
        <Heading size="xl" weight="bold" style={{ marginBottom: 16 }}>
          Section with Dividers
        </Heading>
        <Text color="dimmed">
          Using SectionDivider components for more control over spacing.
        </Text>
      </ModernContainer>
    </PageSection>
    
    <SectionDivider />
    
    <PageSection borderTop={false} background="subtle">
      <ModernContainer>
        <Heading size="lg" weight="semibold" style={{ marginBottom: 16 }}>
          Divided Section
        </Heading>
        <Text color="dimmed">
          The divider extends across the full viewport width.
        </Text>
      </ModernContainer>
    </PageSection>
    
    <SectionDivider variant="dashed" spacing="lg" />
    
    <PageSection borderTop={false}>
      <ModernContainer>
        <Heading size="lg" weight="semibold" style={{ marginBottom: 16 }}>
          Final Section
        </Heading>
        <Text color="dimmed">
          Different divider styles can be used for visual hierarchy.
        </Text>
      </ModernContainer>
    </PageSection>
  </PageLayout>
);

export const LinearStyleLayout = () => (
  <PageLayout maxWidth="2xl">
    <PageSection borderTop={false} style={{ paddingTop: 80 }}>
      <ModernContainer>
        <Stack align="center" spacing="xl">
          <Heading size="xxl" weight="bold" align="center">
            Linear-Style Layout
          </Heading>
          <Text size="lg" color="dimmed" align="center" style={{ maxWidth: 600 }}>
            Clean, minimal design with symmetrical spacing and subtle borders
          </Text>
          <div style={{ display: 'flex', gap: 16 }}>
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="subtle">Learn More</Button>
          </div>
        </Stack>
      </ModernContainer>
    </PageSection>
    
    <PageSection background="subtle">
      <ModernContainer size="lg">
        <Grid gutter="xl">
          <Grid.Col md={4}>
            <Stack spacing="sm">
              <Heading size="md" weight="semibold">Feature One</Heading>
              <Text size="sm" color="dimmed">
                Description of the first feature with clean typography.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col md={4}>
            <Stack spacing="sm">
              <Heading size="md" weight="semibold">Feature Two</Heading>
              <Text size="sm" color="dimmed">
                Description of the second feature maintaining consistency.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col md={4}>
            <Stack spacing="sm">
              <Heading size="md" weight="semibold">Feature Three</Heading>
              <Text size="sm" color="dimmed">
                Description of the third feature with the same style.
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </ModernContainer>
    </PageSection>
    
    <PageSection>
      <ModernContainer size="md">
        <Stack spacing="lg">
          <Heading size="lg">Content Section</Heading>
          <Text>
            This demonstrates how content looks within a constrained container,
            similar to Linear&apos;s documentation pages.
          </Text>
          <Text>
            The borders and spacing create a clean, organized layout that works
            well for both light and dark themes.
          </Text>
        </Stack>
      </ModernContainer>
    </PageSection>
  </PageLayout>
);

export const ComponentShowcase = () => (
  <PageLayout>
    <PageSection borderTop={false} style={{ paddingTop: 60 }}>
      <ModernContainer>
        <Heading size="xl" weight="bold" style={{ marginBottom: 32 }}>
          Component Examples
        </Heading>
        
        <Stack spacing="xl">
          {/* Cards Section */}
          <div>
            <Heading size="lg" weight="semibold" style={{ marginBottom: 16 }}>
              Cards
            </Heading>
            <Grid gutter="md">
              <Grid.Col md={4}>
                <Card shadow="sm" padding="lg">
                  <Heading size="md" weight="medium" style={{ marginBottom: 8 }}>
                    Default Card
                  </Heading>
                  <Text size="sm" color="dimmed">
                    Standard card with shadow and background.
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col md={4}>
                <Card shadow="sm" padding="lg" style={{ border: '2px solid var(--mantine-color-gray-3)' }}>
                  <Heading size="md" weight="medium" style={{ marginBottom: 8 }}>
                    Bordered Card
                  </Heading>
                  <Text size="sm" color="dimmed">
                    Card with prominent border styling.
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col md={4}>
                <Card shadow="none" padding="lg" style={{ backgroundColor: 'transparent', border: '1px solid var(--mantine-color-gray-2)' }}>
                  <Heading size="md" weight="medium" style={{ marginBottom: 8 }}>
                    Ghost Card
                  </Heading>
                  <Text size="sm" color="dimmed">
                    Minimal card with subtle border.
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </div>

          {/* Buttons Section */}
          <div>
            <Heading size="lg" weight="semibold" style={{ marginBottom: 16 }}>
              Buttons
            </Heading>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="subtle">Subtle</Button>
              <Button variant="filled" color="red">Destructive</Button>
              <Button variant="light">Light</Button>
            </div>
          </div>
        </Stack>
      </ModernContainer>
    </PageSection>

    <SectionDivider variant="dashed" spacing="lg" />

    {/* Code Example Section */}
    <PageSection borderTop={false} background="subtle">
      <ModernContainer size="md">
        <Heading size="lg" weight="bold" style={{ marginBottom: 24 }}>
          Usage Example
        </Heading>
        <Card shadow="sm" padding="lg" style={{ fontFamily: 'monospace', fontSize: 14 }}>
          <pre style={{ margin: 0, overflow: 'auto' }}>
{`<PageLayout>
  <PageSection>
    <ModernContainer>
      <h1>Your Content Here</h1>
    </ModernContainer>
  </PageSection>
  
  <SectionDivider />
  
  <PageSection background="muted">
    <ModernContainer size="lg">
      <Card>
        <p>Card content</p>
      </Card>
    </ModernContainer>
  </PageSection>
</PageLayout>`}
          </pre>
        </Card>
      </ModernContainer>
    </PageSection>

    {/* Footer */}
    <PageSection borderBottom>
      <ModernContainer>
        <Text align="center" color="dimmed">
          Built with React, Mantine UI, and modern design principles
        </Text>
      </ModernContainer>
    </PageSection>
  </PageLayout>
);

export const ResponsiveContainers = () => (
  <PageLayout>
    <PageSection>
      <ModernContainer size="sm">
        <Card shadow="sm" padding="lg">
          <Heading size="md">Small Container (640px)</Heading>
          <Text size="sm" color="dimmed">Perfect for focused content</Text>
        </Card>
      </ModernContainer>
    </PageSection>

    <PageSection background="muted">
      <ModernContainer size="md">
        <Card shadow="sm" padding="lg">
          <Heading size="md">Medium Container (768px)</Heading>
          <Text size="sm" color="dimmed">Good for article-style content</Text>
        </Card>
      </ModernContainer>
    </PageSection>

    <PageSection>
      <ModernContainer size="lg">
        <Card shadow="sm" padding="lg">
          <Heading size="md">Large Container (1024px)</Heading>
          <Text size="sm" color="dimmed">Standard content width</Text>
        </Card>
      </ModernContainer>
    </PageSection>

    <PageSection background="muted">
      <ModernContainer size="xl">
        <Card shadow="sm" padding="lg">
          <Heading size="md">XL Container (1280px)</Heading>
          <Text size="sm" color="dimmed">Wide content layouts</Text>
        </Card>
      </ModernContainer>
    </PageSection>

    <PageSection>
      <ModernContainer size="2xl">
        <Card shadow="sm" padding="lg">
          <Heading size="md">2XL Container (1536px)</Heading>
          <Text size="sm" color="dimmed">Maximum content width</Text>
        </Card>
      </ModernContainer>
    </PageSection>
  </PageLayout>
);