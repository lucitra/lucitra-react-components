import ErrorBoundary, { ErrorFallback } from './ErrorBoundary'

const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Simulated error for testing')
  }
  return <div>This component is working normally</div>
}

export default {
  title: 'Components/Organisms/Feedback/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = {
  args: {
    children: <ThrowError shouldThrow={false} />,
  },
}

export const WithError = {
  args: {
    children: <ThrowError shouldThrow={true} />,
  },
}

export const CustomFallback = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    fallbackProps: {
      title: 'Custom Error Title',
      message: 'This is a custom error message.',
      buttonText: 'Try Again',
      useI18n: false,
    },
  },
}

export const ErrorFallbackComponent = {
  render: () => (
    <ErrorFallback 
      title="Standalone Error Display"
      message="This shows how the error fallback looks independently."
      buttonText="Refresh"
      useI18n={false}
    />
  ),
}

export const ErrorFallbackSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <ErrorFallback 
        title="Small Container"
        containerSize="xs"
        useI18n={false}
      />
      <ErrorFallback 
        title="Large Container"
        containerSize="lg"
        useI18n={false}
      />
    </div>
  ),
}