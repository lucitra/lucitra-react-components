import React, { useState, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { mantineTheme } from '../../theme/mantineTheme';

/**
 * Universal wrapper for making any Lucitra component HubSpot-ready
 * Handles SSR, field mapping, and theme integration
 */
export const HubSpotModuleWrapper = ({ 
  Component,
  fieldValues = {},
  theme = mantineTheme,
  fallback = null,
  isPreview = false,
  portalId,
  moduleId,
  ...props 
}) => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Error boundary
  useEffect(() => {
    const handleError = (event) => {
      console.error('HubSpot Module Error:', event.error);
      setError(event.error);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Server-side fallback
  if (!isClient) {
    if (fallback) return fallback;
    
    // Default SSR fallback
    return (
      <div 
        className="lucitra-module-loading"
        style={{ 
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '18px', marginBottom: '8px' }}>
          {fieldValues.title || 'Loading...'}
        </div>
        {fieldValues.description && (
          <div style={{ color: '#666' }}>{fieldValues.description}</div>
        )}
      </div>
    );
  }

  // Error state
  if (error && !isPreview) {
    return (
      <div 
        className="lucitra-module-error"
        style={{ 
          padding: '20px',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          color: '#c00'
        }}
      >
        <strong>Module Error:</strong> {error.message || 'Something went wrong'}
      </div>
    );
  }

  // Custom theme with HubSpot overrides
  const hubspotTheme = {
    ...theme,
    // Override with HubSpot brand colors if provided
    primaryColor: fieldValues.primary_color || theme.primaryColor,
    // Add HubSpot-specific styles
    components: {
      ...theme.components,
      Button: {
        ...theme.components?.Button,
        styles: {
          ...theme.components?.Button?.styles,
          root: {
            // Ensure buttons work well in HubSpot context
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }
        }
      }
    }
  };

  // Props to pass to component
  const componentProps = {
    ...props,
    ...fieldValues,
    isHubSpot: true,
    isPreview,
    portalId,
    moduleId
  };

  return (
    <MantineProvider theme={hubspotTheme}>
      <div 
        className="lucitra-module-wrapper"
        data-module-id={moduleId}
        data-portal-id={portalId}
      >
        <Component {...componentProps} />
      </div>
    </MantineProvider>
  );
};

/**
 * Higher-order component to make any component HubSpot-ready
 */
export const withHubSpotModule = (Component, options = {}) => {
  const WrappedComponent = (props) => (
    <HubSpotModuleWrapper
      Component={Component}
      {...options}
      {...props}
    />
  );

  // Copy static properties
  WrappedComponent.displayName = `HubSpot(${Component.displayName || Component.name || 'Component'})`;
  WrappedComponent.hubspotModule = Component.hubspotModule || options.hubspotModule;

  return WrappedComponent;
};