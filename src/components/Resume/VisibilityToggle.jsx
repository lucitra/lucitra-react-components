import React from 'react';
import PropTypes from 'prop-types';

const VisibilityToggle = ({ visibility = {}, onChange, style = {} }) => {
  // Ensure we always have default values
  const currentVisibility = {
    online: visibility?.online !== undefined ? visibility.online : true,
    print: visibility?.print !== undefined ? visibility.print : true
  };

  const handleChange = (type, checked) => {
    const newVisibility = {
      ...currentVisibility,
      [type]: checked
    };
    onChange(newVisibility);
  };

  return (
    <>
      <style jsx={true}>{`
        .visibility-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .visibility-control {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          font-size: 14px;
          color: #666;
          user-select: none;
        }

        .visibility-control input[type="checkbox"] {
          cursor: pointer;
          margin: 0;
        }

        .visibility-control:hover {
          color: #333;
        }
      `}</style>

      <div className="visibility-controls" style={style}>
        <label className="visibility-control">
          <input
            type="checkbox"
            checked={currentVisibility.online}
            onChange={(e) => handleChange('online', e.target.checked)}
          />
          <span>Online</span>
        </label>
        <label className="visibility-control">
          <input
            type="checkbox"
            checked={currentVisibility.print}
            onChange={(e) => handleChange('print', e.target.checked)}
          />
          <span>Print</span>
        </label>
      </div>
    </>
  );
};

VisibilityToggle.propTypes = {
  visibility: PropTypes.shape({
    online: PropTypes.bool,
    print: PropTypes.bool
  }),
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object
};

export default VisibilityToggle;