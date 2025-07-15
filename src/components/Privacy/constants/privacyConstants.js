/**
 * Privacy Enhancing Technology Constants
 * Supporting both enterprise PET products and gaming demos
 */

// PET Technology Types
export const PET_TECHNOLOGIES = {
  DIFFERENTIAL_PRIVACY: 'differential_privacy',
  FEDERATED_LEARNING: 'federated_learning',
  HOMOMORPHIC_ENCRYPTION: 'homomorphic_encryption',
  SECURE_MULTIPARTY_COMPUTATION: 'secure_mpc',
  CONFIDENTIAL_COMPUTING: 'confidential_computing'
}

// Privacy Budget Levels (for Differential Privacy)
export const PRIVACY_BUDGET_LEVELS = {
  HIGH: { epsilon: 0.1, description: 'Maximum privacy protection' },
  MEDIUM: { epsilon: 1.0, description: 'Balanced privacy and utility' },
  LOW: { epsilon: 10.0, description: 'Minimum privacy protection' },
  CUSTOM: { epsilon: null, description: 'Custom epsilon value' }
}

// Data Processing Purposes (Enterprise)
export const ENTERPRISE_DATA_PURPOSES = {
  MODEL_TRAINING: {
    id: 'model_training',
    title: 'AI Model Training',
    description: 'Training machine learning models with privacy-preserving techniques',
    retention: '2 years',
    legal_basis: 'legitimate_interest',
    pet_technologies: [PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY, PET_TECHNOLOGIES.FEDERATED_LEARNING]
  },
  ANALYTICS: {
    id: 'analytics',
    title: 'Privacy-Preserving Analytics',
    description: 'Aggregate statistical analysis with differential privacy',
    retention: '1 year',
    legal_basis: 'consent',
    pet_technologies: [PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY]
  },
  FRAUD_DETECTION: {
    id: 'fraud_detection',
    title: 'Fraud Detection',
    description: 'Collaborative fraud detection without data sharing',
    retention: '3 years',
    legal_basis: 'legitimate_interest',
    pet_technologies: [PET_TECHNOLOGIES.SECURE_MULTIPARTY_COMPUTATION, PET_TECHNOLOGIES.FEDERATED_LEARNING]
  },
  RESEARCH: {
    id: 'research',
    title: 'Privacy-Preserving Research',
    description: 'Academic and commercial research with privacy guarantees',
    retention: '5 years',
    legal_basis: 'consent',
    pet_technologies: [PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY, PET_TECHNOLOGIES.HOMOMORPHIC_ENCRYPTION]
  }
}

// Gaming Data Purposes (Demo Platform)
export const GAMING_DATA_PURPOSES = {
  GAME_IMPROVEMENT: {
    id: 'game_improvement',
    title: '3D World Generation Enhancement',
    description: 'Improve text-to-3D generation while protecting your creative inputs',
    retention: '1 year',
    pet_technologies: [PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY],
    user_benefit: 'Better 3D world generation'
  },
  PERSONALIZATION: {
    id: 'personalization',
    title: 'Personalized Gaming Experience',
    description: 'Customize your experience without storing personal data',
    retention: '6 months',
    pet_technologies: [PET_TECHNOLOGIES.FEDERATED_LEARNING],
    user_benefit: 'Tailored game recommendations'
  },
  COLLABORATIVE_AI: {
    id: 'collaborative_ai',
    title: 'Collaborative AI Training',
    description: 'Help train AI models with other players while keeping data private',
    retention: '2 years',
    pet_technologies: [PET_TECHNOLOGIES.FEDERATED_LEARNING, PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY],
    user_benefit: 'Smarter AI without data sharing'
  },
  SAFETY_RESEARCH: {
    id: 'safety_research',
    title: 'AI Safety Research',
    description: 'Anonymous research to make AI safer for everyone',
    retention: '3 years',
    pet_technologies: [PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY],
    user_benefit: 'Safer AI for all users'
  }
}

// Compliance Frameworks
export const COMPLIANCE_FRAMEWORKS = {
  GDPR: {
    name: 'General Data Protection Regulation',
    jurisdiction: 'European Union',
    key_requirements: ['consent', 'data_minimization', 'purpose_limitation', 'right_to_deletion']
  },
  CCPA: {
    name: 'California Consumer Privacy Act',
    jurisdiction: 'California, USA',
    key_requirements: ['opt_out_right', 'data_disclosure', 'non_discrimination']
  },
  PIPEDA: {
    name: 'Personal Information Protection and Electronic Documents Act',
    jurisdiction: 'Canada',
    key_requirements: ['consent', 'privacy_by_design', 'data_breach_notification']
  },
  LGPD: {
    name: 'Lei Geral de Proteção de Dados',
    jurisdiction: 'Brazil',
    key_requirements: ['consent', 'data_minimization', 'transparency']
  },
  EU_AI_ACT: {
    name: 'European AI Act',
    jurisdiction: 'European Union',
    key_requirements: ['risk_assessment', 'transparency', 'human_oversight', 'data_governance']
  }
}

// Audit Event Types
export const AUDIT_EVENT_TYPES = {
  CONSENT_GIVEN: 'consent_given',
  CONSENT_WITHDRAWN: 'consent_withdrawn',
  DATA_PROCESSED: 'data_processed',
  DATA_DELETED: 'data_deleted',
  PRIVACY_BUDGET_CONSUMED: 'privacy_budget_consumed',
  COMPLIANCE_CHECK: 'compliance_check',
  DATA_BREACH: 'data_breach',
  USER_RIGHTS_REQUEST: 'user_rights_request'
}

// User Rights under GDPR and other regulations
export const USER_RIGHTS = {
  ACCESS: {
    id: 'access',
    title: 'Right to Access',
    description: 'Request a copy of your personal data',
    response_time: '30 days'
  },
  RECTIFICATION: {
    id: 'rectification',
    title: 'Right to Rectification',
    description: 'Request correction of inaccurate data',
    response_time: '30 days'
  },
  ERASURE: {
    id: 'erasure',
    title: 'Right to Erasure',
    description: 'Request deletion of your personal data',
    response_time: '30 days'
  },
  PORTABILITY: {
    id: 'portability',
    title: 'Right to Data Portability',
    description: 'Receive your data in a machine-readable format',
    response_time: '30 days'
  },
  OBJECT: {
    id: 'object',
    title: 'Right to Object',
    description: 'Object to processing of your personal data',
    response_time: 'Immediate'
  },
  RESTRICT: {
    id: 'restrict',
    title: 'Right to Restrict Processing',
    description: 'Temporarily limit how your data is used',
    response_time: 'Immediate'
  }
}

// Privacy Metrics for Dashboard
export const PRIVACY_METRICS = {
  EPSILON_CONSUMED: 'epsilon_consumed',
  USERS_CONSENTED: 'users_consented',
  DATA_MINIMIZATION_RATIO: 'data_minimization_ratio',
  FEDERATED_PARTICIPANTS: 'federated_participants',
  PRIVACY_VIOLATIONS: 'privacy_violations',
  COMPLIANCE_SCORE: 'compliance_score',
  USER_RIGHTS_REQUESTS: 'user_rights_requests',
  AUDIT_TRAIL_COMPLETENESS: 'audit_trail_completeness'
}

// Default Configuration
export const DEFAULT_PRIVACY_CONFIG = {
  enterprise: {
    audit_retention: '7 years',
    consent_renewal: '1 year',
    privacy_budget: PRIVACY_BUDGET_LEVELS.HIGH,
    compliance_frameworks: [COMPLIANCE_FRAMEWORKS.GDPR, COMPLIANCE_FRAMEWORKS.CCPA]
  },
  gaming: {
    audit_retention: '3 years',
    consent_renewal: '6 months',
    privacy_budget: PRIVACY_BUDGET_LEVELS.MEDIUM,
    compliance_frameworks: [COMPLIANCE_FRAMEWORKS.GDPR, COMPLIANCE_FRAMEWORKS.CCPA]
  }
}