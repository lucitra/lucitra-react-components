import React from 'react';
import PropTypes from 'prop-types';
import aiService from '../../services/aiServiceSimple';

const ResumePricing = ({ currentPlan = 'free', onSelectPlan }) => {
  const plans = Object.entries(aiService.subscriptionPlans).map(([key, plan]) => ({
    id: key,
    ...plan
  }));

  return (
    <>
      <style jsx>{`
        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .pricing-title {
          font-size: 48px;
          font-weight: 700;
          color: #333;
          margin-bottom: 16px;
        }

        .pricing-subtitle {
          font-size: 20px;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-bottom: 60px;
        }

        .plan-card {
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 16px;
          padding: 32px;
          position: relative;
          transition: all 0.3s;
        }

        .plan-card:hover {
          border-color: #667eea;
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .plan-card.popular {
          border-color: #667eea;
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .plan-name {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .plan-price {
          font-size: 48px;
          font-weight: 700;
          color: #333;
          margin-bottom: 4px;
        }

        .plan-price sup {
          font-size: 24px;
          font-weight: 500;
        }

        .plan-period {
          font-size: 16px;
          color: #666;
          margin-bottom: 24px;
        }

        .plan-credits {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .credits-number {
          font-size: 24px;
          color: #667eea;
          font-weight: 700;
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          font-size: 14px;
          color: #495057;
        }

        .feature-icon {
          color: #28a745;
          margin-right: 12px;
          font-size: 16px;
          margin-top: 2px;
        }

        .plan-button {
          width: 100%;
          padding: 14px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .plan-button.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .plan-button.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .plan-button.secondary {
          background: #f8f9fa;
          color: #495057;
          border: 2px solid #e9ecef;
        }

        .plan-button.secondary:hover {
          background: #e9ecef;
        }

        .plan-button.current {
          background: #e9ecef;
          color: #6c757d;
          cursor: default;
        }

        .comparison-section {
          background: #f8f9fa;
          border-radius: 16px;
          padding: 48px;
          margin-bottom: 60px;
        }

        .comparison-title {
          font-size: 32px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 40px;
          color: #333;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
        }

        .comparison-table th {
          text-align: left;
          padding: 16px;
          font-weight: 600;
          border-bottom: 2px solid #dee2e6;
          color: #495057;
        }

        .comparison-table td {
          padding: 16px;
          border-bottom: 1px solid #e9ecef;
        }

        .comparison-table tr:last-child td {
          border-bottom: none;
        }

        .check-icon {
          color: #28a745;
          font-size: 18px;
        }

        .x-icon {
          color: #dc3545;
          font-size: 18px;
        }

        .faq-section {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-title {
          font-size: 32px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 40px;
          color: #333;
        }

        .faq-item {
          margin-bottom: 24px;
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 24px;
        }

        .faq-question {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }

        .faq-answer {
          font-size: 16px;
          color: #666;
          line-height: 1.5;
        }

        .cta-section {
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 60px;
          color: white;
        }

        .cta-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-subtitle {
          font-size: 20px;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .cta-button {
          background: white;
          color: #667eea;
          padding: 16px 32px;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
          
          .comparison-section {
            padding: 32px 20px;
            overflow-x: auto;
          }
        }
      `}</style>

      <div className="pricing-container">
        <div className="pricing-header">
          <h1 className="pricing-title">Simple, Transparent Pricing</h1>
          <p className="pricing-subtitle">
            Choose the plan that&apos;s right for you. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map(plan => (
            <div 
              key={plan.id} 
              className={`plan-card ${plan.id === 'starter' ? 'popular' : ''}`}
            >
              {plan.id === 'starter' && <div className="popular-badge">Most Popular</div>}
              
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                {plan.price === 0 ? 'Free' : (
                  <>
                    <sup>$</sup>{plan.price}
                  </>
                )}
              </div>
              <div className="plan-period">
                {plan.price > 0 ? 'per month' : 'Forever'}
              </div>

              <div className="plan-credits">
                <div className="credits-number">
                  {plan.optimizationsPerMonth === 'unlimited' ? '∞' : plan.optimizationsPerMonth}
                </div>
                <div>AI optimizations/month</div>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`plan-button ${
                  currentPlan === plan.id ? 'current' : 
                  plan.id === 'starter' ? 'primary' : 'secondary'
                }`}
                onClick={() => onSelectPlan(plan.id)}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? 'Current Plan' : 
                 plan.price === 0 ? 'Get Started' : 
                 'Start Free Trial'}
              </button>
            </div>
          ))}
        </div>

        <div className="comparison-section">
          <h2 className="comparison-title">Feature Comparison</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free</th>
                <th>Starter</th>
                <th>Professional</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AI Optimizations</td>
                <td>10/month</td>
                <td>100/month</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Resume Templates</td>
                <td>Basic</td>
                <td>All Templates</td>
                <td>All + Custom</td>
              </tr>
              <tr>
                <td>Number of Resumes</td>
                <td>1</td>
                <td>3</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Cover Letters</td>
                <td><span className="x-icon">✗</span></td>
                <td><span className="check-icon">✓</span></td>
                <td><span className="check-icon">✓</span></td>
              </tr>
              <tr>
                <td>LinkedIn Optimization</td>
                <td><span className="x-icon">✗</span></td>
                <td><span className="x-icon">✗</span></td>
                <td><span className="check-icon">✓</span></td>
              </tr>
              <tr>
                <td>Analytics & Tracking</td>
                <td><span className="x-icon">✗</span></td>
                <td>Basic</td>
                <td>Advanced</td>
              </tr>
              <tr>
                <td>Priority Support</td>
                <td><span className="x-icon">✗</span></td>
                <td><span className="x-icon">✗</span></td>
                <td><span className="check-icon">✓</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          
          <div className="faq-item">
            <h3 className="faq-question">What are AI optimizations?</h3>
            <p className="faq-answer">
              AI optimizations use advanced language models to improve your resume content. 
              Each optimization can enhance job titles, bullet points, summaries, or any text 
              field to be more impactful and ATS-friendly.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Can I change plans anytime?</h3>
            <p className="faq-answer">
              Yes! You can upgrade, downgrade, or cancel your subscription at any time. 
              Changes take effect immediately, and we&apos;ll prorate any payments.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Do I need to provide API keys?</h3>
            <p className="faq-answer">
              No! We handle all the AI infrastructure for you. Just sign up and start 
              optimizing. No technical setup required.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Is there a free trial?</h3>
            <p className="faq-answer">
              Yes! All paid plans come with a 7-day free trial. No credit card required 
              to start. Plus, our free plan gives you 10 optimizations every month forever.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <h2 className="cta-title">Ready to Land Your Dream Job?</h2>
          <p className="cta-subtitle">
            Join thousands of job seekers using AI to create winning resumes
          </p>
          <button className="cta-button" onClick={() => onSelectPlan('starter')}>
            Start Your Free Trial
          </button>
        </div>
      </div>
    </>
  );
};

ResumePricing.propTypes = {
  currentPlan: PropTypes.string,
  onSelectPlan: PropTypes.func.isRequired
};

export default ResumePricing;