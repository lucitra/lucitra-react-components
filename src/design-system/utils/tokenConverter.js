/**
 * Token Converter Utility
 * Converts design tokens from JSON format to CSS custom properties
 */

/**
 * Convert a nested object of tokens to flat CSS custom properties
 * @param {Object} tokens - The tokens object to convert
 * @param {string} prefix - The prefix for the CSS variable (e.g., 'color', 'font')
 * @returns {Object} Flat object of CSS custom properties
 */
export function flattenTokens(tokens, prefix = '') {
  const result = {};

  Object.entries(tokens).forEach(([key, value]) => {
    const currentPrefix = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object' && value !== null && !value.$value) {
      // Recursively flatten nested objects
      Object.assign(result, flattenTokens(value, currentPrefix));
    } else {
      // Handle token references and values
      const cssVarName = `--${currentPrefix}`;
      
      if (typeof value === 'object' && value.$value) {
        // Handle token object format { $value: "..." }
        result[cssVarName] = resolveTokenValue(value.$value);
      } else {
        // Direct value
        result[cssVarName] = resolveTokenValue(value);
      }
    }
  });

  return result;
}

/**
 * Resolve token references (e.g., {color.primary} -> var(--color-primary))
 * @param {string} value - The token value that might contain references
 * @returns {string} Resolved value with CSS variable references
 */
export function resolveTokenValue(value) {
  if (typeof value !== 'string') return value;

  // Replace token references {category.token} with CSS variables
  return value.replace(/\{([^}]+)\}/g, (_match, tokenPath) => {
    // Handle font. prefixed tokens specially
    const parts = tokenPath.split('.');
    if (parts[0] === 'font' && parts.length > 2) {
      // font.font-size.sm -> font-size-sm
      // font.weight.bold -> font-weight-bold
      parts.shift(); // Remove 'font'
    } else if (parts[0] === 'unit') {
      // unit.16 -> spacing-unit-16
      parts[0] = 'spacing-unit';
    } else if (['primary', 'orange', 'brown', 'amber', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta', 'pink', 'red', 'neutral', 'brand'].includes(parts[0])) {
      // Color references need 'color' prefix
      parts.unshift('color');
    }
    const cssVarName = parts.join('-');
    return `var(--${cssVarName})`;
  });
}

/**
 * Convert typography tokens to CSS custom properties
 * Handles platform-specific scales (desktop, mobile, ios, android)
 * @param {Object} typographyTokens - Typography tokens object
 * @returns {Object} CSS custom properties for typography
 */
export function convertTypographyTokens(typographyTokens) {
  const result = {};
  
  // Process font families
  if (typographyTokens.fontFamily) {
    Object.entries(typographyTokens.fontFamily).forEach(([key, value]) => {
      result[`--font-family-${key}`] = value;
    });
  }

  // Process font weights
  if (typographyTokens.fontWeight) {
    Object.entries(typographyTokens.fontWeight).forEach(([key, value]) => {
      result[`--font-weight-${key}`] = value;
    });
  }

  // Process typography scales (desktop, mobile, ios, android)
  ['desktop', 'mobile', 'ios', 'android'].forEach(platform => {
    if (typographyTokens[platform]) {
      Object.entries(typographyTokens[platform]).forEach(([scale, props]) => {
        // Create platform-specific tokens
        if (props.fontSize) result[`--typography-${platform}-${scale}-font-size`] = props.fontSize;
        if (props.lineHeight) result[`--typography-${platform}-${scale}-line-height`] = props.lineHeight;
        if (props.letterSpacing) result[`--typography-${platform}-${scale}-letter-spacing`] = props.letterSpacing;
        if (props.fontWeight) result[`--typography-${platform}-${scale}-font-weight`] = props.fontWeight;
        
        // Create default tokens (using desktop as default)
        if (platform === 'desktop') {
          if (props.fontSize) result[`--typography-${scale}-font-size`] = props.fontSize;
          if (props.lineHeight) result[`--typography-${scale}-line-height`] = props.lineHeight;
          if (props.letterSpacing) result[`--typography-${scale}-letter-spacing`] = props.letterSpacing;
          if (props.fontWeight) result[`--typography-${scale}-font-weight`] = props.fontWeight;
        }
      });
    }
  });

  return result;
}

/**
 * Convert color tokens including theme variations
 * @param {Object} colorTokens - Color tokens object
 * @returns {Object} CSS custom properties for colors
 */
export function convertColorTokens(colorTokens) {
  const result = {};

  // Process color palettes
  Object.entries(colorTokens).forEach(([colorName, shades]) => {
    if (typeof shades === 'object' && !['light', 'dark', 'black'].includes(colorName)) {
      // Process color shades (e.g., orange.50, orange.100, etc.)
      Object.entries(shades).forEach(([shade, value]) => {
        result[`--color-${colorName}-${shade}`] = value;
      });
    }
  });

  // Process theme-specific colors
  ['light', 'dark', 'black'].forEach(theme => {
    if (colorTokens[theme]) {
      Object.entries(colorTokens[theme]).forEach(([category, values]) => {
        if (typeof values === 'object') {
          Object.entries(values).forEach(([key, value]) => {
            // Create theme-specific tokens
            result[`--color-${theme}-${category}-${key}`] = resolveTokenValue(value);
            
            // For light theme, also create default tokens
            if (theme === 'light') {
              result[`--color-${category}-${key}`] = resolveTokenValue(value);
            }
          });
        }
      });
    }
  });

  return result;
}

/**
 * Convert spacing tokens with unit references
 * @param {Object} spacingTokens - Spacing tokens object
 * @returns {Object} CSS custom properties for spacing
 */
export function convertSpacingTokens(spacingTokens) {
  const result = {};

  Object.entries(spacingTokens).forEach(([key, value]) => {
    if (key === 'unit' && typeof value === 'object') {
      // Process unit definitions
      Object.entries(value).forEach(([unitKey, unitValue]) => {
        result[`--spacing-unit-${unitKey}`] = unitValue;
      });
    } else {
      // Process spacing values
      result[`--spacing-${key}`] = resolveTokenValue(value);
    }
  });

  return result;
}

/**
 * Convert iLoveMerge JSON structure to CSS custom properties
 * @param {Object} tokens - The complete tokens object
 * @returns {string} CSS content with custom properties
 */
export function generateCSSFromTokens(tokens) {
  let css = '/* Generated Design Tokens */\n\n';

  // Root tokens (light theme as default)
  css += ':root {\n';

  // Font tokens
  if (tokens.font) {
    css += '  /* Typography - Font Families */\n';
    if (tokens.font.family) {
      Object.entries(tokens.font.family).forEach(([key, value]) => {
        const fontValue = value.value || value;
        css += `  --font-family-${key}: ${fontValue};\n`;
      });
    }
    css += '\n';

    css += '  /* Typography - Font Weights */\n';
    if (tokens.font.weight) {
      Object.entries(tokens.font.weight).forEach(([key, value]) => {
        const weightValue = value.value || value;
        // Map weight names to numeric values
        const weightMap = {
          'regular': '400',
          'medium': '500',
          'semi-bold': '600',
          'bold': '700',
          'black': '900'
        };
        const numericWeight = weightMap[key] || weightValue;
        css += `  --font-weight-${key}: ${numericWeight};\n`;
      });
    }
    css += '\n';

    css += '  /* Typography - Font Sizes */\n';
    if (tokens.font['font-size']) {
      Object.entries(tokens.font['font-size']).forEach(([key, value]) => {
        const sizeValue = value.value || value;
        const resolvedValue = resolveTokenValue(sizeValue);
        // Check if the resolved value already contains 'px' from the token reference
        const needsPx = !resolvedValue.includes('px') && !resolvedValue.includes('var(');
        css += `  --font-size-${key}: ${resolvedValue}${needsPx ? 'px' : ''};\n`;
      });
    }
    css += '\n';

    css += '  /* Typography - Line Heights */\n';
    if (tokens.font['line-height']) {
      Object.entries(tokens.font['line-height']).forEach(([key, value]) => {
        const heightValue = value.value || value;
        css += `  --line-height-${key}: ${resolveTokenValue(heightValue)};\n`;
      });
    }
    css += '\n';

    css += '  /* Typography - Letter Spacing */\n';
    if (tokens.font['letter-spacing']) {
      Object.entries(tokens.font['letter-spacing']).forEach(([key, value]) => {
        const spacingValue = value.value || value;
        css += `  --letter-spacing-${key}: ${resolveTokenValue(spacingValue)};\n`;
      });
    }
    css += '\n';
  }

  // Typography scales (desktop, mobile, ios, android)
  ['desktop', 'mobile', 'ios', 'android'].forEach(platform => {
    if (tokens[platform]?.text) {
      css += `  /* Typography - ${platform.charAt(0).toUpperCase() + platform.slice(1)} Scales */\n`;
      
      // Process text scales
      Object.entries(tokens[platform].text).forEach(([size, variants]) => {
        Object.entries(variants).forEach(([variant, props]) => {
          const scaleKey = `${size}-${variant}`;
          
          if (props.size?.value) {
            css += `  --typography-${platform}-${scaleKey}-font-size: ${resolveTokenValue(props.size.value)};\n`;
          }
          if (props['line-height']?.value) {
            css += `  --typography-${platform}-${scaleKey}-line-height: ${resolveTokenValue(props['line-height'].value)};\n`;
          }
          if (props['letter-spacing']?.value) {
            css += `  --typography-${platform}-${scaleKey}-letter-spacing: ${resolveTokenValue(props['letter-spacing'].value)};\n`;
          }
          if (props.weight?.value) {
            const weightValue = resolveTokenValue(props.weight.value);
            // Fix weight references to use font-weight prefix
            const fixedWeight = weightValue.replace('var(--weight-', 'var(--font-weight-');
            css += `  --typography-${platform}-${scaleKey}-font-weight: ${fixedWeight};\n`;
          }
          
          // Create default tokens (using desktop as default)
          if (platform === 'desktop') {
            if (props.size?.value) {
              css += `  --typography-${scaleKey}-font-size: ${resolveTokenValue(props.size.value)};\n`;
            }
            if (props['line-height']?.value) {
              css += `  --typography-${scaleKey}-line-height: ${resolveTokenValue(props['line-height'].value)};\n`;
            }
            if (props['letter-spacing']?.value) {
              css += `  --typography-${scaleKey}-letter-spacing: ${resolveTokenValue(props['letter-spacing'].value)};\n`;
            }
            if (props.weight?.value) {
              const weightValue = resolveTokenValue(props.weight.value);
              // Fix weight references to use font-weight prefix
              const fixedWeight = weightValue.replace('var(--weight-', 'var(--font-weight-');
              css += `  --typography-${scaleKey}-font-weight: ${fixedWeight};\n`;
            }
          }
        });
      });
      css += '\n';
    }
  });

  // Color palettes
  const colorPalettes = ['orange', 'brown', 'amber', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta', 'pink', 'red', 'neutral', 'brand', 'primary'];
  css += '  /* Color Palettes */\n';
  colorPalettes.forEach(colorName => {
    if (tokens[colorName]) {
      Object.entries(tokens[colorName]).forEach(([shade, value]) => {
        const colorValue = value.value || value;
        // Replace spaces with hyphens in shade names
        const sanitizedShade = shade.replace(/\s+/g, '-');
        css += `  --color-${colorName}-${sanitizedShade}: ${colorValue};\n`;
      });
    }
  });
  css += '\n';

  // Spacing tokens
  const spacingSizes = ['2xs', '3xs', '4xs', '5xs', '6xs', '7xs', '8xs', '9xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', '10xl', '11xl', '12xl', '13xl', '14xl', '15xl', '16xl'];
  css += '  /* Spacing */\n';
  spacingSizes.forEach(size => {
    if (tokens[size]) {
      const spaceValue = tokens[size].value || tokens[size];
      css += `  --spacing-${size}: ${resolveTokenValue(spaceValue)};\n`;
    }
  });
  
  // Unit references
  if (tokens.unit) {
    Object.entries(tokens.unit).forEach(([key, value]) => {
      const unitValue = value.value || value;
      // Add 'px' unit to numeric values
      const finalValue = !isNaN(unitValue) ? `${unitValue}px` : unitValue;
      css += `  --spacing-unit-${key}: ${finalValue};\n`;
    });
  }
  css += '\n';

  // Radius tokens
  if (tokens.radius) {
    css += '  /* Border Radius */\n';
    Object.entries(tokens.radius).forEach(([key, value]) => {
      const radiusValue = value.value || value;
      css += `  --radius-${key}: ${resolveTokenValue(radiusValue)};\n`;
    });
    css += '\n';
  }

  // Width tokens
  if (tokens.width) {
    css += '  /* Border Width */\n';
    Object.entries(tokens.width).forEach(([key, value]) => {
      const widthValue = value.value || value;
      css += `  --border-width-${key}: ${resolveTokenValue(widthValue)};\n`;
    });
    css += '\n';
  }

  // Light theme colors
  if (tokens.light) {
    css += '  /* Light Theme Colors */\n';
    Object.entries(tokens.light).forEach(([category, values]) => {
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          const colorValue = value.value || value;
          const resolvedValue = resolveTokenValue(colorValue);
          // Replace spaces with hyphens in key names
          const sanitizedKey = key.replace(/\s+/g, '-');
          css += `  --color-${category}-${sanitizedKey}: ${resolvedValue};\n`;
        });
      }
    });
    css += '\n';
  }

  css += '}\n\n';

  // Dark theme
  if (tokens.dark) {
    css += '/* Dark Theme */\n';
    css += '[data-theme="dark"] {\n';
    Object.entries(tokens.dark).forEach(([category, values]) => {
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          const colorValue = value.value || value;
          const resolvedValue = resolveTokenValue(colorValue);
          // Replace spaces with hyphens in key names
          const sanitizedKey = key.replace(/\s+/g, '-');
          css += `  --color-${category}-${sanitizedKey}: ${resolvedValue};\n`;
        });
      }
    });
    css += '}\n\n';
  }

  // Black theme
  if (tokens.black) {
    css += '/* Black Theme */\n';
    css += '[data-theme="black"] {\n';
    Object.entries(tokens.black).forEach(([category, values]) => {
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          const colorValue = value.value || value;
          const resolvedValue = resolveTokenValue(colorValue);
          // Replace spaces with hyphens in key names
          const sanitizedKey = key.replace(/\s+/g, '-');
          css += `  --color-${category}-${sanitizedKey}: ${resolvedValue};\n`;
        });
      }
    });
    css += '}\n\n';
  }

  // Platform-specific typography (responsive)
  ['mobile', 'ios', 'android'].forEach(platform => {
    if (tokens[platform]?.text) {
      css += `/* ${platform.charAt(0).toUpperCase() + platform.slice(1)} Typography (Responsive) */\n`;
      css += `@media (max-width: 768px) {\n`;
      css += '  :root {\n';
      
      Object.entries(tokens[platform].text).forEach(([size, variants]) => {
        Object.entries(variants).forEach(([variant, props]) => {
          const scaleKey = `${size}-${variant}`;
          
          if (props.size?.value) {
            css += `    --typography-${scaleKey}-font-size: ${resolveTokenValue(props.size.value)};\n`;
          }
          if (props['line-height']?.value) {
            css += `    --typography-${scaleKey}-line-height: ${resolveTokenValue(props['line-height'].value)};\n`;
          }
          if (props['letter-spacing']?.value) {
            css += `    --typography-${scaleKey}-letter-spacing: ${resolveTokenValue(props['letter-spacing'].value)};\n`;
          }
          if (props.weight?.value) {
            const weightValue = resolveTokenValue(props.weight.value);
            // Fix weight references to use font-weight prefix
            const fixedWeight = weightValue.replace('var(--weight-', 'var(--font-weight-');
            css += `    --typography-${scaleKey}-font-weight: ${fixedWeight};\n`;
          }
        });
      });
      
      css += '  }\n';
      css += '}\n\n';
    }
  });

  return css;
}

/**
 * Generate typography utility classes from iLoveMerge structure
 * @param {Object} tokens - The complete tokens object
 * @returns {string} CSS utility classes
 */
export function generateTypographyUtilities(tokens) {
  let css = '/* Typography Utility Classes */\n\n';

  // Generate classes for each typography scale
  if (tokens.desktop?.text) {
    Object.entries(tokens.desktop.text).forEach(([size, variants]) => {
      Object.keys(variants).forEach(variant => {
        const scaleKey = `${size}-${variant}`;
        css += `.text-${scaleKey} {\n`;
        css += `  font-size: var(--typography-${scaleKey}-font-size);\n`;
        css += `  line-height: var(--typography-${scaleKey}-line-height);\n`;
        css += `  letter-spacing: var(--typography-${scaleKey}-letter-spacing);\n`;
        css += `  font-weight: var(--typography-${scaleKey}-font-weight);\n`;
        css += '}\n\n';
      });
    });
  }

  // Font weight utilities
  if (tokens.font?.weight) {
    Object.keys(tokens.font.weight).forEach(weight => {
      css += `.font-${weight} {\n`;
      css += `  font-weight: var(--font-weight-${weight});\n`;
      css += '}\n\n';
    });
  }

  // Font family utilities
  if (tokens.font?.family) {
    Object.keys(tokens.font.family).forEach(family => {
      css += `.font-${family} {\n`;
      css += `  font-family: var(--font-family-${family});\n`;
      css += '}\n\n';
    });
  }

  // Spacing utilities
  const spacingSizes = ['2xs', '3xs', '4xs', '5xs', '6xs', '7xs', '8xs', '9xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', '10xl', '11xl', '12xl', '13xl', '14xl', '15xl', '16xl'];
  css += '/* Spacing Utilities */\n';
  spacingSizes.forEach(size => {
    if (tokens[size]) {
      css += `.spacing-${size} { margin: var(--spacing-${size}); }\n`;
      css += `.p-${size} { padding: var(--spacing-${size}); }\n`;
      css += `.px-${size} { padding-left: var(--spacing-${size}); padding-right: var(--spacing-${size}); }\n`;
      css += `.py-${size} { padding-top: var(--spacing-${size}); padding-bottom: var(--spacing-${size}); }\n`;
      css += `.m-${size} { margin: var(--spacing-${size}); }\n`;
      css += `.mx-${size} { margin-left: var(--spacing-${size}); margin-right: var(--spacing-${size}); }\n`;
      css += `.my-${size} { margin-top: var(--spacing-${size}); margin-bottom: var(--spacing-${size}); }\n`;
      css += '\n';
    }
  });

  return css;
}