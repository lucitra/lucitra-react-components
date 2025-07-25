// Simplified AI Service for Consumer SaaS Product
// No API keys required - all handled server-side

class AIServiceSimple {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.resumebuilder.ai';
    
    this.optimizationGoals = {
      'impact': {
        name: 'Maximum Impact',
        description: 'Strong action verbs, quantified results',
        icon: '💪'
      },
      'ats-friendly': {
        name: 'ATS Optimized',
        description: 'Keywords for applicant tracking systems',
        icon: '🤖'
      },
      'concise': {
        name: 'Clear & Concise',
        description: 'Direct, easy to scan quickly',
        icon: '✨'
      },
      'leadership': {
        name: 'Leadership Focus',
        description: 'Emphasize management & strategy',
        icon: '👔'
      },
      'technical': {
        name: 'Technical Detail',
        description: 'Highlight technical achievements',
        icon: '💻'
      }
    };

    this.subscriptionPlans = {
      free: {
        name: 'Free',
        price: 0,
        optimizationsPerMonth: 10,
        features: [
          '10 AI optimizations per month',
          'Basic templates',
          'Export to PDF',
          'Single resume'
        ],
        limitations: {
          maxResumes: 1,
          customTemplates: false,
          bulkOptimization: false,
          coverLetters: false,
          analyticsAccess: false
        }
      },
      starter: {
        name: 'Starter',
        price: 9.99,
        optimizationsPerMonth: 100,
        features: [
          '100 AI optimizations per month',
          'All templates',
          'Multiple export formats',
          'Up to 3 resumes',
          'Basic analytics'
        ],
        limitations: {
          maxResumes: 3,
          customTemplates: false,
          bulkOptimization: true,
          coverLetters: true,
          analyticsAccess: 'basic'
        }
      },
      professional: {
        name: 'Professional',
        price: 19.99,
        optimizationsPerMonth: 'unlimited',
        features: [
          'Unlimited AI optimizations',
          'Custom templates',
          'Unlimited resumes',
          'AI cover letters',
          'LinkedIn optimization',
          'Advanced analytics',
          'Priority support'
        ],
        limitations: {
          maxResumes: 'unlimited',
          customTemplates: true,
          bulkOptimization: true,
          coverLetters: true,
          analyticsAccess: 'advanced'
        }
      }
    };
  }

  async optimizeText({
    text,
    fieldType,
    goal = 'impact',
    context = {},
    resumeId = null
  }) {
    try {
      const response = await fetch(`${this.baseURL}/api/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          text,
          fieldType,
          goal,
          context: {
            ...context,
            resumeId,
            userPlan: await this.getUserPlan()
          }
        })
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Monthly optimization limit reached. Upgrade to continue.');
        }
        throw new Error('Optimization failed. Please try again.');
      }

      const result = await response.json();
      
      // Update local usage counter
      this.updateLocalUsage();
      
      return {
        success: true,
        suggestions: result.suggestions,
        explanation: result.explanation,
        confidence: result.confidence,
        creditsUsed: 1,
        creditsRemaining: result.creditsRemaining
      };
    } catch (error) {
      console.error('Optimization error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async bulkOptimize(resumeId, options = {}) {
    const {
      sections = ['summary', 'experience', 'skills'],
      goal = 'ats-friendly',
      targetJob = null
    } = options;

    try {
      const response = await fetch(`${this.baseURL}/api/optimize/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          resumeId,
          sections,
          goal,
          targetJob
        })
      });

      if (!response.ok) {
        throw new Error('Bulk optimization failed');
      }

      const result = await response.json();
      return {
        success: true,
        optimizations: result.optimizations,
        summary: result.summary,
        creditsUsed: result.creditsUsed
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async generateCoverLetter({
    resumeId,
    jobDescription,
    companyName,
    tone = 'professional'
  }) {
    try {
      const response = await fetch(`${this.baseURL}/api/cover-letter/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          resumeId,
          jobDescription,
          companyName,
          tone
        })
      });

      if (!response.ok) {
        throw new Error('Cover letter generation failed');
      }

      const result = await response.json();
      return {
        success: true,
        coverLetter: result.coverLetter,
        customizations: result.customizations
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async analyzeJobMatch(resumeId, jobDescription) {
    try {
      const response = await fetch(`${this.baseURL}/api/analyze/job-match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          resumeId,
          jobDescription
        })
      });

      const result = await response.json();
      return {
        success: true,
        matchScore: result.matchScore,
        missingKeywords: result.missingKeywords,
        suggestions: result.suggestions,
        strengths: result.strengths,
        gaps: result.gaps
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getUsage() {
    try {
      const response = await fetch(`${this.baseURL}/api/usage`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      const usage = await response.json();
      return {
        used: usage.optimizationsUsed,
        remaining: usage.optimizationsRemaining,
        resetDate: usage.resetDate,
        plan: usage.plan
      };
    } catch (error) {
      // Fallback to local storage
      const localUsage = this.getLocalUsage();
      return localUsage;
    }
  }

  async getUserPlan() {
    const stored = localStorage.getItem('userPlan');
    if (stored) {
      const plan = JSON.parse(stored);
      if (plan.expiresAt > Date.now()) {
        return plan.name;
      }
    }

    // Fetch from server
    try {
      const response = await fetch(`${this.baseURL}/api/user/plan`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });
      const data = await response.json();
      
      localStorage.setItem('userPlan', JSON.stringify({
        name: data.plan,
        expiresAt: Date.now() + 3600000 // 1 hour cache
      }));
      
      return data.plan;
    } catch (error) {
      return 'free';
    }
  }

  getAuthToken() {
    return localStorage.getItem('authToken') || '';
  }

  updateLocalUsage() {
    const usage = this.getLocalUsage();
    usage.used += 1;
    usage.remaining = Math.max(0, usage.remaining - 1);
    localStorage.setItem('aiUsage', JSON.stringify(usage));
  }

  getLocalUsage() {
    const stored = localStorage.getItem('aiUsage');
    if (stored) {
      const usage = JSON.parse(stored);
      // Reset if new month
      const now = new Date();
      const resetDate = new Date(usage.resetDate);
      if (now.getMonth() !== resetDate.getMonth() || now.getFullYear() !== resetDate.getFullYear()) {
        return this.resetLocalUsage();
      }
      return usage;
    }
    return this.resetLocalUsage();
  }

  resetLocalUsage() {
    const plan = localStorage.getItem('userPlan') ? JSON.parse(localStorage.getItem('userPlan')).name : 'free';
    const limit = this.subscriptionPlans[plan]?.optimizationsPerMonth || 10;
    
    const usage = {
      used: 0,
      remaining: limit === 'unlimited' ? 999999 : limit,
      resetDate: new Date().toISOString(),
      plan
    };
    
    localStorage.setItem('aiUsage', JSON.stringify(usage));
    return usage;
  }

  // Simple templates for quick starts
  getQuickTemplates() {
    return {
      'entry-level': {
        name: 'Entry Level / New Grad',
        summary: 'Recent graduate with strong foundation in [field]. Eager to apply academic knowledge and internship experience to contribute to [company type]. Quick learner with excellent communication skills.',
        bulletTemplate: 'Assisted with [task] resulting in [outcome]'
      },
      'career-change': {
        name: 'Career Change',
        summary: 'Experienced professional transitioning from [previous field] to [new field]. Leveraging transferable skills in [skill 1, skill 2] to bring unique perspective and proven track record of success.',
        bulletTemplate: 'Applied [transferable skill] to achieve [result] in [context]'
      },
      'senior-leader': {
        name: 'Senior / Executive',
        summary: 'Accomplished [title] with [X]+ years driving organizational growth and operational excellence. Proven ability to [key achievement]. Known for [leadership quality] and delivering [business outcome].',
        bulletTemplate: 'Led [initiative] resulting in [business impact] and [$X] in [metric]'
      },
      'technical-expert': {
        name: 'Technical Specialist',
        summary: 'Expert [role] specializing in [technologies/domains]. Designed and implemented [type of solutions] that [impact]. Passionate about [technical interest] and staying current with emerging technologies.',
        bulletTemplate: 'Developed [technical solution] using [technologies] improving [metric] by [percentage]'
      }
    };
  }
}

// Export singleton instance
export const aiService = new AIServiceSimple();
export default aiService;