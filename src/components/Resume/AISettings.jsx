import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { aiService } from '../../services/aiService';

const AISettings = ({ 
  userId,
  currentSettings = {},
  onSettingsChange,
  onClose 
}) => {
  const [settings, setSettings] = useState({
    provider: currentSettings.provider || 'openai',
    model: currentSettings.model || null,
    useOwnKey: currentSettings.useOwnKey || false,
    apiKey: currentSettings.apiKey || '',
    temperature: currentSettings.temperature || 0.7,
    autoSuggestions: currentSettings.autoSuggestions || true,
    suggestOnFocus: currentSettings.suggestOnFocus || false,
    bulkOptimization: currentSettings.bulkOptimization || false,
    customPrompts: currentSettings.customPrompts || [],
    preferredStyle: currentSettings.preferredStyle || 'professional'
  });

  const [usage, setUsage] = useState(null);
  const [keyValid, setKeyValid] = useState(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    loadUserUsage();
  }, [userId, loadUserUsage]);

  const loadUserUsage = useCallback(async () => {
    const userUsage = await aiService.getUserUsage(userId);
    setUsage(userUsage);
  }, [userId]);

  const handleProviderChange = (provider) => {
    setSettings(prev => ({
      ...prev,
      provider,
      model: null // Reset model when provider changes
    }));
  };

  const testApiKey = async () => {
    setTesting(true);
    const isValid = await aiService.validateApiKey(settings.provider, settings.apiKey);
    setKeyValid(isValid);
    setTesting(false);
  };

  const saveSettings = () => {
    onSettingsChange(settings);
    // Save to backend
    fetch(`/api/users/${userId}/ai-settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(settings)
    });
  };

  const addCustomPrompt = () => {
    setSettings(prev => ({
      ...prev,
      customPrompts: [
        ...prev.customPrompts,
        {
          id: Date.now(),
          name: 'New Prompt',
          template: '',
          fieldTypes: []
        }
      ]
    }));
  };

  return (
    <div className="ai-settings-modal">
      <style jsx>{`
        .ai-settings-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .settings-content {
          background: white;
          border-radius: 8px;
          padding: 32px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .settings-title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          color: #666;
          cursor: pointer;
          padding: 4px;
        }

        .close-button:hover {
          color: #333;
        }

        .usage-banner {
          background: #f0f4f8;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .usage-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 12px;
        }

        .usage-stat {
          text-align: center;
        }

        .usage-number {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .usage-label {
          font-size: 12px;
          color: #666;
        }

        .settings-section {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e0e0e0;
        }

        .settings-section:last-child {
          border-bottom: none;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 16px;
        }

        .provider-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .provider-card {
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
        }

        .provider-card:hover {
          border-color: #666;
        }

        .provider-card.selected {
          border-color: #333;
          background: #f8f9fa;
        }

        .provider-name {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .provider-info {
          font-size: 12px;
          color: #666;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-weight: 500;
          margin-bottom: 8px;
          color: #495057;
        }

        .form-control {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 14px;
        }

        .form-control:focus {
          outline: none;
          border-color: #666;
          box-shadow: 0 0 0 2px rgba(102, 102, 102, 0.25);
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .api-key-group {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .api-key-input {
          flex: 1;
        }

        .test-button {
          padding: 8px 16px;
          background: #666;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .test-button:hover {
          background: #555;
        }

        .test-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .validation-message {
          margin-top: 8px;
          font-size: 13px;
          padding: 8px;
          border-radius: 4px;
        }

        .validation-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .validation-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .style-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .style-option {
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .style-option:hover {
          border-color: #666;
        }

        .style-option.selected {
          border-color: #333;
          background: #f8f9fa;
        }

        .style-name {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .style-description {
          font-size: 12px;
          color: #666;
        }

        .custom-prompts {
          margin-top: 16px;
        }

        .prompt-item {
          background: #f8f9fa;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
        }

        .prompt-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .delete-prompt {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          font-size: 14px;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 32px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #333;
          color: white;
        }

        .btn-primary:hover {
          background: #222;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background: #545b62;
        }

        .slider {
          width: 100%;
          margin: 8px 0;
        }

        .slider-value {
          text-align: center;
          font-size: 14px;
          color: #666;
          margin-top: 4px;
        }

        .upgrade-prompt {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          padding: 12px;
          border-radius: 8px;
          margin-top: 12px;
          font-size: 13px;
        }

        .upgrade-link {
          color: #533f03;
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>

      <div className="settings-content">
        <div className="settings-header">
          <h2 className="settings-title">AI Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {usage && (
          <div className="usage-banner">
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
              Your Usage This Month
            </div>
            <div className="usage-stats">
              <div className="usage-stat">
                <div className="usage-number">{usage.creditsUsed}</div>
                <div className="usage-label">Credits Used</div>
              </div>
              <div className="usage-stat">
                <div className="usage-number">{usage.creditsRemaining}</div>
                <div className="usage-label">Credits Remaining</div>
              </div>
              <div className="usage-stat">
                <div className="usage-number">${usage.estimatedCost.toFixed(2)}</div>
                <div className="usage-label">Estimated Cost</div>
              </div>
            </div>
          </div>
        )}

        <div className="settings-section">
          <h3 className="section-title">AI Provider</h3>
          <div className="provider-grid">
            {Object.entries(aiService.providers).map(([key, provider]) => (
              <div
                key={key}
                className={`provider-card ${settings.provider === key ? 'selected' : ''}`}
                onClick={() => handleProviderChange(key)}
              >
                <div className="provider-name">{provider.name}</div>
                <div className="provider-info">
                  ${provider.costPer1kTokens.input}/1k tokens
                </div>
              </div>
            ))}
          </div>

          {settings.provider && (
            <div className="form-group">
              <label className="form-label">Model</label>
              <select
                className="form-control"
                value={settings.model || aiService.providers[settings.provider].defaultModel}
                onChange={(e) => setSettings(prev => ({ ...prev, model: e.target.value }))}
              >
                {aiService.providers[settings.provider].models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="settings-section">
          <h3 className="section-title">API Configuration</h3>
          
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="useOwnKey"
              checked={settings.useOwnKey}
              onChange={(e) => setSettings(prev => ({ ...prev, useOwnKey: e.target.checked }))}
            />
            <label htmlFor="useOwnKey">Use my own API key (no credit limits)</label>
          </div>

          {settings.useOwnKey && (
            <>
              <div className="api-key-group">
                <div className="form-group api-key-input">
                  <label className="form-label">API Key</label>
                  <input
                    type="password"
                    className="form-control"
                    value={settings.apiKey}
                    onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                    placeholder={`Enter your ${aiService.providers[settings.provider].name} API key`}
                  />
                </div>
                <button
                  className="test-button"
                  onClick={testApiKey}
                  disabled={!settings.apiKey || testing}
                >
                  {testing ? 'Testing...' : 'Test Key'}
                </button>
              </div>
              
              {keyValid !== null && (
                <div className={`validation-message ${keyValid ? 'success' : 'error'}`}>
                  {keyValid ? '✓ API key is valid' : '✗ Invalid API key'}
                </div>
              )}
            </>
          )}
        </div>

        <div className="settings-section">
          <h3 className="section-title">Optimization Settings</h3>
          
          <div className="form-group">
            <label className="form-label">Temperature (Creativity)</label>
            <input
              type="range"
              className="slider"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
            />
            <div className="slider-value">{settings.temperature}</div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="autoSuggestions"
              checked={settings.autoSuggestions}
              onChange={(e) => setSettings(prev => ({ ...prev, autoSuggestions: e.target.checked }))}
            />
            <label htmlFor="autoSuggestions">Show AI suggestions automatically</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="suggestOnFocus"
              checked={settings.suggestOnFocus}
              onChange={(e) => setSettings(prev => ({ ...prev, suggestOnFocus: e.target.checked }))}
            />
            <label htmlFor="suggestOnFocus">Suggest when field is focused</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="bulkOptimization"
              checked={settings.bulkOptimization}
              onChange={(e) => setSettings(prev => ({ ...prev, bulkOptimization: e.target.checked }))}
            />
            <label htmlFor="bulkOptimization">Enable bulk optimization</label>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="section-title">Writing Style</h3>
          <div className="style-options">
            <div
              className={`style-option ${settings.preferredStyle === 'professional' ? 'selected' : ''}`}
              onClick={() => setSettings(prev => ({ ...prev, preferredStyle: 'professional' }))}
            >
              <div className="style-name">Professional</div>
              <div className="style-description">Formal, achievement-focused</div>
            </div>
            <div
              className={`style-option ${settings.preferredStyle === 'creative' ? 'selected' : ''}`}
              onClick={() => setSettings(prev => ({ ...prev, preferredStyle: 'creative' }))}
            >
              <div className="style-name">Creative</div>
              <div className="style-description">Engaging, story-driven</div>
            </div>
            <div
              className={`style-option ${settings.preferredStyle === 'technical' ? 'selected' : ''}`}
              onClick={() => setSettings(prev => ({ ...prev, preferredStyle: 'technical' }))}
            >
              <div className="style-name">Technical</div>
              <div className="style-description">Detailed, metrics-heavy</div>
            </div>
            <div
              className={`style-option ${settings.preferredStyle === 'executive' ? 'selected' : ''}`}
              onClick={() => setSettings(prev => ({ ...prev, preferredStyle: 'executive' }))}
            >
              <div className="style-name">Executive</div>
              <div className="style-description">Strategic, leadership-focused</div>
            </div>
          </div>
        </div>

        {usage && usage.tier === 'professional' && (
          <div className="settings-section">
            <h3 className="section-title">Custom Prompts</h3>
            <div className="custom-prompts">
              {settings.customPrompts.map((prompt, index) => (
                <div key={prompt.id} className="prompt-item">
                  <div className="prompt-header">
                    <input
                      type="text"
                      className="form-control"
                      value={prompt.name}
                      onChange={(e) => {
                        const updated = [...settings.customPrompts];
                        updated[index].name = e.target.value;
                        setSettings(prev => ({ ...prev, customPrompts: updated }));
                      }}
                      placeholder="Prompt name"
                    />
                    <button
                      className="delete-prompt"
                      onClick={() => {
                        const filtered = settings.customPrompts.filter(p => p.id !== prompt.id);
                        setSettings(prev => ({ ...prev, customPrompts: filtered }));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={prompt.template}
                    onChange={(e) => {
                      const updated = [...settings.customPrompts];
                      updated[index].template = e.target.value;
                      setSettings(prev => ({ ...prev, customPrompts: updated }));
                    }}
                    placeholder="Enter your custom prompt template..."
                  />
                </div>
              ))}
              <button className="btn btn-secondary" onClick={addCustomPrompt}>
                + Add Custom Prompt
              </button>
            </div>
            
            {(!usage || usage.tier === 'free' || usage.tier === 'starter') && (
              <div className="upgrade-prompt">
                Custom prompts are available in Professional and Enterprise plans. 
                <span className="upgrade-link" onClick={() => window.location.href = '/pricing'}>
                  {' '}Upgrade now
                </span>
              </div>
            )}
          </div>
        )}

        <div className="actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={saveSettings}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

AISettings.propTypes = {
  userId: PropTypes.string.isRequired,
  currentSettings: PropTypes.object,
  onSettingsChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AISettings;