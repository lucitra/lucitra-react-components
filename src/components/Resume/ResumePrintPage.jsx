import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Resume from './Resume.jsx';

const ResumePrintPage = ({ data, config = { printMode: true } }) => {
  useEffect(() => {
    // Auto-trigger print dialog after component loads
    const timer = setTimeout(() => {
      window.print();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="print-only-page">
      <style jsx={true} global={true}>{`
        /* Hide everything on page except resume when printing */
        @media print {
          body { margin: 0; padding: 0; }
          .print-only-page { 
            width: 100vw; 
            height: 100vh; 
            margin: 0; 
            padding: 0; 
          }
        }
        
        /* Hide from screen, show only on print */
        @media screen {
          .print-only-page {
            padding: 20px;
            max-width: 8.5in;
            margin: 0 auto;
          }
        }
      `}</style>
      
      <Resume 
        data={data} 
        config={{
          ...config,
          printMode: true,
          filterByVisibility: true
        }} 
      />
    </div>
  );
};

ResumePrintPage.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object
};

ResumePrintPage.defaultProps = {
  data: null,
  config: { printMode: true }
};

export { ResumePrintPage };