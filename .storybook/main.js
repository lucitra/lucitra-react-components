/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-a11y'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen',
  },

  async viteFinal(config) {
    // Ensure proper handling of ES modules
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        '@mantine/core',
        '@mantine/hooks',
        '@tabler/icons-react',
        'prop-types'
      ],
    }
    return config
  },

  staticDirs: ['../public']
}

export default config