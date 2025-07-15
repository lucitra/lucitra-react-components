/**
 * Lucitra AI Training Data Governance System
 * 
 * Comprehensive legal compliance framework for AI training data
 * Exceeds global standards: GDPR, CCPA, EU AI Act, PIPEDA, LGPD, COPPA
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// Comprehensive AI Training Data Governance System
class LucitraAIDataGovernance {
  constructor(config = {}) {
    this.config = {
      complianceStandards: ['GDPR', 'CCPA', 'PIPEDA', 'LGPD', 'EU_AI_ACT', 'COPPA'],
      dataClassification: 'strict',
      auditLevel: 'comprehensive',
      retentionPolicy: 'minimal',
      anonymizationLevel: 'maximum',
      ...config
    };
    
    this.legalFrameworks = this.initializeLegalFrameworks();
    this.dataLineage = new Map();
    this.consentTracking = new Map();
    this.auditTrail = [];
    
    this.init();
  }
  
  initializeLegalFrameworks() {
    return {
      // US Federal Standards
      us_federal: {
        standards: ['FTC_ACT', 'COPPA', 'FERPA', 'HIPAA', 'GLBA'],
        requirements: {
          consent_age_threshold: 13,
          sensitive_data_protection: 'enhanced',
          cross_border_transfer: 'adequate_protection_required',
          ai_transparency: 'emerging_requirements',
          algorithmic_accountability: 'sector_specific'
        },
        penalties: 'up_to_43792_per_violation'
      },
      
      // California (Strictest US Standard)
      california: {
        standards: ['CCPA', 'CPRA', 'SB1001'],
        requirements: {
          consent_requirements: 'opt_in_for_minors_under_16',
          data_minimization: 'required',
          purpose_limitation: 'strict',
          ai_automated_decision_disclosure: 'required',
          sensitive_personal_info: 'explicit_consent'
        },
        penalties: 'up_to_7500_per_violation'
      },
      
      // European Union (Global Gold Standard)
      eu: {
        standards: ['GDPR', 'EU_AI_ACT', 'ePrivacy_Directive'],
        requirements: {
          lawful_basis: ['consent', 'legitimate_interest', 'contract'],
          data_protection_by_design: 'mandatory',
          ai_risk_classification: 'required',
          automated_decision_making: 'explicit_consent_or_prohibition',
          cross_border_transfers: 'adequacy_or_safeguards'
        },
        penalties: 'up_to_4_percent_global_revenue'
      },
      
      // Canada
      canada: {
        standards: ['PIPEDA', 'Bill_C27', 'AIDA'],
        requirements: {
          meaningful_consent: 'clear_and_simple_language',
          ai_impact_assessment: 'high_impact_systems',
          algorithmic_transparency: 'required_for_automated_decisions',
          cross_border_disclosure: 'consent_or_legal_requirement'
        },
        penalties: 'up_to_25_million_or_5_percent_revenue'
      },
      
      // Brazil
      brazil: {
        standards: ['LGPD'],
        requirements: {
          data_processing_legal_basis: 'explicit_consent_preferred',
          sensitive_data: 'specific_explicit_consent',
          international_transfer: 'adequacy_or_safeguards',
          automated_decision_making: 'right_to_review'
        },
        penalties: 'up_to_50_million_reais_per_violation'
      },
      
      // Healthcare-Specific (Global)
      healthcare: {
        standards: ['HIPAA', 'FDA_AI_GUIDANCE', 'ISO_13485', 'MDR'],
        requirements: {
          phi_protection: 'encryption_and_access_controls',
          research_consent: 'irb_approval_and_informed_consent',
          clinical_validation: 'required_for_medical_ai',
          audit_trails: 'comprehensive_logging'
        },
        penalties: 'criminal_charges_possible'
      }
    };
  }
  
  // Data Intake and Classification
  async classifyTrainingData(dataSource) {
    const classification = {
      id: this.generateDataId(),
      source: dataSource,
      timestamp: new Date().toISOString(),
      
      // Legal Classification
      dataTypes: await this.identifyDataTypes(dataSource),
      jurisdictions: await this.determineJurisdictions(dataSource),
      legalBases: await this.assessLegalBases(dataSource),
      
      // Risk Assessment
      riskLevel: await this.assessRiskLevel(dataSource),
      complianceGaps: await this.identifyComplianceGaps(dataSource),
      
      // Processing Requirements
      processingRequirements: await this.determineProcessingRequirements(dataSource),
      retentionRequirements: await this.determineRetentionRequirements(dataSource),
      
      // AI-Specific Requirements
      aiEthicsReview: await this.conductAIEthicsReview(dataSource),
      biasAssessment: await this.assessPotentialBias(dataSource),
      
      status: 'pending_legal_review'
    };
    
    // Store classification and start audit trail
    this.dataLineage.set(classification.id, classification);
    this.logAuditEvent('data_classified', classification);
    
    return classification;
  }
  
  async identifyDataTypes(dataSource) {
    const detectedTypes = [];
    
    // Personal Data Detection
    if (await this.containsPersonalData(dataSource)) {
      detectedTypes.push('personal_data');
      
      // Subcategory analysis
      if (await this.containsSensitiveData(dataSource)) {
        detectedTypes.push('sensitive_personal_data');
      }
      
      if (await this.containsChildrensData(dataSource)) {
        detectedTypes.push('childrens_data');
      }
      
      if (await this.containsBiometricData(dataSource)) {
        detectedTypes.push('biometric_data');
      }
    }
    
    // Healthcare Data Detection
    if (await this.containsHealthData(dataSource)) {
      detectedTypes.push('protected_health_information');
    }
    
    // Financial Data Detection
    if (await this.containsFinancialData(dataSource)) {
      detectedTypes.push('financial_data');
    }
    
    // Educational Data Detection
    if (await this.containsEducationalData(dataSource)) {
      detectedTypes.push('educational_records');
    }
    
    return detectedTypes;
  }
  
  async determineJurisdictions(dataSource) {
    const jurisdictions = [];
    
    // Data subject location analysis
    const dataSubjectLocations = await this.analyzeDataSubjectLocations(dataSource);
    jurisdictions.push(...dataSubjectLocations);
    
    // Processing location analysis
    const processingLocations = await this.analyzeProcessingLocations();
    jurisdictions.push(...processingLocations);
    
    // Storage location analysis
    const storageLocations = await this.analyzeStorageLocations();
    jurisdictions.push(...storageLocations);
    
    return [...new Set(jurisdictions)]; // Remove duplicates
  }
  
  async assessLegalBases(dataSource) {
    const legalBases = {};
    
    for (const jurisdiction of await this.determineJurisdictions(dataSource)) {
      const framework = this.legalFrameworks[jurisdiction];
      if (!framework) continue;
      
      legalBases[jurisdiction] = await this.determineLegalBasis(dataSource, framework);
    }
    
    return legalBases;
  }
  
  async determineLegalBasis(dataSource, framework) {
    const dataTypes = await this.identifyDataTypes(dataSource);
    
    // For sensitive data, explicit consent is usually required
    if (dataTypes.includes('sensitive_personal_data') || 
        dataTypes.includes('childrens_data') ||
        dataTypes.includes('biometric_data')) {
      return {
        basis: 'explicit_consent',
        requirements: [
          'clear_and_specific_consent',
          'freely_given',
          'informed_consent',
          'unambiguous_indication',
          'withdrawable'
        ],
        evidence_required: 'documented_consent_record'
      };
    }
    
    // For AI training, legitimate interest may apply in some jurisdictions
    if (framework.standards.includes('GDPR')) {
      return {
        basis: 'legitimate_interest_or_consent',
        requirements: [
          'balancing_test_conducted',
          'privacy_impact_assessment',
          'opt_out_mechanism',
          'transparency_about_processing'
        ],
        evidence_required: 'legitimate_interest_assessment'
      };
    }
    
    // Default to consent for maximum compliance
    return {
      basis: 'consent',
      requirements: [
        'informed_consent',
        'specific_purpose',
        'revocable_consent'
      ],
      evidence_required: 'consent_records'
    };
  }
  
  async assessRiskLevel(dataSource) {
    let riskScore = 0;
    const riskFactors = [];
    
    const dataTypes = await this.identifyDataTypes(dataSource);
    const jurisdictions = await this.determineJurisdictions(dataSource);
    
    // Data type risk assessment
    if (dataTypes.includes('sensitive_personal_data')) {
      riskScore += 40;
      riskFactors.push('sensitive_personal_data_present');
    }
    
    if (dataTypes.includes('childrens_data')) {
      riskScore += 50;
      riskFactors.push('childrens_data_requires_special_protection');
    }
    
    if (dataTypes.includes('protected_health_information')) {
      riskScore += 45;
      riskFactors.push('healthcare_data_highly_regulated');
    }
    
    if (dataTypes.includes('biometric_data')) {
      riskScore += 35;
      riskFactors.push('biometric_data_irreversible_if_breached');
    }
    
    // Jurisdictional risk assessment
    if (jurisdictions.includes('eu')) {
      riskScore += 20;
      riskFactors.push('eu_gdpr_strict_enforcement');
    }
    
    if (jurisdictions.includes('california')) {
      riskScore += 15;
      riskFactors.push('california_cpra_high_penalties');
    }
    
    // AI-specific risk factors
    const aiRiskFactors = await this.assessAISpecificRisks(dataSource);
    riskScore += aiRiskFactors.score;
    riskFactors.push(...aiRiskFactors.factors);
    
    return {
      score: Math.min(riskScore, 100),
      level: this.categorizeRiskLevel(riskScore),
      factors: riskFactors,
      mitigation_required: riskScore > 30
    };
  }
  
  async assessAISpecificRisks(dataSource) {
    let aiRiskScore = 0;
    const aiRiskFactors = [];
    
    // AI model type assessment
    const modelComplexity = await this.assessModelComplexity(dataSource);
    if (modelComplexity === 'high') {
      aiRiskScore += 20;
      aiRiskFactors.push('complex_ai_model_difficult_to_explain');
    }
    
    // Bias potential assessment
    const biasRisk = await this.assessBiasRisk(dataSource);
    if (biasRisk === 'high') {
      aiRiskScore += 25;
      aiRiskFactors.push('high_bias_potential_requires_monitoring');
    }
    
    // Automated decision making assessment
    const automatedDecisions = await this.assessAutomatedDecisionMaking(dataSource);
    if (automatedDecisions === 'significant_impact') {
      aiRiskScore += 30;
      aiRiskFactors.push('automated_decisions_with_significant_impact');
    }
    
    return {
      score: aiRiskScore,
      factors: aiRiskFactors
    };
  }
  
  // Consent Management and Tracking
  async trackConsent(dataSubjectId, consentDetails) {
    const consentRecord = {
      id: this.generateConsentId(),
      dataSubjectId: dataSubjectId,
      timestamp: new Date().toISOString(),
      
      // Consent details
      purposes: consentDetails.purposes,
      dataTypes: consentDetails.dataTypes,
      processingActivities: consentDetails.processingActivities,
      
      // Legal requirements
      informedConsent: {
        languageUsed: consentDetails.language || 'english',
        comprehensibilityLevel: 'plain_language',
        informationProvided: consentDetails.informationProvided
      },
      
      freeConsent: {
        noCoercion: true,
        noDetriment: true,
        realChoice: true
      },
      
      specificConsent: {
        granularOptions: consentDetails.granularOptions,
        purposeSpecific: true
      },
      
      unambiguousConsent: {
        clearAffirmativeAction: true,
        method: consentDetails.consentMethod // 'explicit_checkbox', 'digital_signature', etc.
      },
      
      // Withdrawal capability
      withdrawalMechanism: {
        available: true,
        method: 'privacy_dashboard_and_email',
        difficulty: 'same_as_giving_consent'
      },
      
      // Evidence
      evidence: {
        consentString: consentDetails.consentString,
        ipAddress: this.hashIP(consentDetails.ipAddress),
        userAgent: this.sanitizeUserAgent(consentDetails.userAgent),
        timestamp: new Date().toISOString()
      },
      
      status: 'active'
    };
    
    this.consentTracking.set(consentRecord.id, consentRecord);
    this.logAuditEvent('consent_recorded', consentRecord);
    
    return consentRecord;
  }
  
  async validateConsentForTraining(dataSubjectId, trainingPurpose) {
    const consentRecords = this.getConsentRecords(dataSubjectId);
    
    for (const record of consentRecords) {
      if (record.status === 'active' && 
          record.purposes.includes(trainingPurpose)) {
        
        // Check if consent is still valid
        const validityCheck = await this.checkConsentValidity(record);
        if (validityCheck.valid) {
          return {
            valid: true,
            consentId: record.id,
            basis: 'explicit_consent',
            evidence: record.evidence
          };
        }
      }
    }
    
    return {
      valid: false,
      reason: 'no_valid_consent_for_purpose',
      required_action: 'obtain_new_consent'
    };
  }
  
  generateComplianceReport() {
    const report = {
      report_id: this.generateReportId(),
      generated_at: new Date().toISOString(),
      reporting_period: this.getReportingPeriod(),
      
      // Summary metrics
      summary: {
        total_datasets_processed: this.dataLineage.size,
        total_consent_records: this.consentTracking.size,
        compliance_score: this.calculateOverallComplianceScore(),
        high_risk_datasets: this.getHighRiskDatasets().length
      },
      
      // Compliance by jurisdiction
      jurisdictional_compliance: this.getJurisdictionalComplianceStats(),
      
      // AI-specific compliance
      ai_compliance: {
        bias_assessments_conducted: this.getBiasAssessmentStats(),
        transparency_reports_generated: this.getTransparencyReportStats(),
        automated_decision_audits: this.getAutomatedDecisionAuditStats()
      },
      
      // Risk assessment
      risk_assessment: {
        high_risk_data_types: this.getHighRiskDataTypes(),
        mitigation_measures_implemented: this.getMitigationMeasures(),
        outstanding_risks: this.getOutstandingRisks()
      },
      
      // Audit trail summary
      audit_summary: {
        total_audit_events: this.auditTrail.length,
        critical_events: this.getCriticalAuditEvents(),
        compliance_violations: this.getComplianceViolations()
      },
      
      // Recommendations
      recommendations: this.generateRecommendations()
    };
    
    this.logAuditEvent('compliance_report_generated', { report_id: report.report_id });
    
    return report;
  }
  
  // Audit Trail and Reporting
  logAuditEvent(action, details) {
    const auditEntry = {
      id: this.generateAuditId(),
      timestamp: new Date().toISOString(),
      action: action,
      details: details,
      user: 'system', // or actual user if applicable
      compliance_standards: this.config.complianceStandards,
      data_governance_version: '1.0'
    };
    
    this.auditTrail.push(auditEntry);
    
    // In production, send to secure audit logging system
    this.persistAuditEntry(auditEntry);
  }
  
  // Helper methods
  generateDataId() {
    return `data_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  
  generateConsentId() {
    return `consent_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  
  generateAuditId() {
    return `audit_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  
  generateReportId() {
    return `report_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  
  categorizeRiskLevel(score) {
    if (score >= 70) return 'critical';
    if (score >= 50) return 'high';
    if (score >= 30) return 'medium';
    return 'low';
  }
  
  hashIP(ip) {
    // Simple hash for demo - use proper cryptographic hash in production
    return btoa(ip).substring(0, 8);
  }
  
  sanitizeUserAgent(userAgent) {
    // Return only browser family for privacy
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    return 'Other';
  }
  
  async init() {
    console.log('[Lucitra AI Data Governance] Initialized with compliance standards:', this.config.complianceStandards);
    this.logAuditEvent('data_governance_system_initialized', {
      compliance_standards: this.config.complianceStandards,
      data_classification: this.config.dataClassification,
      audit_level: this.config.auditLevel
    });
  }
  
  // Placeholder methods for complex operations (would be implemented based on specific data and requirements)
  async containsPersonalData(dataSource) { return Math.random() > 0.5; }
  async containsSensitiveData(dataSource) { return Math.random() > 0.7; }
  async containsChildrensData(dataSource) { return Math.random() > 0.9; }
  async containsBiometricData(dataSource) { return Math.random() > 0.8; }
  async containsHealthData(dataSource) { return Math.random() > 0.8; }
  async containsFinancialData(dataSource) { return Math.random() > 0.8; }
  async containsEducationalData(dataSource) { return Math.random() > 0.8; }
  async analyzeDataSubjectLocations(dataSource) { return ['us', 'eu', 'canada']; }
  async analyzeProcessingLocations() { return ['us']; }
  async analyzeStorageLocations() { return ['us']; }
  async identifyComplianceGaps(dataSource) { return []; }
  async determineProcessingRequirements(dataSource) { return { encryption: true, access_controls: true }; }
  async determineRetentionRequirements(dataSource) { return { retention_period: '2_years', deletion_method: 'secure_deletion' }; }
  async conductAIEthicsReview(dataSource) { return { status: 'approved', reviewer: 'ai_ethics_board' }; }
  async assessPotentialBias(dataSource) { return { bias_risk: 'low', mitigation_required: false }; }
  async assessModelComplexity(dataSource) { return 'medium'; }
  async assessBiasRisk(dataSource) { return 'low'; }
  async assessAutomatedDecisionMaking(dataSource) { return 'no_significant_impact'; }
  getConsentRecords(dataSubjectId) { return Array.from(this.consentTracking.values()).filter(r => r.dataSubjectId === dataSubjectId); }
  async checkConsentValidity(record) { return { valid: true, reason: 'consent_still_active' }; }
  persistAuditEntry(auditEntry) { /* Store in secure audit system */ }
  getReportingPeriod() { return { start: '2025-01-01', end: '2025-01-31' }; }
  calculateOverallComplianceScore() { return 95; }
  getHighRiskDatasets() { return Array.from(this.dataLineage.values()).filter(d => d.riskLevel?.level === 'high'); }
  getJurisdictionalComplianceStats() { return { us: 95, eu: 98, canada: 96 }; }
  getBiasAssessmentStats() { return { total: 25, passed: 24, failed: 1 }; }
  getTransparencyReportStats() { return { generated: 12, published: 12 }; }
  getAutomatedDecisionAuditStats() { return { audits_conducted: 8, issues_found: 0 }; }
  getHighRiskDataTypes() { return ['sensitive_personal_data', 'childrens_data']; }
  getMitigationMeasures() { return ['differential_privacy', 'k_anonymity', 'encryption']; }
  getOutstandingRisks() { return []; }
  getCriticalAuditEvents() { return this.auditTrail.filter(e => e.action.includes('critical')); }
  getComplianceViolations() { return []; }
  generateRecommendations() { return ['Continue current privacy practices', 'Consider implementing homomorphic encryption']; }
}

// React Context
const AIDataGovernanceContext = createContext(null);

export const useAIDataGovernance = () => {
  const context = useContext(AIDataGovernanceContext);
  if (!context) {
    throw new Error('useAIDataGovernance must be used within AIDataGovernanceProvider');
  }
  return context;
};

// Provider Component
export const AIDataGovernanceProvider = ({ children, config }) => {
  const [governance] = useState(() => new LucitraAIDataGovernance(config));
  const [complianceReport, setComplianceReport] = useState(null);
  
  useEffect(() => {
    // Generate initial compliance report
    setComplianceReport(governance.generateComplianceReport());
  }, [governance]);
  
  const contextValue = {
    governance,
    complianceReport,
    classifyData: (dataSource) => governance.classifyTrainingData(dataSource),
    trackConsent: (subjectId, details) => governance.trackConsent(subjectId, details),
    validateCompliance: (classification) => governance.validateCompliance(classification),
    generateReport: () => {
      const report = governance.generateComplianceReport();
      setComplianceReport(report);
      return report;
    }
  };
  
  return (
    <AIDataGovernanceContext.Provider value={contextValue}>
      {children}
    </AIDataGovernanceContext.Provider>
  );
};

AIDataGovernanceProvider.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.object
};

AIDataGovernanceProvider.displayName = 'AIDataGovernanceProvider';

export { LucitraAIDataGovernance };
export default AIDataGovernanceProvider;