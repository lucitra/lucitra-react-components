import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SkillsEditor = ({ skillsData, onUpdate }) => {
  const [newSkill, setNewSkill] = useState('');

  const updateSkills = (newSkillsList) => {
    onUpdate([{
      category: "All Skills",
      items: [newSkillsList.join(', ')]
    }]);
  };

  const getCurrentSkills = () => {
    if (!skillsData?.[0]?.items?.[0]) return [];
    return skillsData[0].items[0].split(',').map(skill => skill.trim()).filter(skill => skill);
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const currentSkills = getCurrentSkills();
    const updatedSkills = [...currentSkills, newSkill.trim()];
    updateSkills(updatedSkills);
    setNewSkill('');
  };

  const deleteSkill = (skillIndex) => {
    const currentSkills = getCurrentSkills();
    const updatedSkills = currentSkills.filter((_, index) => index !== skillIndex);
    updateSkills(updatedSkills);
  };

  const updateSkill = (skillIndex, newValue) => {
    const currentSkills = getCurrentSkills();
    currentSkills[skillIndex] = newValue.trim();
    updateSkills(currentSkills.filter(skill => skill)); // Remove empty skills
  };

  const currentSkills = getCurrentSkills();

  return (
    <>
      <style jsx>{`
        .skills-editor {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          background: #f9f9f9;
        }

        .skills-header {
          font-weight: 600;
          font-size: 16px;
          color: #333;
          margin-bottom: 16px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 8px;
          margin-bottom: 16px;
        }

        .skill-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .skill-input {
          border: none;
          background: transparent;
          flex: 1;
          font-size: 14px;
          padding: 0;
        }

        .skill-input:focus {
          outline: none;
        }

        .skill-text {
          flex: 1;
          font-size: 14px;
        }

        .btn-small {
          padding: 4px 8px;
          border: none;
          border-radius: 3px;
          font-size: 12px;
          cursor: pointer;
        }

        .btn-delete {
          background: #dc3545;
          color: white;
        }

        .btn-delete:hover {
          background: #c82333;
        }

        .add-skill {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .form-control {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .form-control:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
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

        .add-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }

        .skills-help {
          font-size: 12px;
          color: #666;
          margin-top: 8px;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 4px;
          border-left: 4px solid #007bff;
        }

        .bulk-edit {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #eee;
        }

        .bulk-label {
          font-weight: 500;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .bulk-textarea {
          width: 100%;
          min-height: 80px;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          resize: vertical;
          box-sizing: border-box;
        }

        .bulk-help {
          font-size: 12px;
          color: #666;
          margin-top: 4px;
        }
      `}</style>

      <div className="skills-editor">
        <div className="skills-header">Skills & Technologies</div>
        
        <div className="skills-grid">
          {currentSkills.map((skill, skillIndex) => (
            <div key={skillIndex} className="skill-item">
              <input
                className="skill-input"
                value={skill}
                onChange={(e) => updateSkill(skillIndex, e.target.value)}
                onBlur={(e) => {
                  if (!e.target.value.trim()) {
                    deleteSkill(skillIndex);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.target.blur();
                  }
                }}
              />
              <button
                className="btn-small btn-delete"
                onClick={() => deleteSkill(skillIndex)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="add-skill">
          <input
            type="text"
            className="form-control"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <button
            className="add-btn"
            onClick={addSkill}
            disabled={!newSkill.trim()}
          >
            Add Skill
          </button>
        </div>

        <div className="skills-help">
          💡 <strong>Tip:</strong> Click on any skill to edit it inline. Skills will be displayed as a comma-separated list in your resume.
        </div>

        {/* Bulk Edit Section */}
        <div className="bulk-edit">
          <div className="bulk-label">Bulk Edit (Advanced)</div>
          <textarea
            className="bulk-textarea"
            value={currentSkills.join(', ')}
            onChange={(e) => {
              const newSkills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
              updateSkills(newSkills);
            }}
            placeholder="Enter all skills separated by commas: JavaScript, React, Python, AWS..."
          />
          <div className="bulk-help">
            Edit all skills at once. Separate with commas. Changes are saved automatically.
          </div>
        </div>
      </div>
    </>
  );
};

SkillsEditor.propTypes = {
  skillsData: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SkillsEditor;