import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumePatents = ({ patents, printMode = false, useSerifFont = false, designSystem = resumeDesignSystem }) => {
  // Only render if patents exist and have visible items
  const visiblePatents = patents?.filter(patent => 
    printMode ? patent.visibility?.print : patent.visibility?.online
  ) || [];
  
  if (visiblePatents.length === 0) {
    return null;
  }

  return (
    <>
      <style jsx={true}>{`
        .patents-section {
          margin-top: ${getSpacing('sectionGap', printMode, designSystem)};
          margin-bottom: ${getSpacing('sectionGap', printMode, designSystem)};
        }
        
        .patents-title {
          font-size: ${printMode ? designSystem.typography.headerText.fontSize.print : designSystem.typography.headerText.fontSize.screen};
          font-weight: ${designSystem.typography.headerText.fontWeight};
          font-family: ${designSystem.typography.headerText.fontFamily};
          margin-bottom: ${getSpacing('headerGap', printMode, designSystem)};
          color: ${designSystem.typography.headerText.color};
          text-transform: ${designSystem.typography.headerText.textTransform};
          letter-spacing: ${designSystem.typography.headerText.letterSpacing};
          line-height: ${printMode ? designSystem.typography.headerText.lineHeight.print : designSystem.typography.headerText.lineHeight.screen};
        }
        
        .patent-item {
          margin-bottom: ${getSpacing('itemGap', printMode, designSystem)};
        }
        
        .patent-item:last-child {
          margin-bottom: 0;
        }
        
        .patent-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .patent-left {
          flex: 1;
          padding-right: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .patent-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          flex-shrink: 0;
        }
        
        .patent-title {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          font-weight: ${useSerifFont ? designSystem.emphasis.boldSerif.fontWeight : designSystem.emphasis.bold.fontWeight};
          color: ${useSerifFont ? designSystem.emphasis.boldSerif.color : designSystem.emphasis.bold.color};
          font-family: ${useSerifFont ? designSystem.emphasis.boldSerif.fontFamily : designSystem.typography.bodyText.fontFamily};
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
        
        .patent-date {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          color: ${designSystem.typography.bodyText.color};
          font-style: italic;
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .patent-link {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
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
        
        .patent-company {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode, designSystem)};
        }
        
        .patent-description {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          color: ${designSystem.typography.bodyText.color};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
      `}</style>
      
      <div className="patents-section">
        <h2 className="patents-title">Patents</h2>
        {visiblePatents.map((patent, index) => (
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
                {patent.awarder && (
                  <div className="patent-company">{patent.awarder}</div>
                )}
                {patent.summary && (
                  <div className="patent-description">{patent.summary}</div>
                )}
              </div>
              <div className="patent-right">
                <div className="patent-date">{patent.date}</div>
                {patent.url && printMode && (
                  <a href={patent.url} className="patent-link" target="_blank" rel="noopener noreferrer">
                    View Patent
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

ResumePatents.propTypes = {
  patents: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    awarder: PropTypes.string,
    summary: PropTypes.string,
    url: PropTypes.string,
    visibility: PropTypes.shape({
      online: PropTypes.bool,
      print: PropTypes.bool
    })
  })),
  printMode: PropTypes.bool,
  useSerifFont: PropTypes.bool,
  designSystem: PropTypes.object
};

ResumePatents.defaultProps = {
  patents: [],
  printMode: false,
  useSerifFont: false,
  designSystem: resumeDesignSystem
};

export { ResumePatents };