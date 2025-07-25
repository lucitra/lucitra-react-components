// Resume Storage Service with Version Control
// Handles local storage, cloud sync, and data management

class ResumeStorageService {
  constructor() {
    this.STORAGE_KEY = 'lucitra_resumes';
    this.VERSION_KEY = 'lucitra_resume_versions';
    this.SETTINGS_KEY = 'lucitra_settings';
    this.USER_KEY = 'lucitra_user';
    this.CURRENT_VERSION = '1.0.0';
    
    // Initialize storage
    this.initializeStorage();
  }

  initializeStorage() {
    // Check if we need to migrate data
    const existingData = localStorage.getItem(this.STORAGE_KEY);
    if (existingData) {
      try {
        const parsed = JSON.parse(existingData);
        if (!parsed.version || parsed.version < this.CURRENT_VERSION) {
          this.migrateData(parsed);
        }
      } catch (e) {
        console.error('Failed to parse existing data:', e);
      }
    }
  }

  // Get current user (for now, use local storage identifier)
  getCurrentUser() {
    let user = localStorage.getItem(this.USER_KEY);
    if (!user) {
      user = JSON.stringify({
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        plan: 'free',
        createdAt: new Date().toISOString(),
        email: null, // Will be set when user signs up
        aiCredits: 10,
        lastReset: new Date().toISOString()
      });
      localStorage.setItem(this.USER_KEY, user);
    }
    return JSON.parse(user);
  }

  // Save resume with version control
  saveResume(resumeData, metadata = {}) {
    const user = this.getCurrentUser();
    const resumeId = resumeData.id || `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const resumeRecord = {
      id: resumeId,
      userId: user.id,
      data: resumeData,
      metadata: {
        name: metadata.name || 'My Resume',
        lastModified: new Date().toISOString(),
        created: metadata.created || new Date().toISOString(),
        version: this.CURRENT_VERSION,
        tags: metadata.tags || [],
        isActive: metadata.isActive !== undefined ? metadata.isActive : true,
        atsScore: metadata.atsScore || null,
        targetRole: metadata.targetRole || null
      }
    };

    // Save to resumes collection
    const resumes = this.getAllResumes();
    const existingIndex = resumes.findIndex(r => r.id === resumeId);
    
    if (existingIndex >= 0) {
      resumes[existingIndex] = resumeRecord;
    } else {
      resumes.push(resumeRecord);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
      version: this.CURRENT_VERSION,
      resumes
    }));

    // Save version history
    this.saveVersion(resumeId, resumeData, metadata.changeDescription);

    return resumeRecord;
  }

  // Save version history
  saveVersion(resumeId, data, changeDescription = 'Manual save') {
    const versions = this.getVersionHistory(resumeId);
    
    const newVersion = {
      id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      resumeId,
      timestamp: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(data)), // Deep clone
      changeDescription,
      size: JSON.stringify(data).length
    };

    versions.push(newVersion);

    // Keep only last 50 versions per resume (configurable based on plan)
    const user = this.getCurrentUser();
    const maxVersions = this.getMaxVersionsForPlan(user.plan);
    if (versions.length > maxVersions) {
      versions.splice(0, versions.length - maxVersions);
    }

    const allVersions = this.getAllVersions();
    allVersions[resumeId] = versions;
    
    localStorage.setItem(this.VERSION_KEY, JSON.stringify(allVersions));
    
    return newVersion;
  }

  // Get version history for a resume
  getVersionHistory(resumeId) {
    const allVersions = this.getAllVersions();
    return allVersions[resumeId] || [];
  }

  // Get all versions
  getAllVersions() {
    const versionsStr = localStorage.getItem(this.VERSION_KEY);
    if (!versionsStr) return {};
    
    try {
      return JSON.parse(versionsStr);
    } catch (e) {
      console.error('Failed to parse versions:', e);
      return {};
    }
  }

  // Get all resumes for current user
  getAllResumes() {
    const dataStr = localStorage.getItem(this.STORAGE_KEY);
    if (!dataStr) return [];
    
    try {
      const data = JSON.parse(dataStr);
      const user = this.getCurrentUser();
      
      // Filter resumes by current user
      return (data.resumes || []).filter(r => r.userId === user.id);
    } catch (e) {
      console.error('Failed to parse resumes:', e);
      return [];
    }
  }

  // Get single resume
  getResume(resumeId) {
    const resumes = this.getAllResumes();
    return resumes.find(r => r.id === resumeId);
  }

  // Delete resume
  deleteResume(resumeId) {
    const allData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    allData.resumes = (allData.resumes || []).filter(r => r.id !== resumeId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allData));
    
    // Also delete version history
    const allVersions = this.getAllVersions();
    delete allVersions[resumeId];
    localStorage.setItem(this.VERSION_KEY, JSON.stringify(allVersions));
  }

  // Export resume data (for backup/sharing)
  exportResume(resumeId, includeVersions = false) {
    const resume = this.getResume(resumeId);
    if (!resume) return null;

    const exportData = {
      version: this.CURRENT_VERSION,
      exported: new Date().toISOString(),
      resume: resume
    };

    if (includeVersions) {
      exportData.versions = this.getVersionHistory(resumeId);
    }

    return exportData;
  }

  // Import resume data
  importResume(exportData, overwriteId = null) {
    try {
      const { resume, versions } = exportData;
      
      // Generate new ID unless overwriting
      if (!overwriteId) {
        resume.id = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      } else {
        resume.id = overwriteId;
      }

      // Update user ID to current user
      const user = this.getCurrentUser();
      resume.userId = user.id;
      resume.metadata.lastModified = new Date().toISOString();
      
      // Save resume
      this.saveResume(resume.data, resume.metadata);
      
      // Import versions if provided
      if (versions && versions.length > 0) {
        const allVersions = this.getAllVersions();
        allVersions[resume.id] = versions;
        localStorage.setItem(this.VERSION_KEY, JSON.stringify(allVersions));
      }
      
      return resume;
    } catch (e) {
      console.error('Failed to import resume:', e);
      throw new Error('Invalid resume data format');
    }
  }

  // Get storage usage
  getStorageUsage() {
    const resumes = this.getAllResumes();
    const versions = this.getAllVersions();
    
    let totalSize = 0;
    let resumeCount = resumes.length;
    let versionCount = 0;
    
    // Calculate resume sizes
    resumes.forEach(resume => {
      totalSize += JSON.stringify(resume).length;
    });
    
    // Calculate version sizes
    Object.values(versions).forEach(versionList => {
      versionCount += versionList.length;
      versionList.forEach(version => {
        totalSize += JSON.stringify(version).length;
      });
    });
    
    return {
      totalSize,
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
      resumeCount,
      versionCount,
      averageResumeSize: resumeCount > 0 ? Math.round(totalSize / resumeCount) : 0
    };
  }

  // Plan limits
  getMaxResumesForPlan(plan) {
    const limits = {
      free: 1,
      starter: 3,
      professional: 10,
      enterprise: -1 // Unlimited
    };
    return limits[plan] || 1;
  }

  getMaxVersionsForPlan(plan) {
    const limits = {
      free: 10,
      starter: 50,
      professional: 100,
      enterprise: 500
    };
    return limits[plan] || 10;
  }

  // Check if user can create more resumes
  canCreateResume() {
    const user = this.getCurrentUser();
    const resumes = this.getAllResumes();
    const maxResumes = this.getMaxResumesForPlan(user.plan);
    
    return maxResumes === -1 || resumes.length < maxResumes;
  }

  // Migrate old data formats
  migrateData(_oldData) {
    console.log('Migrating resume data to version', this.CURRENT_VERSION);
    // Add migration logic here as needed
  }

  // Clear all data (for testing/reset)
  clearAllData() {
    if (confirm('This will delete all your resume data. Are you sure?')) {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.VERSION_KEY);
      localStorage.removeItem(this.SETTINGS_KEY);
      localStorage.removeItem(this.USER_KEY);
      return true;
    }
    return false;
  }

  // Auto-save functionality
  enableAutoSave(resumeId, callback, interval = 30000) {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
    
    this.autoSaveInterval = setInterval(() => {
      const resumeData = callback();
      if (resumeData) {
        this.saveResume(resumeData, {
          changeDescription: 'Auto-save',
          isActive: true
        });
      }
    }, interval);
    
    return () => {
      if (this.autoSaveInterval) {
        clearInterval(this.autoSaveInterval);
        this.autoSaveInterval = null;
      }
    };
  }
}

// Export singleton instance
export const resumeStorage = new ResumeStorageService();
export default resumeStorage;