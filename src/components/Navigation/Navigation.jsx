import React, { useState } from 'react'
import { Box, Group, Title, UnstyledButton, Burger, Drawer, Stack, rem } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import PropTypes from 'prop-types'

const Navigation = ({
  logo,
  navigation = [],
  actions = [],
  variant = 'transparent', // 'transparent', 'solid', 'blur'
  position = 'absolute', // 'absolute', 'sticky', 'relative'
  onMobileMenuToggle,
  className,
  ...props
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    const newState = !mobileMenuOpen
    setMobileMenuOpen(newState)
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState)
    }
  }

  // Determine colors based on variant
  const getColors = () => {
    switch (variant) {
      case 'solid':
        return {
          background: '#ffffff',
          text: '#000000',
          border: 'rgba(0, 0, 0, 0.1)',
          mobileBackground: '#ffffff'
        }
      case 'blur':
        return {
          background: 'rgba(255, 255, 255, 0.95)',
          text: '#000000',
          border: 'rgba(0, 0, 0, 0.1)',
          mobileBackground: '#ffffff',
          backdropFilter: 'blur(10px)'
        }
      case 'transparent':
      default:
        return {
          background: 'transparent',
          text: '#ffffff',
          border: 'rgba(255, 255, 255, 0.1)',
          mobileBackground: '#111827'
        }
    }
  }

  const colors = getColors()

  const headerStyles = {
    position,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: colors.background,
    borderBottom: `1px solid ${colors.border}`,
    ...(colors.backdropFilter && { backdropFilter: colors.backdropFilter })
  }

  const navigationStyles = {
    padding: rem(24),
    '@media (min-width: 1024px)': {
      paddingLeft: rem(32),
      paddingRight: rem(32)
    }
  }

  return (
    <Box component=\"header\" style={headerStyles} className={className} {...props}>
      <Group justify=\"space-between\" style={navigationStyles}>
        {/* Logo */}
        <Group style={{ flex: 1 }}>
          {React.isValidElement(logo) ? (
            logo
          ) : (
            <UnstyledButton 
              component=\"a\" 
              href=\"#\"
              style={{ margin: rem(-6), padding: rem(6) }}
            >
              <Title 
                order={1} 
                size=\"h2\" 
                style={{ color: colors.text }}
              >
                {logo}
              </Title>
            </UnstyledButton>
          )}
        </Group>

        {/* Mobile menu button */}
        <Group hiddenFrom=\"lg\">
          <UnstyledButton
            onClick={handleMobileMenuToggle}
            style={{
              margin: rem(-10),
              padding: rem(10),
              borderRadius: rem(6),
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: variant === 'transparent' ? '#9CA3AF' : '#6B7280'
            }}
          >
            <span style={{ 
              position: 'absolute', 
              width: 1, 
              height: 1, 
              padding: 0, 
              margin: -1, 
              overflow: 'hidden', 
              clip: 'rect(0, 0, 0, 0)', 
              whiteSpace: 'nowrap', 
              border: 0 
            }}>
              Open main menu
            </span>
            <Burger 
              opened={mobileMenuOpen} 
              size=\"sm\" 
              color={variant === 'transparent' ? '#9CA3AF' : '#6B7280'} 
            />
          </UnstyledButton>
        </Group>

        {/* Desktop navigation */}
        <Group gap={rem(48)} visibleFrom=\"lg\">
          {navigation.map((item, index) => (
            <UnstyledButton
              key={item.key || item.name || index}
              component=\"a\"
              href={item.href || '#'}
              onClick={item.onClick}
              style={{
                fontSize: rem(14),
                lineHeight: 1.5,
                fontWeight: 600,
                color: colors.text
              }}
            >
              {item.name}
            </UnstyledButton>
          ))}
        </Group>

        {/* Desktop right side actions */}
        <Group style={{ flex: 1, justifyContent: 'flex-end' }} gap=\"md\" visibleFrom=\"lg\">
          {actions.map((action, index) => (
            React.isValidElement(action) ? (
              <Box key={index}>{action}</Box>
            ) : (
              <UnstyledButton
                key={action.key || action.name || index}
                component=\"a\"
                href={action.href || '#'}
                onClick={action.onClick}
                style={{
                  fontSize: rem(14),
                  lineHeight: 1.5,
                  fontWeight: 600,
                  color: colors.text
                }}
              >
                {action.name}
              </UnstyledButton>
            )
          ))}
        </Group>
      </Group>

      {/* Mobile drawer */}
      <Drawer
        opened={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        position=\"right\"
        size=\"100%\"
        styles={{
          content: {
            '@media (min-width: 640px)': {
              maxWidth: rem(384)
            }
          }
        }}
        hiddenFrom=\"lg\"
        style={{ zIndex: 50 }}
      >
        <Box 
          style={{ 
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 50,
            width: '100%',
            overflowY: 'auto',
            backgroundColor: colors.mobileBackground,
            padding: rem(24)
          }}
        >
          <Group justify=\"space-between\" mb=\"xl\">
            {React.isValidElement(logo) ? (
              logo
            ) : (
              <UnstyledButton component=\"a\" href=\"#\" style={{ margin: rem(-6), padding: rem(6) }}>
                <Title 
                  order={1} 
                  size=\"h2\" 
                  style={{ color: variant === 'transparent' ? 'white' : colors.text }}
                >
                  {logo}
                </Title>
              </UnstyledButton>
            )}
            
            <UnstyledButton
              onClick={() => setMobileMenuOpen(false)}
              style={{
                margin: rem(-10),
                borderRadius: rem(6),
                padding: rem(10),
                color: variant === 'transparent' ? '#9CA3AF' : '#6B7280'
              }}
            >
              <span style={{ 
                position: 'absolute', 
                width: 1, 
                height: 1, 
                padding: 0, 
                margin: -1, 
                overflow: 'hidden', 
                clip: 'rect(0, 0, 0, 0)', 
                whiteSpace: 'nowrap', 
                border: 0 
              }}>
                Close menu
              </span>
              <IconX size={24} />
            </UnstyledButton>
          </Group>
          
          <Stack gap={0} style={{ marginTop: rem(24), overflow: 'hidden' }}>
            <Box style={{ 
              marginTop: rem(-24), 
              marginBottom: rem(-24), 
              borderBottom: `1px solid ${variant === 'transparent' ? 'rgba(107, 114, 128, 0.25)' : 'rgba(0, 0, 0, 0.1)'}` 
            }}>
              <Stack gap={rem(8)} py={rem(24)}>
                {navigation.map((item, index) => (
                  <UnstyledButton
                    key={item.key || item.name || index}
                    component=\"a\"
                    href={item.href || '#'}
                    onClick={(e) => {
                      if (item.onClick) item.onClick(e)
                      setMobileMenuOpen(false)
                    }}
                    style={{
                      margin: rem(-12),
                      borderRadius: rem(8),
                      padding: rem(12),
                      fontSize: rem(16),
                      lineHeight: 1.75,
                      fontWeight: 600,
                      color: variant === 'transparent' ? 'white' : colors.text,
                      ':hover': {
                        backgroundColor: variant === 'transparent' ? '#1F2937' : '#F3F4F6'
                      }
                    }}
                  >
                    {item.name}
                  </UnstyledButton>
                ))}
              </Stack>
            </Box>
            
            <Box py={rem(24)}>
              {actions.map((action, index) => (
                React.isValidElement(action) ? (
                  <Box key={index} mb=\"md\">{action}</Box>
                ) : (
                  <UnstyledButton
                    key={action.key || action.name || index}
                    component=\"a\"
                    href={action.href || '#'}
                    onClick={(e) => {
                      if (action.onClick) action.onClick(e)
                      setMobileMenuOpen(false)
                    }}
                    style={{
                      margin: rem(-12),
                      borderRadius: rem(8),
                      padding: rem(12),
                      fontSize: rem(16),
                      lineHeight: 1.75,
                      fontWeight: 600,
                      color: variant === 'transparent' ? 'white' : colors.text,
                      display: 'block',
                      marginBottom: rem(12)
                    }}
                  >
                    {action.name}
                  </UnstyledButton>
                )
              ))}
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  )
}

Navigation.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
      key: PropTypes.string
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        href: PropTypes.string,
        onClick: PropTypes.func,
        key: PropTypes.string
      })
    ])
  ),
  variant: PropTypes.oneOf(['transparent', 'solid', 'blur']),
  position: PropTypes.oneOf(['absolute', 'sticky', 'relative']),
  onMobileMenuToggle: PropTypes.func,
  className: PropTypes.string
}

export default Navigation