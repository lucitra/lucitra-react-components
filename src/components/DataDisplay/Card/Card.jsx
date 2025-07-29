import { forwardRef } from 'react'
import { Card as MantineCard } from '@mantine/core'
import PropTypes from 'prop-types'

const Card = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <MantineCard
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </MantineCard>
  )
})

Card.displayName = 'Card'

// Compound components
Card.Section = forwardRef(({ children, ...props }, ref) => (
  <MantineCard.Section ref={ref} {...props}>
    {children}
  </MantineCard.Section>
))
Card.Section.displayName = 'Card.Section'

Card.Header = forwardRef(({ children, ...props }, ref) => (
  <Card.Section ref={ref} {...props}>
    {children}
  </Card.Section>
))
Card.Header.displayName = 'Card.Header'

Card.Body = forwardRef(({ children, padding = 'md', ...props }, ref) => (
  <Card.Section ref={ref} p={padding} {...props}>
    {children}
  </Card.Section>
))
Card.Body.displayName = 'Card.Body'

Card.Footer = forwardRef(({ children, ...props }, ref) => (
  <Card.Section ref={ref} withBorder {...props}>
    {children}
  </Card.Section>
))
Card.Footer.displayName = 'Card.Footer'

Card.Title = forwardRef(({ children, order = 3, ...props }, ref) => {
  const Component = `h${order}`
  return (
    <Component 
      ref={ref} 
      style={{ margin: 0, fontWeight: 'var(--typography-lg-semibold-font-weight)', fontSize: order === 3 ? 'var(--typography-lg-semibold-font-size)' : 'var(--typography-md-semibold-font-size)' }} 
      {...props}
    >
      {children}
    </Component>
  )
})
Card.Title.displayName = 'Card.Title'

Card.Meta = forwardRef(({ children, ...props }, ref) => (
  <span 
    ref={ref} 
    style={{ fontSize: 'var(--typography-sm-regular-font-size)', color: 'var(--color-content-Tertiary)' }} 
    {...props}
  >
    {children}
  </span>
))
Card.Meta.displayName = 'Card.Meta'

Card.Actions = forwardRef(({ children, ...props }, ref) => (
  <div 
    ref={ref} 
    style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }} 
    {...props}
  >
    {children}
  </div>
))
Card.Actions.displayName = 'Card.Actions'

// PropTypes
Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  shadow: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withBorder: PropTypes.bool
}

Card.Section.propTypes = {
  children: PropTypes.node,
  withBorder: PropTypes.bool,
  inheritPadding: PropTypes.bool
}

Card.Header.propTypes = {
  children: PropTypes.node
}

Card.Body.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Card.Footer.propTypes = {
  children: PropTypes.node
}

Card.Title.propTypes = {
  children: PropTypes.node,
  order: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
}

Card.Meta.propTypes = {
  children: PropTypes.node
}

Card.Actions.propTypes = {
  children: PropTypes.node
}

export default Card