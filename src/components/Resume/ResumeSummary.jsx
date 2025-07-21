import React from 'react';
import PropTypes from 'prop-types';

const ResumeSummary = ({ summary, printMode = false }) => {
  if (!summary) return null;

  return (
    <>
      <style jsx={true}>{`
        .summary-section {
          margin-bottom: ${printMode ? '0.15rem' : '20px'};
        }
        
        .section-title {
          font-size: ${printMode ? '14pt' : '14px'};
          font-weight: bold;
          margin-bottom: ${printMode ? '0.1cm' : '8px'};
          color: #000;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          line-height: ${printMode ? '1.3' : '1.2'};
        }
        
        .summary-content {
          font-size: ${printMode ? '10pt' : '11px'};
          line-height: ${printMode ? '1.5' : '1.5'};
          color: #444;
          text-align: justify;
          margin: 0;
        }
        
        @media print {
          .summary-section {
            margin-bottom: 0.15rem;
          }
          
          .section-title {
            font-size: 14pt;
            margin-bottom: 0.1cm;
          }
          
          .summary-content {
            font-size: 10pt;
            line-height: 1.5;
          }
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