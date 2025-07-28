import React from 'react';
import { Box, useMantineColorScheme } from '@mantine/core';
import PropTypes from 'prop-types';
import classes from './SectionDivider.module.css';

/**
 * SectionDivider Component
 * 
 * A standalone divider that extends across the full viewport width.
 * Useful for creating visual breaks between sections without full PageSection components.
 * 
 * @component
 * @example
 * <SectionDivider spacing="lg" variant="dashed" />
 */
export function SectionDivider({
  spacing = 'md',
  variant = 'default',
  className = '',
  ...props
}) {
  const { colorScheme } = useMantineColorScheme();

  const spacingClass = {
    none: classes.spacingNone,
    sm: classes.spacingSm,
    md: classes.spacingMd,
    lg: classes.spacingLg,
  }[spacing];

  const variantClass = {
    default: classes.dividerDefault,
    dashed: classes.dividerDashed,
    dotted: classes.dividerDotted,
  }[variant];

  return (
    <Box
      className={`${classes.root} ${spacingClass} ${className}`}
      data-theme={colorScheme}
      {...props}
    >
      <div className={`${classes.dividerLine} ${variantClass}`} />
    </Box>
  );
}

SectionDivider.propTypes = {
  /** Vertical spacing around the divider */
  spacing: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  /** Visual style of the divider */
  variant: PropTypes.oneOf(['default', 'dashed', 'dotted']),
  /** Additional CSS class name */
  className: PropTypes.string,
};

export default SectionDivider;