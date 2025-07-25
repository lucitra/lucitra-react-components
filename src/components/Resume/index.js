export { default as ResumeBuilder } from './ResumeBuilder.jsx';

// Individual components (for advanced customization)
export { ResumeHeader } from './ResumeHeader.jsx';
export { ResumeSummary } from './ResumeSummary.jsx';
export { ResumeThreeColumn } from './ResumeThreeColumn.jsx';
export { ResumeSingleColumn } from './ResumeSingleColumn.jsx';
export { ResumeExperience } from './ResumeExperience.jsx';
export { ResumePatents } from './ResumePatents.jsx';

// Editor components
export { default as WorkExperienceEditor } from './WorkExperienceEditor.jsx';
export { default as EducationEditor } from './EducationEditor.jsx';
export { default as SkillsEditor } from './SkillsEditor.jsx';
export { default as PatentsEditor } from './PatentsEditor.jsx';
export { default as VisibilityToggle } from './VisibilityToggle.jsx';

// AI components
export { default as AIAssistant } from './AIAssistant.jsx';
export { default as AITextOptimizer } from './AITextOptimizer.jsx';
export { default as AITextInput } from './AITextInput.jsx';

// Cover Letter
export { default as CoverLetter } from './CoverLetter.jsx';

// Version Control
export { default as ResumeVersionControl } from './ResumeVersionControl.jsx';
export { default as VersionDiffViewer } from './VersionDiffViewer.jsx';

// SaaS Components
export { default as ResumeLandingPage } from './ResumeLandingPage.jsx';
export { default as ResumeWatermark } from './ResumeWatermark.jsx';
export { default as LinkedInImport } from './LinkedInImport.jsx';
export { default as UpgradeModal } from './UpgradeModal.jsx';
export { default as ATSDevTools } from './ATSDevTools.jsx';
export { default as AuthModal } from './AuthModal.jsx';
export { default as SignatureSelector } from './SignatureSelector.jsx';

// Export data and utilities
export { defaultResumeData, baseResumeData, genericResumeData, ibraheemResumeData } from '../../data/resumeData.js';

// Export services
export { default as resumeStorage } from '../../services/resumeStorage.js';
export { default as featureGating, SUBSCRIPTION_TIERS, PRICING, FEATURES } from '../../services/featureGating.js';
export { default as atsOptimizer } from '../../services/atsOptimizer.js';