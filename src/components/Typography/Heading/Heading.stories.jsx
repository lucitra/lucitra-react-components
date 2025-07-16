import Heading from './Heading'

export default {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6]
    },
    size: {
      control: 'select', 
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    weight: {
      control: 'select',
      options: [300, 400, 500, 600, 700, 800, 900]
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify']
    },
    color: {
      control: 'color'
    }
  }
}

export const Default = {
  args: {
    children: 'Default Heading',
    level: 2
  }
}

export const AllLevels = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  )
}

export const CustomSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={2} size="xs">Extra Small Heading</Heading>
      <Heading level={2} size="sm">Small Heading</Heading>
      <Heading level={2} size="md">Medium Heading</Heading>
      <Heading level={2} size="lg">Large Heading</Heading>
      <Heading level={2} size="xl">Extra Large Heading</Heading>
    </div>
  )
}

export const Weights = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={2} weight={300}>Light Weight (300)</Heading>
      <Heading level={2} weight={400}>Normal Weight (400)</Heading>
      <Heading level={2} weight={600}>Semi Bold Weight (600)</Heading>
      <Heading level={2} weight={700}>Bold Weight (700)</Heading>
      <Heading level={2} weight={900}>Black Weight (900)</Heading>
    </div>
  )
}

export const Alignment = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <Heading level={3} align="left">Left Aligned Heading</Heading>
      <Heading level={3} align="center">Center Aligned Heading</Heading>
      <Heading level={3} align="right">Right Aligned Heading</Heading>
    </div>
  )
}

export const Colors = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={2}>Default Color</Heading>
      <Heading level={2} color="blue">Blue Heading</Heading>
      <Heading level={2} color="green">Green Heading</Heading>
      <Heading level={2} color="red">Red Heading</Heading>
      <Heading level={2} color="dimmed">Dimmed Heading</Heading>
    </div>
  )
}

export const BlogPostExample = {
  render: () => (
    <article style={{ maxWidth: '800px' }}>
      <Heading level={1} size="xl" weight={700} style={{ marginBottom: '0.5rem' }}>
        Understanding Modern Web Development
      </Heading>
      <Heading level={3} color="dimmed" weight={400} style={{ marginBottom: '2rem' }}>
        A comprehensive guide to building scalable applications
      </Heading>
      <Heading level={2} style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        Introduction
      </Heading>
      <p style={{ marginBottom: '1rem' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </p>
      <Heading level={3} style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        Getting Started
      </Heading>
      <p>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
      </p>
    </article>
  )
}