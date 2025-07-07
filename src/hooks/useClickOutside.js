import { useEffect, useRef } from 'react'

/**
 * Custom hook for handling click outside events
 * @param {Function} handler - Function to call when clicking outside
 * @param {boolean} enabled - Whether the hook is enabled
 * @returns {Object} - Ref object to attach to the element
 */
export const useClickOutside = (handler, enabled = true) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [handler, enabled])

  return ref
}