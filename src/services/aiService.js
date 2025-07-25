// AI Service Layer for Resume Optimization
// Supports multiple AI providers with fallback options

class AIService {
  constructor() {
    this.providers = {
      openai: {
        name: 'OpenAI',
        models: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
        endpoint: 'https://api.openai.com/v1/chat/completions',
        defaultModel: 'gpt-4-turbo',
        costPer1kTokens: { input: 0.01, output: 0.03 }
      },
      anthropic: {
        name: 'Anthropic',
        models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
        endpoint: 'https://api.anthropic.com/v1/messages',
        defaultModel: 'claude-3-sonnet',
        costPer1kTokens: { input: 0.003, output: 0.015 }
      },
      gemini: {
        name: 'Google Gemini',
        models: ['gemini-pro', 'gemini-pro-vision'],
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
        defaultModel: 'gemini-pro',
        costPer1kTokens: { input: 0.0005, output: 0.0015 }
      }
    };

    this.promptTemplates = {
      'job-title': {
        name: 'Job Title Optimization',
        template: `Optimize this job title for a resume. Make it more impactful and aligned with industry standards.
        
Current title: {currentText}
Target role: {targetRole}
Industry: {industryFocus}

Provide 3 variations that:
1. Use standard industry terminology
2. Highlight seniority appropriately
3. Include relevant keywords for ATS systems

Return as JSON: { "suggestions": ["title1", "title2", "title3"], "reasoning": "explanation" }`,
        maxTokens: 150
      },
      'bullet-point': {
        name: 'Bullet Point Enhancement',
        template: `Improve this resume bullet point to be more impactful and quantifiable.

Current bullet: {currentText}
Company: {company}
Role: {jobTitle}
Target job description: {jobDescription}

Requirements:
- Start with a strong action verb
- Include metrics/numbers where possible
- Show impact and results
- Keep under 2 lines
- Use STAR method (Situation, Task, Action, Result)

Return as JSON: { "suggestions": ["bullet1", "bullet2"], "reasoning": "explanation", "confidence": 0-100 }`,
        maxTokens: 200
      },
      'summary': {
        name: 'Professional Summary',
        template: `Write a compelling professional summary for this resume.

Background:
{resumeContext}

Target role: {targetRole}
Key skills: {topSkills}
Years of experience: {yearsExperience}
Industry focus: {industryFocus}

Create a 3-4 sentence summary that:
1. Opens with years of experience and primary expertise
2. Highlights 2-3 key achievements or skills
3. Shows value proposition for target role
4. Includes relevant keywords from job description

Job description keywords: {jobDescription}

Return as JSON: { "summary": "text", "keywords_included": ["keyword1", "keyword2"], "confidence": 0-100 }`,
        maxTokens: 300
      },
      'skills-optimization': {
        name: 'Skills Section Optimization',
        template: `Optimize this skills list for the target role and ATS compatibility.

Current skills: {currentSkills}
Target role: {targetRole}
Job description: {jobDescription}

Tasks:
1. Identify missing critical skills from job description
2. Suggest skills to remove (outdated/irrelevant)
3. Recommend skill categories and organization
4. Ensure ATS-friendly formatting

Return as JSON: { 
  "add": ["skill1", "skill2"], 
  "remove": ["skill3"], 
  "categories": { "Technical": ["skill1"], "Leadership": ["skill2"] },
  "reasoning": "explanation" 
}`,
        maxTokens: 300
      },
      'custom': {
        name: 'Custom Prompt',
        template: '{customPrompt}\n\nContext:\n{context}\n\nCurrent text: {currentText}',
        maxTokens: 500
      }
    };

    this.pricingTiers = {
      free: {
        creditsPerMonth: 10,
        modelsAllowed: ['gpt-3.5-turbo', 'claude-3-haiku', 'gemini-pro'],
        features: ['basic-optimization'],
        customPrompts: false
      },
      starter: {
        price: 9.99,
        creditsPerMonth: 100,
        modelsAllowed: ['gpt-4', 'claude-3-sonnet', 'gemini-pro'],
        features: ['all-optimizations', 'bulk-edit'],
        customPrompts: false
      },
      professional: {
        price: 29.99,
        creditsPerMonth: 500,
        modelsAllowed: 'all',
        features: ['all-optimizations', 'bulk-edit', 'api-access', 'analytics'],
        customPrompts: true
      },
      enterprise: {
        price: 'custom',
        creditsPerMonth: 'unlimited',
        modelsAllowed: 'all',
        features: ['all-optimizations', 'bulk-edit', 'api-access', 'analytics', 'white-label', 'sso'],
        customPrompts: true
      }
    };
  }

  async optimizeText({
    text,
    fieldType,
    provider = 'openai',
    model = null,
    context = {},
    customPrompt = null,
    userApiKey = null,
    temperature = 0.7
  }) {
    try {
      const selectedProvider = this.providers[provider];
      const selectedModel = model || selectedProvider.defaultModel;
      
      // Build prompt from template
      const promptTemplate = customPrompt ? 
        this.promptTemplates.custom : 
        this.promptTemplates[fieldType];
      
      if (!promptTemplate) {
        throw new Error(`No prompt template found for field type: ${fieldType}`);
      }

      const prompt = this.buildPrompt(promptTemplate.template, {
        currentText: text,
        ...context,
        customPrompt
      });

      // Make API call based on provider
      const response = await this.callAIProvider({
        provider: selectedProvider,
        model: selectedModel,
        prompt,
        maxTokens: promptTemplate.maxTokens,
        temperature,
        apiKey: userApiKey
      });

      // Track usage for billing
      await this.trackUsage({
        provider,
        model: selectedModel,
        tokens: response.usage,
        fieldType
      });

      return {
        success: true,
        data: response.data,
        usage: response.usage,
        cost: this.calculateCost(response.usage, selectedProvider)
      };
    } catch (error) {
      console.error('AI optimization error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async callAIProvider({ provider, model, prompt, maxTokens, temperature, apiKey }) {
    const headers = {
      'Content-Type': 'application/json'
    };

    let body = {};
    let endpoint = '';

    switch (provider.name) {
      case 'OpenAI':
        headers['Authorization'] = `Bearer ${apiKey || process.env.REACT_APP_OPENAI_API_KEY}`;
        endpoint = provider.endpoint;
        body = {
          model,
          messages: [
            { role: 'system', content: 'You are a professional resume optimization expert. Always return valid JSON.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: maxTokens,
          temperature,
          response_format: { type: 'json_object' }
        };
        break;

      case 'Anthropic':
        headers['x-api-key'] = apiKey || process.env.REACT_APP_ANTHROPIC_API_KEY;
        headers['anthropic-version'] = '2023-06-01';
        endpoint = provider.endpoint;
        body = {
          model,
          messages: [
            { role: 'user', content: prompt }
          ],
          max_tokens: maxTokens,
          temperature
        };
        break;

      case 'Google Gemini':
        endpoint = `${provider.endpoint}/${model}:generateContent?key=${apiKey || process.env.REACT_APP_GEMINI_API_KEY}`;
        body = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
            candidateCount: 1
          }
        };
        break;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return this.parseProviderResponse(provider.name, data);
  }

  parseProviderResponse(providerName, response) {
    switch (providerName) {
      case 'OpenAI':
        return {
          data: JSON.parse(response.choices[0].message.content),
          usage: {
            inputTokens: response.usage.prompt_tokens,
            outputTokens: response.usage.completion_tokens,
            totalTokens: response.usage.total_tokens
          }
        };

      case 'Anthropic':
        return {
          data: JSON.parse(response.content[0].text),
          usage: {
            inputTokens: response.usage.input_tokens,
            outputTokens: response.usage.output_tokens,
            totalTokens: response.usage.input_tokens + response.usage.output_tokens
          }
        };

      case 'Google Gemini': {
        const text = response.candidates[0].content.parts[0].text;
        return {
          data: JSON.parse(text),
          usage: {
            inputTokens: response.usageMetadata?.promptTokenCount || 0,
            outputTokens: response.usageMetadata?.candidatesTokenCount || 0,
            totalTokens: response.usageMetadata?.totalTokenCount || 0
          }
        };
      }

      default:
        throw new Error(`Unknown provider: ${providerName}`);
    }
  }

  buildPrompt(template, variables) {
    let prompt = template;
    Object.keys(variables).forEach(key => {
      const value = variables[key] || '';
      prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value);
    });
    return prompt;
  }

  calculateCost(usage, provider) {
    const inputCost = (usage.inputTokens / 1000) * provider.costPer1kTokens.input;
    const outputCost = (usage.outputTokens / 1000) * provider.costPer1kTokens.output;
    return {
      inputCost,
      outputCost,
      totalCost: inputCost + outputCost,
      formattedCost: `$${(inputCost + outputCost).toFixed(4)}`
    };
  }

  async trackUsage({ provider, model, tokens, fieldType }) {
    // This would typically call your backend API to track usage
    try {
      await fetch('/api/usage/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          provider,
          model,
          tokens,
          fieldType,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to track usage:', error);
    }
  }

  async getUserUsage(userId) {
    try {
      const response = await fetch(`/api/usage/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to get user usage:', error);
      return null;
    }
  }

  async validateApiKey(provider, apiKey) {
    try {
      // Make a minimal API call to validate the key
      const response = await this.optimizeText({
        text: 'test',
        fieldType: 'job-title',
        provider,
        userApiKey: apiKey,
        context: { targetRole: 'test' }
      });
      return response.success;
    } catch (error) {
      return false;
    }
  }
}

export const aiService = new AIService();
export default aiService;