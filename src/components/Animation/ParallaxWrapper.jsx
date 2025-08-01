import React from 'react';
import PropTypes from 'prop-types';
import { useParallax } from '../../hooks/useScrollAnimation';
import styles from './ParallaxWrapper.module.css';

/**
 * Wrapper component for parallax scroll effects
 */
export const ParallaxWrapper = ({
  children,
  speed = 0.5,
  offset = 0,
  className = '',
  style = {},
}) => {
  const { ref, transform } = useParallax({ speed, offset });

  const parallaxStyle = {
    transform: `translateY(${transform}px)`,
    ...style,
  };

  return (
    <div ref={ref} className={`${styles.parallaxWrapper} ${className}`} style={parallaxStyle}>
      {children}
    </div>
  );
};

ParallaxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  offset: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};