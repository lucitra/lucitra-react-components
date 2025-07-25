import React from 'react';
import PropTypes from 'prop-types';
import { SUBSCRIPTION_TIERS } from '../../services/featureGating.js';
import { SIGNATURE_FONTS } from './signatureFonts.js';

const SignatureSelector = ({ 
  selectedFont = 'none',
  onFontChange,
  userName,
  userSubscription = SUBSCRIPTION_TIERS.FREE,
  onUpgrade,
  customFont = null,
  onCustomFontChange
}) => {
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [customFontInput, setCustomFontInput] = React.useState(customFont || '');
  const isPremium = userSubscription === SUBSCRIPTION_TIERS.PROFESSIONAL || 
                   userSubscription === SUBSCRIPTION_TIERS.STARTER;

  const handleFontSelect = (fontId) => {
    if (fontId === 'custom') {
      if (!isPremium) {
        onUpgrade?.();
        return;
      }
      setShowCustomInput(true);
      onFontChange('custom');
      return;
    }

    const font = SIGNATURE_FONTS.find(f => f.id === fontId);
    if (!font) return;

    // Check if font is premium and user needs to upgrade
    if (!font.free && !isPremium) {
      onUpgrade?.();
      return;
    }

    setShowCustomInput(false);
    onFontChange(fontId);
  };

  const handleCustomFontSubmit = () => {
    if (customFontInput.trim()) {
      onCustomFontChange?.(customFontInput.trim());
    }
  };

  const getCustomFontUrl = (fontName) => {
    // Convert font name to Google Fonts URL format
    const formattedName = fontName.replace(/\s+/g, '+');
    return `https://fonts.googleapis.com/css2?family=${formattedName}:wght@400;700&display=swap`;
  };

  const getCustomFontFamily = (fontName) => {
    // Add quotes around font name if it has spaces
    return fontName.includes(' ') ? `"${fontName}", cursive` : `${fontName}, cursive`;
  };

  return (
    <>
      <style jsx={true}>{`
        .signature-selector {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .selector-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .selector-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .premium-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .signature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        @media (max-width: 768px) {
          .signature-grid {
            grid-template-columns: 1fr;
          }
        }

        .signature-option {
          position: relative;
          padding: 16px 24px;
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          min-height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .signature-option:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .signature-option.selected {
          border-color: #667eea;
          background: #f3f4ff;
        }

        .signature-option.locked {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .signature-option.locked:hover {
          transform: none;
          border-color: #e0e0e0;
        }

        .signature-preview {
          font-size: 22px;
          margin: 10px 0;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          letter-spacing: 0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          padding: 0 10px;
        }

        .font-name {
          font-size: 12px;
          color: #666;
          margin-top: 8px;
        }

        .lock-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 20px;
          height: 20px;
          opacity: 0.5;
        }

        .upgrade-prompt {
          margin-top: 20px;
          padding: 16px;
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          text-align: center;
        }

        .upgrade-text {
          color: #856404;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .upgrade-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 8px 24px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .upgrade-button:hover {
          background: #5a67d8;
        }

        .custom-font-input-container {
          margin-top: 20px;
          padding: 20px;
          background: white;
          border: 2px solid #667eea;
          border-radius: 8px;
        }

        .custom-font-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .custom-font-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .custom-font-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .custom-font-hint {
          font-size: 12px;
          color: #666;
          margin-bottom: 12px;
        }

        .custom-font-link {
          color: #667eea;
          text-decoration: none;
        }

        .custom-font-link:hover {
          text-decoration: underline;
        }

        .custom-font-actions {
          display: flex;
          gap: 8px;
        }

        .custom-font-button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .custom-font-button.apply {
          background: #667eea;
          color: white;
        }

        .custom-font-button.apply:hover {
          background: #5a67d8;
        }

        .custom-font-button.cancel {
          background: #e0e0e0;
          color: #333;
        }

        .custom-font-button.cancel:hover {
          background: #d0d0d0;
        }
      `}</style>

      {/* Load Google Fonts */}
      {SIGNATURE_FONTS.filter(f => f.url).map(font => (
        <link key={font.id} href={font.url} rel="stylesheet" />
      ))}
      
      {/* Load custom font if specified */}
      {customFont && (
        <link href={getCustomFontUrl(customFont)} rel="stylesheet" />
      )}

      <div className="signature-selector">
        <div className="selector-header">
          <h3 className="selector-title">Choose Your Signature Style</h3>
          {!isPremium && <span className="premium-badge">Premium Feature</span>}
        </div>

        <div className="signature-grid">
          {SIGNATURE_FONTS.map(font => {
            const isLocked = !font.free && !isPremium;
            const isSelected = selectedFont === font.id;

            return (
              <div
                key={font.id}
                className={`signature-option ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`}
                onClick={() => handleFontSelect(font.id)}
              >
                {isLocked && (
                  <svg className="lock-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
                <div 
                  className="signature-preview" 
                  style={{ fontFamily: font.font }}
                >
                  {font.id === 'none' ? '—' : userName || 'Your Name'}
                </div>
                <div className="font-name">{font.name}</div>
              </div>
            );
          })}
          
          {/* Custom Font Option */}
          <div
            className={`signature-option ${selectedFont === 'custom' ? 'selected' : ''} ${!isPremium ? 'locked' : ''}`}
            onClick={() => handleFontSelect('custom')}
          >
            {!isPremium && (
              <svg className="lock-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            )}
            <div 
              className="signature-preview" 
              style={{ 
                fontFamily: customFont ? getCustomFontFamily(customFont) : 'inherit',
                fontSize: customFont ? '22px' : '18px'
              }}
            >
              {customFont || '+ Custom Font'}
            </div>
            <div className="font-name">Custom Google Font</div>
          </div>
        </div>

        {/* Custom Font Input */}
        {showCustomInput && isPremium && (
          <div className="custom-font-input-container">
            <label className="custom-font-label">Enter Google Font Name</label>
            <input
              type="text"
              className="custom-font-input"
              value={customFontInput}
              onChange={(e) => setCustomFontInput(e.target.value)}
              placeholder="e.g., Kalam, Amatic SC, Permanent Marker"
            />
            <div className="custom-font-hint">
              Browse fonts at{' '}
              <a 
                href="https://fonts.google.com/?categoryFilters=Feeling:%2FExpressive%2FFancy;Calligraphy:%2FScript%2FHandwritten" 
                target="_blank" 
                rel="noopener noreferrer"
                className="custom-font-link"
              >
                Google Fonts
              </a>
              {' '}and enter the exact font name
            </div>
            <div className="custom-font-actions">
              <button 
                className="custom-font-button apply"
                onClick={handleCustomFontSubmit}
              >
                Apply Font
              </button>
              <button 
                className="custom-font-button cancel"
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomFontInput('');
                  onFontChange('none');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!isPremium && (
          <div className="upgrade-prompt">
            <p className="upgrade-text">
              Unlock premium signature styles to add a personal touch to your cover letters.
            </p>
            <button className="upgrade-button" onClick={onUpgrade}>
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </>
  );
};

SignatureSelector.propTypes = {
  selectedFont: PropTypes.string,
  onFontChange: PropTypes.func.isRequired,
  userName: PropTypes.string,
  userSubscription: PropTypes.string,
  onUpgrade: PropTypes.func,
  customFont: PropTypes.string,
  onCustomFontChange: PropTypes.func
};

export default SignatureSelector;