import { forwardRef } from 'react'
import { Title } from '@mantine/core'
import PropTypes from 'prop-types'

const Heading = forwardRef(({ 
  children, 
  level = 2,
  size,
  weight = 600,
  align = 'left',
  color,
  className,
  ...props 
}, ref) => {
  return (
    <Title
      ref={ref}
      order={level}
      size={size}
      fw={weight}
      ta={align}
      c={color}
      className={className}
      {...props}
    >
      {children}
    </Title>
  )
})

Heading.displayName = 'Heading'

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.string
  ]),
  weight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  color: PropTypes.string,
  className: PropTypes.string
}

export default Heading