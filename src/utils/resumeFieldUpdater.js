/**
 * Utility functions for updating specific resume data fields
 * Used by AI optimization system to directly update resume data structure
 */

/**
 * Updates a specific field in the resume data structure
 * @param {Object} resumeData - Current resume data
 * @param {string} fieldPath - Path to the field (e.g., "basics.summary", "work[0].positions[0].title")
 * @param {string} newValue - New value for the field
 * @returns {Object} Updated resume data
 */
export const updateResumeField = (resumeData, fieldPath, newValue) => {
  const updatedData = JSON.parse(JSON.stringify(resumeData)); // Deep clone
  
  // Handle different field paths
  const pathParts = fieldPath.split('.');
  
  // Navigate to the correct nested object
  let current = updatedData;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    
    // Handle array indices (e.g., work[0])
    if (part.includes('[') && part.includes(']')) {
      const [key, indexStr] = part.split('[');
      const index = parseInt(indexStr.replace(']', ''));
      current = current[key][index];
    } else {
      current = current[part];
    }
  }
  
  // Set the final value
  const finalKey = pathParts[pathParts.length - 1];
  if (finalKey.includes('[') && finalKey.includes(']')) {
    const [key, indexStr] = finalKey.split('[');
    const index = parseInt(indexStr.replace(']', ''));
    current[key][index] = newValue;
  } else {
    current[finalKey] = newValue;
  }
  
  return updatedData;
};

/**
 * Determines the field path for common resume fields
 * @param {string} fieldName - Human-readable field name
 * @param {Object} context - Additional context for nested fields
 * @returns {string} Field path for updateResumeField
 */
export const getFieldPath = (fieldName, context = {}) => {
  if (fieldName === 'Professional Summary') {
    return 'basics.summary';
  }
  
  if (fieldName && fieldName.includes('Job Title')) {
    // For work experience, we need company context
    if (context.workIndex !== undefined && context.positionIndex !== undefined) {
      return `work[${context.workIndex}].positions[${context.positionIndex}].title`;
    }
  }
  
  if (fieldName && fieldName.includes('Bullet Point')) {
    if (context.workIndex !== undefined && context.positionIndex !== undefined && context.highlightIndex !== undefined) {
      return `work[${context.workIndex}].positions[${context.positionIndex}].highlights[${context.highlightIndex}]`;
    }
  }
  
  if (fieldName && fieldName.includes('Area of Study')) {
    if (context.educationIndex !== undefined) {
      return `education[${context.educationIndex}].area`;
    }
  }
  
  // Fallback - return null if we can't determine the path
  return null;
};

/**
 * Enhanced version that extracts context from field names
 * @param {string} fieldName - Field name like "Microsoft - Job Title" or "Harvard - Area of Study"
 * @param {Object} resumeData - Current resume data for context matching
 * @returns {Object} {path, context} or null if not found
 */
export const getFieldPathWithContext = (fieldName, resumeData) => {
  if (fieldName === 'Professional Summary') {
    return { path: 'basics.summary', context: {} };
  }
  
  // Extract company/institution name from field name
  const parts = fieldName.split(' - ');
  if (parts.length !== 2) {
    return null;
  }
  
  const [identifier, fieldType] = parts;
  
  if (fieldType === 'Job Title') {
    // Find the work experience with matching company
    const workIndex = resumeData.work?.findIndex(w => w.company === identifier);
    if (workIndex >= 0) {
      return {
        path: `work[${workIndex}].positions[0].title`, // Assume first position
        context: { workIndex, positionIndex: 0 }
      };
    }
  }
  
  if (fieldType.includes('Bullet Point')) {
    // Extract bullet point number
    const bulletMatch = fieldType.match(/Bullet Point (\d+)/);
    if (bulletMatch) {
      const bulletIndex = parseInt(bulletMatch[1]) - 1; // Convert to 0-based index
      const workIndex = resumeData.work?.findIndex(w => w.company === identifier);
      if (workIndex >= 0) {
        return {
          path: `work[${workIndex}].positions[0].highlights[${bulletIndex}]`,
          context: { workIndex, positionIndex: 0, highlightIndex: bulletIndex }
        };
      }
    }
  }
  
  if (fieldType === 'Area of Study') {
    const educationIndex = resumeData.education?.findIndex(e => e.institution === identifier);
    if (educationIndex >= 0) {
      return {
        path: `education[${educationIndex}].area`,
        context: { educationIndex }
      };
    }
  }
  
  return null;
};