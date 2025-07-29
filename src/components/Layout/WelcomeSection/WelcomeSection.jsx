import { Stack, Title, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function WelcomeSection({ 
  title, 
  description, 
  titleOrder = 1, 
  textSize = 'lg', 
  gap = 'lg',
  useI18n = true,
  titleKey = 'welcome',
  descriptionKey = 'app.description',
  descriptionFallback = 'This is a React SPA template with best practices.',
  className = '',
  align = 'center',
  ...props 
}) {
  const { t } = useTranslation()

  const displayTitle = useI18n && !title ? t(titleKey) : title
  const displayDescription = useI18n && !description 
    ? t(descriptionKey, descriptionFallback) 
    : description

  return (
    <Stack gap={gap} align={align} data-testid="welcome-section" className={className} {...props}>
      <Title order={titleOrder} ta={align} data-testid="welcome-heading">
        {displayTitle}
      </Title>
      <Text size={textSize} ta={align} data-testid="app-description">
        {displayDescription}
      </Text>
    </Stack>
  )
}

WelcomeSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  titleOrder: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  textSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  useI18n: PropTypes.bool,
  titleKey: PropTypes.string,
  descriptionKey: PropTypes.string,
  descriptionFallback: PropTypes.string,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
}

export default WelcomeSection