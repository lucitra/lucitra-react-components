/**
 * Alert Component
 * 
 * Displays important messages with different severity levels
 * Supports icons, actions, and dismissible functionality
 */

import React from 'react';
import PropTypes from 'prop-types';
import { 
  IconInfoCircle, 
  IconAlertTriangle, 
  IconCheck, 
  IconX,
  IconAlertCircle 
} from '@tabler/icons-react';
import './Alert.css';

const VARIANT_ICONS = {
  info: IconInfoCircle,
  success: IconCheck,
  warning: IconAlertTriangle,
  error: IconAlertCircle,
};

export const Alert = ({
  variant = 'info',
  title,
  children,
  icon: customIcon,
  onClose,
  actions,
  withCloseButton = false,
  className = '',
  solid = false,
  compact = false,
  ...props
}) => {
  const IconComponent = customIcon || VARIANT_ICONS[variant];
  
  const alertClasses = [
    'alert',
    `alert--${variant}`,
    solid && 'alert--solid',
    compact && 'alert--compact',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={alertClasses} {...props}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {IconComponent && (
          <div className="alert__icon">
            <IconComponent size={compact ? 16 : 20} />
          </div>
        )}
        
        <div className="alert__content">
          {title && <div className="alert__title">{title}</div>}
          <div className="alert__message">{children}</div>
        </div>
        
        {(actions || withCloseButton) && (
          <div className="alert__actions">
            {actions}
            {withCloseButton && onClose && (
              <button
                className="alert__close"
                onClick={onClose}
                aria-label="Close alert"
              >
                <IconX size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
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
  /** Close handler function */
  onClose: PropTypes.func,
  /** Action buttons or elements */
  actions: PropTypes.node,
  /** Show close button */
  withCloseButton: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Use solid background style */
  solid: PropTypes.bool,
  /** Use compact spacing */
  compact: PropTypes.bool,
};

export default Alert;