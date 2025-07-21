// Default resume data structure based on JSON Resume standard with extensions
export const defaultResumeData = {
  sectionVisibility: {
    summary: { online: true, print: true },
    work: { online: true, print: true },
    education: { online: true, print: true },
    skills: { online: true, print: true },
    patents: { online: true, print: true },
    volunteer: { online: false, print: false }
  },
  sectionDisplayLimits: {
    skills: 10,
    education: 2,
    work: 5,
    patents: 1,
    volunteer: 5
  },
  basics: {
    name: "",
    label: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    profiles: [],
    summary: ""
  },
  work: [],
  education: [],
  skills: [],
  patents: [],
  volunteer: []
};

// Sample resume data for demonstrations
export const sampleResumeData = {
  sectionVisibility: {
    summary: { online: true, print: true },
    work: { online: true, print: true },
    education: { online: true, print: true },
    skills: { online: true, print: true },
    patents: { online: true, print: true },
    volunteer: { online: false, print: false }
  },
  sectionDisplayLimits: {
    skills: 10,
    education: 2,
    work: 5,
    patents: 1,
    volunteer: 5
  },
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
      highlights: [],
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
      highlights: [],
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
      highlights: [],
      positions: [
        {
          title: "Senior Software Engineer - News",
          location: "New York, NY",
          startDate: "Mar 2021", 
          endDate: "Oct 2022",
          highlights: [
            "Led development of AI-powered search and News Module features while optimizing performance metrics",
            "Engineered modern UI components including typeahead, date pickers, and infinite scroll implementations",
            "Developed comprehensive tracking dashboards for monitoring product health and user engagement metrics",
            "Established client-side mock server architecture and implemented standardized CSS utility frameworks",
            "Mentored junior engineers, conducted technical interviews, and led engineering best practices initiatives"
          ]
        },
        {
          title: "Software Engineer - Sales Solutions", 
          location: "San Francisco, CA",
          startDate: "Oct 2017",
          endDate: "Mar 2021",
          highlights: [
            "Developed and maintained key features across Search, Inbox, Homepage, and Notifications systems",
            "Engineered reusable UI component library for LinkedIn Sales Navigator, improving development efficiency",
            "Implemented comprehensive UI test practices and code review processes to enhance engineering quality",
            "Optimized web performance through advanced code splitting techniques and strategic lazy loading"
          ]
        },
        {
          title: "Engineering Apprentice - Sales Solutions",
          location: "Sunnyvale, CA", 
          startDate: "Apr 2017",
          endDate: "Sep 2017",
          highlights: [
            "Developed responsive mobile web pages that significantly improved user activation metrics",
            "Established and implemented comprehensive accessibility standards for mobile application suite",
            "Engineered and deployed key features for LinkedIn Sales Navigator platform and infrastructure",
            "Achieved 30% reduction in page load time through implementation of advanced image optimization"
          ]
        }
      ]
    }
  ],
  education: [
    {
      institution: "Harvard Extension School",
      area: "Computer Science", 
      studyType: "Master of Liberal Arts",
      location: "Cambridge, MA",
      startDate: "Dec 2020",
      endDate: "Jul 2025",
      visibility: { online: true, print: true },
      details: [
        "Capstone Projects: AI Clinical Trial Matching",
        "Relevant Coursework: Wearable Devices and Computer Vision, Networks and Cloud Security, Advanced Cloud Technology Management, Cloud Services & Infrastructure, Programming Big Data Systems, User Experience Engineering, Artificial Intelligence Using Python, Intro to Blockchain: Bitcoin"
      ]
    },
    {
      institution: "The University of Texas at Austin",
      area: "Marketing",
      studyType: "Bachelor of Business Administration",
      location: "Austin, TX",
      startDate: "Jul 2003", 
      endDate: "Apr 2008",
      visibility: { online: true, print: true }
    }
  ],
  skills: [
    {
      category: "All Skills",
      items: [
        "Python, TypeScript, Kotlin, Git",
        "Django, FastAPI, ReactJS, NextJS",
        "AWS, Azure, GCP, Docker",
        "Terraform, Kubernetes",
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
      date: "Feb 2022",
      awarder: "Microsoft Technology Licensing, LLC (US Patent #11,250,716)",
      summary: "AI-driven recommendation system that analyzes third-party content to generate personalized learning pathways.",
      url: "https://patents.justia.com/patent/11250716",
      visibility: { online: true, print: true }
    }
  ],
  volunteer: [],
  websites: [
    {
      name: "ibraheem.com",
      url: "https://ibraheem.com",
      visibility: { online: true, print: true }
    },
    {
      name: "github.com/ibraheem4", 
      url: "https://github.com/ibraheem4",
      visibility: { online: true, print: true }
    }
  ]
};