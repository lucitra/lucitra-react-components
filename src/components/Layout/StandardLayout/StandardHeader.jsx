import React from 'react';
import PropTypes from 'prop-types';
import styles from './StandardHeader.module.css';

export const StandardHeader = ({ 
  logo,
  navigationItems = [],
  actions,
  className = '',
  transparent = true,
  ...props 
}) => {
  return (
    <header 
      className={`${styles.header} ${transparent ? styles.transparent : ''} ${className}`}
      {...props}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          {logo}
        </div>
        
        <nav className={styles.navigation}>
          {navigationItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href}
              className={styles.navItem}
              onClick={item.onClick}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </div>
    </header>
  );
};

StandardHeader.propTypes = {
  logo: PropTypes.node.isRequired,
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func
  })),
  actions: PropTypes.node,
  className: PropTypes.string,
  transparent: PropTypes.bool
};

export default StandardHeader;