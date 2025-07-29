/**
 * Badge Component
 * 
 * Displays small status indicators, labels, or counts
 * Supports different variants, sizes, and styles
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Badge.css';

export const Badge = ({
  variant = 'primary',
  size = 'sm',
  style = 'outline',
  children,
  className = '',
  radius,
  ...props
}) => {
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    style === 'filled' && 'badge--filled',
    style === 'subtle' && 'badge--subtle',
    className
  ].filter(Boolean).join(' ');

  const badgeStyle = {
    borderRadius: radius || 'var(--radius-sm)',
    ...props.style
  };

  return (
    <span
      className={badgeClasses}
      style={badgeStyle}
      {...props}
    >
      {children}
    </span>
  );
};

// Specialized badge components
export const StatusBadge = ({ status, ...props }) => {
  const statusVariants = {
    active: 'success',
    inactive: 'neutral',
    pending: 'warning',
    error: 'error',
    online: 'success',
    offline: 'neutral',
    published: 'success',
    draft: 'warning',
    archived: 'neutral'
  };

  return (
    <Badge variant={statusVariants[status] || 'neutral'} {...props}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export const CountBadge = ({ count, max = 99, ...props }) => {
  const displayCount = count > max ? `${max}+` : count.toString();
  
  return (
    <Badge variant="error" size="xs" {...props}>
      {displayCount}
    </Badge>
  );
};

export const PriorityBadge = ({ priority, ...props }) => {
  const priorityVariants = {
    low: 'neutral',
    medium: 'warning', 
    high: 'error',
    critical: 'error'
  };

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High', 
    critical: 'Critical'
  };

  return (
    <Badge variant={priorityVariants[priority]} {...props}>
      {priorityLabels[priority]}
    </Badge>
  );
};

Badge.propTypes = {
  /** Badge variant/color scheme */
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'error', 'info', 'neutral']),
  /** Badge size */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Badge style */
  style: PropTypes.oneOf(['outline', 'filled', 'subtle']),
  /** Badge content */
  children: PropTypes.node.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Border radius */
  radius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

StatusBadge.propTypes = {
  /** Status value */
  status: PropTypes.oneOf([
    'active', 'inactive', 'pending', 'error', 'online', 'offline', 
    'published', 'draft', 'archived'
  ]).isRequired,
};

CountBadge.propTypes = {
  /** Count number */
  count: PropTypes.number.isRequired,
  /** Maximum count to display before showing "+" */
  max: PropTypes.number,
};

PriorityBadge.propTypes = {
  /** Priority level */
  priority: PropTypes.oneOf(['low', 'medium', 'high', 'critical']).isRequired,
};

export default Badge;