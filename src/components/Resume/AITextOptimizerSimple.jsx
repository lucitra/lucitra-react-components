import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AIIcon, OptimizeIcon, CloseIcon } from './icons/ResumeIcons.jsx';
import aiService from '../../services/aiServiceSimple';

/**
 * Consumer-friendly AI Text Optimizer
 * No API keys, simple UI, clear pricing
 */

const AITextOptimizerSimple = ({ 
  originalText, 
  onApplyOptimization, 
  context = {},
  fieldType = 'general',
  fieldName = '',
  onVersionTrack,
  resumeId
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('impact');
  const [usage, setUsage] = useState(null);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // Load usage on mount
  useEffect(() => {
    loadUsage();
  }, []);

  const loadUsage = async () => {
    const currentUsage = await aiService.getUsage();
    setUsage(currentUsage);
  };

  const goals = Object.entries(aiService.optimizationGoals).map(([id, goal]) => ({
    id,
    ...goal
  }));

  const handleOptimize = async () => {
    if (!originalText.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await aiService.optimizeText({
        text: originalText,
        fieldType,
        goal: selectedGoal,
        context,
        resumeId
      });

      if (result.success) {
        setSuggestions(result.suggestions);
        setUsage(prev => ({
          ...prev,
          used: prev.used + 1,
          remaining: prev.remaining - 1
        }));
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('AI optimization failed:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const applyOptimization = (text) => {
    if (onVersionTrack) {
      onVersionTrack({
        field: fieldName,
        originalValue: originalText,
        newValue: text,
        goal: selectedGoal,
        fieldType: fieldType
      });
    } else {
      onApplyOptimization(text);
    }
    
    setSuggestions([]);
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

  const canOptimize = usage && (usage.remaining > 0 || usage.plan !== 'free');

  if (!isVisible) {
    return (
      <button
        className="ai-trigger-btn"
        onClick={() => setIsVisible(true)}
        title="AI Optimize"
      >
        <AIIcon size={14} color="white" />
        <span>AI</span>
      </button>
    );
  }

  return (
    <>
      <style jsx>{`
        .ai-trigger-btn {
          position: absolute;
          right: 4px;
          top: 4px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .ai-trigger-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .ai-optimizer-panel {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 2px solid #667eea;
          border-radius: 12px;
          padding: 20px;
          min-width: 340px;
          max-width: 400px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          z-index: 1000;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .panel-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .close-btn {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
        }

        .close-btn:hover {
          color: #666;
        }

        .usage-indicator {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
          font-size: 13px;
        }

        .usage-bar {
          background: #e9ecef;
          height: 6px;
          border-radius: 3px;
          margin-top: 8px;
          overflow: hidden;
        }

        .usage-fill {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          height: 100%;
          transition: width 0.3s;
        }

        .usage-text {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          font-size: 12px;
          color: #666;
        }

        .goal-selector {
          margin-bottom: 16px;
        }

        .goal-label {
          font-size: 13px;
          font-weight: 500;
          color: #555;
          margin-bottom: 8px;
          display: block;
        }

        .goal-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .goal-option {
          padding: 10px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .goal-option:hover {
          border-color: #667eea;
          background: #f8f9fa;
        }

        .goal-option.selected {
          border-color: #667eea;
          background: linear-gradient(to bottom, #f8f9fa, #fff);
        }

        .goal-icon {
          font-size: 20px;
          margin-bottom: 4px;
        }

        .goal-name {
          font-size: 12px;
          font-weight: 500;
          color: #333;
        }

        .optimize-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .optimize-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .optimize-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .processing {
          text-align: center;
          padding: 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 12px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .suggestions {
          margin-top: 16px;
        }

        .suggestion-card {
          border: 2px solid #28a745;
          border-radius: 8px;
          padding: 16px;
          background: #f8fff9;
          margin-bottom: 12px;
        }

        .suggestion-text {
          background: white;
          border-left: 4px solid #28a745;
          padding: 12px;
          margin: 12px 0;
          font-size: 13px;
          line-height: 1.5;
          border-radius: 0 4px 4px 0;
        }

        .suggestion-actions {
          display: flex;
          gap: 8px;
        }

        .apply-btn {
          flex: 1;
          background: #28a745;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .apply-btn:hover {
          background: #218838;
        }

        .try-again-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .try-again-btn:hover {
          background: #5a6268;
        }

        .upgrade-prompt {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .upgrade-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .upgrade-features {
          font-size: 13px;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .upgrade-btn {
          background: white;
          color: #667eea;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .upgrade-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 12px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 12px;
        }
      `}</style>

      <div className="ai-optimizer-panel" ref={containerRef}>
        <div className="panel-header">
          <div className="panel-title">
            <AIIcon size={20} color="#667eea" />
            AI Optimizer
          </div>
          <button className="close-btn" onClick={() => setIsVisible(false)}>
            <CloseIcon size={20} color="#999" />
          </button>
        </div>

        {usage && (
          <div className="usage-indicator">
            <div>Monthly AI Credits</div>
            <div className="usage-bar">
              <div 
                className="usage-fill" 
                style={{ width: `${(usage.used / (usage.used + usage.remaining)) * 100}%` }}
              />
            </div>
            <div className="usage-text">
              <span>{usage.used} used</span>
              <span>{usage.remaining === 999999 ? 'Unlimited' : `${usage.remaining} left`}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">{error}</div>
        )}

        {!canOptimize ? (
          <div className="upgrade-prompt">
            <div className="upgrade-title">Upgrade to Continue</div>
            <div className="upgrade-features">
              Get 100+ AI optimizations per month<br/>
              Advanced templates • Cover letters • Analytics
            </div>
            <button 
              className="upgrade-btn"
              onClick={() => window.location.href = '/pricing'}
            >
              Start Free Trial
            </button>
          </div>
        ) : isProcessing ? (
          <div className="processing">
            <div className="spinner"></div>
            <div>AI is optimizing your text...</div>
          </div>
        ) : suggestions.length > 0 ? (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-card">
                <div className="suggestion-text">{suggestion}</div>
                <div className="suggestion-actions">
                  <button
                    className="apply-btn"
                    onClick={() => applyOptimization(suggestion)}
                  >
                    Apply This
                  </button>
                  <button
                    className="try-again-btn"
                    onClick={handleOptimize}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="goal-selector">
              <label className="goal-label">What&apos;s your goal?</label>
              <div className="goal-options">
                {goals.map(goal => (
                  <div
                    key={goal.id}
                    className={`goal-option ${selectedGoal === goal.id ? 'selected' : ''}`}
                    onClick={() => setSelectedGoal(goal.id)}
                  >
                    <div className="goal-icon">{goal.icon}</div>
                    <div className="goal-name">{goal.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="optimize-btn"
              onClick={handleOptimize}
              disabled={!originalText.trim()}
            >
              <OptimizeIcon size={16} color="white" />
              Optimize with AI
            </button>
          </>
        )}
      </div>
    </>
  );
};

AITextOptimizerSimple.propTypes = {
  originalText: PropTypes.string.isRequired,
  onApplyOptimization: PropTypes.func.isRequired,
  context: PropTypes.object,
  fieldType: PropTypes.string,
  fieldName: PropTypes.string,
  onVersionTrack: PropTypes.func,
  resumeId: PropTypes.string
};

export default AITextOptimizerSimple;