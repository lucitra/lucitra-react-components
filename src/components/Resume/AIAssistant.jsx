import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * AI Assistant Component for Resume Optimization
 * 
 * Business Model Considerations:
 * - Freemium: 3 AI optimizations per month free, unlimited with subscription
 * - Usage-based: Per optimization pricing with bulk discounts
 * - Subscription: Monthly/Annual plans with quotas
 * - Enterprise: Custom pricing with API integration
 * 
 * Cost Optimization Strategies:
 * - Batch similar requests to reduce API calls
 * - Cache common optimizations (job categories, industry templates)
 * - Use cheaper models for simple tasks, expensive for complex analysis
 * - Implement request queuing during high usage
 * - Pre-generate templates for common job roles
 */

const AIAssistant = ({ 
  resumeData, 
  onResumeUpdate, 
  onGenerateCoverLetter,
  userSubscription = 'free',
  remainingCredits = 3,
  onUpgrade
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOptimization, setLastOptimization] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Simulate AI processing (replace with actual API calls)
  const optimizeForJob = async () => {
    if (!jobDescription.trim()) return;
    if (remainingCredits <= 0 && userSubscription === 'free') {
      onUpgrade?.();
      return;
    }

    setIsProcessing(true);
    
    try {
      // This would be replaced with actual AI API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock optimization results
      const optimization = {
        summary: {
          original: resumeData.basics.summary,
          optimized: "AI-optimized summary tailored for this specific role...",
          matchScore: 85,
          keywords: ["machine learning", "python", "scalable systems"]
        },
        bulletPoints: [
          {
            workIndex: 0,
            positionIndex: 0,
            highlightIndex: 0,
            original: resumeData.work[0]?.positions[0]?.highlights[0] || "",
            optimized: "Architected ML-powered healthcare platform using TypeScript and Python, reducing patient onboarding by 40% and improving clinical workflow efficiency",
            matchScore: 92,
            reasoning: "Added specific metrics and emphasized healthcare domain expertise"
          }
        ],
        skillSuggestions: ["TensorFlow", "PyTorch", "HIPAA Compliance"],
        overallScore: 78,
        recommendations: [
          "Add more quantified achievements",
          "Emphasize healthcare domain experience",
          "Include relevant certifications"
        ]
      };
      
      setLastOptimization(optimization);
      setShowResults(true);
    } catch (error) {
      console.error('AI optimization failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const applyOptimization = (type, data) => {
    switch (type) {
      case 'summary':
        onResumeUpdate({
          ...resumeData,
          basics: { ...resumeData.basics, summary: data.optimized }
        });
        break;
      case 'bulletPoint': {
        const newWork = [...resumeData.work];
        newWork[data.workIndex].positions[data.positionIndex].highlights[data.highlightIndex] = data.optimized;
        onResumeUpdate({ ...resumeData, work: newWork });
        break;
      }
      default:
        break;
    }
  };

  const generateCoverLetter = async () => {
    if (remainingCredits <= 0 && userSubscription === 'free') {
      onUpgrade?.();
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate cover letter generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const coverLetter = {
        content: `Dear Hiring Manager,\n\nI am excited to apply for this position at [Company Name]...\n\n[AI-generated content based on resume and job description]\n\nSincerely,\n${resumeData.basics.name}`,
        matchScore: 88
      };
      
      onGenerateCoverLetter?.(coverLetter);
    } catch (error) {
      console.error('Cover letter generation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .ai-assistant {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          margin-bottom: 16px;
        }

        .ai-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .ai-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .credits-badge {
          background: ${userSubscription === 'pro' ? '#28a745' : '#ffc107'};
          color: ${userSubscription === 'pro' ? 'white' : '#000'};
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .job-input {
          width: 100%;
          min-height: 100px;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          resize: vertical;
          box-sizing: border-box;
          font-family: inherit;
        }

        .job-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .ai-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .btn-ai {
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .btn-ai:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #007bff;
          color: #007bff;
        }

        .btn-outline:hover:not(:disabled) {
          background: #007bff;
          color: white;
        }

        .processing {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 14px;
          margin-top: 12px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .optimization-results {
          margin-top: 16px;
          padding: 16px;
          background: white;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .result-item {
          margin-bottom: 16px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
          border-left: 4px solid #28a745;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .match-score {
          background: #28a745;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .text-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin: 8px 0;
        }

        .text-before,
        .text-after {
          padding: 8px;
          border-radius: 4px;
          font-size: 13px;
          line-height: 1.4;
        }

        .text-before {
          background: #fff3cd;
          border-left: 3px solid #ffc107;
        }

        .text-after {
          background: #d4edda;
          border-left: 3px solid #28a745;
        }

        .apply-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }

        .upgrade-prompt {
          text-align: center;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 8px;
          margin-top: 12px;
        }

        .upgrade-btn {
          background: white;
          color: #667eea;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
        }
      `}</style>

      <div className="ai-assistant">
        <div className="ai-header">
          <div className="ai-title">
            🤖 AI Resume Assistant
          </div>
          <div className="credits-badge">
            {userSubscription === 'pro' ? '∞ Pro' : `${remainingCredits} credits`}
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
            Job Description
          </label>
          <textarea
            className="job-input"
            placeholder="Paste the job description here for AI-powered optimization..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="ai-actions">
          <button 
            className="btn-ai btn-primary" 
            onClick={optimizeForJob}
            disabled={!jobDescription.trim() || isProcessing}
          >
            🎯 Optimize Resume
          </button>
          <button 
            className="btn-ai btn-secondary" 
            onClick={generateCoverLetter}
            disabled={!jobDescription.trim() || isProcessing}
          >
            📝 Generate Cover Letter
          </button>
        </div>

        {isProcessing && (
          <div className="processing">
            <div className="spinner"></div>
            Analyzing with AI...
          </div>
        )}

        {showResults && lastOptimization && (
          <div className="optimization-results">
            <h4>🎯 AI Optimization Results (Score: {lastOptimization.overallScore}%)</h4>
            
            <div className="result-item">
              <div className="result-header">
                <strong>Professional Summary</strong>
                <span className="match-score">{lastOptimization.summary.matchScore}%</span>
              </div>
              <div className="text-comparison">
                <div className="text-before">
                  <strong>Before:</strong><br />
                  {lastOptimization.summary.original}
                </div>
                <div className="text-after">
                  <strong>AI Optimized:</strong><br />
                  {lastOptimization.summary.optimized}
                </div>
              </div>
              <button 
                className="apply-btn"
                onClick={() => applyOptimization('summary', lastOptimization.summary)}
              >
                Apply This Change
              </button>
            </div>

            {lastOptimization.bulletPoints.map((bullet, index) => (
              <div key={index} className="result-item">
                <div className="result-header">
                  <strong>Bullet Point Optimization</strong>
                  <span className="match-score">{bullet.matchScore}%</span>
                </div>
                <div className="text-comparison">
                  <div className="text-before">
                    <strong>Before:</strong><br />
                    {bullet.original}
                  </div>
                  <div className="text-after">
                    <strong>AI Optimized:</strong><br />
                    {bullet.optimized}
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: '#666', margin: '8px 0' }}>
                  <strong>Why:</strong> {bullet.reasoning}
                </p>
                <button 
                  className="apply-btn"
                  onClick={() => applyOptimization('bulletPoint', bullet)}
                >
                  Apply This Change
                </button>
              </div>
            ))}
          </div>
        )}

        {remainingCredits <= 0 && userSubscription === 'free' && (
          <div className="upgrade-prompt">
            <h4>🚀 Unlock Unlimited AI Optimization</h4>
            <p>Get unlimited AI-powered resume optimization and cover letter generation</p>
            <button className="upgrade-btn" onClick={onUpgrade}>
              Upgrade to Pro - $9.99/month
            </button>
          </div>
        )}
      </div>
    </>
  );
};

AIAssistant.propTypes = {
  resumeData: PropTypes.object.isRequired,
  onResumeUpdate: PropTypes.func.isRequired,
  onGenerateCoverLetter: PropTypes.func,
  userSubscription: PropTypes.oneOf(['free', 'pro', 'enterprise']),
  remainingCredits: PropTypes.number,
  onUpgrade: PropTypes.func,
};

export default AIAssistant;