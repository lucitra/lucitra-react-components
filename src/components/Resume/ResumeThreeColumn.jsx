import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeThreeColumn = ({ skills, education, printMode = false, useSerifFont = false }) => {
  // Now always use 2 columns since patents moved to bottom
  const gridColumns = '1fr 1fr';
  
  return (
    <>
      <style jsx={true}>{`
        .three-column-section {
          display: grid;
          grid-template-columns: ${gridColumns};
          gap: ${printMode ? '0.05rem' : '12px'};
          margin-bottom: ${printMode ? '0' : getSpacing('sectionGap', false)};
        }
        
        .column {
          min-height: ${printMode ? 'auto' : '120px'};
        }
        
        /* When in 2-column mode, give columns more breathing room */
        .three-column-section:has(.column:nth-child(2):last-child) .column {
          max-width: ${printMode ? 'none' : '400px'};
        }
        
        .column-title {
          font-size: ${printMode ? resumeDesignSystem.typography.headerText.fontSize.print : resumeDesignSystem.typography.headerText.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.headerText.fontWeight};
          font-family: ${useSerifFont ? resumeDesignSystem.layout.serifFontFamily : 'inherit'};
          margin-bottom: ${getSpacing('headerGap', printMode)};
          color: ${resumeDesignSystem.typography.headerText.color};
          text-transform: ${resumeDesignSystem.typography.headerText.textTransform};
          letter-spacing: ${resumeDesignSystem.typography.headerText.letterSpacing};
          border-bottom: ${printMode ? 'none' : `1px solid ${resumeDesignSystem.colors.divider}`};
          padding-bottom: ${printMode ? '0' : '2px'};
          line-height: ${printMode ? resumeDesignSystem.typography.headerText.lineHeight.print : resumeDesignSystem.typography.headerText.lineHeight.screen};
        }
        
        .skills-category {
          margin-bottom: ${printMode ? '0.03cm' : '8px'};
        }
        
        .skills-category-title {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
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
        
        .coursework-section {
          margin-top: ${getSpacing('sectionGap', printMode)};
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
      
      {/* Relevant Coursework Section - Full Width Below Three Columns */}
      {education && education.some(edu => edu.relevantCoursework && edu.relevantCoursework.length > 0) && (
        <div className="coursework-section">
          <h3 className="column-title">Relevant Coursework</h3>
          <div className="coursework-content">
            {education
              .filter(edu => edu.relevantCoursework && edu.relevantCoursework.length > 0)
              .map(edu => edu.relevantCoursework.join(', '))
              .join(', ')}
          </div>
        </div>
      )}
    </>
  );
};

ResumeThreeColumn.propTypes = {
  skills: PropTypes.array,
  education: PropTypes.array,
  printMode: PropTypes.bool,
  useSerifFont: PropTypes.bool
};

ResumeThreeColumn.defaultProps = {
  skills: [],
  education: [],
  printMode: false,
  useSerifFont: false
};

export { ResumeThreeColumn };