import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Text, UnstyledButton, Group, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';

const THEMES = [
  { name: 'Light', value: 'light', icon: IconSun },
  { name: 'Dark', value: 'dark', icon: IconMoon },
  { name: 'System', value: 'auto', icon: IconDeviceDesktop },
];

/**
 * ThemeSwitcher Component (Mantine Version)
 * 
 * A theme switcher dropdown button following the same pattern as LanguageSwitcher.
 * Supports light, dark, and system themes with Mantine's color scheme.
 * 
 * @component
 * @example
 * <ThemeSwitcher 
 *   onThemeChange={(theme) => console.log('Selected:', theme)}
 * />
 */
export function ThemeSwitcherMantine({
  currentTheme = null,
  onThemeChange = () => {},
  showCurrentSelection = true,
  disabled = false,
  displayMode = 'icon', // 'icon' or 'text'
  borderRadius = 0,
  style = {},
  className = '',
}) {
  const theme = useMantineTheme();
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'light');
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
    // Get initial theme from document attribute if not provided
    if (!currentTheme) {
      const docTheme = document.documentElement.getAttribute('data-mantine-color-scheme');
      if (docTheme) {
        setSelectedTheme(docTheme);
      }
    }
  }, [currentTheme]);

  // Sync with external currentTheme changes
  useEffect(() => {
    if (currentTheme && currentTheme !== selectedTheme) {
      setSelectedTheme(currentTheme);
    }
  }, [currentTheme, selectedTheme]);

  const handleChange = (value) => {
    if (value === selectedTheme) return;

    const themeOption = THEMES.find(t => t.value === value);
    if (!themeOption) return;

    setSelectedTheme(value);
    
    // Update document attribute for CSS
    document.documentElement.setAttribute('data-mantine-color-scheme', value);
    
    // Notify parent component
    onThemeChange(themeOption);
  };

  // Get current theme data
  const currentThemeData = THEMES.find(t => t.value === selectedTheme) || THEMES[0];
  const IconComponent = currentThemeData.icon;

  // Determine actual theme when using system/auto
  const getActualTheme = () => {
    if (selectedTheme === 'auto' && isClient) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return selectedTheme;
  };

  return (
    <Menu
      position="bottom-end"
      width={200}
      offset={8}
      withArrow={false}
      transitionProps={{ transition: 'pop', duration: 200 }}
      disabled={disabled}
    >
      <Menu.Target>
        <UnstyledButton
          className={className}
          style={{
            ...(displayMode === 'icon' ? {
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            } : {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
            }),
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            border: '2px solid transparent',
            backgroundColor: 'transparent',
            transition: 'background-color 0.15s ease, outline 0.15s ease, border-color 0.15s ease',
            outline: 'none',
            borderRadius: `${borderRadius}px`,
            ...style,
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = theme.colorScheme === 'dark' 
                ? theme.colors.dark[5] 
                : theme.colors.gray[1];
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.outline = `2px solid ${theme.colors.blue[5]}`;
              e.currentTarget.style.outlineOffset = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.outlineOffset = '0';
          }}
          aria-label="Select theme"
          title="Select theme"
        >
          <IconComponent 
            size={displayMode === 'icon' ? 20 : 16} 
            style={{ 
              color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[9] 
            }} 
          />
          {displayMode === 'text' && (
            <Text size="sm">
              {currentThemeData.name}
            </Text>
          )}
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {THEMES.map((themeOption) => {
          const ThemeIcon = themeOption.icon;
          return (
            <Menu.Item
              key={themeOption.value}
              onClick={() => handleChange(themeOption.value)}
              icon={<ThemeIcon size={16} />}
              rightSection={
                showCurrentSelection && selectedTheme === themeOption.value && (
                  <Text size="xs" color="blue">
                    ✓
                  </Text>
                )
              }
              sx={(theme) => ({
                backgroundColor: selectedTheme === themeOption.value 
                  ? theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1]
                  : undefined,
              })}
            >
              <Group spacing="xs">
                <Text size="sm">{themeOption.name}</Text>
                {themeOption.value === 'auto' && isClient && (
                  <Text size="xs" color="dimmed">
                    (Currently {getActualTheme()})
                  </Text>
                )}
              </Group>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}

ThemeSwitcherMantine.propTypes = {
  /** Currently selected theme */
  currentTheme: PropTypes.oneOf(['light', 'dark', 'auto']),
  /** Callback when theme changes */
  onThemeChange: PropTypes.func,
  /** Show checkmark for current selection */
  showCurrentSelection: PropTypes.bool,
  /** Disable the switcher */
  disabled: PropTypes.bool,
  /** Display mode */
  displayMode: PropTypes.oneOf(['icon', 'text']),
  /** Border radius in pixels */
  borderRadius: PropTypes.number,
  /** Additional styles */
  style: PropTypes.object,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default ThemeSwitcherMantine;