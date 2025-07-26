import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeThreeColumn = ({ skills, education, printMode = false, useSerifFont = false, designSystem = resumeDesignSystem }) => {
  // Now always use 2 columns since patents moved to bottom
  const gridColumns = '1fr 1fr';
  
  return (
    <>
      <style jsx={true}>{`
        .three-column-section {
          display: grid;
          grid-template-columns: ${gridColumns};
          gap: ${printMode ? '0.05rem' : '12px'};
          margin-bottom: ${printMode ? '0' : getSpacing('sectionGap', false, designSystem)};
        }
        
        .column {
          min-height: ${printMode ? 'auto' : '120px'};
        }
        
        /* When in 2-column mode, give columns more breathing room */
        .three-column-section:has(.column:nth-child(2):last-child) .column {
          max-width: ${printMode ? 'none' : '400px'};
        }
        
        .column-title {
          font-size: ${printMode ? designSystem.typography.headerText.fontSize.print : designSystem.typography.headerText.fontSize.screen};
          font-weight: ${designSystem.typography.headerText.fontWeight};
          font-family: ${designSystem.typography.headerText.fontFamily};
          margin-bottom: ${getSpacing('headerGap', printMode, designSystem)};
          color: ${designSystem.typography.headerText.color};
          text-transform: ${designSystem.typography.headerText.textTransform};
          letter-spacing: ${designSystem.typography.headerText.letterSpacing};
          border-bottom: ${printMode ? 'none' : `1px solid ${designSystem.colors.divider}`};
          padding-bottom: ${printMode ? '0' : '2px'};
          line-height: ${printMode ? designSystem.typography.headerText.lineHeight.print : designSystem.typography.headerText.lineHeight.screen};
        }
        
        .skills-category {
          margin-bottom: ${printMode ? '0.03cm' : '8px'};
        }
        
        .skills-category-title {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-weight: bold;
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: #333;
          margin-bottom: ${printMode ? '0.025cm' : '4px'};
        }
        
        .skills-list {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .education-item, .patent-item {
          margin-bottom: ${getSpacing('itemGap', printMode, designSystem)};
        }
        
        .education-institution {
          font-size: ${printMode ? designSystem.typography.companyText.fontSize.print : designSystem.typography.companyText.fontSize.screen};
          font-weight: ${designSystem.typography.companyText.fontWeight};
          color: ${designSystem.typography.companyText.color};
          font-family: ${useSerifFont ? designSystem.emphasis.boldSerif.fontFamily : designSystem.typography.companyText.fontFamily};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
          line-height: ${printMode ? designSystem.typography.companyText.lineHeight.print : designSystem.typography.companyText.lineHeight.screen};
        }
        
        .patent-title {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-weight: ${useSerifFont ? designSystem.emphasis.boldSerif.fontWeight : designSystem.emphasis.bold.fontWeight};
          color: ${useSerifFont ? designSystem.emphasis.boldSerif.color : designSystem.emphasis.bold.color};
          font-family: ${useSerifFont ? designSystem.emphasis.boldSerif.fontFamily : designSystem.typography.bodyText.fontFamily};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .education-degree, .patent-details {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .education-date, .patent-date {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .education-courses {
          margin-top: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .education-course {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .education-coursework {
          margin-top: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .coursework-label {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-weight: ${designSystem.emphasis.bold.fontWeight};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.emphasis.bold.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .coursework-content {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .coursework-section {
          margin-top: ${getSpacing('sectionGap', printMode, designSystem)};
        }
        
        .coursework-institution {
          margin-bottom: ${getSpacing('itemGap', printMode, designSystem)};
        }
        
        .coursework-school {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-weight: ${designSystem.emphasis.bold.fontWeight};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.emphasis.bold.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .patent-title-link {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-weight: ${useSerifFont ? designSystem.emphasis.boldSerif.fontWeight : designSystem.emphasis.bold.fontWeight};
          color: ${useSerifFont ? designSystem.emphasis.boldSerif.color : designSystem.emphasis.bold.color};
          font-family: ${useSerifFont ? designSystem.emphasis.boldSerif.fontFamily : designSystem.typography.bodyText.fontFamily};
          text-decoration: none;
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          transition: ${designSystem.links.transition};
        }
        
        .patent-title-link:hover {
          color: ${designSystem.links.hoverColor};
        }
        
        .patent-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
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
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.links.color};
          text-decoration: ${designSystem.links.textDecoration};
          text-underline-offset: ${designSystem.links.textUnderlineOffset};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          transition: ${designSystem.links.transition};
          margin-top: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .patent-link:hover {
          color: ${designSystem.links.hoverColor};
        }
        
        .patent-description {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .patent-company {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
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
  useSerifFont: PropTypes.bool,
  designSystem: PropTypes.object
};

ResumeThreeColumn.defaultProps = {
  skills: [],
  education: [],
  printMode: false,
  useSerifFont: false,
  designSystem: resumeDesignSystem
};

export { ResumeThreeColumn };