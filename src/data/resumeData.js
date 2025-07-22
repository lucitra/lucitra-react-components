// Default resume data structure based on JSON Resume standard with extensions
export const defaultResumeData = {
  sectionVisibility: {
    summary: { online: true, print: true },
    work: { online: true, print: true },
    education: { online: true, print: true },
    skills: { online: true, print: true },
    patents: { online: true, print: true },
    volunteer: { online: false, print: false },
  },
  sectionDisplayLimits: {
    skills: 10,
    education: 2,
    work: 5,
    patents: 1,
    volunteer: 5,
  },
  basics: {
    name: "",
    label: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    profiles: [],
    summary: "",
  },
  work: [],
  education: [],
  skills: [],
  patents: [],
  volunteer: [],
};

// Base resume data structure - shared template
export const baseResumeData = {
  sectionVisibility: {
    summary: { online: true, print: true },
    work: { online: true, print: true },
    education: { online: true, print: true },
    skills: { online: true, print: true },
    patents: { online: true, print: true },
    volunteer: { online: false, print: false },
  },
  sectionDisplayLimits: {
    skills: 10,
    education: 2,
    work: 5,
    patents: 1,
    volunteer: 5,
  },
  basics: {
    name: "John Smith",
    label: "Senior Software Engineer | Full-Stack Developer", 
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    website: "https://johnsmith.dev",
    location: "San Francisco, CA",
    profiles: [
      {
        network: "GitHub",
        username: "johnsmith", 
        url: "https://github.com/johnsmith",
      },
      {
        network: "LinkedIn",
        username: "johnsmith",
        url: "https://www.linkedin.com/in/johnsmith",
      },
    ],
    summary: "Experienced software engineer with 5+ years developing scalable web applications and leading cross-functional teams. Proven track record of delivering high-quality solutions that improve user experience and drive business growth. Skilled in modern technologies including React, Node.js, and cloud platforms.",
  },
  work: [
    {
      company: "TechCorp Inc.",
      location: "San Francisco, CA", 
      startDate: "2021-03",
      endDate: null,
      visibility: { online: true, print: true },
      highlights: [],
      positions: [
        {
          title: "Senior Software Engineer",
          location: "San Francisco, CA",
          startDate: "Mar 2021",
          endDate: "Present",
          highlights: [
            "Led development of customer-facing web application serving 100K+ daily active users",
            "Improved application performance by 40% through code optimization and caching strategies", 
            "Mentored 3 junior developers and established coding best practices for the team",
            "Collaborated with product managers and designers to deliver 15+ major features",
          ],
        },
      ],
    },
    {
      company: "StartupXYZ", 
      location: "San Jose, CA",
      startDate: "2019-06",
      endDate: "2021-02", 
      visibility: { online: true, print: true },
      highlights: [],
      positions: [
        {
          title: "Full-Stack Developer",
          location: "San Jose, CA", 
          startDate: "Jun 2019",
          endDate: "Feb 2021",
          highlights: [
            "Built responsive web applications using React, Node.js, and PostgreSQL",
            "Implemented automated testing suite that reduced bugs in production by 60%",
            "Designed and developed RESTful APIs serving mobile and web clients",
            "Participated in agile development process and sprint planning sessions",
          ],
        },
      ],
    },
    {
      company: "WebAgency Pro",
      location: "Remote", 
      startDate: "2018-01", 
      endDate: "2019-05",
      visibility: { online: true, print: true },
      highlights: [],
      positions: [
        {
          title: "Frontend Developer",
          location: "Remote",
          startDate: "Jan 2018", 
          endDate: "May 2019",
          highlights: [
            "Developed and maintained 10+ client websites using modern JavaScript frameworks", 
            "Optimized website performance resulting in 25% faster load times",
            "Collaborated with design team to create pixel-perfect user interfaces",
          ],
        },
      ],
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      area: "Computer Science", 
      studyType: "Bachelor of Science",
      location: "Berkeley, CA",
      startDate: "2014-08", 
      endDate: "2018-05",
      visibility: { online: true, print: true },
      courses: [],
      relevantCoursework: [
        "Data Structures, Algorithms, Database Systems, Web Development, Software Engineering",
      ],
    },
  ],
  skills: [
    {
      category: "All Skills",
      items: ["JavaScript, TypeScript, Python, React, Node.js, PostgreSQL, AWS, Git, Docker"],
    },
  ],
  patents: [],
  volunteer: [],
  websites: [
    {
      name: "johnsmith.dev",
      url: "https://johnsmith.dev", 
      visibility: { online: true, print: true },
    },
  ],
};

// Ibraheem's version - extends base with personal data
export const ibraheemResumeData = {
  ...baseResumeData,
  basics: {
    ...baseResumeData.basics,
    name: "Ibraheem Abdul-Malik",
    label: "Senior Applied AI Engineer | Deep Learning & Scalable Systems",
    email: "ibraheem4@gmail.com", 
    phone: "+1 (832) 605-4585",
    website: "https://ibraheem.com",
    location: "New York, NY",
    profiles: [
      {
        network: "GitHub",
        username: "ibraheem4",
        url: "https://github.com/ibraheem4",
      },
      {
        network: "LinkedIn", 
        username: "ibraheem4",
        url: "https://www.linkedin.com/in/ibraheem4",
      },
    ],
    summary: "Applied AI engineer with a master's in computer science, focused on deploying deep learning models and ML pipelines in production. Proven track record developing and scaling intelligent systems for healthcare and social platforms. Skilled in Python, TypeScript, and Cloud technologies; experienced in fine-tuning LLMs, building MLOps pipelines, and deploying secure AI features in HIPAA and enterprise environments.",
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
            "Participated in Tampa Bay Wave Accelerator and NVIDIA Inception programs at VC-backed healthcare startup that raised $1.5M seed funding.",
          ],
        },
      ],
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
            "Developed and maintained detailed API documentation while managing stakeholder communications and updates",
          ],
        },
      ],
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
            "Mentored junior engineers, conducted technical interviews, and led engineering best practices initiatives",
          ],
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
            "Optimized web performance through advanced code splitting techniques and strategic lazy loading",
          ],
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
            "Achieved 30% reduction in page load time through implementation of advanced image optimization",
          ],
        },
      ],
    },
  ],
  education: [
    {
      institution: "Harvard Extension School", 
      area: "Computer Science",
      studyType: "Master of Liberal Arts",
      location: "Cambridge, MA",
      startDate: "Dec 2020",
      endDate: "2025",
      visibility: { online: true, print: true },
      courses: [],
      relevantCoursework: [
        "Wearable Devices and Computer Vision, Networks and Cloud Security, Cloud Infrastructure, Big Data Systems, Data Analysis, UX Engineering, Artificial Intelligence (Python), Blockchain (Bitcoin), Capstone: AI Clinical Trial Matching",
      ],
    },
    {
      institution: "The University of Texas at Austin",
      area: "Marketing",
      studyType: "Bachelor of Business Administration", 
      location: "Austin, TX",
      startDate: "Jul 2003",
      endDate: "2008",
      visibility: { online: true, print: true },
    },
  ],
  skills: [
    {
      category: "All Skills",
      items: ["Python, TypeScript, JavaScript, React, Django, FastAPI, AWS, Azure, Docker, Kubernetes, PostgreSQL, MongoDB, TensorFlow, PyTorch, Machine Learning, AI/ML"],
    },
  ],
  patents: [
    {
      title: "Network System for Contextual Course Recommendation based on Third-Party Content",
      date: "Feb 2022", 
      awarder: "Microsoft Technology Licensing, LLC (US Patent #11,250,716)",
      summary: "AI-driven recommendation system that analyzes third-party content to generate personalized learning pathways.",
      url: "https://patents.justia.com/patent/11250716",
      visibility: { online: true, print: true },
    },
  ],
  websites: [
    {
      name: "ibraheem.com",
      url: "https://ibraheem.com", 
      visibility: { online: true, print: true },
    },
  ],
};

// Generic version uses the base data directly  
export const genericResumeData = baseResumeData;

// Sample resume data for demonstrations
export const sampleResumeData = baseResumeData;

// Legacy export - keeping the same structure but with generic data
export const legacySampleResumeData = {
  sectionVisibility: {
    summary: { online: true, print: true },
    work: { online: true, print: true },
    education: { online: true, print: true },
    skills: { online: true, print: true },
    patents: { online: true, print: true },
    volunteer: { online: false, print: false },
  },
  sectionDisplayLimits: {
    skills: 10,
    education: 2,
    work: 5,
    patents: 1,
    volunteer: 5,
  },
  basics: {
    name: "Ibraheem Abdul-Malik",
    label: "Senior Applied AI Engineer | Deep Learning & Scalable Systems",
    email: "ibraheem4@gmail.com",
    phone: "+1 (832) 605-4585",
    website: "https://ibraheem.com",
    location: "New York, NY",
    profiles: [
      {
        network: "GitHub",
        username: "ibraheem4",
        url: "https://github.com/ibraheem4",
      },
      {
        network: "LinkedIn",
        username: "ibraheem4",
        url: "https://www.linkedin.com/in/ibraheem4",
      },
    ],
    summary:
      "Applied AI engineer with a master's in computer science, focused on deploying deep learning models and ML pipelines in production. Proven track record developing and scaling intelligent systems for healthcare and social platforms. Skilled in Python, TypeScript, and Cloud technologies; experienced in fine-tuning LLMs, building MLOps pipelines, and deploying secure AI features in HIPAA and enterprise environments.",
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
            "Participated in Tampa Bay Wave Accelerator and NVIDIA Inception programs at VC-backed healthcare startup that raised $1.5M seed funding.",
          ],
        },
      ],
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
            "Developed and maintained detailed API documentation while managing stakeholder communications and updates",
          ],
        },
      ],
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
            "Mentored junior engineers, conducted technical interviews, and led engineering best practices initiatives",
          ],
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
            "Optimized web performance through advanced code splitting techniques and strategic lazy loading",
          ],
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
            "Achieved 30% reduction in page load time through implementation of advanced image optimization",
          ],
        },
      ],
    },
  ],
  education: [
    {
      institution: "Harvard Extension School",
      area: "Computer Science",
      studyType: "Master of Liberal Arts",
      location: "Cambridge, MA",
      startDate: "Dec 2020",
      endDate: "2025",
      visibility: { online: true, print: true },
      courses: [],
      relevantCoursework: [
        "Wearable Devices and Computer Vision, Networks and Cloud Security, Cloud Infrastructure, Big Data Systems, Data Analysis, UX Engineering, Artificial Intelligence (Python), Blockchain (Bitcoin), Capstone: AI Clinical Trial Matching",
      ],
    },
    {
      institution: "The University of Texas at Austin",
      area: "Marketing",
      studyType: "Bachelor of Business Administration",
      location: "Austin, TX",
      startDate: "Jul 2003",
      endDate: "2008",
      visibility: { online: true, print: true },
    },
  ],
  skills: [
    {
      category: "All Skills",
      items: [
        "Python, TypeScript, Kotlin, Git",
        "Django, FastAPI, ReactJS, NextJS",
        "AWS, Azure, GCP, Docker, Terraform, Kubernetes",
        "MySQL, PostgreSQL",
        "Machine learning",
        "Data analysis",
      ],
    },
  ],
  patents: [
    {
      title:
        "Network System for Contextual Course Recommendation based on Third-Party Content",
      date: "Feb 2022",
      awarder: "Microsoft Technology Licensing, LLC (US Patent #11,250,716)",
      summary:
        "AI-driven recommendation system that analyzes third-party content to generate personalized learning pathways.",
      url: "https://patents.justia.com/patent/11250716",
      visibility: { online: true, print: true },
    },
  ],
  volunteer: [],
  websites: [
    {
      name: "ibraheem.com",
      url: "https://ibraheem.com",
      visibility: { online: true, print: true },
    },
    {
      name: "github.com/ibraheem4",
      url: "https://github.com/ibraheem4",
      visibility: { online: true, print: true },
    },
  ],
};
