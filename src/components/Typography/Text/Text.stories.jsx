import Text from './Text'

export default {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
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
    variant: {
      control: 'select',
      options: ['text', 'dimmed', 'gradient']
    },
    transform: {
      control: 'select',
      options: ['none', 'capitalize', 'uppercase', 'lowercase']
    },
    decoration: {
      control: 'select',
      options: ['none', 'underline', 'line-through']
    },
    color: {
      control: 'color'
    },
    italic: {
      control: 'boolean'
    }
  }
}

export const Default = {
  args: {
    children: 'This is a default text component with standard styling.'
  }
}

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text (default)</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl">Extra large text</Text>
    </div>
  )
}

export const Weights = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text weight={300}>Light text (300)</Text>
      <Text weight={400}>Regular text (400)</Text>
      <Text weight={500}>Medium text (500)</Text>
      <Text weight={600}>Semibold text (600)</Text>
      <Text weight={700}>Bold text (700)</Text>
    </div>
  )
}

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text variant="text">Default text variant</Text>
      <Text variant="dimmed">Dimmed text variant</Text>
      <Text variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
        Gradient text variant
      </Text>
    </div>
  )
}

export const TextTransform = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text transform="none">no text transform applied</Text>
      <Text transform="capitalize">capitalize text transform</Text>
      <Text transform="uppercase">uppercase text transform</Text>
      <Text transform="lowercase">LOWERCASE TEXT TRANSFORM</Text>
    </div>
  )
}

export const Decorations = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text decoration="none">No decoration</Text>
      <Text decoration="underline">Underlined text</Text>
      <Text decoration="line-through">Strikethrough text</Text>
    </div>
  )
}

export const Alignment = {
  render: () => (
    <div style={{ width: '100%' }}>
      <Text align="left">Left aligned text</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
      <Text align="justify">
        Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </div>
  )
}

export const Truncation = {
  render: () => (
    <div style={{ maxWidth: '300px' }}>
      <Text truncate>
        This is a very long text that will be truncated with an ellipsis at the end
      </Text>
      <Text lineClamp={2} style={{ marginTop: '1rem' }}>
        This text has a line clamp of 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </Text>
    </div>
  )
}

export const BlogParagraph = {
  render: () => (
    <article style={{ maxWidth: '600px' }}>
      <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
        Introduction to Modern Web Development
      </Text>
      <Text color="dimmed" style={{ marginBottom: '1rem' }}>
        Published on January 15, 2024 • 5 min read
      </Text>
      <Text style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
        Web development has evolved significantly over the past decade. 
        What once required complex server setups and monolithic architectures 
        can now be achieved with modern frameworks and cloud services.
      </Text>
      <Text style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
        In this article, we&apos;ll explore the key technologies and patterns that 
        define modern web development, from component-based architectures to 
        serverless deployments.
      </Text>
      <Text italic color="dimmed" size="sm">
        Note: This article assumes basic knowledge of HTML, CSS, and JavaScript.
      </Text>
    </article>
  )
}