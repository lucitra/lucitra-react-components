import { Component } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Title, Text, Stack, Button } from '@mantine/core'
import PropTypes from 'prop-types'

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback {...this.props.fallbackProps} />
    }

    return this.props.children
  }
}

function ErrorFallback({ 
  title,
  message,
  buttonText,
  onReload,
  useI18n = true,
  titleKey = 'error.title',
  messageKey = 'error.message',
  buttonKey = 'error.reload',
  titleFallback = 'Something went wrong',
  messageFallback = 'An unexpected error occurred. Please try refreshing the page.',
  buttonFallback = 'Reload page',
  containerSize = 'sm',
  containerStyle = { textAlign: 'center', padding: '2rem' },
  stackGap = 'md'
}) {
  const { t } = useTranslation()
  
  const handleReload = onReload || (() => {
    window.location.reload()
  })

  const displayTitle = useI18n && !title ? t(titleKey, titleFallback) : title || titleFallback
  const displayMessage = useI18n && !message ? t(messageKey, messageFallback) : message || messageFallback
  const displayButtonText = useI18n && !buttonText ? t(buttonKey, buttonFallback) : buttonText || buttonFallback

  return (
    <Container size={containerSize} style={containerStyle}>
      <Stack gap={stackGap}>
        <Title order={1}>{displayTitle}</Title>
        <Text size="lg">{displayMessage}</Text>
        <Button onClick={handleReload}>
          {displayButtonText}
        </Button>
      </Stack>
    </Container>
  )
}

ErrorBoundaryClass.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.element,
  fallbackProps: PropTypes.object,
  onError: PropTypes.func,
}

ErrorFallback.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  buttonText: PropTypes.string,
  onReload: PropTypes.func,
  useI18n: PropTypes.bool,
  titleKey: PropTypes.string,
  messageKey: PropTypes.string,
  buttonKey: PropTypes.string,
  titleFallback: PropTypes.string,
  messageFallback: PropTypes.string,
  buttonFallback: PropTypes.string,
  containerSize: PropTypes.string,
  containerStyle: PropTypes.object,
  stackGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default ErrorBoundaryClass
export { ErrorFallback }