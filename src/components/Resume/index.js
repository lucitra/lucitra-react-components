export { default as ResumeBuilder } from './ResumeBuilder.jsx';

// Individual components (for advanced customization)
export { ResumeHeader } from './ResumeHeader.jsx';
export { ResumeSummary } from './ResumeSummary.jsx';
export { ResumeThreeColumn } from './ResumeThreeColumn.jsx';
export { ResumeSingleColumn } from './ResumeSingleColumn.jsx';
export { ResumeExperience } from './ResumeExperience.jsx';

// Editor components
export { default as WorkExperienceEditor } from './WorkExperienceEditor.jsx';
export { default as EducationEditor } from './EducationEditor.jsx';
export { default as SkillsEditor } from './SkillsEditor.jsx';

// AI components
export { default as AIAssistant } from './AIAssistant.jsx';
export { default as AITextOptimizer } from './AITextOptimizer.jsx';
export { default as AITextInput } from './AITextInput.jsx';

// Export data and utilities
export { defaultResumeData, baseResumeData, genericResumeData, ibraheemResumeData } from '../../data/resumeData.js';