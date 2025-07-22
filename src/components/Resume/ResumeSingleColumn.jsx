import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeSingleColumn = ({ skills, education, patents, printMode = false, useSerifFont = false }) => {
  return (
    <>
      <style jsx={true}>{`
        .single-column-section {
          margin-bottom: ${printMode ? '0.04rem' : getSpacing('sectionGap', false)};
        }
        
        .section {
          margin-bottom: ${printMode ? '0.04rem' : getSpacing('sectionGap', false)};
        }
        
        .section-title {
          font-size: ${printMode ? resumeDesignSystem.typography.headerText.fontSize.print : resumeDesignSystem.typography.headerText.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.headerText.fontWeight};
          font-family: ${useSerifFont ? resumeDesignSystem.layout.serifFontFamily : 'inherit'};
          margin-bottom: ${printMode ? '0.03cm' : getSpacing('headerGap', false)};
          color: ${resumeDesignSystem.typography.headerText.color};
          text-transform: ${resumeDesignSystem.typography.headerText.textTransform};
          letter-spacing: ${resumeDesignSystem.typography.headerText.letterSpacing};
          line-height: ${printMode ? resumeDesignSystem.typography.headerText.lineHeight.print : resumeDesignSystem.typography.headerText.lineHeight.screen};
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
          gap: ${printMode ? '0.15rem' : '16px'};
          margin-bottom: ${printMode ? '0.03cm' : '6px'};
        }
        
        .education-item, .patent-item {
          margin-bottom: ${getSpacing('itemGap', printMode)};
        }
        
        .education-institution, .patent-title {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          font-weight: ${useSerifFont ? resumeDesignSystem.emphasis.boldSerif.fontWeight : resumeDesignSystem.emphasis.bold.fontWeight};
          color: ${useSerifFont ? resumeDesignSystem.emphasis.boldSerif.color : resumeDesignSystem.emphasis.bold.color};
          font-family: ${useSerifFont ? resumeDesignSystem.emphasis.boldSerif.fontFamily : 'inherit'};
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
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
        }
        
        .education-courses {
          margin-top: ${getSpacing('microGap', printMode)};
        }
        
        .education-course {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .education-coursework {
          margin-top: ${getSpacing('microGap', printMode)};
        }
        
        .coursework-label {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          font-weight: ${resumeDesignSystem.emphasis.bold.fontWeight};
          color: ${resumeDesignSystem.emphasis.bold.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .coursework-content {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
        }
        
        .coursework-institution {
          margin-bottom: ${getSpacing('itemGap', printMode)};
        }
        
        .coursework-school {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          font-weight: ${resumeDesignSystem.emphasis.bold.fontWeight};
          color: ${resumeDesignSystem.emphasis.bold.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-title-link {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          font-weight: ${useSerifFont ? resumeDesignSystem.emphasis.boldSerif.fontWeight : resumeDesignSystem.emphasis.bold.fontWeight};
          color: ${useSerifFont ? resumeDesignSystem.emphasis.boldSerif.color : resumeDesignSystem.emphasis.bold.color};
          font-family: ${useSerifFont ? resumeDesignSystem.emphasis.boldSerif.fontFamily : 'inherit'};
          text-decoration: none;
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
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
          transition: ${resumeDesignSystem.links.transition};
          margin-top: ${getSpacing('microGap', printMode)};
        }
        
        .patent-link:hover {
          color: ${resumeDesignSystem.links.hoverColor};
        }
        
        .patent-company-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-company {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
        }
        
        .patent-link-inline {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.links.color};
          text-decoration: ${resumeDesignSystem.links.textDecoration};
          text-underline-offset: ${resumeDesignSystem.links.textUnderlineOffset};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          transition: ${resumeDesignSystem.links.transition};
        }
        
        .patent-link-inline:hover {
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
        
        .patent-description {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
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
                  {edu.endDate ? `Graduated ${edu.endDate}` : 'In Progress'}
                </div>
                {edu.courses && edu.courses.length > 0 && (
                  <div className="education-courses">
                    {edu.courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="education-course">• {course}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Coursework Section - Full Width Below Education */}
        {education && education.some(edu => edu.relevantCoursework && edu.relevantCoursework.length > 0) && (
          <div className="section">
            <h3 className="section-title">Relevant Coursework</h3>
            <div className="coursework-content">
              {education
                .filter(edu => edu.relevantCoursework && edu.relevantCoursework.length > 0)
                .map(edu => edu.relevantCoursework.join(', '))
                .join(', ')}
            </div>
          </div>
        )}

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

ResumeSingleColumn.propTypes = {
  skills: PropTypes.array,
  education: PropTypes.array,
  patents: PropTypes.array,
  printMode: PropTypes.bool,
  useSerifFont: PropTypes.bool
};

ResumeSingleColumn.defaultProps = {
  skills: [],
  education: [],
  patents: [],
  printMode: false,
  useSerifFont: false
};

export { ResumeSingleColumn };