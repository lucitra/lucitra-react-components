import React from 'react';
import PropTypes from 'prop-types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './ScrollAnimationWrapper.module.css';

/**
 * Wrapper component for scroll-triggered animations
 * Supports various animation types: fade, slide, scale, rotate
 */
export const ScrollAnimationWrapper = ({
  children,
  animation = 'fadeIn',
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  style = {},
}) => {
  const { ref, isInView } = useScrollAnimation({
    threshold,
    triggerOnce,
    delay: delay * 1000,
  });

  const animationClass = `${styles.animationWrapper} ${styles[animation]} ${
    isInView ? styles.animate : ''
  } ${className}`;

  const animationStyle = {
    '--animation-duration': `${duration}s`,
    '--animation-delay': `${delay}s`,
    ...style,
  };

  return (
    <div ref={ref} className={animationClass} style={animationStyle}>
      {children}
    </div>
  );
};

ScrollAnimationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf([
    'fadeIn',
    'fadeInUp',
    'fadeInDown',
    'fadeInLeft',
    'fadeInRight',
    'slideInUp',
    'slideInDown',
    'slideInLeft',
    'slideInRight',
    'scaleIn',
    'scaleInUp',
    'rotateIn',
    'blur',
  ]),
  duration: PropTypes.number,
  delay: PropTypes.number,
  threshold: PropTypes.number,
  triggerOnce: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};