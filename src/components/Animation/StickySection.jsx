import React from 'react';
import PropTypes from 'prop-types';
import { useStickyScroll } from '../../hooks/useScrollAnimation';
import styles from './StickySection.module.css';

/**
 * Component for sticky scroll sections with progress-based animations
 */
export const StickySection = ({
  children,
  start = 0,
  end = 1000,
  className = '',
  style = {},
  onProgressChange,
}) => {
  const { ref, isSticky, progress } = useStickyScroll({ start, end });

  React.useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progress);
    }
  }, [progress, onProgressChange]);

  const stickyStyle = {
    '--sticky-progress': progress,
    ...style,
  };

  return (
    <div
      ref={ref}
      className={`${styles.stickySection} ${isSticky ? styles.sticky : ''} ${className}`}
      style={stickyStyle}
    >
      {typeof children === 'function' ? children({ progress, isSticky }) : children}
    </div>
  );
};

StickySection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  onProgressChange: PropTypes.func,
};