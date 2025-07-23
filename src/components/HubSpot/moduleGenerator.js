/**
 * Generate HubSpot module files from Lucitra components
 */

/**
 * Generate a complete HubSpot module structure
 */
export const generateHubSpotModule = (componentName, config = {}) => {
  const {
    component,
    fields = [],
    meta = {},
    styles = '',
    preview = null
  } = config;

  return {
    'module.jsx': generateModuleComponent(componentName, component),
    'fields.json': generateFieldsJson(fields),
    'meta.json': generateMetaJson(componentName, meta),
    'module.css': styles || generateDefaultStyles(),
    'module.html': generateModuleHtml(componentName)
  };
};

/**
 * Generate the main module component file
 */
const generateModuleComponent = (name, component) => {
  const componentImport = component?.import || `@lucitra/react-components`;
  const componentName = component?.name || name;

  return `import React from 'react';
import { ${componentName} } from '${componentImport}';
import { HubSpotModuleWrapper } from '@lucitra/react-components/hubspot';

export const Component = ({ fieldValues, isPreview, portalId }) => {
  return (
    <HubSpotModuleWrapper
      Component={${componentName}}
      fieldValues={fieldValues}
      isPreview={isPreview}
      portalId={portalId}
      fallback={
        <div className="module-fallback">
          <h2>{fieldValues.title || 'Loading...'}</h2>
          {fieldValues.description && <p>{fieldValues.description}</p>}
        </div>
      }
    />
  );
};

// Export metadata for HubSpot
export const meta = ${JSON.stringify(generateDefaultMeta(name), null, 2)};

// Export field definitions
export { fields } from './fields';
`;
};

/**
 * Generate fields.json for HubSpot module
 */
const generateFieldsJson = (fields) => {
  const defaultFields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      default: ''
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      default: ''
    }
  ];

  return JSON.stringify([...defaultFields, ...fields], null, 2);
};

/**
 * Generate meta.json for HubSpot module
 */
const generateMetaJson = (name, customMeta) => {
  const defaultMeta = generateDefaultMeta(name);
  return JSON.stringify({ ...defaultMeta, ...customMeta }, null, 2);
};

/**
 * Generate default meta configuration
 */
const generateDefaultMeta = (name) => ({
  label: name.replace(/([A-Z])/g, ' $1').trim(),
  host_template_types: ['PAGE', 'BLOG_POST', 'BLOG_LISTING'],
  icon: '@hubspot/sprocket',
  categories: ['lucitra', 'custom'],
  is_available_for_new_content: true
});

/**
 * Generate default module styles
 */
const generateDefaultStyles = () => `/* ${name} Module Styles */
.module-wrapper {
  position: relative;
  width: 100%;
}

.module-fallback {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  text-align: center;
}

.module-fallback h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: #212529;
}

.module-fallback p {
  margin: 0;
  color: #6c757d;
}

/* Responsive styles */
@media (max-width: 768px) {
  .module-wrapper {
    padding: 1rem;
  }
}
`;

/**
 * Generate module.html for HubSpot
 */
const generateModuleHtml = (name) => `<!-- ${name} Module -->
<div class="lucitra-module lucitra-${name.toLowerCase()}">
  <!-- React component will be rendered here -->
  <div id="module-{{ module.id }}"></div>
</div>

<script>
  // Module initialization script
  (function() {
    if (typeof window.__LUCITRA_MODULES__ === 'undefined') {
      window.__LUCITRA_MODULES__ = {};
    }
    
    window.__LUCITRA_MODULES__['{{ module.id }}'] = {
      name: '${name}',
      fields: {{ module.fields|tojson }},
      isPreview: {{ is_in_editor }},
      portalId: {{ portal_id }}
    };
  })();
</script>
`;

/**
 * Field type mappings from Lucitra to HubSpot
 */
export const fieldTypeMap = {
  string: 'text',
  number: 'number',
  boolean: 'boolean',
  select: 'choice',
  color: 'color',
  url: 'url',
  image: 'image',
  richtext: 'richtext',
  array: 'repeater'
};

/**
 * Convert Lucitra prop types to HubSpot fields
 */
export const propsToFields = (propTypes) => {
  return Object.entries(propTypes).map(([key, type]) => {
    const fieldType = fieldTypeMap[type] || 'text';
    return {
      name: key,
      label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      type: fieldType,
      default: getDefaultValue(fieldType)
    };
  });
};

/**
 * Get default value for field type
 */
const getDefaultValue = (type) => {
  switch (type) {
    case 'boolean': return false;
    case 'number': return 0;
    case 'array': return [];
    case 'object': return {};
    default: return '';
  }
};