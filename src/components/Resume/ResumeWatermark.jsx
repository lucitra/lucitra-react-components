import React from 'react';
import PropTypes from 'prop-types';

const ResumeWatermark = ({ isPremium = false, opacity = 0.15 }) => {
  // Check for premium mode override (for Ibraheem's personal stories)
  const premiumOverride = typeof window !== 'undefined' && window.__RESUME_PREMIUM_MODE__;
  
  if (isPremium || premiumOverride) return null;
  
  return (
    <>
      <style jsx>{`
        .watermark-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1000;
          overflow: hidden;
        }
        
        .watermark-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 120px;
          font-weight: bold;
          color: rgba(0, 0, 0, ${opacity});
          text-transform: uppercase;
          letter-spacing: 20px;
          white-space: nowrap;
          user-select: none;
          font-family: Arial, sans-serif;
        }
        
        .watermark-pattern {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            rgba(0, 0, 0, 0.03) 100px,
            rgba(0, 0, 0, 0.03) 200px
          );
          transform: rotate(-45deg);
        }
        
        .corner-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #ff4444;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          z-index: 1001;
        }
        
        .bottom-watermark {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 1001;
        }
        
        .bottom-watermark a {
          color: #4CAF50;
          text-decoration: none;
          font-weight: bold;
          margin-left: 8px;
        }
        
        .bottom-watermark a:hover {
          text-decoration: underline;
        }
        
        @media print {
          .watermark-text {
            font-size: 180px;
            opacity: 0.2;
          }
          
          .corner-badge,
          .bottom-watermark {
            display: block !important;
          }
        }
      `}</style>
      
      <div className="watermark-container">
        <div className="watermark-pattern" />
        <div className="watermark-text">PREVIEW</div>
        <div className="corner-badge">PREVIEW MODE</div>
        <div className="bottom-watermark">
          Sign up to download without watermark
          <a href="/signup">Get Started Free</a>
        </div>
      </div>
    </>
  );
};

ResumeWatermark.propTypes = {
  isPremium: PropTypes.bool,
  opacity: PropTypes.number
};

export default ResumeWatermark;