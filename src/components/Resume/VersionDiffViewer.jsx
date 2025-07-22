import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Version Diff Viewer Component
 * 
 * Shows detailed before/after comparisons for resume version changes
 * Similar to Google Docs revision history
 */

const VersionDiffViewer = ({ 
  version,
  previousVersion,
  onClose,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('summary');

  // Extract differences between versions
  const getDifferences = () => {
    if (!previousVersion) {
      return {
        added: ['Initial version - all content is new'],
        modified: [],
        removed: []
      };
    }

    const differences = {
      added: [],
      modified: [],
      removed: []
    };

    const prev = previousVersion.data;
    const curr = version.data;

    // Compare basics (summary, name, etc.)
    Object.keys(curr.basics || {}).forEach(key => {
      const prevValue = prev.basics?.[key] || '';
      const currValue = curr.basics?.[key] || '';
      
      if (prevValue !== currValue) {
        if (!prevValue && currValue) {
          differences.added.push({
            field: `basics.${key}`,
            fieldName: getFieldDisplayName(`basics.${key}`),
            value: currValue
          });
        } else if (prevValue && !currValue) {
          differences.removed.push({
            field: `basics.${key}`,
            fieldName: getFieldDisplayName(`basics.${key}`),
            value: prevValue
          });
        } else {
          differences.modified.push({
            field: `basics.${key}`,
            fieldName: getFieldDisplayName(`basics.${key}`),
            oldValue: prevValue,
            newValue: currValue
          });
        }
      }
    });

    // Compare work experience
    const prevWork = prev.work || [];
    const currWork = curr.work || [];
    
    currWork.forEach((workItem, workIndex) => {
      const prevWorkItem = prevWork[workIndex];
      
      if (!prevWorkItem) {
        differences.added.push({
          field: `work[${workIndex}]`,
          fieldName: `Work Experience: ${workItem.company}`,
          value: `${workItem.company} - ${workItem.positions?.[0]?.title || 'Position'}`
        });
        return;
      }
      
      // Compare positions within work item
      workItem.positions?.forEach((position, posIndex) => {
        const prevPosition = prevWorkItem.positions?.[posIndex];
        
        if (!prevPosition) {
          differences.added.push({
            field: `work[${workIndex}].positions[${posIndex}]`,
            fieldName: `${workItem.company} - Position`,
            value: position.title
          });
          return;
        }
        
        // Compare position title
        if (position.title !== prevPosition.title) {
          differences.modified.push({
            field: `work[${workIndex}].positions[${posIndex}].title`,
            fieldName: `${workItem.company} - Job Title`,
            oldValue: prevPosition.title,
            newValue: position.title
          });
        }
        
        // Compare highlights
        position.highlights?.forEach((highlight, highlightIndex) => {
          const prevHighlight = prevPosition.highlights?.[highlightIndex];
          
          if (!prevHighlight) {
            differences.added.push({
              field: `work[${workIndex}].positions[${posIndex}].highlights[${highlightIndex}]`,
              fieldName: `${workItem.company} - Bullet Point ${highlightIndex + 1}`,
              value: highlight
            });
          } else if (highlight !== prevHighlight) {
            differences.modified.push({
              field: `work[${workIndex}].positions[${posIndex}].highlights[${highlightIndex}]`,
              fieldName: `${workItem.company} - Bullet Point ${highlightIndex + 1}`,
              oldValue: prevHighlight,
              newValue: highlight
            });
          }
        });
      });
    });

    return differences;
  };

  const getFieldDisplayName = (fieldPath) => {
    const fieldNames = {
      'basics.name': 'Full Name',
      'basics.label': 'Job Title',
      'basics.email': 'Email',
      'basics.phone': 'Phone',
      'basics.website': 'Website',
      'basics.location': 'Location',
      'basics.summary': 'Professional Summary'
    };
    
    return fieldNames[fieldPath] || fieldPath;
  };

  const differences = getDifferences();
  const hasChanges = differences.added.length > 0 || differences.modified.length > 0 || differences.removed.length > 0;

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Get change type icon and color
  const getChangeIcon = (changeType) => {
    const icons = {
      'initial': { icon: '📄', color: '#6c757d', label: 'Initial Version' },
      'manual': { icon: '✏️', color: '#007bff', label: 'Manual Edit' },
      'ai-optimization': { icon: '🤖', color: '#667eea', label: 'AI Optimization' },
      'ai-bullet-point': { icon: '🎯', color: '#28a745', label: 'AI Bullet Point' },
      'ai-job-title': { icon: '💼', color: '#fd7e14', label: 'AI Job Title' },
      'ai-summary': { icon: '📝', color: '#6f42c1', label: 'AI Summary' },
      'bulk-edit': { icon: '📊', color: '#20c997', label: 'Bulk Edit' }
    };
    return icons[changeType] || icons.manual;
  };

  const changeIcon = getChangeIcon(version.change.type);

  return (
    <>
      <style jsx>{`
        .diff-viewer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .diff-viewer {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .diff-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e0e0e0;
          background: #f8f9fa;
        }

        .diff-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .version-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .change-icon {
          font-size: 20px;
        }

        .version-details h3 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }

        .version-meta {
          font-size: 13px;
          color: #666;
          margin: 4px 0 0 0;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: #999;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .close-btn:hover {
          background: #f0f0f0;
          color: #666;
        }

        .change-summary {
          display: flex;
          gap: 16px;
          font-size: 13px;
        }

        .change-count {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .count-added { color: #28a745; }
        .count-modified { color: #ffc107; }
        .count-removed { color: #dc3545; }

        .diff-tabs {
          display: flex;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
        }

        .diff-tab {
          padding: 12px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .diff-tab.active {
          color: #007bff;
          border-bottom-color: #007bff;
          background: white;
        }

        .diff-tab:hover:not(.active) {
          background: #e9ecef;
        }

        .diff-content {
          padding: 20px 24px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .no-changes {
          text-align: center;
          color: #666;
          font-style: italic;
          padding: 40px 20px;
        }

        .change-group {
          margin-bottom: 24px;
        }

        .change-group-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 12px;
          color: #333;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .change-item {
          margin-bottom: 16px;
          padding: 12px;
          border-radius: 6px;
          border-left: 4px solid #ddd;
        }

        .change-item.added {
          background: #f8fff9;
          border-left-color: #28a745;
        }

        .change-item.modified {
          background: #fffdf5;
          border-left-color: #ffc107;
        }

        .change-item.removed {
          background: #fff5f5;
          border-left-color: #dc3545;
        }

        .change-field {
          font-weight: 500;
          font-size: 13px;
          color: #495057;
          margin-bottom: 8px;
        }

        .change-text {
          font-size: 14px;
          line-height: 1.4;
        }

        .change-before,
        .change-after {
          padding: 8px 12px;
          border-radius: 4px;
          margin: 4px 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace;
          font-size: 13px;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .change-before {
          background: #ffebee;
          border: 1px solid #ffcdd2;
          text-decoration: line-through;
          color: #d32f2f;
        }

        .change-after {
          background: #e8f5e8;
          border: 1px solid #c8e6c9;
          color: #2e7d32;
        }

        .single-value {
          background: #f0f0f0;
          border: 1px solid #ddd;
          padding: 8px 12px;
          border-radius: 4px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace;
          font-size: 13px;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .ai-info {
          margin-top: 12px;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 6px;
          font-size: 12px;
        }

        .ai-confidence {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .ai-reasoning {
          opacity: 0.9;
          line-height: 1.3;
        }
      `}</style>

      <div className={`diff-viewer-overlay ${className}`} onClick={onClose}>
        <div className="diff-viewer" onClick={(e) => e.stopPropagation()}>
          <div className="diff-header">
            <div className="diff-title">
              <div className="version-info">
                <span className="change-icon" style={{ color: changeIcon.color }}>
                  {changeIcon.icon}
                </span>
                <div className="version-details">
                  <h3>{version.change.description}</h3>
                  <div className="version-meta">
                    {formatTimestamp(version.timestamp)} • {changeIcon.label}
                  </div>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            
            {hasChanges && (
              <div className="change-summary">
                {differences.added.length > 0 && (
                  <div className="change-count count-added">
                    <span>+{differences.added.length}</span>
                    <span>added</span>
                  </div>
                )}
                {differences.modified.length > 0 && (
                  <div className="change-count count-modified">
                    <span>~{differences.modified.length}</span>
                    <span>modified</span>
                  </div>
                )}
                {differences.removed.length > 0 && (
                  <div className="change-count count-removed">
                    <span>-{differences.removed.length}</span>
                    <span>removed</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="diff-tabs">
            <button
              className={`diff-tab ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`diff-tab ${activeTab === 'detailed' ? 'active' : ''}`}
              onClick={() => setActiveTab('detailed')}
            >
              Detailed Changes
            </button>
            {version.change.aiOptimization && (
              <button
                className={`diff-tab ${activeTab === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                AI Analysis
              </button>
            )}
          </div>

          <div className="diff-content">
            {activeTab === 'summary' && (
              <div>
                {!hasChanges ? (
                  <div className="no-changes">
                    No changes detected in this version
                  </div>
                ) : (
                  <div>
                    {differences.added.length > 0 && (
                      <div className="change-group">
                        <div className="change-group-title">
                          <span style={{ color: '#28a745' }}>+ Added ({differences.added.length})</span>
                        </div>
                        {differences.added.slice(0, 3).map((change, index) => (
                          <div key={index} className="change-item added">
                            <div className="change-field">{change.fieldName}</div>
                            <div className="single-value">{change.value}</div>
                          </div>
                        ))}
                        {differences.added.length > 3 && (
                          <div style={{ color: '#666', fontSize: '13px', fontStyle: 'italic' }}>
                            ...and {differences.added.length - 3} more additions
                          </div>
                        )}
                      </div>
                    )}

                    {differences.modified.length > 0 && (
                      <div className="change-group">
                        <div className="change-group-title">
                          <span style={{ color: '#ffc107' }}>~ Modified ({differences.modified.length})</span>
                        </div>
                        {differences.modified.slice(0, 3).map((change, index) => (
                          <div key={index} className="change-item modified">
                            <div className="change-field">{change.fieldName}</div>
                            <div className="change-before">{change.oldValue}</div>
                            <div className="change-after">{change.newValue}</div>
                          </div>
                        ))}
                        {differences.modified.length > 3 && (
                          <div style={{ color: '#666', fontSize: '13px', fontStyle: 'italic' }}>
                            ...and {differences.modified.length - 3} more modifications
                          </div>
                        )}
                      </div>
                    )}

                    {differences.removed.length > 0 && (
                      <div className="change-group">
                        <div className="change-group-title">
                          <span style={{ color: '#dc3545' }}>- Removed ({differences.removed.length})</span>
                        </div>
                        {differences.removed.slice(0, 3).map((change, index) => (
                          <div key={index} className="change-item removed">
                            <div className="change-field">{change.fieldName}</div>
                            <div className="single-value">{change.value}</div>
                          </div>
                        ))}
                        {differences.removed.length > 3 && (
                          <div style={{ color: '#666', fontSize: '13px', fontStyle: 'italic' }}>
                            ...and {differences.removed.length - 3} more removals
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'detailed' && (
              <div>
                {!hasChanges ? (
                  <div className="no-changes">
                    No changes detected in this version
                  </div>
                ) : (
                  <div>
                    {[...differences.added, ...differences.modified, ...differences.removed].map((change, index) => {
                      const changeType = change.oldValue ? 'modified' : (change.value ? 'added' : 'removed');
                      return (
                        <div key={index} className={`change-item ${changeType}`}>
                          <div className="change-field">{change.fieldName}</div>
                          {change.oldValue ? (
                            <>
                              <div className="change-before">{change.oldValue}</div>
                              <div className="change-after">{change.newValue}</div>
                            </>
                          ) : (
                            <div className="single-value">{change.value}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ai' && version.change.aiOptimization && (
              <div className="ai-info">
                <div className="ai-confidence">
                  AI Confidence: {version.change.aiOptimization.confidence}%
                </div>
                <div className="ai-reasoning">
                  <strong>Goal:</strong> {version.change.aiOptimization.goal}
                </div>
                <div className="ai-reasoning">
                  <strong>Reasoning:</strong> {version.change.aiOptimization.reasoning}
                </div>
                <div className="ai-reasoning">
                  <strong>Field Type:</strong> {version.change.aiOptimization.fieldType}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

VersionDiffViewer.propTypes = {
  version: PropTypes.object.isRequired,
  previousVersion: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default VersionDiffViewer;