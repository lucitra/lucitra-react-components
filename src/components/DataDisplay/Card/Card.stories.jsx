import Card from './Card'
import Button from '../../Forms/Button/Button'
import { IconHeart, IconShare, IconBookmark } from '@tabler/icons-react'

export default {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    shadow: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    radius: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    padding: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    withBorder: {
      control: 'boolean'
    }
  }
}

export const Basic = {
  args: {
    shadow: 'sm',
    padding: 'lg',
    radius: 'md',
    withBorder: false,
    children: (
      <>
        <Card.Title>Basic Card</Card.Title>
        <p style={{ marginTop: '0.5rem' }}>
          This is a simple card with basic content. Cards are surfaces that display content and actions on a single topic.
        </p>
      </>
    )
  }
}

export const WithCompoundComponents = {
  render: () => (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 400 }}>
      <Card.Header style={{ padding: '1rem 1rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Card.Title order={2}>Blog Post Title</Card.Title>
          <Card.Meta>5 min read</Card.Meta>
        </div>
      </Card.Header>
      
      <Card.Body>
        <p style={{ margin: 0 }}>
          This is an example of using compound components to create a well-structured card. 
          Each section has its own purpose and styling.
        </p>
      </Card.Body>
      
      <Card.Footer style={{ padding: '1rem' }}>
        <Card.Actions style={{ justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="subtle" size="xs" leftSection={<IconHeart size={16} />}>
              24
            </Button>
            <Button variant="subtle" size="xs" leftSection={<IconShare size={16} />}>
              Share
            </Button>
          </div>
          <Button variant="subtle" size="xs">
            <IconBookmark size={16} />
          </Button>
        </Card.Actions>
      </Card.Footer>
    </Card>
  )
}

export const BlogPostCard = {
  render: () => (
    <Card shadow="md" padding="xl" radius="md" style={{ maxWidth: 350 }}>
      <Card.Section style={{ height: 200, background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' }} />
      
      <Card.Body padding="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <Card.Meta>Technology</Card.Meta>
          <Card.Meta>Jan 15, 2024</Card.Meta>
        </div>
        
        <Card.Title order={3} style={{ marginBottom: '0.5rem' }}>
          Understanding React Server Components
        </Card.Title>
        
        <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--mantine-color-dimmed)', margin: '0 0 1rem 0' }}>
          A deep dive into React Server Components and how they change the way we think about building React applications.
        </p>
        
        <Card.Actions>
          <Button variant="light" fullWidth>
            Read Article
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  )
}

export const ProductCard = {
  render: () => (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 300 }}>
      <Card.Section style={{ height: 160, background: '#f0f0f0' }} />
      
      <Card.Body padding="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <div>
            <Card.Title order={4}>Premium Headphones</Card.Title>
            <Card.Meta>Electronics</Card.Meta>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>$299</span>
        </div>
        
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>
          High-quality wireless headphones with active noise cancellation.
        </p>
        
        <Card.Actions style={{ marginTop: '1rem' }}>
          <Button variant="filled" size="sm" fullWidth>
            Add to Cart
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  )
}

export const SimpleCard = {
  args: {
    shadow: 'xs',
    padding: 'md',
    children: 'Simple card with minimal styling'
  }
}

export const ComplexLayout = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
      {[1, 2, 3].map((i) => (
        <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Header>
            <Card.Title order={3}>Card {i}</Card.Title>
          </Card.Header>
          <Card.Body>
            <p style={{ margin: 0 }}>This demonstrates how cards work in a grid layout.</p>
          </Card.Body>
          <Card.Footer>
            <Card.Actions style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button variant="subtle" size="xs">Learn More</Button>
            </Card.Actions>
          </Card.Footer>
        </Card>
      ))}
    </div>
  )
}