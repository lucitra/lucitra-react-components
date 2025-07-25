import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AITextInput from './AITextInput.jsx';
import VisibilityToggle from './VisibilityToggle.jsx';

const WorkExperienceEditor = ({ 
  workData, 
  onUpdate, 
  onDelete, 
  userSubscription = 'free',
  remainingCredits = 3,
  onUpgrade,
  onCreditUsed,
  onVersionTrack,
  context = {}
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [editingHighlight, setEditingHighlight] = useState(null);
  const [newHighlight, setNewHighlight] = useState('');

  const updateWorkField = (field, value) => {
    onUpdate({ ...workData, [field]: value });
  };

  const updateVisibility = (newVisibility) => {
    onUpdate({
      ...workData,
      visibility: newVisibility
    });
  };

  const updatePosition = (positionIndex, field, value) => {
    const newPositions = [...workData.positions];
    newPositions[positionIndex] = { ...newPositions[positionIndex], [field]: value };
    onUpdate({ ...workData, positions: newPositions });
  };

  const addHighlight = (positionIndex) => {
    if (!newHighlight.trim()) return;
    
    const newPositions = [...workData.positions];
    if (!newPositions[positionIndex].highlights) {
      newPositions[positionIndex].highlights = [];
    }
    newPositions[positionIndex].highlights.push(newHighlight.trim());
    onUpdate({ ...workData, positions: newPositions });
    setNewHighlight('');
  };

  const updateHighlight = (positionIndex, highlightIndex, value) => {
    const newPositions = [...workData.positions];
    newPositions[positionIndex].highlights[highlightIndex] = value;
    onUpdate({ ...workData, positions: newPositions });
  };

  const saveHighlight = () => {
    setEditingHighlight(null);
  };

  const deleteHighlight = (positionIndex, highlightIndex) => {
    const newPositions = [...workData.positions];
    newPositions[positionIndex].highlights.splice(highlightIndex, 1);
    onUpdate({ ...workData, positions: newPositions });
  };

  const addPosition = () => {
    const newPosition = {
      title: '',
      location: workData.location,
      startDate: '',
      endDate: null,
      highlights: []
    };
    onUpdate({ 
      ...workData, 
      positions: [...workData.positions, newPosition] 
    });
  };

  const deletePosition = (positionIndex) => {
    const newPositions = workData.positions.filter((_, index) => index !== positionIndex);
    onUpdate({ ...workData, positions: newPositions });
  };

  return (
    <>
      <style jsx>{`
        .work-editor {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          background: #f9f9f9;
        }

        .work-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .work-title {
          font-weight: 600;
          font-size: 16px;
          color: #333;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .expand-icon {
          transition: transform 0.2s;
          transform: ${isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'};
          font-size: 12px;
          color: #666;
        }

        .work-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .visibility-controls {
          display: flex;
          gap: 12px;
          font-size: 12px;
        }

        .visibility-control {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }

        .delete-btn:hover {
          background: #c82333;
        }

        .work-details {
          display: ${isExpanded ? 'block' : 'none'};
          animation: ${isExpanded ? 'slideDown 0.3s ease-out' : 'none'};
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }

        .form-group {
          margin-bottom: 12px;
        }

        .form-label {
          display: block;
          font-weight: 500;
          margin-bottom: 4px;
          font-size: 13px;
          color: #555;
        }

        .form-control {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-control:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .position-section {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 12px;
          background: white;
        }

        .position-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .position-title {
          font-weight: 500;
          color: #666;
        }

        .highlights-section {
          margin-top: 12px;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 8px;
          padding: 8px;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .highlight-text {
          flex: 1;
          font-size: 14px;
          line-height: 1.4;
        }

        .highlight-textarea {
          flex: 1;
          min-height: 60px;
          resize: vertical;
        }

        .highlight-actions {
          display: flex;
          gap: 4px;
        }

        .btn-small {
          padding: 4px 8px;
          border: none;
          border-radius: 3px;
          font-size: 12px;
          cursor: pointer;
        }

        .btn-edit {
          background: #ffc107;
          color: #000;
        }

        .btn-save {
          background: #28a745;
          color: white;
        }

        .btn-cancel {
          background: #6c757d;
          color: white;
        }

        .btn-delete {
          background: #dc3545;
          color: white;
        }

        .add-highlight {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .add-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }

        .add-btn:hover {
          background: #0056b3;
        }

        .section-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #eee;
        }
      `}</style>

      <div className="work-editor">
        <div className="work-header">
          <div className="work-title" onClick={() => setIsExpanded(!isExpanded)}>
            <span className="expand-icon" style={{ 
              display: 'inline-block',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}>▶</span>
            <span>{workData.company || 'New Company'}</span>
            <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
              ({workData.positions?.[0]?.title || 'Position'})
            </span>
          </div>
          <div className="work-actions">
            <VisibilityToggle 
              visibility={workData.visibility}
              onChange={updateVisibility}
            />
            <button className="delete-btn" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>

        {isExpanded && (
        <div className="work-details">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                value={workData.company}
                onChange={(e) => updateWorkField('company', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                value={workData.location}
                onChange={(e) => updateWorkField('location', e.target.value)}
                placeholder="City, State"
              />
            </div>
          </div>

          <h4 style={{ margin: '16px 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
            Positions
          </h4>
          
          {workData.positions?.map((position, positionIndex) => (
            <div key={positionIndex} className="position-section">
              <div className="position-header">
                <span className="position-title">Position {positionIndex + 1}</span>
                {workData.positions.length > 1 && (
                  <button
                    className="btn-small btn-delete"
                    onClick={() => deletePosition(positionIndex)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Job Title</label>
                  <AITextInput
                    type="text"
                    className="form-control"
                    value={position.title}
                    onChange={(e) => updatePosition(positionIndex, 'title', e.target.value)}
                    placeholder="Software Engineer"
                    fieldType="job-title"
                    fieldName={`${workData.company} - Job Title`}
                    context={context}
                    userSubscription={userSubscription}
                    remainingCredits={remainingCredits}
                    onUpgrade={onUpgrade}
                    onCreditUsed={onCreditUsed}
                    onVersionTrack={onVersionTrack}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={position.location}
                    onChange={(e) => updatePosition(positionIndex, 'location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={position.startDate}
                    onChange={(e) => updatePosition(positionIndex, 'startDate', e.target.value)}
                    placeholder="Jan 2020"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={position.endDate || ''}
                    onChange={(e) => updatePosition(positionIndex, 'endDate', e.target.value || null)}
                    placeholder="Present"
                  />
                </div>
              </div>

              <div className="highlights-section">
                <label className="form-label">Key Achievements & Responsibilities</label>
                
                {position.highlights?.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="highlight-item">
                    {editingHighlight === `${positionIndex}-${highlightIndex}` ? (
                      <>
                        <AITextInput
                          className="form-control highlight-textarea"
                          rows={3}
                          value={highlight}
                          onChange={(e) => updateHighlight(positionIndex, highlightIndex, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.ctrlKey) {
                              updateHighlight(positionIndex, highlightIndex, e.target.value);
                            }
                          }}
                          fieldType="bullet-point"
                          fieldName={`${workData.company} - Bullet Point ${highlightIndex + 1}`}
                          context={context}
                          userSubscription={userSubscription}
                          remainingCredits={remainingCredits}
                          onUpgrade={onUpgrade}
                          onCreditUsed={onCreditUsed}
                          onVersionTrack={onVersionTrack}
                        />
                        <div className="highlight-actions">
                          <button
                            className="btn-small btn-save"
                            onClick={saveHighlight}
                          >
                            Save
                          </button>
                          <button
                            className="btn-small btn-cancel"
                            onClick={() => setEditingHighlight(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="highlight-text">• {highlight}</div>
                        <div className="highlight-actions">
                          <button
                            className="btn-small btn-edit"
                            onClick={() => setEditingHighlight(`${positionIndex}-${highlightIndex}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-small btn-delete"
                            onClick={() => deleteHighlight(positionIndex, highlightIndex)}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                <div className="add-highlight">
                  <AITextInput
                    className="form-control"
                    rows={2}
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Add a new achievement or responsibility..."
                    fieldType="bullet-point"
                    fieldName={`${workData.company} - New Bullet Point`}
                    context={context}
                    userSubscription={userSubscription}
                    remainingCredits={remainingCredits}
                    onUpgrade={onUpgrade}
                    onCreditUsed={onCreditUsed}
                    onVersionTrack={onVersionTrack}
                  />
                  <button
                    className="add-btn"
                    onClick={() => addHighlight(positionIndex)}
                    disabled={!newHighlight.trim()}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="section-actions">
            <button className="add-btn" onClick={addPosition}>
              + Add Position
            </button>
          </div>
        </div>
        )}
      </div>
    </>
  );
};

WorkExperienceEditor.propTypes = {
  workData: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  userSubscription: PropTypes.oneOf(['free', 'pro', 'enterprise']),
  remainingCredits: PropTypes.number,
  onUpgrade: PropTypes.func,
  onCreditUsed: PropTypes.func,
  onVersionTrack: PropTypes.func,
  context: PropTypes.object
};

export default WorkExperienceEditor;