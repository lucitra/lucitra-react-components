import Button from './Button'

export default {
  title: 'Components/Atoms/FormButton',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'filled', 'outline', 'subtle', 'light', 'gradient'],
    },
  },
}

export const Default = {
  args: {
    children: 'Click me',
  },
}

export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="filled">Filled</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="subtle">Subtle</Button>
    <Button variant="light">Light</Button>
    <Button variant="gradient">Gradient</Button>
  </div>
)