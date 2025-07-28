import React from 'react';
import { Box, useMantineColorScheme } from '@mantine/core';
import PropTypes from 'prop-types';
import classes from './PageLayout.module.css';

/**
 * PageLayout Component
 * 
 * A modern page layout wrapper with full-height side borders for a clean, structured look.
 * Inspired by Linear, GitHub, and modern enterprise applications.
 * 
 * @component
 * @example
 * <PageLayout maxWidth="lg">
 *   <PageSection>Your content here</PageSection>
 * </PageLayout>
 */
export function PageLayout({
  children,
  maxWidth = 'lg',
  className = '',
  noPadding = false,
  ...props
}) {
  const { colorScheme } = useMantineColorScheme();

  const maxWidthMap = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  };

  return (
    <Box 
      className={`${classes.root} ${className}`} 
      data-theme={colorScheme}
      {...props}
    >
      {/* Side borders */}
      <div className={`${classes.sideBorders} ${classes.leftBorder}`} />
      <div className={`${classes.sideBorders} ${classes.rightBorder}`} />
      
      {/* Main content */}
      <Box
        className={classes.content}
        style={{
          maxWidth: maxWidthMap[maxWidth],
          padding: noPadding ? 0 : undefined,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

PageLayout.propTypes = {
  /** Content to be rendered inside the layout */
  children: PropTypes.node.isRequired,
  /** Maximum width of the content area */
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'full']),
  /** Additional CSS class name */
  className: PropTypes.string,
  /** Remove default padding */
  noPadding: PropTypes.bool,
};

export default PageLayout;