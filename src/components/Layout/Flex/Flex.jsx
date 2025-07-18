import React from 'react'
import PropTypes from 'prop-types'
import './Flex.css'

/**
 * Flex Component
 * 
 * A comprehensive flexbox layout component with full control over flex properties.
 * Provides more granular control than Stack for complex layouts.
 * 
 * @component
 * @example
 * <Flex direction="row" justify="space-between" align="center" gap="8px">
 *   <div>Left content</div>
 *   <div>Right content</div>
 * </Flex>
 */
const Flex = ({
  children,
  direction = 'row',
  wrap = 'nowrap',
  justify = 'flex-start',
  align = 'stretch',
  alignContent = 'stretch',
  gap,
  rowGap,
  columnGap,
  grow = false,
  shrink = false,
  basis = 'auto',
  inline = false,
  className = '',
  style = {},
  ...props
}) => {
  const flexClasses = [
    'flex',
    inline && 'flex--inline',
    grow && 'flex--grow',
    shrink && 'flex--shrink',
    className
  ].filter(Boolean).join(' ')
  
  const flexStyles = {
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems: align,
    alignContent: alignContent,
    gap: columnGap || rowGap ? undefined : gap,
    columnGap,
    rowGap,
    flexBasis: basis,
    ...style
  }

  return (
    <div 
      className={flexClasses}
      style={flexStyles}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * FlexItem Component
 * 
 * A component for individual flex items with specific flex properties.
 */
export const FlexItem = ({
  children,
  grow = 0,
  shrink = 1,
  basis = 'auto',
  align = 'auto',
  order = 0,
  className = '',
  style = {},
  ...props
}) => {
  const flexItemClasses = [
    'flex-item',
    className
  ].filter(Boolean).join(' ')
  
  const flexItemStyles = {
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    alignSelf: align,
    order,
    ...style
  }

  return (
    <div 
      className={flexItemClasses}
      style={flexItemStyles}
      {...props}
    >
      {children}
    </div>
  )
}

Flex.propTypes = {
  /** Flex items */
  children: PropTypes.node,
  /** Flex direction */
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  /** Flex wrap */
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /** Justify content (main axis) */
  justify: PropTypes.oneOf([
    'flex-start', 'flex-end', 'center', 'space-between', 
    'space-around', 'space-evenly', 'start', 'end'
  ]),
  /** Align items (cross axis) */
  align: PropTypes.oneOf([
    'stretch', 'flex-start', 'flex-end', 'center', 
    'baseline', 'start', 'end'
  ]),
  /** Align content (wrapped lines) */
  alignContent: PropTypes.oneOf([
    'stretch', 'flex-start', 'flex-end', 'center', 
    'space-between', 'space-around', 'space-evenly'
  ]),
  /** Gap between items */
  gap: PropTypes.string,
  /** Gap between rows */
  rowGap: PropTypes.string,
  /** Gap between columns */
  columnGap: PropTypes.string,
  /** Flex grow */
  grow: PropTypes.bool,
  /** Flex shrink */
  shrink: PropTypes.bool,
  /** Flex basis */
  basis: PropTypes.string,
  /** Use inline-flex instead of flex */
  inline: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object
}

FlexItem.propTypes = {
  /** Flex item content */
  children: PropTypes.node,
  /** Flex grow value */
  grow: PropTypes.number,
  /** Flex shrink value */
  shrink: PropTypes.number,
  /** Flex basis value */
  basis: PropTypes.string,
  /** Align self */
  align: PropTypes.oneOf([
    'auto', 'stretch', 'flex-start', 'flex-end', 
    'center', 'baseline', 'start', 'end'
  ]),
  /** Order */
  order: PropTypes.number,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object
}

export default Flex