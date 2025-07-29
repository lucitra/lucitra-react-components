import { useMemo } from "react";
import { useTheme } from "../providers/ThemeProvider";

/**
 * Custom hook to access and manipulate design tokens
 * 
 * @returns {Object} Theme utilities and token access methods
 */
export const useThemeTokens = () => {
  const { theme, tokens, updateToken } = useTheme();

  const tokenHelpers = useMemo(() => ({
    // Get a specific token value
    getToken: (tokenName) => {
      const fullName = tokenName.startsWith("--") ? tokenName : `--${tokenName}`;
      return tokens[fullName] || getComputedStyle(document.documentElement).getPropertyValue(fullName);
    },

    // Get all tokens by category
    getTokensByCategory: (category) => {
      const prefix = `--${category}-`;
      return Object.entries(tokens)
        .filter(([key]) => key.startsWith(prefix))
        .reduce((acc, [key, value]) => {
          const name = key.replace(prefix, "");
          acc[name] = value;
          return acc;
        }, {});
    },

    // Get color token
    getColor: (colorName) => {
      const token = `--color-${colorName}`;
      return tokens[token] || getComputedStyle(document.documentElement).getPropertyValue(token);
    },

    // Get spacing token
    getSpace: (spaceName) => {
      const token = `--space-${spaceName}`;
      return tokens[token] || getComputedStyle(document.documentElement).getPropertyValue(token);
    },

    // Get font size token
    getFontSize: (sizeName) => {
      const token = `--font-size-${sizeName}`;
      return tokens[token] || getComputedStyle(document.documentElement).getPropertyValue(token);
    },

    // Get radius token
    getRadius: (radiusName) => {
      const token = `--radius-${radiusName}`;
      return tokens[token] || getComputedStyle(document.documentElement).getPropertyValue(token);
    },

    // Get shadow token
    getShadow: (shadowName) => {
      const token = `--shadow-${shadowName}`;
      return tokens[token] || getComputedStyle(document.documentElement).getPropertyValue(token);
    },

    // Update multiple tokens at once
    updateTokens: (tokenUpdates) => {
      Object.entries(tokenUpdates).forEach(([key, value]) => {
        const fullName = key.startsWith("--") ? key : `--${key}`;
        updateToken(fullName, value);
      });
    },

    // Check if dark theme
    isDark: theme === "dark",

    // Check if light theme
    isLight: theme === "light",
  }), [theme, tokens, updateToken]);

  return {
    theme,
    tokens,
    updateToken,
    ...tokenHelpers,
  };
};

export default useThemeTokens;