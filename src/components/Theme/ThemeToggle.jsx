import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useTheme } from "../../providers/ThemeProvider";

/**
 * ThemeToggle Component
 * 
 * A simple toggle button for switching between light and dark themes.
 * Uses the ThemeProvider context to manage theme state.
 * 
 * @component
 * @example
 * // Basic usage
 * <ThemeToggle />
 * 
 * @example
 * // With custom size
 * <ThemeToggle size="lg" />
 * 
 * @example
 * // With custom variant
 * <ThemeToggle variant="filled" />
 */
const ThemeToggle = ({ 
  size = "md", 
  variant = "subtle",
  showTooltip = true,
  ...props 
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const button = (
    <ActionIcon
      variant={variant}
      size={size}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      {...props}
    >
      {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );

  if (!showTooltip) {
    return button;
  }

  return (
    <Tooltip label={`Switch to ${isDark ? "light" : "dark"} theme`}>
      {button}
    </Tooltip>
  );
};

ThemeToggle.propTypes = {
  /** Size of the button */
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  /** Button variant */
  variant: PropTypes.oneOf(["subtle", "light", "filled", "outline", "default"]),
  /** Whether to show tooltip */
  showTooltip: PropTypes.bool,
};

export default ThemeToggle;