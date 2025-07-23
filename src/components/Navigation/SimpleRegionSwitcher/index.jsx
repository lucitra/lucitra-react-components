import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SimpleRegionSwitcher - A pure React region switcher without any UI library dependencies
 * Fully SSR-compatible with no hooks that cause SSR issues
 */
const SimpleRegionSwitcher = ({ 
  regions = [],
  currentRegion = '',
  onRegionChange = () => {},
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (region) => {
    setIsOpen(false);
    onRegionChange(region);
  };

  const currentReg = regions.find(r => r.code === currentRegion) || regions[0];

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
        <span>🌍</span>
        <span>{currentReg?.name || 'Select Region'}</span>
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
          zIndex: 1000,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {regions.map((region) => (
            <div
              key={region.code}
              onClick={() => handleSelect(region)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                backgroundColor: region.code === currentRegion ? '#f0f0f0' : '#fff',
                ':hover': {
                  backgroundColor: '#f8f8f8'
                }
              }}
              onMouseEnter={(e) => {
                if (region.code !== currentRegion) {
                  e.currentTarget.style.backgroundColor = '#f8f8f8';
                }
              }}
              onMouseLeave={(e) => {
                if (region.code !== currentRegion) {
                  e.currentTarget.style.backgroundColor = '#fff';
                }
              }}
            >
              {region.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SimpleRegionSwitcher.propTypes = {
  regions: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  currentRegion: PropTypes.string,
  onRegionChange: PropTypes.func,
  style: PropTypes.object
};

export default SimpleRegionSwitcher;