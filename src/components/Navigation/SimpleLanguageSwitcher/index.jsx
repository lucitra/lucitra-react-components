import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SimpleLanguageSwitcher - A pure React language switcher without any UI library dependencies
 * Fully SSR-compatible with no hooks that cause SSR issues
 */
const SimpleLanguageSwitcher = ({ 
  languages = [],
  currentLanguage = '',
  onLanguageChange = () => {},
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language) => {
    setIsOpen(false);
    onLanguageChange(language);
  };

  const currentLang = languages.find(l => l.code === currentLanguage) || languages[0];

  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minWidth: '150px',
          fontSize: '14px'
        }}
      >
        <span>🌐</span>
        <span>{currentLang?.name || 'Select Language'}</span>
        <span style={{ marginLeft: 'auto' }}>▼</span>
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          {languages.map((language) => (
            <div
              key={language.code}
              onClick={() => handleSelect(language)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                backgroundColor: language.code === currentLanguage ? '#f0f0f0' : '#fff',
                ':hover': {
                  backgroundColor: '#f8f8f8'
                }
              }}
              onMouseEnter={(e) => {
                if (language.code !== currentLanguage) {
                  e.currentTarget.style.backgroundColor = '#f8f8f8';
                }
              }}
              onMouseLeave={(e) => {
                if (language.code !== currentLanguage) {
                  e.currentTarget.style.backgroundColor = '#fff';
                }
              }}
            >
              {language.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SimpleLanguageSwitcher.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  currentLanguage: PropTypes.string,
  onLanguageChange: PropTypes.func,
  style: PropTypes.object
};

export default SimpleLanguageSwitcher;