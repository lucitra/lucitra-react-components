import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeSingleColumn = ({ skills, education, printMode = false, useSerifFont = false, designSystem = resumeDesignSystem }) => {
  return (
    <>
      <style jsx={true}>{`
        .single-column-section {
          margin-bottom: ${printMode ? '0.04rem' : getSpacing('sectionGap', false, designSystem)};
        }
        
        .section {
          margin-bottom: ${printMode ? '0.04rem' : getSpacing('sectionGap', false, designSystem)};
        }
        
        .section-title {
          font-size: ${printMode ? designSystem.typography.headerText.fontSize.print : designSystem.typography.headerText.fontSize.screen};
          font-weight: ${designSystem.typography.headerText.fontWeight};
          font-family: ${designSystem.typography.headerText.fontFamily};
          margin-bottom: ${printMode ? '0.03cm' : getSpacing('headerGap', false, designSystem)};
          color: ${designSystem.typography.headerText.color};
          text-transform: ${designSystem.typography.headerText.textTransform};
          letter-spacing: ${designSystem.typography.headerText.letterSpacing};
          line-height: ${printMode ? designSystem.typography.headerText.lineHeight.print : designSystem.typography.headerText.lineHeight.screen};
        }
        
        .skills-list {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .education-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${printMode ? '0.15rem' : '16px'};
          margin-bottom: ${printMode ? '0.03cm' : '6px'};
        }
        
        .education-item, .patent-item {
          margin-bottom: ${getSpacing('itemGap', printMode, designSystem)};
        }
        
        .education-institution, .patent-title {
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
        
        .patent-company-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .patent-company {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .patent-link-inline {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.links.color};
          text-decoration: ${designSystem.links.textDecoration};
          text-underline-offset: ${designSystem.links.textUnderlineOffset};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          transition: ${designSystem.links.transition};
        }
        
        .patent-link-inline:hover {
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
        
        .patent-description {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
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

      </div>
    </>
  );
};

ResumeSingleColumn.propTypes = {
  skills: PropTypes.array,
  education: PropTypes.array,
  printMode: PropTypes.bool,
  useSerifFont: PropTypes.bool,
  designSystem: PropTypes.object
};

ResumeSingleColumn.defaultProps = {
  skills: [],
  education: [],
  printMode: false,
  useSerifFont: false,
  designSystem: resumeDesignSystem
};

export { ResumeSingleColumn };