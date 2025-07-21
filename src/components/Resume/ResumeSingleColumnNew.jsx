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
          font-size: ${printMode ? typography.sectionTitle.fontSize.print : typography.sectionTitle.fontSize.screen};
          font-weight: ${typography.sectionTitle.fontWeight};
          margin-bottom: ${getSpacing('headerGap', printMode)};
          color: ${typography.sectionTitle.color};
          text-transform: ${typography.sectionTitle.textTransform};
          letter-spacing: ${typography.sectionTitle.letterSpacing};
          line-height: ${printMode ? typography.sectionTitle.lineHeight.print : typography.sectionTitle.lineHeight.screen};
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
          font-size: ${printMode ? typography.keyInfo.fontSize.print : typography.keyInfo.fontSize.screen};
          font-weight: ${typography.keyInfo.fontWeight};
          color: ${typography.keyInfo.color};
          line-height: ${printMode ? typography.keyInfo.lineHeight.print : typography.keyInfo.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-degree {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${typography.bodyText.color};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-date, .patent-date {
          font-size: ${printMode ? typography.metaText.fontSize.print : typography.metaText.fontSize.screen};
          color: ${typography.metaText.color};
          font-style: ${typography.metaText.fontStyle};
          line-height: ${printMode ? typography.metaText.lineHeight.print : typography.metaText.lineHeight.screen};
        }
        
        .patent-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-title-wrapper {
          flex: 1;
        }
        
        .patent-title-link {
          font-size: ${printMode ? typography.keyInfo.fontSize.print : typography.keyInfo.fontSize.screen};
          font-weight: ${typography.keyInfo.fontWeight};
          color: ${links.color};
          text-decoration: none;
          line-height: ${printMode ? typography.keyInfo.lineHeight.print : typography.keyInfo.lineHeight.screen};
          transition: ${links.transition};
        }
        
        .patent-title-link:hover {
          color: ${links.hoverColor};
        }
        
        .patent-company {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${typography.bodyText.color};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-link {
          font-size: ${printMode ? typography.bodyText.fontSize.print : typography.bodyText.fontSize.screen};
          color: ${links.color};
          text-decoration: ${links.textDecoration};
          text-underline-offset: ${links.textUnderlineOffset};
          line-height: ${printMode ? typography.bodyText.lineHeight.print : typography.bodyText.lineHeight.screen};
          display: block;
          margin-bottom: ${getSpacing('microGap', printMode)};
          transition: ${links.transition};
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
                <div className="patent-title-wrapper">
                  {patent.url ? (
                    <a href={patent.url} className="patent-title-link" target="_blank" rel="noopener noreferrer">
                      {patent.title}
                    </a>
                  ) : (
                    <div className="patent-title">{patent.title}</div>
                  )}
                </div>
                <div className="patent-date">{patent.date}</div>
              </div>
              <div className="patent-company">Microsoft Technology Licensing, LLC</div>
              {patent.url && (
                <a href={patent.url} className="patent-link" target="_blank" rel="noopener noreferrer">
                  US Patent #{patent.awarder.match(/#(\d+,\d+)/)?.[1] || '11,250,716'}
                </a>
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