import { Container as MantineContainer } from '@mantine/core'
import PropTypes from 'prop-types'

function Container({ children, size = 'xl', px = 'md', className = '', style = {} }) {
  return (
    <MantineContainer
      size={size}
      px={px}
      className={className}
      style={style}
    >
      {children}
    </MantineContainer>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  px: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Container