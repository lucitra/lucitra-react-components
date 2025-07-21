import React from 'react';
import PropTypes from 'prop-types';
import { ResumeHeader } from './ResumeHeader.jsx';
import { ResumeSummary } from './ResumeSummary.jsx';
import { ResumeThreeColumn } from './ResumeThreeColumn.jsx';
import { ResumeExperience } from './ResumeExperience.jsx';

const Resume = ({ 
  data, 
  config = { 
    printMode: false, 
    maxWorkItems: null,
    filterByVisibility: true
  } 
}) => {
  if (!data) {
    return <div>No resume data provided</div>;
  }

  const { basics, work, education, skills, patents } = data;
  
  // Filter work experience based on visibility and print mode
  let filteredWork = work;
  
  if (config.filterByVisibility) {
    filteredWork = work.filter(item => 
      config.printMode ? item.visibility.print : item.visibility.online
    );
  }
  
  // Apply max items limit if specified
  if (config.maxWorkItems && config.maxWorkItems > 0) {
    filteredWork = filteredWork.slice(0, config.maxWorkItems);
  }

  // Update job title as requested
  const resumeBasics = {
    ...basics,
    label: "Senior Software Engineer | Applied AI Specialist"
  };

  return (
    <div className={`resume-container ${config.printMode ? 'print-mode' : ''}`}>
      <style jsx={true}>{`
        .resume-container {
          max-width: 8.5in;
          margin: 0 auto;
          background: white;
          padding: 0.75in;
          font-family: 'Arial', 'Helvetica', sans-serif;
          font-size: 11px;
          line-height: 1.4;
          color: #333;
        }
        
        .print-mode {
          width: 8.5in;
          height: 11in;
          box-sizing: border-box;
          padding: 0.15in;
          margin: 0;
          overflow: hidden;
          font-size: 9pt;
          line-height: 1.5;
        }
        
        .print-mode > * + * {
          margin-top: 0.15rem;
        }
        
        @media print {
          /* Comprehensive print reset */
          html, body {
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
            font-family: Arial, sans-serif !important;
          }
          
          /* Page setup with no headers/footers */
          @page {
            size: letter;
            margin: 0.15in;
            /* Attempt to disable headers and footers */
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          
          /* Hide everything except resume content */
          body * { 
            visibility: hidden !important;
          }
          
          .resume-container, .resume-container * { 
            visibility: visible !important;
          }
          
          /* Force clean layout */
          .resume-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            padding: 0.15in !important;
            margin: 0 !important;
            box-shadow: none !important;
            font-size: 9pt !important;
            line-height: 1.5 !important;
            overflow: visible !important;
            max-width: none !important;
            max-height: none !important;
            background: white !important;
            border: none !important;
          }
          
          .resume-container > * + * {
            margin-top: 0.15rem !important;
          }
          
          /* Color preservation */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Hide any potential metadata elements */
          header:not(.resume-container header),
          footer,
          nav,
          .no-print,
          [data-testid],
          .storybook-wrapper {
            display: none !important;
            visibility: hidden !important;
          }
        }
      `}</style>
      
      <ResumeHeader basics={resumeBasics} printMode={config.printMode} />
      <ResumeSummary summary={basics.summary} printMode={config.printMode} />
      <ResumeThreeColumn 
        skills={skills} 
        education={education} 
        patents={patents}
        printMode={config.printMode} 
      />
      <ResumeExperience 
        work={filteredWork} 
        printMode={config.printMode}
      />
    </div>
  );
};

Resume.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object
};

Resume.defaultProps = {
  data: null,
  config: { 
    printMode: false, 
    maxWorkItems: null,
    filterByVisibility: true
  }
};

export default Resume;