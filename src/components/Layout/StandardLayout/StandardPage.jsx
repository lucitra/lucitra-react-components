import React from 'react';
import PropTypes from 'prop-types';
import { StandardPageContainer } from './StandardPageContainer';
import { StandardHeader } from './StandardHeader';
import { StandardHeroSection } from './StandardHeroSection';
import styles from './StandardPage.module.css';

export const StandardPage = ({ 
  header,
  hero,
  children,
  className = '',
  showBorder = true,
  ...props 
}) => {
  return (
    <div className={`${styles.page} ${className}`} {...props}>
      {header && <StandardHeader {...header} />}
      
      <StandardPageContainer showBorder={showBorder}>
        {hero && <StandardHeroSection {...hero} />}
        
        <div className={styles.content}>
          {children}
        </div>
      </StandardPageContainer>
    </div>
  );
};

StandardPage.propTypes = {
  header: PropTypes.shape({
    logo: PropTypes.node.isRequired,
    navigationItems: PropTypes.array,
    actions: PropTypes.node,
    transparent: PropTypes.bool
  }),
  hero: PropTypes.shape({
    videoSrc: PropTypes.string.isRequired,
    videoPoster: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actions: PropTypes.node
  }),
  children: PropTypes.node,
  className: PropTypes.string,
  showBorder: PropTypes.bool
};

export default StandardPage;