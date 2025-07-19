import React, { useState } from 'react';
import { Button, Stack, Group, Container } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Toast, ToastProvider, useToast } from './Toast';

export default {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Toast notifications provide feedback about an operation in a small popup. They appear temporarily and disappear automatically.

## Features
- Multiple variants (info, success, warning, error)
- Auto-dismiss with configurable duration
- Programmable show/hide/update functionality
- Global toast management with ToastProvider
- Stacks multiple toasts automatically

**Note:** The interactive examples require the Notifications component from Mantine to be present in your app root.
        `
      }
    }
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Notifications position="top-right" />
        <Story />
      </ToastProvider>
    ),
  ],
};

// Static toast examples
export const StaticToasts = {
  render: () => (
    <Stack gap="md" style={{ maxWidth: '400px' }}>
      <Toast 
        variant="info" 
        title="Information"
        message="This is an informational toast message."
        onClose={() => alert('Toast closed')}
      />
      
      <Toast 
        variant="success" 
        title="Success"
        message="Your action was completed successfully."
        onClose={() => alert('Toast closed')}
      />
      
      <Toast 
        variant="warning" 
        title="Warning"
        message="Please be careful with this action."
        onClose={() => alert('Toast closed')}
      />
      
      <Toast 
        variant="error" 
        title="Error"
        message="Something went wrong. Please try again."
        onClose={() => alert('Toast closed')}
      />
    </Stack>
  )
};

// Interactive toast examples
const ToastDemo = () => {
  const toast = useToast();
  const [toastId, setToastId] = useState(null);

  const showToast = (variant, title, message) => {
    toast.show({
      variant,
      title,
      message,
      duration: 5000
    });
  };

  const showUpdatableToast = () => {
    const id = toast.show({
      variant: 'info',
      title: 'Loading...',
      message: 'Please wait while we process your request.',
      duration: false, // Don't auto-close
      loading: true
    });
    setToastId(id);

    // Simulate async operation
    setTimeout(() => {
      toast.update(id, {
        variant: 'success',
        title: 'Complete!',
        message: 'Your request has been processed successfully.',
        loading: false,
        duration: 4000
      });
      setToastId(null);
    }, 3000);
  };

  const showPersistentToast = () => {
    toast.show({
      variant: 'warning',
      title: 'Persistent Toast',
      message: 'This toast will not auto-dismiss. Click the X to close it.',
      duration: false
    });
  };

  return (
    <Container size="sm">
      <Stack gap="md">
        <Group gap="sm">
          <Button 
            onClick={() => showToast('info', 'Info Toast', 'This is an info message')}
            variant="light"
          >
            Show Info
          </Button>
          <Button 
            onClick={() => showToast('success', 'Success!', 'Operation completed successfully')}
            color="green"
            variant="light"
          >
            Show Success
          </Button>
          <Button 
            onClick={() => showToast('warning', 'Warning', 'Please be careful')}
            color="yellow"
            variant="light"
          >
            Show Warning
          </Button>
          <Button 
            onClick={() => showToast('error', 'Error', 'Something went wrong')}
            color="red"
            variant="light"
          >
            Show Error
          </Button>
        </Group>

        <Group gap="sm">
          <Button 
            onClick={showUpdatableToast}
            variant="outline"
            disabled={toastId !== null}
          >
            Loading → Success Demo
          </Button>
          <Button 
            onClick={showPersistentToast}
            variant="outline"
          >
            Persistent Toast
          </Button>
          <Button 
            onClick={() => toast.clean()}
            variant="outline"
            color="gray"
          >
            Clear All Toasts
          </Button>
        </Group>

        <Stack gap="xs" style={{ fontSize: '14px', color: '#666' }}>
          <div>• Toasts will appear in the top-right corner</div>
          <div>• They auto-dismiss after 5 seconds (except persistent ones)</div>
          <div>• Multiple toasts will stack vertically</div>
          <div>• The loading demo shows how to update toast content</div>
        </Stack>
      </Stack>
    </Container>
  );
};

export const InteractiveToasts = {
  render: () => <ToastDemo />
};

// Different duration examples
const DurationDemo = () => {
  const toast = useToast();

  return (
    <Group gap="sm">
      <Button 
        onClick={() => toast.show({
          variant: 'info',
          title: 'Quick Toast',
          message: 'This disappears in 1 second',
          duration: 1000
        })}
        size="sm"
      >
        1 Second
      </Button>
      <Button 
        onClick={() => toast.show({
          variant: 'info', 
          title: 'Normal Toast',
          message: 'This disappears in 4 seconds',
          duration: 4000
        })}
        size="sm"
      >
        4 Seconds
      </Button>
      <Button 
        onClick={() => toast.show({
          variant: 'info',
          title: 'Long Toast', 
          message: 'This disappears in 10 seconds',
          duration: 10000
        })}
        size="sm"
      >
        10 Seconds
      </Button>
    </Group>
  );
};

export const DurationExamples = {
  render: () => <DurationDemo />
};

// Usage examples
export const UsageExamples = {
  render: () => (
    <Container size="sm">
      <Stack gap="lg">
        <div>
          <h3>Basic Usage</h3>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '12px', 
            borderRadius: '4px',
            fontSize: '13px',
            overflow: 'auto'
          }}>
{`import { useToast, ToastProvider } from '@lucitra/react-components';

// Wrap your app with ToastProvider
<ToastProvider>
  <App />
</ToastProvider>

// Use in components
const MyComponent = () => {
  const toast = useToast();
  
  const handleSave = async () => {
    try {
      await saveData();
      toast.show({
        variant: 'success',
        title: 'Saved!',
        message: 'Your changes have been saved.'
      });
    } catch (error) {
      toast.show({
        variant: 'error', 
        title: 'Save Failed',
        message: error.message
      });
    }
  };
  
  return <Button onClick={handleSave}>Save</Button>;
};`}
          </pre>
        </div>
      </Stack>
    </Container>
  )
};