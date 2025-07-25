import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const LinkedInImport = ({ onImport, onClose, userTier = 'free' }) => {
  const [importMethod, setImportMethod] = useState('paste'); // 'paste' or 'file'
  const [pastedData, setPastedData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [parsedPreview, setParsedPreview] = useState(null);
  
  // Parse LinkedIn data (this is a simplified version)
  const parseLinkedInData = (data) => {
    try {
      // This would be more sophisticated in production
      // For now, we'll parse basic structure
      const lines = data.split('\n').filter(line => line.trim());
      
      const resume = {
        basics: {
          name: '',
          label: '',
          email: '',
          phone: '',
          location: {},
          profiles: []
        },
        work: [],
        education: [],
        skills: []
      };
      
      // Simple parsing logic - would need enhancement for production
      let currentSection = null;
      let currentItem = null;
      
      for (const line of lines) {
        const trimmed = line.trim();
        
        // Detect name (usually first line or after "Contact")
        if (!resume.basics.name && trimmed && !trimmed.includes('@')) {
          resume.basics.name = trimmed;
          continue;
        }
        
        // Detect sections
        if (trimmed === 'Experience') {
          currentSection = 'work';
          continue;
        } else if (trimmed === 'Education') {
          currentSection = 'education';
          continue;
        } else if (trimmed === 'Skills' || trimmed === 'Skills & Endorsements') {
          currentSection = 'skills';
          continue;
        }
        
        // Parse content based on section
        if (currentSection === 'work' && trimmed) {
          // Simple work parsing - detect patterns
          if (trimmed.match(/^[A-Z]/) && !trimmed.match(/\d{4}/)) {
            // Likely a job title
            if (currentItem) resume.work.push(currentItem);
            currentItem = {
              name: '',
              positions: [{
                title: trimmed,
                startDate: '',
                endDate: '',
                highlights: []
              }]
            };
          } else if (currentItem && trimmed.match(/at\s+(.+)/)) {
            // Company name
            currentItem.name = trimmed.replace(/at\s+/, '');
          } else if (currentItem && trimmed.match(/\d{4}/)) {
            // Date range
            const dates = trimmed.match(/(\w+\s+\d{4})\s*-\s*(\w+\s+\d{4}|Present)/);
            if (dates) {
              currentItem.positions[0].startDate = dates[1];
              currentItem.positions[0].endDate = dates[2];
            }
          } else if (currentItem && trimmed.startsWith('·') || trimmed.startsWith('•')) {
            // Bullet point
            currentItem.positions[0].highlights.push(trimmed.substring(1).trim());
          }
        } else if (currentSection === 'education' && trimmed) {
          // Simple education parsing
          if (trimmed.match(/^[A-Z]/) && !trimmed.match(/\d{4}/)) {
            if (currentItem) resume.education.push(currentItem);
            currentItem = {
              institution: trimmed,
              area: '',
              studyType: '',
              startDate: '',
              endDate: ''
            };
          } else if (currentItem && trimmed.match(/\d{4}/)) {
            const dates = trimmed.match(/(\d{4})\s*-\s*(\d{4})/);
            if (dates) {
              currentItem.startDate = dates[1];
              currentItem.endDate = dates[2];
            }
          } else if (currentItem && (trimmed.includes('Bachelor') || trimmed.includes('Master') || trimmed.includes('PhD'))) {
            currentItem.studyType = trimmed;
          }
        } else if (currentSection === 'skills' && trimmed) {
          // Simple skills parsing
          if (!trimmed.match(/\d+/) && !trimmed.includes('Endorsements')) {
            resume.skills.push({
              name: trimmed,
              level: 'Intermediate',
              keywords: []
            });
          }
        }
      }
      
      // Add last item
      if (currentItem) {
        if (currentSection === 'work') resume.work.push(currentItem);
        else if (currentSection === 'education') resume.education.push(currentItem);
      }
      
      return resume;
    } catch (err) {
      console.error('Parse error:', err);
      throw new Error('Failed to parse LinkedIn data. Please check the format.');
    }
  };
  
  const handlePaste = useCallback((e) => {
    const text = e.target.value;
    setPastedData(text);
    setError(null);
    
    if (text.length > 100) {
      try {
        const parsed = parseLinkedInData(text);
        setParsedPreview(parsed);
      } catch (err) {
        setParsedPreview(null);
      }
    }
  }, []);
  
  const handleImport = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const parsed = parseLinkedInData(pastedData);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onImport(parsed);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  }, [pastedData, onImport, onClose]);
  
  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setPastedData(event.target.result);
      handlePaste({ target: { value: event.target.result } });
    };
    reader.readAsText(file);
  }, [handlePaste]);
  
  return (
    <>
      <style jsx>{`
        .import-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }
        
        .import-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 700px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .import-header {
          padding: 24px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .import-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .linkedin-logo {
          width: 32px;
          height: 32px;
          background: #0077B5;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
        }
        
        .import-content {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }
        
        .import-methods {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }
        
        .method-btn {
          flex: 1;
          padding: 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        
        .method-btn.active {
          border-color: #0077B5;
          background: #f0f8ff;
        }
        
        .method-btn:hover {
          border-color: #0077B5;
        }
        
        .method-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }
        
        .method-title {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .method-desc {
          font-size: 12px;
          color: #666;
        }
        
        .instructions {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
        }
        
        .instructions h3 {
          margin: 0 0 12px 0;
          font-size: 16px;
        }
        
        .instructions ol {
          margin: 0;
          padding-left: 20px;
        }
        
        .instructions li {
          margin-bottom: 8px;
          font-size: 14px;
          color: #555;
        }
        
        .paste-area {
          width: 100%;
          min-height: 200px;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-family: monospace;
          font-size: 13px;
          resize: vertical;
        }
        
        .paste-area:focus {
          outline: none;
          border-color: #0077B5;
        }
        
        .file-upload {
          border: 2px dashed #e0e0e0;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .file-upload:hover {
          border-color: #0077B5;
          background: #f0f8ff;
        }
        
        .preview-section {
          margin-top: 16px;
          padding: 16px;
          background: #f0f8ff;
          border-radius: 8px;
          border: 1px solid #0077B5;
        }
        
        .preview-title {
          font-weight: 600;
          margin-bottom: 8px;
          color: #0077B5;
        }
        
        .preview-content {
          font-size: 13px;
          color: #555;
        }
        
        .error-message {
          margin-top: 12px;
          padding: 12px;
          background: #fee;
          border: 1px solid #fcc;
          border-radius: 6px;
          color: #c33;
          font-size: 14px;
        }
        
        .import-footer {
          padding: 20px 24px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-primary {
          background: #0077B5;
          color: white;
        }
        
        .btn-primary:hover {
          background: #005885;
        }
        
        .btn-primary:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .btn-secondary {
          background: #f0f0f0;
          color: #333;
        }
        
        .btn-secondary:hover {
          background: #e0e0e0;
        }
        
        .premium-note {
          font-size: 12px;
          color: #666;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .premium-badge {
          background: #ffd700;
          color: #333;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: bold;
        }
      `}</style>
      
      <div className="import-modal" onClick={onClose}>
        <div className="import-container" onClick={(e) => e.stopPropagation()}>
          <div className="import-header">
            <h2 className="import-title">
              <div className="linkedin-logo">in</div>
              Import from LinkedIn
            </h2>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
          
          <div className="import-content">
            <div className="import-methods">
              <button
                className={`method-btn ${importMethod === 'paste' ? 'active' : ''}`}
                onClick={() => setImportMethod('paste')}
              >
                <div className="method-icon">📋</div>
                <div className="method-title">Copy & Paste</div>
                <div className="method-desc">Copy your LinkedIn profile</div>
              </button>
              
              <button
                className={`method-btn ${importMethod === 'file' ? 'active' : ''}`}
                onClick={() => setImportMethod('file')}
              >
                <div className="method-icon">📄</div>
                <div className="method-title">Upload File</div>
                <div className="method-desc">Upload exported LinkedIn data</div>
              </button>
            </div>
            
            {importMethod === 'paste' ? (
              <>
                <div className="instructions">
                  <h3>How to copy your LinkedIn profile:</h3>
                  <ol>
                    <li>Go to your LinkedIn profile</li>
                    <li>Select all text (Ctrl/Cmd + A)</li>
                    <li>Copy the text (Ctrl/Cmd + C)</li>
                    <li>Paste it below (Ctrl/Cmd + V)</li>
                  </ol>
                </div>
                
                <textarea
                  className="paste-area"
                  placeholder="Paste your LinkedIn profile here..."
                  value={pastedData}
                  onChange={handlePaste}
                />
              </>
            ) : (
              <>
                <div className="instructions">
                  <h3>How to export your LinkedIn data:</h3>
                  <ol>
                    <li>Go to LinkedIn Settings & Privacy</li>
                    <li>Click &quot;Get a copy of your data&quot;</li>
                    <li>Select &quot;The works&quot; and request archive</li>
                    <li>Upload the Profile.pdf or connections.csv file</li>
                  </ol>
                </div>
                
                <label className="file-upload">
                  <input
                    type="file"
                    accept=".pdf,.csv,.txt"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <div className="method-icon">⬆️</div>
                  <div>Click to upload or drag and drop</div>
                  <div className="method-desc">Supports PDF, CSV, and TXT files</div>
                </label>
              </>
            )}
            
            {parsedPreview && (
              <div className="preview-section">
                <div className="preview-title">✅ Preview Detected:</div>
                <div className="preview-content">
                  <div>Name: {parsedPreview.basics.name || 'Not detected'}</div>
                  <div>Work Experience: {parsedPreview.work.length} positions found</div>
                  <div>Education: {parsedPreview.education.length} entries found</div>
                  <div>Skills: {parsedPreview.skills.length} skills found</div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}
          </div>
          
          <div className="import-footer">
            <div className="premium-note">
              {userTier === 'free' && (
                <>
                  <span className="premium-badge">PRO</span>
                  Advanced parsing available in Pro
                </>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleImport}
                disabled={!pastedData || isProcessing}
              >
                {isProcessing ? 'Importing...' : 'Import Resume'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LinkedInImport.propTypes = {
  onImport: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  userTier: PropTypes.string
};

export default LinkedInImport;