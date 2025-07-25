// Complete Resume Configuration Schema
// This schema defines the structure for a complete resume configuration
// including both data and display settings

export const resumeConfigSchema = {
  version: "1.0.0",
  metadata: {
    id: "string",
    name: "string",
    description: "string",
    theme: "string",
    lastModified: "ISO 8601 date string",
    tags: ["array of strings"]
  },
  
  // Display configuration
  display: {
    layout: {
      type: "three-column | single-column",
      useSerifFont: "boolean",
      compactMode: "boolean",
      showDividers: "boolean"
    },
    
    margins: {
      top: "number (inches)",
      bottom: "number (inches)", 
      left: "number (inches)",
      right: "number (inches)",
      // Different margins for print vs screen
      print: {
        top: "number",
        bottom: "number",
        left: "number", 
        right: "number"
      }
    },
    
    spacing: {
      sectionGap: "number (rem/px)",
      itemGap: "number (rem/px)",
      lineHeight: "number",
      bulletGap: "number (rem/px)",
      // Different spacing for print vs screen
      print: {
        sectionGap: "string",
        itemGap: "string",
        lineHeight: "number",
        bulletGap: "string"
      }
    },
    
    typography: {
      nameSize: "number (pt/px)",
      headerSize: "number (pt/px)",
      bodySize: "number (pt/px)",
      smallSize: "number (pt/px)",
      // Different sizes for print vs screen
      print: {
        nameSize: "string",
        headerSize: "string",
        bodySize: "string",
        smallSize: "string"
      }
    },
    
    colors: {
      primary: "#hex",
      text: "#hex",
      accent: "#hex",
      divider: "#hex",
      bullet: "#hex"
    },
    
    sections: {
      summary: {
        show: "boolean",
        showInPrint: "boolean",
        order: "number"
      },
      skills: {
        show: "boolean",
        showInPrint: "boolean",
        order: "number",
        columns: "number",
        showCategories: "boolean"
      },
      education: {
        show: "boolean",
        showInPrint: "boolean",
        order: "number",
        showGPA: "boolean",
        showCourses: "boolean",
        showCoursework: "boolean",
        maxItems: "number | null",
        maxBullets: "number | null"
      },
      experience: {
        show: "boolean",
        showInPrint: "boolean",
        order: "number",
        showDates: "boolean",
        showLocation: "boolean",
        dateFormat: "MM/YYYY | MMM YYYY | YYYY",
        maxItems: "number | null",
        maxBullets: "number | null"
      },
      patents: {
        show: "boolean",
        showInPrint: "boolean",
        order: "number"
      },
      publications: {
        show: "boolean",
        showInPrint: "boolean",
        order: "number"
      },
      projects: {
        show: "boolean",
        showInPrint: "boolean",
        order: "number"
      }
    }
  },
  
  // Resume data
  data: {
    basics: {
      name: "string",
      label: "string",
      email: "string",
      phone: "string",
      website: "string",
      location: "string",
      profiles: [
        {
          network: "string",
          username: "string",
          url: "string"
        }
      ],
      summary: "string"
    },
    
    work: [
      {
        id: "string",
        name: "string",
        location: "string",
        description: "string",
        position: "string",
        url: "string",
        startDate: "string",
        endDate: "string | null",
        summary: "string",
        highlights: ["array of strings"],
        visibility: {
          online: "boolean",
          print: "boolean"
        },
        // For companies with multiple positions
        positions: [
          {
            title: "string",
            startDate: "string",
            endDate: "string | null",
            location: "string",
            highlights: ["array of strings"]
          }
        ]
      }
    ],
    
    education: [
      {
        id: "string",
        institution: "string",
        area: "string",
        studyType: "string",
        startDate: "string",
        endDate: "string",
        gpa: "string",
        location: "string",
        courses: ["array of strings"],
        relevantCoursework: ["array of strings"],
        visibility: {
          online: "boolean",
          print: "boolean"
        }
      }
    ],
    
    skills: [
      {
        id: "string",
        name: "string",
        level: "string",
        keywords: ["array of strings"],
        category: "string",
        visibility: {
          online: "boolean",
          print: "boolean"
        }
      }
    ],
    
    patents: [
      {
        id: "string",
        title: "string",
        date: "string",
        awarder: "string",
        summary: "string",
        url: "string",
        inventors: ["array of strings"],
        patentNumber: "string",
        visibility: {
          online: "boolean",
          print: "boolean"
        }
      }
    ],
    
    publications: [
      {
        id: "string",
        name: "string",
        publisher: "string",
        releaseDate: "string",
        url: "string",
        summary: "string",
        visibility: {
          online: "boolean",
          print: "boolean"
        }
      }
    ],
    
    projects: [
      {
        id: "string",
        name: "string",
        description: "string",
        highlights: ["array of strings"],
        keywords: ["array of strings"],
        startDate: "string",
        endDate: "string",
        url: "string",
        roles: ["array of strings"],
        entity: "string",
        type: "string",
        visibility: {
          online: "boolean",
          print: "boolean"
        }
      }
    ]
  },
  
  // AI context for optimization
  aiContext: {
    targetRole: "string",
    targetCompany: "string",
    jobDescription: "string",
    industryKeywords: ["array of strings"],
    skillsToHighlight: ["array of strings"],
    experienceYears: "number",
    clearanceLevel: "string"
  },
  
  // Export settings
  export: {
    filename: "string",
    pdfSettings: {
      format: "letter | A4",
      margin: "number",
      scale: "number",
      displayHeaderFooter: "boolean",
      headerTemplate: "string",
      footerTemplate: "string"
    }
  }
};

// Example configuration
export const exampleResumeConfig = {
  version: "1.0.0",
  metadata: {
    id: "ibraheem-resume-2024",
    name: "Ibraheem's Resume - Senior Engineering",
    description: "Optimized for senior engineering positions",
    theme: "professional",
    lastModified: "2024-01-15T10:30:00Z",
    tags: ["engineering", "AI", "leadership"]
  },
  
  display: {
    layout: {
      type: "three-column",
      useSerifFont: false,
      compactMode: false,
      showDividers: false
    },
    
    margins: {
      top: 0.5,
      bottom: 0.5,
      left: 0.5,
      right: 0.5,
      print: {
        top: 0.05,
        bottom: 0.05,
        left: 0.05,
        right: 0.05
      }
    },
    
    spacing: {
      sectionGap: 12,
      itemGap: 6,
      lineHeight: 1.4,
      bulletGap: 2,
      print: {
        sectionGap: "0",
        itemGap: "0.01cm",
        lineHeight: 1.2,
        bulletGap: "0.001cm"
      }
    },
    
    typography: {
      nameSize: 20,
      headerSize: 14,
      bodySize: 12,
      smallSize: 10,
      print: {
        nameSize: "16pt",
        headerSize: "12pt",
        bodySize: "11pt",
        smallSize: "9pt"
      }
    },
    
    sections: {
      summary: {
        show: true,
        showInPrint: false,
        order: 1
      },
      skills: {
        show: true,
        showInPrint: true,
        order: 2,
        columns: 3,
        showCategories: true
      },
      education: {
        show: true,
        showInPrint: true,
        order: 3,
        showGPA: false,
        showCourses: false,
        showCoursework: true,
        maxItems: null,
        maxBullets: 0
      },
      experience: {
        show: true,
        showInPrint: true,
        order: 4,
        showDates: true,
        showLocation: true,
        dateFormat: "MMM YYYY",
        maxItems: null,
        maxBullets: null
      },
      patents: {
        show: true,
        showInPrint: true,
        order: 5
      }
    }
  },
  
  data: {
    // ... resume data goes here
  },
  
  aiContext: {
    targetRole: "Senior Software Engineer",
    targetCompany: "Tech Company",
    jobDescription: "",
    industryKeywords: ["AI", "cloud", "scalability"],
    skillsToHighlight: ["Python", "AWS", "Machine Learning"],
    experienceYears: 10
  }
};