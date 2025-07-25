import React from 'react';
import CoverLetter from './CoverLetter.jsx';
import { ibraheemResumeData } from '../../data/ibraheemResumeData.js';

export default {
  title: 'Resume/CoverLetter',
  component: CoverLetter,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <CoverLetter {...args} />;

export const Default = Template.bind({});
Default.args = {
  resumeData: ibraheemResumeData,
  jobDescription: 'We are looking for a Senior Software Engineer to join our team...',
  companyName: 'Tech Corp',
  hiringManagerName: '',
  userSubscription: 'free',
  remainingCredits: 3,
};

export const WithHiringManager = Template.bind({});
WithHiringManager.args = {
  resumeData: ibraheemResumeData,
  jobDescription: 'We are seeking an experienced Full Stack Developer with expertise in React and Node.js...',
  companyName: 'Innovative Solutions Inc.',
  hiringManagerName: 'Sarah Johnson',
  userSubscription: 'pro',
  remainingCredits: -1,
};

export const PrintMode = Template.bind({});
PrintMode.args = {
  resumeData: ibraheemResumeData,
  jobDescription: 'Senior Engineering Manager position...',
  companyName: 'Enterprise Software Co.',
  printMode: true,
  useSerifFont: true,
};

export const WithPrefilledContent = Template.bind({});
WithPrefilledContent.args = {
  resumeData: ibraheemResumeData,
  jobDescription: `We are looking for a Principal Engineer to lead our AI/ML initiatives. The ideal candidate will have:
  - 10+ years of software engineering experience
  - Deep expertise in machine learning and AI systems
  - Experience building scalable distributed systems
  - Leadership experience mentoring senior engineers
  - Track record of delivering complex technical projects`,
  companyName: 'AI Innovations Corp',
  hiringManagerName: 'Dr. Michael Chen',
  userSubscription: 'pro',
};

export const FoundingEngineerHealthtech = Template.bind({});
FoundingEngineerHealthtech.args = {
  resumeData: ibraheemResumeData,
  jobDescription: `I'm currently supporting a stealth healthtech startup in NYC that's building personalized, preventative infrastructure for healthcare.

The founders are looking for someone who thrives in 0 to 1 environments, cares deeply about intuitive product design, and has built across both the frontend and backend within fast-paced, early-stage teams.

The stack includes Python, TypeScript, React, RESTful APIs, and AWS/GCP. Experience working with longitudinal or wearable datasets, especially in regulated or health-focused products, would be a strong plus.

Base salary is $200–300K + equity
Full-time onsite in NYC`,
  companyName: 'Stealth Healthtech Startup',
  recipientName: 'Natalie Wattenbach',
  recipientTitle: 'Femtech & Women\'s Health Talent Specialist',
  userSubscription: 'professional',
  initialContent: {
    salutation: 'Dear Natalie',
    opening: 'Thank you for reaching out about the Founding Product Engineer opportunity. I\'m excited about the possibility of joining a stealth healthtech startup building personalized, preventative healthcare infrastructure. Your timing is perfect – I\'m currently a Founding Software Engineer at Architect Health, where I\'ve been building HIPAA-compliant ML pipelines and developing deep learning models for clinical decision support.',
    body1: 'My background aligns exceptionally well with what you\'re seeking. At Architect Health, I\'ve been part of the founding team from inception, helping the company through Tampa Bay Wave Accelerator and NVIDIA Inception programs while contributing to our $1.5M seed funding success. I thrive in the ambiguity and rapid iteration that defines early-stage startups. Having built products from 0 to 1 in healthcare, I understand both the technical challenges and the immense potential impact of preventative health solutions.',
    body2: 'My technical expertise spans the exact stack your team uses – Python, TypeScript, React, and RESTful APIs. With 5+ years at LinkedIn building products across the entire stack, I\'ve developed AI-powered search features, engineered modern UI components, and architected scalable backend systems. More importantly, I\'ve successfully deployed these technologies in regulated healthcare environments, building ML models that process sensitive patient data while maintaining strict HIPAA compliance and security standards. I\'ve also architected scalable ML infrastructure using AWS, implementing microservices and serverless functions to serve real-time predictions.',
    body3: 'Beyond my current role at Architect Health, my master\'s capstone at Harvard focused on AI Clinical Trial Matching, giving me deep insights into healthcare data challenges and the transformative potential of personalized medicine. I\'ve worked with clinical datasets, understand the complexities of longitudinal health data, and have experience building systems that healthcare providers trust. The combination of meaningful impact and technical challenges in building 0 to 1 products is exactly what drives me.',
    closing: 'I\'m based in NYC and would welcome the opportunity to work onsite with the founding team. Building in-person chemistry and rapid iteration cycles are crucial for early-stage success. I\'m available to discuss this opportunity further at your convenience and can be reached at ibraheem4@gmail.com or (832) 605-4585. I look forward to learning more about your vision for personalized healthcare and how I can contribute to building this transformative platform.',
    signOff: 'Best regards'
  }
};