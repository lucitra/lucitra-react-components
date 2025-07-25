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
    summary:
      "Experienced software engineer with 5+ years developing scalable web applications and leading cross-functional teams. Proven track record of delivering high-quality solutions that improve user experience and drive business growth. Skilled in modern technologies including React, Node.js, and cloud platforms.",
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
      items: [
        "JavaScript, TypeScript, Python, React, Node.js, PostgreSQL, AWS, Git, Docker",
      ],
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
  sectionVisibility: {
    summary: { online: true, print: true },
    work: { online: true, print: true },
    education: { online: true, print: true },
    skills: { online: true, print: true },
    patents: { online: true, print: false },
    volunteer: { online: false, print: false },
  },
  basics: {
    ...baseResumeData.basics,
    name: "Ibraheem Abdul-Malik",
    label: "Senior Applied AI Engineer | Deep Learning & Scalable Systems",
    email: "ibraheem4@gmail.com",
    phone: "+1 (832) 605-4585",
    website: "https://ibraheem.com",
    location: "Cambridge, MA",
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
      {
        network: "Research",
        username: "0009-0008-9131-5759",
        url: "https://orcid.org/0009-0008-9131-5759",
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
            "Built HIPAA-compliant ML pipelines and secure inference APIs for processing sensitive patient data at scale.",
            "Developed and optimized deep learning models for clinical decision support through iterative training and hyperparameter tuning.",
            "Architected scalable ML infrastructure using microservices and serverless functions for real-time model predictions.",
            "Contributed to successful participation in Tampa Bay Wave and NVIDIA Inception accelerator programs.",
          ],
        },
      ],
    },
    {
      company: "Rocket Dollar",
      location: "Remote",
      startDate: "2023-04",
      endDate: "2023-08",
      visibility: { online: true, print: false },
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
            "Developed AI-powered search and personalized news modules, significantly increasing user engagement.",
            "Engineered modern UI components including typeahead, date pickers, and infinite scroll implementations.",
            "Created real-time analytics dashboards for monitoring product health and user engagement metrics.",
            "Established client-side mock server architecture for comprehensive frontend testing.",
            "Mentored junior engineers, conducted 100+ technical interviews, and led engineering best practices initiatives.",
          ],
        },
        {
          title: "Software Engineer - Sales Solutions",
          location: "San Francisco, CA",
          startDate: "Oct 2017",
          endDate: "Mar 2021",
          highlights: [
            "Led frontend development of features across Search, Inbox, Homepage, and Notifications systems.",
            "Built reusable UI component library for LinkedIn Sales Navigator, accelerating feature development.",
            "Implemented comprehensive UI test practices and code review processes to enhance engineering quality.",
            "Optimized web performance through code splitting, lazy loading, and image optimization strategies.",
          ],
        },
        {
          title: "Engineering Apprentice - Sales Solutions",
          location: "Sunnyvale, CA",
          startDate: "Apr 2017",
          endDate: "Sep 2017",
          highlights: [
            "Enhanced mobile responsiveness and accessibility across multiple product modules.",
            "Established comprehensive accessibility standards for mobile application suite.",
            "Engineered and deployed key features for LinkedIn Sales Navigator platform.",
            "Reduced page load time significantly through advanced image optimization techniques.",
          ],
        },
      ],
    },
    {
      company: "66 Greenpoint",
      location: "Brooklyn, NY",
      startDate: "2021-09",
      endDate: "2025-04",
      visibility: { online: false, print: false },
      highlights: [],
      positions: [
        {
          title: "Business Owner",
          location: "Brooklyn, NY",
          startDate: "Sep 2021",
          endDate: "Apr 2025",
          highlights: [
            "Founded and managed a brick-and-mortar business, applying data-driven principles for 35% year-over-year revenue growth",
            "Developed custom tech stack by integrating Clover's API with proprietary AI algorithms for operations optimization",
            "Implemented predictive analytics platform for consumer behavior modeling and targeted marketing",
            "Designed and deployed a full-stack reservation system with React frontend and Python backend",
          ],
        },
      ],
    },
    {
      company: "Zynga",
      location: "San Francisco, CA",
      startDate: "2013-09",
      endDate: "2015-02",
      visibility: { online: true, print: false },
      highlights: [],
      positions: [
        {
          title: "User Acquisition Manager",
          location: "San Francisco, CA",
          startDate: "Sep 2013",
          endDate: "Feb 2015",
          highlights: [
            "Led paid acquisition for Words With Friends, optimizing user acquisition costs by 30% with predictive analytics",
            "Developed Python data analysis tools to guide multi-million dollar quarterly marketing investments",
          ],
        },
      ],
    },
    {
      company: "MdotM",
      location: "San Mateo, CA",
      startDate: "2011-06",
      endDate: "2016-03",
      visibility: { online: false, print: false },
      highlights: [],
      positions: [
        {
          title: "Account Director",
          location: "San Mateo, CA",
          startDate: "Mar 2015",
          endDate: "Mar 2016",
          highlights: [
            "Led cross-functional teams at profitable, bootstrapped adtech startup, increasing campaign ROI by 65%",
            "Implemented machine learning algorithms for ad targeting that drove millions of mobile app installs",
            "Designed and documented RESTful advertising API with Python backend for programmatic campaign management",
          ],
        },
        {
          title: "Account Manager",
          location: "San Mateo, CA",
          startDate: "Jun 2011",
          endDate: "Jun 2012",
          highlights: [
            "Led teams at profitable, bootstrapped adtech startup, managing all aspects of advertising operations",
            "Drove millions of mobile app installs and in-app purchases for top-grossing iOS and Android developers",
            "Designed and documented the advertising API for programmatic campaign management",
          ],
        },
      ],
    },
    {
      company: "TinyCo",
      location: "San Francisco, CA",
      startDate: "2012-07",
      endDate: "2012-12",
      visibility: { online: false, print: false },
      highlights: [],
      positions: [
        {
          title: "User Acquisition Manager",
          location: "San Francisco, CA",
          startDate: "Jul 2012",
          endDate: "Dec 2012",
          highlights: [
            "Managed user acquisition for various cross-platform mobile games",
            "Collaborated with graphic designers and product managers to deliver compelling static and video assets",
          ],
        },
      ],
    },
    {
      company: "KBW",
      location: "San Francisco, CA",
      startDate: "2010-12",
      endDate: "2011-03",
      visibility: { online: true, print: false },
      highlights: [],
      positions: [
        {
          title: "Equity Research Associate",
          location: "San Francisco, CA",
          startDate: "Dec 2010",
          endDate: "Mar 2011",
          highlights: [
            "Performed fundamental research on Financial Services companies, primarily Banks",
            "Provided buy/sell/hold recommendations by analyzing industry trends and creating financial models",
          ],
        },
      ],
    },
    {
      company: "Barclays Capital (Lehman Brothers)",
      location: "New York, NY",
      startDate: "2008-07",
      endDate: "2010-07",
      visibility: { online: true, print: false },
      highlights: [],
      positions: [
        {
          title: "Investment Banking Analyst",
          location: "New York, NY",
          startDate: "Jul 2008",
          endDate: "Jul 2010",
          highlights: [
            "Primary contact for executing over $3.3 billion of Liability Management trades",
            "Modeled financial transactions including debt restructuring, exchange offers, and tender offers",
          ],
        },
      ],
    },
    {
      company: "UBS Investment Bank",
      location: "New York, NY",
      startDate: "2007-06",
      endDate: "2007-08",
      visibility: { online: false, print: false },
      highlights: [],
      positions: [
        {
          title: "Summer Analyst",
          location: "New York, NY",
          startDate: "Jun 2007",
          endDate: "Aug 2007",
          highlights: [
            "Completed summer analyst program in Investment Banking division",
            "Assisted with financial modeling and client presentation preparation",
          ],
        },
      ],
    },
    {
      company: "Macy's",
      location: "New York, NY",
      startDate: "2006-05",
      endDate: "2006-08",
      visibility: { online: false, print: false },
      highlights: [],
      positions: [
        {
          title: "Marketing Intern",
          location: "New York, NY",
          startDate: "May 2006",
          endDate: "Aug 2006",
          highlights: [
            "Supported marketing campaigns and promotional strategies for retail operations",
            "Analyzed customer data and market trends to inform marketing decisions",
          ],
        },
      ],
    },
    {
      company: "May Department Stores Company",
      location: "St. Louis, MO",
      startDate: "2005-05",
      endDate: "2005-08",
      visibility: { online: false, print: false },
      highlights: [],
      positions: [
        {
          title: "Finance Intern",
          location: "St. Louis, MO",
          startDate: "May 2005",
          endDate: "Aug 2005",
          highlights: [
            "Completed finance internship program supporting corporate finance operations",
            "Assisted with financial analysis and reporting for retail division",
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
        "Wearable Devices, Computer Vision, Networks, Cloud Security & Infrastructure, Big Data Systems, Data Analysis, UX Engineering, Artificial Intelligence, Blockchain, Capstone: AI Clinical Trial Matching",
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
        "Python, TypeScript, JavaScript, React, Django, FastAPI, AWS, Azure, Docker, Kubernetes, PostgreSQL, MongoDB, TensorFlow, PyTorch, Machine Learning, Artificial Intelligence",
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
        "AI recommendation system for personalized learning pathways from third-party content.",
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
    patents: { online: true, print: false },
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
      visibility: { online: true, print: false },
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
        "Wearable Devices, Computer Vision, Networks, Cloud Security & Infrastructure, Big Data Systems, Data Analysis, UX Engineering, Artificial Intelligence, Blockchain, Capstone: AI Clinical Trial Matching",
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
        "AI recommendation system for personalized learning pathways from third-party content.",
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
