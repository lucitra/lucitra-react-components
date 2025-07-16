import { forwardRef } from 'react'
import { Text as MantineText } from '@mantine/core'
import PropTypes from 'prop-types'

const Text = forwardRef(({ 
  children,
  size = 'md',
  weight,
  align,
  color,
  variant,
  transform,
  decoration,
  lineClamp,
  truncate,
  italic,
  className,
  ...props 
}, ref) => {
  return (
    <MantineText
      ref={ref}
      size={size}
      fw={weight}
      ta={align}
      c={color}
      variant={variant}
      tt={transform}
      td={decoration}
      lineClamp={lineClamp}
      truncate={truncate}
      fs={italic ? 'italic' : undefined}
      className={className}
      {...props}
    >
      {children}
    </MantineText>
  )
})

Text.displayName = 'Text'

Text.propTypes = {
  children: PropTypes.node,
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
  variant: PropTypes.oneOf(['text', 'dimmed', 'gradient']),
  transform: PropTypes.oneOf(['none', 'capitalize', 'uppercase', 'lowercase']),
  decoration: PropTypes.oneOf(['none', 'underline', 'line-through']),
  lineClamp: PropTypes.number,
  truncate: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['end', 'start'])
  ]),
  italic: PropTypes.bool,
  className: PropTypes.string
}

export default Text