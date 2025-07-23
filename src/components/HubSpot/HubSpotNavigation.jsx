import React from 'react';
import { Breadcrumbs, Pagination, Button } from '@mantine/core';
import { withHubSpotModule } from './HubSpotModuleWrapper.jsx';

/**
 * HubSpot-ready Navigation component with CMS field mappings
 */
const HubSpotNavigationComponent = ({
  // HubSpot fields
  nav_type,
  breadcrumb_items = [],
  show_home_link,
  home_link_text,
  current_page,
  total_pages,
  page_size,
  nav_buttons = [],
  nav_style,
  nav_alignment,
  
  // Additional props
  onPageChange,
  onNavClick,
  ...props
}) => {
  const handlePageChange = (page) => {
    // Track pagination in HubSpot
    if (typeof window !== 'undefined' && window._hsq) {
      window._hsq.push(['trackEvent', {
        id: 'Pagination Click',
        value: `Page ${page}`
      }]);
    }
    
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleNavClick = (button) => {
    // Track navigation click in HubSpot
    if (typeof window !== 'undefined' && window._hsq) {
      window._hsq.push(['trackEvent', {
        id: 'Navigation Click',
        value: button.text || button.url
      }]);
    }
    
    if (onNavClick) {
      onNavClick(button);
    }
  };

  const renderNavigation = () => {
    const containerStyle = {
      display: 'flex',
      justifyContent: nav_alignment || 'flex-start',
      alignItems: 'center',
      padding: '16px 0',
      gap: '16px'
    };

    switch (nav_type) {
      case 'breadcrumb':
        const items = show_home_link 
          ? [{ title: home_link_text || 'Home', href: '/' }, ...breadcrumb_items]
          : breadcrumb_items;
          
        return (
          <div style={containerStyle}>
            <Breadcrumbs>
              {items.map((item, index) => {
                const isLast = index === items.length - 1;
                if (isLast) {
                  return <span key={index}>{item.title || item.text}</span>;
                }
                return (
                  <a 
                    key={index} 
                    href={item.href || item.url}
                    style={{ textDecoration: 'none', color: '#228be6' }}
                  >
                    {item.title || item.text}
                  </a>
                );
              })}
            </Breadcrumbs>
          </div>
        );

      case 'pagination':
        return (
          <div style={containerStyle}>
            <Pagination
              value={current_page || 1}
              total={total_pages || 1}
              size={page_size || 'md'}
              onChange={handlePageChange}
            />
          </div>
        );

      case 'buttons':
        return (
          <div style={containerStyle}>
            {nav_buttons.map((button, index) => (
              <Button
                key={index}
                variant={nav_style || 'light'}
                component={button.url ? 'a' : 'button'}
                href={button.url}
                onClick={() => handleNavClick(button)}
                target={button.open_in_new_tab ? '_blank' : undefined}
              >
                {button.text}
              </Button>
            ))}
          </div>
        );

      default:
        return (
          <div style={containerStyle}>
            <p>Select a navigation type</p>
          </div>
        );
    }
  };

  return renderNavigation();
};

// HubSpot module configuration
HubSpotNavigationComponent.hubspotModule = {
  meta: {
    label: 'Lucitra Navigation',
    icon: '@hubspot/navigation',
    categories: ['navigation', 'lucitra']
  },
  fields: [
    {
      type: 'choice',
      name: 'nav_type',
      label: 'Navigation Type',
      display: 'select',
      choices: [
        ['breadcrumb', 'Breadcrumb'],
        ['pagination', 'Pagination'],
        ['buttons', 'Navigation Buttons']
      ],
      default: 'breadcrumb'
    },
    {
      type: 'choice',
      name: 'nav_alignment',
      label: 'Alignment',
      display: 'select',
      choices: [
        ['flex-start', 'Left'],
        ['center', 'Center'],
        ['flex-end', 'Right']
      ],
      default: 'flex-start'
    },
    // Breadcrumb fields
    {
      type: 'boolean',
      name: 'show_home_link',
      label: 'Show Home Link',
      default: true,
      visibility: {
        controlling_field: 'nav_type',
        operator: 'EQUAL',
        controlling_value: 'breadcrumb'
      }
    },
    {
      type: 'text',
      name: 'home_link_text',
      label: 'Home Link Text',
      default: 'Home',
      visibility: {
        controlling_field: 'show_home_link',
        operator: 'EQUAL',
        controlling_value: true
      }
    },
    // Pagination fields
    {
      type: 'number',
      name: 'current_page',
      label: 'Current Page',
      default: 1,
      visibility: {
        controlling_field: 'nav_type',
        operator: 'EQUAL',
        controlling_value: 'pagination'
      }
    },
    {
      type: 'number',
      name: 'total_pages',
      label: 'Total Pages',
      default: 10,
      visibility: {
        controlling_field: 'nav_type',
        operator: 'EQUAL',
        controlling_value: 'pagination'
      }
    },
    {
      type: 'choice',
      name: 'page_size',
      label: 'Pagination Size',
      display: 'select',
      choices: [
        ['xs', 'Extra Small'],
        ['sm', 'Small'],
        ['md', 'Medium'],
        ['lg', 'Large']
      ],
      default: 'md',
      visibility: {
        controlling_field: 'nav_type',
        operator: 'EQUAL',
        controlling_value: 'pagination'
      }
    },
    // Button navigation fields
    {
      type: 'choice',
      name: 'nav_style',
      label: 'Button Style',
      display: 'select',
      choices: [
        ['filled', 'Filled'],
        ['light', 'Light'],
        ['outline', 'Outline'],
        ['subtle', 'Subtle']
      ],
      default: 'light',
      visibility: {
        controlling_field: 'nav_type',
        operator: 'EQUAL',
        controlling_value: 'buttons'
      }
    }
    // Note: breadcrumb_items and nav_buttons would typically be managed 
    // through repeater fields but simplified here for demo purposes
  ]
};

// Export the wrapped component
export const HubSpotNavigation = withHubSpotModule(HubSpotNavigationComponent);