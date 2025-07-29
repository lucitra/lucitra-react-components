import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Text,
  Button,
  Group,
  Stack,
  TextInput,
  Select,
  NumberInput,
  ColorInput,
  Paper,
  ScrollArea,
  Tabs,
  Badge,
  ActionIcon,
  Tooltip,
  Box,
} from "@mantine/core";
import {
  IconRefresh,
  IconDownload,
  IconPalette,
  IconLetterCase,
  IconRuler,
  IconSquare,
  IconBox,
  IconAdjustments,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

const TOKEN_CATEGORIES = {
  colors: {
    label: "Colors",
    icon: IconPalette,
    tokens: [
      "background-Primary",
      "surface-L0",
      "surface-L1",
      "border-Primary",
      "border-Secondary",
      "content-Primary",
      "content-Secondary",
      "content-Tertiary",
      "background-Brand",
      "background-Info",
      "background-Notice",
      "background-Negative",
      "background-Positive",
    ],
  },
  typography: {
    label: "Typography",
    icon: IconLetterCase,
    tokens: {
      fontSize: ["6xs", "5xs", "4xs", "3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      fontWeight: [
        "regular",
        "semi-bold",
        "bold",
        "black",
        "italic",
      ],
      lineHeight: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      fontFamily: ["sans", "mono"],
    },
  },
  spacing: {
    label: "Spacing",
    icon: IconRuler,
    tokens: ["9xs", "8xs", "7xs", "6xs", "5xs", "4xs", "3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl", "10xl", "11xl", "12xl", "13xl", "14xl", "15xl", "16xl"],
  },
  borderRadius: {
    label: "Border Radius",
    icon: IconSquare,
    tokens: ["xs", "sm", "md", "lg", "pill", "circle"],
  },
  shadows: {
    label: "Shadows",
    icon: IconBox,
    tokens: ["xs", "sm", "md", "lg", "xl"],
  },
  transitions: {
    label: "Transitions",
    icon: IconAdjustments,
    tokens: ["none", "all", "colors", "opacity", "shadow", "transform"],
  },
};

const PREVIEW_COMPONENTS = {
  button: {
    label: "Button",
    component: () => (
      <Stack>
        <Group>
          <Button variant="filled">Primary Button</Button>
          <Button variant="light">Light Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="subtle">Subtle Button</Button>
        </Group>
      </Stack>
    ),
  },
  form: {
    label: "Form Elements",
    component: () => (
      <Stack>
        <TextInput label="Input Label" placeholder="Type something..." />
        <Select
          label="Select Field"
          placeholder="Choose an option"
          data={["Option 1", "Option 2", "Option 3"]}
        />
        <NumberInput label="Number Input" placeholder="0" />
      </Stack>
    ),
  },
  cards: {
    label: "Cards",
    component: () => (
      <Group>
        <Paper p="md" withBorder style={{ flex: 1 }}>
          <Text fw={600} mb="xs">
            Card Title
          </Text>
          <Text size="sm" c="dimmed">
            This is a card with border using surface color and default shadow.
          </Text>
        </Paper>
        <Paper p="md" shadow="sm" style={{ flex: 1 }}>
          <Text fw={600} mb="xs">
            Elevated Card
          </Text>
          <Text size="sm" c="dimmed">
            This card has a shadow for elevation.
          </Text>
        </Paper>
      </Group>
    ),
  },
  typography: {
    label: "Typography",
    component: () => (
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
    ),
  },
};

const DesignTokensEditor = ({ onThemeChange }) => {
  const [tokens, setTokens] = useState({});
  const [activeCategory, setActiveCategory] = useState("colors");
  const [theme, setTheme] = useState("light");
  const [hasChanges, setHasChanges] = useState(false);
  const [previewComponent, setPreviewComponent] = useState("button");
  const [searchQuery, setSearchQuery] = useState("");

  // Load tokens from CSS variables
  useEffect(() => {
    const loadTokens = () => {
      const loadedTokens = {};

      // Load all CSS variables
      const cssRules = Array.from(document.styleSheets)
        .flatMap((sheet) => {
          try {
            return Array.from(sheet.cssRules);
          } catch {
            return [];
          }
        })
        .filter((rule) => rule instanceof CSSStyleRule)
        .filter((rule) => rule.selectorText === ":root");

      cssRules.forEach((rule) => {
        const style = rule.style;
        for (let i = 0; i < style.length; i++) {
          const prop = style[i];
          if (prop.startsWith("--")) {
            const value = style.getPropertyValue(prop).trim();
            loadedTokens[prop] = value;
          }
        }
      });

      setTokens(loadedTokens);
    };

    loadTokens();
  }, []);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  const handleTokenChange = (tokenName, value) => {
    const newTokens = { ...tokens, [tokenName]: value };
    setTokens(newTokens);
    setHasChanges(true);

    // Apply change immediately
    document.documentElement.style.setProperty(tokenName, value);
  };

  const handleReset = () => {
    // Reload original tokens
    window.location.reload();
  };

  const handleSave = () => {
    // Generate CSS output
    const cssOutput = generateCSSOutput(tokens);
    
    // Create a blob and download
    const blob = new Blob([cssOutput], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design-tokens.css";
    a.click();
    URL.revokeObjectURL(url);
    
    setHasChanges(false);
  };

  const generateCSSOutput = (tokens) => {
    let css = ":root {\n";
    Object.entries(tokens).forEach(([key, value]) => {
      css += `  ${key}: ${value};\n`;
    });
    css += "}\n";
    return css;
  };

  const exportTokensJSON = () => {
    const jsonTokens = {};
    Object.entries(tokens).forEach(([key, value]) => {
      const cleanKey = key.replace("--", "").replace(/-/g, ".");
      jsonTokens[cleanKey] = value;
    });
    
    const blob = new Blob([JSON.stringify(jsonTokens, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design-tokens.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderTokenEditor = (category) => {
    switch (category) {
      case "colors":
        return (
          <Stack>
            {TOKEN_CATEGORIES.colors.tokens.map((token) => {
              const tokenName = `--color-${token}`;
              return (
                <Group key={token} position="apart" align="center">
                  <Text size="sm" style={{ minWidth: 150 }}>
                    {token}
                  </Text>
                  <ColorInput
                    value={tokens[tokenName] || ""}
                    onChange={(value) => handleTokenChange(tokenName, value)}
                    format="hex"
                    swatches={[
                      "#ffffff",
                      "#f5f5f5",
                      "#e6e6e6",
                      "#cccccc",
                      "#999999",
                      "#666666",
                      "#333333",
                      "#1a1a1a",
                      "#000000",
                      "#2d9bd3",
                      "#ff8c00",
                      "#ff0000",
                      "#00ff00",
                      "#ffbf00",
                    ]}
                    style={{ flex: 1 }}
                  />
                </Group>
              );
            })}
          </Stack>
        );

      case "typography":
        return (
          <Tabs defaultValue="fontSize">
            <Tabs.List>
              <Tabs.Tab value="fontSize">Font Size</Tabs.Tab>
              <Tabs.Tab value="fontWeight">Font Weight</Tabs.Tab>
              <Tabs.Tab value="lineHeight">Line Height</Tabs.Tab>
              <Tabs.Tab value="fontFamily">Font Family</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="fontSize" pt="md">
              <Stack>
                {TOKEN_CATEGORIES.typography.tokens.fontSize.map((size) => {
                  const tokenName = `--font-size-${size}`;
                  return (
                    <Group key={size} position="apart" align="center">
                      <Text size="sm" style={{ minWidth: 100 }}>
                        {size}
                      </Text>
                      <TextInput
                        value={tokens[tokenName] || ""}
                        onChange={(e) =>
                          handleTokenChange(tokenName, e.target.value)
                        }
                        placeholder="1rem"
                        style={{ flex: 1 }}
                      />
                      <Text
                        size={size === "xs" ? "xs" : size === "sm" ? "sm" : "md"}
                        style={{ minWidth: 100 }}
                      >
                        Preview
                      </Text>
                    </Group>
                  );
                })}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="fontWeight" pt="md">
              <Stack>
                {TOKEN_CATEGORIES.typography.tokens.fontWeight.map((weight) => {
                  const tokenName = `--font-weight-${weight}`;
                  return (
                    <Group key={weight} position="apart" align="center">
                      <Text size="sm" style={{ minWidth: 100 }}>
                        {weight}
                      </Text>
                      <TextInput
                        value={tokens[tokenName] || ""}
                        onChange={(e) =>
                          handleTokenChange(tokenName, e.target.value)
                        }
                        placeholder="400"
                        style={{ flex: 1 }}
                      />
                    </Group>
                  );
                })}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="lineHeight" pt="md">
              <Stack>
                {TOKEN_CATEGORIES.typography.tokens.lineHeight.map((height) => {
                  const tokenName = `--line-height-${height}`;
                  return (
                    <Group key={height} position="apart" align="center">
                      <Text size="sm" style={{ minWidth: 100 }}>
                        {height}
                      </Text>
                      <TextInput
                        value={tokens[tokenName] || ""}
                        onChange={(e) =>
                          handleTokenChange(tokenName, e.target.value)
                        }
                        placeholder="1.5"
                        style={{ flex: 1 }}
                      />
                    </Group>
                  );
                })}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="fontFamily" pt="md">
              <Stack>
                {TOKEN_CATEGORIES.typography.tokens.fontFamily.map((family) => {
                  const tokenName = `--font-family-${family}`;
                  return (
                    <Group key={family} position="apart" align="center">
                      <Text size="sm" style={{ minWidth: 100 }}>
                        {family}
                      </Text>
                      <TextInput
                        value={tokens[tokenName] || ""}
                        onChange={(e) =>
                          handleTokenChange(tokenName, e.target.value)
                        }
                        placeholder="Font family..."
                        style={{ flex: 1 }}
                      />
                    </Group>
                  );
                })}
              </Stack>
            </Tabs.Panel>
          </Tabs>
        );

      case "spacing":
        return (
          <Stack>
            {TOKEN_CATEGORIES.spacing.tokens.map((space) => {
              const tokenName = `--spacing-${space}`;
              const value = tokens[tokenName] || "";
              
              // Compute the actual value from the CSS variable references
              let computedValue = value;
              if (value && value.startsWith("var(")) {
                const refName = value.match(/var\((--[^)]+)\)/)?.[1];
                if (refName && tokens[refName]) {
                  computedValue = tokens[refName];
                }
              }
              
              return (
                <Group key={space} position="apart" align="center">
                  <Text size="sm" style={{ minWidth: 120 }}>
                    spacing-{space}
                  </Text>
                  <TextInput
                    value={computedValue}
                    onChange={(e) => handleTokenChange(tokenName, e.target.value)}
                    placeholder="1rem"
                    style={{ flex: 1 }}
                  />
                  <Box
                    style={{
                      width: computedValue || "16px",
                      height: "20px",
                      backgroundColor: "var(--color-brand-500)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                </Group>
              );
            })}
          </Stack>
        );

      case "borderRadius":
        return (
          <Stack>
            {TOKEN_CATEGORIES.borderRadius.tokens.map((radius) => {
              const tokenName = `--radius-${radius}`;
              return (
                <Group key={radius} position="apart" align="center">
                  <Text size="sm" style={{ minWidth: 100 }}>
                    {radius}
                  </Text>
                  <TextInput
                    value={tokens[tokenName] || ""}
                    onChange={(e) => handleTokenChange(tokenName, e.target.value)}
                    placeholder="0.5rem"
                    style={{ flex: 1 }}
                  />
                  <Box
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "var(--color-primary)",
                      borderRadius: tokens[tokenName] || "0",
                    }}
                  />
                </Group>
              );
            })}
          </Stack>
        );

      case "shadows":
        return (
          <Stack>
            {TOKEN_CATEGORIES.shadows.tokens.map((shadow) => {
              const tokenName = `--shadow-${shadow}`;
              return (
                <Paper
                  key={shadow}
                  p="md"
                  style={{
                    boxShadow: tokens[tokenName] || "none",
                  }}
                >
                  <Group position="apart" align="center">
                    <Text size="sm">{shadow}</Text>
                    <TextInput
                      value={tokens[tokenName] || ""}
                      onChange={(e) =>
                        handleTokenChange(tokenName, e.target.value)
                      }
                      placeholder="0 1px 3px rgba(0,0,0,0.1)"
                      style={{ flex: 1 }}
                      size="xs"
                    />
                  </Group>
                </Paper>
              );
            })}
          </Stack>
        );

      default:
        return null;
    }
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return Object.entries(TOKEN_CATEGORIES);
    
    return Object.entries(TOKEN_CATEGORIES).filter(([_, category]) => {
      return (
        category.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(category.tokens)
          ? category.tokens.some((token) =>
              token.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : Object.values(category.tokens)
              .flat()
              .some((token) =>
                token.toLowerCase().includes(searchQuery.toLowerCase())
              ))
      );
    });
  }, [searchQuery]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Group p="md" position="apart" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <Group>
          <Text fw={600}>Design Tokens Editor</Text>
          <Badge color={hasChanges ? "yellow" : "green"} variant="light">
            {hasChanges ? "Unsaved Changes" : "Saved"}
          </Badge>
        </Group>
        <Group>
          <Tooltip label="Toggle Theme">
            <ActionIcon
              variant="light"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <IconMoon size={18} /> : <IconSun size={18} />}
            </ActionIcon>
          </Tooltip>
          <Button
            leftSection={<IconDownload size={16} />}
            variant="subtle"
            size="sm"
            onClick={handleSave}
          >
            Export CSS
          </Button>
          <Button
            leftSection={<IconDownload size={16} />}
            variant="subtle"
            size="sm"
            onClick={exportTokensJSON}
          >
            Export JSON
          </Button>
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="subtle"
            size="sm"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset
          </Button>
        </Group>
      </Group>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "240px",
            borderRight: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextInput
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            p="md"
            pb={0}
          />
          <ScrollArea style={{ flex: 1 }} p="md">
            <Stack spacing="xs">
              {filteredCategories.map(([key, category]) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={key}
                    leftSection={<Icon size={18} />}
                    variant={activeCategory === key ? "filled" : "subtle"}
                    onClick={() => setActiveCategory(key)}
                    fullWidth
                    styles={{ inner: { justifyContent: "flex-start" } }}
                  >
                    {category.label}
                  </Button>
                );
              })}
            </Stack>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Token Editor */}
          <ScrollArea style={{ flex: 1 }} p="xl">
            {renderTokenEditor(activeCategory)}
          </ScrollArea>

          {/* Preview Section */}
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <Group p="md" position="apart">
              <Text fw={600}>Preview</Text>
              <Select
                value={previewComponent}
                onChange={setPreviewComponent}
                data={Object.entries(PREVIEW_COMPONENTS).map(([key, comp]) => ({
                  value: key,
                  label: comp.label,
                }))}
                size="xs"
                style={{ width: 200 }}
              />
            </Group>
            <Box p="xl" style={{ backgroundColor: "var(--color-background)" }}>
              {PREVIEW_COMPONENTS[previewComponent].component({ theme })}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

DesignTokensEditor.propTypes = {
  onThemeChange: PropTypes.func,
};

export default DesignTokensEditor;