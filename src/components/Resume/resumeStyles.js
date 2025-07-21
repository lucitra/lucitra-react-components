// Centralized resume design system
export const resumeDesignSystem = {
  // Typography scale - consistent across all components
  typography: {
    // Section headers (SKILLS, EDUCATION, etc.)
    sectionTitle: {
      fontSize: { print: '12pt', screen: '14px' },
      fontWeight: 600,
      color: '#161616',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      lineHeight: { print: '1.3', screen: '1.2' }
    },
    
    // Main headers (name, company names, institution names)
    primaryHeader: {
      fontSize: { print: '18pt', screen: '24px' }, // Name
      fontWeight: 700,
      color: '#161616',
      lineHeight: { print: '1.2', screen: '1.2' }
    },
    
    // Secondary headers (job title, degree types, patent titles)
    secondaryHeader: {
      fontSize: { print: '11pt', screen: '14px' },
      fontWeight: 600,
      color: '#161616',
      lineHeight: { print: '1.3', screen: '1.2' }
    },
    
    // Company/institution names, position titles
    keyInfo: {
      fontSize: { print: '12pt', screen: '13px' },
      fontWeight: 600,
      color: '#161616',
      lineHeight: { print: '1.3', screen: '1.2' }
    },
    
    // Body text (summary, skills, bullet points, descriptions)
    bodyText: {
      fontSize: { print: '11pt', screen: '12px' },
      fontWeight: 400,
      color: '#161616',
      lineHeight: { print: '1.3', screen: '1.4' }
    },
    
    // Summary text - larger than body text
    summaryText: {
      fontSize: { print: '11.5pt', screen: '12.5px' },
      fontWeight: 400,
      color: '#161616',
      lineHeight: { print: '1.4', screen: '1.5' }
    },
    
    // Meta text (dates, locations) - consistent size
    metaText: {
      fontSize: { print: '9.5pt', screen: '10px' },
      fontWeight: 400,
      color: '#161616',
      fontStyle: 'italic',
      lineHeight: { print: '1.3', screen: '1.2' }
    },
    
    // Contact info
    contactText: {
      fontSize: { print: '8.5pt', screen: '11px' },
      fontWeight: 400,
      color: '#161616',
      lineHeight: { print: '1.3', screen: '1.2' }
    }
  },
  
  // Spacing system
  spacing: {
    sectionGap: { print: '0.15rem', screen: '24px' },
    itemGap: { print: '0.08cm', screen: '12px' },
    microGap: { print: '0.02cm', screen: '4px' },
    headerGap: { print: '0.1cm', screen: '8px' }
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
    margins: { print: '0.15in', screen: '0.75in' },
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
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