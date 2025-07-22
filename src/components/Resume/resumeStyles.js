// Centralized resume design system
export const resumeDesignSystem = {
  // Simplified typography scale - minimal font sizes with emphasis via weight/style
  typography: {
    // Name only - largest size
    nameText: {
      fontSize: { print: '16pt', screen: '20px' },
      fontWeight: 700,
      color: '#000000',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      lineHeight: { print: '1.2', screen: '1.2' }
    },
    
    // Section headers and important titles
    headerText: {
      fontSize: { print: '12pt', screen: '14px' },
      fontWeight: 700,
      color: '#000000',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      lineHeight: { print: '1.3', screen: '1.3' }
    },
    
    // All body content - one size for everything
    bodyText: {
      fontSize: { print: '11pt', screen: '12px' },
      fontWeight: 400,
      color: '#000000',
      lineHeight: { print: '1.35', screen: '1.4' }
    },
    
    // Small text for contact info only
    smallText: {
      fontSize: { print: '9pt', screen: '10px' },
      fontWeight: 400,
      color: '#000000',
      lineHeight: { print: '1.3', screen: '1.3' }
    }
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
  
  // Spacing system
  spacing: {
    sectionGap: { print: '0.04rem', screen: '20px' },
    itemGap: { print: '0.03cm', screen: '10px' },
    microGap: { print: '0.005cm', screen: '3px' },
    headerGap: { print: '0.03cm', screen: '6px' }
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
    margins: { print: '0.1in', screen: '0.75in' },
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    serifFontFamily: "Georgia, 'Times New Roman', Times, serif"
  },
  
  // Colors
  colors: {
    divider: '#666',
    bullet: '#666'
  }
};

// Helper function to get typography styles
export const getTypographyStyle = (type, printMode = false) => {
  const typography = resumeDesignSystem.typography[type];
  if (!typography) return {};
  
  return {
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
export const getSpacing = (type, printMode = false) => {
  const spacing = resumeDesignSystem.spacing[type];
  return printMode ? spacing.print : spacing.screen;
};

// Generate CSS string for typography
export const generateTypographyCSS = (type, printMode = false) => {
  const style = getTypographyStyle(type, printMode);
  return Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join(' ');
};