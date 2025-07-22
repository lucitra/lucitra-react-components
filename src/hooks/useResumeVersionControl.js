import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for resume version control
 * 
 * Provides comprehensive version tracking with undo/redo functionality,
 * specifically designed for tracking AI optimizations and manual edits.
 */

export const useResumeVersionControl = (initialData) => {
  const [versionHistory, setVersionHistory] = useState([{
    id: 'initial',
    timestamp: Date.now(),
    data: initialData,
    change: {
      type: 'initial',
      description: 'Initial resume data',
      field: null,
      originalValue: null,
      newValue: null
    }
  }]);
  
  const [currentVersion, setCurrentVersion] = useState(0);
  const [currentData, setCurrentData] = useState(initialData);

  // Create a new version when data changes
  const createVersion = useCallback((newData, changeInfo = {}) => {
    const change = {
      type: changeInfo.type || 'manual',
      description: changeInfo.description || 'Manual edit',
      field: changeInfo.field || null,
      originalValue: changeInfo.originalValue || null,
      newValue: changeInfo.newValue || null,
      aiOptimization: changeInfo.aiOptimization || null,
      confidence: changeInfo.confidence || null,
      goal: changeInfo.goal || null
    };

    const newVersion = {
      id: `v${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      data: JSON.parse(JSON.stringify(newData)), // Deep clone
      change
    };

    setVersionHistory(prev => {
      // If we're not at the latest version, remove future versions
      const historyUpToCurrent = prev.slice(0, currentVersion + 1);
      return [...historyUpToCurrent, newVersion];
    });
    
    setCurrentVersion(prev => prev + 1);
    setCurrentData(newData);
  }, [currentVersion]);

  // Revert to a specific version
  const revertToVersion = useCallback((versionIndex) => {
    if (versionIndex >= 0 && versionIndex < versionHistory.length) {
      setCurrentVersion(versionIndex);
      setCurrentData(versionHistory[versionIndex].data);
    }
  }, [versionHistory]);

  // Undo last change
  const undo = useCallback(() => {
    if (currentVersion > 0) {
      revertToVersion(currentVersion - 1);
    }
  }, [currentVersion, revertToVersion]);

  // Redo next change
  const redo = useCallback(() => {
    if (currentVersion < versionHistory.length - 1) {
      revertToVersion(currentVersion + 1);
    }
  }, [currentVersion, versionHistory.length, revertToVersion]);

  // Enhanced update function for AI optimizations
  const updateWithAI = useCallback((newData, aiInfo) => {
    const changeInfo = {
      type: 'ai-optimization',
      description: `AI optimized: ${aiInfo.field || 'text'}`,
      field: aiInfo.field,
      originalValue: aiInfo.originalValue,
      newValue: aiInfo.newValue,
      aiOptimization: {
        goal: aiInfo.goal,
        confidence: aiInfo.confidence,
        reasoning: aiInfo.reasoning,
        fieldType: aiInfo.fieldType
      }
    };
    createVersion(newData, changeInfo);
  }, [createVersion]);

  // Enhanced update function for manual edits
  const updateManual = useCallback((newData, field, originalValue, newValue) => {
    const changeInfo = {
      type: 'manual',
      description: `Edited: ${field}`,
      field,
      originalValue,
      newValue
    };
    createVersion(newData, changeInfo);
  }, [createVersion]);

  // Bulk update function
  const updateBulk = useCallback((newData, description = 'Bulk edit') => {
    const changeInfo = {
      type: 'bulk-edit',
      description
    };
    createVersion(newData, changeInfo);
  }, [createVersion]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'z':
            if (!event.shiftKey) {
              event.preventDefault();
              undo();
            }
            break;
          case 'y':
            event.preventDefault();
            redo();
            break;
          case 'Z': // Shift+Ctrl+Z for redo on some systems
            if (event.shiftKey) {
              event.preventDefault();
              redo();
            }
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Get current version info
  const getCurrentVersionInfo = useCallback(() => {
    return {
      version: currentVersion + 1,
      totalVersions: versionHistory.length,
      canUndo: currentVersion > 0,
      canRedo: currentVersion < versionHistory.length - 1,
      hasUnsavedChanges: currentVersion > 0,
      currentChange: versionHistory[currentVersion]?.change,
      lastAIOptimization: versionHistory
        .slice()
        .reverse()
        .find(v => v.change.type === 'ai-optimization')
    };
  }, [currentVersion, versionHistory]);

  // Get AI optimization history for analytics
  const getAIOptimizationHistory = useCallback(() => {
    return versionHistory
      .filter(v => v.change.type === 'ai-optimization')
      .map(v => ({
        timestamp: v.timestamp,
        field: v.change.field,
        goal: v.change.aiOptimization?.goal,
        confidence: v.change.aiOptimization?.confidence,
        fieldType: v.change.aiOptimization?.fieldType
      }));
  }, [versionHistory]);

  // Export version history as JSON
  const exportHistory = useCallback(() => {
    return {
      versions: versionHistory,
      currentVersion,
      exportTimestamp: Date.now()
    };
  }, [versionHistory, currentVersion]);

  // Import version history from JSON
  const importHistory = useCallback((historyData) => {
    try {
      if (historyData.versions && Array.isArray(historyData.versions)) {
        setVersionHistory(historyData.versions);
        const versionIndex = historyData.currentVersion || 0;
        setCurrentVersion(versionIndex);
        setCurrentData(historyData.versions[versionIndex]?.data || initialData);
        return true;
      }
    } catch (error) {
      console.error('Failed to import version history:', error);
    }
    return false;
  }, [initialData]);

  return {
    // Current state
    currentData,
    versionHistory,
    currentVersion,
    
    // Actions
    createVersion,
    revertToVersion,
    undo,
    redo,
    
    // Enhanced updates
    updateWithAI,
    updateManual,
    updateBulk,
    
    // Utilities
    getCurrentVersionInfo,
    getAIOptimizationHistory,
    exportHistory,
    importHistory
  };
};