import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeSingleColumn = ({ skills, education, patents, printMode = false }) => {
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
          font-size: ${printMode ? resumeDesignSystem.typography.sectionTitle.fontSize.print : resumeDesignSystem.typography.sectionTitle.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.sectionTitle.fontWeight};
          margin-bottom: ${getSpacing('headerGap', printMode)};
          color: ${resumeDesignSystem.typography.sectionTitle.color};
          text-transform: ${resumeDesignSystem.typography.sectionTitle.textTransform};
          letter-spacing: ${resumeDesignSystem.typography.sectionTitle.letterSpacing};
          line-height: ${printMode ? resumeDesignSystem.typography.sectionTitle.lineHeight.print : resumeDesignSystem.typography.sectionTitle.lineHeight.screen};
        }
        
        .skills-list {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${printMode ? '0.25rem' : '20px'};
          margin-bottom: ${printMode ? '0.05cm' : '8px'};
        }
        
        .education-item, .patent-item {
          margin-bottom: ${getSpacing('itemGap', printMode)};
        }
        
        .education-institution, .patent-title {
          font-size: ${printMode ? resumeDesignSystem.typography.keyInfo.fontSize.print : resumeDesignSystem.typography.keyInfo.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.keyInfo.fontWeight};
          color: ${resumeDesignSystem.typography.keyInfo.color};
          margin-bottom: ${getSpacing('microGap', printMode)};
          line-height: ${printMode ? resumeDesignSystem.typography.keyInfo.lineHeight.print : resumeDesignSystem.typography.keyInfo.lineHeight.screen};
        }
        
        .education-degree, .patent-details {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-date, .patent-date {
          font-size: ${printMode ? resumeDesignSystem.typography.metaText.fontSize.print : resumeDesignSystem.typography.metaText.fontSize.screen};
          color: ${resumeDesignSystem.typography.metaText.color};
          font-style: ${resumeDesignSystem.typography.metaText.fontStyle};
          line-height: ${printMode ? resumeDesignSystem.typography.metaText.lineHeight.print : resumeDesignSystem.typography.metaText.lineHeight.screen};
        }
        
        .patent-title-link {
          font-size: ${printMode ? resumeDesignSystem.typography.keyInfo.fontSize.print : resumeDesignSystem.typography.keyInfo.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.keyInfo.fontWeight};
          color: ${resumeDesignSystem.links.color};
          text-decoration: none;
          line-height: ${printMode ? resumeDesignSystem.typography.keyInfo.lineHeight.print : resumeDesignSystem.typography.keyInfo.lineHeight.screen};
          transition: ${resumeDesignSystem.links.transition};
        }
        
        .patent-title-link:hover {
          color: ${resumeDesignSystem.links.hoverColor};
        }
        
        .patent-link {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.links.color};
          text-decoration: ${resumeDesignSystem.links.textDecoration};
          text-underline-offset: ${resumeDesignSystem.links.textUnderlineOffset};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          display: block;
          margin-bottom: ${getSpacing('microGap', printMode)};
          transition: ${resumeDesignSystem.links.transition};
        }
        
        .patent-link:hover {
          color: ${resumeDesignSystem.links.hoverColor};
        }
        
        .patent-company {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
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

        {/* Education Section */}
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

ResumeSingleColumn.propTypes = {
  skills: PropTypes.array,
  education: PropTypes.array,
  patents: PropTypes.array,
  printMode: PropTypes.bool
};

ResumeSingleColumn.defaultProps = {
  skills: [],
  education: [],
  patents: [],
  printMode: false
};

export { ResumeSingleColumn };