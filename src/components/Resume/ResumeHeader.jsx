import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeHeader = ({ basics, printMode = false, designSystem = resumeDesignSystem }) => {
  const { name, label, email, phone, website, location, profiles } = basics;

  return (
    <>
      <style jsx={true}>{`
        .header {
          text-align: center;
          margin-bottom: ${printMode ? '0.05rem' : '20px'};
          padding-bottom: ${printMode ? '0.08cm' : '16px'};
          border-bottom: ${printMode ? `1px solid ${designSystem.colors.divider}` : `2px solid ${designSystem.colors.divider}`};
        }
        
        .name {
          font-size: ${printMode ? designSystem.typography.nameText.fontSize.print : designSystem.typography.nameText.fontSize.screen};
          font-weight: ${designSystem.typography.nameText.fontWeight};
          font-family: ${designSystem.typography.nameText.fontFamily};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode, designSystem)};
          letter-spacing: ${designSystem.typography.nameText.letterSpacing};
          color: ${designSystem.typography.nameText.color};
          text-transform: ${designSystem.typography.nameText.textTransform};
          line-height: ${printMode ? designSystem.typography.nameText.lineHeight.print : designSystem.typography.nameText.lineHeight.screen};
        }
        
        .title {
          font-size: ${printMode ? designSystem.typography.bodyText.fontSize.print : designSystem.typography.bodyText.fontSize.screen};
          color: ${designSystem.typography.bodyText.color};
          font-family: ${designSystem.typography.bodyText.fontFamily};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode, designSystem)};
          font-style: normal;
          font-weight: ${designSystem.typography.bodyText.fontWeight};
          line-height: ${printMode ? designSystem.typography.bodyText.lineHeight.print : designSystem.typography.bodyText.lineHeight.screen};
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
          font-family: ${designSystem.typography.smallText.fontFamily};
          font-size: ${printMode ? designSystem.typography.smallText.fontSize.print : designSystem.typography.smallText.fontSize.screen};
          color: ${designSystem.typography.smallText.color};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode, designSystem)};
          line-height: ${printMode ? designSystem.typography.smallText.lineHeight.print : designSystem.typography.smallText.lineHeight.screen};
        }
        
        .contact-item {
          display: flex;
          align-items: center;
        }
        
        .contact-separator {
          margin: 0 ${printMode ? '8px' : '12px'};
          color: ${designSystem.colors.divider};
          font-weight: normal;
        }
        
        .contact-link {
          color: ${designSystem.links.color};
          text-decoration: ${designSystem.links.textDecoration};
          text-underline-offset: ${designSystem.links.textUnderlineOffset};
          transition: ${designSystem.links.transition};
        }
        
        .contact-link:hover {
          color: ${designSystem.links.hoverColor};
        }
      `}</style>
      
      <header className="header">
        <h1 className="name">{name}</h1>
        <div className="title">{label}</div>
        <div className="contact-info">
          <div className="contact-item">
            <a href={`mailto:${email}`} className="contact-link">{email}</a>
          </div>
          <span className="contact-separator">|</span>
          <div className="contact-item">
            <span>{phone}</span>
          </div>
          <span className="contact-separator">|</span>
          <div className="contact-item">
            <span>{location}</span>
          </div>
          <span className="contact-separator">|</span>
          <div className="contact-item">
            <a href={website} className="contact-link" target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </div>
          {profiles && profiles.map((profile, index) => (
            <React.Fragment key={index}>
              <span className="contact-separator">|</span>
              <div className="contact-item">
                <a href={profile.url} className="contact-link" target="_blank" rel="noopener noreferrer">
                  {profile.network}
                </a>
              </div>
            </React.Fragment>
          ))}
        </div>
      </header>
    </>
  );
};

ResumeHeader.propTypes = {
  basics: PropTypes.object,
  printMode: PropTypes.bool,
  designSystem: PropTypes.object
};

ResumeHeader.defaultProps = {
  basics: {},
  printMode: false
};

export { ResumeHeader };