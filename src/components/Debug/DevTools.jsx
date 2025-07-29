import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ActionIcon,
  Text,
  Button,
  Group,
  Stack,
  Divider,
  Transition,
  Tabs,
} from "@mantine/core";
import { IconRefresh, IconTrash, IconX, IconCode, IconPalette, IconInfoCircle } from "@tabler/icons-react";
import LucitraIcon from "../Icons/LucitraIcon.jsx";
import DesignTokensEditor from "./DesignTokensEditor.jsx";

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
  initialPosition = { side: "right", y: 450 },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [isHovered, setIsHovered] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState(initialPosition);
  const [hasDragged, setHasDragged] = useState(false);
  const widgetRef = useRef(null);

  // Check if we should show in current environment
  const isProduction =
    environment.mode === "production" || process.env.NODE_ENV === "production";

  // No page sliding - overlay style like Django Debug Toolbar
  useEffect(() => {
    return () => {
      // Cleanup any styles on unmount
    };
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!isDragging || typeof window === "undefined") return;

      const deltaY = e.clientY - dragStart.y;
      const deltaX = e.clientX - dragStart.x;
      
      // Check if mouse has moved significantly (more than 5px in any direction)
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setHasDragged(true);
      }

      const newY = Math.max(
        0,
        Math.min(window.innerHeight - 30, initialPos.y + deltaY)
      );

      // Determine which side based on mouse position
      const newSide = e.clientX < window.innerWidth / 2 ? "left" : "right";

      setPosition({ side: newSide, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Reset hasDragged after a short delay to prevent click interference
      setTimeout(() => setHasDragged(false), 100);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart.x, dragStart.y, initialPos.y]);

  if (isProduction && !showInProduction) {
    return null;
  }

  // Prepare package display info
  const packages = {
    [packageInfo.name || "App"]: packageInfo.version || "Unknown",
    ...(packageInfo.dependencies && {
      "@lucitra/react-components":
        packageInfo.dependencies["@lucitra/react-components"],
      React: packageInfo.dependencies.react,
      i18next: packageInfo.dependencies.i18next,
    }),
    ...(packageInfo.devDependencies && {
      Vite: packageInfo.devDependencies.vite,
      Tailwind: packageInfo.devDependencies.tailwindcss,
    }),
  };

  // Filter out undefined values
  const cleanPackages = Object.fromEntries(
    Object.entries(packages).filter(([_, version]) => version)
  );

  const defaultRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const defaultClearCache = () => {
    if (typeof window !== "undefined") {
      if ("caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }
  };

  // Handle tab dragging
  const handleTabMouseDown = (e) => {
    if (isOpen) return; // Don't drag when panel is open

    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
    });
    setInitialPos({
      side: position.side,
      y: position.y,
    });
    e.preventDefault();
    e.stopPropagation();
  };


  const handleTabClick = () => {
    // Only open if we haven't dragged
    if (!hasDragged) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Floating Tab - Hidden when menu is open */}
      {!isOpen && (
        <div
          ref={widgetRef}
          onMouseDown={handleTabMouseDown}
          onClick={handleTabClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "fixed",
            [position.side]: "0px",
            top: `${position.y}px`,
            cursor: isDragging ? "grabbing" : "grab",
            transition: isDragging
              ? "none"
              : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 10001,
            width: isHovered ? "80px" : "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            borderRadius:
              position.side === "right" ? "20px 0 0 20px" : "0 20px 20px 0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          }}
          aria-label="Dev Tools"
          role="button"
          tabIndex={0}
        >
          <LucitraIcon size={40} />
        </div>
      )}

      {/* Content Panel - Semitransparent overlay like Django Debug Toolbar */}
      <Transition
        mounted={isOpen}
        transition={position.side === "right" ? "slide-left" : "slide-right"}
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <div
            style={{
              ...styles,
              position: "fixed",
              [position.side]: "0px",
              top: "0px",
              height: "100vh",
              width: "320px",
              zIndex: 10000,
              overflow: "hidden",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              borderLeft:
                position.side === "right"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "none",
              borderRight:
                position.side === "left"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "none",
            }}
          >
            {/* Header */}
            <Group
              justify="space-between"
              p="md"
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Group gap="xs">
                <IconCode size={20} color="#fff" />
                <Text fw={600} size="sm" c="white">
                  Dev Tools
                </Text>
                <Text size="xs" c="white" opacity={0.7}>
                  v{packageInfo.version || "0.0.0"}
                </Text>
              </Group>
              <ActionIcon
                variant="subtle"
                c="white"
                size="sm"
                onClick={() => setIsOpen(false)}
                style={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <IconX size={16} />
              </ActionIcon>
            </Group>

            {/* Content */}
            <Tabs
              defaultValue="info"
              style={{
                height: "calc(100vh - 60px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Tabs.List
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Tabs.Tab
                  value="info"
                  leftSection={<IconInfoCircle size={16} />}
                  style={{ color: "white" }}
                >
                  Info
                </Tabs.Tab>
                <Tabs.Tab
                  value="tokens"
                  leftSection={<IconPalette size={16} />}
                  style={{ color: "white" }}
                >
                  Design Tokens
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="info" style={{ flex: 1, overflow: "auto" }}>
                <Stack
                  p="md"
                  gap="md"
                  style={{
                    height: "100%",
                    overflowY: "auto",
                    color: "white",
                  }}
                >
                  {Object.keys(cleanPackages).length > 0 && (
                    <>
                      <div>
                        <Text fw={600} size="sm" c="white" opacity={0.9} mb="xs">
                          Package Versions:
                        </Text>
                        <Stack gap="xs">
                          {Object.entries(cleanPackages).map(([name, version]) => (
                            <Group key={name} justify="space-between">
                              <Text size="xs" c="white" opacity={0.7}>
                                {name}:
                              </Text>
                              <Text size="xs" ff="monospace" c="#4FC3F7" ta="right">
                                {version}
                              </Text>
                            </Group>
                          ))}
                        </Stack>
                      </div>
                      <Divider color="rgba(255, 255, 255, 0.1)" />
                    </>
                  )}

                  <div>
                    <Text fw={600} size="sm" c="white" opacity={0.9} mb="xs">
                      Environment:
                    </Text>
                    <Stack gap="xs">
                      {environment.mode && (
                        <Group justify="space-between">
                          <Text size="xs" c="white" opacity={0.7}>
                            Mode:
                          </Text>
                          <Text size="xs" ff="monospace" c="#81C784">
                            {environment.mode}
                          </Text>
                        </Group>
                      )}
                      {environment.baseUrl && (
                        <Group justify="space-between">
                          <Text size="xs" c="white" opacity={0.7}>
                            Base URL:
                          </Text>
                          <Text size="xs" ff="monospace" c="#81C784">
                            {environment.baseUrl}
                          </Text>
                        </Group>
                      )}
                      <Group justify="space-between">
                        <Text size="xs" c="white" opacity={0.7}>
                          Position:
                        </Text>
                        <Text size="xs" ff="monospace" c="#CE93D8" tt="capitalize">
                          {position.side}, {Math.round(position.y)}
                        </Text>
                      </Group>
                    </Stack>
                  </div>

                  <Divider color="rgba(255, 255, 255, 0.1)" />

                  <Stack gap="xs">
                    <Button
                      leftSection={<IconRefresh size={14} />}
                      onClick={onRefresh || defaultRefresh}
                      variant="light"
                      color="gray"
                      size="sm"
                      fullWidth
                      styles={{
                        root: {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "white",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                          },
                        },
                      }}
                    >
                      Refresh Page
                    </Button>
                    <Button
                      leftSection={<IconTrash size={14} />}
                      onClick={onClearCache || defaultClearCache}
                      variant="light"
                      color="gray"
                      size="sm"
                      fullWidth
                      styles={{
                        root: {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "white",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                          },
                        },
                      }}
                    >
                      Clear Cache & Reload
                    </Button>
                  </Stack>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel
                value="tokens"
                style={{
                  flex: 1,
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    color: "var(--color-text-primary)",
                  }}
                >
                  <DesignTokensEditor />
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        )}
      </Transition>
    </>
  );
};

DevTools.propTypes = {
  /** Package information object containing name, version, dependencies, etc. */
  packageInfo: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.string,
    dependencies: PropTypes.object,
    devDependencies: PropTypes.object,
  }),
  /** Environment information object */
  environment: PropTypes.shape({
    mode: PropTypes.string,
    baseUrl: PropTypes.string,
  }),
  /** Custom refresh handler */
  onRefresh: PropTypes.func,
  /** Custom cache clearing handler */
  onClearCache: PropTypes.func,
  /** Whether to show in production builds */
  showInProduction: PropTypes.bool,
  /** Initial position of the widget */
  initialPosition: PropTypes.shape({
    side: PropTypes.oneOf(["left", "right"]),
    y: PropTypes.number,
  }),
};

export default DevTools;
