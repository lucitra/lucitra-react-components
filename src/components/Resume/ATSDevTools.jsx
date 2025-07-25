import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import atsOptimizer from '../../services/atsOptimizer';

const ATSDevTools = ({ 
  resumeData, 
  jobDescription = '',
  initialPosition = { side: 'right', y: 200 },
  onOptimize
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState(initialPosition);
  const [analysis, setAnalysis] = useState(null);
  const [activePanel, setActivePanel] = useState('score'); // score, issues, keywords
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Re-analyze when resume data changes
  useEffect(() => {
    if (resumeData) {
      const atsAnalysis = atsOptimizer.analyzeResume(resumeData);
      setAnalysis(atsAnalysis);
    }
  }, [resumeData]);

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;
    
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaY = e.clientY - dragStart.y;
      const newY = Math.max(50, Math.min(window.innerHeight - 100, initialPos.y + deltaY));
      const newSide = e.clientX < window.innerWidth / 2 ? 'left' : 'right';
      
      setPosition({ side: newSide, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, initialPos]);

  const handleTabMouseDown = (e) => {
    if (isOpen) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos(position);
    e.preventDefault();
  };

  const handlePanelMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos(position);
    e.preventDefault();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getScoreEmoji = (score) => {
    if (score >= 80) return '🎯';
    if (score >= 60) return '⚡';
    return '⚠️';
  };

  if (!analysis) return null;

  const topIssues = analysis.suggestions.filter(s => s.priority === 'high').slice(0, 3);

  return (
    <>
      <style jsx>{`
        .ats-tab {
          position: fixed;
          ${position.side}: 0;
          top: ${position.y}px;
          background: ${getScoreColor(analysis.score)};
          color: white;
          padding: 12px 16px;
          border-radius: 0 8px 8px 0;
          cursor: ${isDragging ? 'grabbing' : 'pointer'};
          transition: ${isDragging ? 'none' : 'all 0.2s ease'};
          z-index: 9999;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          user-select: none;
        }

        .ats-tab.left {
          border-radius: 8px 0 0 8px;
        }

        .ats-tab:hover {
          transform: ${position.side === 'right' ? 'translateX(-4px)' : 'translateX(4px)'};
        }

        .ats-score {
          font-size: 18px;
          font-weight: bold;
        }

        .ats-label {
          font-size: 11px;
          opacity: 0.9;
        }

        .ats-panel {
          position: fixed;
          ${position.side}: 60px;
          top: ${Math.min(position.y, window.innerHeight - 500)}px;
          width: ${isMinimized ? '280px' : '380px'};
          max-height: ${isMinimized ? '120px' : '500px'};
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          transition: ${isDragging ? 'none' : 'all 0.3s ease'};
          z-index: 9998;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .panel-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: move;
        }

        .panel-title {
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .panel-controls {
          display: flex;
          gap: 8px;
        }

        .control-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .panel-tabs {
          display: flex;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .panel-tab {
          flex: 1;
          padding: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          transition: all 0.2s;
          position: relative;
        }

        .panel-tab.active {
          color: #333;
          background: white;
        }

        .panel-tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #667eea;
        }

        .panel-content {
          padding: 16px;
          max-height: 400px;
          overflow-y: auto;
          display: ${isMinimized ? 'none' : 'block'};
        }

        .score-overview {
          text-align: center;
          padding: 20px;
        }

        .score-ring {
          margin: 0 auto 16px;
        }

        .score-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 20px;
        }

        .score-item {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
        }

        .score-item-label {
          font-size: 11px;
          color: #666;
          margin-bottom: 4px;
        }

        .score-item-value {
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }

        .issues-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .issue-card {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
        }

        .issue-card.high {
          background: #f8d7da;
          border-color: #f5c6cb;
        }

        .issue-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
        }

        .issue-description {
          color: #666;
          font-size: 12px;
          line-height: 1.4;
        }

        .quick-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .quick-stat {
          text-align: center;
        }

        .stat-value {
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }

        .stat-label {
          font-size: 10px;
          color: #666;
          margin-top: 2px;
        }

        .optimize-button {
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.2s;
        }

        .optimize-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .keywords-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 8px;
        }

        .keyword-chip {
          background: #e9ecef;
          border-radius: 16px;
          padding: 4px 10px;
          font-size: 12px;
          text-align: center;
        }

        .keyword-chip.found {
          background: #d4edda;
          color: #155724;
        }

        .keyword-chip.missing {
          background: #f8d7da;
          color: #721c24;
        }

        .minimized-content {
          padding: 12px;
          display: ${isMinimized ? 'block' : 'none'};
        }

        .minimized-stats {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .minimized-stat {
          text-align: center;
        }

        .minimized-score {
          font-size: 24px;
          font-weight: bold;
          color: ${getScoreColor(analysis.score)};
        }

        .minimized-label {
          font-size: 11px;
          color: #666;
        }

        @media (max-width: 768px) {
          .ats-panel {
            width: 320px;
            ${position.side}: 50px;
          }
        }
      `}</style>

      {/* Floating Tab */}
      <div
        className={`ats-tab ${position.side}`}
        onMouseDown={handleTabMouseDown}
        onClick={() => !isDragging && setIsOpen(!isOpen)}
      >
        <span className="ats-score">{getScoreEmoji(analysis.score)} {analysis.score}</span>
        <div>
          <div className="ats-label">ATS SCORE</div>
        </div>
      </div>

      {/* Panel */}
      {isOpen && (
        <div className="ats-panel">
          <div className="panel-header" onMouseDown={handlePanelMouseDown}>
            <div className="panel-title">
              🎯 ATS Optimizer
            </div>
            <div className="panel-controls">
              <button 
                className="control-btn" 
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? '□' : '−'}
              </button>
              <button 
                className="control-btn" 
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

          {isMinimized ? (
            <div className="minimized-content">
              <div className="minimized-stats">
                <div className="minimized-stat">
                  <div className="minimized-score">{analysis.score}</div>
                  <div className="minimized-label">ATS Score</div>
                </div>
                <div className="minimized-stat">
                  <div className="minimized-score" style={{ color: '#dc3545' }}>
                    {topIssues.length}
                  </div>
                  <div className="minimized-label">Critical Issues</div>
                </div>
                <div className="minimized-stat">
                  <div className="minimized-score" style={{ color: '#ffc107' }}>
                    {analysis.suggestions.length - topIssues.length}
                  </div>
                  <div className="minimized-label">Suggestions</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="panel-tabs">
                <button 
                  className={`panel-tab ${activePanel === 'score' ? 'active' : ''}`}
                  onClick={() => setActivePanel('score')}
                >
                  Score
                </button>
                <button 
                  className={`panel-tab ${activePanel === 'issues' ? 'active' : ''}`}
                  onClick={() => setActivePanel('issues')}
                >
                  Issues ({analysis.suggestions.length})
                </button>
                <button 
                  className={`panel-tab ${activePanel === 'keywords' ? 'active' : ''}`}
                  onClick={() => setActivePanel('keywords')}
                >
                  Keywords
                </button>
              </div>

              <div className="panel-content">
                {activePanel === 'score' && (
                  <div className="score-overview">
                    <svg width="120" height="120" viewBox="0 0 120 120" className="score-ring">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#e9ecef"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke={getScoreColor(analysis.score)}
                        strokeWidth="10"
                        strokeDasharray={`${(analysis.score / 100) * 314} 314`}
                        transform="rotate(-90 60 60)"
                        style={{ transition: 'stroke-dasharray 0.5s ease' }}
                      />
                      <text
                        x="60"
                        y="60"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="32"
                        fontWeight="bold"
                        fill={getScoreColor(analysis.score)}
                      >
                        {analysis.score}
                      </text>
                      <text
                        x="60"
                        y="80"
                        textAnchor="middle"
                        fontSize="12"
                        fill="#666"
                      >
                        ATS Score
                      </text>
                    </svg>

                    <div className="score-details">
                      <div className="score-item">
                        <div className="score-item-label">Formatting</div>
                        <div className="score-item-value" style={{ color: getScoreColor(analysis.formatting.score) }}>
                          {analysis.formatting.score}%
                        </div>
                      </div>
                      <div className="score-item">
                        <div className="score-item-label">Sections</div>
                        <div className="score-item-value" style={{ color: getScoreColor(analysis.sections.score) }}>
                          {analysis.sections.score}%
                        </div>
                      </div>
                      <div className="score-item">
                        <div className="score-item-label">Keywords</div>
                        <div className="score-item-value" style={{ color: getScoreColor(analysis.keywords.score) }}>
                          {analysis.keywords.score}%
                        </div>
                      </div>
                      <div className="score-item">
                        <div className="score-item-label">Content</div>
                        <div className="score-item-value" style={{ color: getScoreColor(analysis.bullets.score) }}>
                          {analysis.bullets.score}%
                        </div>
                      </div>
                    </div>

                    {onOptimize && (
                      <button className="optimize-button" onClick={onOptimize}>
                        🚀 Optimize Resume
                      </button>
                    )}
                  </div>
                )}

                {activePanel === 'issues' && (
                  <div className="issues-list">
                    <div className="quick-stats">
                      <div className="quick-stat">
                        <div className="stat-value" style={{ color: '#dc3545' }}>
                          {topIssues.length}
                        </div>
                        <div className="stat-label">Critical</div>
                      </div>
                      <div className="quick-stat">
                        <div className="stat-value" style={{ color: '#ffc107' }}>
                          {analysis.suggestions.filter(s => s.priority === 'medium').length}
                        </div>
                        <div className="stat-label">Medium</div>
                      </div>
                      <div className="quick-stat">
                        <div className="stat-value" style={{ color: '#28a745' }}>
                          {analysis.suggestions.filter(s => s.priority === 'low').length}
                        </div>
                        <div className="stat-label">Low</div>
                      </div>
                    </div>

                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className={`issue-card ${suggestion.priority}`}>
                        <div className="issue-title">{suggestion.message}</div>
                        <div className="issue-description">{suggestion.solution}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activePanel === 'keywords' && (
                  <div>
                    <div className="quick-stats" style={{ marginBottom: '16px' }}>
                      <div className="quick-stat">
                        <div className="stat-value">{analysis.keywords.found.length}</div>
                        <div className="stat-label">Found</div>
                      </div>
                      <div className="quick-stat">
                        <div className="stat-value">{Object.keys(analysis.keywords.density || {}).length}</div>
                        <div className="stat-label">Unique</div>
                      </div>
                      <div className="quick-stat">
                        <div className="stat-value">
                          {Math.max(...Object.values(analysis.keywords.density || {0: 0}))}
                        </div>
                        <div className="stat-label">Max Count</div>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Power Words Found:</h4>
                    <div className="keywords-grid">
                      {analysis.keywords.found.map((keyword, index) => (
                        <div key={index} className="keyword-chip found">
                          {keyword} ({analysis.keywords.density[keyword]})
                        </div>
                      ))}
                    </div>

                    {jobDescription && (
                      <>
                        <h4 style={{ fontSize: '14px', marginTop: '16px', marginBottom: '12px' }}>
                          Job Description Match:
                        </h4>
                        <div className="keywords-grid">
                          {/* This would show matched/missing keywords from job description */}
                          <div className="keyword-chip missing">Add job desc</div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

ATSDevTools.propTypes = {
  resumeData: PropTypes.object.isRequired,
  jobDescription: PropTypes.string,
  initialPosition: PropTypes.shape({
    side: PropTypes.oneOf(['left', 'right']),
    y: PropTypes.number
  }),
  onOptimize: PropTypes.func
};

export default ATSDevTools;