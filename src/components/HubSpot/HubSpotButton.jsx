import React from 'react';
import { Button } from '@mantine/core';
import { withHubSpotModule } from './HubSpotModuleWrapper.jsx';

/**
 * HubSpot-ready Button component with CMS field mappings
 */
const HubSpotButtonComponent = ({
  // HubSpot fields
  button_text,
  button_url,
  button_style,
  button_size,
  button_color,
  open_in_new_tab,
  is_disabled,
  show_icon,
  icon_position,
  
  // Additional props
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    
    // Track button click in HubSpot
    if (typeof window !== 'undefined' && window._hsq) {
      window._hsq.push(['trackEvent', {
        id: 'Button Click',
        value: button_text
      }]);
    }
  };

  // Map HubSpot field values to component props
  const buttonProps = {
    variant: button_style || 'filled',
    size: button_size || 'md',
    color: button_color || 'primary',
    disabled: is_disabled,
    leftIcon: show_icon && icon_position === 'left' ? '→' : undefined,
    rightIcon: show_icon && icon_position === 'right' ? '→' : undefined,
    component: button_url ? 'a' : 'button',
    href: button_url,
    target: open_in_new_tab ? '_blank' : undefined,
    rel: open_in_new_tab ? 'noopener noreferrer' : undefined,
    onClick: handleClick,
    ...props
  };

  return (
    <Button {...buttonProps}>
      {button_text || 'Click Me'}
    </Button>
  );
};

// HubSpot module configuration
HubSpotButtonComponent.hubspotModule = {
  meta: {
    label: 'Lucitra Button',
    icon: '@hubspot/button',
    categories: ['interactive', 'lucitra']
  },
  fields: [
    {
      type: 'text',
      name: 'button_text',
      label: 'Button Text',
      default: 'Click Me'
    },
    {
      type: 'url',
      name: 'button_url',
      label: 'Button URL',
      default: ''
    },
    {
      type: 'choice',
      name: 'button_style',
      label: 'Button Style',
      display: 'select',
      choices: [
        ['filled', 'Filled'],
        ['light', 'Light'],
        ['outline', 'Outline'],
        ['subtle', 'Subtle'],
        ['transparent', 'Transparent']
      ],
      default: 'filled'
    },
    {
      type: 'choice',
      name: 'button_size',
      label: 'Button Size',
      display: 'select',
      choices: [
        ['xs', 'Extra Small'],
        ['sm', 'Small'],
        ['md', 'Medium'],
        ['lg', 'Large'],
        ['xl', 'Extra Large']
      ],
      default: 'md'
    },
    {
      type: 'color',
      name: 'button_color',
      label: 'Button Color',
      default: { color: '#0066CC' }
    },
    {
      type: 'boolean',
      name: 'open_in_new_tab',
      label: 'Open in New Tab',
      default: false
    },
    {
      type: 'boolean',
      name: 'is_disabled',
      label: 'Disabled',
      default: false
    },
    {
      type: 'boolean',
      name: 'show_icon',
      label: 'Show Icon',
      default: false
    },
    {
      type: 'choice',
      name: 'icon_position',
      label: 'Icon Position',
      display: 'select',
      choices: [
        ['left', 'Left'],
        ['right', 'Right']
      ],
      default: 'right',
      visibility: {
        controlling_field: 'show_icon',
        operator: 'EQUAL',
        controlling_value: true
      }
    }
  ]
};

// Export the wrapped component
export const HubSpotButton = withHubSpotModule(HubSpotButtonComponent);