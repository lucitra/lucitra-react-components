import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeThreeColumn = ({ skills, education, patents, printMode = false }) => {
  return (
    <>
      <style jsx={true}>{`
        .three-column-section {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: ${printMode ? '0.15rem' : '20px'};
          margin-bottom: ${getSpacing('sectionGap', printMode)};
        }
        
        .column {
          min-height: ${printMode ? 'auto' : '120px'};
        }
        
        .column-title {
          font-size: ${printMode ? resumeDesignSystem.typography.headerText.fontSize.print : resumeDesignSystem.typography.headerText.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.headerText.fontWeight};
          margin-bottom: ${getSpacing('headerGap', printMode)};
          color: ${resumeDesignSystem.typography.headerText.color};
          text-transform: ${resumeDesignSystem.typography.headerText.textTransform};
          letter-spacing: ${resumeDesignSystem.typography.headerText.letterSpacing};
          border-bottom: ${printMode ? 'none' : `1px solid ${resumeDesignSystem.colors.divider}`};
          padding-bottom: ${printMode ? '0' : '2px'};
          line-height: ${printMode ? resumeDesignSystem.typography.headerText.lineHeight.print : resumeDesignSystem.typography.headerText.lineHeight.screen};
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
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
        }
        
        .education-item, .patent-item {
          margin-bottom: ${getSpacing('itemGap', printMode)};
        }
        
        .education-institution, .patent-title {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          font-weight: ${resumeDesignSystem.emphasis.bold.fontWeight};
          color: ${resumeDesignSystem.emphasis.bold.color};
          margin-bottom: ${getSpacing('microGap', printMode)};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
        }
        
        .education-degree, .patent-details {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-date, .patent-date {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.emphasis.italic.color};
          font-style: ${resumeDesignSystem.emphasis.italic.fontStyle};
          font-weight: ${resumeDesignSystem.emphasis.italic.fontWeight};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
        }
        
        .patent-title-link {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          font-weight: ${resumeDesignSystem.emphasis.bold.fontWeight};
          color: ${resumeDesignSystem.emphasis.bold.color};
          text-decoration: none;
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          transition: ${resumeDesignSystem.links.transition};
        }
        
        .patent-title-link:hover {
          color: ${resumeDesignSystem.links.hoverColor};
        }
        
        .patent-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-left {
          flex: 1;
        }
        
        .patent-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }
        
        .patent-link {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.links.color};
          text-decoration: ${resumeDesignSystem.links.textDecoration};
          text-underline-offset: ${resumeDesignSystem.links.textUnderlineOffset};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          transition: ${resumeDesignSystem.links.transition};
          margin-top: ${getSpacing('microGap', printMode)};
        }
        
        .patent-link:hover {
          color: ${resumeDesignSystem.links.hoverColor};
        }
        
        .patent-description {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-company {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
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
                {edu.studyType}{edu.area && `, ${edu.area}`}
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
              <div className="patent-header">
                <div className="patent-left">
                  {patent.url ? (
                    <a href={patent.url} className="patent-title-link" target="_blank" rel="noopener noreferrer">
                      {patent.title}
                    </a>
                  ) : (
                    <div className="patent-title">{patent.title}</div>
                  )}
                </div>
                <div className="patent-right">
                  <div className="patent-date">{patent.date}</div>
                  {patent.url && (
                    <a href={patent.url} className="patent-link" target="_blank" rel="noopener noreferrer">
                      View Patent
                    </a>
                  )}
                </div>
              </div>
              <div className="patent-company">Microsoft Technology Licensing, LLC</div>
              {patent.summary && (
                <div className="patent-description">{patent.summary}</div>
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