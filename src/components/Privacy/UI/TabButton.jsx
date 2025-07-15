/**
 * TabButton Component
 * 
 * Consistent tab navigation styling
 * Replaces inline styled tab buttons across components
 */

import React from 'react'
import PropTypes from 'prop-types'

export const TabButton = ({ 
  active = false,
  disabled = false,
  icon = null,
  children,
  onClick,
  className,
  ...rest 
}) => {
  const getTabStyles = () => {
    const baseStyles = {
      backgroundColor: active ? 'black' : 'white',
      color: active ? 'white' : 'black',
      border: active ? '2px solid black' : '1px solid gray',
      padding: '8px 16px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: icon ? '8px' : '0',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s ease',
      borderBottom: active ? '2px solid blue' : 'none'
    }

    return baseStyles
  }

  return (
    <button
      style={{
        ...getTabStyles(),
        ...rest.style
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {icon && (
        <span style={{ 
          color: active ? 'white' : 'black',
          display: 'flex',
          alignItems: 'center'
        }}>
          {icon}
        </span>
      )}
      {children}
    </button>
  )
}

TabButton.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}

TabButton.displayName = 'TabButton'

export default TabButton