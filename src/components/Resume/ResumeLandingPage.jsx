import React, { useState } from 'react';
import ResumeBuilder from './ResumeBuilder.jsx';
import { ibraheemResumeData } from '../../data/resumeData.js';
// import { PRICING, SUBSCRIPTION_TIERS } from '../../services/featureGating.js';

const ResumeLandingPage = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  
  return (
    <>
      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: #fafbfc;
        }
        
        .header {
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
        
        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }
        
        .nav-link {
          color: #666;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .nav-link:hover {
          color: #667eea;
        }
        
        .cta-button {
          background: #667eea;
          color: white;
          padding: 10px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
        }
        
        .cta-button:hover {
          background: #5a67d8;
          transform: translateY(-1px);
        }
        
        .hero {
          padding: 120px 20px 80px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        
        .hero-content h1 {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
          line-height: 1.2;
        }
        
        .hero-content p {
          font-size: 20px;
          color: #666;
          margin-bottom: 30px;
          line-height: 1.6;
        }
        
        .hero-buttons {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        
        .btn-primary {
          background: #667eea;
          color: white;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 18px;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        
        .btn-primary:hover {
          background: #5a67d8;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .btn-secondary {
          background: transparent;
          color: #667eea;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 18px;
          transition: all 0.2s;
          border: 2px solid #667eea;
        }
        
        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }
        
        .hero-preview {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          position: relative;
        }
        
        .preview-header {
          background: #f8f9fa;
          padding: 12px 20px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .preview-content {
          height: 600px;
          overflow: hidden;
          position: relative;
          transform: scale(0.9);
          transform-origin: top center;
        }
        
        .preview-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 70%, rgba(255, 255, 255, 0.9) 100%);
          pointer-events: none;
        }
        
        .features {
          background: white;
          padding: 80px 20px;
        }
        
        .features-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .features h2 {
          text-align: center;
          font-size: 36px;
          margin-bottom: 20px;
          color: #333;
        }
        
        .features-subtitle {
          text-align: center;
          font-size: 18px;
          color: #666;
          margin-bottom: 60px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }
        
        .feature-card {
          text-align: left;
          padding: 30px;
        }
        
        
        .feature-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #333;
        }
        
        .feature-desc {
          color: #666;
          line-height: 1.6;
        }
        
        .pricing {
          background: #f8f9fa;
          padding: 80px 20px;
        }
        
        .pricing-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .pricing h2 {
          text-align: center;
          font-size: 36px;
          margin-bottom: 20px;
          color: #333;
        }
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        
        .pricing-card {
          background: white;
          border-radius: 12px;
          padding: 40px 30px;
          text-align: center;
          position: relative;
          transition: all 0.3s;
          border: 2px solid transparent;
        }
        
        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }
        
        .pricing-card.popular {
          border-color: #667eea;
        }
        
        .popular-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: #667eea;
          color: white;
          padding: 4px 20px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .plan-name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }
        
        .plan-price {
          font-size: 48px;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 10px;
        }
        
        .plan-price .currency {
          font-size: 24px;
        }
        
        .plan-price .period {
          font-size: 18px;
          color: #666;
          font-weight: normal;
        }
        
        .plan-features {
          margin: 30px 0;
          text-align: left;
        }
        
        .plan-feature {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          color: #555;
        }
        
        .plan-feature-icon {
          color: #667eea;
          margin-right: 10px;
          font-weight: bold;
        }
        
        .builder-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 10000;
          overflow: auto;
        }
        
        .builder-header {
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .builder-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
        }
        
        .close-builder {
          padding: 8px 20px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          background: white;
          color: #666;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .close-builder:hover {
          border-color: #999;
          color: #333;
        }
      `}</style>
      
      <div className="landing-page">
        <header className="header">
          <div className="header-content">
            <div className="logo">ResumeBuilder Pro</div>
            <nav className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#" className="nav-link">Templates</a>
              <a href="#" className="nav-link">Sign In</a>
              <a 
                href="#" 
                className="cta-button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowBuilder(true);
                }}
              >
                Get Started Free
              </a>
            </nav>
          </div>
        </header>
        
        <section className="hero">
          <div className="hero-content">
            <h1>Create ATS-Friendly Resumes That Get You Hired</h1>
            <p>
              Build professional resumes optimized for Applicant Tracking Systems. 
              Import from LinkedIn, get AI-powered suggestions, and land your dream job.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn-primary"
                onClick={() => setShowBuilder(true)}
              >
                Build Your Resume
              </button>
              <a href="#pricing" className="btn-secondary">
                View Pricing
              </a>
            </div>
          </div>
          
          <div className="hero-preview">
            <div className="preview-header">
            </div>
            <div className="preview-content">
              <ResumeBuilder
                initialData={ibraheemResumeData}
                showControls={false}
                enableExport={false}
                showATSTools={false}
              />
              <div className="preview-overlay"></div>
            </div>
          </div>
        </section>
        
        <section className="features" id="features">
          <div className="features-content">
            <h2>Everything You Need to Land Your Next Job</h2>
            <p className="features-subtitle">
              Professional tools designed to help you create the perfect resume
            </p>
            
            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">AI-Powered Optimization</h3>
                <p className="feature-desc">
                  Get intelligent suggestions to improve your resume content and beat ATS filters
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="feature-title">LinkedIn Import</h3>
                <p className="feature-desc">
                  Import your LinkedIn profile with one click and transform it into a professional resume
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="feature-title">ATS Scoring</h3>
                <p className="feature-desc">
                  Real-time ATS compatibility scoring to ensure your resume gets past automated filters
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="feature-title">Professional Templates</h3>
                <p className="feature-desc">
                  Choose from modern, ATS-friendly templates designed by HR professionals
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="feature-title">Version Control</h3>
                <p className="feature-desc">
                  Track changes and revert to previous versions with built-in version history
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="feature-title">Multiple Formats</h3>
                <p className="feature-desc">
                  Export your resume as PDF, DOCX, or JSON for maximum compatibility
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="pricing" id="pricing">
          <div className="pricing-content">
            <h2>Simple, Transparent Pricing</h2>
            
            <div className="pricing-grid">
              <div className="pricing-card">
                <div className="plan-name">Free</div>
                <div className="plan-price">
                  <span className="currency">$</span>0
                  <span className="period">/forever</span>
                </div>
                <div className="plan-features">
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>Preview with watermark</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>Basic templates</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>LinkedIn import</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon" style={{ color: '#999' }}>•</span>
                    <span>No downloads</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon" style={{ color: '#999' }}>•</span>
                    <span>No resume saving</span>
                  </div>
                </div>
                <button className="btn-primary" style={{ width: '100%' }}>
                  Get Started
                </button>
              </div>
              
              <div className="pricing-card popular">
                <div className="popular-badge">Most Popular</div>
                <div className="plan-name">Starter</div>
                <div className="plan-price">
                  <span className="currency">$</span>9.99
                  <span className="period">/month</span>
                </div>
                <div className="plan-features">
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>Download PDF (no watermark)</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>Save up to 3 resumes</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>Basic ATS scoring</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>20 AI optimizations/month</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>5 premium templates</span>
                  </div>
                </div>
                <button className="btn-primary" style={{ width: '100%' }}>
                  Start Free Trial
                </button>
              </div>
              
              <div className="pricing-card">
                <div className="plan-name">Professional</div>
                <div className="plan-price">
                  <span className="currency">$</span>19.99
                  <span className="period">/month</span>
                </div>
                <div className="plan-features">
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>Everything in Starter</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>Download DOCX format</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>Save up to 10 resumes</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>100 AI optimizations/month</span>
                  </div>
                  <div className="plan-feature">
                    <span className="plan-feature-icon">•</span>
                    <span>Remove branding</span>
                  </div>
                </div>
                <button className="btn-primary" style={{ width: '100%' }}>
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {showBuilder && (
        <div className="builder-modal">
          <div className="builder-header">
            <h2 className="builder-title">Build Your Resume</h2>
            <button 
              className="close-builder"
              onClick={() => setShowBuilder(false)}
            >
              Close
            </button>
          </div>
          <div style={{ padding: '20px' }}>
            <ResumeBuilder
              initialData={null}
              showControls={true}
              enableExport={true}
              showATSTools={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

ResumeLandingPage.propTypes = {};

export default ResumeLandingPage;