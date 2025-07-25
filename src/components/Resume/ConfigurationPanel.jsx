import React from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from './icons/ResumeIcons.jsx';

const ConfigurationPanel = ({ config, onConfigChange }) => {
  const handleChange = (key, value) => {
    onConfigChange({ [key]: value });
  };

  const handleMarginChange = (type, value) => {
    onConfigChange({
      margins: {
        ...config.margins,
        [type]: value
      }
    });
  };

  const handleSpacingChange = (type, value) => {
    onConfigChange({
      spacing: {
        ...config.spacing,
        [type]: value
      }
    });
  };

  return (
    <>
      <style jsx>{`
        .config-panel {
          background-color: #f0f4f8;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          border: 1px solid #e0e0e0;
        }

        .config-section {
          margin-bottom: 20px;
        }

        .config-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 12px;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .subsection {
          margin-bottom: 16px;
          padding-left: 16px;
          border-left: 2px solid #e0e0e0;
        }

        .subsection-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }

        .form-group {
          margin-bottom: 12px;
        }

        .form-label {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #666;
          margin-bottom: 4px;
          cursor: pointer;
          user-select: none;
        }

        .form-control {
          width: 100%;
          padding: 6px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 13px;
          transition: border-color 0.2s;
        }

        .form-control:focus {
          outline: none;
          border-color: #666;
          box-shadow: 0 0 0 2px rgba(102, 102, 102, 0.15);
        }

        .checkbox-group {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          cursor: pointer;
        }

        .checkbox-label input {
          cursor: pointer;
        }

        .range-group {
          display: grid;
          grid-template-columns: 1fr 80px;
          gap: 8px;
          align-items: center;
        }

        .range-input {
          width: 100%;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: #ddd;
          border-radius: 2px;
          outline: none;
        }

        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #333;
          border-radius: 50%;
          cursor: pointer;
        }

        .range-value {
          padding: 4px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 12px;
          text-align: center;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .help-text {
          font-size: 11px;
          color: #888;
          margin-top: 4px;
          font-style: italic;
        }

        .reset-button {
          background: #dc3545;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          margin-top: 12px;
        }

        .reset-button:hover {
          background: #c82333;
        }
      `}</style>

      <div className="config-panel">
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: 0, marginBottom: '16px' }}>
          Advanced Configuration
        </h3>

        {/* Section Visibility */}
        <div className="config-section">
          <div className="section-title">
            <InfoIcon size={16} color="#666" />
            Section Visibility
          </div>

          <div className="subsection">
            <div className="subsection-title">Professional Summary</div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showSummary}
                  onChange={(e) => handleChange('showSummary', e.target.checked)}
                />
                Show Summary
              </label>
              {config.showSummary && (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={config.showSummaryInPrint}
                    onChange={(e) => handleChange('showSummaryInPrint', e.target.checked)}
                  />
                  Include in Print/PDF
                </label>
              )}
            </div>
          </div>

          <div className="subsection">
            <div className="subsection-title">Skills & Technologies</div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showSkills !== false}
                  onChange={(e) => handleChange('showSkills', e.target.checked)}
                />
                Show in Online
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showSkillsInPrint !== false}
                  onChange={(e) => handleChange('showSkillsInPrint', e.target.checked)}
                />
                Show in Print/PDF
              </label>
            </div>
          </div>

          <div className="subsection">
            <div className="subsection-title">Education</div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showEducation !== false}
                  onChange={(e) => handleChange('showEducation', e.target.checked)}
                />
                Show Education Section
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showEducationBullets !== false}
                  onChange={(e) => handleChange('showEducationBullets', e.target.checked)}
                />
                Show Course Bullets
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showRelevantCoursework !== false}
                  onChange={(e) => handleChange('showRelevantCoursework', e.target.checked)}
                />
                Show Relevant Coursework
              </label>
            </div>
          </div>

          <div className="subsection">
            <div className="subsection-title">Patents</div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showPatents}
                  onChange={(e) => handleChange('showPatents', e.target.checked)}
                />
                Show in Online
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showPatentsInPrint !== false}
                  onChange={(e) => handleChange('showPatentsInPrint', e.target.checked)}
                />
                Show in Print/PDF
              </label>
            </div>
          </div>

          <div className="subsection">
            <div className="subsection-title">Work Experience</div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showWorkDates !== false}
                  onChange={(e) => handleChange('showWorkDates', e.target.checked)}
                />
                Show Dates
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showWorkLocation !== false}
                  onChange={(e) => handleChange('showWorkLocation', e.target.checked)}
                />
                Show Locations
              </label>
            </div>
          </div>
        </div>

        {/* Page Margins */}
        <div className="config-section">
          <div className="section-title">
            Page Margins (inches)
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Top</label>
              <div className="range-group">
                <input
                  type="range"
                  className="range-input"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={config.margins?.top || 0.5}
                  onChange={(e) => handleMarginChange('top', parseFloat(e.target.value))}
                />
                <input
                  type="number"
                  className="range-value"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={config.margins?.top || 0.5}
                  onChange={(e) => handleMarginChange('top', parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Bottom</label>
              <div className="range-group">
                <input
                  type="range"
                  className="range-input"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={config.margins?.bottom || 0.5}
                  onChange={(e) => handleMarginChange('bottom', parseFloat(e.target.value))}
                />
                <input
                  type="number"
                  className="range-value"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={config.margins?.bottom || 0.5}
                  onChange={(e) => handleMarginChange('bottom', parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Left</label>
              <div className="range-group">
                <input
                  type="range"
                  className="range-input"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={config.margins?.left || 0.75}
                  onChange={(e) => handleMarginChange('left', parseFloat(e.target.value))}
                />
                <input
                  type="number"
                  className="range-value"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={config.margins?.left || 0.75}
                  onChange={(e) => handleMarginChange('left', parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Right</label>
              <div className="range-group">
                <input
                  type="range"
                  className="range-input"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={config.margins?.right || 0.75}
                  onChange={(e) => handleMarginChange('right', parseFloat(e.target.value))}
                />
                <input
                  type="number"
                  className="range-value"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={config.margins?.right || 0.75}
                  onChange={(e) => handleMarginChange('right', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="help-text">
            Adjust margins for both online and print views. Smaller margins = more content space.
          </div>
        </div>

        {/* Spacing Controls */}
        <div className="config-section">
          <div className="section-title">
            Spacing Controls (pixels)
          </div>
          
          <div className="form-group">
            <label className="form-label">Section Gap</label>
            <div className="range-group">
              <input
                type="range"
                className="range-input"
                min="0"
                max="30"
                step="1"
                value={config.spacing?.sectionGap || 10}
                onChange={(e) => handleSpacingChange('sectionGap', parseInt(e.target.value))}
              />
              <input
                type="number"
                className="range-value"
                min="0"
                max="30"
                step="1"
                value={config.spacing?.sectionGap || 10}
                onChange={(e) => handleSpacingChange('sectionGap', parseInt(e.target.value))}
              />
            </div>
            <div className="help-text">Space between major sections (Experience, Education, etc.)</div>
          </div>

          <div className="form-group">
            <label className="form-label">Item Gap</label>
            <div className="range-group">
              <input
                type="range"
                className="range-input"
                min="0"
                max="20"
                step="1"
                value={config.spacing?.itemGap || 5}
                onChange={(e) => handleSpacingChange('itemGap', parseInt(e.target.value))}
              />
              <input
                type="number"
                className="range-value"
                min="0"
                max="20"
                step="1"
                value={config.spacing?.itemGap || 5}
                onChange={(e) => handleSpacingChange('itemGap', parseInt(e.target.value))}
              />
            </div>
            <div className="help-text">Space between items within a section</div>
          </div>

          <div className="form-group">
            <label className="form-label">Line Height</label>
            <div className="range-group">
              <input
                type="range"
                className="range-input"
                min="1"
                max="2"
                step="0.1"
                value={config.spacing?.lineHeight || 1.4}
                onChange={(e) => handleSpacingChange('lineHeight', parseFloat(e.target.value))}
              />
              <input
                type="number"
                className="range-value"
                min="1"
                max="2"
                step="0.1"
                value={config.spacing?.lineHeight || 1.4}
                onChange={(e) => handleSpacingChange('lineHeight', parseFloat(e.target.value))}
              />
            </div>
            <div className="help-text">Text line height (1.0 = tight, 2.0 = double-spaced)</div>
          </div>

          <div className="form-group">
            <label className="form-label">Bullet Point Spacing</label>
            <div className="range-group">
              <input
                type="range"
                className="range-input"
                min="0"
                max="10"
                step="1"
                value={config.spacing?.bulletGap || 2}
                onChange={(e) => handleSpacingChange('bulletGap', parseInt(e.target.value))}
              />
              <input
                type="number"
                className="range-value"
                min="0"
                max="10"
                step="1"
                value={config.spacing?.bulletGap || 2}
                onChange={(e) => handleSpacingChange('bulletGap', parseInt(e.target.value))}
              />
            </div>
            <div className="help-text">Space between bullet points</div>
          </div>
        </div>

        {/* Font Sizes */}
        <div className="config-section">
          <div className="section-title">
            Font Sizes (points)
          </div>
          
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Name Size</label>
              <input
                type="number"
                className="form-control"
                min="14"
                max="24"
                step="1"
                value={config.fontSize?.name || 20}
                onChange={(e) => handleChange('fontSize', { 
                  ...config.fontSize, 
                  name: parseInt(e.target.value) 
                })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Section Headers</label>
              <input
                type="number"
                className="form-control"
                min="10"
                max="18"
                step="1"
                value={config.fontSize?.header || 14}
                onChange={(e) => handleChange('fontSize', { 
                  ...config.fontSize, 
                  header: parseInt(e.target.value) 
                })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Body Text</label>
              <input
                type="number"
                className="form-control"
                min="8"
                max="14"
                step="0.5"
                value={config.fontSize?.body || 11}
                onChange={(e) => handleChange('fontSize', { 
                  ...config.fontSize, 
                  body: parseFloat(e.target.value) 
                })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Small Text</label>
              <input
                type="number"
                className="form-control"
                min="7"
                max="12"
                step="0.5"
                value={config.fontSize?.small || 9}
                onChange={(e) => handleChange('fontSize', { 
                  ...config.fontSize, 
                  small: parseFloat(e.target.value) 
                })}
              />
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="config-section">
          <div className="section-title">
            Additional Options
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={config.filterByVisibility}
                onChange={(e) => handleChange('filterByVisibility', e.target.checked)}
              />
              <strong>Filter Items by Visibility Settings</strong>
            </label>
            <div className="help-text">
              When enabled, only items marked as visible for the current mode (online/print) will be shown
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={config.compactMode || false}
                onChange={(e) => handleChange('compactMode', e.target.checked)}
              />
              <strong>Compact Mode</strong>
            </label>
            <div className="help-text">
              Reduce all spacing for a more condensed layout
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={config.showDividers || false}
                onChange={(e) => handleChange('showDividers', e.target.checked)}
              />
              <strong>Show Section Dividers</strong>
            </label>
            <div className="help-text">
              Add visual dividers between sections
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Layout</label>
            <select
              className="form-control"
              value={config.singleColumn ? "single" : "three"}
              onChange={(e) => handleChange('singleColumn', e.target.value === "single")}
            >
              <option value="three">Three Column</option>
              <option value="single">Single Column</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Font Style</label>
            <select
              className="form-control"
              value={config.useSerifFont ? "serif" : "sans-serif"}
              onChange={(e) => handleChange('useSerifFont', e.target.value === "serif")}
            >
              <option value="sans-serif">Modern (Sans-serif)</option>
              <option value="serif">Classic (Serif)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Maximum Work Items to Display</label>
            <select
              className="form-control"
              value={config.maxWorkItems || ""}
              onChange={(e) => handleChange('maxWorkItems', e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">All</option>
              <option value="3">3 (Single Page)</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Maximum Bullets per Work Experience</label>
            <select
              className="form-control"
              value={config.maxWorkBullets || ""}
              onChange={(e) => handleChange('maxWorkBullets', e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">All</option>
              <option value="2">2 (Compact)</option>
              <option value="3">3 (Balanced)</option>
              <option value="4">4 (Standard)</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Maximum Education Items to Display</label>
            <select
              className="form-control"
              value={config.maxEducationItems || ""}
              onChange={(e) => handleChange('maxEducationItems', e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">All</option>
              <option value="1">1 (Most Recent)</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Maximum Bullets per Education</label>
            <select
              className="form-control"
              value={config.maxEducationBullets || ""}
              onChange={(e) => handleChange('maxEducationBullets', e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        <button 
          className="reset-button"
          onClick={() => onConfigChange({
            ...config,
            margins: { top: 0.5, bottom: 0.5, left: 0.75, right: 0.75 },
            spacing: { sectionGap: 10, itemGap: 5, lineHeight: 1.4, bulletGap: 2 },
            fontSize: { name: 20, header: 14, body: 11, small: 9 }
          })}
        >
          Reset to Defaults
        </button>
      </div>
    </>
  );
};

ConfigurationPanel.propTypes = {
  config: PropTypes.object.isRequired,
  onConfigChange: PropTypes.func.isRequired
};

export default ConfigurationPanel;