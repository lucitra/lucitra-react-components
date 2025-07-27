import React from 'react'
import Page from './Page'
import { Container, Title, Text } from '@mantine/core'

export default {
  title: 'Layout/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = () => (
  <Page>
    <Container size="lg" py="xl">
      <Title order={1}>Page Component</Title>
      <Text>This is a basic page wrapper component.</Text>
    </Container>
  </Page>
)

export const WithCustomBackground = () => (
  <Page backgroundColor="#f8f9fa">
    <Container size="lg" py="xl">
      <Title order={1}>Custom Background</Title>
      <Text>This page has a custom background color.</Text>
    </Container>
  </Page>
)

export const WithGradientBackground = () => (
  <Page backgroundColor="linear-gradient(180deg, #f3f4f6 0%, #ffffff 100%)">
    <Container size="lg" py="xl">
      <Title order={1}>Gradient Background</Title>
      <Text>This page has a gradient background.</Text>
    </Container>
  </Page>
)

export const WithPadding = () => (
  <Page padding="2rem">
    <Title order={1}>Padded Page</Title>
    <Text>This page has padding applied to the entire page.</Text>
  </Page>
)

export const WithCustomHeight = () => (
  <Page minHeight="50vh" backgroundColor="#e9ecef">
    <Container size="lg" py="xl">
      <Title order={1}>Custom Height</Title>
      <Text>This page has a custom minimum height of 50vh.</Text>
    </Container>
  </Page>
)