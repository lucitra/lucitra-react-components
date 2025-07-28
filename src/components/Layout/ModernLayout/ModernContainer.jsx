import React from 'react';
import { Box } from '@mantine/core';
import PropTypes from 'prop-types';
import classes from './ModernContainer.module.css';

/**
 * ModernContainer Component
 * 
 * A responsive container component that constrains content width while maintaining proper padding.
 * Works seamlessly with PageLayout and PageSection components.
 * 
 * @component
 * @example
 * <ModernContainer size="lg">
 *   Your content here
 * </ModernContainer>
 */
export function ModernContainer({
  children,
  size = 'lg',
  padding = true,
  className = '',
  as = 'div',
  ...props
}) {

  const sizeMap = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  };

  return (
    <Box
      component={as}
      className={`${classes.root} ${padding ? classes.withPadding : ''} ${className}`}
      style={{
        maxWidth: sizeMap[size],
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

ModernContainer.propTypes = {
  /** Content to be rendered inside the container */
  children: PropTypes.node.isRequired,
  /** Maximum width of the container */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'full']),
  /** Apply responsive padding */
  padding: PropTypes.bool,
  /** Additional CSS class name */
  className: PropTypes.string,
  /** HTML element to render as */
  as: PropTypes.oneOf(['div', 'section', 'article', 'main']),
};

export default ModernContainer;