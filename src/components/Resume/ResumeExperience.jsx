import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeExperience = ({ work, printMode = false, maxItems, useSerifFont = false, designSystem = resumeDesignSystem }) => {
  if (!work || work.length === 0) return null;

  const displayWork = maxItems ? work.slice(0, maxItems) : work;

  const formatDate = (date) => {
    if (!date || date === 'Present' || date === 'Current') return 'Present';
    
    // Handle full month names like "August 2024"
    if (date.includes(' ') && !date.includes('-')) {
      const [month, year] = date.split(' ');
      const monthMap = {
        'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
        'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
        'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
      };
      return `${monthMap[month] || month} ${year}`;
    }
    
    // Handle "2024-09" format
    const [year, month] = date.split('-');
    if (month) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    }
    
    return date;
  };

  return (
    <>
      <style jsx={true}>{`
        .experience-section {
          margin-bottom: ${printMode ? '0' : getSpacing('sectionGap', false, designSystem)};
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
        
        .work-item {
          margin-bottom: ${printMode ? '0.3cm' : '16px'};
          page-break-inside: avoid;
        }
        
        .work-item:last-child {
          margin-bottom: 0;
        }
        
        .company-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: ${printMode ? '0.1cm' : '6px'};
        }
        
        .company-name {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-weight: ${useSerifFont ? designSystem.emphasis.boldSerif.fontWeight : designSystem.emphasis.bold.fontWeight};
          color: ${useSerifFont ? designSystem.emphasis.boldSerif.color : designSystem.emphasis.bold.color};
          font-family: ${useSerifFont ? designSystem.emphasis.boldSerif.fontFamily : designSystem.typography.bodyText.fontFamily};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .company-location {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .position {
          margin-bottom: ${printMode ? '0.15cm' : '8px'};
        }
        
        .position-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .position-title {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-weight: ${useSerifFont ? designSystem.emphasis.boldSerif.fontWeight : designSystem.emphasis.bold.fontWeight};
          font-style: normal;
          color: ${useSerifFont ? designSystem.emphasis.boldSerif.color : designSystem.emphasis.bold.color};
          font-family: ${useSerifFont ? designSystem.emphasis.boldSerif.fontFamily : designSystem.typography.bodyText.fontFamily};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .position-dates {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          color: ${designSystem.typography.bodyText.color};
          font-style: italic;
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .highlights {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .highlight {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? '1.25' : '1.4'};
          margin-bottom: ${printMode ? '0.08cm' : '4px'};
          position: relative;
          padding-left: ${printMode ? '8px' : '8px'};
        }
        
        .highlight:before {
          content: '•';
          color: ${designSystem.colors.bullet};
          position: absolute;
          left: 0;
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
        }
      `}</style>
      
      <section className="experience-section">
        <h2 className="section-title">Professional Experience</h2>
        {displayWork.map((workItem, workIndex) => (
          <div key={workIndex} className="work-item">
            <div className="company-header">
              <div className="company-name">{workItem.company}</div>
              <div className="company-location">{workItem.location}</div>
            </div>
            
            {/* Handle multiple positions within the same company */}
            {workItem.positions && workItem.positions.length > 0 ? (
              workItem.positions.map((position, posIndex) => (
                <div key={posIndex} className="position">
                  <div className="position-header">
                    <div className="position-title">{position.title}</div>
                    <div className="position-dates">
                      {position.location && <span>{position.location} | </span>}
                      {formatDate(position.startDate)} - {formatDate(position.endDate)}
                    </div>
                  </div>
                  {position.highlights && position.highlights.length > 0 && (
                    <ul className="highlights">
                      {position.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="highlight">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              /* Fallback for legacy single position format */
              <div className="position">
                <div className="position-header">
                  <div className="position-title">{workItem.position || 'Position'}</div>
                  <div className="position-dates">
                    {formatDate(workItem.startDate)} - {formatDate(workItem.endDate)}
                  </div>
                </div>
                {workItem.highlights && workItem.highlights.length > 0 && (
                  <ul className="highlights">
                    {workItem.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="highlight">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
};

ResumeExperience.propTypes = {
  work: PropTypes.array,
  printMode: PropTypes.bool,
  maxItems: PropTypes.number,
  useSerifFont: PropTypes.bool,
  designSystem: PropTypes.object
};

ResumeExperience.defaultProps = {
  work: [],
  printMode: false,
  maxItems: null,
  useSerifFont: false
};

export { ResumeExperience };