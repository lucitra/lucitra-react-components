import DevTools from './DevTools'

export default {
  title: 'Platform Tools/DevTools',
  component: DevTools,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A development-only floating widget that provides quick access to package versions, environment information, and common development actions. Features a draggable HubSpot-style button that can be positioned anywhere along the screen edges.',
      },
    },
  },
  argTypes: {
    packageInfo: {
      control: 'object',
      description: 'Package information object containing name, version, dependencies, etc.',
    },
    environment: {
      control: 'object',
      description: 'Environment information object',
    },
    showInProduction: {
      control: 'boolean',
      description: 'Whether to show in production builds',
    },
    initialPosition: {
      control: 'object',
      description: 'Initial position of the widget',
    },
    onRefresh: {
      action: 'refresh',
      description: 'Custom refresh handler',
    },
    onClearCache: {
      action: 'clearCache',
      description: 'Custom cache clearing handler',
    },
  },
}

// Mock package info
const mockPackageInfo = {
  name: 'my-react-app',
  version: '1.0.0',
  dependencies: {
    '@lucitra/react-components': '0.4.5',
    'react': '^19.1.0',
    'i18next': '25.3.1',
  },
  devDependencies: {
    'vite': '^7.0.0',
    'tailwindcss': '4.1.11',
  },
}

const mockEnvironment = {
  mode: 'development',
  baseUrl: '/',
}

export const Default = {
  args: {
    packageInfo: mockPackageInfo,
    environment: mockEnvironment,
    showInProduction: false,
    initialPosition: { side: 'right', y: 300 },
  },
}

export const LeftSide = {
  args: {
    packageInfo: mockPackageInfo,
    environment: mockEnvironment,
    showInProduction: false,
    initialPosition: { side: 'left', y: 200 },
  },
}

export const ProductionMode = {
  args: {
    packageInfo: mockPackageInfo,
    environment: {
      mode: 'production',
      baseUrl: '/my-app/',
    },
    showInProduction: true,
    initialPosition: { side: 'right', y: 400 },
  },
}

export const MinimalPackageInfo = {
  args: {
    packageInfo: {
      name: 'simple-app',
      version: '0.1.0',
    },
    environment: {
      mode: 'development',
    },
    showInProduction: false,
    initialPosition: { side: 'right', y: 150 },
  },
}

export const WithCustomHandlers = {
  args: {
    packageInfo: mockPackageInfo,
    environment: mockEnvironment,
    showInProduction: false,
    initialPosition: { side: 'right', y: 350 },
    onRefresh: () => alert('Custom refresh handler called!'),
    onClearCache: () => alert('Custom cache clear handler called!'),
  },
}