import React from 'react';
import PropTypes from 'prop-types';

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
          margin-bottom: ${printMode ? '0' : '20px'};
        }
        
        .section-title {
          font-size: ${printMode ? '14pt' : '14px'};
          font-weight: bold;
          margin-bottom: ${printMode ? '0.1cm' : '12px'};
          color: #000;
          text-transform: uppercase;
          letter-spacing: 0.2px;
          line-height: ${printMode ? '1.3' : '1.2'};
        }
        
        .work-item {
          margin-bottom: ${printMode ? '0.05cm' : '16px'};
          page-break-inside: avoid;
        }
        
        .work-item:last-child {
          margin-bottom: 0;
        }
        
        .company-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: ${printMode ? '0.05cm' : '6px'};
        }
        
        .company-name {
          font-size: ${printMode ? '11pt' : '12px'};
          font-weight: bold;
          color: #000;
          line-height: ${printMode ? '1.5' : '1.2'};
        }
        
        .company-location {
          font-size: ${printMode ? '9pt' : '10px'};
          color: #666;
          font-style: italic;
          line-height: ${printMode ? '1.5' : '1.2'};
        }
        
        .position {
          margin-bottom: ${printMode ? '0.05cm' : '8px'};
        }
        
        .position-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: ${printMode ? '0.05cm' : '2px'};
        }
        
        .position-title {
          font-size: ${printMode ? '10pt' : '11px'};
          font-weight: normal;
          font-style: italic;
          color: #333;
          line-height: ${printMode ? '1.5' : '1.2'};
        }
        
        .position-dates {
          font-size: ${printMode ? '9pt' : '10px'};
          color: #666;
          font-style: italic;
          line-height: ${printMode ? '1.5' : '1.2'};
        }
        
        .highlights {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: ${printMode ? '0.05cm' : '4px'};
        }
        
        .highlight {
          font-size: ${printMode ? '10pt' : '10px'};
          color: #444;
          line-height: ${printMode ? '1.5' : '1.4'};
          margin-bottom: ${printMode ? '0.05cm' : '4px'};
          position: relative;
          padding-left: ${printMode ? '8px' : '8px'};
        }
        
        .highlight:before {
          content: '•';
          color: #666;
          position: absolute;
          left: 0;
          font-size: ${printMode ? '9pt' : '10px'};
        }
        
        @media print {
          .experience-section {
            margin-bottom: 0;
          }
          
          .section-title {
            font-size: 14pt;
            margin-bottom: 0.1cm;
          }
          
          .work-item {
            margin-bottom: 0.05cm;
          }
          
          .company-header {
            margin-bottom: 0.05cm;
          }
          
          .company-name {
            font-size: 11pt;
          }
          
          .company-location {
            font-size: 9pt;
          }
          
          .position {
            margin-bottom: 0.05cm;
          }
          
          .position-title {
            font-size: 10pt;
          }
          
          .position-dates {
            font-size: 9pt;
          }
          
          .highlight {
            font-size: 10pt;
            margin-bottom: 0.05cm;
            line-height: 1.5;
          }
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
                      {position.highlights.slice(0, printMode ? 3 : 4).map((highlight, highlightIndex) => (
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
                    {workItem.highlights.slice(0, printMode ? 3 : 4).map((highlight, highlightIndex) => (
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