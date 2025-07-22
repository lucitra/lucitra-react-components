import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VersionDiffViewer from './VersionDiffViewer.jsx';

/**
 * Resume Version Control Component
 * 
 * Tracks all changes made to resume content, especially AI optimizations.
 * Provides undo/redo functionality and version history.
 */

const ResumeVersionControl = ({ 
  versionHistory,
  currentVersion,
  onUndo,
  onRedo,
  onRevertToVersion,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);


  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  // Get change type icon and color
  const getChangeIcon = (changeType) => {
    const icons = {
      'initial': { icon: '📄', color: '#6c757d' },
      'manual': { icon: '✏️', color: '#007bff' },
      'ai-optimization': { icon: '🤖', color: '#667eea' },
      'ai-bullet-point': { icon: '🎯', color: '#28a745' },
      'ai-job-title': { icon: '💼', color: '#fd7e14' },
      'ai-summary': { icon: '📝', color: '#6f42c1' },
      'bulk-edit': { icon: '📊', color: '#20c997' }
    };
    return icons[changeType] || icons.manual;
  };


  const canUndo = currentVersion > 0;
  const canRedo = currentVersion < versionHistory.length - 1;
  const totalVersions = versionHistory.length;
  const unsavedChanges = currentVersion > 0;

  return (
    <>
      <style jsx>{`
        .version-control {
          background: #f8f9fa;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 12px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .version-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .version-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .version-status {
          font-size: 11px;
          color: #666;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-badge {
          background: ${unsavedChanges ? '#ffc107' : '#28a745'};
          color: ${unsavedChanges ? '#000' : '#fff'};
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 500;
        }

        .version-actions {
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
        }

        .btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-undo {
          background: #6c757d;
          color: white;
        }

        .btn-undo:hover:not(:disabled) {
          background: #545b62;
        }

        .btn-redo {
          background: #6c757d;
          color: white;
        }

        .btn-redo:hover:not(:disabled) {
          background: #545b62;
        }

        .btn-history {
          background: #007bff;
          color: white;
        }

        .btn-history:hover {
          background: #0056b3;
        }

        .btn-history.active {
          background: #0056b3;
        }

        .expand-icon {
          transition: transform 0.2s;
          transform: ${isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'};
        }

        .version-history {
          display: ${isExpanded ? 'block' : 'none'};
          margin-top: 8px;
          max-height: 200px;
          overflow-y: auto;
          border-top: 1px solid #dee2e6;
          padding-top: 8px;
        }

        .version-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          border-radius: 4px;
          margin-bottom: 4px;
          font-size: 12px;
          transition: background 0.2s;
          border: 1px solid transparent;
        }

        .version-item:hover {
          background: #e9ecef;
          border-color: #dee2e6;
        }

        .version-item.current {
          background: #d4edda;
          border-left: 3px solid #28a745;
        }

        .change-icon {
          font-size: 14px;
          min-width: 16px;
        }

        .change-details {
          flex: 1;
          min-width: 0;
        }

        .change-description {
          font-weight: 500;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .change-field {
          color: #666;
          font-size: 11px;
        }

        .version-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .version-item:hover .version-actions {
          opacity: 1;
        }

        .btn-diff,
        .btn-revert {
          background: none;
          border: 1px solid #ddd;
          border-radius: 3px;
          padding: 2px 6px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s;
          color: #666;
        }

        .btn-diff:hover {
          background: #007bff;
          border-color: #007bff;
          color: white;
        }

        .btn-revert:hover {
          background: #6c757d;
          border-color: #6c757d;
          color: white;
        }

        .change-timestamp {
          font-size: 10px;
          color: #999;
          white-space: nowrap;
          margin-left: auto;
        }

        .ai-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1px 4px;
          border-radius: 6px;
          font-size: 9px;
          margin-left: 4px;
        }

        .keyboard-shortcuts {
          font-size: 10px;
          color: #666;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #eee;
          display: ${isExpanded ? 'block' : 'none'};
        }
      `}</style>

      <div className={`version-control ${className}`}>
        <div className="version-header">
          <div className="version-title">
            ⏰ Version Control
          </div>
          <div className="version-status">
            <span className="status-badge">
              {unsavedChanges ? 'Modified' : 'Saved'}
            </span>
            <span>v{currentVersion + 1}/{totalVersions}</span>
          </div>
        </div>

        <div className="version-actions">
          <button 
            className="btn btn-undo" 
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            ↶ Undo
          </button>
          <button 
            className="btn btn-redo" 
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            ↷ Redo
          </button>
          <button 
            className={`btn btn-history ${isExpanded ? 'active' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="expand-icon">▶</span> History
          </button>
        </div>

        <div className="version-history">
          {versionHistory.slice().reverse().map((version, index) => {
            const actualIndex = versionHistory.length - 1 - index;
            const isCurrent = actualIndex === currentVersion;
            const changeIcon = getChangeIcon(version.change.type);
            const previousVersion = actualIndex > 0 ? versionHistory[actualIndex - 1] : null;
            
            return (
              <div
                key={version.id}
                className={`version-item ${isCurrent ? 'current' : ''}`}
              >
                <span 
                  className="change-icon" 
                  style={{ color: changeIcon.color }}
                >
                  {changeIcon.icon}
                </span>
                <div className="change-details">
                  <div className="change-description">
                    {version.change.description}
                    {version.change.aiOptimization && (
                      <span className="ai-badge">AI</span>
                    )}
                  </div>
                  {version.change.field && (
                    <div className="change-field">
                      {version.change.field}
                    </div>
                  )}
                </div>
                <div className="version-actions">
                  <button
                    className="btn-diff"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVersion({ version, previousVersion });
                    }}
                    title="View changes"
                  >
                    👁️
                  </button>
                  <button
                    className="btn-revert"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRevertToVersion(actualIndex);
                    }}
                    title="Revert to this version"
                  >
                    ↶
                  </button>
                </div>
                <div className="change-timestamp">
                  {formatTimestamp(version.timestamp)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="keyboard-shortcuts">
          <strong>Shortcuts:</strong> Ctrl+Z (Undo) • Ctrl+Y (Redo) • 👁️ (View Changes)
        </div>
      </div>

      {selectedVersion && (
        <VersionDiffViewer
          version={selectedVersion.version}
          previousVersion={selectedVersion.previousVersion}
          onClose={() => setSelectedVersion(null)}
        />
      )}
    </>
  );
};

ResumeVersionControl.propTypes = {
  versionHistory: PropTypes.array.isRequired,
  currentVersion: PropTypes.number.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  onRevertToVersion: PropTypes.func.isRequired,
  className: PropTypes.string
};

// Export the enhanced update function for use by other components
export const createVersionedUpdate = (versionControlRef) => {
  return (newData, changeInfo = {}) => {
    if (versionControlRef.current) {
      versionControlRef.current.enhancedUpdate(newData, changeInfo);
    }
  };
};

export default ResumeVersionControl;