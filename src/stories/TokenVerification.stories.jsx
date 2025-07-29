import React from 'react';
import { Stack, Group, Paper, Text, Title } from '@mantine/core';
import { NavButton } from '../components/Navigation/NavButton';
import { Badge } from '../components/DataDisplay/Badge';
import { Alert } from '../components/Feedback/Alert';
import { IconHome, IconSettings, IconUser } from '@tabler/icons-react';

export default {
  title: 'Debug/Token Verification',
};

export const SpacingVerification = () => {
  const spacingSizes = [
    { name: '9xs', value: 'var(--spacing-9xs)' },
    { name: '8xs', value: 'var(--spacing-8xs)' },
    { name: '7xs', value: 'var(--spacing-7xs)' },
    { name: '6xs', value: 'var(--spacing-6xs)' },
    { name: '5xs', value: 'var(--spacing-5xs)' },
    { name: '4xs', value: 'var(--spacing-4xs)' },
    { name: '3xs', value: 'var(--spacing-3xs)' },
    { name: '2xs', value: 'var(--spacing-2xs)' },
    { name: 'xs', value: 'var(--spacing-xs)' },
    { name: 'sm', value: 'var(--spacing-sm)' },
    { name: 'md', value: 'var(--spacing-md)' },
    { name: 'lg', value: 'var(--spacing-lg)' },
    { name: 'xl', value: 'var(--spacing-xl)' },
    { name: '2xl', value: 'var(--spacing-2xl)' },
    { name: '3xl', value: 'var(--spacing-3xl)' },
  ];

  return (
    <Stack spacing="xl" p="xl">
      <Title>Spacing Token Verification</Title>
      
      <Paper p="md" withBorder>
        <Title order={3} mb="md">Spacing Scale</Title>
        <Stack spacing="md">
          {spacingSizes.map((size) => (
            <Group key={size.name} align="center">
              <Text size="sm" style={{ width: 60 }}>{size.name}:</Text>
              <div
                style={{
                  height: '20px',
                  backgroundColor: 'var(--color-blue-500)',
                  width: size.value,
                  borderRadius: 'var(--radius-xs)',
                }}
              />
              <Text size="xs" c="dimmed">
                {getComputedStyle(document.documentElement).getPropertyValue(`--spacing-${size.name}`)}
              </Text>
            </Group>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export const UpdatedComponents = () => {
  return (
    <Stack spacing="xl" p="xl">
      <Title>Updated Components with Design Tokens</Title>
      
      <Paper p="md" withBorder>
        <Title order={3} mb="md">NavButton Component</Title>
        <Group>
          <NavButton ariaLabel="Home">
            <IconHome size={20} />
          </NavButton>
          <NavButton ariaLabel="Settings">
            <IconSettings size={20} />
          </NavButton>
          <NavButton ariaLabel="User" disabled>
            <IconUser size={20} />
          </NavButton>
        </Group>
        <Text size="sm" c="dimmed" mt="sm">
          Uses: --spacing-2xl (width), --spacing-xl (height), --color-background-Hover, --color-border-Focus
        </Text>
      </Paper>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">Badge Component</Title>
        <Stack spacing="md">
          <Group>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </Group>
          <Group>
            <Badge variant="primary" style="filled">Filled Primary</Badge>
            <Badge variant="success" style="filled">Filled Success</Badge>
            <Badge variant="error" style="filled">Filled Error</Badge>
          </Group>
          <Group>
            <Badge variant="primary" style="subtle">Subtle Primary</Badge>
            <Badge variant="warning" style="subtle">Subtle Warning</Badge>
            <Badge variant="info" style="subtle">Subtle Info</Badge>
          </Group>
        </Stack>
        <Text size="sm" c="dimmed" mt="sm">
          Uses: Design token colors, spacing tokens for padding, border tokens
        </Text>
      </Paper>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">Alert Component</Title>
        <Stack spacing="md">
          <Alert variant="info" title="Information">
            This is an informational alert using design tokens.
          </Alert>
          <Alert variant="success" title="Success" withCloseButton onClose={() => {}}>
            Operation completed successfully!
          </Alert>
          <Alert variant="warning" solid>
            This is a solid warning alert.
          </Alert>
          <Alert variant="error" compact>
            Compact error alert with less padding.
          </Alert>
        </Stack>
        <Text size="sm" c="dimmed" mt="sm">
          Uses: Semantic colors, spacing tokens, radius tokens, typography tokens
        </Text>
      </Paper>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">Before vs After Comparison</Title>
        <Group align="flex-start" grow>
          <Stack>
            <Text fw={600}>Before (Hardcoded)</Text>
            <div
              style={{
                padding: '8px 16px',
                backgroundColor: '#0056b3',
                color: 'white',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Hardcoded Button
            </div>
          </Stack>
          <Stack>
            <Text fw={600}>After (Design Tokens)</Text>
            <div
              style={{
                padding: 'var(--spacing-xs) var(--spacing-md)',
                backgroundColor: 'var(--color-blue-500)',
                color: 'var(--color-primary-White)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-3xs)',
                fontWeight: 'var(--font-weight-semi-bold)',
              }}
            >
              Token-based Button
            </div>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
};

export const ResponsiveSpacing = () => {
  return (
    <Stack spacing="xl">
      <Title>Responsive Spacing Patterns</Title>
      
      <Paper 
        style={{
          padding: 'var(--spacing-md)',
          '@media (min-width: 640px)': {
            padding: 'var(--spacing-lg)',
          },
          '@media (min-width: 1024px)': {
            padding: 'var(--spacing-xl)',
          },
        }}
        withBorder
      >
        <Text>
          This container uses responsive spacing tokens. Resize your browser to see the padding change.
        </Text>
        <Text size="sm" c="dimmed" mt="sm">
          Mobile: --spacing-md | Tablet: --spacing-lg | Desktop: --spacing-xl
        </Text>
      </Paper>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">Typography Scale</Title>
        <Stack spacing="xs">
          <Text className="text-xl-bold">Extra Large Bold Text</Text>
          <Text className="text-lg-semibold">Large Semibold Text</Text>
          <Text className="text-md-regular">Medium Regular Text</Text>
          <Text className="text-sm-regular">Small Regular Text</Text>
          <Text className="text-xs-regular">Extra Small Regular Text</Text>
          <Text className="text-2xs-regular">2X Small Regular Text</Text>
        </Stack>
      </Paper>
    </Stack>
  );
};