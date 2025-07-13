import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ActionIcon, Paper, Text, Button, Group, Stack, Divider, Tooltip } from '@mantine/core'
import { IconRefresh, IconTrash, IconX, IconGripVertical } from '@tabler/icons-react'
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
  
  useEffect(() => {
    if (!isDragging) return
    
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
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart.y, initialPos.y])
  
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

  const handleTabClick = () => {
    if (!isDragging) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <>
      {/* Floating Tab - Always visible */}
      <Tooltip label="Dev Tools - Click to open, drag to move" position="left">
        <ActionIcon
          ref={widgetRef}
          onMouseDown={handleTabMouseDown}
          onClick={handleTabClick}
          size="lg"
          radius="xl"
          variant="filled"
          color="gray"
          style={{
            position: 'fixed',
            [position.side]: '0px',
            top: `${position.y}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' : 'all 0.2s ease',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          <LucitraIcon size={24} />
        </ActionIcon>
      </Tooltip>

      {/* Content Panel - Only visible when open */}
      {isOpen && (
        <Paper
          shadow="xl"
          radius="md"
          p={0}
          style={{
            position: 'fixed',
            [position.side]: '60px',
            top: `${Math.min(position.y, (typeof window !== 'undefined' ? window.innerHeight : 800) - 400)}px`,
            transition: isDragging ? 'none' : 'all 0.2s ease',
            width: '320px',
            maxHeight: '400px',
            zIndex: 9998,
            overflow: 'hidden'
          }}
        >
          {/* Header with drag handle */}
          <Group
            justify="space-between"
            p="md"
            bg="blue.6"
            c="white"
            style={{ cursor: 'move' }}
            onMouseDown={handlePanelMouseDown}
          >
            <Group gap="xs">
              <Text fw={600} size="sm">Dev Tools</Text>
              <Text size="xs" opacity={0.8}>v{packageInfo.version || '0.0.0'}</Text>
            </Group>
            <Group gap="xs">
              <IconGripVertical size={16} opacity={0.7} />
              <ActionIcon
                variant="transparent"
                c="white"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
              >
                <IconX size={16} />
              </ActionIcon>
            </Group>
          </Group>
          
          {/* Content */}
          <Stack p="md" gap="md" style={{ maxHeight: '320px', overflowY: 'auto' }}>
            {Object.keys(cleanPackages).length > 0 && (
              <>
                <div>
                  <Text fw={600} size="sm" c="dimmed" mb="xs">Package Versions:</Text>
                  <Stack gap="xs">
                    {Object.entries(cleanPackages).map(([name, version]) => (
                      <Group key={name} justify="space-between">
                        <Text size="xs" c="dimmed">{name}:</Text>
                        <Text size="xs" ff="monospace" c="blue.6" ta="right">{version}</Text>
                      </Group>
                    ))}
                  </Stack>
                </div>
                <Divider />
              </>
            )}

            <div>
              <Text fw={600} size="sm" c="dimmed" mb="xs">Environment:</Text>
              <Stack gap="xs">
                {environment.mode && (
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">Mode:</Text>
                    <Text size="xs" ff="monospace" c="green.6">{environment.mode}</Text>
                  </Group>
                )}
                {environment.baseUrl && (
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">Base URL:</Text>
                    <Text size="xs" ff="monospace" c="green.6">{environment.baseUrl}</Text>
                  </Group>
                )}
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Position:</Text>
                  <Text size="xs" ff="monospace" c="violet.6" tt="capitalize">{position.side}, {Math.round(position.y)}</Text>
                </Group>
              </Stack>
            </div>

            <Divider />

            <Stack gap="xs">
              <Button
                leftSection={<IconRefresh size={14} />}
                onClick={onRefresh || defaultRefresh}
                color="green"
                variant="filled"
                size="sm"
                fullWidth
              >
                Refresh Page
              </Button>
              <Button
                leftSection={<IconTrash size={14} />}
                onClick={onClearCache || defaultClearCache}
                color="orange"
                variant="filled"
                size="sm"
                fullWidth
              >
                Clear Cache & Reload
              </Button>
            </Stack>
          </Stack>
        </Paper>
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