import React from 'react';
import { Stack, Group, Text, Card } from '@mantine/core';
import { Badge, StatusBadge, CountBadge, PriorityBadge } from './Badge';

export default {
  title: 'DataDisplay/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Badge components display small status indicators, labels, or counts.

## Features
- Multiple variants (primary, success, warning, error, info, neutral)
- Different sizes (xs, sm, md, lg, xl)
- Specialized components (StatusBadge, CountBadge, PriorityBadge)
- Consistent styling with design system
- Customizable colors and radius
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  }
};

// Basic badges
export const BasicBadges = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Variants</Text>
        <Group gap="sm">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Sizes</Text>
        <Group gap="sm" align="center">
          <Badge size="xs">Extra Small</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
          <Badge size="xl">Extra Large</Badge>
        </Group>
      </div>
    </Stack>
  )
};

// Status badges
export const StatusBadges = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Activity Status</Text>
        <Group gap="sm">
          <StatusBadge status="active" />
          <StatusBadge status="inactive" />
          <StatusBadge status="pending" />
          <StatusBadge status="error" />
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Connection Status</Text>
        <Group gap="sm">
          <StatusBadge status="online" />
          <StatusBadge status="offline" />
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Content Status</Text>
        <Group gap="sm">
          <StatusBadge status="published" />
          <StatusBadge status="draft" />
          <StatusBadge status="archived" />
        </Group>
      </div>
    </Stack>
  )
};

// Count badges
export const CountBadges = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Notification Counts</Text>
        <Group gap="sm">
          <CountBadge count={1} />
          <CountBadge count={5} />
          <CountBadge count={12} />
          <CountBadge count={99} />
          <CountBadge count={100} />
          <CountBadge count={999} />
        </Group>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Custom Max Values</Text>
        <Group gap="sm">
          <CountBadge count={15} max={10} />
          <CountBadge count={250} max={99} />
          <CountBadge count={1500} max={999} />
        </Group>
      </div>
    </Stack>
  )
};

// Priority badges
export const PriorityBadges = {
  render: () => (
    <div>
      <Text size="sm" fw={600} mb="xs">Priority Levels</Text>
      <Group gap="sm">
        <PriorityBadge priority="low" />
        <PriorityBadge priority="medium" />
        <PriorityBadge priority="high" />
        <PriorityBadge priority="critical" />
      </Group>
    </div>
  )
};

// Real-world examples
export const RealWorldExamples = {
  render: () => (
    <Stack gap="lg">
      {/* User profiles */}
      <Card withBorder p="md">
        <Group justify="space-between">
          <div>
            <Text fw={600}>John Doe</Text>
            <Text size="sm" c="dimmed">Software Engineer</Text>
          </div>
          <Group gap="xs">
            <StatusBadge status="online" size="sm" />
            <Badge variant="info" size="sm">Pro</Badge>
          </Group>
        </Group>
      </Card>

      {/* Tasks */}
      <Card withBorder p="md">
        <Group justify="space-between">
          <div>
            <Text fw={600}>Fix authentication bug</Text>
            <Text size="sm" c="dimmed">Due: Tomorrow</Text>
          </div>
          <Group gap="xs">
            <PriorityBadge priority="high" size="sm" />
            <StatusBadge status="pending" size="sm" />
          </Group>
        </Group>
      </Card>

      {/* Articles */}
      <Card withBorder p="md">
        <Group justify="space-between">
          <div>
            <Text fw={600}>Getting Started with React</Text>
            <Text size="sm" c="dimmed">Updated: 2 days ago</Text>
          </div>
          <Group gap="xs">
            <StatusBadge status="published" size="sm" />
            <Badge variant="info" size="sm">Featured</Badge>
            <CountBadge count={42} size="sm" />
          </Group>
        </Group>
      </Card>

      {/* Notifications */}
      <Card withBorder p="md">
        <Group justify="space-between">
          <div>
            <Text fw={600}>Notifications</Text>
            <Text size="sm" c="dimmed">Messages and alerts</Text>
          </div>
          <Group gap="xs">
            <Text size="sm" c="dimmed">Unread:</Text>
            <CountBadge count={3} />
          </Group>
        </Group>
      </Card>
    </Stack>
  )
};

// Playground
export const Playground = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Badge Text'
  },
  render: (args) => <Badge {...args} />
};