import React from 'react'
import { Container, Grid, Title, Text, Box, ThemeIcon } from '@mantine/core'
import PropTypes from 'prop-types'

const Features = ({
  title,
  subtitle,
  features = [],
  columns = { base: 1, sm: 2, lg: 3 },
  iconSize = 'lg',
  iconColor = 'blue',
  spacing = 'xl',
  ...props
}) => {
  return (
    <Box py={spacing} {...props}>
      <Container size="lg">
        {(title || subtitle) && (
          <Box ta="center" mb={spacing}>
            {title && (
              <Title order={2} size="h1" fw={700} mb="md">
                {title}
              </Title>
            )}
            {subtitle && (
              <Text size="lg" c="dimmed" maw={600} mx="auto">
                {subtitle}
              </Text>
            )}
          </Box>
        )}

        <Grid gutter={spacing}>
          {features.map((feature, index) => (
            <Grid.Col key={feature.key || index} span={columns}>
              <Box>
                {feature.icon && (
                  <ThemeIcon
                    size={iconSize === 'lg' ? 60 : iconSize === 'md' ? 48 : 36}
                    radius={iconSize === 'lg' ? 30 : iconSize === 'md' ? 24 : 18}
                    color={feature.iconColor || iconColor}
                    mb="md"
                  >
                    {React.isValidElement(feature.icon) ? (
                      feature.icon
                    ) : (
                      <feature.icon size={iconSize === 'lg' ? 30 : iconSize === 'md' ? 24 : 18} />
                    )}
                  </ThemeIcon>
                )}
                
                <Title order={3} size="h4" fw={600} mb="xs">
                  {feature.title}
                </Title>
                
                <Text c="dimmed" size="sm">
                  {feature.description}
                </Text>

                {feature.link && (
                  <Text
                    component="a"
                    href={feature.link.href}
                    onClick={feature.link.onClick}
                    size="sm"
                    c={iconColor}
                    fw={500}
                    style={{ 
                      textDecoration: 'none',
                      cursor: 'pointer',
                      display: 'inline-block',
                      marginTop: '0.5rem'
                    }}
                  >
                    {feature.link.text || 'Learn more →'}
                  </Text>
                )}
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

Features.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
      iconColor: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.shape({
        text: PropTypes.string,
        href: PropTypes.string,
        onClick: PropTypes.func
      }),
      key: PropTypes.string
    })
  ).isRequired,
  columns: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      base: PropTypes.number,
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number
    })
  ]),
  iconSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  iconColor: PropTypes.string,
  spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Features