import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EducationEditor = ({ educationData, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newCourse, setNewCourse] = useState('');

  const updateEducationField = (field, value) => {
    onUpdate({ ...educationData, [field]: value });
  };

  const updateVisibility = (type, value) => {
    onUpdate({
      ...educationData,
      visibility: { ...educationData.visibility, [type]: value }
    });
  };

  const addCourse = () => {
    if (!newCourse.trim()) return;
    
    const courses = educationData.courses || [];
    onUpdate({ 
      ...educationData, 
      courses: [...courses, newCourse.trim()] 
    });
    setNewCourse('');
  };

  const deleteCourse = (courseIndex) => {
    const newCourses = educationData.courses.filter((_, index) => index !== courseIndex);
    onUpdate({ ...educationData, courses: newCourses });
  };

  const updateRelevantCoursework = (value) => {
    // Split by comma and clean up
    const coursework = value.split(',').map(item => item.trim()).filter(item => item);
    onUpdate({ 
      ...educationData, 
      relevantCoursework: coursework.length > 0 ? [coursework.join(', ')] : []
    });
  };

  return (
    <>
      <style jsx>{`
        .education-editor {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          background: #f9f9f9;
        }

        .education-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .education-title {
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

        .education-actions {
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

        .education-details {
          display: ${isExpanded ? 'block' : 'none'};
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

        .course-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .course-text {
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

        .add-course {
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

        .add-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }

        .coursework-section {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #eee;
        }

        .coursework-textarea {
          min-height: 80px;
          resize: vertical;
        }

        .coursework-help {
          font-size: 12px;
          color: #666;
          margin-top: 4px;
        }
      `}</style>

      <div className="education-editor">
        <div className="education-header">
          <div className="education-title" onClick={() => setIsExpanded(!isExpanded)}>
            <span className="expand-icon">▶</span>
            <span>{educationData.institution || 'New Institution'}</span>
            <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
              ({educationData.studyType || 'Degree'})
            </span>
          </div>
          <div className="education-actions">
            <div className="visibility-controls">
              <label className="visibility-control">
                <input
                  type="checkbox"
                  checked={educationData.visibility.online}
                  onChange={(e) => updateVisibility('online', e.target.checked)}
                />
                Online
              </label>
              <label className="visibility-control">
                <input
                  type="checkbox"
                  checked={educationData.visibility.print}
                  onChange={(e) => updateVisibility('print', e.target.checked)}
                />
                Print
              </label>
            </div>
            <button className="delete-btn" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>

        <div className="education-details">
          <div className="form-group">
            <label className="form-label">Institution Name</label>
            <input
              type="text"
              className="form-control"
              value={educationData.institution || ''}
              onChange={(e) => updateEducationField('institution', e.target.value)}
              placeholder="Harvard University"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Study Type</label>
              <input
                type="text"
                className="form-control"
                value={educationData.studyType || ''}
                onChange={(e) => updateEducationField('studyType', e.target.value)}
                placeholder="Master of Science"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Area of Study</label>
              <input
                type="text"
                className="form-control"
                value={educationData.area || ''}
                onChange={(e) => updateEducationField('area', e.target.value)}
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                value={educationData.location || ''}
                onChange={(e) => updateEducationField('location', e.target.value)}
                placeholder="Cambridge, MA"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Graduation Date</label>
              <input
                type="text"
                className="form-control"
                value={educationData.endDate || ''}
                onChange={(e) => updateEducationField('endDate', e.target.value)}
                placeholder="2025"
              />
            </div>
          </div>

          {/* Courses Section */}
          <div className="form-group">
            <label className="form-label">Courses</label>
            {educationData.courses?.map((course, courseIndex) => (
              <div key={courseIndex} className="course-item">
                <div className="course-text">• {course}</div>
                <button
                  className="btn-small btn-delete"
                  onClick={() => deleteCourse(courseIndex)}
                >
                  Delete
                </button>
              </div>
            ))}
            
            <div className="add-course">
              <input
                type="text"
                className="form-control"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                placeholder="Add a course..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCourse();
                  }
                }}
              />
              <button
                className="add-btn"
                onClick={addCourse}
                disabled={!newCourse.trim()}
              >
                Add Course
              </button>
            </div>
          </div>

          {/* Relevant Coursework Section */}
          <div className="coursework-section">
            <div className="form-group">
              <label className="form-label">Relevant Coursework</label>
              <textarea
                className="form-control coursework-textarea"
                value={educationData.relevantCoursework?.[0] || ''}
                onChange={(e) => updateRelevantCoursework(e.target.value)}
                placeholder="Enter comma-separated coursework: Machine Learning, Data Structures, Algorithms..."
              />
              <div className="coursework-help">
                Separate multiple courses with commas. This will appear in a dedicated &ldquo;Relevant Coursework&rdquo; section.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

EducationEditor.propTypes = {
  educationData: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EducationEditor;