import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import LucitraIcon from '../Icons/LucitraIcon.jsx'

/**
 * DevTools Component
 * 
 * A development-only floating widget that provides quick access to package versions,
 * environment information, and common development actions like refresh and cache clearing.
 * Features a draggable Lucitra-branded icon that can be positioned anywhere along the screen edges.
 * 
 * @component
 * @example
 * // Basic usage with package.json info
 * import packageJson from '../package.json'
 * 
 * <DevTools 
 *   packageInfo={{
 *     name: packageJson.name,
 *     version: packageJson.version,
 *     dependencies: packageJson.dependencies,
 *     devDependencies: packageJson.devDependencies
 *   }}
 *   environment={{
 *     mode: import.meta.env.MODE,
 *     baseUrl: import.meta.env.BASE_URL
 *   }}
 * />
 * 
 * @example
 * // With custom refresh and cache clearing
 * <DevTools 
 *   packageInfo={packageInfo}
 *   environment={envInfo}
 *   onRefresh={() => window.location.reload()}
 *   onClearCache={() => {
 *     localStorage.clear()
 *     sessionStorage.clear()
 *     window.location.reload()
 *   }}
 * />
 */
const DevTools = ({
  packageInfo = {},
  environment = {},
  onRefresh,
  onClearCache,
  showInProduction = false,
  initialPosition = { side: 'right', y: 450 }
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState(initialPosition)
  
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [initialPos, setInitialPos] = useState(initialPosition)
  const widgetRef = useRef(null)
  
  // Check if we should show in current environment
  const isProduction = environment.mode === 'production' || process.env.NODE_ENV === 'production'
  if (isProduction && !showInProduction) {
    return null
  }

  // Prepare package display info
  const packages = {
    [packageInfo.name || 'App']: packageInfo.version || 'Unknown',
    ...(packageInfo.dependencies && {
      '@lucitra/react-components': packageInfo.dependencies['@lucitra/react-components'],
      'React': packageInfo.dependencies.react,
      'i18next': packageInfo.dependencies.i18next
    }),
    ...(packageInfo.devDependencies && {
      'Vite': packageInfo.devDependencies.vite,
      'Tailwind': packageInfo.devDependencies.tailwindcss
    })
  }

  // Filter out undefined values
  const cleanPackages = Object.fromEntries(
    Object.entries(packages).filter(([_, version]) => version)
  )

  const defaultRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  const defaultClearCache = () => {
    if (typeof window !== 'undefined') {
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name))
        })
      }
      localStorage.clear()
      sessionStorage.clear()
      window.location.reload()
    }
  }

  // Handle tab dragging
  const handleTabMouseDown = (e) => {
    if (isOpen) return // Don't drag when panel is open
    
    setIsDragging(true)
    setDragStart({
      x: e.clientX,
      y: e.clientY
    })
    setInitialPos({
      side: position.side,
      y: position.y
    })
    e.preventDefault()
    e.stopPropagation()
  }

  // Handle panel dragging (when open)
  const handlePanelMouseDown = (e) => {
    if (!isOpen) return
    
    setIsDragging(true)
    setDragStart({
      x: e.clientX,
      y: e.clientY
    })
    setInitialPos({
      side: position.side,
      y: position.y
    })
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging || typeof window === 'undefined') return

    const deltaY = e.clientY - dragStart.y
    const newY = Math.max(0, Math.min(window.innerHeight - 30, initialPos.y + deltaY))
    
    // Determine which side based on mouse position
    const newSide = e.clientX < window.innerWidth / 2 ? 'left' : 'right'
    
    setPosition({ side: newSide, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart, initialPos])

  const handleTabClick = (e) => {
    if (!isDragging) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <>
      {/* Floating Tab - Always visible */}
      <button
        ref={widgetRef}
        onMouseDown={handleTabMouseDown}
        onClick={handleTabClick}
        className={`fixed bg-transparent hover:opacity-80 shadow-lg transition-all duration-200 select-none z-[9999] py-4 px-3 ${
          position.side === 'left' ? 'rounded-r-xl' : 'rounded-l-xl'
        }`}
        style={{
          position: 'fixed',
          [position.side]: '0px',
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
          transition: isDragging ? 'none' : 'all 0.2s ease',
          backgroundColor: '#000000',
          zIndex: 9999
        }}
        title="Dev Tools - Click to open, drag to move"
      >
        <LucitraIcon size={28} />
      </button>

      {/* Content Panel - Only visible when open */}
      {isOpen && (
        <div
          className="fixed bg-white border border-gray-300 rounded-lg shadow-xl w-80 max-h-96 overflow-hidden select-none z-[9998]"
          style={{
            [position.side]: '45px',
            top: `${Math.min(position.y, (typeof window !== 'undefined' ? window.innerHeight : 800) - 400)}px`,
            transition: isDragging ? 'none' : 'all 0.2s ease'
          }}
        >
          {/* Header with drag handle */}
          <div 
            className="bg-blue-600 text-white p-4 cursor-move flex justify-between items-center"
            onMouseDown={handlePanelMouseDown}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Dev Tools</span>
              <span className="text-xs opacity-75">v{packageInfo.version || '0.0.0'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-75">⇅</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                className="text-white hover:text-gray-200 text-lg leading-none"
                title="Close"
              >
                ×
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-5 max-h-80 overflow-y-auto">
            {Object.keys(cleanPackages).length > 0 && (
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-sm text-gray-700">Package Versions:</h4>
                <div className="space-y-2">
                  {Object.entries(cleanPackages).map(([name, version]) => (
                    <div key={name} className="flex justify-between text-xs py-1">
                      <span className="text-gray-600">{name}:</span>
                      <span className="font-mono text-blue-600 text-right ml-3">{version}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-sm text-gray-700">Environment:</h4>
              <div className="space-y-2">
                {environment.mode && (
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-gray-600">Mode:</span>
                    <span className="font-mono text-green-600">{environment.mode}</span>
                  </div>
                )}
                {environment.baseUrl && (
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-gray-600">Base URL:</span>
                    <span className="font-mono text-green-600">{environment.baseUrl}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs py-1">
                  <span className="text-gray-600">Position:</span>
                  <span className="font-mono text-purple-600 capitalize">{position.side}, {Math.round(position.y)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onRefresh || defaultRefresh}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded text-sm transition-colors font-medium"
              >
                🔄 Refresh Page
              </button>
              <button
                onClick={onClearCache || defaultClearCache}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded text-sm transition-colors font-medium"
              >
                🧹 Clear Cache & Reload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

DevTools.propTypes = {
  /** Package information object containing name, version, dependencies, etc. */
  packageInfo: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.string,
    dependencies: PropTypes.object,
    devDependencies: PropTypes.object
  }),
  /** Environment information object */
  environment: PropTypes.shape({
    mode: PropTypes.string,
    baseUrl: PropTypes.string
  }),
  /** Custom refresh handler */
  onRefresh: PropTypes.func,
  /** Custom cache clearing handler */
  onClearCache: PropTypes.func,
  /** Whether to show in production builds */
  showInProduction: PropTypes.bool,
  /** Initial position of the widget */
  initialPosition: PropTypes.shape({
    side: PropTypes.oneOf(['left', 'right']),
    y: PropTypes.number
  })
}

export default DevTools