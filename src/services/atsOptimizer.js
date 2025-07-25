// ATS (Applicant Tracking System) Optimization Service
// Helps make resumes more machine-readable and keyword-optimized

class ATSOptimizer {
  constructor() {
    // Common ATS parsing issues to avoid
    this.formattingIssues = {
      'tables': {
        severity: 'high',
        description: 'Tables often break ATS parsing',
        solution: 'Use simple text layout with clear sections'
      },
      'columns': {
        severity: 'medium',
        description: 'Multiple columns can confuse ATS readers',
        solution: 'Consider single-column layout for ATS versions'
      },
      'graphics': {
        severity: 'high',
        description: 'Images, charts, and graphics are not readable',
        solution: 'Use text-only content'
      },
      'headers_footers': {
        severity: 'medium',
        description: 'Important info in headers/footers may be missed',
        solution: 'Keep contact info in main document body'
      },
      'fancy_bullets': {
        severity: 'low',
        description: 'Special bullet characters may not parse',
        solution: 'Use standard bullets (•, -, *)'
      },
      'text_boxes': {
        severity: 'high',
        description: 'Text boxes are often skipped by ATS',
        solution: 'Use standard paragraph formatting'
      }
    };

    // Standard ATS-friendly section headers
    this.standardSectionHeaders = {
      'summary': ['Summary', 'Professional Summary', 'Executive Summary', 'Profile'],
      'experience': ['Experience', 'Work Experience', 'Professional Experience', 'Employment History'],
      'education': ['Education', 'Academic Background', 'Qualifications'],
      'skills': ['Skills', 'Technical Skills', 'Core Competencies', 'Areas of Expertise'],
      'certifications': ['Certifications', 'Licenses', 'Professional Certifications']
    };

    // Common ATS keywords by job category
    this.keywordDatabase = {
      'software_engineering': {
        technical: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Agile', 'REST API', 'Microservices', 'Git'],
        soft: ['Problem Solving', 'Team Collaboration', 'Communication', 'Leadership', 'Mentoring'],
        action: ['Developed', 'Implemented', 'Architected', 'Optimized', 'Led', 'Designed', 'Built', 'Deployed']
      },
      'ai_ml_engineering': {
        technical: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Python', 'NLP', 'Computer Vision', 'MLOps', 'Data Pipeline', 'Model Training', 'Neural Networks'],
        soft: ['Research', 'Innovation', 'Cross-functional Collaboration', 'Technical Communication'],
        action: ['Trained', 'Fine-tuned', 'Deployed', 'Optimized', 'Researched', 'Implemented', 'Scaled']
      },
      'data_science': {
        technical: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Tableau', 'Power BI', 'Big Data', 'Spark', 'Hadoop'],
        soft: ['Data Storytelling', 'Business Acumen', 'Analytical Thinking', 'Presentation Skills'],
        action: ['Analyzed', 'Visualized', 'Modeled', 'Predicted', 'Discovered', 'Optimized']
      }
    };

    // Action verb categories
    this.powerVerbs = {
      'leadership': ['Led', 'Directed', 'Managed', 'Coordinated', 'Supervised', 'Mentored', 'Guided', 'Facilitated'],
      'achievement': ['Achieved', 'Exceeded', 'Surpassed', 'Delivered', 'Accomplished', 'Attained', 'Earned'],
      'improvement': ['Improved', 'Enhanced', 'Optimized', 'Streamlined', 'Upgraded', 'Refined', 'Revamped'],
      'creation': ['Created', 'Developed', 'Designed', 'Built', 'Established', 'Launched', 'Initiated'],
      'analysis': ['Analyzed', 'Evaluated', 'Assessed', 'Investigated', 'Examined', 'Researched', 'Studied']
    };
  }

  // Analyze resume for ATS compatibility
  analyzeResume(resumeData) {
    const analysis = {
      score: 0,
      maxScore: 100,
      issues: [],
      suggestions: [],
      keywordMatch: {},
      formatting: {},
      sections: {}
    };

    // Check formatting
    analysis.formatting = this.checkFormatting(resumeData);
    
    // Check section headers
    analysis.sections = this.checkSectionHeaders(resumeData);
    
    // Analyze keywords (would need job description for full analysis)
    analysis.keywords = this.analyzeKeywords(resumeData);
    
    // Check contact information
    analysis.contact = this.checkContactInfo(resumeData.basics);
    
    // Check bullet points
    analysis.bullets = this.analyzeBulletPoints(resumeData.work);
    
    // Calculate overall score
    analysis.score = this.calculateATSScore(analysis);
    
    // Generate suggestions
    analysis.suggestions = this.generateSuggestions(analysis);

    return analysis;
  }

  checkFormatting(resumeData) {
    const formatting = {
      issues: [],
      score: 100
    };

    // Check for problematic elements (in a real implementation)
    // For now, we'll check what we can from the data structure
    
    // Check if using single column (better for ATS)
    if (resumeData.layout === 'multi-column') {
      formatting.issues.push({
        type: 'columns',
        message: 'Multi-column layouts may confuse ATS systems',
        severity: 'medium',
        points: -10
      });
      formatting.score -= 10;
    }

    return formatting;
  }

  checkSectionHeaders(resumeData) {
    const sections = {
      found: [],
      missing: [],
      score: 100
    };

    // Check for standard sections
    
    if (resumeData.work && resumeData.work.length > 0) {
      sections.found.push('experience');
    } else {
      sections.missing.push('experience');
      sections.score -= 20;
    }

    if (resumeData.education && resumeData.education.length > 0) {
      sections.found.push('education');
    } else {
      sections.missing.push('education');
      sections.score -= 15;
    }

    if (resumeData.skills && resumeData.skills.length > 0) {
      sections.found.push('skills');
    } else {
      sections.missing.push('skills');
      sections.score -= 15;
    }

    return sections;
  }

  analyzeKeywords(resumeData) {
    const keywords = {
      found: [],
      density: {},
      score: 70 // Base score without job description
    };

    // Extract text from all sections
    const fullText = this.extractAllText(resumeData);
    
    // Count keyword occurrences
    const commonKeywords = [
      'managed', 'led', 'developed', 'implemented', 'created',
      'improved', 'increased', 'decreased', 'achieved', 'delivered'
    ];

    commonKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = fullText.match(regex);
      if (matches) {
        keywords.found.push(keyword);
        keywords.density[keyword] = matches.length;
      }
    });

    return keywords;
  }

  checkContactInfo(basics) {
    const contact = {
      complete: true,
      issues: [],
      score: 100
    };

    const required = ['name', 'email', 'phone'];
    required.forEach(field => {
      if (!basics[field]) {
        contact.complete = false;
        contact.issues.push(`Missing ${field}`);
        contact.score -= 10;
      }
    });

    // Check email format
    if (basics.email && !this.isValidEmail(basics.email)) {
      contact.issues.push('Invalid email format');
      contact.score -= 5;
    }

    // Check phone format
    if (basics.phone && !this.isValidPhone(basics.phone)) {
      contact.issues.push('Phone number should include area code');
      contact.score -= 5;
    }

    return contact;
  }

  analyzeBulletPoints(workExperience) {
    const bullets = {
      total: 0,
      withMetrics: 0,
      withActionVerbs: 0,
      issues: [],
      score: 100
    };

    workExperience.forEach(job => {
      job.positions?.forEach(position => {
        position.highlights?.forEach(highlight => {
          bullets.total++;
          
          // Check for metrics (numbers, percentages, dollar amounts)
          if (/\d+/.test(highlight)) {
            bullets.withMetrics++;
          }
          
          // Check for action verbs
          const firstWord = highlight.trim().split(' ')[0];
          if (this.isActionVerb(firstWord)) {
            bullets.withActionVerbs++;
          }
        });
      });
    });

    // Calculate scores
    const metricsRatio = bullets.total > 0 ? bullets.withMetrics / bullets.total : 0;
    const actionVerbRatio = bullets.total > 0 ? bullets.withActionVerbs / bullets.total : 0;

    if (metricsRatio < 0.3) {
      bullets.issues.push('Less than 30% of bullet points contain metrics');
      bullets.score -= 20;
    }

    if (actionVerbRatio < 0.8) {
      bullets.issues.push('Not all bullet points start with action verbs');
      bullets.score -= 15;
    }

    return bullets;
  }

  calculateATSScore(analysis) {
    let totalScore = 0;
    let totalWeight = 0;

    const weights = {
      formatting: 0.2,
      sections: 0.2,
      keywords: 0.3,
      contact: 0.15,
      bullets: 0.15
    };

    Object.entries(weights).forEach(([category, weight]) => {
      if (analysis[category] && analysis[category].score !== undefined) {
        totalScore += analysis[category].score * weight;
        totalWeight += weight;
      }
    });

    return Math.round(totalScore / totalWeight);
  }

  generateSuggestions(analysis) {
    const suggestions = [];

    // Formatting suggestions
    if (analysis.formatting.issues.length > 0) {
      analysis.formatting.issues.forEach(issue => {
        suggestions.push({
          category: 'Formatting',
          priority: issue.severity,
          message: issue.message,
          solution: this.formattingIssues[issue.type]?.solution
        });
      });
    }

    // Section suggestions
    if (analysis.sections.missing.length > 0) {
      analysis.sections.missing.forEach(section => {
        suggestions.push({
          category: 'Sections',
          priority: 'high',
          message: `Missing ${section} section`,
          solution: `Add a clear "${section.toUpperCase()}" section to your resume`
        });
      });
    }

    // Bullet point suggestions
    if (analysis.bullets.issues.length > 0) {
      analysis.bullets.issues.forEach(issue => {
        suggestions.push({
          category: 'Content',
          priority: 'medium',
          message: issue,
          solution: 'Use action verbs and include specific metrics in your achievements'
        });
      });
    }

    // Contact info suggestions
    if (analysis.contact.issues.length > 0) {
      analysis.contact.issues.forEach(issue => {
        suggestions.push({
          category: 'Contact',
          priority: 'high',
          message: issue,
          solution: 'Ensure all contact information is complete and properly formatted'
        });
      });
    }

    return suggestions.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  // Helper methods
  extractAllText(resumeData) {
    let text = '';
    
    // Extract from basics
    if (resumeData.basics) {
      text += `${resumeData.basics.name} ${resumeData.basics.label} ${resumeData.basics.summary} `;
    }
    
    // Extract from work
    if (resumeData.work) {
      resumeData.work.forEach(job => {
        job.positions?.forEach(position => {
          text += `${position.title} ${job.company} `;
          position.highlights?.forEach(highlight => {
            text += `${highlight} `;
          });
        });
      });
    }
    
    // Extract from education
    if (resumeData.education) {
      resumeData.education.forEach(edu => {
        text += `${edu.studyType} ${edu.area} ${edu.institution} `;
      });
    }
    
    // Extract from skills
    if (resumeData.skills) {
      resumeData.skills.forEach(skillGroup => {
        skillGroup.items?.forEach(skill => {
          text += `${skill} `;
        });
      });
    }
    
    return text.toLowerCase();
  }

  isActionVerb(word) {
    const allActionVerbs = Object.values(this.powerVerbs).flat();
    return allActionVerbs.some(verb => 
      verb.toLowerCase() === word.toLowerCase()
    );
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    // Check for at least 10 digits
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  }

  // Generate ATS-optimized version of resume
  generateATSVersion(resumeData) {
    const atsVersion = JSON.parse(JSON.stringify(resumeData)); // Deep clone
    
    // Force single column layout
    atsVersion.layout = 'single-column';
    
    // Standardize section headers
    atsVersion.sectionHeaders = {
      summary: 'PROFESSIONAL SUMMARY',
      experience: 'WORK EXPERIENCE',
      education: 'EDUCATION',
      skills: 'SKILLS'
    };
    
    // Format phone number
    if (atsVersion.basics.phone) {
      atsVersion.basics.phone = this.formatPhoneForATS(atsVersion.basics.phone);
    }
    
    // Ensure all bullet points start with action verbs
    if (atsVersion.work) {
      atsVersion.work.forEach(job => {
        job.positions?.forEach(position => {
          position.highlights = position.highlights?.map(highlight => 
            this.optimizeBulletPoint(highlight)
          );
        });
      });
    }
    
    return atsVersion;
  }

  formatPhoneForATS(phone) {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    
    return phone;
  }

  optimizeBulletPoint(bulletPoint) {
    const trimmed = bulletPoint.trim();
    const firstWord = trimmed.split(' ')[0];
    
    // Check if it already starts with an action verb
    if (!this.isActionVerb(firstWord)) {
      // Try to identify the action and prepend an appropriate verb
      if (trimmed.toLowerCase().includes('responsible for')) {
        return trimmed.replace(/responsible for/i, 'Managed');
      }
      if (trimmed.toLowerCase().includes('worked on')) {
        return trimmed.replace(/worked on/i, 'Developed');
      }
      // Default: prepend "Contributed to"
      return `Contributed to ${trimmed.charAt(0).toLowerCase() + trimmed.slice(1)}`;
    }
    
    return trimmed;
  }

  // Match resume against job description
  matchJobDescription(resumeData, jobDescription) {
    const analysis = {
      matchScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: []
    };

    // Extract keywords from job description
    const jobKeywords = this.extractKeywords(jobDescription);
    const resumeText = this.extractAllText(resumeData).toLowerCase();

    // Check for keyword matches
    jobKeywords.forEach(keyword => {
      if (resumeText.includes(keyword.toLowerCase())) {
        analysis.matchedKeywords.push(keyword);
      } else {
        analysis.missingKeywords.push(keyword);
      }
    });

    // Calculate match score
    analysis.matchScore = Math.round(
      (analysis.matchedKeywords.length / jobKeywords.length) * 100
    );

    // Generate suggestions for missing keywords
    analysis.missingKeywords.forEach(keyword => {
      analysis.suggestions.push({
        keyword,
        suggestion: `Consider adding "${keyword}" to your resume if you have this skill/experience`,
        sections: this.suggestSectionsForKeyword(keyword)
      });
    });

    return analysis;
  }

  extractKeywords(text) {
    // Simple keyword extraction - in production, use NLP
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were']);
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.has(word));

    // Count occurrences
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Return top keywords (appeared more than once)
    return Object.entries(wordCount)
      .filter(([, count]) => count > 1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word]) => word);
  }

  suggestSectionsForKeyword(keyword) {
    // Suggest where to add the keyword based on its type
    const technicalKeywords = ['python', 'javascript', 'react', 'aws', 'docker', 'sql', 'java', 'c++'];
    const softSkillKeywords = ['leadership', 'communication', 'teamwork', 'problem-solving', 'analytical'];
    
    if (technicalKeywords.some(tech => keyword.toLowerCase().includes(tech))) {
      return ['skills', 'work experience'];
    } else if (softSkillKeywords.some(skill => keyword.toLowerCase().includes(skill))) {
      return ['summary', 'work experience'];
    } else {
      return ['work experience', 'skills'];
    }
  }
}

export const atsOptimizer = new ATSOptimizer();
export default atsOptimizer;