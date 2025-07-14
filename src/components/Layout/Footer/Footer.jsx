import { Group, Text, ActionIcon, rem } from '@mantine/core'
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconBrandInstagram } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function Footer({
  name,
  copyrightStartYear,
  socialLinks = {},
  useI18n = true,
  copyrightKey = 'footer.copyright',
  githubAriaKey = 'aria.github',
  linkedinAriaKey = 'aria.linkedin',
  twitterAriaKey = 'aria.twitter',
  instagramAriaKey = 'aria.instagram',
  copyrightFallback = '© {year} {name}. All rights reserved.',
  githubAriaFallback = 'GitHub',
  linkedinAriaFallback = 'LinkedIn',
  twitterAriaFallback = 'Twitter',
  instagramAriaFallback = 'Instagram',
  justify = 'space-between',
  px = rem(48),
  py = 'lg',
  style = {
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(248, 249, 250, 0.95)',
    backdropFilter: 'blur(10px)'
  },
  iconVariant = 'subtle',
  iconColor = 'gray',
  iconSize = 'lg',
  ...props
}) {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const copyrightYears = copyrightStartYear 
    ? `${copyrightStartYear}-${currentYear}` 
    : currentYear

  const copyrightText = useI18n && name
    ? t(copyrightKey, copyrightFallback).replace('{year}', copyrightYears).replace('{name}', name)
    : copyrightFallback.replace('{year}', copyrightYears).replace('{name}', name || 'Your Name')

  const socialIcons = [
    { 
      icon: IconBrandGithub, 
      href: socialLinks.github, 
      ariaKey: githubAriaKey,
      ariaFallback: githubAriaFallback
    },
    { 
      icon: IconBrandLinkedin, 
      href: socialLinks.linkedin, 
      ariaKey: linkedinAriaKey,
      ariaFallback: linkedinAriaFallback
    },
    { 
      icon: IconBrandTwitter, 
      href: socialLinks.twitter, 
      ariaKey: twitterAriaKey,
      ariaFallback: twitterAriaFallback
    },
    { 
      icon: IconBrandInstagram, 
      href: socialLinks.instagram, 
      ariaKey: instagramAriaKey,
      ariaFallback: instagramAriaFallback
    }
  ]

  return (
    <Group 
      justify={justify}
      px={px}
      py={py}
      style={style}
      {...props}
    >
      <Text size="sm" c="dimmed">
        {copyrightText}
      </Text>
      
      <Group gap="md">
        {socialIcons.map(({ icon: Icon, href, ariaKey, ariaFallback }, index) => 
          href ? (
            <ActionIcon
              key={index}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={useI18n ? t(ariaKey, ariaFallback) : ariaFallback}
              variant={iconVariant}
              color={iconColor}
              size={iconSize}
            >
              <Icon size={20} />
            </ActionIcon>
          ) : null
        )}
      </Group>
    </Group>
  )
}

Footer.propTypes = {
  name: PropTypes.string,
  copyrightStartYear: PropTypes.number,
  socialLinks: PropTypes.shape({
    github: PropTypes.string,
    linkedin: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
  }),
  useI18n: PropTypes.bool,
  copyrightKey: PropTypes.string,
  githubAriaKey: PropTypes.string,
  linkedinAriaKey: PropTypes.string,
  twitterAriaKey: PropTypes.string,
  instagramAriaKey: PropTypes.string,
  copyrightFallback: PropTypes.string,
  githubAriaFallback: PropTypes.string,
  linkedinAriaFallback: PropTypes.string,
  twitterAriaFallback: PropTypes.string,
  instagramAriaFallback: PropTypes.string,
  justify: PropTypes.string,
  px: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  py: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  iconVariant: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
}

export default Footer