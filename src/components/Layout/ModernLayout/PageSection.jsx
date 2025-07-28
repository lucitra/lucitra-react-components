import React from 'react';
import { Box, useMantineColorScheme } from '@mantine/core';
import PropTypes from 'prop-types';
import classes from './PageSection.module.css';

/**
 * PageSection Component
 * 
 * A full-width section component with horizontal dividers that extend to viewport edges.
 * Creates clear visual separation between content areas.
 * 
 * @component
 * @example
 * <PageSection background="muted" borderTop>
 *   <Container>
 *     Your section content
 *   </Container>
 * </PageSection>
 */
export function PageSection({
  children,
  background = 'default',
  borderTop = true,
  borderBottom = false,
  fullWidth = false,
  noPadding = false,
  className = '',
  id,
  ...props
}) {
  const { colorScheme } = useMantineColorScheme();

  const backgroundClass = {
    default: classes.backgroundDefault,
    muted: classes.backgroundMuted,
    subtle: classes.backgroundSubtle,
  }[background];

  return (
    <Box
      component="section"
      id={id}
      className={`${classes.root} ${backgroundClass} ${noPadding ? classes.noPadding : ''} ${className}`}
      data-theme={colorScheme}
      {...props}
    >
      {/* Full-width border lines */}
      {borderTop && <div className={`${classes.borderLine} ${classes.borderTop}`} />}
      {borderBottom && <div className={`${classes.borderLine} ${classes.borderBottom}`} />}
      
      {/* Content */}
      <Box
        className={classes.content}
        style={{
          maxWidth: fullWidth ? '100%' : '1536px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

PageSection.propTypes = {
  /** Content to be rendered inside the section */
  children: PropTypes.node.isRequired,
  /** Background style variant */
  background: PropTypes.oneOf(['default', 'muted', 'subtle']),
  /** Show top border */
  borderTop: PropTypes.bool,
  /** Show bottom border */
  borderBottom: PropTypes.bool,
  /** Make content span full width */
  fullWidth: PropTypes.bool,
  /** Remove default padding */
  noPadding: PropTypes.bool,
  /** Additional CSS class name */
  className: PropTypes.string,
  /** Section ID for navigation */
  id: PropTypes.string,
};

export default PageSection;