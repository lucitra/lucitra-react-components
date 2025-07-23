import React from 'react';
import { Button, TextInput, Select, Checkbox } from '@mantine/core';
import { withHubSpotModule } from './HubSpotModuleWrapper.jsx';

/**
 * HubSpot-ready Form component with CMS field mappings
 */
const HubSpotFormComponent = ({
  // HubSpot fields
  form_title,
  form_description,
  form_action,
  form_method,
  success_message,
  error_message,
  submit_button_text,
  submit_button_color,
  enable_validation,
  form_fields = [],
  
  // Additional props
  onSubmit,
  ...props
}) => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null); // 'success' | 'error'

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  const validateForm = () => {
    if (!enable_validation) return true;
    
    const newErrors = {};
    
    form_fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      // Email validation
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Track form submission in HubSpot
      if (typeof window !== 'undefined' && window._hsq) {
        window._hsq.push(['trackEvent', {
          id: 'Form Submission',
          value: form_title || 'Contact Form'
        }]);
      }
      
      if (onSubmit) {
        await onSubmit(formData, e);
      } else if (form_action) {
        // Submit to custom endpoint
        const response = await fetch(form_action, {
          method: form_method || 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('Form submission failed');
      }
      
      setSubmitStatus('success');
      setFormData({});
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      key: field.name,
      name: field.name,
      label: field.label,
      required: field.required,
      error: errors[field.name],
      value: formData[field.name] || '',
      onChange: (e) => handleFieldChange(field.name, e.target.value)
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return <TextInput {...commonProps} type={field.type} />;
      
      case 'select':
        return (
          <Select
            {...commonProps}
            data={field.options || []}
            onChange={(value) => handleFieldChange(field.name, value)}
          />
        );
      
      case 'checkbox':
        return (
          <Checkbox
            {...commonProps}
            checked={formData[field.name] || false}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
          />
        );
      
      default:
        return <TextInput {...commonProps} />;
    }
  };

  if (submitStatus === 'success') {
    return (
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px' }}>
        <h3 style={{ color: '#155724' }}>Success!</h3>
        <p style={{ color: '#155724' }}>{success_message || 'Thank you for your submission!'}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      {form_title && <h2>{form_title}</h2>}
      {form_description && <p>{form_description}</p>}
      
      {submitStatus === 'error' && (
        <div style={{ padding: '10px', marginBottom: '20px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          <p style={{ color: '#721c24', margin: 0 }}>{error_message || 'Something went wrong. Please try again.'}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {form_fields.map(renderField)}
          
          <Button
            type="submit"
            loading={isSubmitting}
            color={submit_button_color}
            size="md"
            fullWidth
          >
            {submit_button_text || 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

// HubSpot module configuration
HubSpotFormComponent.hubspotModule = {
  meta: {
    label: 'Lucitra Contact Form',
    icon: '@hubspot/form',
    categories: ['forms', 'lucitra']
  },
  fields: [
    {
      type: 'text',
      name: 'form_title',
      label: 'Form Title',
      default: 'Contact Us'
    },
    {
      type: 'text',
      name: 'form_description',
      label: 'Form Description',
      default: 'Get in touch with us'
    },
    {
      type: 'text',
      name: 'form_action',
      label: 'Form Action URL',
      help_text: 'Leave empty to handle with onSubmit'
    },
    {
      type: 'choice',
      name: 'form_method',
      label: 'Form Method',
      display: 'select',
      choices: [
        ['POST', 'POST'],
        ['GET', 'GET']
      ],
      default: 'POST'
    },
    {
      type: 'text',
      name: 'success_message',
      label: 'Success Message',
      default: 'Thank you for your submission!'
    },
    {
      type: 'text',
      name: 'error_message',
      label: 'Error Message',
      default: 'Something went wrong. Please try again.'
    },
    {
      type: 'text',
      name: 'submit_button_text',
      label: 'Submit Button Text',
      default: 'Submit'
    },
    {
      type: 'color',
      name: 'submit_button_color',
      label: 'Submit Button Color',
      default: { color: '#0066CC' }
    },
    {
      type: 'boolean',
      name: 'enable_validation',
      label: 'Enable Form Validation',
      default: true
    },
    // Note: form_fields would typically be managed through a repeater field
    // but simplified here for demo purposes
  ]
};

// Export the wrapped component
export const HubSpotForm = withHubSpotModule(HubSpotFormComponent);