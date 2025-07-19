import React, { useState } from 'react';
import { Stack, Group, Text, Divider } from '@mantine/core';
import { 
  IconPlus, 
  IconTrash, 
  IconEdit, 
  IconDownload, 
  IconArrowRight,
  IconHeart,
  IconStar,
  IconShare
} from '@tabler/icons-react';
import { 
  EnhancedButton, 
  PrimaryButton, 
  SecondaryButton,
  SuccessButton,
  WarningButton,
  DangerButton,
  GhostButton,
  LinkButton,
  ButtonGroup 
} from './EnhancedButton';

export default {
  title: 'Forms/Enhanced Button',
  component: EnhancedButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Enhanced Button component with comprehensive variants, states, and features for a complete design system.

## Features
- Multiple visual variants (primary, success, warning, danger, neutral)
- Different appearances (filled, outline, ghost)
- Loading states with spinners
- Icon support (left and right)
- Size variations (xs, sm, md, lg, xl)
- Specialized button types
- Button groups for related actions
- Full accessibility support
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
    },
    appearance: {
      control: { type: 'select' },
      options: ['filled', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  }
};

// Basic variants
export const BasicVariants = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Filled Buttons</Text>
        <Group gap="sm">
          <EnhancedButton variant="primary">Primary</EnhancedButton>
          <EnhancedButton variant="success">Success</EnhancedButton>
          <EnhancedButton variant="warning">Warning</EnhancedButton>
          <EnhancedButton variant="danger">Danger</EnhancedButton>
          <EnhancedButton variant="neutral">Neutral</EnhancedButton>
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Outline Buttons</Text>
        <Group gap="sm">
          <EnhancedButton variant="primary" appearance="outline">Primary</EnhancedButton>
          <EnhancedButton variant="success" appearance="outline">Success</EnhancedButton>
          <EnhancedButton variant="warning" appearance="outline">Warning</EnhancedButton>
          <EnhancedButton variant="danger" appearance="outline">Danger</EnhancedButton>
          <EnhancedButton variant="neutral" appearance="outline">Neutral</EnhancedButton>
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Ghost Buttons</Text>
        <Group gap="sm">
          <EnhancedButton variant="primary" appearance="ghost">Primary</EnhancedButton>
          <EnhancedButton variant="success" appearance="ghost">Success</EnhancedButton>
          <EnhancedButton variant="warning" appearance="ghost">Warning</EnhancedButton>
          <EnhancedButton variant="danger" appearance="ghost">Danger</EnhancedButton>
          <EnhancedButton variant="neutral" appearance="ghost">Neutral</EnhancedButton>
        </Group>
      </div>
    </Stack>
  )
};

// Button sizes
export const ButtonSizes = {
  render: () => (
    <Group gap="sm" align="center">
      <EnhancedButton size="xs">Extra Small</EnhancedButton>
      <EnhancedButton size="sm">Small</EnhancedButton>
      <EnhancedButton size="md">Medium</EnhancedButton>
      <EnhancedButton size="lg">Large</EnhancedButton>
      <EnhancedButton size="xl">Extra Large</EnhancedButton>
    </Group>
  )
};

// Buttons with icons
export const ButtonsWithIcons = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Left Icons</Text>
        <Group gap="sm">
          <EnhancedButton leftIcon={<IconPlus size={16} />}>Add Item</EnhancedButton>
          <EnhancedButton variant="success" leftIcon={<IconDownload size={16} />}>Download</EnhancedButton>
          <EnhancedButton variant="warning" leftIcon={<IconEdit size={16} />}>Edit</EnhancedButton>
          <EnhancedButton variant="danger" leftIcon={<IconTrash size={16} />}>Delete</EnhancedButton>
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Right Icons</Text>
        <Group gap="sm">
          <EnhancedButton rightIcon={<IconArrowRight size={16} />}>Continue</EnhancedButton>
          <EnhancedButton variant="success" rightIcon={<IconStar size={16} />}>Rate</EnhancedButton>
          <EnhancedButton variant="neutral" rightIcon={<IconShare size={16} />}>Share</EnhancedButton>
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Both Icons</Text>
        <Group gap="sm">
          <EnhancedButton 
            leftIcon={<IconHeart size={16} />} 
            rightIcon={<IconArrowRight size={16} />}
          >
            Like & Continue
          </EnhancedButton>
        </Group>
      </div>
    </Stack>
  )
};

// Button states
const ButtonStatesExample = () => {
  const [loadingStates, setLoadingStates] = useState({});

  const handleAsyncAction = (buttonId) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  return (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Normal States</Text>
        <Group gap="sm">
          <EnhancedButton>Normal</EnhancedButton>
          <EnhancedButton disabled>Disabled</EnhancedButton>
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Loading States</Text>
        <Group gap="sm">
          <EnhancedButton 
            loading={loadingStates.save}
            onClick={() => handleAsyncAction('save')}
          >
            Save Changes
          </EnhancedButton>
          <EnhancedButton 
            variant="success"
            loading={loadingStates.submit}
            onClick={() => handleAsyncAction('submit')}
          >
            Submit Form
          </EnhancedButton>
          <EnhancedButton 
            variant="danger"
            loading={loadingStates.delete}
            onClick={() => handleAsyncAction('delete')}
          >
            Delete Item
          </EnhancedButton>
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Full Width</Text>
        <EnhancedButton fullWidth>Full Width Button</EnhancedButton>
      </div>
    </Stack>
  );
};

export const ButtonStates = {
  render: () => <ButtonStatesExample />
};

// Specialized buttons
export const SpecializedButtons = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Convenience Components</Text>
        <Group gap="sm">
          <PrimaryButton>Primary</PrimaryButton>
          <SecondaryButton>Secondary</SecondaryButton>
          <SuccessButton>Success</SuccessButton>
          <WarningButton>Warning</WarningButton>
          <DangerButton>Danger</DangerButton>
          <GhostButton>Ghost</GhostButton>
          <LinkButton>Link Button</LinkButton>
        </Group>
      </div>
    </Stack>
  )
};

// Button groups
export const ButtonGroups = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Horizontal Groups</Text>
        <ButtonGroup>
          <EnhancedButton leftIcon={<IconEdit size={16} />}>Edit</EnhancedButton>
          <EnhancedButton variant="success" leftIcon={<IconDownload size={16} />}>Download</EnhancedButton>
          <EnhancedButton variant="danger" leftIcon={<IconTrash size={16} />}>Delete</EnhancedButton>
        </ButtonGroup>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Vertical Groups</Text>
        <div style={{ width: '200px' }}>
          <ButtonGroup orientation="vertical">
            <EnhancedButton fullWidth>Option 1</EnhancedButton>
            <EnhancedButton fullWidth appearance="outline">Option 2</EnhancedButton>
            <EnhancedButton fullWidth appearance="ghost">Option 3</EnhancedButton>
          </ButtonGroup>
        </div>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Action Groups</Text>
        <ButtonGroup spacing="xs">
          <PrimaryButton>Save</PrimaryButton>
          <SecondaryButton>Cancel</SecondaryButton>
        </ButtonGroup>
      </div>
    </Stack>
  )
};

// Real-world examples
export const RealWorldExamples = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text fw={600} mb="md">Form Actions</Text>
        <ButtonGroup>
          <PrimaryButton>Submit</PrimaryButton>
          <SecondaryButton>Save Draft</SecondaryButton>
          <GhostButton>Cancel</GhostButton>
        </ButtonGroup>
      </div>
      
      <Divider />
      
      <div>
        <Text fw={600} mb="md">Data Table Actions</Text>
        <ButtonGroup spacing="xs">
          <EnhancedButton size="sm" leftIcon={<IconPlus size={14} />}>Add New</EnhancedButton>
          <EnhancedButton size="sm" variant="neutral" leftIcon={<IconEdit size={14} />}>Edit</EnhancedButton>
          <EnhancedButton size="sm" variant="danger" leftIcon={<IconTrash size={14} />}>Delete</EnhancedButton>
        </ButtonGroup>
      </div>
      
      <Divider />
      
      <div>
        <Text fw={600} mb="md">File Upload</Text>
        <ButtonGroup orientation="vertical" spacing="xs">
          <EnhancedButton fullWidth leftIcon={<IconDownload size={16} />}>
            Choose Files
          </EnhancedButton>
          <EnhancedButton 
            fullWidth 
            variant="success" 
            disabled
            rightIcon={<IconArrowRight size={16} />}
          >
            Upload Selected
          </EnhancedButton>
        </ButtonGroup>
      </div>
      
      <Divider />
      
      <div>
        <Text fw={600} mb="md">Social Actions</Text>
        <Group gap="xs">
          <EnhancedButton size="sm" variant="danger" leftIcon={<IconHeart size={14} />}>
            Like
          </EnhancedButton>
          <EnhancedButton size="sm" variant="warning" leftIcon={<IconStar size={14} />}>
            Favorite
          </EnhancedButton>
          <EnhancedButton size="sm" variant="neutral" leftIcon={<IconShare size={14} />}>
            Share
          </EnhancedButton>
        </Group>
      </div>
    </Stack>
  )
};

// Playground
export const Playground = {
  args: {
    children: 'Button Text',
    variant: 'primary',
    appearance: 'filled',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false
  },
  render: (args) => <EnhancedButton {...args} />
};