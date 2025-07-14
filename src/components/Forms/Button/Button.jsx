import { Button as MantineButton } from '@mantine/core'
import PropTypes from 'prop-types'

function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  const mantineVariant = variant === 'primary' ? 'filled' : variant === 'secondary' ? 'outline' : variant
  
  return (
    <MantineButton
      onClick={onClick}
      variant={mantineVariant}
      className={className}
      {...props}
    >
      {children}
    </MantineButton>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'filled', 'outline', 'subtle', 'light', 'gradient']),
  className: PropTypes.string,
}

export default Button