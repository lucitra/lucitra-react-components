import React from 'react'
import PropTypes from 'prop-types'
import './Stack.css'

/**
 * Stack Component
 * 
 * A flexible layout component for arranging children in vertical or horizontal stacks
 * with consistent spacing, alignment, and wrapping options.
 * 
 * @component
 * @example
 * <Stack direction="column" gap="16px" align="center">
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 *   <Button>Button 3</Button>
 * </Stack>
 */
const Stack = ({
  children,
  direction = 'column',
  gap = '16px',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  divider,
  className = '',
  style = {},
  ...props
}) => {
  const stackClasses = [
    'stack',
    `stack--${direction}`,
    wrap !== 'nowrap' && `stack--wrap-${wrap}`,
    className
  ].filter(Boolean).join(' ')
  
  const stackStyles = {
    gap: divider ? 0 : gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    ...style
  }
  
  // Handle dividers between children
  const renderChildren = () => {
    if (!divider) {
      return children
    }
    
    const childArray = React.Children.toArray(children)
    const childrenWithDividers = []
    
    childArray.forEach((child, index) => {
      childrenWithDividers.push(child)
      
      // Add divider between children (not after the last one)
      if (index < childArray.length - 1) {
        childrenWithDividers.push(
          <div key={`divider-${index}`} className="stack-divider" style={{ margin: `0 ${gap}` }}>
            {divider}
          </div>
        )
      }
    })
    
    return childrenWithDividers
  }

  return (
    <div 
      className={stackClasses}
      style={stackStyles}
      {...props}
    >
      {renderChildren()}
    </div>
  )
}

Stack.propTypes = {
  /** Stack items */
  children: PropTypes.node,
  /** Direction of the stack */
  direction: PropTypes.oneOf(['column', 'row', 'column-reverse', 'row-reverse']),
  /** Gap between stack items */
  gap: PropTypes.string,
  /** Alignment of items along the cross axis */
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
  /** Justification of items along the main axis */
  justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
  /** Wrapping behavior */
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /** Divider element between stack items */
  divider: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object
}

export default Stack