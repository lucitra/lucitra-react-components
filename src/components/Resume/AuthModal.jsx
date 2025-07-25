import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AuthModal = ({ 
  isOpen, 
  onClose, 
  onAuth,
  initialMode = 'signin'
}) => {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  if (!isOpen) return null;
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (mode === 'signup' && !name) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAuth({
        mode,
        email,
        name: mode === 'signup' ? name : undefined,
        // In real implementation, never send password in plain text
      });
      setIsLoading(false);
      onClose();
    }, 1500);
  };
  
  return (
    <>
      <style jsx>{`
        .auth-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10002;
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .auth-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 450px;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .auth-header {
          padding: 32px 32px 0;
          text-align: center;
        }
        
        .auth-logo {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .auth-title {
          font-size: 28px;
          font-weight: bold;
          margin: 0 0 8px 0;
          color: #333;
        }
        
        .auth-subtitle {
          font-size: 16px;
          color: #666;
          margin: 0;
        }
        
        .auth-content {
          padding: 32px;
        }
        
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
        
        .form-input {
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s;
          outline: none;
        }
        
        .form-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .form-input.error {
          border-color: #f44336;
        }
        
        .error-message {
          font-size: 13px;
          color: #f44336;
          margin-top: -4px;
        }
        
        .auth-button {
          padding: 14px 24px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }
        
        .auth-button:hover:not(:disabled) {
          background: #5a67d8;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .auth-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .social-auth {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e0e0e0;
        }
        
        .social-title {
          text-align: center;
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
        }
        
        .social-buttons {
          display: flex;
          gap: 12px;
        }
        
        .social-button {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          transition: all 0.2s;
        }
        
        .social-button:hover {
          border-color: #667eea;
          background: #f8f9ff;
        }
        
        .social-icon {
          font-size: 20px;
        }
        
        .auth-footer {
          padding: 20px 32px;
          background: #f8f9fa;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        
        .switch-mode {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .switch-mode:hover {
          color: #5a67d8;
          text-decoration: underline;
        }
        
        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #666;
          border-radius: 50%;
          transition: all 0.2s;
        }
        
        .close-button:hover {
          background: #f0f0f0;
          color: #333;
        }
        
        .benefits-list {
          margin-top: 20px;
          padding: 16px;
          background: #f0f8ff;
          border-radius: 8px;
          font-size: 14px;
        }
        
        .benefit-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #555;
        }
        
        .benefit-item:last-child {
          margin-bottom: 0;
        }
        
        .benefit-icon {
          color: #667eea;
          flex-shrink: 0;
        }
      `}</style>
      
      <div className="auth-modal" onClick={onClose}>
        <div className="auth-container" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
          
          <div className="auth-header">
            <div className="auth-logo">📄</div>
            <h2 className="auth-title">
              {mode === 'signin' ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p className="auth-subtitle">
              {mode === 'signin' 
                ? 'Sign in to access your saved resumes' 
                : 'Start building professional resumes today'}
            </p>
          </div>
          
          <div className="auth-content">
            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
              
              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading 
                  ? 'Loading...' 
                  : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <div className="social-auth">
              <div className="social-title">Or continue with</div>
              <div className="social-buttons">
                <button className="social-button" onClick={() => console.log('Google auth')}>
                  <span className="social-icon">🔍</span>
                  Google
                </button>
                <button className="social-button" onClick={() => console.log('LinkedIn auth')}>
                  <span className="social-icon">💼</span>
                  LinkedIn
                </button>
              </div>
            </div>
            
            {mode === 'signup' && (
              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Save and manage multiple resumes</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Download without watermarks</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>AI-powered optimization</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Version history and tracking</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="auth-footer">
            {mode === 'signin' ? (
              <>
                Don&apos;t have an account?{' '}
                <span 
                  className="switch-mode"
                  onClick={() => setMode('signup')}
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span 
                  className="switch-mode"
                  onClick={() => setMode('signin')}
                >
                  Sign in
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAuth: PropTypes.func.isRequired,
  initialMode: PropTypes.oneOf(['signin', 'signup'])
};

export default AuthModal;