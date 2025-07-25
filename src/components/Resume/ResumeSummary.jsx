import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeSummary = ({ summary, printMode = false, showSummary = true, designSystem = resumeDesignSystem }) => {
  if (!summary || !showSummary) return null;

  return (
    <>
      <style jsx={true}>{`
        .summary-section {
          margin-bottom: ${printMode ? '0.025rem' : getSpacing('sectionGap', false)};
        }
        
        .section-title {
          font-size: ${printMode ? designSystem.typography.headerText.fontSize.print : designSystem.typography.headerText.fontSize.screen};
          font-weight: ${designSystem.typography.headerText.fontWeight};
          font-family: ${designSystem.typography.headerText.fontFamily};
          margin-bottom: ${printMode ? '0.02cm' : getSpacing('headerGap', false)};
          color: ${designSystem.typography.headerText.color};
          text-transform: ${designSystem.typography.headerText.textTransform};
          letter-spacing: ${designSystem.typography.headerText.letterSpacing};
          line-height: ${printMode ? designSystem.typography.headerText.lineHeight.print : designSystem.typography.headerText.lineHeight.screen};
        }
        
        .summary-content {
          font-family: ${designSystem.typography.bodyText.fontFamily};
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
          color: ${designSystem.typography.bodyText.color};
          text-align: justify;
          margin: 0;
        }
      `}</style>
      
      <section className="summary-section">
        <h2 className="section-title">Professional Summary</h2>
        <p className="summary-content">{summary}</p>
      </section>
    </>
  );
};

ResumeSummary.propTypes = {
  summary: PropTypes.string,
  printMode: PropTypes.bool,
  showSummary: PropTypes.bool,
  designSystem: PropTypes.object
};

ResumeSummary.defaultProps = {
  summary: '',
  printMode: false
};

export { ResumeSummary };