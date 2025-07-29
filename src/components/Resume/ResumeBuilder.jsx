import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { ResumeHeader } from './ResumeHeader.jsx';
import { ResumeSummary } from './ResumeSummary.jsx';
import { ResumeThreeColumn } from './ResumeThreeColumn.jsx';
import { ResumeSingleColumn } from './ResumeSingleColumn.jsx';
import { ResumeExperience } from './ResumeExperience.jsx';
import { ResumePatents } from './ResumePatents.jsx';
import WorkExperienceEditor from './WorkExperienceEditor.jsx';
import EducationEditor from './EducationEditor.jsx';
import SkillsEditor from './SkillsEditor.jsx';
import AIAssistant from './AIAssistant.jsx';
import AITextInput from './AITextInput.jsx';
import ResumeVersionControl from './ResumeVersionControl.jsx';
import ATSDevTools from './ATSDevTools.jsx';
import { useResumeVersionControl } from '../../hooks/useResumeVersionControl.js';
import { updateResumeField, getFieldPathWithContext } from '../../utils/resumeFieldUpdater.js';
import { defaultResumeData } from "../../data/resumeData.js";
import { OptimizeIcon, InfoIcon } from './icons/ResumeIcons.jsx';
import resumeStorage from '../../services/resumeStorage.js';
import ResumeWatermark from './ResumeWatermark.jsx';
import LinkedInImport from './LinkedInImport.jsx';
import UpgradeModal from './UpgradeModal.jsx';
import featureGating, { SUBSCRIPTION_TIERS } from '../../services/featureGating.js';
import CoverLetter from './CoverLetter.jsx';

import ConfigurationPanel from './ConfigurationPanel.jsx';
import PatentsEditor from './PatentsEditor.jsx';
import { createResumeDesignSystem } from './resumeStyles.js';
import { resumeFonts } from './resumeFonts.js';
import styles from './ResumeBuilder.module.css';

const ResumeBuilder = ({
  initialData = null,
  initialConfig = {},
  onDataChange = () => {},
  onExport = () => {},
  showControls = true,
  enableExport = true,
  useSerifFont = false,
  showATSTools = true,
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
    singleColumn: true,
    maxWorkItems: null,
    maxEducationItems: null,
    maxWorkBullets: null,
    maxEducationBullets: null,
    filterByVisibility: true,
    useSerifFont: useSerifFont,
    showSummary: true,
    showSummaryInPrint: true,
    showPatents: true,
    showPatentsInPrint: true,
    showSkills: true,
    showSkillsInPrint: true,
    showEducation: true,
    showEducationBullets: true,
    showRelevantCoursework: true,
    showWorkDates: true,
    showWorkLocation: true,
    compactMode: false,
    showDividers: false,
    margins: {
      top: 0.5,
      bottom: 0.5,
      left: 0.75,
      right: 0.75
    },
    spacing: {
      sectionGap: 10,
      itemGap: 5,
      lineHeight: 1.4,
      bulletGap: 2
    },
    fontSize: {
      name: 20,
      header: 14,
      body: 11,
      small: 9
    },
    ...initialConfig, // Merge with initial config
    headingFont: resumeFonts.sansSerif[1].value, // Default to Verdana
    bodyFont: resumeFonts.sansSerif[1].value, // Default to Verdana
  });
  const [activeTab, setActiveTab] = useState("preview");
  const [aiContext, setAIContext] = useState({
    jobDescription: '',
    targetRole: '',
    industryFocus: ''
  });
  const [aiCredits, setAICredits] = useState(3);
  const [aiSubscription, setAISubscription] = useState('free');
  
  // Resume storage and management state
  const [savedResumes, setSavedResumes] = useState([]);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [showResumeManager, setShowResumeManager] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveEnabled] = useState(true);
  
  // Freemium model state with premium override check
  const premiumOverride = typeof window !== 'undefined' && window.__RESUME_PREMIUM_MODE__;
  const [userTier, setUserTier] = useState(
    premiumOverride ? SUBSCRIPTION_TIERS.PROFESSIONAL : SUBSCRIPTION_TIERS.ANONYMOUS
  );
  const [showLinkedInImport, setShowLinkedInImport] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [featureToUpgrade, setFeatureToUpgrade] = useState(null);
  
  // Save current resume
  const saveCurrentResume = useCallback((changeDescription = 'Manual save') => {
    // Check if user can save
    if (!featureGating.hasFeature('resumeStorage')) {
      setFeatureToUpgrade('resumeStorage');
      setShowUpgradeModal(true);
      return;
    }
    
    // Check save limit
    const saveLimit = featureGating.getFeatureLimit('resumeStorage');
    if (saveLimit !== -1 && savedResumes.length >= saveLimit && !currentResumeId) {
      setFeatureToUpgrade('resumeStorage');
      setShowUpgradeModal(true);
      return;
    }
    
    setIsSaving(true);
    
    const metadata = {
      name: resumeData.basics?.name || 'My Resume',
      changeDescription,
      targetRole: aiContext.targetRole,
      atsScore: null, // Will be updated by ATS DevTools
      created: currentResumeId ? undefined : new Date().toISOString()
    };
    
    const savedResume = resumeStorage.saveResume(
      { ...resumeData, id: currentResumeId },
      metadata
    );
    
    setCurrentResumeId(savedResume.id);
    setLastSaveTime(new Date());
    setIsSaving(false);
    
    // Refresh saved resumes list
    setSavedResumes(resumeStorage.getAllResumes());
  }, [resumeData, currentResumeId, aiContext.targetRole, savedResumes.length]);
  
  // Create new resume
  const createNewResume = useCallback(() => {
    if (!resumeStorage.canCreateResume()) {
      alert('You have reached the maximum number of resumes for your plan. Please upgrade to create more.');
      return;
    }
    
    setCurrentResumeId(null);
    updateManual(defaultResumeData);
    setAIContext({
      jobDescription: '',
      targetRole: '',
      industryFocus: ''
    });
  }, [updateManual]);
  
  // Load existing resume
  const loadResume = useCallback((resumeId) => {
    const resume = resumeStorage.getResume(resumeId);
    if (resume) {
      setCurrentResumeId(resume.id);
      updateManual(resume.data);
      setAIContext({
        jobDescription: '',
        targetRole: resume.metadata.targetRole || '',
        industryFocus: ''
      });
      setShowResumeManager(false);
    }
  }, [updateManual]);
  
  // Delete resume
  const deleteResume = useCallback((resumeId) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      resumeStorage.deleteResume(resumeId);
      setSavedResumes(resumeStorage.getAllResumes());
      
      if (resumeId === currentResumeId) {
        createNewResume();
      }
    }
  }, [currentResumeId, createNewResume]);
  
  // Export with versions
  const exportWithVersions = useCallback(() => {
    if (!currentResumeId) {
      alert('Please save your resume first before exporting.');
      return;
    }
    
    const exportData = resumeStorage.exportResume(currentResumeId, true);
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume_${new Date().toISOString().split('T')[0]}_with_versions.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [currentResumeId]);

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
      // Check export permissions
      if (format === "json" && !featureGating.hasFeature('jsonExport')) {
        setFeatureToUpgrade('jsonExport');
        setShowUpgradeModal(true);
        return;
      }
      
      if (format === "pdf" && !featureGating.hasFeature('resumeDownloadPDF')) {
        setFeatureToUpgrade('resumeDownloadPDF');
        setShowUpgradeModal(true);
        return;
      }
      
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
    
    // Create the design system
    const designSystem = createResumeDesignSystem(config);
    
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
    
    // Apply max bullets to work items
    if (config.maxWorkBullets && config.maxWorkBullets > 0) {
      filteredWork = filteredWork.map(workItem => ({
        ...workItem,
        positions: workItem.positions.map(position => ({
          ...position,
          highlights: position.highlights.slice(0, config.maxWorkBullets)
        }))
      }));
    }
    
    // Filter education based on visibility and max items
    let filteredEducation = education;
    if (config.showEducation !== false) {
      if (config.filterByVisibility) {
        filteredEducation = education.filter(item => 
          config.printMode ? item.visibility.print : item.visibility.online
        );
      }
      if (config.maxEducationItems && config.maxEducationItems > 0) {
        filteredEducation = filteredEducation.slice(0, config.maxEducationItems);
      }
      
      // Apply max bullets to education items
      if (config.maxEducationBullets && config.maxEducationBullets > 0) {
        filteredEducation = filteredEducation.map(eduItem => ({
          ...eduItem,
          courses: eduItem.courses ? eduItem.courses.slice(0, config.maxEducationBullets) : []
        }));
      }
    } else {
      filteredEducation = [];
    }
    
    // Filter skills based on visibility
    const showSkills = config.printMode ? 
      (config.showSkillsInPrint !== false) : 
      (config.showSkills !== false);
    
    // Filter patents based on visibility
    const showPatents = config.printMode ? 
      (config.showPatentsInPrint !== false && patents && patents.length > 0) : 
      (config.showPatents && patents && patents.length > 0);

    return (
      <div className={`${styles.resumeDisplay} ${config.printMode ? styles.printMode : ''}`}>
        
        <ResumeHeader 
          basics={basics} 
          printMode={config.printMode} 
          useSerifFont={config.useSerifFont} 
          designSystem={designSystem}
        />
        {config.showSummary && (!config.printMode || config.showSummaryInPrint) && (
          <ResumeSummary 
            summary={basics.summary} 
            printMode={config.printMode} 
            useSerifFont={config.useSerifFont}
            showSummary={config.showSummary}
            designSystem={designSystem}
          />
        )}
        {config.singleColumn ? (
          <ResumeSingleColumn 
            skills={showSkills ? skills : []} 
            education={filteredEducation} 
            printMode={config.printMode}
            useSerifFont={config.useSerifFont}
            config={config}
            designSystem={designSystem}
          />
        ) : (
          <ResumeThreeColumn 
            skills={showSkills ? skills : []} 
            education={filteredEducation} 
            printMode={config.printMode}
            useSerifFont={config.useSerifFont}
            config={config}
            designSystem={designSystem}
          />
        )}
        <ResumeExperience 
          work={filteredWork} 
          printMode={config.printMode} 
          useSerifFont={config.useSerifFont}
          config={config}
          designSystem={designSystem}
        />
        <ResumePatents
          patents={showPatents ? patents : []}
          printMode={config.printMode}
          useSerifFont={config.useSerifFont}
          designSystem={designSystem}
        />
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
    const updatedData = { ...resumeData, work: newWork };
    updateManual(updatedData, `Updated ${updatedWork.company || 'work experience'}`);
    handleDataChange(updatedData);
  }, [resumeData, handleDataChange, updateManual]);

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
    const updatedData = { ...resumeData, education: newEducation };
    updateManual(updatedData, `Updated ${updatedEducation.institution || 'education'}`);
    handleDataChange(updatedData);
  }, [resumeData, handleDataChange, updateManual]);

  const deleteEducation = useCallback((index) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index);
    handleDataChange({ ...resumeData, education: newEducation });
  }, [resumeData, handleDataChange]);

  const updateSkills = useCallback((updatedSkills) => {
    handleDataChange({ ...resumeData, skills: updatedSkills });
  }, [resumeData, handleDataChange]);

  const updatePatents = useCallback((updatedPatents) => {
    const updatedData = { ...resumeData, patents: updatedPatents };
    updateManual(updatedData, 'Updated patents');
    handleDataChange(updatedData);
  }, [resumeData, handleDataChange, updateManual]);

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
  
  // Load saved resumes on mount
  useEffect(() => {
    const resumes = resumeStorage.getAllResumes();
    setSavedResumes(resumes);
    
    // If we have saved resumes and no initial data, load the most recent one
    if (resumes.length > 0 && !initialData) {
      const mostRecent = resumes.sort((a, b) => 
        new Date(b.metadata.lastModified) - new Date(a.metadata.lastModified)
      )[0];
      setCurrentResumeId(mostRecent.id);
      // Update the version control with saved data
      updateManual(mostRecent.data);
    }
  }, [initialData, updateManual]);
  
  // Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled || !currentResumeId) return;
    
    const saveTimer = setTimeout(() => {
      saveCurrentResume('Auto-save');
    }, 30000); // Auto-save every 30 seconds
    
    return () => clearTimeout(saveTimer);
  }, [resumeData, autoSaveEnabled, currentResumeId, saveCurrentResume]);
  
  // Set up premium override for feature gating
  useEffect(() => {
    if (premiumOverride) {
      featureGating.setUser({ subscriptionTier: SUBSCRIPTION_TIERS.PROFESSIONAL });
    }
  }, [premiumOverride]);

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

        .config-section {
          background-color: #f0f4f8;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          border: 1px solid #e0e0e0;
        }

        .config-section .form-group {
          margin-bottom: 12px;
        }

        .config-section .form-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .config-section input[type="checkbox"] {
          cursor: pointer;
        }
        
        .resume-manager-modal {
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
        
        .resume-manager {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 800px;
          max-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .resume-manager-header {
          padding: 20px;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .resume-manager-title {
          font-size: 20px;
          font-weight: bold;
          margin: 0;
        }
        
        .resume-manager-content {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }
        
        .resume-list {
          display: grid;
          gap: 12px;
        }
        
        .resume-card {
          border: 1px solid #dee2e6;
          border-radius: 6px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s;
          cursor: pointer;
        }
        
        .resume-card:hover {
          background: #f8f9fa;
          border-color: #adb5bd;
        }
        
        .resume-card.active {
          background: #e9ecef;
          border-color: #666;
        }
        
        .resume-info {
          flex: 1;
        }
        
        .resume-name {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 4px;
        }
        
        .resume-meta {
          font-size: 12px;
          color: #6c757d;
        }
        
        .resume-actions {
          display: flex;
          gap: 8px;
        }
        
        .auto-save-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #6c757d;
          margin-left: 16px;
        }
        
        .auto-save-indicator.saving {
          color: #ffc107;
        }
        
        .auto-save-indicator.saved {
          color: #28a745;
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
                  className="btn btn-primary"
                  onClick={() => saveCurrentResume()}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setShowResumeManager(!showResumeManager)}
                >
                  My Resumes ({savedResumes.length})
                </button>
                <button
                  className="btn btn-outline"
                  onClick={createNewResume}
                >
                  New Resume
                </button>
                <button
                  className={`btn btn-outline ${styles.linkedinButton}`}
                  onClick={() => alert('Coming Soon! LinkedIn import will be available in the next update.')}
                  title="Coming Soon"
                >
                  Import from LinkedIn (Soon)
                </button>
              </div>
              
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
                <label htmlFor="headingFontSelect">Heading Font:</label>
                <select
                  id="headingFontSelect"
                  className="select"
                  value={config.headingFont}
                  onChange={(e) => handleConfigChange({ headingFont: e.target.value })}
                >
                  <optgroup label="Serif">
                    {resumeFonts.serif.map((font) => (
                      <option key={font.name} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Sans-Serif">
                    {resumeFonts.sansSerif.map((font) => (
                      <option key={font.name} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="control-group">
                <label htmlFor="bodyFontSelect">Body Font:</label>
                <select
                  id="bodyFontSelect"
                  className="select"
                  value={config.bodyFont}
                  onChange={(e) => handleConfigChange({ bodyFont: e.target.value })}
                >
                  <optgroup label="Serif">
                    {resumeFonts.serif.map((font) => (
                      <option key={font.name} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Sans-Serif">
                    {resumeFonts.sansSerif.map((font) => (
                      <option key={font.name} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </optgroup>
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
              
              {/* Auto-save indicator */}
              {autoSaveEnabled && lastSaveTime && (
                <div className={`auto-save-indicator ${isSaving ? 'saving' : 'saved'}`}>
                  {isSaving ? (
                    <>
                      <span>⏳</span>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>✓</span>
                      <span>Saved {new Date(lastSaveTime).toLocaleTimeString()}</span>
                    </>
                  )}
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
          <button
            className={`tab ${activeTab === "coverLetter" ? "active" : ""}`}
            onClick={() => setActiveTab("coverLetter")}
          >
            Cover Letter
          </button>
        </div>

        <div className="content">
          {activeTab === "coverLetter" ? (
            <CoverLetter
              resumeData={resumeData}
              jobDescription={aiContext.jobDescription}
              companyName={aiContext.targetRole ? `Target Company` : ''}
              userSubscription={aiSubscription}
              remainingCredits={aiCredits}
              onUpgrade={handleUpgrade}
              onCreditUsed={handleCreditUsed}
              onVersionTrack={handleAIVersionTrack}
              printMode={config.printMode}
              useSerifFont={config.useSerifFont}
            />
          ) : activeTab === "preview" ? (
            <div className={styles.relativeContainer}>
              <ResumeDisplay data={resumeData} config={config} />
              <ResumeWatermark isPremium={userTier !== SUBSCRIPTION_TIERS.ANONYMOUS && userTier !== SUBSCRIPTION_TIERS.FREE} />
            </div>
          ) : (
            <div className="editor-grid">
              <div className="editor-panel">
                <h2 className="section-header">Resume Configuration</h2>
                
                <ConfigurationPanel 
                  config={config} 
                  onConfigChange={handleConfigChange} 
                />

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
                    className={`form-control ${styles.textareaResizable}`}
                    rows={4}
                    value={resumeData.basics.summary}
                    onChange={(e) => updateBasics("summary", e.target.value)}
                    placeholder="Brief professional summary highlighting your expertise and achievements..."
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
                <p className={styles.workExperienceCount}>
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
                <p className={styles.sectionDescription}>
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
                  userSubscription={aiSubscription}
                  remainingCredits={aiCredits}
                  onUpgrade={handleUpgrade}
                  onCreditUsed={handleCreditUsed}
                  onVersionTrack={handleAIVersionTrack}
                  context={aiContext}
                />

                {config.showPatents && (
                  <>
                    <h2 className="section-header">Patents</h2>
                    <PatentsEditor
                      patentsData={resumeData.patents || []}
                      onUpdate={updatePatents}
                      userSubscription={aiSubscription}
                      remainingCredits={aiCredits}
                      onUpgrade={handleUpgrade}
                      onCreditUsed={handleCreditUsed}
                      onVersionTrack={handleAIVersionTrack}
                      context={aiContext}
                    />
                  </>
                )}

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
                <div className={styles.aiAssistantSection}>
                  <h3 className={styles.aiSectionHeader}>
                    <OptimizeIcon size={18} color="#333" />
                    AI Optimization Context
                  </h3>
                  <p className={styles.aiSectionDescription}>
                    Set context to help AI provide more targeted optimizations for any text field
                  </p>
                  
                  <div className={`form-group ${styles.aiFormGroup}`}>
                    <label className="form-label">Job Description (for targeted optimization)</label>
                    <textarea
                      className={`form-control ${styles.aiFormLabel}`}
                      rows={3}
                      value={aiContext.jobDescription}
                      onChange={(e) => updateAIContext({ jobDescription: e.target.value })}
                      placeholder="Paste job description here to enable job-specific optimizations..."
                    />
                  </div>
                  
                  <div className={styles.aiGridTwoColumns}>
                    <div className="form-group">
                      <label className="form-label">Target Role</label>
                      <input
                        type="text"
                        className={`form-control ${styles.aiFormLabel}`}
                        value={aiContext.targetRole}
                        onChange={(e) => updateAIContext({ targetRole: e.target.value })}
                        placeholder="Senior Engineer, VP of Engineering..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Industry Focus</label>
                      <input
                        type="text"
                        className={`form-control ${styles.aiFormLabel}`}
                        value={aiContext.industryFocus}
                        onChange={(e) => updateAIContext({ industryFocus: e.target.value })}
                        placeholder="FinTech, HealthTech, AI/ML..."
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

              <div className="preview-panel" style={{ position: 'relative' }}>
                <ResumeDisplay data={resumeData} config={config} />
                <ResumeWatermark isPremium={userTier !== SUBSCRIPTION_TIERS.ANONYMOUS && userTier !== SUBSCRIPTION_TIERS.FREE} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ATS DevTools Overlay */}
      {showATSTools && (
        <ATSDevTools 
          resumeData={resumeData}
          onOptimize={() => {
            // Handle ATS optimization
            handleConfigChange({ 
              singleColumn: true,
              printMode: true,
              showPatents: false,
              maxWorkItems: 5,
              maxWorkBullets: 4
            });
            setActiveTab("preview");
          }}
        />
      )}
      
      {/* LinkedIn Import Modal */}
      {showLinkedInImport && (
        <LinkedInImport
          onImport={(importedData) => {
            // Merge imported data with current resume
            updateManual({
              ...resumeData,
              ...importedData,
              // Preserve any existing data that wasn't imported
              projects: resumeData.projects,
              publications: resumeData.publications,
              patents: resumeData.patents
            });
            setShowLinkedInImport(false);
          }}
          onClose={() => setShowLinkedInImport(false)}
          userTier={userTier}
        />
      )}
      
      {/* Resume Manager Modal */}
      {showResumeManager && (
        <div className="resume-manager-modal" onClick={() => setShowResumeManager(false)}>
          <div className="resume-manager" onClick={(e) => e.stopPropagation()}>
            <div className="resume-manager-header">
              <h2 className="resume-manager-title">My Resumes</h2>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowResumeManager(false)}
              >
                Close
              </button>
            </div>
            
            <div className="resume-manager-content">
              {savedResumes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
                  <p>No saved resumes yet</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setShowResumeManager(false);
                      createNewResume();
                    }}
                  >
                    Create Your First Resume
                  </button>
                </div>
              ) : (
                <div className="resume-list">
                  {savedResumes.map((resume) => (
                    <div 
                      key={resume.id}
                      className={`resume-card ${resume.id === currentResumeId ? 'active' : ''}`}
                      onClick={() => loadResume(resume.id)}
                    >
                      <div className="resume-info">
                        <div className="resume-name">{resume.metadata.name}</div>
                        <div className="resume-meta">
                          Last modified: {new Date(resume.metadata.lastModified).toLocaleDateString()}
                          {resume.metadata.targetRole && ` • ${resume.metadata.targetRole}`}
                        </div>
                      </div>
                      
                      <div className="resume-actions" onClick={(e) => e.stopPropagation()}>
                        <button 
                          className="btn btn-outline"
                          onClick={() => loadResume(resume.id)}
                        >
                          Open
                        </button>
                        <button 
                          className="btn btn-outline"
                          onClick={() => {
                            const exportData = resumeStorage.exportResume(resume.id, false);
                            const dataStr = JSON.stringify(exportData, null, 2);
                            const dataBlob = new Blob([dataStr], { type: "application/json" });
                            const url = URL.createObjectURL(dataBlob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = `${resume.metadata.name.replace(/\s+/g, '_')}_resume.json`;
                            link.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          Export
                        </button>
                        <button 
                          className="btn btn-outline"
                          onClick={() => deleteResume(resume.id)}
                          style={{ color: '#dc3545', borderColor: '#dc3545' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                  className="btn btn-primary"
                  onClick={exportWithVersions}
                  disabled={!currentResumeId}
                >
                  Export Current Resume with Version History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => {
          setShowUpgradeModal(false);
          setFeatureToUpgrade(null);
        }}
        featureName={featureToUpgrade}
        currentTier={userTier}
        onUpgrade={(tier) => {
          // In a real implementation, this would trigger payment flow
          console.log('Upgrade to tier:', tier);
          // For now, just simulate upgrade
          setUserTier(tier);
          featureGating.setUser({ subscriptionTier: tier });
          setShowUpgradeModal(false);
          // Retry the action that triggered the upgrade
          if (featureToUpgrade === 'resumeStorage') {
            saveCurrentResume();
          }
        }}
      />
    </>
  );
};

ResumeBuilder.propTypes = {
  initialData: PropTypes.object,
  initialConfig: PropTypes.object,
  onDataChange: PropTypes.func,
  onExport: PropTypes.func,
  showControls: PropTypes.bool,
  enableExport: PropTypes.bool,
  useSerifFont: PropTypes.bool,
  showATSTools: PropTypes.bool,
};

export default ResumeBuilder;
