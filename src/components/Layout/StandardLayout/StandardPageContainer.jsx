import React from 'react';
import PropTypes from 'prop-types';
import styles from './StandardPageContainer.module.css';

export const StandardPageContainer = ({ 
  children, 
  className = '',
  showBorder = true,
  ...props 
}) => {
  return (
    <div 
      className={`${styles.container} ${showBorder ? styles.withBorder : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

StandardPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  showBorder: PropTypes.bool
};

export default StandardPageContainer;