import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Paper,
  Badge,
  Button,
  Grid,
  Box,
  Tabs,
  ColorSwatch,
  Code,
  Table,
  TextInput,
  Select,
  Card,
  ActionIcon,
  CopyButton,
} from '@mantine/core';
import {
  IconPalette,
  IconTypography,
  IconRuler,
  IconSquare,
  IconSun,
  IconMoon,
  IconCopy,
  IconCheck,
} from '@tabler/icons-react';
import { ThemeProvider, useTheme } from '../providers/ThemeProvider';

export default {
  title: 'Design System/Design Tokens',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div data-theme="light">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// Token categories for navigation
const TOKEN_CATEGORIES = {
  colors: { label: 'Colors', icon: IconPalette },
  typography: { label: 'Typography', icon: IconTypography },
  spacing: { label: 'Spacing', icon: IconRuler },
  radius: { label: 'Border Radius', icon: IconSquare },
};

// Helper to get CSS variable value
const getCSSVariable = (name) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

// Color Token Display Component
const ColorToken = ({ name, token }) => {
  const value = getCSSVariable(token);
  
  return (
    <Paper p="md" withBorder>
      <Group position="apart" align="flex-start">
        <Stack spacing="xs" style={{ flex: 1 }}>
          <Text size="sm" weight={600}>{name}</Text>
          <Code size="xs">{token}</Code>
          <Text size="xs" c="dimmed">{value}</Text>
        </Stack>
        <ColorSwatch color={value} size={40} />
      </Group>
      <CopyButton value={token} timeout={2000}>
        {({ copied, copy }) => (
          <Button
            size="xs"
            variant="subtle"
            fullWidth
            mt="sm"
            onClick={copy}
            leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          >
            {copied ? 'Copied!' : 'Copy token'}
          </Button>
        )}
      </CopyButton>
    </Paper>
  );
};

// Typography Token Display Component
const TypographyToken = ({ scale, variant }) => {
  const tokenBase = `--typography-${scale}-${variant}`;
  const fontSize = getCSSVariable(`${tokenBase}-font-size`);
  const lineHeight = getCSSVariable(`${tokenBase}-line-height`);
  const letterSpacing = getCSSVariable(`${tokenBase}-letter-spacing`);
  const fontWeight = getCSSVariable(`${tokenBase}-font-weight`);
  
  return (
    <Paper p="lg" withBorder>
      <Stack spacing="md">
        <div>
          <Badge size="sm" variant="light">{scale}-{variant}</Badge>
          <Text
            className={`text-${scale}-${variant}`}
            mt="sm"
          >
            The quick brown fox jumps over the lazy dog
          </Text>
        </div>
        
        <Table fontSize="xs">
          <tbody>
            <tr>
              <td>Font Size</td>
              <td><Code size="xs">{fontSize}</Code></td>
            </tr>
            <tr>
              <td>Line Height</td>
              <td><Code size="xs">{lineHeight}</Code></td>
            </tr>
            <tr>
              <td>Letter Spacing</td>
              <td><Code size="xs">{letterSpacing}</Code></td>
            </tr>
            <tr>
              <td>Font Weight</td>
              <td><Code size="xs">{fontWeight}</Code></td>
            </tr>
          </tbody>
        </Table>
        
        <CopyButton value={`text-${scale}-${variant}`} timeout={2000}>
          {({ copied, copy }) => (
            <Button
              size="xs"
              variant="subtle"
              fullWidth
              onClick={copy}
              leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            >
              {copied ? 'Copied!' : 'Copy class name'}
            </Button>
          )}
        </CopyButton>
      </Stack>
    </Paper>
  );
};

// Spacing Token Display Component
const SpacingToken = ({ size }) => {
  const token = `--spacing-${size}`;
  const value = getCSSVariable(token);
  
  return (
    <Paper p="md" withBorder>
      <Stack spacing="xs">
        <Group position="apart">
          <Text size="sm" weight={600}>{size}</Text>
          <Code size="xs">{value}</Code>
        </Group>
        
        <Box
          style={{
            height: 20,
            backgroundColor: 'var(--color-brand-500)',
            width: value,
            borderRadius: 'var(--radius-sm)',
          }}
        />
        
        <Group spacing="xs">
          <CopyButton value={token} timeout={2000}>
            {({ copied, copy }) => (
              <Button
                size="xs"
                variant="subtle"
                onClick={copy}
                leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              >
                {copied ? 'Copied!' : 'CSS Var'}
              </Button>
            )}
          </CopyButton>
          
          <CopyButton value={`spacing-${size}`} timeout={2000}>
            {({ copied, copy }) => (
              <Button
                size="xs"
                variant="subtle"
                onClick={copy}
                leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              >
                {copied ? 'Copied!' : 'Class'}
              </Button>
            )}
          </CopyButton>
        </Group>
      </Stack>
    </Paper>
  );
};

// Border Radius Token Display Component
const RadiusToken = ({ size }) => {
  const token = `--radius-${size}`;
  const value = getCSSVariable(token);
  
  return (
    <Paper p="md" withBorder>
      <Stack spacing="xs">
        <Group position="apart">
          <Text size="sm" weight={600}>{size}</Text>
          <Code size="xs">{value}</Code>
        </Group>
        
        <Box
          style={{
            height: 60,
            backgroundColor: 'var(--color-surface-L1)',
            border: '2px solid var(--color-border-Primary)',
            borderRadius: value,
          }}
        />
        
        <CopyButton value={token} timeout={2000}>
          {({ copied, copy }) => (
            <Button
              size="xs"
              variant="subtle"
              fullWidth
              onClick={copy}
              leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            >
              {copied ? 'Copied!' : 'Copy token'}
            </Button>
          )}
        </CopyButton>
      </Stack>
    </Paper>
  );
};

// Main Design Tokens Showcase
const DesignTokensShowcase = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('colors');

  // Define token groups
  const semanticColors = [
    { name: 'Background Primary', token: '--color-background-Primary' },
    { name: 'Background Brand', token: '--color-background-Brand' },
    { name: 'Content Primary', token: '--color-content-Primary' },
    { name: 'Content Secondary', token: '--color-content-Secondary' },
    { name: 'Border Primary', token: '--color-border-Primary' },
    { name: 'Border Secondary', token: '--color-border-Secondary' },
  ];

  const surfaceColors = [
    { name: 'Surface L0', token: '--color-surface-L0' },
    { name: 'Surface L1', token: '--color-surface-L1' },
    { name: 'Surface L2', token: '--color-surface-L2' },
    { name: 'Surface L3', token: '--color-surface-L3' },
  ];

  const statusColors = [
    { name: 'Info', token: '--color-background-Info' },
    { name: 'Notice', token: '--color-background-Notice' },
    { name: 'Negative', token: '--color-background-Negative' },
    { name: 'Positive', token: '--color-background-Positive' },
  ];

  const typographyScales = ['xl', 'lg', 'md', 'sm', 'xs', '2xs', '3xs'];
  const typographyVariants = ['bold', 'semibold', 'regular'];

  const spacingSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
  const radiusSizes = ['xs', 'sm', 'md', 'lg', 'pill', 'circle'];

  return (
    <Container size="xl" py="xl">
      <Stack spacing="xl">
        {/* Header */}
        <Group position="apart" align="flex-start">
          <div>
            <Title order={1}>Design Tokens</Title>
            <Text c="dimmed" mt="xs">
              Comprehensive design token system with platform-specific scales
            </Text>
          </div>
          <Group>
            <Badge size="lg" variant="light">
              Theme: {theme}
            </Badge>
            <ActionIcon
              variant="light"
              size="lg"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
          </Group>
        </Group>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            {Object.entries(TOKEN_CATEGORIES).map(([key, { label, icon: Icon }]) => (
              <Tabs.Tab key={key} value={key} leftSection={<Icon size={16} />}>
                {label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {/* Colors Panel */}
          <Tabs.Panel value="colors" pt="xl">
            <Stack spacing="xl">
              <div>
                <Title order={3} mb="md">Semantic Colors</Title>
                <Grid>
                  {semanticColors.map((color) => (
                    <Grid.Col key={color.token} span={{ base: 12, sm: 6, md: 4 }}>
                      <ColorToken {...color} />
                    </Grid.Col>
                  ))}
                </Grid>
              </div>

              <div>
                <Title order={3} mb="md">Surface Layers</Title>
                <Grid>
                  {surfaceColors.map((color) => (
                    <Grid.Col key={color.token} span={{ base: 12, sm: 6, md: 3 }}>
                      <ColorToken {...color} />
                    </Grid.Col>
                  ))}
                </Grid>
              </div>

              <div>
                <Title order={3} mb="md">Status Colors</Title>
                <Grid>
                  {statusColors.map((color) => (
                    <Grid.Col key={color.token} span={{ base: 12, sm: 6, md: 3 }}>
                      <ColorToken {...color} />
                    </Grid.Col>
                  ))}
                </Grid>
              </div>
            </Stack>
          </Tabs.Panel>

          {/* Typography Panel */}
          <Tabs.Panel value="typography" pt="xl">
            <Stack spacing="xl">
              <Text c="dimmed">
                Typography scales with platform-specific values. These automatically adjust on mobile devices.
              </Text>
              
              {typographyScales.map((scale) => (
                <div key={scale}>
                  <Title order={4} mb="md">
                    {scale.toUpperCase()} Scale
                  </Title>
                  <Grid>
                    {typographyVariants.map((variant) => (
                      <Grid.Col key={`${scale}-${variant}`} span={{ base: 12, md: 4 }}>
                        <TypographyToken scale={scale} variant={variant} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              ))}
            </Stack>
          </Tabs.Panel>

          {/* Spacing Panel */}
          <Tabs.Panel value="spacing" pt="xl">
            <Stack spacing="xl">
              <Text c="dimmed">
                Comprehensive spacing scale for consistent layouts. Values reference spacing units.
              </Text>
              
              <Grid>
                {spacingSizes.map((size) => (
                  <Grid.Col key={size} span={{ base: 12, sm: 6, md: 4 }}>
                    <SpacingToken size={size} />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Tabs.Panel>

          {/* Border Radius Panel */}
          <Tabs.Panel value="radius" pt="xl">
            <Stack spacing="xl">
              <Text c="dimmed">
                Border radius tokens for consistent rounded corners.
              </Text>
              
              <Grid>
                {radiusSizes.map((size) => (
                  <Grid.Col key={size} span={{ base: 12, sm: 6, md: 4 }}>
                    <RadiusToken size={size} />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        {/* Usage Examples */}
        <Paper p="xl" withBorder mt="xl">
          <Title order={3} mb="lg">Usage Examples</Title>
          
          <Stack spacing="xl">
            <div>
              <Title order={5} mb="sm">Using CSS Variables</Title>
              <Code block>
{`/* In your CSS */
.my-component {
  background: var(--color-surface-L1);
  color: var(--color-content-Primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}`}
              </Code>
            </div>

            <div>
              <Title order={5} mb="sm">Using Utility Classes</Title>
              <Code block>
{`<!-- Typography utilities -->
<h1 className="text-xl-bold">Heading</h1>
<p className="text-md-regular">Body text</p>

<!-- Spacing utilities -->
<div className="p-md mx-lg">Padded content</div>`}
              </Code>
            </div>

            <div>
              <Title order={5} mb="sm">Theme Support</Title>
              <Code block>
{`<!-- Automatic theme switching -->
<div data-theme="dark">
  <!-- All tokens automatically use dark theme values -->
</div>`}
              </Code>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export const TokensShowcase = () => <DesignTokensShowcase />;

// Live Component Examples using tokens
const ComponentExamples = () => {
  return (
    <Container size="xl" py="xl">
      <Stack spacing="xl">
        <Title order={2}>Components Using Design Tokens</Title>
        
        {/* Card Example */}
        <div>
          <Title order={4} mb="md">Card Component</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card
                style={{
                  backgroundColor: 'var(--color-surface-L1)',
                  border: '1px solid var(--color-border-Tertiary)',
                  borderRadius: 'var(--radius-md)',
                }}
                p="var(--spacing-lg)"
              >
                <Text className="text-lg-semibold" mb="var(--spacing-sm)">
                  Card Title
                </Text>
                <Text className="text-md-regular" style={{ color: 'var(--color-content-Secondary)' }}>
                  This card uses design tokens for all styling including colors, spacing, typography, and border radius.
                </Text>
                <Button
                  mt="var(--spacing-md)"
                  style={{
                    backgroundColor: 'var(--color-background-Brand)',
                    color: 'var(--color-content-Primary-Inverse)',
                  }}
                >
                  Action Button
                </Button>
              </Card>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Code block>
{`<Card
  style={{
    backgroundColor: 'var(--color-surface-L1)',
    border: '1px solid var(--color-border-Tertiary)',
    borderRadius: 'var(--radius-md)',
  }}
  p="var(--spacing-lg)"
>
  <Text className="text-lg-semibold">
    Card Title
  </Text>
  <Text className="text-md-regular">
    Card content...
  </Text>
</Card>`}
              </Code>
            </Grid.Col>
          </Grid>
        </div>

        {/* Form Example */}
        <div>
          <Title order={4} mb="md">Form Elements</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack spacing="var(--spacing-md)">
                <TextInput
                  label="Name"
                  placeholder="Enter your name"
                  styles={{
                    label: {
                      fontSize: 'var(--typography-sm-semibold-font-size)',
                      fontWeight: 'var(--typography-sm-semibold-font-weight)',
                      color: 'var(--color-content-Primary)',
                      marginBottom: 'var(--spacing-xs)',
                    },
                    input: {
                      backgroundColor: 'var(--color-surface-L0)',
                      border: '1px solid var(--color-border-Secondary)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--typography-md-regular-font-size)',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      '&:focus': {
                        borderColor: 'var(--color-border-Focus)',
                      },
                    },
                  }}
                />
                
                <Select
                  label="Role"
                  placeholder="Select your role"
                  data={['Developer', 'Designer', 'Manager']}
                  styles={{
                    label: {
                      fontSize: 'var(--typography-sm-semibold-font-size)',
                      fontWeight: 'var(--typography-sm-semibold-font-weight)',
                      color: 'var(--color-content-Primary)',
                      marginBottom: 'var(--spacing-xs)',
                    },
                    input: {
                      backgroundColor: 'var(--color-surface-L0)',
                      border: '1px solid var(--color-border-Secondary)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--typography-md-regular-font-size)',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                    },
                  }}
                />
              </Stack>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Code block>
{`<TextInput
  styles={{
    label: {
      fontSize: 'var(--typography-sm-semibold-font-size)',
      fontWeight: 'var(--typography-sm-semibold-font-weight)',
      color: 'var(--color-content-Primary)',
    },
    input: {
      backgroundColor: 'var(--color-surface-L0)',
      border: '1px solid var(--color-border-Secondary)',
      borderRadius: 'var(--radius-sm)',
    },
  }}
/>`}
              </Code>
            </Grid.Col>
          </Grid>
        </div>

        {/* Status Messages */}
        <div>
          <Title order={4} mb="md">Status Messages</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack spacing="var(--spacing-md)">
                <Paper
                  p="var(--spacing-md)"
                  style={{
                    backgroundColor: 'var(--color-background-Info-Subtle)',
                    border: '1px solid var(--color-border-Info)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <Text className="text-sm-semibold" style={{ color: 'var(--color-content-Primary)' }}>
                    Information
                  </Text>
                  <Text className="text-sm-regular" style={{ color: 'var(--color-content-Secondary)' }}>
                    This is an informational message using design tokens.
                  </Text>
                </Paper>

                <Paper
                  p="var(--spacing-md)"
                  style={{
                    backgroundColor: 'var(--color-background-Positive-Subtle)',
                    border: '1px solid var(--color-border-Positive)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <Text className="text-sm-semibold" style={{ color: 'var(--color-content-Primary)' }}>
                    Success
                  </Text>
                  <Text className="text-sm-regular" style={{ color: 'var(--color-content-Secondary)' }}>
                    Operation completed successfully!
                  </Text>
                </Paper>

                <Paper
                  p="var(--spacing-md)"
                  style={{
                    backgroundColor: 'var(--color-background-Negative-Subtle)',
                    border: '1px solid var(--color-border-Negative)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <Text className="text-sm-semibold" style={{ color: 'var(--color-content-Primary)' }}>
                    Error
                  </Text>
                  <Text className="text-sm-regular" style={{ color: 'var(--color-content-Secondary)' }}>
                    Something went wrong. Please try again.
                  </Text>
                </Paper>
              </Stack>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Code block>
{`<Paper
  p="var(--spacing-md)"
  style={{
    backgroundColor: 'var(--color-background-Info-Subtle)',
    border: '1px solid var(--color-border-Info)',
    borderRadius: 'var(--radius-md)',
  }}
>
  <Text className="text-sm-semibold">
    Information
  </Text>
  <Text className="text-sm-regular">
    Message content...
  </Text>
</Paper>`}
              </Code>
            </Grid.Col>
          </Grid>
        </div>
      </Stack>
    </Container>
  );
};

export const ComponentsWithTokens = () => <ComponentExamples />;

// Interactive Token Playground
const TokenPlayground = () => {
  const [selectedColor, setSelectedColor] = useState('--color-background-Brand');
  const [selectedTypography, setSelectedTypography] = useState('text-lg-semibold');
  const [selectedSpacing, setSelectedSpacing] = useState('--spacing-md');
  const [selectedRadius, setSelectedRadius] = useState('--radius-md');
  
  return (
    <Container size="xl" py="xl">
      <Stack spacing="xl">
        <Title order={2}>Token Playground</Title>
        <Text c="dimmed">
          Experiment with different token combinations to see how they work together.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack spacing="md">
              <Select
                label="Background Color"
                value={selectedColor}
                onChange={setSelectedColor}
                data={[
                  '--color-background-Primary',
                  '--color-background-Brand',
                  '--color-surface-L0',
                  '--color-surface-L1',
                  '--color-surface-L2',
                ]}
              />
              
              <Select
                label="Typography Class"
                value={selectedTypography}
                onChange={setSelectedTypography}
                data={[
                  'text-xl-bold',
                  'text-lg-semibold',
                  'text-md-regular',
                  'text-sm-regular',
                  'text-xs-regular',
                ]}
              />
              
              <Select
                label="Padding"
                value={selectedSpacing}
                onChange={setSelectedSpacing}
                data={[
                  '--spacing-xs',
                  '--spacing-sm',
                  '--spacing-md',
                  '--spacing-lg',
                  '--spacing-xl',
                  '--spacing-2xl',
                ]}
              />
              
              <Select
                label="Border Radius"
                value={selectedRadius}
                onChange={setSelectedRadius}
                data={[
                  '--radius-xs',
                  '--radius-sm',
                  '--radius-md',
                  '--radius-lg',
                  '--radius-pill',
                ]}
              />
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper
              p={getCSSVariable(selectedSpacing)}
              style={{
                backgroundColor: `var(${selectedColor})`,
                border: '1px solid var(--color-border-Primary)',
                borderRadius: `var(${selectedRadius})`,
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text className={selectedTypography}>
                Preview Text
              </Text>
            </Paper>
            
            <Code block mt="md">
{`<Paper
  p="${getCSSVariable(selectedSpacing)}"
  style={{
    backgroundColor: 'var(${selectedColor})',
    borderRadius: 'var(${selectedRadius})',
  }}
>
  <Text className="${selectedTypography}">
    Preview Text
  </Text>
</Paper>`}
            </Code>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export const Playground = () => <TokenPlayground />;

// PropTypes definitions
ColorToken.propTypes = {
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

TypographyToken.propTypes = {
  scale: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

SpacingToken.propTypes = {
  size: PropTypes.string.isRequired,
};

RadiusToken.propTypes = {
  size: PropTypes.string.isRequired,
};