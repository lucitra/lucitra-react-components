import React from "react";
import { ThemeProvider, useTheme } from "../providers/ThemeProvider";
import ThemeToggle from "../components/Theme/ThemeToggle";
import DesignTokensEditor from "../components/Debug/DesignTokensEditor";
import DevTools from "../components/Debug/DevTools";
import {
  Paper,
  Text,
  Title,
  Button,
  Group,
  Stack,
  Badge,
  TextInput,
  Select,
  Card,
  Grid,
  Container,
  Divider,
} from "@mantine/core";

export default {
  title: "Theme System",
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

// Demo component to show theme in action
const ThemeDemo = () => {
  const { theme } = useTheme();

  return (
    <Container size="lg" py="xl">
      <Stack spacing="xl">
        <Group position="apart" align="center">
          <div>
            <Title order={2}>Theme System Demo</Title>
            <Text c="dimmed">Current theme: {theme}</Text>
          </div>
          <ThemeToggle size="lg" />
        </Group>

        <Divider />

        <Title order={3}>Colors</Title>
        <Grid>
          <Grid.Col span={3}>
            <Paper p="md" withBorder>
              <Text size="sm" fw={600} mb="xs">
                Background
              </Text>
              <div
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                }}
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper p="md" withBorder>
              <Text size="sm" fw={600} mb="xs">
                Surface
              </Text>
              <div
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                }}
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper p="md" withBorder>
              <Text size="sm" fw={600} mb="xs">
                Primary
              </Text>
              <div
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "var(--color-primary)",
                  borderRadius: "var(--radius-md)",
                }}
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper p="md" withBorder>
              <Text size="sm" fw={600} mb="xs">
                Border
              </Text>
              <div
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "transparent",
                  border: "2px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                }}
              />
            </Paper>
          </Grid.Col>
        </Grid>

        <Title order={3}>Typography</Title>
        <Paper p="lg" withBorder>
          <Stack>
            <Text size="xl" fw={700}>
              Heading Text (XL Bold)
            </Text>
            <Text size="lg" fw={600}>
              Subheading Text (LG Semibold)
            </Text>
            <Text>Body text with normal weight and size</Text>
            <Text size="sm" c="dimmed">
              Small muted text for descriptions
            </Text>
            <Text size="xs" ff="monospace">
              {`const code = "Monospace font example";`}
            </Text>
          </Stack>
        </Paper>

        <Title order={3}>Components</Title>
        <Paper p="lg" withBorder>
          <Stack>
            <Group>
              <Button>Primary Button</Button>
              <Button variant="light">Light Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="subtle">Subtle Button</Button>
            </Group>

            <Group>
              <Badge>Default</Badge>
              <Badge color="blue">Blue</Badge>
              <Badge color="green">Green</Badge>
              <Badge color="yellow">Yellow</Badge>
              <Badge color="red">Red</Badge>
            </Group>

            <TextInput
              label="Input Field"
              placeholder="Type something..."
              description="This is a helper text"
            />

            <Select
              label="Select Field"
              placeholder="Choose an option"
              data={["Option 1", "Option 2", "Option 3"]}
            />
          </Stack>
        </Paper>

        <Title order={3}>Cards & Elevation</Title>
        <Grid>
          <Grid.Col span={4}>
            <Card shadow="xs" p="lg">
              <Text fw={600} mb="xs">
                Card with XS Shadow
              </Text>
              <Text size="sm" c="dimmed">
                Subtle elevation for grouped content
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card shadow="sm" p="lg">
              <Text fw={600} mb="xs">
                Card with SM Shadow
              </Text>
              <Text size="sm" c="dimmed">
                Default card elevation
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card shadow="md" p="lg">
              <Text fw={600} mb="xs">
                Card with MD Shadow
              </Text>
              <Text size="sm" c="dimmed">
                Elevated for emphasis
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export const Demo = () => <ThemeDemo />;

export const TokensEditor = () => (
  <div style={{ height: "90vh" }}>
    <DesignTokensEditor />
  </div>
);

export const DevToolsWithTheme = () => (
  <DevTools
    packageInfo={{
      name: "@lucitra/react-components",
      version: "1.0.0",
      dependencies: {
        react: "^18.0.0",
        "@mantine/core": "^7.0.0",
      },
    }}
    environment={{
      mode: "development",
      baseUrl: "/",
    }}
    showInProduction={true}
  />
);

export const ThemeToggleVariants = () => (
  <Container size="sm" py="xl">
    <Stack spacing="xl">
      <Title order={3}>Theme Toggle Variants</Title>
      
      <Paper p="md" withBorder>
        <Text fw={600} mb="md">Sizes</Text>
        <Group>
          <ThemeToggle size="xs" />
          <ThemeToggle size="sm" />
          <ThemeToggle size="md" />
          <ThemeToggle size="lg" />
          <ThemeToggle size="xl" />
        </Group>
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={600} mb="md">Variants</Text>
        <Group>
          <ThemeToggle variant="subtle" />
          <ThemeToggle variant="light" />
          <ThemeToggle variant="filled" />
          <ThemeToggle variant="outline" />
          <ThemeToggle variant="default" />
        </Group>
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={600} mb="md">Without Tooltip</Text>
        <ThemeToggle showTooltip={false} />
      </Paper>
    </Stack>
  </Container>
);