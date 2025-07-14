import Footer from './Footer'

export default {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = {
  args: {
    name: 'John Doe',
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
    useI18n: false,
  },
}

export const WithAllSocials = {
  args: {
    name: 'Jane Smith',
    copyrightStartYear: 2020,
    socialLinks: {
      github: 'https://github.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
      twitter: 'https://twitter.com/janesmith',
      instagram: 'https://instagram.com/janesmith',
    },
    useI18n: false,
  },
}

export const MinimalFooter = {
  args: {
    name: 'Minimal User',
    socialLinks: {
      github: 'https://github.com/minimal',
    },
    useI18n: false,
  },
}

export const CustomStyling = {
  args: {
    name: 'Designer',
    socialLinks: {
      github: 'https://github.com/designer',
      linkedin: 'https://linkedin.com/in/designer',
    },
    useI18n: false,
    style: {
      borderTop: '2px solid #007bff',
      backgroundColor: '#f8f9fa',
    },
    iconColor: 'blue',
    iconVariant: 'filled',
  },
}

export const CenteredLayout = {
  args: {
    name: 'Centered Design',
    socialLinks: {
      github: 'https://github.com/centered',
      linkedin: 'https://linkedin.com/in/centered',
    },
    useI18n: false,
    justify: 'center',
    style: {
      borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(248, 249, 250, 0.95)',
      flexDirection: 'column',
      gap: '16px',
    },
  },
}