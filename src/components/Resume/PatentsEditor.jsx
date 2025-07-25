import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AITextInput from './AITextInput.jsx';
import VisibilityToggle from './VisibilityToggle.jsx';

const PatentsEditor = ({ 
  patentsData = [], 
  onUpdate,
  userSubscription = 'free',
  remainingCredits = 3,
  onUpgrade,
  onCreditUsed,
  onVersionTrack,
  context = {}
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const addPatent = () => {
    const newPatent = {
      title: '',
      inventors: '',
      patentNumber: '',
      date: '',
      url: '',
      visibility: { online: true, print: true }
    };
    onUpdate([...patentsData, newPatent]);
  };

  const updatePatent = (index, field, value) => {
    const newPatents = [...patentsData];
    newPatents[index] = { ...newPatents[index], [field]: value };
    onUpdate(newPatents);
  };

  const updateVisibility = (index, newVisibility) => {
    const newPatents = [...patentsData];
    newPatents[index] = {
      ...newPatents[index],
      visibility: newVisibility
    };
    onUpdate(newPatents);
  };

  const deletePatent = (index) => {
    const newPatents = patentsData.filter((_, i) => i !== index);
    onUpdate(newPatents);
  };

  return (
    <>
      <style jsx>{`
        .patents-editor {
          margin-bottom: 24px;
        }

        .patents-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 18px;
          font-weight: bold;
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

        .add-btn {
          background: #333;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }

        .add-btn:hover {
          background: #000;
        }

        .patents-content {
          display: ${isExpanded ? 'block' : 'none'};
        }

        .patents-editor .patent-item {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          background: #f9f9f9;
        }

        .patent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .patent-title-display {
          font-weight: 600;
          font-size: 16px;
          color: #333;
        }

        .patent-actions {
          display: flex;
          gap: 8px;
          align-items: center;
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
          border-color: #666;
          box-shadow: 0 0 0 2px rgba(102, 102, 102, 0.25);
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #666;
          font-size: 14px;
        }
      `}</style>

      <div className="patents-editor">
        <div className="patents-header">
          <div 
            className="section-title" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="expand-icon">▶</span>
            <span>Patents ({patentsData.length})</span>
          </div>
          <button className="add-btn" onClick={addPatent}>
            + Add Patent
          </button>
        </div>

        <div className="patents-content">
          {patentsData.length === 0 ? (
            <div className="empty-state">
              No patents added yet. Click &quot;Add Patent&quot; to get started.
            </div>
          ) : (
            patentsData.map((patent, index) => (
              <div key={index} className="patent-item">
                <div className="patent-header">
                  <div className="patent-title-display">
                    {patent.title || 'New Patent'}
                  </div>
                  <div className="patent-actions">
                    <VisibilityToggle 
                      visibility={patent.visibility}
                      onChange={(newVisibility) => updateVisibility(index, newVisibility)}
                    />
                    <button 
                      className="delete-btn" 
                      onClick={() => deletePatent(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Patent Title</label>
                  <AITextInput
                    type="text"
                    className="form-control"
                    value={patent.title}
                    onChange={(e) => updatePatent(index, 'title', e.target.value)}
                    placeholder="System and Method for..."
                    fieldType="patent-title"
                    fieldName="Patent Title"
                    context={context}
                    userSubscription={userSubscription}
                    remainingCredits={remainingCredits}
                    onUpgrade={onUpgrade}
                    onCreditUsed={onCreditUsed}
                    onVersionTrack={onVersionTrack}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Patent Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={patent.patentNumber}
                      onChange={(e) => updatePatent(index, 'patentNumber', e.target.value)}
                      placeholder="US10123456B2"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date Issued</label>
                    <input
                      type="text"
                      className="form-control"
                      value={patent.date}
                      onChange={(e) => updatePatent(index, 'date', e.target.value)}
                      placeholder="2023"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Inventors</label>
                  <AITextInput
                    type="text"
                    className="form-control"
                    value={patent.inventors}
                    onChange={(e) => updatePatent(index, 'inventors', e.target.value)}
                    placeholder="Your Name, Co-inventor Name"
                    fieldType="general"
                    fieldName="Patent Inventors"
                    context={context}
                    userSubscription={userSubscription}
                    remainingCredits={remainingCredits}
                    onUpgrade={onUpgrade}
                    onCreditUsed={onCreditUsed}
                    onVersionTrack={onVersionTrack}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Patent URL (optional)</label>
                  <input
                    type="url"
                    className="form-control"
                    value={patent.url}
                    onChange={(e) => updatePatent(index, 'url', e.target.value)}
                    placeholder="https://patents.google.com/patent/..."
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

PatentsEditor.propTypes = {
  patentsData: PropTypes.array,
  onUpdate: PropTypes.func.isRequired,
  userSubscription: PropTypes.oneOf(['free', 'pro', 'enterprise']),
  remainingCredits: PropTypes.number,
  onUpgrade: PropTypes.func,
  onCreditUsed: PropTypes.func,
  onVersionTrack: PropTypes.func,
  context: PropTypes.object
};

export default PatentsEditor;