// Centralized resume design system
export const createResumeDesignSystem = (config = {}) => {
  // Default values
  const defaults = {
    fontSize: {
      name: 20,
      header: 14,
      body: 11,
      small: 9
    },
    spacing: {
      sectionGap: 10,
      itemGap: 5,
      lineHeight: 1.4,
      bulletGap: 2
    },
    margins: {
      top: 0.5,
      bottom: 0.5,
      left: 0.75,
      right: 0.75
    }
  };

  const { headingFont, bodyFont } = config;
  const fontSize = { ...defaults.fontSize, ...config.fontSize };
  const spacing = { ...defaults.spacing, ...config.spacing };
  const margins = { ...defaults.margins, ...config.margins };

  return {
    // Simplified typography scale - minimal font sizes with emphasis via weight/style
    typography: {
      // Name only - largest size
      nameText: {
        fontFamily: headingFont || "Georgia, serif",
        fontSize: { print: `${fontSize.name * 0.8}pt`, screen: `${fontSize.name}px` },
        fontWeight: 700,
        color: '#000000',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        lineHeight: { print: `${spacing.lineHeight * 0.9}`, screen: `${spacing.lineHeight}` }
      },
      
      // Section headers and important titles
      headerText: {
        fontFamily: headingFont || "Georgia, serif",
        fontSize: { print: `${fontSize.header * 0.85}pt`, screen: `${fontSize.header}px` },
        fontWeight: 700,
        color: '#000000',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        lineHeight: { print: `${spacing.lineHeight * 0.95}`, screen: `${spacing.lineHeight}` }
      },
      
      // All body content - one size for everything
      bodyText: {
        fontFamily: bodyFont || "Helvetica, sans-serif",
        fontSize: { print: `${fontSize.body * 0.85}pt`, screen: `${fontSize.body}px` },
        fontWeight: 400,
        color: '#000000',
        lineHeight: { print: `${spacing.lineHeight * 0.9}`, screen: `${spacing.lineHeight}` }
      },
      
      // Small text for contact info only
      smallText: {
        fontFamily: bodyFont || "Helvetica, sans-serif",
        fontSize: { print: `${fontSize.small * 0.85}pt`, screen: `${fontSize.small}px` },
        fontWeight: 400,
        color: '#000000',
        lineHeight: { print: `${spacing.lineHeight}`, screen: `${spacing.lineHeight}` }
      }
    },

    // Spacing system - now configurable
    spacingConfig: {
      sectionGap: { print: config.compactMode ? '0' : '0.02cm', screen: `${spacing.sectionGap}px` },
      itemGap: { print: config.compactMode ? '0.005cm' : '0.01cm', screen: `${spacing.itemGap}px` },
      microGap: { print: '0.001cm', screen: '1px' },
      headerGap: { print: '0.01cm', screen: '2px' },
      bulletGap: { print: `${spacing.bulletGap * 0.1}cm`, screen: `${spacing.bulletGap}px` }
    },

    // Page margins
    margins: {
      top: `${margins.top}in`,
      bottom: `${margins.bottom}in`,
      left: `${margins.left}in`,
      right: `${margins.right}in`
    },

    // Text emphasis styles - use with bodyText size
    emphasis: {
      // For company names, institution names, job titles
    bold: {
      fontWeight: 700,
      color: '#000000'
    },
    
    // Serif version for more sophisticated look
    boldSerif: {
      fontWeight: 700,
      color: '#000000',
      fontFamily: "Georgia, 'Times New Roman', Times, serif"
    },
    
    // For dates, locations, secondary info
    italic: {
      fontWeight: 400,
      fontStyle: 'italic',
      color: '#000000'
    },
    
    // For section headers, important labels
    boldUppercase: {
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: '#000000'
    }
  },
  
  // Spacing system - Reduced for tighter layout
  spacing: {
    sectionGap: { print: '0', screen: '10px' },         // No gap in print
    itemGap: { print: '0.01cm', screen: '5px' },        // Minimal item spacing
    microGap: { print: '0.001cm', screen: '1px' },      // Almost no micro gaps
    headerGap: { print: '0.01cm', screen: '2px' }       // Minimal header gaps
  },
  
    // Links
    links: {
      color: '#161616',
      hoverColor: '#0f62fe',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      transition: 'color 0.15s ease'
    },
    
    // Layout
    layout: {
      pageSize: {
        width: '8.5in',
        height: '11in'
      },
      margins: { 
        print: `${margins.top}in ${margins.right}in ${margins.bottom}in ${margins.left}in`, 
        screen: `${margins.top}in ${margins.right}in ${margins.bottom}in ${margins.left}in` 
      },
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      serifFontFamily: "Georgia, 'Times New Roman', Times, serif"
    },
    
    // Colors
    colors: {
      divider: config.showDividers ? '#666' : 'transparent',
      bullet: '#666'
    }
  };
};

// Default design system for backward compatibility
export const resumeDesignSystem = createResumeDesignSystem();

// Helper function to get typography styles
export const getTypographyStyle = (type, printMode = false, designSystem = resumeDesignSystem) => {
  const typography = designSystem.typography[type];
  if (!typography) return {};
  
  return {
    fontFamily: typography.fontFamily,
    fontSize: printMode ? typography.fontSize.print : typography.fontSize.screen,
    fontWeight: typography.fontWeight,
    color: typography.color,
    lineHeight: printMode ? typography.lineHeight.print : typography.lineHeight.screen,
    ...(typography.textTransform && { textTransform: typography.textTransform }),
    ...(typography.letterSpacing && { letterSpacing: typography.letterSpacing }),
    ...(typography.fontStyle && { fontStyle: typography.fontStyle })
  };
};

// Helper function to get spacing
export const getSpacing = (type, printMode = false, designSystem = resumeDesignSystem) => {
  const spacing = designSystem.spacingConfig[type];
  return printMode ? spacing.print : spacing.screen;
};

// Generate CSS string for typography
export const generateTypographyCSS = (type, printMode = false, designSystem = resumeDesignSystem) => {
  const style = getTypographyStyle(type, printMode, designSystem);
  return Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join(' ');
};