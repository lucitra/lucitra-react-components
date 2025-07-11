import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for smart dropdown positioning with LTR/RTL directional consistency
 * @param {React.RefObject} triggerRef - Reference to the trigger element
 * @param {React.RefObject} dropdownRef - Reference to the dropdown element
 * @param {boolean} isOpen - Whether the dropdown is open
 * @param {string} preferredPlacement - Preferred placement (e.g., 'bottom-right')
 * @param {boolean} prioritizeDirection - Whether to prioritize LTR/RTL direction over space (default: true)
 * @returns {object} Positioning styles and calculated placement
 */
export const useSmartPositioning = (triggerRef, dropdownRef, isOpen, preferredPlacement = 'bottom-right', prioritizeDirection = true) => {
  const [positioning, setPositioning] = useState({
    styles: {},
    placement: preferredPlacement
  })

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !dropdownRef.current || !isOpen) {
      return
    }

    const trigger = triggerRef.current
    const dropdown = dropdownRef.current
    const triggerRect = trigger.getBoundingClientRect()
    const dropdownRect = dropdown.getBoundingClientRect()
    
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const isRtl = document.documentElement.dir === 'rtl'
    const margin = 8 // 8px margin from screen edges

    // Parse preferred placement
    const [preferredVertical, preferredHorizontal] = preferredPlacement.split('-')
    
    // Calculate available space in each direction
    const spaceAbove = triggerRect.top
    const spaceBelow = viewport.height - triggerRect.bottom
    const spaceLeft = triggerRect.left
    const spaceRight = viewport.width - triggerRect.right

    // Determine vertical position
    let vertical = preferredVertical
    if (preferredVertical === 'bottom' && spaceBelow < dropdownRect.height + margin) {
      if (spaceAbove > dropdownRect.height + margin) {
        vertical = 'top'
      }
    } else if (preferredVertical === 'top' && spaceAbove < dropdownRect.height + margin) {
      if (spaceBelow > dropdownRect.height + margin) {
        vertical = 'bottom'
      }
    }

    // Determine horizontal position based on LTR/RTL priority
    let horizontal = preferredHorizontal

    if (prioritizeDirection) {
      // Prioritize directional consistency - LTR opens right, RTL opens left
      if (!isRtl) {
        // LTR: prefer right, only switch to left if absolutely no space
        horizontal = 'right'
        if (spaceRight < dropdownRect.width + margin && spaceRight < 100) {
          horizontal = 'left'
        }
      } else {
        // RTL: prefer left, only switch to right if absolutely no space  
        horizontal = 'left'
        if (spaceLeft < dropdownRect.width + margin && spaceLeft < 100) {
          horizontal = 'right'
        }
      }
    } else {
      // Original logic - prioritize available space
      if (!isRtl) {
        if (preferredHorizontal === 'right' && spaceRight < dropdownRect.width + margin) {
          if (spaceLeft > dropdownRect.width + margin) {
            horizontal = 'left'
          }
        } else if (preferredHorizontal === 'left' && spaceLeft < dropdownRect.width + margin) {
          if (spaceRight > dropdownRect.width + margin) {
            horizontal = 'right'
          }
        }
      } else {
        if (preferredHorizontal === 'left' && spaceLeft < dropdownRect.width + margin) {
          if (spaceRight > dropdownRect.width + margin) {
            horizontal = 'right'
          }
        } else if (preferredHorizontal === 'right' && spaceRight < dropdownRect.width + margin) {
          if (spaceLeft > dropdownRect.width + margin) {
            horizontal = 'left'
          }
        }
      }
    }

    // Generate styles based on calculated position
    const styles = {
      position: 'absolute',
      zIndex: 50,
      top: vertical === 'top' ? 'auto' : '100%',
      bottom: vertical === 'top' ? '100%' : 'auto',
      left: horizontal === 'left' ? '0' : 'auto',
      right: horizontal === 'right' ? '0' : 'auto',
      marginTop: vertical === 'bottom' ? '0.25rem' : '0',
      marginBottom: vertical === 'top' ? '0.25rem' : '0',
      // Ensure dropdown doesn't overflow screen edges
      maxWidth: `${Math.min(dropdownRect.width, viewport.width - margin * 2)}px`,
      maxHeight: `${Math.min(dropdownRect.height, viewport.height - margin * 2)}px`
    }

    // Handle edge cases where dropdown might still overflow
    // Allow some overflow if prioritizing direction, otherwise adjust
    if (prioritizeDirection) {
      // Allow up to 50px of overflow to maintain directional consistency
      const maxOverflow = 50
      
      if (horizontal === 'right' && triggerRect.right + dropdownRect.width > viewport.width + maxOverflow) {
        styles.right = '0'
        styles.left = 'auto'
      } else if (horizontal === 'left' && triggerRect.left - dropdownRect.width < -maxOverflow) {
        styles.left = '0'
        styles.right = 'auto'
      }
      
      // Ensure dropdown doesn't go completely off-screen
      if (horizontal === 'right') {
        styles.maxWidth = `${Math.min(dropdownRect.width, viewport.width - triggerRect.left)}px`
      } else if (horizontal === 'left') {
        styles.maxWidth = `${Math.min(dropdownRect.width, triggerRect.right)}px`
      }
    } else {
      // Strict boundary enforcement
      if (horizontal === 'right' && triggerRect.right + dropdownRect.width > viewport.width - margin) {
        styles.right = '0'
        styles.left = 'auto'
      } else if (horizontal === 'left' && triggerRect.left - dropdownRect.width < margin) {
        styles.left = '0'
        styles.right = 'auto'
      }
    }

    const finalPlacement = `${vertical}-${horizontal}`
    
    setPositioning({
      styles,
      placement: finalPlacement
    })
  }, [triggerRef, dropdownRef, isOpen, preferredPlacement, prioritizeDirection])

  // Recalculate position when dropdown opens or window resizes
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure dropdown is rendered
      const timer = setTimeout(calculatePosition, 10)
      return () => clearTimeout(timer)
    }
  }, [isOpen, calculatePosition])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('resize', calculatePosition)
      window.addEventListener('scroll', calculatePosition)
      
      return () => {
        window.removeEventListener('resize', calculatePosition)
        window.removeEventListener('scroll', calculatePosition)
      }
    }
  }, [isOpen, calculatePosition])

  return positioning
}