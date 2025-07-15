/**
 * Granular Analytics System
 * 
 * Single-cookie system with granular consent categories
 * Clean privacy messaging with advanced controls
 * Cross-domain support with configurable domain
 */

import React, { useState, useEffect, createContext, useContext } from 'react';

// Enhanced single cookie analytics with granular control
export class GranularAnalytics {
  constructor(config = {}) {
    this.config = {
      cookieName: 'app_session',
      domain: window.location.hostname,
      apiEndpoint: '/api/analytics',
      ...config
    };
    
    this.consentSettings = this.loadConsentSettings();
    this.sessionId = null;
    this.isInitialized = false;
    
    this.init();
  }
  
  init() {
    if (this.hasValidConsent()) {
      this.sessionId = this.getOrCreateSession();
      this.isInitialized = true;
    }
  }
  
  // Granular consent categories for single cookie
  getConsentCategories() {
    return {
      essential: {
        name: 'Essential',
        description: 'Required for the platform to work (login, preferences)',
        required: true,
        examples: ['Session management', 'Authentication', 'Error reporting']
      },
      analytics: {
        name: 'Analytics',
        description: 'Help us understand how you use our 3D platform',
        required: false,
        examples: ['Page views', 'Feature usage', 'Performance metrics']
      },
      product: {
        name: 'Product Insights',
        description: 'Track 3D interactions to improve your experience',
        required: false,
        examples: ['3D tool usage', 'Scene complexity', 'User workflows']
      },
      performance: {
        name: 'Performance',
        description: 'Monitor technical performance and errors',
        required: false,
        examples: ['Load times', 'Frame rates', 'Error tracking']
      }
    };
  }
  
  loadConsentSettings() {
    try {
      const stored = localStorage.getItem('consent_settings');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load consent settings');
    }
    
    // Default: essential only
    return {
      essential: true,
      analytics: false,
      product: false,
      performance: false,
      timestamp: null,
      version: '1.0'
    };
  }
  
  saveConsentSettings(settings) {
    const updatedSettings = {
      ...settings,
      essential: true, // Always required
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    try {
      localStorage.setItem('consent_settings', JSON.stringify(updatedSettings));
      this.consentSettings = updatedSettings;
      
      // Reinitialize if consent was granted
      if (this.hasValidConsent() && !this.isInitialized) {
        this.init();
      } else if (!this.hasValidConsent() && this.isInitialized) {
        this.optOut();
      }
      
      return true;
    } catch (e) {
      console.error('Failed to save consent settings');
      return false;
    }
  }
  
  hasValidConsent() {
    // Need at least essential (always true) or any other category
    return this.consentSettings.essential || 
           this.consentSettings.analytics || 
           this.consentSettings.product || 
           this.consentSettings.performance;
  }
  
  canTrack(category) {
    return this.consentSettings[category] === true;
  }
  
  // Enhanced tracking with consent checks
  track(eventName, properties = {}, category = 'analytics') {
    if (!this.isInitialized || !this.canTrack(category)) {
      return false;
    }
    
    const event = {
      id: this.generateEventId(),
      name: eventName,
      properties: this.sanitizeProperties(properties),
      category: category,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      consent: this.getActiveConsent()
    };
    
    this.sendEvent(event);
    return true;
  }
  
  // Category-specific tracking methods
  trackAnalytics(eventName, properties = {}) {
    return this.track(eventName, properties, 'analytics');
  }
  
  trackProduct(eventName, properties = {}) {
    return this.track(eventName, properties, 'product');
  }
  
  trackPerformance(eventName, properties = {}) {
    return this.track(eventName, properties, 'performance');
  }
  
  trackEssential(eventName, properties = {}) {
    // Essential tracking always works (required for platform)
    return this.track(eventName, properties, 'essential');
  }
  
  // 3D tracking with granular categories
  track3DInteraction(interactionData) {
    const baseData = {
      interaction_type: interactionData.type,
      tool_used: interactionData.tool,
      success: interactionData.success
    };
    
    // Product insights (if consented)
    if (this.canTrack('product')) {
      Object.assign(baseData, {
        scene_complexity_bucket: this.bucketize(interactionData.complexity, [10, 100, 1000]),
        duration_bucket: this.bucketize(interactionData.duration, [1, 10, 60])
      });
    }
    
    // Performance metrics (if consented)
    if (this.canTrack('performance')) {
      Object.assign(baseData, {
        fps_tier: this.categorizePerformance(interactionData.fps),
        memory_usage_bucket: this.bucketize(interactionData.memoryUsage || 0, [100, 500, 1000])
      });
    }
    
    return this.track('3d_interaction', baseData, 'product');
  }
  
  getActiveConsent() {
    return {
      analytics: this.consentSettings.analytics,
      product: this.consentSettings.product,
      performance: this.consentSettings.performance,
      timestamp: this.consentSettings.timestamp
    };
  }
  
  getOrCreateSession() {
    if (!this.canTrack('essential') && !this.canTrack('analytics')) {
      return null;
    }
    
    let sessionData = this.getCookie(this.config.cookieName);
    
    if (sessionData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(sessionData));
        if (Date.now() - parsed.lastActivity < 30 * 60 * 1000) {
          this.updateSessionActivity(parsed);
          return parsed.id;
        }
      } catch (e) {
        console.warn('Invalid session cookie');
      }
    }
    
    return this.createNewSession();
  }
  
  createNewSession() {
    const sessionId = this.generateSessionId();
    const sessionData = {
      id: sessionId,
      created: Date.now(),
      lastActivity: Date.now(),
      consent: this.getActiveConsent()
    };
    
    this.setSessionCookie(sessionData);
    return sessionId;
  }
  
  setSessionCookie(sessionData) {
    if (!this.hasValidConsent()) return;
    
    const value = encodeURIComponent(JSON.stringify(sessionData));
    const expires = new Date(Date.now() + 30 * 60 * 1000);
    
    document.cookie = `${this.config.cookieName}=${value}; ` +
      `domain=${this.config.domain}; ` +
      `expires=${expires.toUTCString()}; ` +
      `path=/; ` +
      `SameSite=Lax; ` +
      `Secure`;
  }
  
  updateSessionActivity(sessionData) {
    sessionData.lastActivity = Date.now();
    sessionData.consent = this.getActiveConsent();
    this.setSessionCookie(sessionData);
  }
  
  getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  }
  
  optOut() {
    // Clear session cookie
    document.cookie = `${this.config.cookieName}=; ` +
      `domain=${this.config.domain}; ` +
      `expires=Thu, 01 Jan 1970 00:00:00 GMT; ` +
      `path=/`;
    
    this.isInitialized = false;
    this.sessionId = null;
  }
  
  generateSessionId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return `ls_${timestamp}_${random}`;
  }
  
  generateEventId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  
  bucketize(value, buckets) {
    for (let i = 0; i < buckets.length; i++) {
      if (value <= buckets[i]) return `<=${buckets[i]}`;
    }
    return `>${buckets[buckets.length - 1]}`;
  }
  
  categorizePerformance(fps) {
    if (fps >= 60) return 'high';
    if (fps >= 30) return 'medium';
    return 'low';
  }
  
  sanitizeProperties(props) {
    const sanitized = { ...props };
    const piiFields = ['email', 'name', 'phone', 'ip'];
    piiFields.forEach(field => delete sanitized[field]);
    return sanitized;
  }
  
  async sendEvent(event) {
    try {
      await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.warn('Analytics event failed:', error);
    }
  }
}

// React Context
const GranularAnalyticsContext = createContext(null);

export const useGranularAnalytics = () => {
  const context = useContext(GranularAnalyticsContext);
  if (!context) {
    throw new Error('useGranularAnalytics must be used within GranularAnalyticsProvider');
  }
  return context;
};

// Provider
export const GranularAnalyticsProvider = ({ children, config }) => {
  const [analytics] = useState(() => new GranularAnalytics(config));
  const [consentSettings, setConsentSettings] = useState(analytics.consentSettings);
  const [showConsentModal, setShowConsentModal] = useState(false);
  
  useEffect(() => {
    // Show consent modal if no choice made
    if (!consentSettings.timestamp) {
      setShowConsentModal(true);
    }
  }, [consentSettings.timestamp]);
  
  const updateConsent = (newSettings) => {
    const success = analytics.saveConsentSettings(newSettings);
    if (success) {
      setConsentSettings(analytics.consentSettings);
      setShowConsentModal(false);
    }
  };
  
  const contextValue = {
    analytics,
    consentSettings,
    updateConsent,
    showConsentModal,
    setShowConsentModal,
    categories: analytics.getConsentCategories(),
    canTrack: (category) => analytics.canTrack(category),
    trackAnalytics: (event, props) => analytics.trackAnalytics(event, props),
    trackProduct: (event, props) => analytics.trackProduct(event, props),
    trackPerformance: (event, props) => analytics.trackPerformance(event, props),
    track3D: (data) => analytics.track3DInteraction(data)
  };
  
  return (
    <GranularAnalyticsContext.Provider value={contextValue}>
      {children}
    </GranularAnalyticsContext.Provider>
  );
};