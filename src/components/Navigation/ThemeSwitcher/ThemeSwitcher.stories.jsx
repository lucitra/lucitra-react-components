import React from 'react';
import { ThemeSwitcherMantine } from './ThemeSwitcherMantine';
import { Stack, Paper, Text, Group, MantineProvider } from '@mantine/core';

export default {
  title: 'Navigation/ThemeSwitcher',
  component: ThemeSwitcherMantine,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

const Template = (args) => <ThemeSwitcherMantine {...args} />;

export const Default = Template.bind({});
Default.args = {
  onThemeChange: (theme) => console.log('Theme changed:', theme),
};

export const IconMode = Template.bind({});
IconMode.args = {
  displayMode: 'icon',
  onThemeChange: (theme) => console.log('Theme changed:', theme),
};

export const TextMode = Template.bind({});
TextMode.args = {
  displayMode: 'text',
  onThemeChange: (theme) => console.log('Theme changed:', theme),
};

export const WithRoundedBorders = Template.bind({});
WithRoundedBorders.args = {
  borderRadius: 8,
  onThemeChange: (theme) => console.log('Theme changed:', theme),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  onThemeChange: (theme) => console.log('Theme changed:', theme),
};

export const AllVariants = () => (
  <Stack spacing="xl">
    <Paper shadow="sm" p="xl">
      <Text size="lg" weight={600} mb="lg">Theme Switcher Variants</Text>
      
      <Stack spacing="xl">
        <div>
          <Text size="sm" weight={500} mb="sm">Icon Mode (Default)</Text>
          <Group spacing="md">
            <ThemeSwitcherMantine 
              displayMode="icon"
              onThemeChange={(theme) => console.log('Icon mode:', theme)}
            />
            <ThemeSwitcherMantine 
              displayMode="icon"
              borderRadius={8}
              onThemeChange={(theme) => console.log('Icon mode rounded:', theme)}
            />
            <ThemeSwitcherMantine 
              displayMode="icon"
              disabled
              onThemeChange={(theme) => console.log('Icon mode disabled:', theme)}
            />
          </Group>
        </div>

        <div>
          <Text size="sm" weight={500} mb="sm">Text Mode</Text>
          <Group spacing="md">
            <ThemeSwitcherMantine 
              displayMode="text"
              onThemeChange={(theme) => console.log('Text mode:', theme)}
            />
            <ThemeSwitcherMantine 
              displayMode="text"
              borderRadius={8}
              onThemeChange={(theme) => console.log('Text mode rounded:', theme)}
            />
            <ThemeSwitcherMantine 
              displayMode="text"
              disabled
              onThemeChange={(theme) => console.log('Text mode disabled:', theme)}
            />
          </Group>
        </div>

        <div>
          <Text size="sm" weight={500} mb="sm">Current Theme Display</Text>
          <Group spacing="md">
            <ThemeSwitcherMantine 
              displayMode="icon"
              currentTheme="light"
              showCurrentSelection={true}
              onThemeChange={(theme) => console.log('Light theme:', theme)}
            />
            <ThemeSwitcherMantine 
              displayMode="icon"
              currentTheme="dark"
              showCurrentSelection={true}
              onThemeChange={(theme) => console.log('Dark theme:', theme)}
            />
            <ThemeSwitcherMantine 
              displayMode="icon"
              currentTheme="auto"
              showCurrentSelection={true}
              onThemeChange={(theme) => console.log('Auto theme:', theme)}
            />
          </Group>
        </div>
      </Stack>
    </Paper>

    <Paper shadow="sm" p="xl">
      <Text size="lg" weight={600} mb="lg">Integration with Navigation</Text>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 16,
        padding: '12px 24px',
        backgroundColor: 'var(--mantine-color-gray-0)',
        borderRadius: 8
      }}>
        <Text weight={500}>Settings:</Text>
        <ThemeSwitcherMantine 
          displayMode="icon"
          borderRadius={4}
          onThemeChange={(theme) => console.log('Navigation theme:', theme)}
        />
        <Text size="sm" color="dimmed">Click to change theme</Text>
      </div>
    </Paper>

    <Paper shadow="sm" p="xl">
      <Text size="lg" weight={600} mb="lg">Usage Example</Text>
      
      <pre style={{ 
        backgroundColor: 'var(--mantine-color-gray-0)', 
        padding: 16, 
        borderRadius: 8,
        overflow: 'auto'
      }}>
{`import { ThemeSwitcher } from '@lucitra/react-components';

// Basic usage
<ThemeSwitcher 
  onThemeChange={(theme) => {
    console.log('Selected theme:', theme);
    // Handle theme change
  }}
/>

// With text display
<ThemeSwitcher 
  displayMode="text"
  borderRadius={8}
  onThemeChange={handleThemeChange}
/>

// Controlled component
<ThemeSwitcher 
  currentTheme="dark"
  showCurrentSelection
  onThemeChange={handleThemeChange}
/>`}
      </pre>
    </Paper>
  </Stack>
);

export const WithLanguageSwitcher = () => {
  // Import would normally come from the library
  const LanguageSwitcher = require('../LanguageSwitcher').LanguageSwitcherMantine;
  
  return (
    <Paper shadow="sm" p="xl">
      <Text size="lg" weight={600} mb="lg">Theme & Language Switchers Together</Text>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8,
        padding: '8px 16px',
        backgroundColor: 'var(--mantine-color-gray-0)',
        borderRadius: 8
      }}>
        <Text size="sm" weight={500} style={{ marginRight: 16 }}>Preferences:</Text>
        <ThemeSwitcherMantine 
          displayMode="icon"
          borderRadius={4}
          onThemeChange={(theme) => console.log('Theme:', theme)}
        />
        <LanguageSwitcher 
          displayMode="icon"
          borderRadius={4}
          onLanguageChange={(lang) => console.log('Language:', lang)}
        />
      </div>
      
      <Text size="sm" color="dimmed" mt="md">
        Both switchers follow the same design pattern for consistency
      </Text>
    </Paper>
  );
};