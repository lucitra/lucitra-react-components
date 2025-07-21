import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeSingleColumnNew = ({ skills, education, patents, printMode = false }) => {
  const { typography, links } = resumeDesignSystem;
  
  return (
    <>
      <style jsx={true}>{`
        .single-column-section {
          margin-bottom: ${getSpacing('sectionGap', printMode)};
        }
        
        .section {
          margin-bottom: ${getSpacing('sectionGap', printMode)};
        }
        
        .section-title {
          font-size: ${printMode ? typography.headerText.fontSize.print : typography.headerText.fontSize.screen};
          font-weight: ${typography.headerText.fontWeight};
          margin-bottom: ${getSpacing('headerGap', printMode)};
          color: ${typography.headerText.color};
          text-transform: ${typography.headerText.textTransform};
          letter-spacing: ${typography.headerText.letterSpacing};
          line-height: ${printMode ? typography.headerText.lineHeight.print : typography.headerText.lineHeight.screen};
        }
        
        .skills-list {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${typography.bodyText.color};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${printMode ? '0.25rem' : '20px'};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-item, .patent-item {
          margin-bottom: ${getSpacing('itemGap', printMode)};
        }
        
        .education-institution, .patent-title {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          font-weight: ${resumeDesignSystem.emphasis.bold.fontWeight};
          color: ${resumeDesignSystem.emphasis.bold.color};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-degree {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${typography.bodyText.color};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-date, .patent-date {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.emphasis.italic.color};
          font-style: ${resumeDesignSystem.emphasis.italic.fontStyle};
          font-weight: ${resumeDesignSystem.emphasis.italic.fontWeight};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
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
        
        .patent-description {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-title-link {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          font-weight: ${resumeDesignSystem.emphasis.bold.fontWeight};
          color: ${resumeDesignSystem.emphasis.bold.color};
          text-decoration: none;
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          transition: ${links.transition};
        }
        
        .patent-title-link:hover {
          color: ${links.hoverColor};
        }
        
        .patent-company-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-company {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${typography.bodyText.color};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
        }
        
        .patent-link-inline {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${links.color};
          text-decoration: ${links.textDecoration};
          text-underline-offset: ${links.textUnderlineOffset};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          transition: ${links.transition};
        }
        
        .patent-link-inline:hover {
          color: ${links.hoverColor};
        }
        
        .patent-link {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${links.color};
          text-decoration: ${links.textDecoration};
          text-underline-offset: ${links.textUnderlineOffset};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          transition: ${links.transition};
          margin-top: ${getSpacing('microGap', printMode)};
        }
        
        .patent-link:hover {
          color: ${links.hoverColor};
        }
      `}</style>
      
      <div className="single-column-section">
        {/* Skills Section */}
        <div className="section">
          <h3 className="section-title">Skills</h3>
          {skills && skills.map((skillColumn, columnIndex) => (
            <div key={columnIndex} className="skills-list">
              {skillColumn.items.join(', ')}
            </div>
          ))}
        </div>

        {/* Education Section - Two Columns */}
        <div className="section">
          <h3 className="section-title">Education</h3>
          <div className="education-section">
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
        </div>

        {/* Patents Section */}
        <div className="section">
          <h3 className="section-title">Patents</h3>
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
                </div>
              </div>
              <div className="patent-company-row">
                <div className="patent-company">Microsoft Technology Licensing, LLC</div>
                {patent.url && (
                  <a href={patent.url} className="patent-link-inline" target="_blank" rel="noopener noreferrer">
                    View Patent
                  </a>
                )}
              </div>
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

ResumeSingleColumnNew.propTypes = {
  skills: PropTypes.array,
  education: PropTypes.array,
  patents: PropTypes.array,
  printMode: PropTypes.bool
};

ResumeSingleColumnNew.defaultProps = {
  skills: [],
  education: [],
  patents: [],
  printMode: false
};

export { ResumeSingleColumnNew };