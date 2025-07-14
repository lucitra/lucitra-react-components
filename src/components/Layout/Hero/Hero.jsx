import React from 'react'
import { Box, Title, Text, Button, Group, rem } from '@mantine/core'
import PropTypes from 'prop-types'

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = '#111827',
  primaryAction,
  secondaryAction,
  announcement,
  variant = 'centered', // 'centered', 'left-aligned'
  contentMaxWidth = rem(672),
  className,
  ...props
}) => {
  const gradientClipPath = 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'

  return (
    <Box style={{ backgroundColor }} className={className} {...props}>
      <Box 
        component="div"
        style={{
          position: 'relative',
          isolation: 'isolate',
          overflow: 'hidden',
          paddingTop: rem(56) // pt-14 to account for nav
        }}
      >
        {/* Background image */}
        {backgroundImage && (
          <Box
            component="img"
            src={backgroundImage}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}
        
        {/* Top gradient decoration */}
        <Box
          style={{
            position: 'absolute',
            left: 'calc(50% - 11rem)',
            top: rem(-160),
            zIndex: -1,
            transform: 'translateX(-50%) rotate(30deg)',
            width: rem(578),
            aspectRatio: '1155/678',
            background: 'linear-gradient(to top right, #ff80b5, #9089fc)',
            opacity: 0.2,
            overflow: 'hidden',
            filter: 'blur(3rem)',
            clipPath: gradientClipPath,
            '@media (min-width: 640px)': {
              left: 'calc(50% - 30rem)',
              top: rem(-320),
              width: rem(1155)
            }
          }}
        />
        
        <Box
          style={{
            margin: '0 auto',
            maxWidth: rem(1280),
            paddingLeft: rem(24),
            paddingRight: rem(24),
            '@media (min-width: 1024px)': {
              paddingLeft: rem(32),
              paddingRight: rem(32)
            }
          }}
        >
          <Box
            style={{
              margin: '0 auto',
              maxWidth: contentMaxWidth,
              paddingTop: rem(128),
              paddingBottom: rem(128),
              '@media (min-width: 640px)': {
                paddingTop: rem(192),
                paddingBottom: rem(192)
              },
              '@media (min-width: 1024px)': {
                paddingTop: rem(224),
                paddingBottom: rem(224)
              }
            }}
          >
            {/* Announcement banner */}
            {announcement && (
              <Box style={{ 
                display: variant === 'centered' ? 'flex' : 'block',
                justifyContent: variant === 'centered' ? 'center' : 'flex-start',
                marginBottom: rem(32),
                '@media (max-width: 640px)': { display: 'none' }
              }}>
                <Box
                  style={{
                    position: 'relative',
                    borderRadius: rem(9999),
                    paddingLeft: rem(12),
                    paddingRight: rem(12),
                    paddingTop: rem(4),
                    paddingBottom: rem(4),
                    fontSize: rem(14),
                    lineHeight: 1.5,
                    color: '#9CA3AF',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    ':hover': {
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  {React.isValidElement(announcement) ? announcement : (
                    <>
                      {announcement.text}{' '}
                      {announcement.link && (
                        <Box
                          component="a"
                          href={announcement.link.href}
                          style={{
                            fontWeight: 600,
                            color: 'white',
                            textDecoration: 'none'
                          }}
                        >
                          <span style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                          {announcement.link.text} <span>\u2192</span>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Box>
            )}

            <Box style={{ textAlign: variant === 'centered' ? 'center' : 'left' }}>
              {/* Title */}
              <Title
                order={1}
                style={{
                  fontSize: rem(48),
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  textWrap: 'balance',
                  color: 'white',
                  '@media (min-width: 640px)': {
                    fontSize: rem(72)
                  }
                }}
              >
                {title}
              </Title>
              
              {/* Subtitle */}
              {subtitle && (
                <Text
                  style={{
                    marginTop: rem(32),
                    fontSize: rem(18),
                    fontWeight: 500,
                    textWrap: 'pretty',
                    color: '#9CA3AF',
                    '@media (min-width: 640px)': {
                      fontSize: rem(20),
                      lineHeight: 2
                    }
                  }}
                >
                  {subtitle}
                </Text>
              )}
              
              {/* Actions */}
              {(primaryAction || secondaryAction) && (
                <Group
                  justify={variant === 'centered' ? 'center' : 'flex-start'}
                  gap={rem(24)}
                  style={{ marginTop: rem(40) }}
                >
                  {primaryAction && (
                    React.isValidElement(primaryAction) ? primaryAction : (
                      <Button
                        component="a"
                        href={primaryAction.href || '#'}
                        onClick={primaryAction.onClick}
                        style={{
                          backgroundColor: primaryAction.color || '#6366F1',
                          borderRadius: rem(6),
                          padding: `${rem(10)} ${rem(14)}`,
                          fontSize: rem(14),
                          fontWeight: 600,
                          color: 'white',
                          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                          border: 'none',
                          ':hover': {
                            backgroundColor: primaryAction.hoverColor || '#4F46E5'
                          },
                          ':focus': {
                            outline: `2px solid ${primaryAction.color || '#6366F1'}`,
                            outlineOffset: '2px'
                          }
                        }}
                      >
                        {primaryAction.text || primaryAction.children}
                      </Button>
                    )
                  )}
                  
                  {secondaryAction && (
                    React.isValidElement(secondaryAction) ? secondaryAction : (
                      <Button
                        component="a"
                        href={secondaryAction.href || '#'}
                        onClick={secondaryAction.onClick}
                        variant="transparent"
                        style={{
                          fontSize: rem(14),
                          lineHeight: 1.5,
                          fontWeight: 600,
                          color: 'white'
                        }}
                      >
                        {secondaryAction.text || secondaryAction.children} {secondaryAction.arrow !== false && <span style={{ marginLeft: rem(4) }}>\u2192</span>}
                      </Button>
                    )
                  )}
                </Group>
              )}
            </Box>
          </Box>
        </Box>
        
        {/* Bottom gradient decoration */}
        <Box
          style={{
            position: 'absolute',
            left: 'calc(50% + 3rem)',
            top: 'calc(100% - 13rem)',
            zIndex: -1,
            transform: 'translateX(-50%)',
            width: rem(578),
            aspectRatio: '1155/678',
            background: 'linear-gradient(to top right, #ff80b5, #9089fc)',
            opacity: 0.2,
            overflow: 'hidden',
            filter: 'blur(3rem)',
            clipPath: gradientClipPath,
            '@media (min-width: 640px)': {
              left: 'calc(50% + 36rem)',
              top: 'calc(100% - 30rem)',
              width: rem(1155)
            }
          }}
        />
      </Box>
    </Box>
  )
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundColor: PropTypes.string,
  primaryAction: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
      color: PropTypes.string,
      hoverColor: PropTypes.string
    })
  ]),
  secondaryAction: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
      arrow: PropTypes.bool
    })
  ]),
  announcement: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      text: PropTypes.string,
      link: PropTypes.shape({
        text: PropTypes.string,
        href: PropTypes.string
      })
    })
  ]),
  variant: PropTypes.oneOf(['centered', 'left-aligned']),
  contentMaxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
}

export default Hero