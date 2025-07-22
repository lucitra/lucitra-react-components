import React from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem, getSpacing } from './resumeStyles.js';

const ResumeHeader = ({ basics, printMode = false, useSerifFont = false }) => {
  const { name, label, email, phone, website, location, profiles } = basics;

  return (
    <>
      <style jsx={true}>{`
        .header {
          text-align: center;
          margin-bottom: ${printMode ? '0.05rem' : '20px'};
          padding-bottom: ${printMode ? '0.08cm' : '16px'};
          border-bottom: ${printMode ? `1px solid ${resumeDesignSystem.colors.divider}` : `2px solid ${resumeDesignSystem.colors.divider}`};
        }
        
        .name {
          font-size: ${printMode ? resumeDesignSystem.typography.nameText.fontSize.print : resumeDesignSystem.typography.nameText.fontSize.screen};
          font-weight: ${resumeDesignSystem.typography.nameText.fontWeight};
          font-family: ${useSerifFont ? resumeDesignSystem.layout.serifFontFamily : 'inherit'};
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
          font-family: ${useSerifFont ? resumeDesignSystem.layout.serifFontFamily : 'inherit'};
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
          align-items: center;
          font-size: ${printMode ? resumeDesignSystem.typography.smallText.fontSize.print : resumeDesignSystem.typography.smallText.fontSize.screen};
          color: ${resumeDesignSystem.typography.smallText.color};
          margin: 0;
          margin-bottom: ${getSpacing('headerGap', printMode)};
          line-height: ${printMode ? resumeDesignSystem.typography.smallText.lineHeight.print : resumeDesignSystem.typography.smallText.lineHeight.screen};
        }
        
        .contact-item {
          display: flex;
          align-items: center;
        }
        
        .contact-separator {
          margin: 0 ${printMode ? '8px' : '12px'};
          color: ${resumeDesignSystem.colors.divider};
          font-weight: normal;
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
          <span className="contact-separator">•</span>
          <div className="contact-item">
            <span>{phone}</span>
          </div>
          <span className="contact-separator">•</span>
          <div className="contact-item">
            <span>{location}</span>
          </div>
          <span className="contact-separator">•</span>
          <div className="contact-item">
            <a href={website} className="contact-link" target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </div>
          {profiles && profiles.map((profile, index) => (
            <React.Fragment key={index}>
              <span className="contact-separator">•</span>
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
  useSerifFont: PropTypes.bool
};

ResumeHeader.defaultProps = {
  basics: {},
  printMode: false,
  useSerifFont: false
};

export { ResumeHeader };