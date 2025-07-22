// Generic resume data for SaaS product - clean, professional template
export const genericResumeData = {
  sectionVisibility: {
    summary: { online: true, print: true },
    work: { online: true, print: true },
    education: { online: true, print: true },
    skills: { online: true, print: true },
    patents: { online: false, print: false },
    volunteer: { online: false, print: false },
  },
  sectionDisplayLimits: {
    skills: 10,
    education: 3,
    work: 5,
    patents: 1,
    volunteer: 3,
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
      category: "Programming Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
    },
    {
      category: "Frontend Technologies", 
      items: ["React", "Vue.js", "HTML5", "CSS3", "Sass", "Tailwind CSS"],
    },
    {
      category: "Backend Technologies",
      items: ["Node.js", "Express.js", "Django", "PostgreSQL", "MongoDB"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Docker", "AWS", "Heroku", "Webpack", "Jest"],
    },
  ],
  patents: [],
  volunteer: [
    {
      organization: "Local Coding Bootcamp",
      position: "Volunteer Instructor",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "Present",
      summary: "Teaching web development fundamentals to career changers",
      visibility: { online: true, print: false },
      highlights: ["Mentored 20+ students in their transition to tech careers"],
    },
  ],
  websites: [
    {
      name: "johnsmith.dev",
      url: "https://johnsmith.dev",
      visibility: { online: true, print: true },
    },
  ],
};