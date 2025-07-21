import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeExperience = ({ work, printMode = false, maxItems }) => {
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
          margin-bottom: ${printMode ? '0' : getSpacing('sectionGap', false)};
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
        
        .work-item {
          margin-bottom: ${getSpacing('itemGap', printMode)};
          page-break-inside: avoid;
        }
        
        .work-item:last-child {
          margin-bottom: 0;
        }
        
        .company-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .company-name {
          font-size: ${printMode ? resumeDesignSystem.typography.keyInfo.fontSize.print : resumeDesignSystem.typography.keyInfo.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.keyInfo.fontWeight};
          color: ${resumeDesignSystem.typography.keyInfo.color};
          line-height: ${printMode ? resumeDesignSystem.typography.keyInfo.lineHeight.print : resumeDesignSystem.typography.keyInfo.lineHeight.screen};
        }
        
        .company-location {
          font-size: ${printMode ? resumeDesignSystem.typography.metaText.fontSize.print : resumeDesignSystem.typography.metaText.fontSize.screen};
          color: ${resumeDesignSystem.typography.metaText.color};
          font-style: ${resumeDesignSystem.typography.metaText.fontStyle};
          line-height: ${printMode ? resumeDesignSystem.typography.metaText.lineHeight.print : resumeDesignSystem.typography.metaText.lineHeight.screen};
        }
        
        .position {
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .position-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .position-title {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          font-weight: normal;
          font-style: italic;
          color: #333;
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
        }
        
        .position-dates {
          font-size: ${printMode ? resumeDesignSystem.typography.metaText.fontSize.print : resumeDesignSystem.typography.metaText.fontSize.screen};
          color: ${resumeDesignSystem.typography.metaText.color};
          font-style: ${resumeDesignSystem.typography.metaText.fontStyle};
          line-height: ${printMode ? resumeDesignSystem.typography.metaText.lineHeight.print : resumeDesignSystem.typography.metaText.lineHeight.screen};
        }
        
        .highlights {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: ${getSpacing('microGap', printMode)};
        }
        
        .highlight {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
          position: relative;
          padding-left: ${printMode ? '8px' : '8px'};
        }
        
        .highlight:before {
          content: '•';
          color: ${resumeDesignSystem.colors.bullet};
          position: absolute;
          left: 0;
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
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
                      {formatDate(position.startDate)} - {formatDate(position.endDate)}
                    </div>
                  </div>
                  {position.highlights && position.highlights.length > 0 && (
                    <ul className="highlights">
                      {position.highlights.slice(0, printMode ? 2 : 4).map((highlight, highlightIndex) => (
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
                    {workItem.highlights.slice(0, printMode ? 2 : 4).map((highlight, highlightIndex) => (
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
  maxItems: PropTypes.number
};

ResumeExperience.defaultProps = {
  work: [],
  printMode: false,
  maxItems: null
};

export { ResumeExperience };