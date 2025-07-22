import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AITextOptimizer from './AITextOptimizer.jsx';

/**
 * AI-Enhanced Text Input Component
 * 
 * Wraps any text input/textarea with AI optimization capabilities.
 * Shows AI button on hover/focus and provides context-aware optimizations.
 */

const AITextInput = ({
  value,
  onChange,
  fieldType = 'general',
  fieldName = '',
  context = {},
  userSubscription = 'free',
  remainingCredits = 3,
  onUpgrade,
  onCreditUsed,
  onVersionTrack,
  children,
  className = '',
  style = {},
  ...inputProps
}) => {
  const [showAI] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  const handleApplyOptimization = (optimizedText) => {
    onChange({ target: { value: optimizedText } });
  };

  const shouldShowAIButton = isHovered || isFocused || showAI;

  // If children are provided (custom input), wrap them
  if (children) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          ...style
        }}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {React.cloneElement(children, {
          ...inputProps,
          value,
          onChange,
          onFocus: (e) => {
            setIsFocused(true);
            children.props.onFocus?.(e);
          },
          onBlur: (e) => {
            setIsFocused(false);
            children.props.onBlur?.(e);
          }
        })}
        
        {shouldShowAIButton && value && value.trim() && (
          <AITextOptimizer
            originalText={value}
            onApplyOptimization={handleApplyOptimization}
            context={context}
            fieldType={fieldType}
            fieldName={fieldName}
            userSubscription={userSubscription}
            remainingCredits={remainingCredits}
            onUpgrade={onUpgrade}
            onCreditUsed={onCreditUsed}
            onVersionTrack={onVersionTrack}
          />
        )}
      </div>
    );
  }

  // Default input rendering
  const InputComponent = inputProps.rows ? 'textarea' : 'input';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        ...style
      }}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <InputComponent
        {...inputProps}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setIsFocused(true);
          inputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          inputProps.onBlur?.(e);
        }}
        style={{
          width: '100%',
          paddingRight: shouldShowAIButton && value && value.trim() ? '45px' : '12px',
          ...inputProps.style
        }}
      />
      
      {shouldShowAIButton && value && value.trim() && (
        <AITextOptimizer
          originalText={value}
          onApplyOptimization={handleApplyOptimization}
          context={context}
          fieldType={fieldType}
          fieldName={fieldName}
          userSubscription={userSubscription}
          remainingCredits={remainingCredits}
          onUpgrade={onUpgrade}
          onCreditUsed={onCreditUsed}
          onVersionTrack={onVersionTrack}
        />
      )}
    </div>
  );
};

AITextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldType: PropTypes.oneOf(['job-title', 'bullet-point', 'summary', 'skills', 'general']),
  fieldName: PropTypes.string,
  context: PropTypes.object,
  userSubscription: PropTypes.oneOf(['free', 'pro', 'enterprise']),
  remainingCredits: PropTypes.number,
  onUpgrade: PropTypes.func,
  onCreditUsed: PropTypes.func,
  onVersionTrack: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default AITextInput;