/**
 * Production Cookie Manager
 * 
 * Handles real browser cookies with proper security, compliance, and cross-domain support
 * Replaces localStorage-based simulation with actual cookie management
 */

import { useState, useEffect } from 'react';

// Cookie configuration constants
export const COOKIE_CONFIG = {
  // Default settings
  DEFAULT_DOMAIN: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
  DEFAULT_PATH: '/',
  DEFAULT_SAME_SITE: 'Lax',
  DEFAULT_SECURE: typeof window !== 'undefined' ? window.location.protocol === 'https:' : false,
  
  // Cookie names (configurable prefix)
  NAMES: {
    CONSENT: 'app_consent',
    SESSION: 'app_session',
    PREFERENCES: 'app_preferences',
    ANALYTICS: 'app_analytics_consent',
    MARKETING: 'app_marketing_consent',
    AI_TRAINING: 'app_ai_training_consent'
  },
  
  // Expiry times (in days)
  EXPIRY: {
    SESSION: 0, // Session cookie
    CONSENT: 365, // 1 year
    PREFERENCES: 365, // 1 year
    ANALYTICS: 90, // 3 months
    MARKETING: 30, // 1 month
    AI_TRAINING: 730 // 2 years
  },
  
  // Cross-domain settings - DISABLED by default for public use
  CROSS_DOMAIN: {
    ENABLE: false, // Disabled by default for generic use
    ROOT_DOMAIN: '', // Will be set to current domain if enabled
    SUBDOMAINS: []
  }
};

/**
 * Production Cookie Manager Class
 */
export class LucitraCookieManager {
  constructor(config = {}) {
    this.config = {
      ...COOKIE_CONFIG,
      ...config
    };
    
    this.isServer = typeof window === 'undefined';
    
    // Set domain based on cross-domain configuration
    if (this.config.CROSS_DOMAIN.ENABLE && this.config.CROSS_DOMAIN.ROOT_DOMAIN) {
      this.domain = this.config.CROSS_DOMAIN.ROOT_DOMAIN;
    } else {
      // For single domain use, don't set domain attribute (uses current domain)
      this.domain = null;
    }
    
    // Initialize consent state
    this.consentState = this.loadConsentState();
    
    // Set up event listeners for cross-tab synchronization
    if (!this.isServer) {
      this.setupCrossTabSync();
    }
  }
  
  /**
   * Set a cookie with proper security and compliance settings
   */
  setCookie(name, value, options = {}) {
    if (this.isServer) {
      console.warn('Cannot set cookies on server side');
      return false;
    }
    
    try {
      const cookieOptions = {
        path: this.config.DEFAULT_PATH,
        sameSite: this.config.DEFAULT_SAME_SITE,
        secure: this.config.DEFAULT_SECURE,
        expires: null, // Will be calculated below
        ...options
      };
      
      // Only set domain if cross-domain is enabled
      if (this.domain) {
        cookieOptions.domain = this.domain;
      }
      
      // Calculate expiry date
      if (options.maxAge) {
        // Use maxAge if provided (in seconds)
        cookieOptions.maxAge = options.maxAge;
      } else if (options.expires) {
        // Use provided expires date
        cookieOptions.expires = options.expires;
      } else if (options.days) {
        // Calculate from days
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + options.days);
        cookieOptions.expires = expiryDate.toUTCString();
      } else if (options.days === 0) {
        // Session cookie - don't set expires
        delete cookieOptions.expires;
      } else {
        // Default expiry based on cookie type
        const defaultDays = this.getDefaultExpiry(name);
        if (defaultDays > 0) {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + defaultDays);
          cookieOptions.expires = expiryDate.toUTCString();
        }
      }
      
      // Build cookie string
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      
      // Add attributes
      Object.entries(cookieOptions).forEach(([key, val]) => {
        if (val !== null && val !== undefined) {
          if (key === 'secure' && val) {
            cookieString += '; Secure';
          } else if (key === 'httpOnly' && val) {
            cookieString += '; HttpOnly';
          } else if (key === 'sameSite') {
            cookieString += `; SameSite=${val}`;
          } else if (key !== 'secure' && key !== 'httpOnly') {
            cookieString += `; ${key}=${val}`;
          }
        }
      });
      
      // Set the cookie
      document.cookie = cookieString;
      
      // Log for compliance audit
      this.logCookieEvent('cookie_set', {
        name,
        domain: cookieOptions.domain,
        secure: cookieOptions.secure,
        sameSite: cookieOptions.sameSite,
        expires: cookieOptions.expires
      });
      
      return true;
    } catch (error) {
      console.error('Failed to set cookie:', error);
      return false;
    }
  }
  
  /**
   * Get a cookie value
   */
  getCookie(name) {
    if (this.isServer) {
      return null;
    }
    
    try {
      const encodedName = encodeURIComponent(name);
      const cookies = document.cookie.split(';');
      
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(encodedName + '=')) {
          const value = cookie.substring(encodedName.length + 1);
          return decodeURIComponent(value);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get cookie:', error);
      return null;
    }
  }
  
  /**
   * Delete a cookie
   */
  deleteCookie(name, options = {}) {
    if (this.isServer) {
      return false;
    }
    
    try {
      // Delete with current domain
      this.setCookie(name, '', {
        ...options,
        expires: 'Thu, 01 Jan 1970 00:00:00 UTC',
        maxAge: -1
      });
      
      // Also try to delete without domain (for legacy cookies)
      document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${this.config.DEFAULT_PATH}`;
      
      // Log for compliance
      this.logCookieEvent('cookie_deleted', { name });
      
      return true;
    } catch (error) {
      console.error('Failed to delete cookie:', error);
      return false;
    }
  }
  
  /**
   * Check if cookies are enabled
   */
  areCookiesEnabled() {
    if (this.isServer) {
      return false;
    }
    
    try {
      // Use a simple, direct cookie test without domain complications
      const testName = 'test_cookie_' + Date.now();
      const testValue = 'test';
      
      // Set a simple test cookie without any domain restrictions
      document.cookie = `${testName}=${testValue}; path=/; SameSite=Lax`;
      
      // Check if we can read it back
      const cookieExists = document.cookie.indexOf(`${testName}=${testValue}`) !== -1;
      
      // Clean up the test cookie
      if (cookieExists) {
        document.cookie = `${testName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
      
      return cookieExists;
    } catch {
      return false;
    }
  }
  
  /**
   * Get all Lucitra cookies
   */
  getAllLucitraCookies() {
    if (this.isServer) {
      return {};
    }
    
    const lucitraCookies = {};
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      cookie = cookie.trim();
      const [name, value] = cookie.split('=');
      
      if (name && name.startsWith('lucitra_')) {
        try {
          lucitraCookies[decodeURIComponent(name)] = decodeURIComponent(value || '');
        } catch (error) {
          console.warn('Failed to decode cookie:', name, error);
        }
      }
    }
    
    return lucitraCookies;
  }
  
  /**
   * Consent Management Integration
   */
  setConsent(category, granted, options = {}) {
    const consentData = {
      granted,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      userAgent: navigator.userAgent,
      ...options
    };
    
    // Store individual consent
    this.setCookie(`${this.config.NAMES.CONSENT}_${category}`, JSON.stringify(consentData), {
      days: this.config.EXPIRY.CONSENT
    });
    
    // Update global consent state
    this.consentState[category] = granted;
    this.saveConsentState();
    
    // Enforce consent immediately
    this.enforceConsent();
    
    // Trigger consent change event
    this.triggerConsentChangeEvent(category, granted);
    
    return true;
  }
  
  /**
   * Check if consent is granted for a category
   */
  hasConsent(category) {
    // Essential cookies don't require consent
    if (category === 'essential' || category === 'necessary') {
      return true;
    }
    
    return this.consentState[category] === true;
  }
  
  /**
   * Get all consent preferences
   */
  getConsentPreferences() {
    const preferences = {};
    
    Object.keys(this.config.NAMES).forEach(key => {
      const category = key.toLowerCase();
      const cookieName = `${this.config.NAMES.CONSENT}_${category}`;
      const consentCookie = this.getCookie(cookieName);
      
      if (consentCookie) {
        try {
          const consentData = JSON.parse(consentCookie);
          preferences[category] = {
            granted: consentData.granted,
            timestamp: consentData.timestamp,
            version: consentData.version
          };
        } catch {
          preferences[category] = { granted: false };
        }
      } else {
        preferences[category] = { granted: category === 'essential' };
      }
    });
    
    return preferences;
  }
  
  /**
   * Enforce consent by deleting non-consented cookies
   */
  enforceConsent() {
    const allCookies = this.getAllLucitraCookies();
    
    Object.keys(allCookies).forEach(cookieName => {
      const category = this.getCookieCategory(cookieName);
      
      if (category && !this.hasConsent(category)) {
        // Don't delete consent cookies themselves
        if (!cookieName.includes('_consent')) {
          this.deleteCookie(cookieName);
        }
      }
    });
  }
  
  /**
   * Clear all cookies (for GDPR right to be forgotten)
   */
  clearAllCookies(keepEssential = true) {
    const allCookies = this.getAllLucitraCookies();
    
    Object.keys(allCookies).forEach(cookieName => {
      const category = this.getCookieCategory(cookieName);
      
      if (!keepEssential || category !== 'essential') {
        this.deleteCookie(cookieName);
      }
    });
    
    // Reset consent state
    this.consentState = {};
    this.saveConsentState();
    
    this.logCookieEvent('all_cookies_cleared', { keepEssential });
  }
  
  /**
   * Export user data (for GDPR data portability)
   */
  exportUserData() {
    const allCookies = this.getAllLucitraCookies();
    const consentPreferences = this.getConsentPreferences();
    
    return {
      exportedAt: new Date().toISOString(),
      domain: this.domain,
      cookies: allCookies,
      consentPreferences,
      version: '1.0.0'
    };
  }
  
  /**
   * Cross-domain synchronization
   */
  syncAcrossDomains() {
    if (!this.config.CROSS_DOMAIN.ENABLE) {
      return;
    }
    
    const consentData = this.getConsentPreferences();
    
    // Store consent in a way that can be read across subdomains
    this.setCookie('lucitra_cross_domain_consent', JSON.stringify(consentData), {
      domain: this.config.CROSS_DOMAIN.ROOT_DOMAIN,
      days: this.config.EXPIRY.CONSENT
    });
  }
  
  /**
   * Load cross-domain consent
   */
  loadCrossDomainConsent() {
    if (!this.config.CROSS_DOMAIN.ENABLE) {
      return null;
    }
    
    const crossDomainConsent = this.getCookie('lucitra_cross_domain_consent');
    
    if (crossDomainConsent) {
      try {
        return JSON.parse(crossDomainConsent);
      } catch {
        return null;
      }
    }
    
    return null;
  }
  
  // Helper methods
  getDefaultExpiry(cookieName) {
    if (cookieName.includes('session')) return this.config.EXPIRY.SESSION;
    if (cookieName.includes('consent')) return this.config.EXPIRY.CONSENT;
    if (cookieName.includes('analytics')) return this.config.EXPIRY.ANALYTICS;
    if (cookieName.includes('marketing')) return this.config.EXPIRY.MARKETING;
    if (cookieName.includes('ai_training')) return this.config.EXPIRY.AI_TRAINING;
    return this.config.EXPIRY.PREFERENCES;
  }
  
  getCookieCategory(cookieName) {
    if (cookieName.includes('session') || cookieName.includes('auth')) return 'essential';
    if (cookieName.includes('analytics')) return 'analytics';
    if (cookieName.includes('marketing')) return 'marketing';
    if (cookieName.includes('ai_training')) return 'ai_training';
    if (cookieName.includes('preferences')) return 'functional';
    return 'other';
  }
  
  loadConsentState() {
    if (this.isServer) return {};
    
    try {
      const stored = localStorage.getItem('lucitra_consent_state');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }
  
  saveConsentState() {
    if (this.isServer) return;
    
    try {
      localStorage.setItem('lucitra_consent_state', JSON.stringify(this.consentState));
    } catch (error) {
      console.error('Failed to save consent state:', error);
    }
  }
  
  setupCrossTabSync() {
    if (this.isServer) return;
    
    // Listen for consent changes in other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === 'lucitra_consent_state') {
        try {
          this.consentState = JSON.parse(event.newValue || '{}');
          this.enforceConsent();
          this.triggerConsentChangeEvent('sync', this.consentState);
        } catch (error) {
          console.error('Failed to sync consent across tabs:', error);
        }
      }
    });
  }
  
  logCookieEvent(action, details) {
    if (this.isServer) return;
    
    try {
      const event = {
        action,
        details,
        timestamp: new Date().toISOString(),
        domain: this.domain,
        userAgent: navigator.userAgent
      };
      
      // Store in audit log
      const auditLog = JSON.parse(localStorage.getItem('lucitra_cookie_audit') || '[]');
      auditLog.push(event);
      
      // Keep only last 1000 events
      if (auditLog.length > 1000) {
        auditLog.splice(0, auditLog.length - 1000);
      }
      
      localStorage.setItem('lucitra_cookie_audit', JSON.stringify(auditLog));
    } catch (error) {
      console.error('Failed to log cookie event:', error);
    }
  }
  
  triggerConsentChangeEvent(category, granted) {
    if (this.isServer) return;
    
    try {
      const event = new CustomEvent('lucitraConsentChange', {
        detail: {
          category,
          granted,
          timestamp: new Date().toISOString(),
          allConsents: this.consentState
        }
      });
      
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Failed to trigger consent change event:', error);
    }
  }
  
  // Compliance helpers
  generateComplianceReport() {
    const auditLog = JSON.parse(localStorage.getItem('lucitra_cookie_audit') || '[]');
    const allCookies = this.getAllLucitraCookies();
    const consentPreferences = this.getConsentPreferences();
    
    return {
      generatedAt: new Date().toISOString(),
      domain: this.domain,
      cookiesEnabled: this.areCookiesEnabled(),
      totalCookies: Object.keys(allCookies).length,
      consentPreferences,
      auditEvents: auditLog.length,
      lastConsentUpdate: Math.max(...Object.values(consentPreferences).map(p => new Date(p.timestamp || 0).getTime())),
      crossDomainEnabled: this.config.CROSS_DOMAIN.ENABLE,
      complianceVersion: '1.0.0'
    };
  }
}

// Singleton instance for global use
let globalCookieManager = null;

/**
 * Get or create the global cookie manager instance
 */
export function getCookieManager(config = {}) {
  if (!globalCookieManager) {
    globalCookieManager = new LucitraCookieManager(config);
  }
  return globalCookieManager;
}

/**
 * React hook for cookie management
 */
export function useCookieManager(config = {}) {
  const [cookieManager] = useState(() => getCookieManager(config));
  const [consentState, setConsentState] = useState(() => cookieManager.consentState);
  
  useEffect(() => {
    const handleConsentChange = (event) => {
      setConsentState({ ...event.detail.allConsents });
    };
    
    window.addEventListener('lucitraConsentChange', handleConsentChange);
    
    return () => {
      window.removeEventListener('lucitraConsentChange', handleConsentChange);
    };
  }, []);
  
  return {
    cookieManager,
    consentState,
    hasConsent: (category) => cookieManager.hasConsent(category),
    setConsent: (category, granted, options) => cookieManager.setConsent(category, granted, options),
    clearAllCookies: (keepEssential) => cookieManager.clearAllCookies(keepEssential),
    exportUserData: () => cookieManager.exportUserData(),
    generateComplianceReport: () => cookieManager.generateComplianceReport()
  };
}

export default LucitraCookieManager;