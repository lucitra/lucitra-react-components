import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  tokens: {},
  updateToken: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children, defaultTheme = "light" }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("lucitra-theme");
      return savedTheme || defaultTheme;
    }
    return defaultTheme;
  });

  const [tokens, setTokens] = useState({});

  // Load tokens on mount
  useEffect(() => {
    const loadTokens = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const loadedTokens = {};

      // Get all CSS custom properties
      const props = Array.from(document.documentElement.style);
      // eslint-disable-next-line react/prop-types
      props.forEach((prop) => {
        if (prop.startsWith("--")) {
          loadedTokens[prop] = computedStyle.getPropertyValue(prop);
        }
      });

      setTokens(loadedTokens);
    };

    loadTokens();
  }, []);

  // Apply theme on change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("lucitra-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const updateToken = (tokenName, value) => {
    document.documentElement.style.setProperty(tokenName, value);
    setTokens((prev) => ({
      ...prev,
      [tokenName]: value,
    }));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    tokens,
    updateToken,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(["light", "dark"]),
};

export default ThemeProvider;