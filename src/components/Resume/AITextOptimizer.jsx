import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Granular AI Text Optimizer Component
 * 
 * Provides AI optimization for any text field with specific goals and context.
 * Can be attached to any text input/textarea to provide inline AI suggestions.
 */

const AITextOptimizer = ({ 
  originalText, 
  onApplyOptimization, 
  context = {},
  fieldType = 'general',
  fieldName = '',
  userSubscription = 'free',
  remainingCredits = 3,
  onUpgrade,
  onCreditUsed,
  onVersionTrack
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimizations, setOptimizations] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('general');
  const [customGoal, setCustomGoal] = useState('');
  const containerRef = useRef(null);

  // Predefined optimization goals based on field type
  const getOptimizationGoals = (type) => {
    const baseGoals = {
      'job-title': [
        { id: 'impact', label: 'Emphasize Impact', description: 'Highlight leadership and results' },
        { id: 'technical', label: 'Technical Focus', description: 'Emphasize technical skills' },
        { id: 'senior', label: 'Senior Role', description: 'Position for senior/leadership roles' },
        { id: 'startup', label: 'Startup Ready', description: 'Highlight versatility and agility' }
      ],
      'bullet-point': [
        { id: 'quantify', label: 'Add Metrics', description: 'Include numbers and percentages' },
        { id: 'impact', label: 'Show Impact', description: 'Focus on business outcomes' },
        { id: 'action', label: 'Strong Action', description: 'Use powerful action verbs' },
        { id: 'technical', label: 'Technical Detail', description: 'Highlight technical implementation' },
        { id: 'leadership', label: 'Leadership', description: 'Emphasize team leadership' }
      ],
      'summary': [
        { id: 'executive', label: 'Executive Level', description: 'Position for C-level roles' },
        { id: 'technical', label: 'Technical Expert', description: 'Highlight deep technical expertise' },
        { id: 'versatile', label: 'Versatile Leader', description: 'Show broad skill set' },
        { id: 'industry', label: 'Industry Expert', description: 'Emphasize domain knowledge' }
      ],
      'skills': [
        { id: 'trending', label: 'Trending Tech', description: 'Emphasize modern technologies' },
        { id: 'comprehensive', label: 'Comprehensive', description: 'Show breadth of knowledge' },
        { id: 'specialized', label: 'Specialized', description: 'Focus on niche expertise' }
      ],
      'general': [
        { id: 'professional', label: 'Professional', description: 'More formal and polished' },
        { id: 'concise', label: 'Concise', description: 'Shorter and more direct' },
        { id: 'detailed', label: 'Detailed', description: 'More comprehensive' },
        { id: 'impact', label: 'Impact-Focused', description: 'Emphasize results and outcomes' }
      ]
    };
    return baseGoals[type] || baseGoals.general;
  };

  const availableGoals = getOptimizationGoals(fieldType);

  // Mock AI optimization with realistic context-aware suggestions
  const generateOptimizations = async (goal, text, context) => {
    const mockOptimizations = {
      'job-title': {
        'impact': {
          original: text,
          optimized: text.replace(/Engineer/, 'Senior Engineer & Team Lead').replace(/Developer/, 'Lead Developer'),
          reasoning: 'Added leadership indicators and seniority markers to emphasize impact and responsibility'
        },
        'technical': {
          original: text,
          optimized: `${text} | AI/ML Systems Architecture`,
          reasoning: 'Added specific technical specialization to highlight deep technical expertise'
        }
      },
      'bullet-point': {
        'quantify': {
          original: text,
          optimized: text.includes('improved') 
            ? text.replace(/improved/, 'improved by 40%').concat(' affecting 10,000+ daily users')
            : text.concat(' - achieved 25% performance improvement with 99.9% uptime'),
          reasoning: 'Added specific metrics and scale indicators to quantify impact'
        },
        'impact': {
          original: text,
          optimized: text.replace(/built/, 'architected and delivered').replace(/created/, 'designed and implemented') + ', resulting in $2M annual cost savings',
          reasoning: 'Used stronger action verbs and added business impact metrics'
        },
        'action': {
          original: text,
          optimized: text.replace(/worked on/, 'spearheaded').replace(/helped/, 'championed').replace(/did/, 'executed'),
          reasoning: 'Replaced weak verbs with powerful action words that show ownership'
        },
        'technical': {
          original: text,
          optimized: text + ' using TypeScript, React, Node.js with Docker containerization and AWS deployment',
          reasoning: 'Added specific technical stack details to demonstrate technical depth'
        }
      },
      'summary': {
        'executive': {
          original: text,
          optimized: text.replace(/engineer/, 'technology leader').concat(' with proven track record of scaling teams from 5 to 50+ engineers and delivering products serving millions of users.'),
          reasoning: 'Repositioned from individual contributor to strategic leader with scale indicators'
        },
        'technical': {
          original: text,
          optimized: text.replace(/experience/, 'deep technical expertise').concat(' Recognized expert in distributed systems, machine learning pipelines, and cloud-native architecture.'),
          reasoning: 'Emphasized technical depth and industry recognition'
        }
      },
      'general': {
        'professional': {
          original: text,
          optimized: text.charAt(0).toUpperCase() + text.slice(1).replace(/&/, 'and'),
          reasoning: 'Improved capitalization and formal language conventions'
        },
        'concise': {
          original: text,
          optimized: text.split(' ').slice(0, Math.max(8, text.split(' ').length * 0.7)).join(' '),
          reasoning: 'Condensed to essential information for better readability'
        }
      }
    };

    // Get the appropriate mock based on field type and goal
    const fieldMocks = mockOptimizations[fieldType] || mockOptimizations.general;
    const mockData = fieldMocks[goal] || fieldMocks.professional || {
      original: text,
      optimized: `${text} [AI-optimized for ${goal}]`,
      reasoning: `Enhanced for ${goal} optimization goal`
    };

    // Add context-aware modifications
    if (context.jobDescription) {
      const jobKeywords = ['AI', 'machine learning', 'React', 'Python', 'leadership', 'scalable'];
      const foundKeywords = jobKeywords.filter(keyword => 
        context.jobDescription.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (foundKeywords.length > 0) {
        mockData.optimized += ` (tailored for: ${foundKeywords.join(', ')})`;
        mockData.reasoning += `. Incorporated job-relevant keywords: ${foundKeywords.join(', ')}`;
      }
    }

    return mockData;
  };

  const handleOptimize = async () => {
    if (!originalText.trim()) return;
    if (remainingCredits <= 0 && userSubscription === 'free') {
      onUpgrade?.();
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const goalToUse = selectedGoal === 'custom' ? customGoal : selectedGoal;
      const optimization = await generateOptimizations(goalToUse, originalText, context);
      
      setOptimizations([{
        id: Date.now(),
        goal: goalToUse,
        ...optimization,
        confidence: Math.floor(Math.random() * 20) + 80 // 80-100% confidence
      }]);
      
      onCreditUsed?.();
    } catch (error) {
      console.error('AI optimization failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const applyOptimization = (optimization) => {
    // Track the AI optimization in version control
    if (onVersionTrack) {
      onVersionTrack({
        field: fieldName,
        originalValue: originalText,
        newValue: optimization.optimized,
        goal: optimization.goal,
        confidence: optimization.confidence,
        reasoning: optimization.reasoning,
        fieldType: fieldType
      });
    }
    
    onApplyOptimization(optimization.optimized);
    setOptimizations([]);
    setIsVisible(false);
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isVisible) {
    return (
      <button
        style={{
          position: 'absolute',
          right: '4px',
          top: '4px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          fontSize: '12px',
          cursor: 'pointer',
          zIndex: 1000,
          opacity: 0.8,
          transition: 'opacity 0.2s'
        }}
        onClick={() => setIsVisible(true)}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0.8'}
      >
        ✨ AI
      </button>
    );
  }

  return (
    <>
      <style jsx>{`
        .ai-optimizer-overlay {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 2px solid #667eea;
          border-radius: 8px;
          padding: 16px;
          min-width: 320px;
          max-width: 400px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          z-index: 1001;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .optimizer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .optimizer-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #999;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: #666;
        }

        .original-text {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          padding: 8px;
          font-size: 12px;
          margin-bottom: 12px;
          color: #666;
          max-height: 60px;
          overflow-y: auto;
        }

        .goal-section {
          margin-bottom: 12px;
        }

        .goal-label {
          font-size: 12px;
          font-weight: 500;
          color: #555;
          margin-bottom: 6px;
          display: block;
        }

        .goal-select {
          width: 100%;
          padding: 6px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .custom-goal-input {
          width: 100%;
          padding: 6px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 12px;
          display: ${selectedGoal === 'custom' ? 'block' : 'none'};
          margin-bottom: 8px;
        }

        .goal-description {
          font-size: 11px;
          color: #666;
          font-style: italic;
          margin-bottom: 8px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .btn-optimize {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .btn-optimize:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .processing {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #666;
          font-size: 12px;
          justify-content: center;
          padding: 8px;
        }

        .spinner {
          width: 12px;
          height: 12px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .optimization-result {
          border: 1px solid #28a745;
          border-radius: 4px;
          padding: 12px;
          background: #f8fff9;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .confidence-badge {
          background: #28a745;
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 500;
        }

        .optimized-text {
          background: #e8f5e8;
          border-left: 3px solid #28a745;
          padding: 8px;
          margin: 8px 0;
          font-size: 12px;
          line-height: 1.3;
        }

        .reasoning {
          font-size: 11px;
          color: #666;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .result-actions {
          display: flex;
          gap: 6px;
        }

        .btn-apply {
          background: #28a745;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
          flex: 1;
        }

        .btn-regenerate {
          background: #6c757d;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
        }

        .credits-warning {
          text-align: center;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 6px;
          font-size: 12px;
        }

        .upgrade-btn {
          background: white;
          color: #667eea;
          border: none;
          padding: 4px 8px;
          border-radius: 3px;
          font-size: 11px;
          cursor: pointer;
          margin-top: 6px;
          font-weight: 600;
        }
      `}</style>

      <div className="ai-optimizer-overlay" ref={containerRef}>
        <div className="optimizer-header">
          <div className="optimizer-title">
            🤖 AI Text Optimizer
          </div>
          <button className="close-btn" onClick={() => setIsVisible(false)}>
            ×
          </button>
        </div>

        <div className="original-text">
          <strong>Original:</strong> {originalText}
        </div>

        {remainingCredits <= 0 && userSubscription === 'free' ? (
          <div className="credits-warning">
            <div>🚀 Unlock AI Text Optimization</div>
            <div style={{ fontSize: '11px', marginTop: '4px' }}>
              Get unlimited AI-powered text improvements
            </div>
            <button className="upgrade-btn" onClick={onUpgrade}>
              Upgrade to Pro - $9.99/month
            </button>
          </div>
        ) : (
          <>
            <div className="goal-section">
              <label className="goal-label">Optimization Goal:</label>
              <select
                className="goal-select"
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
              >
                {availableGoals.map(goal => (
                  <option key={goal.id} value={goal.id}>
                    {goal.label}
                  </option>
                ))}
                <option value="custom">Custom Goal...</option>
              </select>
              
              <input
                type="text"
                className="custom-goal-input"
                placeholder="Describe your specific optimization goal..."
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
              />
              
              {selectedGoal !== 'custom' && (
                <div className="goal-description">
                  {availableGoals.find(g => g.id === selectedGoal)?.description}
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button
                className="btn-optimize"
                onClick={handleOptimize}
                disabled={isProcessing || (!originalText.trim())}
              >
                ✨ Optimize Text
              </button>
            </div>

            {isProcessing && (
              <div className="processing">
                <div className="spinner"></div>
                Optimizing with AI...
              </div>
            )}

            {optimizations.map(opt => (
              <div key={opt.id} className="optimization-result">
                <div className="result-header">
                  <strong style={{ fontSize: '12px' }}>AI Suggestion</strong>
                  <span className="confidence-badge">{opt.confidence}%</span>
                </div>
                
                <div className="optimized-text">
                  {opt.optimized}
                </div>
                
                <div className="reasoning">
                  <strong>Why:</strong> {opt.reasoning}
                </div>
                
                <div className="result-actions">
                  <button
                    className="btn-apply"
                    onClick={() => applyOptimization(opt)}
                  >
                    Apply This Change
                  </button>
                  <button
                    className="btn-regenerate"
                    onClick={handleOptimize}
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

AITextOptimizer.propTypes = {
  originalText: PropTypes.string.isRequired,
  onApplyOptimization: PropTypes.func.isRequired,
  context: PropTypes.object,
  fieldType: PropTypes.oneOf(['job-title', 'bullet-point', 'summary', 'skills', 'general']),
  fieldName: PropTypes.string,
  userSubscription: PropTypes.oneOf(['free', 'pro', 'enterprise']),
  remainingCredits: PropTypes.number,
  onUpgrade: PropTypes.func,
  onCreditUsed: PropTypes.func,
  onVersionTrack: PropTypes.func
};

export default AITextOptimizer;