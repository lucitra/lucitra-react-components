import React, { useState } from 'react';
import { Button, Stack, Group } from '@mantine/core';
import { Alert } from './Alert';
import { IconBell, IconDownload } from '@tabler/icons-react';

export default {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Alert components display important messages to users with different severity levels.

## Features
- Multiple variants (info, success, warning, error)
- Optional titles and custom icons
- Dismissible with close button
- Support for action buttons
- Consistent styling with design system
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    withCloseButton: {
      control: 'boolean'
    }
  }
};

// Basic alerts
export const BasicAlerts = {
  render: () => (
    <Stack gap="md">
      <Alert variant="info" title="Information">
        This is an informational message to help users understand something important.
      </Alert>
      
      <Alert variant="success" title="Success">
        Your action was completed successfully. Everything worked as expected.
      </Alert>
      
      <Alert variant="warning" title="Warning">
        Please be careful. This action might have unintended consequences.
      </Alert>
      
      <Alert variant="error" title="Error">
        Something went wrong. Please check your input and try again.
      </Alert>
    </Stack>
  )
};

// Without titles
export const WithoutTitles = {
  render: () => (
    <Stack gap="md">
      <Alert variant="info">
        Simple informational message without a title.
      </Alert>
      
      <Alert variant="success">
        Success message without a title.
      </Alert>
      
      <Alert variant="warning">
        Warning message without a title.
      </Alert>
      
      <Alert variant="error">
        Error message without a title.
      </Alert>
    </Stack>
  )
};

// With custom icons
export const WithCustomIcons = {
  render: () => (
    <Stack gap="md">
      <Alert variant="info" icon={IconBell} title="Notification">
        You have a new notification waiting for you.
      </Alert>
      
      <Alert variant="success" icon={IconDownload} title="Download Complete">
        Your file has been downloaded successfully.
      </Alert>
    </Stack>
  )
};

// Interactive examples
export const InteractiveExamples = {
  render: function Render() {
    const [alerts, setAlerts] = useState([
      { id: 1, variant: 'info', title: 'System Update', message: 'A system update is available.' },
      { id: 2, variant: 'warning', title: 'Maintenance', message: 'Scheduled maintenance in 30 minutes.' }
    ]);

    const removeAlert = (id) => {
      setAlerts(alerts.filter(alert => alert.id !== id));
    };

    const addAlert = (variant) => {
      const newAlert = {
        id: Date.now(),
        variant,
        title: variant.charAt(0).toUpperCase() + variant.slice(1),
        message: `This is a ${variant} alert message.`
      };
      setAlerts([...alerts, newAlert]);
    };

    return (
      <Stack gap="md">
        <Group gap="sm">
          <Button size="xs" onClick={() => addAlert('info')}>Add Info</Button>
          <Button size="xs" color="green" onClick={() => addAlert('success')}>Add Success</Button>
          <Button size="xs" color="yellow" onClick={() => addAlert('warning')}>Add Warning</Button>
          <Button size="xs" color="red" onClick={() => addAlert('error')}>Add Error</Button>
        </Group>
        
        <Stack gap="sm">
          {alerts.map(alert => (
            <Alert
              key={alert.id}
              variant={alert.variant}
              title={alert.title}
              withCloseButton
              onClose={() => removeAlert(alert.id)}
            >
              {alert.message}
            </Alert>
          ))}
          {alerts.length === 0 && (
            <Alert variant="info">
              No alerts to display. Use the buttons above to add some!
            </Alert>
          )}
        </Stack>
      </Stack>
    );
  }
};

// With actions
export const WithActions = {
  render: () => (
    <Stack gap="md">
      <Alert 
        variant="info" 
        title="Update Available"
        actions={
          <Group gap="xs">
            <Button size="xs" variant="light">Update Now</Button>
            <Button size="xs" variant="subtle">Later</Button>
          </Group>
        }
      >
        A new version of the application is available. Would you like to update now?
      </Alert>
      
      <Alert 
        variant="error" 
        title="Connection Failed"
        withCloseButton
        onClose={() => alert('Alert dismissed')}
        actions={
          <Button size="xs" variant="light" color="red">
            Retry
          </Button>
        }
      >
        Unable to connect to the server. Please check your internet connection.
      </Alert>
    </Stack>
  )
};

// Playground
export const Playground = {
  args: {
    variant: 'info',
    title: 'Sample Alert',
    children: 'This is a sample alert message that you can customize using the controls below.',
    withCloseButton: false
  },
  render: (args) => <Alert {...args} />
};