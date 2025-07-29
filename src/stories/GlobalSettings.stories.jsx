import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Paper, Text, Group, Badge, Title } from '@mantine/core';
import { ThemeSwitcher } from '../components/Navigation/ThemeSwitcher';
import LanguageSwitcher from '../components/Navigation/LanguageSwitcher';
import RegionSwitcher from '../components/Navigation/RegionSwitcher';
import { STORYBOOK_LANGUAGES, STORYBOOK_REGIONS } from '../utils/storybookConfigs';

// Import RegionContext from Storybook
import { RegionContext } from '../../.storybook/contexts';

export default {
  title: 'Examples/Global Settings Demo',
  parameters: {
    docs: {
      description: {
        component: 'Demo showing how Storybook global settings affect components',
      },
    },
  },
};

const SettingsDisplay = () => {
  const { t, i18n } = useTranslation();
  const region = useContext(RegionContext);
  
  // Get the current color scheme from the data attribute
  const colorScheme = document.documentElement.getAttribute('data-mantine-color-scheme') || 'light';

  return (
    <Stack spacing="xl">
      <Paper shadow="sm" p="xl" radius="md">
        <Title order={2} mb="lg">{t('welcome')}</Title>
        
        <Stack spacing="md">
          <Group>
            <Text weight={500}>{t('theme')}:</Text>
            <Badge size="lg" variant="filled">
              {colorScheme}
            </Badge>
          </Group>
          
          <Group>
            <Text weight={500}>{t('language')}:</Text>
            <Badge size="lg" variant="filled" color="blue">
              {i18n.language}
            </Badge>
          </Group>
          
          <Group>
            <Text weight={500}>{t('region')}:</Text>
            <Badge size="lg" variant="filled" color="green">
              {region}
            </Badge>
          </Group>
        </Stack>
      </Paper>

      <Paper shadow="sm" p="xl" radius="md">
        <Title order={3} mb="md">Component Switchers</Title>
        <Text size="sm" color="dimmed" mb="lg">
          These components are connected to Storybook&apos;s toolbar settings
        </Text>
        
        <Group spacing="md">
          <div>
            <Text size="xs" weight={500} mb={4}>Theme Switcher</Text>
            <ThemeSwitcher displayMode="icon" borderRadius={8} />
          </div>
          
          <div>
            <Text size="xs" weight={500} mb={4}>Language Switcher</Text>
            <LanguageSwitcher 
              displayMode="icon" 
              borderRadius={8}
              useI18next={true}
              i18nInstance={i18n}
              languages={STORYBOOK_LANGUAGES}
            />
          </div>
          
          <div>
            <Text size="xs" weight={500} mb={4}>Region Switcher</Text>
            <RegionSwitcher 
              displayMode="icon" 
              borderRadius={8}
              regions={STORYBOOK_REGIONS}
            />
          </div>
        </Group>
      </Paper>

      <Paper shadow="sm" p="xl" radius="md">
        <Title order={3} mb="md">Instructions</Title>
        <Stack spacing="sm">
          <Text size="sm">
            1. Use the toolbar at the top of Storybook to change theme, language, or region
          </Text>
          <Text size="sm">
            2. Watch how the components update in real-time
          </Text>
          <Text size="sm">
            3. Try switching to Arabic to see RTL layout support
          </Text>
          <Text size="sm">
            4. Try dark mode to see the theme changes
          </Text>
          <Text size="sm">
            5. The component switchers below also work and sync with the toolbar
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
};

export const Default = () => <SettingsDisplay />;

export const WithTextVariants = () => {
  const { t } = useTranslation();
  
  return (
    <Stack spacing="xl">
      <SettingsDisplay />
      
      <Paper shadow="sm" p="xl" radius="md">
        <Title order={3} mb="md">Translated Content</Title>
        <Stack spacing="sm">
          <Text>{t('hello')}</Text>
          <Text size="lg" weight={500}>{t('welcome')}</Text>
          <Group>
            <Badge>{t('theme')}</Badge>
            <Badge color="blue">{t('language')}</Badge>
            <Badge color="green">{t('region')}</Badge>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
};