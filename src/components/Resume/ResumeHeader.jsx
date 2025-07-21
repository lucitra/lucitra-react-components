import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeHeader = ({ basics, printMode = false }) => {
  const { name, label, email, phone, website, location, profiles } = basics;

  return (
    <>
      <style jsx={true}>{`
        .header {
          text-align: center;
          margin-bottom: ${printMode ? '0.2rem' : '20px'};
          padding-bottom: ${printMode ? '0.15cm' : '16px'};
          border-bottom: ${printMode ? `1px solid ${resumeDesignSystem.colors.divider}` : `2px solid ${resumeDesignSystem.colors.divider}`};
        }
        
        .name {
          font-size: ${printMode ? resumeDesignSystem.typography.primaryHeader.fontSize.print : resumeDesignSystem.typography.primaryHeader.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.primaryHeader.fontWeight};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode)};
          letter-spacing: 0.3px;
          color: ${resumeDesignSystem.typography.primaryHeader.color};
          line-height: ${printMode ? resumeDesignSystem.typography.primaryHeader.lineHeight.print : resumeDesignSystem.typography.primaryHeader.lineHeight.screen};
        }
        
        .title {
          font-size: ${printMode ? resumeDesignSystem.typography.secondaryHeader.fontSize.print : resumeDesignSystem.typography.secondaryHeader.fontSize.screen};
          color: ${resumeDesignSystem.typography.secondaryHeader.color};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode)};
          font-style: italic;
          line-height: ${printMode ? resumeDesignSystem.typography.secondaryHeader.lineHeight.print : resumeDesignSystem.typography.secondaryHeader.lineHeight.screen};
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: ${printMode ? '8px' : '16px'};
          font-size: ${printMode ? resumeDesignSystem.typography.contactText.fontSize.print : resumeDesignSystem.typography.contactText.fontSize.screen};
          color: ${resumeDesignSystem.typography.contactText.color};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode)};
          line-height: ${printMode ? resumeDesignSystem.typography.contactText.lineHeight.print : resumeDesignSystem.typography.contactText.lineHeight.screen};
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .contact-link {
          color: ${resumeDesignSystem.links.color};
          text-decoration: ${resumeDesignSystem.links.textDecoration};
          text-underline-offset: ${resumeDesignSystem.links.textUnderlineOffset};
          transition: ${resumeDesignSystem.links.transition};
        }
        
        .contact-link:hover {
          color: ${resumeDesignSystem.links.hoverColor};
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
              Portfolio
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