import React from 'react'
import { Box, MantineProvider } from '@mantine/core'
import PropTypes from 'prop-types'

const Page = ({
  children,
  backgroundColor = '#ffffff',
  minHeight = '100vh',
  padding = 0,
  theme,
  className,
  style,
  ...props
}) => {
  const pageContent = (
    <Box
      className={className}
      style={{
        backgroundColor,
        minHeight,
        padding,
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
      {...props}
    >
      {children}
    </Box>
  )

  // If a theme is provided, wrap with MantineProvider
  if (theme) {
    return (
      <MantineProvider theme={theme}>
        {pageContent}
      </MantineProvider>
    )
  }

  return pageContent
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  theme: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object
}

export default Page