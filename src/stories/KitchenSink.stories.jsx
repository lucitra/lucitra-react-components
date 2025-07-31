import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Stack, 
  Group, 
  Title, 
  Text, 
  Divider, 
  Container, 
  Button, 
  TextInput,
  Checkbox,
  Radio,
  Select,
  Badge as MantineBadge,
  Paper,
  Grid,
  Flex,
  Alert as MantineAlert
} from '@mantine/core';

// Import components using proper exports
import { Button as CustomButton, Input as CustomInput, Select as CustomSelect } from '../components/Forms';
import { Badge, StatusBadge, CountBadge, PriorityBadge, Card, Table } from '../components/DataDisplay';

export default {
  title: 'Kitchen Sink/All Components',
  component: 'div',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive showcase of all components in the Lucitra React Components library, organized by category with various configurations.',
      },
    },
  },
};

const SectionHeader = ({ title, description }) => (
  <Stack gap="xs" mb="xl">
    <Title order={2} size="h3" c="blue.6">
      {title}
    </Title>
    {description && (
      <Text size="sm" c="dimmed">
        {description}
      </Text>
    )}
    <Divider />
  </Stack>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

const SubSectionHeader = ({ title }) => (
  <Title order={3} size="h4" mb="md" c="gray.7">
    {title}
  </Title>
);

SubSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export const AllComponents = () => {
  const [formState, setFormState] = useState({
    checkboxValue: false,
    radioValue: 'option1',
    selectValue: '',
    inputValue: '',
  });

  const handleFormChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container size="xl" p="xl">
      <Stack gap="3xl">
        {/* Header */}
        <Stack gap="md" align="center">
          <Title order={1} ta="center">
            🍽️ Kitchen Sink - All Components
          </Title>
          <Text size="lg" ta="center" c="dimmed" maw={600}>
            A comprehensive showcase of all components in the Lucitra React Components library,
            demonstrating various configurations, states, and use cases.
          </Text>
        </Stack>

        {/* Mantine Base Components */}
        <div>
          <SectionHeader 
            title="🏗️ Mantine Foundation" 
            description="Core Mantine UI components that form the foundation"
          />
          
          <Stack gap="xl">
            <div>
              <SubSectionHeader title="Buttons" />
              <Group gap="md">
                <Button variant="filled" size="xs">XS Button</Button>
                <Button variant="filled" size="sm">Small Button</Button>
                <Button variant="filled" size="md">Medium Button</Button>
                <Button variant="filled" size="lg">Large Button</Button>
                <Button variant="filled" size="xl">XL Button</Button>
              </Group>
              <Group gap="md" mt="md">
                <Button variant="filled">Filled</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="light">Light</Button>
                <Button variant="subtle">Subtle</Button>
                <Button variant="default">Default</Button>
              </Group>
              <Group gap="md" mt="md">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button leftSection="🚀">With Icon</Button>
              </Group>
            </div>
          </Stack>
        </div>

        {/* Custom Components */}
        <div>
          <SectionHeader 
            title="🎨 Custom Components" 
            description="Custom components built for the Lucitra library"
          />
          
          <Stack gap="xl">
            <div>
              <SubSectionHeader title="Custom Buttons" />
              <Group gap="md">
                <CustomButton variant="filled" size="xs">Custom XS</CustomButton>
                <CustomButton variant="filled" size="sm">Custom Small</CustomButton>
                <CustomButton variant="filled" size="md">Custom Medium</CustomButton>
                <CustomButton variant="filled" size="lg">Custom Large</CustomButton>
                <CustomButton variant="filled" size="xl">Custom XL</CustomButton>
              </Group>
              <Group gap="md" mt="md">
                <CustomButton variant="filled">Custom Filled</CustomButton>
                <CustomButton variant="outline">Custom Outline</CustomButton>
                <CustomButton variant="light">Custom Light</CustomButton>
                <CustomButton variant="subtle">Custom Subtle</CustomButton>
              </Group>
            </div>
          </Stack>
        </div>

        {/* Forms */}
        <div>
          <SectionHeader 
            title="📝 Forms" 
            description="Interactive form components with validation and various states"
          />
          
          <Stack gap="xl">
            <div>
              <SubSectionHeader title="Mantine Form Controls" />
              <Stack gap="md" maw={400}>
                <TextInput
                  label="Mantine Text Input"
                  placeholder="Enter some text..."
                  value={formState.inputValue}
                  onChange={(e) => handleFormChange('inputValue', e.target.value)}
                />
                
                <Select
                  label="Mantine Select Dropdown"
                  placeholder="Choose an option"
                  value={formState.selectValue}
                  onChange={(value) => handleFormChange('selectValue', value)}
                  data={[
                    { value: 'react', label: 'React' },
                    { value: 'vue', label: 'Vue' },
                    { value: 'angular', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                  ]}
                />

                <Checkbox
                  label="Mantine Checkbox Option"
                  checked={formState.checkboxValue}
                  onChange={(event) => handleFormChange('checkboxValue', event.currentTarget.checked)}
                />

                <Radio.Group
                  label="Mantine Radio Group"
                  value={formState.radioValue}
                  onChange={(value) => handleFormChange('radioValue', value)}
                >
                  <Group>
                    <Radio value="option1" label="Option 1" />
                    <Radio value="option2" label="Option 2" />
                    <Radio value="option3" label="Option 3" />
                  </Group>
                </Radio.Group>
              </Stack>
            </div>

            <div>
              <SubSectionHeader title="Custom Form Controls" />
              <Stack gap="md" maw={400}>
                <CustomInput
                  label="Custom Text Input"
                  placeholder="Custom input component..."
                />
                
                <CustomSelect
                  label="Custom Select"
                  placeholder="Custom select component..."
                  data={[
                    { value: 'custom1', label: 'Custom Option 1' },
                    { value: 'custom2', label: 'Custom Option 2' },
                  ]}
                />
              </Stack>
            </div>
          </Stack>
        </div>

        {/* Layout */}
        <div>
          <SectionHeader 
            title="📐 Layout" 
            description="Layout components for structuring and organizing content"
          />
          
          <Stack gap="xl">
            <div>
              <SubSectionHeader title="Flex & Grid Systems" />
              <Flex direction="row" gap="md" wrap="wrap">
                <Paper p="md" bg="blue.1">
                  Flex Item 1
                </Paper>
                <Paper p="md" bg="green.1">
                  Flex Item 2
                </Paper>
                <Paper p="md" bg="orange.1">
                  Flex Item 3
                </Paper>
              </Flex>
              
              <Grid mt="md">
                <Grid.Col span={4}>
                  <Paper p="md" bg="purple.1">
                    Grid Col 1
                  </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Paper p="md" bg="cyan.1">
                    Grid Col 2
                  </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Paper p="md" bg="pink.1">
                    Grid Col 3
                  </Paper>
                </Grid.Col>
              </Grid>
            </div>
          </Stack>
        </div>

        {/* Typography */}
        <div>
          <SectionHeader 
            title="📚 Typography" 
            description="Text components for headings, body text, quotes, and code"
          />
          
          <Stack gap="xl">
            <div>
              <SubSectionHeader title="Headings" />
              <Stack gap="sm">
                <Title order={1}>Heading Level 1</Title>
                <Title order={2}>Heading Level 2</Title>
                <Title order={3}>Heading Level 3</Title>
                <Title order={4}>Heading Level 4</Title>
                <Title order={5}>Heading Level 5</Title>
                <Title order={6}>Heading Level 6</Title>
              </Stack>
            </div>

            <div>
              <SubSectionHeader title="Text Variants" />
              <Stack gap="sm">
                <Text size="xs">Extra small text</Text>
                <Text size="sm">Small text</Text>
                <Text size="md">Medium text (default)</Text>
                <Text size="lg">Large text</Text>
                <Text size="xl">Extra large text</Text>
                <Text fw="bold">Bold text</Text>
                <Text fs="italic">Italic text</Text>
                <Text c="dimmed">Dimmed text</Text>
              </Stack>
            </div>

            <div>
              <SubSectionHeader title="Quote & Code" />
              <Stack gap="md">
                <blockquote style={{ margin: 0, padding: '1rem', borderLeft: '4px solid var(--mantine-color-blue-5)', backgroundColor: 'var(--mantine-color-gray-0)' }}>
                  <Text>&ldquo;This is an inspirational quote that demonstrates the Quote component.&rdquo;</Text>
                  <Text size="sm" c="dimmed" mt="xs">— Kitchen Sink Author</Text>
                </blockquote>
                <Paper p="md" bg="gray.1">
                  <Text component="pre" ff="monospace" size="sm">
                    {`const example = "Hello, World!";\nconsole.log(example);`}
                  </Text>
                </Paper>
              </Stack>
            </div>
          </Stack>
        </div>

        {/* Data Display */}
        <div>
          <SectionHeader 
            title="📊 Data Display" 
            description="Components for displaying data, status, and information"
          />
          
          <Stack gap="xl">
            <div>
              <SubSectionHeader title="Custom Badges (Fixed Spacing)" />
              <Group gap="md">
                <Badge size="xs" style="filled" variant="primary">XS Badge</Badge>
                <Badge size="sm" style="filled" variant="success">Small Badge</Badge>
                <Badge size="md" style="filled" variant="warning">Medium Badge</Badge>
                <Badge size="lg" style="filled" variant="error">Large Badge</Badge>
                <Badge size="xl" style="filled" variant="info">XL Badge</Badge>
              </Group>
              <Group gap="md" mt="md">
                <Badge style="filled" variant="primary">Filled</Badge>
                <Badge style="outline" variant="success">Outline</Badge>
                <Badge style="subtle" variant="warning">Subtle</Badge>
              </Group>
              <Group gap="md" mt="md">
                <StatusBadge status="active" />
                <StatusBadge status="pending" />
                <StatusBadge status="error" />
                <CountBadge count={5} />
                <CountBadge count={150} max={99} />
                <PriorityBadge priority="high" />
              </Group>
            </div>

            <div>
              <SubSectionHeader title="Mantine Badges (Comparison)" />
              <Group gap="md">
                <MantineBadge size="xs" variant="filled" color="blue">XS Badge</MantineBadge>
                <MantineBadge size="sm" variant="filled" color="green">Small Badge</MantineBadge>
                <MantineBadge size="md" variant="filled" color="orange">Medium Badge</MantineBadge>
                <MantineBadge size="lg" variant="filled" color="red">Large Badge</MantineBadge>
                <MantineBadge size="xl" variant="filled" color="purple">XL Badge</MantineBadge>
              </Group>
            </div>

            <div>
              <SubSectionHeader title="Cards" />
              <Group gap="md" align="start">
                <Paper shadow="sm" p="md" radius="md" withBorder miw={200}>
                  <Title order={4} mb="xs">Mantine Paper Card</Title>
                  <Text size="sm" c="dimmed" mb="md">Built with Mantine Paper</Text>
                  <Text>Standard Mantine card styling</Text>
                </Paper>
                <div style={{ minWidth: 200 }}>
                  <Card 
                    title="Custom Card" 
                    description="Built with custom Card component"
                    shadow="lg"
                  >
                    <Text>Custom card implementation with standardized styling</Text>
                  </Card>
                </div>
              </Group>
            </div>

            <div>
              <SubSectionHeader title="Data Tables" />
              <Table
                data={[
                  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
                  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
                  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
                ]}
                columns={[
                  { key: 'name', label: 'Name', sortable: true },
                  { key: 'email', label: 'Email' },
                  { key: 'status', label: 'Status' },
                ]}
              />
            </div>
          </Stack>
        </div>

        {/* Feedback */}
        <div>
          <SectionHeader 
            title="💬 Feedback" 
            description="Components for user feedback, alerts, and notifications"
          />
          
          <Stack gap="xl">
            <div>
              <SubSectionHeader title="Alerts" />
              <Stack gap="md">
                <MantineAlert variant="light" color="blue" title="Information">
                  This is an informational alert message.
                </MantineAlert>
                <MantineAlert variant="light" color="green" title="Success">
                  Operation completed successfully!
                </MantineAlert>
                <MantineAlert variant="light" color="yellow" title="Warning">
                  Please review your input before proceeding.
                </MantineAlert>
                <MantineAlert variant="light" color="red" title="Error">
                  An error occurred while processing your request.
                </MantineAlert>
              </Stack>
            </div>
          </Stack>
        </div>

        {/* Design Tokens Showcase */}
        <div>
          <SectionHeader 
            title="🎨 Design Tokens" 
            description="Standardized spacing and design tokens (now fixed!)"
          />
          
          <Stack gap="xl">
            <div>
              <SubSectionHeader title="Spacing Scale (4px Grid)" />
              <Stack gap="md">
                <Group gap="md" align="center">
                  <Text w={60} size="sm">2xs (2px):</Text>
                  <div style={{ width: '2px', height: '20px', backgroundColor: 'var(--mantine-color-blue-5)' }} />
                </Group>
                <Group gap="md" align="center">
                  <Text w={60} size="sm">xs (4px):</Text>
                  <div style={{ width: '4px', height: '20px', backgroundColor: 'var(--mantine-color-blue-5)' }} />
                </Group>
                <Group gap="md" align="center">
                  <Text w={60} size="sm">sm (8px):</Text>
                  <div style={{ width: '8px', height: '20px', backgroundColor: 'var(--mantine-color-blue-5)' }} />
                </Group>
                <Group gap="md" align="center">
                  <Text w={60} size="sm">md (12px):</Text>
                  <div style={{ width: '12px', height: '20px', backgroundColor: 'var(--mantine-color-blue-5)' }} />
                </Group>
                <Group gap="md" align="center">
                  <Text w={60} size="sm">lg (16px):</Text>
                  <div style={{ width: '16px', height: '20px', backgroundColor: 'var(--mantine-color-blue-5)' }} />
                </Group>
                <Group gap="md" align="center">
                  <Text w={60} size="sm">xl (20px):</Text>
                  <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--mantine-color-blue-5)' }} />
                </Group>
              </Stack>
            </div>
          </Stack>
        </div>

        {/* Footer */}
        <div>
          <Divider />
          <Stack gap="md" align="center" pt="xl">
            <Title order={3} c="gray.6">
              🎉 All Components Showcased!
            </Title>
            <Text size="sm" c="dimmed" ta="center" maw={600}>
              This kitchen sink demonstrates the core components in the Lucitra React Components library.
              Each component is shown with multiple variants and configurations, with our standardized 4px grid spacing system.
            </Text>
            <Group gap="md">
              <Button variant="gradient" onClick={() => window.open('/?path=/docs', '_blank')}>
                View Documentation
              </Button>
              <Button variant="outline" onClick={() => window.open('https://github.com/lucitra/react-components', '_blank')}>
                GitHub Repository
              </Button>
            </Group>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export const ComponentsByCategory = () => {
  const categories = [
    {
      name: 'Foundation',
      count: 3,
      components: ['Mantine Core', 'Custom Button', 'Design Tokens'],
      color: 'blue',
      status: '✅ Complete'
    },
    {
      name: 'Forms',
      count: 6,
      components: ['Button', 'TextInput', 'Select', 'Checkbox', 'Radio', 'Enhanced Controls'],
      color: 'green',
      status: '✅ Complete'
    },
    {
      name: 'Navigation',
      count: 6,
      components: ['NavButton', 'RegionSwitcher', 'LanguageSwitcher', 'Breadcrumb', 'Pagination', 'ThemeSwitcher'],
      color: 'orange',
      status: '🚧 Partial'
    },
    {
      name: 'Layout',
      count: 8,
      components: ['Container', 'Grid', 'Flex', 'Paper', 'Stack', 'Group', 'Divider', 'Responsive'],
      color: 'purple',
      status: '✅ Complete'
    },
    {
      name: 'Typography',
      count: 4,
      components: ['Title', 'Text', 'Code', 'Blockquote'],
      color: 'cyan',
      status: '✅ Complete'
    },
    {
      name: 'Data Display',
      count: 3,
      components: ['Badge (Fixed)', 'Paper/Card', 'Table'],
      color: 'pink',
      status: '✅ Complete'
    },
    {
      name: 'Feedback',
      count: 3,
      components: ['Alert', 'Toast', 'Notifications'],
      color: 'red',
      status: '✅ Complete'
    },
    {
      name: 'Resume System',
      count: 20,
      components: ['ResumeBuilder', 'AI Optimizer', 'Version Control', 'Cover Letter', '+ 16 more'],
      color: 'yellow',
      status: '🚧 Complex'
    }
  ];

  return (
    <Container size="lg" p="xl">
      <Stack gap="xl">
        <Stack gap="md" align="center">
          <Title order={1} ta="center">
            📚 Component Library Overview
          </Title>
          <Text size="lg" ta="center" c="dimmed" maw={600}>
            Overview of all component categories and their organization in the Lucitra React Components library.
          </Text>
        </Stack>

        <Grid>
          {categories.map((category) => (
            <Grid.Col span={{ base: 12, sm: 6 }} key={category.name}>
              <Paper p="lg" radius="md" withBorder h="100%">
                <Stack gap="md">
                  <Group justify="space-between">
                    <Title order={3} c={`${category.color}.6`}>
                      {category.name}
                    </Title>
                    <MantineBadge variant="light" color={category.color}>
                      {category.count} components
                    </MantineBadge>
                  </Group>
                  
                  <Text size="sm" c="dimmed">
                    {category.components.join(', ')}
                  </Text>
                  
                  <Group justify="space-between" align="center">
                    <Text size="xs" c={category.status.includes('✅') ? 'green' : 'orange'}>
                      {category.status}
                    </Text>
                    <Button 
                      variant="light" 
                      color={category.color}
                      size="sm"
                      onClick={() => window.open(`/?path=/story/kitchen-sink-all-components--all-components`, '_blank')}
                    >
                      View Examples
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>

        <Stack gap="md" align="center" pt="xl">
          <Title order={2} c="gray.6">
            Total: 50+ Components
          </Title>
          <Text size="sm" c="dimmed" ta="center">
            Comprehensive component library with standardized 4px grid spacing system,
            Mantine UI foundation, custom components, and advanced resume building capabilities.
          </Text>
          <Group gap="md">
            <MantineBadge size="lg" variant="gradient">Fixed Spacing Issues ✅</MantineBadge>
            <MantineBadge size="lg" variant="light" color="blue">Modern Design System</MantineBadge>
          </Group>
        </Stack>
      </Stack>
    </Container>
  );
};