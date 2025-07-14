import Container from './Container'

export default {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export const Default = {
  args: {
    children: (
      <div style={{ background: '#f1f3f4', padding: '16px', borderRadius: '8px' }}>
        Default Container Content
      </div>
    ),
  },
}

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
      <Container key={size} size={size}>
        <div style={{ background: '#f1f3f4', padding: '16px', borderRadius: '8px' }}>
          Container size: {size}
        </div>
      </Container>
    ))}
  </div>
)

export const WithContent = {
  args: {
    children: (
      <div>
        <h2>Welcome to our application</h2>
        <p>This is some sample content inside a container component.</p>
        <p>The container provides consistent spacing and max-width constraints.</p>
      </div>
    ),
  },
}