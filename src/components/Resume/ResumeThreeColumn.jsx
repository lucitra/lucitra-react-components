import React from 'react';
import PropTypes from 'prop-types';

const ResumeThreeColumn = ({ skills, education, patents, printMode = false }) => {
  return (
    <>
      <style jsx={true}>{`
        .three-column-section {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: ${printMode ? '0.15rem' : '20px'};
          margin-bottom: ${printMode ? '0.15rem' : '24px'};
        }
        
        .column {
          min-height: ${printMode ? 'auto' : '120px'};
        }
        
        .column-title {
          font-size: ${printMode ? '11pt' : '12px'};
          font-weight: 600;
          margin-bottom: ${printMode ? '0.1cm' : '8px'};
          color: #000;
          text-transform: uppercase;
          letter-spacing: 0.2px;
          border-bottom: ${printMode ? 'none' : '1px solid #ddd'};
          padding-bottom: ${printMode ? '0' : '2px'};
          line-height: ${printMode ? '1.3' : '1.2'};
        }
        
        .skills-category {
          margin-bottom: ${printMode ? '0.05cm' : '10px'};
        }
        
        .skills-category-title {
          font-size: ${printMode ? '10pt' : '10px'};
          font-weight: bold;
          color: #333;
          margin-bottom: ${printMode ? '0.025cm' : '4px'};
        }
        
        .skills-list {
          font-size: ${printMode ? '10pt' : '9px'};
          color: #555;
          line-height: ${printMode ? '1.5' : '1.3'};
        }
        
        .education-item, .patent-item {
          margin-bottom: ${printMode ? '0.1cm' : '10px'};
          font-size: ${printMode ? '10pt' : '10px'};
        }
        
        .education-institution, .patent-title {
          font-weight: bold;
          color: #333;
          margin-bottom: ${printMode ? '0.025cm' : '2px'};
          line-height: ${printMode ? '1.4' : '1.2'};
        }
        
        .education-degree, .patent-details {
          color: #555;
          font-size: ${printMode ? '10pt' : '9px'};
          line-height: ${printMode ? '1.4' : '1.2'};
          margin-bottom: ${printMode ? '0.025cm' : '2px'};
        }
        
        .education-date, .patent-date {
          color: #666;
          font-size: ${printMode ? '9pt' : '9px'};
          font-style: italic;
          line-height: ${printMode ? '1.4' : '1.2'};
        }
        
        .patent-title-link {
          color: #333;
          text-decoration: none;
          font-weight: bold;
          font-size: ${printMode ? '10pt' : '10px'};
          line-height: ${printMode ? '1.4' : '1.2'};
        }
        
        .patent-title-link:hover {
          text-decoration: underline;
        }
        
        .patent-summary {
          font-size: ${printMode ? '10pt' : '9px'};
          color: #666;
          margin-top: ${printMode ? '0.025cm' : '2px'};
          line-height: ${printMode ? '1.4' : '1.2'};
        }
        
        @media print {
          .three-column-section {
            gap: 0.15rem;
            margin-bottom: 0.15rem;
          }
          
          .column-title {
            font-size: 11pt;
            margin-bottom: 0.1cm;
          }
          
          .skills-category {
            margin-bottom: 0.05cm;
          }
          
          .skills-category-title {
            font-size: 10pt;
          }
          
          .skills-list {
            font-size: 10pt;
            line-height: 1.5;
          }
          
          .education-item, .patent-item {
            margin-bottom: 0.1cm;
            font-size: 10pt;
          }
          
          .education-degree, .patent-details {
            font-size: 10pt;
          }
          
          .education-date, .patent-date {
            font-size: 9pt;
          }
          
          .patent-title-link {
            font-size: 10pt;
          }
          
          .patent-summary {
            font-size: 10pt;
          }
        }
      `}</style>
      
      <div className="three-column-section">
        {/* Skills Column */}
        <div className="column">
          <h3 className="column-title">Skills</h3>
          {skills && skills.map((skillColumn, columnIndex) => (
            <div key={columnIndex} className="skills-list">
              {skillColumn.items.join(', ')}
            </div>
          ))}
        </div>

        {/* Education Column */}
        <div className="column">
          <h3 className="column-title">Education</h3>
          {education && education
            .filter(edu => edu.visibility.print)
            .map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-institution">{edu.institution}</div>
              <div className="education-degree">
                {edu.studyType} {edu.area && `in ${edu.area}`}
              </div>
              <div className="education-date">
                {edu.startDate} - {edu.endDate || 'Present'}
              </div>
            </div>
          ))}
        </div>

        {/* Patents Column */}
        <div className="column">
          <h3 className="column-title">Patents</h3>
          {patents && patents
            .filter(patent => patent.visibility.print)
            .map((patent, index) => (
            <div key={index} className="patent-item">
              {patent.url ? (
                <a href={patent.url} className="patent-title-link" target="_blank" rel="noopener noreferrer">
                  {patent.title}
                </a>
              ) : (
                <div className="patent-title">{patent.title}</div>
              )}
              <div className="patent-details">{patent.awarder}</div>
              <div className="patent-date">{patent.date}</div>
              {patent.summary && (
                <div className="patent-summary">
                  {patent.summary}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

ResumeThreeColumn.propTypes = {
  skills: PropTypes.array,
  education: PropTypes.array,
  patents: PropTypes.array,
  printMode: PropTypes.bool
};

ResumeThreeColumn.defaultProps = {
  skills: [],
  education: [],
  patents: [],
  printMode: false
};

export { ResumeThreeColumn };