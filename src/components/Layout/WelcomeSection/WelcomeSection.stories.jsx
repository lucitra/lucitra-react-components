import WelcomeSection from './WelcomeSection'

export default {
  title: 'Components/Organisms/Layout/WelcomeSection',
  component: WelcomeSection,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    titleOrder: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    textSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export const Default = {
  args: {
    title: 'Welcome to React',
    description: 'This is a React SPA template with best practices.',
  },
}

export const WithI18n = {
  args: {
    useI18n: true,
    titleKey: 'welcome',
    descriptionKey: 'app.description',
    descriptionFallback: 'This is a React SPA template with best practices.',
  },
}

export const CustomSizes = {
  args: {
    title: 'Custom Welcome Section',
    description: 'This example shows different title and text sizes.',
    titleOrder: 2,
    textSize: 'md',
  },
}

export const WithCustomGap = {
  args: {
    title: 'Welcome',
    description: 'This section has custom spacing between elements.',
    gap: 'xl',
  },
}