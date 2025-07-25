import React from 'react';
import PropTypes from 'prop-types';
import { Card, Text, Title, Button, Badge } from '@mantine/core';
import { withHubSpotModule } from './HubSpotModuleWrapper.jsx';

/**
 * HubSpot-ready Card component with CMS field mappings
 */
const HubSpotCardComponent = ({
  // HubSpot fields
  card_title,
  card_description,
  card_image,
  card_badge,
  badge_color,
  card_button_text,
  card_button_url,
  card_button_style,
  open_in_new_tab,
  card_shadow,
  card_padding,
  card_radius,
  
  // Additional props
  onClick,
  ...props
}) => {
  const handleButtonClick = () => {
    // Track card interaction in HubSpot
    if (typeof window !== 'undefined' && window._hsq) {
      window._hsq.push(['trackEvent', {
        id: 'Card Interaction',
        value: card_title || 'Card Click'
      }]);
    }
    
    if (onClick) {
      onClick();
    }
    
    if (card_button_url) {
      window.open(
        card_button_url,
        open_in_new_tab ? '_blank' : '_self',
        open_in_new_tab ? 'noopener,noreferrer' : ''
      );
    }
  };

  return (
    <Card
      shadow={card_shadow || 'sm'}
      padding={card_padding || 'lg'}
      radius={card_radius || 'md'}
      withBorder
      {...props}
    >
      <Card.Section>
        {card_image && (
          <img
            src={card_image}
            alt={card_title || 'Card image'}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        )}
      </Card.Section>

      <div style={{ marginTop: card_image ? '16px' : '0' }}>
        {card_badge && (
          <Badge
            color={badge_color || 'blue'}
            variant="light"
            style={{ marginBottom: '8px' }}
          >
            {card_badge}
          </Badge>
        )}
        
        {card_title && (
          <Title order={3} style={{ marginBottom: '8px' }}>
            {card_title}
          </Title>
        )}
        
        {card_description && (
          <Text size="sm" color="dimmed" style={{ marginBottom: '16px' }}>
            {card_description}
          </Text>
        )}
        
        {card_button_text && (
          <Button
            variant={card_button_style || 'light'}
            fullWidth
            onClick={handleButtonClick}
          >
            {card_button_text}
          </Button>
        )}
      </div>
    </Card>
  );
};

// HubSpot module configuration
HubSpotCardComponent.hubspotModule = {
  meta: {
    label: 'Lucitra Card',
    icon: '@hubspot/card',
    categories: ['content', 'lucitra']
  },
  fields: [
    {
      type: 'text',
      name: 'card_title',
      label: 'Card Title',
      default: 'Card Title'
    },
    {
      type: 'text',
      name: 'card_description',
      label: 'Card Description',
      default: 'This is a card description'
    },
    {
      type: 'image',
      name: 'card_image',
      label: 'Card Image'
    },
    {
      type: 'text',
      name: 'card_badge',
      label: 'Badge Text'
    },
    {
      type: 'choice',
      name: 'badge_color',
      label: 'Badge Color',
      display: 'select',
      choices: [
        ['blue', 'Blue'],
        ['green', 'Green'],
        ['red', 'Red'],
        ['yellow', 'Yellow'],
        ['purple', 'Purple']
      ],
      default: 'blue'
    },
    {
      type: 'text',
      name: 'card_button_text',
      label: 'Button Text',
      default: 'Learn More'
    },
    {
      type: 'url',
      name: 'card_button_url',
      label: 'Button URL'
    },
    {
      type: 'choice',
      name: 'card_button_style',
      label: 'Button Style',
      display: 'select',
      choices: [
        ['filled', 'Filled'],
        ['light', 'Light'],
        ['outline', 'Outline']
      ],
      default: 'light'
    },
    {
      type: 'boolean',
      name: 'open_in_new_tab',
      label: 'Open in New Tab',
      default: false
    },
    {
      type: 'choice',
      name: 'card_shadow',
      label: 'Card Shadow',
      display: 'select',
      choices: [
        ['xs', 'Extra Small'],
        ['sm', 'Small'],
        ['md', 'Medium'],
        ['lg', 'Large'],
        ['xl', 'Extra Large']
      ],
      default: 'sm'
    },
    {
      type: 'choice',
      name: 'card_padding',
      label: 'Card Padding',
      display: 'select',
      choices: [
        ['xs', 'Extra Small'],
        ['sm', 'Small'],
        ['md', 'Medium'],
        ['lg', 'Large'],
        ['xl', 'Extra Large']
      ],
      default: 'lg'
    },
    {
      type: 'choice',
      name: 'card_radius',
      label: 'Card Radius',
      display: 'select',
      choices: [
        ['xs', 'Extra Small'],
        ['sm', 'Small'],
        ['md', 'Medium'],
        ['lg', 'Large'],
        ['xl', 'Extra Large']
      ],
      default: 'md'
    }
  ]
};

// PropTypes definition
HubSpotCardComponent.propTypes = {
  // HubSpot fields
  card_title: PropTypes.string,
  card_description: PropTypes.string,
  card_image: PropTypes.string,
  card_badge: PropTypes.string,
  badge_color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow', 'purple']),
  card_button_text: PropTypes.string,
  card_button_url: PropTypes.string,
  card_button_style: PropTypes.oneOf(['filled', 'light', 'outline']),
  open_in_new_tab: PropTypes.bool,
  card_shadow: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  card_padding: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  card_radius: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  
  // Additional props
  onClick: PropTypes.func
};

// Export the wrapped component
export const HubSpotCard = withHubSpotModule(HubSpotCardComponent);