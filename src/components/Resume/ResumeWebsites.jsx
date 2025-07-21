import React from 'react';
import PropTypes from 'prop-types';

const ResumeWebsites = ({ websites, printMode = false }) => {
  if (!websites || websites.length === 0) return null;

  const filteredWebsites = websites.filter(website => 
    printMode ? website.visibility.print : website.visibility.online
  );

  if (filteredWebsites.length === 0) return null;

  return (
    <>
      <style jsx={true}>{`
        .websites-section {
          margin-bottom: ${printMode ? '16px' : '20px'};
        }
        
        .section-title {
          font-size: ${printMode ? '12px' : '14px'};
          font-weight: bold;
          margin-bottom: ${printMode ? '8px' : '10px'};
          color: #000;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .websites-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .website-item {
          font-size: ${printMode ? '10px' : '11px'};
          color: #444;
          margin-bottom: ${printMode ? '4px' : '6px'};
          position: relative;
          padding-left: 12px;
        }
        
        .website-item:before {
          content: '•';
          color: #666;
          position: absolute;
          left: 0;
        }
        
        .website-link {
          color: #333;
          text-decoration: none;
        }
        
        .website-link:hover {
          text-decoration: underline;
        }
        
        @media print {
          .websites-section {
            margin-bottom: 12px;
          }
          
          .section-title {
            font-size: 11px;
            margin-bottom: 6px;
          }
          
          .website-item {
            font-size: 9px;
            margin-bottom: 3px;
          }
        }
      `}</style>
      
      <section className="websites-section">
        <h2 className="section-title">Websites, Portfolios, Profiles</h2>
        <ul className="websites-list">
          {filteredWebsites.map((website, index) => (
            <li key={index} className="website-item">
              <a 
                href={website.url} 
                className="website-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {website.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

ResumeWebsites.propTypes = {
  websites: PropTypes.array,
  printMode: PropTypes.bool
};

ResumeWebsites.defaultProps = {
  websites: [],
  printMode: false
};

export { ResumeWebsites };