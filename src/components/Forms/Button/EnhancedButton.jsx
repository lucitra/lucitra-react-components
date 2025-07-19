/**
 * Enhanced Button Component
 * 
 * Comprehensive button component with multiple variants, sizes, and states
 * Built on top of Mantine with design system styling
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button as MantineButton, Group, Loader } from '@mantine/core';

const VARIANT_STYLES = {
  primary: {
    filled: {
      backgroundColor: '#228be6',
      color: 'white',
      border: '2px solid #228be6',
      borderRadius: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#228be6',
      border: '2px solid #228be6',
      borderRadius: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#228be6',
      border: '2px solid transparent',
      borderRadius: 0,
    }
  },
  success: {
    filled: {
      backgroundColor: '#40c057',
      color: 'white',
      border: '2px solid #40c057',
      borderRadius: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#40c057',
      border: '2px solid #40c057',
      borderRadius: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#40c057',
      border: '2px solid transparent',
      borderRadius: 0,
    }
  },
  warning: {
    filled: {
      backgroundColor: '#fd7e14',
      color: 'white',
      border: '2px solid #fd7e14',
      borderRadius: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#fd7e14',
      border: '2px solid #fd7e14',
      borderRadius: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#fd7e14',
      border: '2px solid transparent',
      borderRadius: 0,
    }
  },
  danger: {
    filled: {
      backgroundColor: '#fa5252',
      color: 'white',
      border: '2px solid #fa5252',
      borderRadius: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#fa5252',
      border: '2px solid #fa5252',
      borderRadius: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#fa5252',
      border: '2px solid transparent',
      borderRadius: 0,
    }
  },
  neutral: {
    filled: {
      backgroundColor: '#868e96',
      color: 'white',
      border: '2px solid #868e96',
      borderRadius: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#868e96',
      border: '2px solid #868e96',
      borderRadius: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#868e96',
      border: '2px solid transparent',
      borderRadius: 0,
    }
  }
};

export const EnhancedButton = ({
  children,
  variant = 'primary',
  appearance = 'filled',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  ...props
}) => {
  const styles = VARIANT_STYLES[variant]?.[appearance] || VARIANT_STYLES.primary.filled;
  
  const handleClick = (e) => {
    if (!loading && !disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <MantineButton
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={handleClick}
      leftSection={loading ? <Loader size={16} color="currentColor" /> : leftIcon}
      rightSection={!loading ? rightIcon : undefined}
      style={{
        ...styles,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease'
      }}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </MantineButton>
  );
};

// Specialized button components
export const PrimaryButton = ({ children, ...props }) => (
  <EnhancedButton variant="primary" {...props}>{children}</EnhancedButton>
);

export const SecondaryButton = ({ children, ...props }) => (
  <EnhancedButton variant="primary" appearance="outline" {...props}>{children}</EnhancedButton>
);

export const SuccessButton = ({ children, ...props }) => (
  <EnhancedButton variant="success" {...props}>{children}</EnhancedButton>
);

export const WarningButton = ({ children, ...props }) => (
  <EnhancedButton variant="warning" {...props}>{children}</EnhancedButton>
);

export const DangerButton = ({ children, ...props }) => (
  <EnhancedButton variant="danger" {...props}>{children}</EnhancedButton>
);

export const GhostButton = ({ children, ...props }) => (
  <EnhancedButton appearance="ghost" {...props}>{children}</EnhancedButton>
);

export const LinkButton = ({ children, ...props }) => (
  <EnhancedButton 
    appearance="ghost" 
    style={{ 
      border: 'none', 
      padding: 0, 
      textDecoration: 'underline',
      height: 'auto',
      minHeight: 'auto'
    }} 
    {...props}
  >
    {children}
  </EnhancedButton>
);

// Button group component
export const ButtonGroup = ({ children, orientation = 'horizontal', spacing = 'sm', ...props }) => (
  <Group 
    gap={spacing}
    style={{ 
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      alignItems: orientation === 'vertical' ? 'stretch' : 'center'
    }}
    {...props}
  >
    {children}
  </Group>
);

EnhancedButton.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Visual variant */
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'neutral']),
  /** Visual appearance */
  appearance: PropTypes.oneOf(['filled', 'outline', 'ghost']),
  /** Button size */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Loading state */
  loading: PropTypes.bool,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Full width button */
  fullWidth: PropTypes.bool,
  /** Left icon */
  leftIcon: PropTypes.node,
  /** Right icon */
  rightIcon: PropTypes.node,
  /** Click handler */
  onClick: PropTypes.func,
};

ButtonGroup.propTypes = {
  /** Button group content */
  children: PropTypes.node.isRequired,
  /** Orientation */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Spacing between buttons */
  spacing: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

// Export specialized buttons with prop types
PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  ...EnhancedButton.propTypes
};

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  ...EnhancedButton.propTypes
};

SuccessButton.propTypes = {
  children: PropTypes.node.isRequired,
  ...EnhancedButton.propTypes
};

WarningButton.propTypes = {
  children: PropTypes.node.isRequired,
  ...EnhancedButton.propTypes
};

DangerButton.propTypes = {
  children: PropTypes.node.isRequired,
  ...EnhancedButton.propTypes
};

GhostButton.propTypes = {
  children: PropTypes.node.isRequired,
  ...EnhancedButton.propTypes
};

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  ...EnhancedButton.propTypes
};

export default EnhancedButton;