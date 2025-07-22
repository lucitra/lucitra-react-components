import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { ResumeHeader } from './ResumeHeader.jsx';
import { ResumeSummary } from './ResumeSummary.jsx';
import { ResumeThreeColumn } from './ResumeThreeColumn.jsx';
import { ResumeSingleColumn } from './ResumeSingleColumn.jsx';
import { ResumeExperience } from './ResumeExperience.jsx';
import WorkExperienceEditor from './WorkExperienceEditor.jsx';
import EducationEditor from './EducationEditor.jsx';
import SkillsEditor from './SkillsEditor.jsx';
import AIAssistant from './AIAssistant.jsx';
import AITextInput from './AITextInput.jsx';
import ResumeVersionControl from './ResumeVersionControl.jsx';
import { useResumeVersionControl } from '../../hooks/useResumeVersionControl.js';
import { updateResumeField, getFieldPathWithContext } from '../../utils/resumeFieldUpdater.js';
import { defaultResumeData } from "../../data/resumeData.js";
import { OptimizeIcon, InfoIcon } from './icons/ResumeIcons.jsx';

const ResumeBuilder = ({
  initialData = null,
  onDataChange = () => {},
  onExport = () => {},
  showControls = true,
  enableExport = true,
  useSerifFont = false,
}) => {
  // Replace basic state with version control
  const {
    currentData: resumeData,
    versionHistory,
    currentVersion,
    updateWithAI,
    updateManual,
    undo,
    redo,
    revertToVersion
  } = useResumeVersionControl(initialData || defaultResumeData);
  const [config, setConfig] = useState({
    printMode: false,
    singleColumn: false,
    maxWorkItems: null,
    filterByVisibility: true,
    useSerifFont: useSerifFont,
  });
  const [activeTab, setActiveTab] = useState("preview");
  const [aiContext, setAIContext] = useState({
    jobDescription: '',
    targetRole: '',
    industryFocus: ''
  });
  const [aiCredits, setAICredits] = useState(3);
  const [aiSubscription, setAISubscription] = useState('free');

  const handleDataChange = useCallback(
    (newData) => {
      // This will be called for version-controlled updates
      onDataChange(newData);
    },
    [onDataChange]
  );

  // Version control for AI optimizations - directly updates resume data
  const handleAIVersionTrack = useCallback((aiInfo) => {
    // Use the field updater to directly update the resume data structure
    const fieldInfo = getFieldPathWithContext(aiInfo.field, resumeData);
    
    if (fieldInfo && fieldInfo.path) {
      // Update the resume data directly
      const updatedData = updateResumeField(resumeData, fieldInfo.path, aiInfo.newValue);
      
      // Track this change in version control
      updateWithAI(updatedData, aiInfo);
      
      // Notify parent component
      handleDataChange(updatedData);
    } else {
      console.warn('Could not determine field path for AI optimization:', aiInfo.field);
      // Fallback to the old approach
      updateWithAI(resumeData, aiInfo);
    }
  }, [resumeData, updateWithAI, handleDataChange]);

  const handleConfigChange = useCallback((newConfig) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const exportResume = useCallback(
    (format) => {
      if (format === "json") {
        const dataStr = JSON.stringify(resumeData, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume.json";
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === "pdf") {
        // Set print mode temporarily while preserving layout selection and trigger print
        const originalConfig = { ...config };
        setConfig((prev) => ({
          ...prev,
          printMode: true,
          maxWorkItems: prev.maxWorkItems || 3, // Default to 3 for single-page layout
        }));
        setTimeout(() => {
          window.print();
          setConfig(originalConfig);
        }, 100);
      }
      onExport(format, resumeData);
    },
    [resumeData, config, onExport]
  );

  const updateBasics = useCallback(
    (field, value) => {
      const originalValue = resumeData.basics[field];
      const newData = {
        ...resumeData,
        basics: {
          ...resumeData.basics,
          [field]: value,
        },
      };
      updateManual(newData, `basics.${field}`, originalValue, value);
      handleDataChange(newData);
    },
    [resumeData, updateManual, handleDataChange]
  );

  // Simple inline Resume component for display
  const ResumeDisplay = useCallback(({ data, config }) => {
    if (!data) return <div>No resume data provided</div>;

    const { basics, work, education, skills, patents } = data;
    
    // Filter work experience based on visibility and print mode
    let filteredWork = work;
    if (config.filterByVisibility) {
      filteredWork = work.filter(item => 
        config.printMode ? item.visibility.print : item.visibility.online
      );
    }
    if (config.maxWorkItems && config.maxWorkItems > 0) {
      filteredWork = filteredWork.slice(0, config.maxWorkItems);
    }

    return (
      <div className={`resume-display ${config.printMode ? 'print-mode' : ''}`}>
        <style jsx={true}>{`
          .resume-display {
            max-width: 8.5in;
            margin: 0 auto;
            background: white;
            padding: 0.75in;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #161616;
            box-sizing: border-box;
          }
          
          .print-mode {
            width: 8.5in;
            height: 11in;
            padding: 0.1in;
            margin: 0;
            overflow: hidden;
            font-size: 8pt;
            line-height: 1.3;
          }
          
          .print-mode > * + * {
            margin-top: 0.02rem;
          }
          
          @media print {
            html, body {
              width: 100% !important;
              height: auto !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              color: black !important;
            }
            
            @page {
              size: letter;
              margin: 0.1in;
            }
            
            body * {
              visibility: hidden !important;
            }
            
            .resume-display,
            .resume-display * {
              visibility: visible !important;
            }
            
            .resume-display {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              height: auto !important;
              padding: 0.1in !important;
              margin: 0 !important;
            }
          }
        `}</style>
        
        <ResumeHeader basics={basics} printMode={config.printMode} useSerifFont={config.useSerifFont} />
        <ResumeSummary summary={basics.summary} printMode={config.printMode} useSerifFont={config.useSerifFont} />
        {config.singleColumn ? (
          <ResumeSingleColumn 
            skills={skills} 
            education={education} 
            patents={patents}
            printMode={config.printMode}
            useSerifFont={config.useSerifFont}
          />
        ) : (
          <ResumeThreeColumn 
            skills={skills} 
            education={education} 
            patents={patents}
            printMode={config.printMode}
            useSerifFont={config.useSerifFont}
          />
        )}
        <ResumeExperience work={filteredWork} printMode={config.printMode} useSerifFont={config.useSerifFont} />
      </div>
    );
  }, []);

  const addWorkExperience = useCallback(() => {
    const newWork = {
      company: "",
      location: "",
      startDate: "",
      endDate: null,
      visibility: { online: true, print: true },
      highlights: [],
      positions: [
        {
          title: "",
          location: "",
          startDate: "",
          endDate: null,
          highlights: [],
        },
      ],
    };

    handleDataChange({
      ...resumeData,
      work: [...resumeData.work, newWork],
    });
  }, [resumeData, handleDataChange]);

  const updateWorkExperience = useCallback((index, updatedWork) => {
    const newWork = [...resumeData.work];
    newWork[index] = updatedWork;
    handleDataChange({ ...resumeData, work: newWork });
  }, [resumeData, handleDataChange]);

  const deleteWorkExperience = useCallback((index) => {
    const newWork = resumeData.work.filter((_, i) => i !== index);
    handleDataChange({ ...resumeData, work: newWork });
  }, [resumeData, handleDataChange]);

  const addEducation = useCallback(() => {
    const newEducation = {
      institution: "",
      area: "",
      studyType: "",
      location: "",
      startDate: "",
      endDate: "",
      visibility: { online: true, print: true },
      courses: [],
      relevantCoursework: [],
    };

    handleDataChange({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  }, [resumeData, handleDataChange]);

  const updateEducation = useCallback((index, updatedEducation) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = updatedEducation;
    handleDataChange({ ...resumeData, education: newEducation });
  }, [resumeData, handleDataChange]);

  const deleteEducation = useCallback((index) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index);
    handleDataChange({ ...resumeData, education: newEducation });
  }, [resumeData, handleDataChange]);

  const updateSkills = useCallback((updatedSkills) => {
    handleDataChange({ ...resumeData, skills: updatedSkills });
  }, [resumeData, handleDataChange]);

  const handleCreditUsed = useCallback(() => {
    if (aiSubscription === 'free') {
      setAICredits(prev => Math.max(0, prev - 1));
    }
  }, [aiSubscription]);

  const handleUpgrade = useCallback(() => {
    console.log('Upgrade to Pro requested');
    // TODO: Implement actual subscription upgrade
    setAISubscription('pro');
  }, []);

  const updateAIContext = useCallback((newContext) => {
    setAIContext(prev => ({ ...prev, ...newContext }));
  }, []);

  return (
    <>
      <style jsx={true}>{`
        .resume-builder {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .builder-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e0e0e0;
        }

        .builder-title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .builder-controls {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: #333;
          color: white;
        }

        .btn-primary:hover {
          background-color: #222;
        }

        .btn-success {
          background-color: #666;
          color: white;
        }

        .btn-success:hover {
          background-color: #555;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #545b62;
        }

        .btn-outline {
          background-color: transparent;
          border: 2px solid #666;
          color: #666;
        }

        .btn-outline:hover {
          background-color: #666;
          color: white;
        }

        .toggle-btn {
          background-color: #f8f9fa;
          border: 2px solid #dee2e6;
          color: #495057;
        }

        .toggle-btn.active {
          background-color: #333;
          border-color: #333;
          color: white;
        }

        .select {
          padding: 6px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 14px;
        }

        .tabs {
          display: flex;
          gap: 2px;
          margin-bottom: 20px;
          border-bottom: 2px solid #e0e0e0;
        }

        .tab {
          padding: 12px 24px;
          background-color: #f8f9fa;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          border-radius: 4px 4px 0 0;
          transition: all 0.2s;
        }

        .tab.active {
          background-color: #333;
          color: white;
        }

        .tab:hover:not(.active) {
          background-color: #e9ecef;
        }

        .content {
          min-height: 600px;
        }

        .editor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          align-items: start;
        }

        .editor-panel {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .preview-panel {
          position: sticky;
          top: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-weight: 500;
          margin-bottom: 4px;
          color: #495057;
          font-size: 14px;
        }

        .form-control {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .form-control:focus {
          outline: none;
          border-color: #666;
          box-shadow: 0 0 0 2px rgba(102, 102, 102, 0.25);
        }

        .section-header {
          font-size: 18px;
          font-weight: bold;
          margin: 0 0 16px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #dee2e6;
          color: #495057;
        }

        @media print {
          .resume-builder {
            padding: 0;
          }

          .builder-header,
          .builder-controls,
          .tabs,
          .editor-panel {
            display: none !important;
          }

          .editor-grid {
            grid-template-columns: 1fr;
          }

          .content {
            min-height: auto;
          }
        }

        @media (max-width: 768px) {
          .editor-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .builder-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .control-group {
            justify-content: center;
          }
        }
      `}</style>

      <div className="resume-builder">
        {showControls && (
          <div className="builder-header">
            <h1 className="builder-title">Resume Builder</h1>
            <div className="builder-controls">
              <div className="control-group">
                <button
                  className={`btn toggle-btn ${
                    config.printMode ? "active" : ""
                  }`}
                  onClick={() =>
                    handleConfigChange({ printMode: !config.printMode })
                  }
                >
                  {config.printMode ? "Print Mode ON" : "Print Mode OFF"}
                </button>
              </div>

              <div className="control-group">
                <label htmlFor="layoutSelect">Layout:</label>
                <select
                  id="layoutSelect"
                  className="select"
                  value={config.singleColumn ? "single" : "three"}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleConfigChange({
                      singleColumn: value === "three" ? false : true,
                    });
                  }}
                >
                  <option value="three">Three Column</option>
                  <option value="single">Single Column</option>
                </select>
              </div>

              <div className="control-group">
                <label htmlFor="maxItems">Max Work Items:</label>
                <select
                  id="maxItems"
                  className="select"
                  value={config.maxWorkItems || ""}
                  onChange={(e) =>
                    handleConfigChange({
                      maxWorkItems: e.target.value
                        ? parseInt(e.target.value)
                        : null,
                    })
                  }
                >
                  <option value="">All</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="control-group">
                <label htmlFor="fontStyle">Font Style:</label>
                <select
                  id="fontStyle"
                  className="select"
                  value={config.useSerifFont ? "serif" : "sans-serif"}
                  onChange={(e) =>
                    handleConfigChange({
                      useSerifFont: e.target.value === "serif",
                    })
                  }
                >
                  <option value="sans-serif">Modern (Sans-serif)</option>
                  <option value="serif">Classic (Serif)</option>
                </select>
              </div>

              {enableExport && (
                <div className="control-group">
                  <button
                    className="btn btn-secondary"
                    onClick={() => exportResume("json")}
                  >
                    Export JSON
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => exportResume("pdf")}
                  >
                    Export PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="tabs">
          <button
            className={`tab ${activeTab === "preview" ? "active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={`tab ${activeTab === "edit" ? "active" : ""}`}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </button>
        </div>

        <div className="content">
          {activeTab === "preview" ? (
            <ResumeDisplay data={resumeData} config={config} />
          ) : (
            <div className="editor-grid">
              <div className="editor-panel">
                <h2 className="section-header">Basic Information</h2>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    className="form-control"
                    type="text"
                    value={resumeData.basics.name}
                    onChange={(e) => updateBasics("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="label">
                    Job Title
                  </label>
                  <input
                    id="label"
                    className="form-control"
                    type="text"
                    value={resumeData.basics.label}
                    onChange={(e) => updateBasics("label", e.target.value)}
                    placeholder="Senior Applied AI Engineer | Deep Learning & Scalable AI Systems"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className="form-control"
                    type="email"
                    value={resumeData.basics.email}
                    onChange={(e) => updateBasics("email", e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="form-control"
                    type="tel"
                    value={resumeData.basics.phone}
                    onChange={(e) => updateBasics("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="website">
                    Website
                  </label>
                  <input
                    id="website"
                    className="form-control"
                    type="url"
                    value={resumeData.basics.website}
                    onChange={(e) => updateBasics("website", e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    className="form-control"
                    type="text"
                    value={resumeData.basics.location}
                    onChange={(e) => updateBasics("location", e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="summary">
                    Professional Summary
                  </label>
                  <AITextInput
                    id="summary"
                    className="form-control"
                    rows={4}
                    value={resumeData.basics.summary}
                    onChange={(e) => updateBasics("summary", e.target.value)}
                    placeholder="Brief professional summary highlighting your expertise and achievements..."
                    style={{ resize: "vertical", minHeight: "80px" }}
                    fieldType="summary"
                    fieldName="Professional Summary"
                    context={aiContext}
                    userSubscription={aiSubscription}
                    remainingCredits={aiCredits}
                    onUpgrade={handleUpgrade}
                    onCreditUsed={handleCreditUsed}
                    onVersionTrack={handleAIVersionTrack}
                  />
                </div>

                <h2 className="section-header">Work Experience</h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6c757d",
                    marginBottom: "16px",
                  }}
                >
                  {resumeData.work.length} work experience
                  {resumeData.work.length !== 1 ? "s" : ""} added
                </p>

                {resumeData.work.map((workItem, index) => (
                  <WorkExperienceEditor
                    key={index}
                    workData={workItem}
                    onUpdate={(updatedWork) => updateWorkExperience(index, updatedWork)}
                    onDelete={() => deleteWorkExperience(index)}
                    userSubscription={aiSubscription}
                    remainingCredits={aiCredits}
                    onUpgrade={handleUpgrade}
                    onCreditUsed={handleCreditUsed}
                    onVersionTrack={handleAIVersionTrack}
                    context={aiContext}
                  />
                ))}

                <button className="btn btn-outline" onClick={addWorkExperience}>
                  + Add Work Experience
                </button>

                <h2 className="section-header">Education</h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6c757d",
                    marginBottom: "16px",
                  }}
                >
                  {resumeData.education.length} education entr
                  {resumeData.education.length !== 1 ? "ies" : "y"} added
                </p>

                {resumeData.education.map((educationItem, index) => (
                  <EducationEditor
                    key={index}
                    educationData={educationItem}
                    onUpdate={(updatedEducation) => updateEducation(index, updatedEducation)}
                    onDelete={() => deleteEducation(index)}
                    userSubscription={aiSubscription}
                    remainingCredits={aiCredits}
                    onUpgrade={handleUpgrade}
                    onCreditUsed={handleCreditUsed}
                    onVersionTrack={handleAIVersionTrack}
                    context={aiContext}
                  />
                ))}

                <button className="btn btn-outline" onClick={addEducation}>
                  + Add Education
                </button>

                <h2 className="section-header">Skills & Technologies</h2>
                <SkillsEditor
                  skillsData={resumeData.skills}
                  onUpdate={updateSkills}
                />

                <h2 className="section-header">Version Control</h2>
                <ResumeVersionControl
                  versionHistory={versionHistory}
                  currentVersion={currentVersion}
                  onUndo={undo}
                  onRedo={redo}
                  onRevertToVersion={revertToVersion}
                />

                <h2 className="section-header">AI Assistant</h2>
                
                {/* AI Context Configuration */}
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  border: '1px solid #e0e0e0',
                  marginBottom: '16px'
                }}>
                  <h3 style={{ fontSize: '16px', margin: '0 0 12px 0', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <OptimizeIcon size={18} color="#333" />
                    AI Optimization Context
                  </h3>
                  <p style={{ fontSize: '13px', color: '#666', margin: '0 0 12px 0' }}>
                    Set context to help AI provide more targeted optimizations for any text field
                  </p>
                  
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">Job Description (for targeted optimization)</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={aiContext.jobDescription}
                      onChange={(e) => updateAIContext({ jobDescription: e.target.value })}
                      placeholder="Paste job description here to enable job-specific optimizations..."
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Target Role</label>
                      <input
                        type="text"
                        className="form-control"
                        value={aiContext.targetRole}
                        onChange={(e) => updateAIContext({ targetRole: e.target.value })}
                        placeholder="Senior Engineer, VP of Engineering..."
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Industry Focus</label>
                      <input
                        type="text"
                        className="form-control"
                        value={aiContext.industryFocus}
                        onChange={(e) => updateAIContext({ industryFocus: e.target.value })}
                        placeholder="FinTech, HealthTech, AI/ML..."
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: '12px',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <InfoIcon size={14} color="#666" />
                      Now hover over any text field and click AI for smart suggestions
                    </span>
                    <span style={{ 
                      background: aiSubscription === 'pro' ? '#333' : '#666',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px'
                    }}>
                      {aiSubscription === 'pro' ? '∞ Pro' : `${aiCredits} credits left`}
                    </span>
                  </div>
                </div>

                <AIAssistant
                  resumeData={resumeData}
                  onResumeUpdate={handleDataChange}
                  onGenerateCoverLetter={(coverLetter) => {
                    console.log('Generated cover letter:', coverLetter);
                    // TODO: Handle cover letter display/download
                  }}
                  userSubscription={aiSubscription}
                  remainingCredits={aiCredits}
                  onUpgrade={handleUpgrade}
                />
              </div>

              <div className="preview-panel">
                <ResumeDisplay data={resumeData} config={config} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ResumeBuilder.propTypes = {
  initialData: PropTypes.object,
  onDataChange: PropTypes.func,
  onExport: PropTypes.func,
  showControls: PropTypes.bool,
  enableExport: PropTypes.bool,
  useSerifFont: PropTypes.bool,
};

export default ResumeBuilder;
