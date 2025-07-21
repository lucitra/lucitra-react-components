import Resume from './Resume';

// Sample resume data based on the actual structure
const sampleResumeData = {
  basics: {
    name: "Ibraheem Abdul-Malik",
    label: "Senior Software Engineer | Applied AI Specialist",
    email: "ibraheem4@gmail.com",
    phone: "+1 (832) 605-4585",
    website: "https://ibraheem.com",
    location: "New York, NY",
    profiles: [
      {
        network: "GitHub",
        username: "ibraheem4",
        url: "https://github.com/ibraheem4"
      },
      {
        network: "LinkedIn", 
        username: "ibraheem4",
        url: "https://www.linkedin.com/in/ibraheem4"
      }
    ],
    summary: "Software engineer with a master's degree, specializing in Python, cloud technologies, and AI/ML systems. Enhanced user engagement at LinkedIn by developing Al-driven features using innovative ML architectures. Pursuing roles in applied Al engineering to implement cutting-edge research into scalable production systems."
  },
  work: [
    {
      company: "Architect Health",
      location: "New York, NY",
      startDate: "2024-09",
      endDate: null,
      visibility: { online: true, print: true },
      positions: [
        {
          title: "Founding Software Engineer",
          location: "New York, NY", 
          startDate: "Sep 2024",
          endDate: "Present",
          highlights: [
            "Built HIPAA-compliant ML pipelines with secure model inference endpoints for processing patient data while maintaining privacy standards.",
            "Developed and optimized deep learning models for clinical decision support through iterative model training and hyperparameter tuning.",
            "Architected scalable ML infrastructure using microservices and serverless functions to serve real-time model predictions.",
            "Participated in Tampa Bay Wave Accelerator and NVIDIA Inception programs at VC-backed healthcare startup that raised $1.5M seed funding."
          ]
        }
      ]
    },
    {
      company: "Rocket Dollar",
      location: "Remote",
      startDate: "2023-04",
      endDate: "2023-08", 
      visibility: { online: true, print: true },
      positions: [
        {
          title: "Software Engineer - Contract",
          location: "Remote",
          startDate: "Apr 2023",
          endDate: "Aug 2023",
          highlights: [
            "Migrated Serverless Backend to FastAPI while implementing performance optimizations and monitoring systems",
            "Established comprehensive testing protocols and debugging frameworks for improved code reliability",
            "Developed and maintained detailed API documentation while managing stakeholder communications and updates"
          ]
        }
      ]
    },
    {
      company: "LinkedIn",
      location: "New York, NY",
      startDate: "2017-04",
      endDate: "2022-10",
      visibility: { online: true, print: true },
      positions: [
        {
          title: "Senior Software Engineer - News",
          location: "New York, NY",
          startDate: "2021-03", 
          endDate: "2022-10",
          highlights: [
            "Led development of AI-powered search and recommendation systems, increasing user engagement by 42%",
            "Engineered high-performance UI components with React and TypeScript, including ML-powered search suggestions",
            "Developed analytics dashboards using Python data pipelines for real-time monitoring of product health"
          ]
        },
        {
          title: "Software Engineer - Sales Solutions", 
          location: "San Francisco, CA",
          startDate: "2017-10",
          endDate: "2021-03",
          highlights: [
            "Developed key features across Search, Inbox, and Notifications, increasing Sales Navigator usage by 28%",
            "Engineered reusable React component library with integrated analytics for improved development efficiency",
            "Optimized web performance through advanced code splitting and lazy loading techniques"
          ]
        },
        {
          title: "Engineering Apprentice - Sales Solutions",
          location: "Sunnyvale, CA", 
          startDate: "2017-04",
          endDate: "2017-09",
          highlights: [
            "Developed responsive mobile web interfaces that improved user activation metrics by 30%",
            "Implemented comprehensive accessibility standards and performance optimizations for mobile applications"
          ]
        }
      ]
    }
  ],
  education: [
    {
      institution: "Harvard Extension School",
      area: "Software Engineering", 
      studyType: "Master of Liberal Arts",
      location: "Cambridge, MA",
      startDate: "2020-12",
      endDate: "Present",
      visibility: { online: true, print: true }
    },
    {
      institution: "The University of Texas at Austin",
      area: "Marketing",
      studyType: "Bachelor of Business Administration",
      location: "Austin, TX",
      startDate: "2003-07", 
      endDate: "2008-04",
      visibility: { online: true, print: true }
    }
  ],
  skills: [
    {
      category: "All Skills",
      items: [
        "Python, TypeScript, Kotlin, Git",
        "Django, FastAPI, ReactJS, NextJS",
        "AWS, Azure, GCP, Docker, Terraform, Kubernetes", 
        "MySQL, PostgreSQL",
        "Machine learning techniques",
        "Software development methodologies",
        "Data analysis skills"
      ]
    }
  ],
  patents: [
    {
      title: "Network System for Contextual Course Recommendation based on Third-Party Content",
      date: "2022-02",
      awarder: "Microsoft Technology Licensing, LLC (US Patent #11,250,716)",
      summary: "AI-driven recommendation system that analyzes third-party content to generate personalized learning pathways.",
      url: "https://patents.justia.com/patent/11250716",
      visibility: { online: true, print: true }
    }
  ]
};

export default {
  title: 'Resume/Resume',
  component: Resume,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive resume component that displays professional information in a print-optimized format. Supports filtering by specific companies and print/online modes.'
      }
    }
  },
  argTypes: {
    data: {
      description: 'Complete resume data object containing basics, work, education, skills, and patents',
      control: { type: 'object' }
    },
    config: {
      description: 'Configuration options for display mode and company filtering',
      control: { type: 'object' }
    }
  }
};

// Default story showing online mode
export const Online = {
  args: {
    data: sampleResumeData,
    config: {
      printMode: false,
      maxWorkItems: null,
      filterByVisibility: true
    }
  }
};

// Print mode story optimized for PDF generation  
export const PrintMode = {
  args: {
    data: sampleResumeData,
    config: {
      printMode: true,
      maxWorkItems: 3, // Limit to 3 most recent for single page
      filterByVisibility: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Print-optimized version of the resume that fits on one page with condensed spacing and font sizes. Limited to 3 most recent work experiences to ensure single page layout.'
      }
    }
  }
};

// Story showing limited work experience
export const LimitedWorkHistory = {
  args: {
    data: sampleResumeData,
    config: {
      printMode: false,
      maxWorkItems: 2,
      filterByVisibility: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows only the 2 most recent work experiences for a concise resume.'
      }
    }
  }
};

// Story showing all work experience (no filtering)
export const AllWorkExperience = {
  args: {
    data: sampleResumeData,
    config: {
      printMode: false,
      maxWorkItems: null,
      filterByVisibility: false // Show all work regardless of visibility settings
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows all work experience without any filtering by visibility or limits.'
      }
    }
  }
};

// Single Column Layout - Print Mode
export const SingleColumnPrint = {
  args: {
    data: sampleResumeData,
    config: {
      printMode: true,
      singleColumn: true,
      maxWorkItems: 3,
      filterByVisibility: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Single-column layout optimized for PDF printing. Skills, education, and patents are arranged in a single column with education in two columns.'
      }
    }
  }
};

// New Single Column Layout - Print Mode  
export const SingleColumnNewPrint = {
  args: {
    data: sampleResumeData,
    config: {
      printMode: true,
      singleColumn: 'new',
      maxWorkItems: 3,
      filterByVisibility: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'New single-column layout with improved design system consistency, optimized for PDF printing.'
      }
    }
  }
};

// Single Column Layout - Online Mode
export const SingleColumnOnline = {
  args: {
    data: sampleResumeData,
    config: {
      printMode: false,
      singleColumn: true,
      maxWorkItems: null,
      filterByVisibility: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Single-column layout for online viewing with all work experience visible.'
      }
    }
  }
};