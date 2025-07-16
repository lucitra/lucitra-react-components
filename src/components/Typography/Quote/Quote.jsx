import { forwardRef } from 'react'
import { Blockquote } from '@mantine/core'
import PropTypes from 'prop-types'

const Quote = forwardRef(({ 
  children,
  cite,
  icon,
  color = 'blue',
  radius,
  iconSize = 48,
  className,
  ...props 
}, ref) => {
  return (
    <Blockquote
      ref={ref}
      cite={cite}
      icon={icon}
      color={color}
      radius={radius}
      iconSize={iconSize}
      className={className}
      {...props}
    >
      {children}
    </Blockquote>
  )
})

Quote.displayName = 'Quote'

Quote.propTypes = {
  children: PropTypes.node.isRequired,
  cite: PropTypes.node,
  icon: PropTypes.node,
  color: PropTypes.string,
  radius: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.string,
    PropTypes.number
  ]),
  iconSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string
}

export default Quote