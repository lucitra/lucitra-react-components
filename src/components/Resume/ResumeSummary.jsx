import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeSummary = ({ summary, printMode = false }) => {
  if (!summary) return null;

  return (
    <>
      <style jsx={true}>{`
        .summary-section {
          margin-bottom: ${printMode ? '0.04rem' : getSpacing('sectionGap', false)};
        }
        
        .section-title {
          font-size: ${printMode ? resumeDesignSystem.typography.headerText.fontSize.print : resumeDesignSystem.typography.headerText.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.headerText.fontWeight};
          margin-bottom: ${printMode ? '0.03cm' : getSpacing('headerGap', false)};
          color: ${resumeDesignSystem.typography.headerText.color};
          text-transform: ${resumeDesignSystem.typography.headerText.textTransform};
          letter-spacing: ${resumeDesignSystem.typography.headerText.letterSpacing};
          line-height: ${printMode ? resumeDesignSystem.typography.headerText.lineHeight.print : resumeDesignSystem.typography.headerText.lineHeight.screen};
        }
        
        .summary-content {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
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
  printMode: PropTypes.bool
};

ResumeSummary.defaultProps = {
  summary: '',
  printMode: false
};

export { ResumeSummary };