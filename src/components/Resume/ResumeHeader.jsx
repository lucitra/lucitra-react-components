import React from 'react';
import PropTypes from 'prop-types';

const ResumeHeader = ({ basics, printMode = false }) => {
  const { name, label, email, phone, website, location, profiles } = basics;

  return (
    <>
      <style jsx={true}>{`
        .header {
          text-align: center;
          margin-bottom: ${printMode ? '0.2rem' : '20px'};
          padding-bottom: ${printMode ? '0.05cm' : '16px'};
          border-bottom: ${printMode ? '1px solid #333' : '2px solid #333'};
        }
        
        .name {
          font-size: ${printMode ? '18pt' : '24px'};
          font-weight: bold;
          margin: 0;
          margin-bottom: ${printMode ? '0.1cm' : '8px'};
          letter-spacing: 0.3px;
          color: #000;
          line-height: ${printMode ? '1.2' : '1.2'};
        }
        
        .title {
          font-size: ${printMode ? '11pt' : '14px'};
          color: #555;
          margin: 0;
          margin-bottom: ${printMode ? '0.1cm' : '8px'};
          font-style: italic;
          line-height: ${printMode ? '1.2' : '1.2'};
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: ${printMode ? '4px' : '12px'};
          font-size: ${printMode ? '8.5pt' : '11px'};
          color: #666;
          margin: 0;
          line-height: ${printMode ? '1.3' : '1.2'};
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .contact-link {
          color: #333;
          text-decoration: none;
        }
        
        .contact-link:hover {
          text-decoration: underline;
        }
        
        @media print {
          .header {
            margin-bottom: 0.2rem;
            padding-bottom: 0.05cm;
          }
          
          .name {
            font-size: 18pt;
            margin-bottom: 0.1cm;
          }
          
          .title {
            font-size: 11pt;
            margin-bottom: 0.1cm;
          }
          
          .contact-info {
            font-size: 8.5pt;
            gap: 4px;
          }
        }
      `}</style>
      
      <header className="header">
        <h1 className="name">{name}</h1>
        <div className="title">{label}</div>
        <div className="contact-info">
          <div className="contact-item">
            <a href={`mailto:${email}`} className="contact-link">{email}</a>
          </div>
          <div className="contact-item">
            <span>{phone}</span>
          </div>
          <div className="contact-item">
            <span>{location}</span>
          </div>
          <div className="contact-item">
            <a href={website} className="contact-link" target="_blank" rel="noopener noreferrer">
              {website.replace('https://', '')}
            </a>
          </div>
          {profiles && profiles.map((profile, index) => (
            <div key={index} className="contact-item">
              <a href={profile.url} className="contact-link" target="_blank" rel="noopener noreferrer">
                {profile.network}
              </a>
            </div>
          ))}
        </div>
      </header>
    </>
  );
};

ResumeHeader.propTypes = {
  basics: PropTypes.object,
  printMode: PropTypes.bool
};

ResumeHeader.defaultProps = {
  basics: {},
  printMode: false
};

export { ResumeHeader };