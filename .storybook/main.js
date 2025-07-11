/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
  async viteFinal(config) {
    // Add Tailwind CSS Vite plugin
    const tailwindcss = (await import('@tailwindcss/vite')).default;
    
    return {
      ...config,
      plugins: [...(config.plugins || []), tailwindcss()],
      css: {
        postcss: './postcss.config.cjs',
      },
    }
  },
}

export default config