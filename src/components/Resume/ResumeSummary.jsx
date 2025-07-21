import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeSummary = ({ summary, printMode = false }) => {
  if (!summary) return null;

  return (
    <>
      <style jsx={true}>{`
        .summary-section {
          margin-bottom: ${getSpacing('sectionGap', printMode)};
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
        
        .summary-content {
          font-size: ${printMode ? resumeDesignSystem.typography.summaryText.fontSize.print : resumeDesignSystem.typography.summaryText.fontSize.screen};
          line-height: ${printMode ? resumeDesignSystem.typography.summaryText.lineHeight.print : resumeDesignSystem.typography.summaryText.lineHeight.screen};
          color: ${resumeDesignSystem.typography.summaryText.color};
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