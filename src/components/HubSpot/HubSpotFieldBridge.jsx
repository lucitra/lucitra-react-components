import React from 'react';

/**
 * Bridge component for mapping HubSpot field values to React component props
 */
export const HubSpotFieldBridge = ({ 
  fieldValues = {},
  fieldMapping = {},
  children,
  transform = {},
  ...props 
}) => {
  // Apply field mapping
  const mappedProps = React.useMemo(() => {
    const mapped = {};
    
    // Apply direct field mapping
    Object.entries(fieldMapping).forEach(([hubspotField, componentProp]) => {
      if (fieldValues[hubspotField] !== undefined) {
        mapped[componentProp] = fieldValues[hubspotField];
      }
    });
    
    // Apply transformations
    Object.entries(transform).forEach(([field, transformer]) => {
      if (fieldValues[field] !== undefined) {
        mapped[field] = transformer(fieldValues[field]);
      }
    });
    
    // Include all other field values
    Object.entries(fieldValues).forEach(([key, value]) => {
      if (!fieldMapping[key] && !transform[key]) {
        mapped[key] = value;
      }
    });
    
    return { ...mapped, ...props };
  }, [fieldValues, fieldMapping, transform, props]);

  // Clone children with mapped props
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, mappedProps);
    }
    return child;
  });
};

/**
 * Hook for using field bridge functionality
 */
export const useHubSpotFields = (fieldValues, options = {}) => {
  const { mapping = {}, transforms = {} } = options;
  
  return React.useMemo(() => {
    const mapped = {};
    
    // Apply mapping
    Object.entries(mapping).forEach(([hubspotField, componentProp]) => {
      if (fieldValues[hubspotField] !== undefined) {
        mapped[componentProp] = fieldValues[hubspotField];
      }
    });
    
    // Apply transforms
    Object.entries(transforms).forEach(([field, transformer]) => {
      if (fieldValues[field] !== undefined) {
        mapped[field] = transformer(fieldValues[field]);
      }
    });
    
    // Include unmapped fields
    Object.entries(fieldValues).forEach(([key, value]) => {
      if (!mapping[key] && !transforms[key]) {
        mapped[key] = value;
      }
    });
    
    return mapped;
  }, [fieldValues, mapping, transforms]);
};