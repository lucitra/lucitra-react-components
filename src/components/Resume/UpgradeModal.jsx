import React from 'react';
import PropTypes from 'prop-types';
import { PRICING, SUBSCRIPTION_TIERS, FEATURES } from '../../services/featureGating.js';

const UpgradeModal = ({ 
  isOpen, 
  onClose, 
  featureName, 
  currentTier = SUBSCRIPTION_TIERS.ANONYMOUS,
  onUpgrade 
}) => {
  if (!isOpen) return null;
  
  // Find the minimum tier needed for this feature
  const getRequiredTier = () => {
    const feature = FEATURES[featureName];
    if (!feature) return SUBSCRIPTION_TIERS.STARTER;
    
    const tierOrder = [
      SUBSCRIPTION_TIERS.FREE,
      SUBSCRIPTION_TIERS.STARTER,
      SUBSCRIPTION_TIERS.PROFESSIONAL,
      SUBSCRIPTION_TIERS.ENTERPRISE
    ];
    
    if (feature.tiers) {
      for (const tier of tierOrder) {
        if (feature.tiers.includes(tier)) {
          return tier;
        }
      }
    } else if (feature.limit) {
      for (const tier of tierOrder) {
        if (feature.limit[tier] && feature.limit[tier] > 0) {
          return tier;
        }
      }
    }
    
    return SUBSCRIPTION_TIERS.STARTER;
  };
  
  const requiredTier = getRequiredTier();
  const feature = FEATURES[featureName];
  
  // Get available upgrade tiers
  const getUpgradeTiers = () => {
    const tiers = [];
    const tierOrder = [
      SUBSCRIPTION_TIERS.STARTER,
      SUBSCRIPTION_TIERS.PROFESSIONAL,
      SUBSCRIPTION_TIERS.ENTERPRISE
    ];
    
    let foundRequired = false;
    for (const tier of tierOrder) {
      if (tier === requiredTier) foundRequired = true;
      if (foundRequired && tier !== SUBSCRIPTION_TIERS.ENTERPRISE) {
        tiers.push(tier);
      }
    }
    
    return tiers.length > 0 ? tiers : [SUBSCRIPTION_TIERS.STARTER];
  };
  
  const upgradeTiers = getUpgradeTiers();
  
  return (
    <>
      <style jsx>{`
        .upgrade-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .upgrade-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .upgrade-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 32px;
          text-align: center;
        }
        
        .upgrade-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .upgrade-title {
          font-size: 28px;
          font-weight: bold;
          margin: 0 0 8px 0;
        }
        
        .upgrade-subtitle {
          font-size: 18px;
          opacity: 0.9;
          margin: 0;
        }
        
        .upgrade-content {
          padding: 32px;
          overflow-y: auto;
          max-height: calc(90vh - 200px);
        }
        
        .feature-highlight {
          background: #f8f9ff;
          border: 2px solid #e0e3ff;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 32px;
          text-align: center;
        }
        
        .feature-name {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        
        .feature-desc {
          color: #666;
          font-size: 16px;
        }
        
        .pricing-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }
        
        .pricing-card {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .pricing-card:hover {
          border-color: #667eea;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(102, 126, 234, 0.15);
        }
        
        .pricing-card.recommended {
          border-color: #667eea;
          background: #f8f9ff;
        }
        
        .recommended-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #667eea;
          color: white;
          padding: 4px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .plan-name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
        }
        
        .plan-price {
          font-size: 36px;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 4px;
        }
        
        .plan-price .currency {
          font-size: 20px;
        }
        
        .plan-price .period {
          font-size: 16px;
          color: #666;
          font-weight: normal;
        }
        
        .plan-desc {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }
        
        .plan-features {
          text-align: left;
          margin-bottom: 24px;
        }
        
        .plan-feature {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          font-size: 14px;
          color: #555;
        }
        
        .plan-feature-icon {
          color: #4CAF50;
          margin-right: 8px;
          flex-shrink: 0;
        }
        
        .upgrade-btn {
          width: 100%;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          background: #667eea;
          color: white;
        }
        
        .upgrade-btn:hover {
          background: #5a67d8;
          transform: translateY(-1px);
        }
        
        .current-plan {
          background: #e0e0e0;
          color: #666;
          cursor: not-allowed;
        }
        
        .upgrade-footer {
          padding: 20px 32px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f9fa;
        }
        
        .security-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666;
        }
        
        .close-btn {
          padding: 8px 20px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          background: white;
          color: #666;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .close-btn:hover {
          border-color: #999;
          color: #333;
        }
        
        .benefit-list {
          margin-top: 32px;
          padding: 24px;
          background: #f0f8ff;
          border-radius: 12px;
        }
        
        .benefit-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #333;
        }
        
        .benefit-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          font-size: 15px;
          color: #555;
        }
        
        .benefit-icon {
          color: #667eea;
          margin-right: 12px;
          font-size: 20px;
          flex-shrink: 0;
        }
      `}</style>
      
      <div className="upgrade-modal" onClick={onClose}>
        <div className="upgrade-container" onClick={(e) => e.stopPropagation()}>
          <div className="upgrade-header">
            <div className="upgrade-icon">🚀</div>
            <h2 className="upgrade-title">Unlock Premium Features</h2>
            <p className="upgrade-subtitle">
              Upgrade to access advanced features and take your resume to the next level
            </p>
          </div>
          
          <div className="upgrade-content">
            {feature && (
              <div className="feature-highlight">
                <div className="feature-name">{feature.name}</div>
                <div className="feature-desc">{feature.description}</div>
              </div>
            )}
            
            <div className="pricing-cards">
              {upgradeTiers.map((tier) => {
                const pricing = PRICING[tier];
                const isRecommended = tier === requiredTier;
                const isCurrent = tier === currentTier;
                
                return (
                  <div 
                    key={tier}
                    className={`pricing-card ${isRecommended ? 'recommended' : ''}`}
                    onClick={() => !isCurrent && onUpgrade(tier)}
                  >
                    {isRecommended && (
                      <div className="recommended-badge">Recommended</div>
                    )}
                    
                    <div className="plan-name">{pricing.name}</div>
                    <div className="plan-price">
                      {typeof pricing.price === 'number' ? (
                        <>
                          <span className="currency">$</span>
                          {pricing.price}
                          <span className="period">/{pricing.period}</span>
                        </>
                      ) : (
                        pricing.price
                      )}
                    </div>
                    <div className="plan-desc">{pricing.description}</div>
                    
                    <div className="plan-features">
                      {tier === SUBSCRIPTION_TIERS.STARTER && (
                        <>
                          <div className="plan-feature">
                            <span className="plan-feature-icon">✓</span>
                            <span>Download PDF without watermark</span>
                          </div>
                          <div className="plan-feature">
                            <span className="plan-feature-icon">✓</span>
                            <span>Save up to 3 resumes</span>
                          </div>
                          <div className="plan-feature">
                            <span className="plan-feature-icon">✓</span>
                            <span>Basic ATS scoring</span>
                          </div>
                          <div className="plan-feature">
                            <span className="plan-feature-icon">✓</span>
                            <span>20 AI optimizations/month</span>
                          </div>
                        </>
                      )}
                      
                      {tier === SUBSCRIPTION_TIERS.PROFESSIONAL && (
                        <>
                          <div className="plan-feature">
                            <span className="plan-feature-icon">✓</span>
                            <span>Everything in Starter</span>
                          </div>
                          <div className="plan-feature">
                            <span className="plan-feature-icon">✓</span>
                            <span>Download DOCX format</span>
                          </div>
                          <div className="plan-feature">
                            <span className="plan-feature-icon">✓</span>
                            <span>Save up to 10 resumes</span>
                          </div>
                          <div className="plan-feature">
                            <span className="plan-feature-icon">✓</span>
                            <span>100 AI optimizations/month</span>
                          </div>
                          <div className="plan-feature">
                            <span className="plan-feature-icon">✓</span>
                            <span>Custom branding removal</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <button 
                      className={`upgrade-btn ${isCurrent ? 'current-plan' : ''}`}
                      disabled={isCurrent}
                    >
                      {isCurrent ? 'Current Plan' : 'Choose Plan'}
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="benefit-list">
              <div className="benefit-title">Why Upgrade?</div>
              <div className="benefit-item">
                <span className="benefit-icon">📄</span>
                <span>Download professional resumes without watermarks</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🤖</span>
                <span>AI-powered optimization to beat ATS systems</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💾</span>
                <span>Save multiple versions for different job applications</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📊</span>
                <span>Track your resume performance with analytics</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🔒</span>
                <span>Secure cloud storage with version history</span>
              </div>
            </div>
          </div>
          
          <div className="upgrade-footer">
            <div className="security-note">
              <span>🔒</span>
              <span>Secure payment via Stripe</span>
            </div>
            <button className="close-btn" onClick={onClose}>
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

UpgradeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  featureName: PropTypes.string,
  currentTier: PropTypes.string,
  onUpgrade: PropTypes.func.isRequired
};

export default UpgradeModal;