import React from 'react'
import PropTypes from 'prop-types'
import './Grid.css'

/**
 * Grid Component
 * 
 * A flexible CSS Grid layout component that provides responsive grid layouts
 * with customizable columns, gaps, and alignment options.
 * 
 * @component
 * @example
 * <Grid columns={3} gap="16px">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 */
const Grid = ({
  children,
  columns = 'auto',
  rows = 'auto',
  gap = '16px',
  columnGap,
  rowGap,
  alignItems = 'stretch',
  justifyItems = 'stretch',
  alignContent = 'start',
  justifyContent = 'start',
  autoFlow = 'row',
  autoColumns = 'auto',
  autoRows = 'auto',
  templateAreas,
  className = '',
  style = {},
  ...props
}) => {
  // Handle responsive columns
  const getGridTemplateColumns = () => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`
    }
    if (typeof columns === 'object') {
      // Responsive columns object like { xs: 1, sm: 2, md: 3, lg: 4 }
      return 'var(--grid-columns, 1fr)'
    }
    return columns
  }
  
  const getGridTemplateRows = () => {
    if (typeof rows === 'number') {
      return `repeat(${rows}, auto)`
    }
    return rows
  }
  
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: getGridTemplateColumns(),
    gridTemplateRows: getGridTemplateRows(),
    gap: columnGap || rowGap ? undefined : gap,
    columnGap: columnGap,
    rowGap: rowGap,
    alignItems,
    justifyItems,
    alignContent,
    justifyContent,
    gridAutoFlow: autoFlow,
    gridAutoColumns: autoColumns,
    gridAutoRows: autoRows,
    gridTemplateAreas: templateAreas,
    ...style
  }
  
  const gridClasses = [
    'grid',
    typeof columns === 'object' && 'grid--responsive',
    className
  ].filter(Boolean).join(' ')
  
  // Handle responsive columns with CSS custom properties
  const responsiveStyles = typeof columns === 'object' ? {
    '--grid-columns-xs': columns.xs ? `repeat(${columns.xs}, 1fr)` : '1fr',
    '--grid-columns-sm': columns.sm ? `repeat(${columns.sm}, 1fr)` : `repeat(${columns.xs || 1}, 1fr)`,
    '--grid-columns-md': columns.md ? `repeat(${columns.md}, 1fr)` : `repeat(${columns.sm || columns.xs || 1}, 1fr)`,
    '--grid-columns-lg': columns.lg ? `repeat(${columns.lg}, 1fr)` : `repeat(${columns.md || columns.sm || columns.xs || 1}, 1fr)`,
    '--grid-columns-xl': columns.xl ? `repeat(${columns.xl}, 1fr)` : `repeat(${columns.lg || columns.md || columns.sm || columns.xs || 1}, 1fr)`
  } : {}

  return (
    <div 
      className={gridClasses}
      style={{ ...gridStyles, ...responsiveStyles }}
      {...props}
    >
      {children}
    </div>
  )
}

Grid.propTypes = {
  /** Grid items */
  children: PropTypes.node,
  /** Number of columns or grid template columns string, or responsive object */
  columns: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number
    })
  ]),
  /** Number of rows or grid template rows string */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Gap between grid items */
  gap: PropTypes.string,
  /** Column gap (overrides gap for columns) */
  columnGap: PropTypes.string,
  /** Row gap (overrides gap for rows) */
  rowGap: PropTypes.string,
  /** Align items within their grid cells */
  alignItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  /** Justify items within their grid cells */
  justifyItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  /** Align grid content within the container */
  alignContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']),
  /** Justify grid content within the container */
  justifyContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']),
  /** Grid auto flow direction */
  autoFlow: PropTypes.oneOf(['row', 'column', 'row dense', 'column dense']),
  /** Auto column sizing */
  autoColumns: PropTypes.string,
  /** Auto row sizing */
  autoRows: PropTypes.string,
  /** Grid template areas */
  templateAreas: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object
}

export default Grid