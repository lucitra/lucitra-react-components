/**
 * Alert Component
 * 
 * Displays important messages with different severity levels
 * Supports icons, actions, and dismissible functionality
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Alert as MantineAlert, Group, ActionIcon } from '@mantine/core';
import { 
  IconInfoCircle, 
  IconAlertTriangle, 
  IconCheck, 
  IconX,
  IconAlertCircle 
} from '@tabler/icons-react';

const VARIANT_ICONS = {
  info: IconInfoCircle,
  success: IconCheck,
  warning: IconAlertTriangle,
  error: IconAlertCircle,
};

const VARIANT_COLORS = {
  info: 'blue',
  success: 'green', 
  warning: 'yellow',
  error: 'red',
};

export const Alert = ({
  variant = 'info',
  title,
  children,
  icon: customIcon,
  color: customColor,
  onClose,
  actions,
  withCloseButton = false,
  ...props
}) => {
  const IconComponent = customIcon || VARIANT_ICONS[variant];
  const alertColor = customColor || VARIANT_COLORS[variant];

  return (
    <MantineAlert
      icon={IconComponent && <IconComponent size={16} />}
      title={title}
      color={alertColor}
      style={{
        border: `2px solid ${alertColor === 'blue' ? '#228be6' : 
                              alertColor === 'green' ? '#40c057' :
                              alertColor === 'yellow' ? '#fd7e14' : '#fa5252'}`,
        borderRadius: 0,
        backgroundColor: 'white'
      }}
      {...props}
    >
      <Group justify="space-between" align="flex-start">
        <div style={{ flex: 1 }}>
          {children}
        </div>
        
        {(actions || withCloseButton) && (
          <Group gap="xs" style={{ marginLeft: 'auto' }}>
            {actions}
            {withCloseButton && onClose && (
              <ActionIcon
                variant="subtle"
                color={alertColor}
                onClick={onClose}
                size="sm"
                style={{ marginTop: '-4px' }}
              >
                <IconX size={14} />
              </ActionIcon>
            )}
          </Group>
        )}
      </Group>
    </MantineAlert>
  );
};

Alert.propTypes = {
  /** Alert variant/severity */
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  /** Alert title */
  title: PropTypes.string,
  /** Alert content */
  children: PropTypes.node.isRequired,
  /** Custom icon component */
  icon: PropTypes.elementType,
  /** Custom color override */
  color: PropTypes.string,
  /** Close handler function */
  onClose: PropTypes.func,
  /** Action buttons or elements */
  actions: PropTypes.node,
  /** Show close button */
  withCloseButton: PropTypes.bool,
};

export default Alert;