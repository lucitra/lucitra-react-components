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
          font-size: ${printMode ? resumeDesignSystem.typography.nameText.fontSize.print : resumeDesignSystem.typography.nameText.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.nameText.fontWeight};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode)};
          letter-spacing: ${resumeDesignSystem.typography.nameText.letterSpacing};
          color: ${resumeDesignSystem.typography.nameText.color};
          text-transform: ${resumeDesignSystem.typography.nameText.textTransform};
          line-height: ${printMode ? resumeDesignSystem.typography.nameText.lineHeight.print : resumeDesignSystem.typography.nameText.lineHeight.screen};
        }
        
        .title {
          font-size: ${printMode ? resumeDesignSystem.typography.bodyText.fontSize.print : resumeDesignSystem.typography.bodyText.fontSize.screen};
          color: ${resumeDesignSystem.typography.bodyText.color};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode)};
          font-style: italic;
          font-weight: ${resumeDesignSystem.emphasis.italic.fontWeight};
          line-height: ${printMode ? resumeDesignSystem.typography.bodyText.lineHeight.print : resumeDesignSystem.typography.bodyText.lineHeight.screen};
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: ${printMode ? '8px' : '16px'};
          font-size: ${printMode ? resumeDesignSystem.typography.smallText.fontSize.print : resumeDesignSystem.typography.smallText.fontSize.screen};
          color: ${resumeDesignSystem.typography.smallText.color};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode)};
          line-height: ${printMode ? resumeDesignSystem.typography.smallText.lineHeight.print : resumeDesignSystem.typography.smallText.lineHeight.screen};
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