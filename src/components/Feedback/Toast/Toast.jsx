/**
 * Toast Component
 * 
 * Displays temporary notifications that appear and disappear automatically
 * Built on top of Mantine's notification system
 */

import React, { createContext, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { notifications } from '@mantine/notifications';
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
        
        notifications.show({
          title,
          message,
          color,
          icon: IconComponent && <IconComponent size={16} />,
          style: {
            border: `2px solid ${color === 'blue' ? '#228be6' : 
                                 color === 'green' ? '#40c057' :
                                 color === 'yellow' ? '#fd7e14' : '#fa5252'}`,
            borderRadius: 0,
            backgroundColor: 'white'
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
      style: {
        border: `2px solid ${color === 'blue' ? '#228be6' : 
                             color === 'green' ? '#40c057' :
                             color === 'yellow' ? '#fd7e14' : '#fa5252'}`,
        borderRadius: 0,
        backgroundColor: 'white'
      },
      ...rest
    });
  }, []);

  const hide = useCallback((id) => {
    notifications.hide(id);
  }, []);

  const clean = useCallback(() => {
    notifications.clean();
  }, []);

  const update = useCallback((id, options) => {
    const { variant, title, message, ...rest } = options;
    const IconComponent = variant ? VARIANT_ICONS[variant] : undefined;
    const color = variant ? VARIANT_COLORS[variant] : undefined;
    
    notifications.update({
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
  const color = VARIANT_COLORS[variant];

  return (
    <div
      style={{
        padding: '12px 16px',
        border: `2px solid ${color === 'blue' ? '#228be6' : 
                              color === 'green' ? '#40c057' :
                              color === 'yellow' ? '#fd7e14' : '#fa5252'}`,
        borderRadius: 0,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
      {...props}
    >
      {IconComponent && (
        <IconComponent 
          size={16} 
          style={{ 
            color: color === 'blue' ? '#228be6' : 
                   color === 'green' ? '#40c057' :
                   color === 'yellow' ? '#fd7e14' : '#fa5252',
            marginTop: '2px',
            flexShrink: 0
          }} 
        />
      )}
      
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ 
            fontWeight: 600, 
            fontSize: '14px',
            marginBottom: '4px',
            color: '#000'
          }}>
            {title}
          </div>
        )}
        <div style={{ 
          fontSize: '14px',
          color: '#666',
          lineHeight: '1.4'
        }}>
          {message}
        </div>
      </div>
      
      {withCloseButton && onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            flexShrink: 0
          }}
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