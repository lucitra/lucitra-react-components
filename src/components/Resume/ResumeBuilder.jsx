import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Resume from "./Resume.jsx";
import { defaultResumeData } from "../../data/resumeData.js";

const ResumeBuilder = ({
  initialData = null,
  onDataChange = () => {},
  onExport = () => {},
  showControls = true,
  enableExport = true,
}) => {
  const [resumeData, setResumeData] = useState(
    initialData || defaultResumeData
  );
  const [config, setConfig] = useState({
    printMode: false,
    singleColumn: false,
    maxWorkItems: null,
    filterByVisibility: true,
  });
  const [activeTab, setActiveTab] = useState("preview");

  const handleDataChange = useCallback(
    (newData) => {
      setResumeData(newData);
      onDataChange(newData);
    },
    [onDataChange]
  );

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
      handleDataChange({
        ...resumeData,
        basics: {
          ...resumeData.basics,
          [field]: value,
        },
      });
    },
    [resumeData, handleDataChange]
  );

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
          background-color: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }

        .btn-success {
          background-color: #28a745;
          color: white;
        }

        .btn-success:hover {
          background-color: #1e7e34;
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
          border: 2px solid #007bff;
          color: #007bff;
        }

        .btn-outline:hover {
          background-color: #007bff;
          color: white;
        }

        .toggle-btn {
          background-color: #f8f9fa;
          border: 2px solid #dee2e6;
          color: #495057;
        }

        .toggle-btn.active {
          background-color: #007bff;
          border-color: #007bff;
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
          background-color: #007bff;
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
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
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
            <Resume data={resumeData} config={config} />
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
                  <textarea
                    id="summary"
                    className="form-control"
                    rows="4"
                    value={resumeData.basics.summary}
                    onChange={(e) => updateBasics("summary", e.target.value)}
                    placeholder="Brief professional summary highlighting your expertise and achievements..."
                    style={{ resize: "vertical", minHeight: "80px" }}
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

                <button className="btn btn-outline" onClick={addWorkExperience}>
                  + Add Work Experience
                </button>
              </div>

              <div className="preview-panel">
                <Resume data={resumeData} config={config} />
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
};

export default ResumeBuilder;
