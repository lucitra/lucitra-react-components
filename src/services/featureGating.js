// Feature Gating and Pricing Service
// Controls access to features based on user subscription level

export const SUBSCRIPTION_TIERS = {
  ANONYMOUS: 'anonymous',
  FREE: 'free',
  STARTER: 'starter',
  PROFESSIONAL: 'professional',
  ENTERPRISE: 'enterprise'
};

export const PRICING = {
  [SUBSCRIPTION_TIERS.FREE]: {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out our resume builder'
  },
  [SUBSCRIPTION_TIERS.STARTER]: {
    name: 'Starter',
    price: 9.99,
    period: 'month',
    description: 'Great for job seekers',
    popular: true
  },
  [SUBSCRIPTION_TIERS.PROFESSIONAL]: {
    name: 'Professional',
    price: 19.99,
    period: 'month',
    description: 'For career professionals',
    savings: 'Save $50/year with annual billing'
  },
  [SUBSCRIPTION_TIERS.ENTERPRISE]: {
    name: 'Enterprise',
    price: 'Custom',
    period: 'custom',
    description: 'For teams and organizations'
  }
};

export const FEATURES = {
  // Resume Features
  resumePreview: {
    name: 'Resume Preview',
    description: 'Preview your resume with watermark',
    tiers: [SUBSCRIPTION_TIERS.ANONYMOUS, SUBSCRIPTION_TIERS.FREE, SUBSCRIPTION_TIERS.STARTER, SUBSCRIPTION_TIERS.PROFESSIONAL, SUBSCRIPTION_TIERS.ENTERPRISE]
  },
  resumeDownloadPDF: {
    name: 'Download PDF',
    description: 'Download resume as PDF without watermark',
    tiers: [SUBSCRIPTION_TIERS.STARTER, SUBSCRIPTION_TIERS.PROFESSIONAL, SUBSCRIPTION_TIERS.ENTERPRISE]
  },
  resumeDownloadDOCX: {
    name: 'Download DOCX',
    description: 'Download resume as Word document',
    tiers: [SUBSCRIPTION_TIERS.PROFESSIONAL, SUBSCRIPTION_TIERS.ENTERPRISE]
  },
  resumeTemplates: {
    name: 'Resume Templates',
    description: 'Access to premium resume templates',
    limit: {
      [SUBSCRIPTION_TIERS.FREE]: 1,
      [SUBSCRIPTION_TIERS.STARTER]: 5,
      [SUBSCRIPTION_TIERS.PROFESSIONAL]: -1, // unlimited
      [SUBSCRIPTION_TIERS.ENTERPRISE]: -1
    }
  },
  resumeStorage: {
    name: 'Resume Storage',
    description: 'Number of resumes you can save',
    limit: {
      [SUBSCRIPTION_TIERS.FREE]: 0, // Can't save
      [SUBSCRIPTION_TIERS.STARTER]: 3,
      [SUBSCRIPTION_TIERS.PROFESSIONAL]: 10,
      [SUBSCRIPTION_TIERS.ENTERPRISE]: -1
    }
  },
  
  // AI Features
  aiOptimization: {
    name: 'AI Optimization',
    description: 'AI-powered resume optimization',
    limit: {
      [SUBSCRIPTION_TIERS.FREE]: 0,
      [SUBSCRIPTION_TIERS.STARTER]: 20, // per month
      [SUBSCRIPTION_TIERS.PROFESSIONAL]: 100,
      [SUBSCRIPTION_TIERS.ENTERPRISE]: -1
    }
  },
  aiCoverLetter: {
    name: 'AI Cover Letters',
    description: 'Generate tailored cover letters',
    limit: {
      [SUBSCRIPTION_TIERS.FREE]: 0,
      [SUBSCRIPTION_TIERS.STARTER]: 5,
      [SUBSCRIPTION_TIERS.PROFESSIONAL]: 50,
      [SUBSCRIPTION_TIERS.ENTERPRISE]: -1
    }
  },
  aiJobMatching: {
    name: 'AI Job Matching',
    description: 'Match your resume to job descriptions',
    tiers: [SUBSCRIPTION_TIERS.PROFESSIONAL, SUBSCRIPTION_TIERS.ENTERPRISE]
  },
  
  // Import/Export Features
  linkedinImport: {
    name: 'LinkedIn Import',
    description: 'Import your profile from LinkedIn',
    tiers: [SUBSCRIPTION_TIERS.FREE, SUBSCRIPTION_TIERS.STARTER, SUBSCRIPTION_TIERS.PROFESSIONAL, SUBSCRIPTION_TIERS.ENTERPRISE]
  },
  jsonExport: {
    name: 'JSON Export',
    description: 'Export resume data as JSON',
    tiers: [SUBSCRIPTION_TIERS.PROFESSIONAL, SUBSCRIPTION_TIERS.ENTERPRISE]
  },
  versionHistory: {
    name: 'Version History',
    description: 'Access to resume version history',
    limit: {
      [SUBSCRIPTION_TIERS.FREE]: 0,
      [SUBSCRIPTION_TIERS.STARTER]: 10,
      [SUBSCRIPTION_TIERS.PROFESSIONAL]: 50,
      [SUBSCRIPTION_TIERS.ENTERPRISE]: -1
    }
  },
  
  // Advanced Features
  atsScoring: {
    name: 'ATS Scoring',
    description: 'Real-time ATS compatibility scoring',
    tiers: [SUBSCRIPTION_TIERS.STARTER, SUBSCRIPTION_TIERS.PROFESSIONAL, SUBSCRIPTION_TIERS.ENTERPRISE]
  },
  customBranding: {
    name: 'Custom Branding',
    description: 'Remove our branding from exports',
    tiers: [SUBSCRIPTION_TIERS.PROFESSIONAL, SUBSCRIPTION_TIERS.ENTERPRISE]
  },
  analytics: {
    name: 'Resume Analytics',
    description: 'Track resume views and downloads',
    tiers: [SUBSCRIPTION_TIERS.PROFESSIONAL, SUBSCRIPTION_TIERS.ENTERPRISE]
  },
  teamCollaboration: {
    name: 'Team Collaboration',
    description: 'Share and collaborate on resumes',
    tiers: [SUBSCRIPTION_TIERS.ENTERPRISE]
  }
};

class FeatureGatingService {
  constructor() {
    this.currentUser = null;
  }
  
  setUser(user) {
    this.currentUser = user;
  }
  
  getUserTier() {
    if (!this.currentUser) return SUBSCRIPTION_TIERS.ANONYMOUS;
    return this.currentUser.subscriptionTier || SUBSCRIPTION_TIERS.FREE;
  }
  
  hasFeature(featureName) {
    const feature = FEATURES[featureName];
    if (!feature) return false;
    
    const userTier = this.getUserTier();
    
    // Check if feature has tiers array (boolean features)
    if (feature.tiers) {
      return feature.tiers.includes(userTier);
    }
    
    // Check if feature has limits (quantitative features)
    if (feature.limit) {
      const limit = feature.limit[userTier];
      return limit !== undefined && limit !== 0;
    }
    
    return false;
  }
  
  getFeatureLimit(featureName) {
    const feature = FEATURES[featureName];
    if (!feature || !feature.limit) return 0;
    
    const userTier = this.getUserTier();
    return feature.limit[userTier] || 0;
  }
  
  checkFeatureUsage(featureName, currentUsage) {
    const limit = this.getFeatureLimit(featureName);
    if (limit === -1) return { allowed: true, remaining: -1 };
    
    const allowed = currentUsage < limit;
    const remaining = Math.max(0, limit - currentUsage);
    
    return { allowed, remaining, limit };
  }
  
  getUpgradeMessage(featureName) {
    const feature = FEATURES[featureName];
    
    if (!feature) return 'This feature requires an upgrade.';
    
    // Find the minimum tier that has this feature
    let requiredTier = null;
    const tierOrder = [
      SUBSCRIPTION_TIERS.FREE,
      SUBSCRIPTION_TIERS.STARTER,
      SUBSCRIPTION_TIERS.PROFESSIONAL,
      SUBSCRIPTION_TIERS.ENTERPRISE
    ];
    
    if (feature.tiers) {
      for (const tier of tierOrder) {
        if (feature.tiers.includes(tier)) {
          requiredTier = tier;
          break;
        }
      }
    } else if (feature.limit) {
      for (const tier of tierOrder) {
        if (feature.limit[tier] && feature.limit[tier] > 0) {
          requiredTier = tier;
          break;
        }
      }
    }
    
    if (!requiredTier) return 'This feature is not available.';
    
    const requiredPlan = PRICING[requiredTier];
    return `${feature.name} requires ${requiredPlan.name} plan or higher. Upgrade now to unlock this feature!`;
  }
  
  getAllFeaturesForTier(tier) {
    const features = [];
    
    for (const [key, feature] of Object.entries(FEATURES)) {
      let included = false;
      let details = '';
      
      if (feature.tiers && feature.tiers.includes(tier)) {
        included = true;
      } else if (feature.limit && feature.limit[tier]) {
        included = true;
        const limit = feature.limit[tier];
        details = limit === -1 ? 'Unlimited' : `Up to ${limit}`;
      }
      
      if (included) {
        features.push({
          key,
          name: feature.name,
          description: feature.description,
          details
        });
      }
    }
    
    return features;
  }
  
  // Check if user needs to upgrade for a specific action
  requiresUpgrade(featureName, currentUsage = 0) {
    if (!this.hasFeature(featureName)) return true;
    
    const { allowed } = this.checkFeatureUsage(featureName, currentUsage);
    return !allowed;
  }
  
  // Get comparison table data for pricing page
  getFeatureComparison() {
    const tiers = [
      SUBSCRIPTION_TIERS.FREE,
      SUBSCRIPTION_TIERS.STARTER,
      SUBSCRIPTION_TIERS.PROFESSIONAL,
      SUBSCRIPTION_TIERS.ENTERPRISE
    ];
    
    const comparison = {};
    
    for (const [key, feature] of Object.entries(FEATURES)) {
      comparison[key] = {
        name: feature.name,
        description: feature.description,
        availability: {}
      };
      
      for (const tier of tiers) {
        if (feature.tiers) {
          comparison[key].availability[tier] = feature.tiers.includes(tier);
        } else if (feature.limit) {
          const limit = feature.limit[tier] || 0;
          comparison[key].availability[tier] = limit === -1 ? 'Unlimited' : limit || false;
        }
      }
    }
    
    return comparison;
  }
}

// Export singleton instance
export const featureGating = new FeatureGatingService();
export default featureGating;