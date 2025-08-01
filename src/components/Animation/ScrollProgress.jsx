import React from 'react';
import PropTypes from 'prop-types';
import { useScrollProgress } from '../../hooks/useScrollAnimation';
import styles from './ScrollProgress.module.css';

/**
 * Component that displays scroll progress
 */
export const ScrollProgress = ({
  position = 'top',
  height = 4,
  color = '#000',
  background = '#e0e0e0',
  className = '',
  style = {},
}) => {
  const progress = useScrollProgress();

  const progressStyle = {
    '--progress-height': `${height}px`,
    '--progress-color': color,
    '--progress-background': background,
    '--progress-value': progress,
    ...style,
  };

  return (
    <div
      className={`${styles.scrollProgress} ${styles[position]} ${className}`}
      style={progressStyle}
    >
      <div className={styles.progressBar} />
    </div>
  );
};

ScrollProgress.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom']),
  height: PropTypes.number,
  color: PropTypes.string,
  background: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};