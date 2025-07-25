import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import atsOptimizer from '../../services/atsOptimizer';

const ATSScoreCard = ({ resumeData, jobDescription = '', onOptimize }) => {
  const [analysis, setAnalysis] = useState(null);
  const [jobMatch, setJobMatch] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('score');

  useEffect(() => {
    // Analyze resume for ATS compatibility
    const atsAnalysis = atsOptimizer.analyzeResume(resumeData);
    setAnalysis(atsAnalysis);

    // If job description provided, do keyword matching
    if (jobDescription) {
      const matchAnalysis = atsOptimizer.matchJobDescription(resumeData, jobDescription);
      setJobMatch(matchAnalysis);
    }
  }, [resumeData, jobDescription]);

  if (!analysis) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  const renderScoreRing = (score, maxScore = 100) => {
    const percentage = (score / maxScore) * 100;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e9ecef"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill={getScoreColor(score)}
        >
          {score}
        </text>
      </svg>
    );
  };

  return (
    <>
      <style jsx>{`
        .ats-score-card {
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          transition: all 0.3s;
        }

        .ats-score-card.expanded {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .score-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .score-summary {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .score-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
        }

        .score-subtitle {
          font-size: 14px;
          color: #666;
          margin-top: 4px;
        }

        .expand-button {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-size: 24px;
          transition: transform 0.3s;
        }

        .expand-button.expanded {
          transform: rotate(180deg);
        }

        .score-details {
          margin-top: 24px;
          display: ${isExpanded ? 'block' : 'none'};
        }

        .detail-tabs {
          display: flex;
          gap: 2px;
          margin-bottom: 20px;
          border-bottom: 2px solid #e9ecef;
        }

        .detail-tab {
          padding: 10px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          transition: all 0.2s;
        }

        .detail-tab.active {
          color: #333;
          border-bottom: 2px solid #333;
          margin-bottom: -2px;
        }

        .tab-content {
          min-height: 200px;
        }

        .category-scores {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .category-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
        }

        .category-name {
          font-size: 14px;
          font-weight: 500;
          color: #495057;
          margin-bottom: 8px;
        }

        .category-score {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .score-bar {
          flex: 1;
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }

        .score-fill {
          height: 100%;
          background: #28a745;
          transition: width 0.5s ease;
        }

        .score-value {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          min-width: 35px;
          text-align: right;
        }

        .suggestions-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .suggestion-item {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
        }

        .suggestion-item.high {
          background: #f8d7da;
          border-color: #f5c6cb;
        }

        .suggestion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .suggestion-category {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #856404;
        }

        .suggestion-priority {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 12px;
          background: #fff;
          color: #856404;
        }

        .suggestion-message {
          font-size: 14px;
          color: #333;
          margin-bottom: 8px;
        }

        .suggestion-solution {
          font-size: 13px;
          color: #666;
          font-style: italic;
        }

        .keyword-analysis {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .keyword-section {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
        }

        .keyword-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }

        .keyword-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .keyword-tag {
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 16px;
          padding: 4px 12px;
          font-size: 13px;
        }

        .keyword-tag.matched {
          background: #d4edda;
          border-color: #c3e6cb;
          color: #155724;
        }

        .keyword-tag.missing {
          background: #f8d7da;
          border-color: #f5c6cb;
          color: #721c24;
        }

        .optimize-button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.2s;
        }

        .optimize-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .tips-section {
          background: #e3f2fd;
          border-radius: 8px;
          padding: 16px;
          margin-top: 20px;
        }

        .tips-title {
          font-size: 16px;
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 12px;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tip-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 8px;
          font-size: 14px;
          color: #333;
        }

        .tip-icon {
          color: #1976d2;
          margin-right: 8px;
          margin-top: 2px;
        }
      `}</style>

      <div className={`ats-score-card ${isExpanded ? 'expanded' : ''}`}>
        <div className="score-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="score-summary">
            {renderScoreRing(analysis.score)}
            <div>
              <h3 className="score-title">ATS Compatibility Score</h3>
              <p className="score-subtitle">
                {analysis.score >= 80 ? 'Excellent' : 
                 analysis.score >= 60 ? 'Good - Some improvements needed' :
                 'Needs optimization for ATS systems'}
              </p>
            </div>
          </div>
          <button className={`expand-button ${isExpanded ? 'expanded' : ''}`}>
            ▼
          </button>
        </div>

        <div className="score-details">
          <div className="detail-tabs">
            <button
              className={`detail-tab ${activeTab === 'score' ? 'active' : ''}`}
              onClick={() => setActiveTab('score')}
            >
              Score Breakdown
            </button>
            <button
              className={`detail-tab ${activeTab === 'suggestions' ? 'active' : ''}`}
              onClick={() => setActiveTab('suggestions')}
            >
              Suggestions ({analysis.suggestions.length})
            </button>
            {jobMatch && (
              <button
                className={`detail-tab ${activeTab === 'keywords' ? 'active' : ''}`}
                onClick={() => setActiveTab('keywords')}
              >
                Keyword Match
              </button>
            )}
            <button
              className={`detail-tab ${activeTab === 'tips' ? 'active' : ''}`}
              onClick={() => setActiveTab('tips')}
            >
              ATS Tips
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'score' && (
              <div className="category-scores">
                <div className="category-card">
                  <div className="category-name">Formatting</div>
                  <div className="category-score">
                    <div className="score-bar">
                      <div 
                        className="score-fill" 
                        style={{ 
                          width: `${analysis.formatting.score}%`,
                          background: getScoreColor(analysis.formatting.score)
                        }}
                      />
                    </div>
                    <span className="score-value">{analysis.formatting.score}%</span>
                  </div>
                </div>

                <div className="category-card">
                  <div className="category-name">Sections</div>
                  <div className="category-score">
                    <div className="score-bar">
                      <div 
                        className="score-fill" 
                        style={{ 
                          width: `${analysis.sections.score}%`,
                          background: getScoreColor(analysis.sections.score)
                        }}
                      />
                    </div>
                    <span className="score-value">{analysis.sections.score}%</span>
                  </div>
                </div>

                <div className="category-card">
                  <div className="category-name">Contact Info</div>
                  <div className="category-score">
                    <div className="score-bar">
                      <div 
                        className="score-fill" 
                        style={{ 
                          width: `${analysis.contact.score}%`,
                          background: getScoreColor(analysis.contact.score)
                        }}
                      />
                    </div>
                    <span className="score-value">{analysis.contact.score}%</span>
                  </div>
                </div>

                <div className="category-card">
                  <div className="category-name">Content Quality</div>
                  <div className="category-score">
                    <div className="score-bar">
                      <div 
                        className="score-fill" 
                        style={{ 
                          width: `${analysis.bullets.score}%`,
                          background: getScoreColor(analysis.bullets.score)
                        }}
                      />
                    </div>
                    <span className="score-value">{analysis.bullets.score}%</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'suggestions' && (
              <ul className="suggestions-list">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className={`suggestion-item ${suggestion.priority}`}>
                    <div className="suggestion-header">
                      <span className="suggestion-category">{suggestion.category}</span>
                      <span className="suggestion-priority">{suggestion.priority}</span>
                    </div>
                    <div className="suggestion-message">{suggestion.message}</div>
                    <div className="suggestion-solution">💡 {suggestion.solution}</div>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'keywords' && jobMatch && (
              <div>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '24px', margin: '0' }}>
                    {jobMatch.matchScore}% Match
                  </h4>
                  <p style={{ color: '#666', marginTop: '4px' }}>
                    Based on job description keywords
                  </p>
                </div>
                
                <div className="keyword-analysis">
                  <div className="keyword-section">
                    <h5 className="keyword-title">✓ Matched Keywords</h5>
                    <div className="keyword-list">
                      {jobMatch.matchedKeywords.map((keyword, index) => (
                        <span key={index} className="keyword-tag matched">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="keyword-section">
                    <h5 className="keyword-title">✗ Missing Keywords</h5>
                    <div className="keyword-list">
                      {jobMatch.missingKeywords.map((keyword, index) => (
                        <span key={index} className="keyword-tag missing">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="tips-section">
                <h4 className="tips-title">🎯 ATS Optimization Best Practices</h4>
                <ul className="tips-list">
                  <li className="tip-item">
                    <span className="tip-icon">•</span>
                    <span>Use standard section headers: &quot;Work Experience&quot;, &quot;Education&quot;, &quot;Skills&quot;</span>
                  </li>
                  <li className="tip-item">
                    <span className="tip-icon">•</span>
                    <span>Include both acronyms and full terms (e.g., &quot;AI (Artificial Intelligence)&quot;)</span>
                  </li>
                  <li className="tip-item">
                    <span className="tip-icon">•</span>
                    <span>Start bullet points with strong action verbs</span>
                  </li>
                  <li className="tip-item">
                    <span className="tip-icon">•</span>
                    <span>Include quantifiable achievements with numbers and percentages</span>
                  </li>
                  <li className="tip-item">
                    <span className="tip-icon">•</span>
                    <span>Use simple, standard fonts and avoid graphics or images</span>
                  </li>
                  <li className="tip-item">
                    <span className="tip-icon">•</span>
                    <span>Save as .docx or .pdf (text-based, not image-based)</span>
                  </li>
                  <li className="tip-item">
                    <span className="tip-icon">•</span>
                    <span>Avoid tables, text boxes, and complex formatting</span>
                  </li>
                  <li className="tip-item">
                    <span className="tip-icon">•</span>
                    <span>List skills exactly as they appear in the job description</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {onOptimize && (
            <button className="optimize-button" onClick={onOptimize}>
              🚀 Optimize Resume for ATS
            </button>
          )}
        </div>
      </div>
    </>
  );
};

ATSScoreCard.propTypes = {
  resumeData: PropTypes.object.isRequired,
  jobDescription: PropTypes.string,
  onOptimize: PropTypes.func
};

export default ATSScoreCard;