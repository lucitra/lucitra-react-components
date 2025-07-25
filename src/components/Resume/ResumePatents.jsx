import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumePatents = ({ patents, printMode = false, useSerifFont = false }) => {
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
          margin-top: ${getSpacing('sectionGap', printMode)};
          margin-bottom: ${getSpacing('sectionGap', printMode)};
        }
        
        .patents-title {
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
        
        .patent-item {
          margin-bottom: ${getSpacing('itemGap', printMode)};
        }
        
        .patent-item:last-child {
          margin-bottom: 0;
        }
        
        .patent-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-left {
          flex: 1;
          padding-right: ${getSpacing('microGap', printMode)};
        }
        
        .patent-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          flex-shrink: 0;
        }
        
        .patent-title {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          font-weight: ${useSerifFont ? resumeDesignSystem.emphasis.boldSerif.fontWeight : resumeDesignSystem.emphasis.bold.fontWeight};
          color: ${useSerifFont ? resumeDesignSystem.emphasis.boldSerif.color : resumeDesignSystem.emphasis.bold.color};
          font-family: ${useSerifFont ? resumeDesignSystem.emphasis.boldSerif.fontFamily : 'inherit'};
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
        
        .patent-date {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          font-style: italic;
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
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
        
        .patent-company {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          margin-bottom: ${getSpacing('microGap', printMode)};
        }
        
        .patent-description {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
        }
      `}</style>
      
      <div className="patents-section">
        <h3 className="patents-title">PATENTS</h3>
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
  useSerifFont: PropTypes.bool
};

ResumePatents.defaultProps = {
  patents: [],
  printMode: false,
  useSerifFont: false
};

export { ResumePatents };