import React from 'react'
import Navigation from '../../Navigation/Navigation'
import PropTypes from 'prop-types'

const Header = ({
  logo,
  navigation = [],
  actions = [],
  variant = 'solid',
  position = 'relative',
  ...props
}) => {
  return (
    <Navigation
      logo={logo}
      navigation={navigation}
      actions={actions}
      variant={variant}
      position={position}
      {...props}
    />
  )
}

Header.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
      key: PropTypes.string
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        href: PropTypes.string,
        onClick: PropTypes.func,
        key: PropTypes.string
      })
    ])
  ),
  variant: PropTypes.oneOf(['transparent', 'solid', 'blur']),
  position: PropTypes.oneOf(['absolute', 'sticky', 'relative'])
}

export default Header