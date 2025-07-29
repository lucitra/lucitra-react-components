/**
 * Toast Component
 * 
 * Displays temporary notifications that appear and disappear automatically
 * Built on top of Mantine's notification system
 */

import React, { createContext, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';
// Dynamic import for optional notifications support
let notifications = null;
try {
  notifications = require('@mantine/notifications').notifications;
} catch (error) {
  console.warn('[@lucitra/react-components] @mantine/notifications not found. Toast functionality will be limited.');
}
import { 
  IconInfoCircle, 
  IconAlertTriangle, 
  IconCheck, 
  IconAlertCircle,
  IconX
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

// Toast context for managing toasts globally
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback to basic notifications if no provider
    return {
      show: (options) => {
        const { variant = 'info', title, message, ...rest } = options;
        const IconComponent = VARIANT_ICONS[variant];
        const color = VARIANT_COLORS[variant];
        
        notifications?.show({
          title,
          message,
          color,
          icon: IconComponent && <IconComponent size={16} />,
          classNames: {
            root: `toast toast--${variant}`
          },
          ...rest
        });
      },
      hide: (id) => notifications.hide(id),
      clean: () => notifications.clean(),
      update: (id, options) => notifications.update({ id, ...options })
    };
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const show = useCallback((options) => {
    const { 
      variant = 'info', 
      title, 
      message, 
      duration = 4000,
      withCloseButton = true,
      ...rest 
    } = options;
    
    const IconComponent = VARIANT_ICONS[variant];
    const color = VARIANT_COLORS[variant];
    
    return notifications.show({
      title,
      message,
      color,
      autoClose: duration,
      withCloseButton,
      icon: IconComponent && <IconComponent size={16} />,
      classNames: {
        root: `toast toast--${variant}`
      },
      ...rest
    });
  }, []);

  const hide = useCallback((id) => {
    notifications?.hide(id);
  }, []);

  const clean = useCallback(() => {
    notifications?.clean();
  }, []);

  const update = useCallback((id, options) => {
    const { variant, title, message, ...rest } = options;
    const IconComponent = variant ? VARIANT_ICONS[variant] : undefined;
    const color = variant ? VARIANT_COLORS[variant] : undefined;
    
    notifications?.update({
      id,
      title,
      message,
      color,
      icon: IconComponent && <IconComponent size={16} />,
      ...rest
    });
  }, []);

  const value = {
    show,
    hide,
    clean,
    update
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

// Individual Toast component for manual rendering
export const Toast = ({
  variant = 'info',
  title,
  message,
  onClose,
  withCloseButton = true,
  ...props
}) => {
  const IconComponent = VARIANT_ICONS[variant];

  const toastClasses = [
    'toast',
    `toast--${variant}`
  ].filter(Boolean).join(' ');

  return (
    <div
      className={toastClasses}
      {...props}
    >
      {IconComponent && (
        <span className="toast__icon">
          <IconComponent size={16} />
        </span>
      )}
      
      <div className="toast__content">
        {title && (
          <div className="toast__title">
            {title}
          </div>
        )}
        <div className="toast__message">
          {message}
        </div>
      </div>
      
      {withCloseButton && onClose && (
        <button
          onClick={onClose}
          className="toast__close"
          aria-label="Close"
        >
          <IconX size={14} />
        </button>
      )}
    </div>
  );
};

Toast.propTypes = {
  /** Toast variant/severity */
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  /** Toast title */
  title: PropTypes.string,
  /** Toast message */
  message: PropTypes.string.isRequired,
  /** Close handler function */
  onClose: PropTypes.func,
  /** Show close button */
  withCloseButton: PropTypes.bool,
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Toast;