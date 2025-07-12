import PropTypes from 'prop-types'

/**
 * Lucitra Brand Icon Component
 * 
 * A scalable SVG icon representing the Lucitra brand logo with white elements on a black background.
 * Features the characteristic circles and connecting arrow that make up the Lucitra visual identity.
 * 
 * @component
 * @example
 * // Basic usage
 * <LucitraIcon />
 * 
 * @example
 * // Custom size and styling
 * <LucitraIcon size={32} className="hover:opacity-80" />
 */
const LucitraIcon = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 512 512" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Lucitra Logo"
  >
    <defs>
      <linearGradient id="lucitra-gradient" x1="248.28" y1="208.18" x2="357.44" y2="208.18" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff"/>
        <stop offset="1" stopColor="#000"/>
      </linearGradient>
    </defs>
    <g>
      {/* Black background */}
      <rect width="512" height="512" fill="#000000"/>
      {/* Main circle */}
      <path 
        d="M172.06,260.82c43.09,0,78.15,35.06,78.15,78.15s-35.06,78.15-78.15,78.15-78.15-35.06-78.15-78.15,35.06-78.15,78.15-78.15M172.06,229.95c-60.21,0-109.03,48.81-109.03,109.03s48.81,109.03,109.03,109.03,109.03-48.81,109.03-109.03-48.81-109.03-109.03-109.03h0Z" 
        fill="#fff"
      />
      {/* Small circle */}
      <path 
        d="M395.9,87.16c16.49,0,29.91,13.42,29.91,29.91s-13.42,29.91-29.91,29.91-29.91-13.42-29.91-29.91,13.42-29.91,29.91-29.91M395.9,64c-29.31,0-53.07,23.76-53.07,53.07s23.76,53.07,53.07,53.07,53.07-23.76,53.07-53.07-23.76-53.07-53.07-53.07h0Z" 
        fill="#fff"
      />
      {/* Connecting line and arrow */}
      <g>
        <line 
          x1="248.28" 
          y1="262.75" 
          x2="357.44" 
          y2="153.6" 
          fill="url(#lucitra-gradient)"
        />
        <g>
          <line 
            x1="248.28" 
            y1="262.75" 
            x2="332.49" 
            y2="178.55" 
            fill="none" 
            stroke="#fff" 
            strokeMiterlimit="10" 
            strokeWidth="30.87"
          />
          <polygon 
            points="326.01 259.04 326.03 185 251.99 185.02 283.42 153.6 357.44 153.6 357.44 227.62 326.01 259.04" 
            fill="#fff"
          />
        </g>
      </g>
    </g>
  </svg>
)

LucitraIcon.propTypes = {
  /** Size of the icon in pixels */
  size: PropTypes.number,
  /** Additional CSS classes to apply */
  className: PropTypes.string
}

export default LucitraIcon