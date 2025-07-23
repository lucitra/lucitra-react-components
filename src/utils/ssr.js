/**
 * SSR utilities for safe browser API access
 */

import React from 'react';

/**
 * Check if code is running in browser environment
 */
export const isBrowser = () => {
  return typeof window !== 'undefined' && 
         typeof document !== 'undefined' &&
         window.document === document;
};

/**
 * Check if code is running on server (SSR)
 */
export const isServer = () => !isBrowser();

/**
 * Safe window access
 */
export const safeWindow = () => {
  if (isBrowser()) {
    return window;
  }
  return undefined;
};

/**
 * Safe document access
 */
export const safeDocument = () => {
  if (isBrowser()) {
    return document;
  }
  return undefined;
};

/**
 * Safe localStorage access
 */
export const safeLocalStorage = () => {
  if (isBrowser() && window.localStorage) {
    return window.localStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  };
};

/**
 * Safe sessionStorage access
 */
export const safeSessionStorage = () => {
  if (isBrowser() && window.sessionStorage) {
    return window.sessionStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  };
};

/**
 * Get viewport dimensions safely
 */
export const getViewport = () => {
  if (isBrowser()) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  // Default dimensions for SSR
  return {
    width: 1024,
    height: 768
  };
};

/**
 * Add event listener safely
 */
export const addEventListener = (target, event, handler, options) => {
  if (isBrowser() && target && target.addEventListener) {
    target.addEventListener(event, handler, options);
    return () => target.removeEventListener(event, handler, options);
  }
  return () => {}; // No-op cleanup function
};

/**
 * Get document direction safely
 */
export const getDocumentDir = () => {
  const doc = safeDocument();
  if (doc) {
    return doc.dir || 'ltr';
  }
  return 'ltr';
};

/**
 * Set document direction safely
 */
export const setDocumentDir = (dir) => {
  const doc = safeDocument();
  if (doc) {
    doc.dir = dir;
  }
};

/**
 * Reload page safely
 */
export const reloadPage = () => {
  const win = safeWindow();
  if (win && win.location) {
    win.location.reload();
  }
};

/**
 * Open URL in new window safely
 */
export const openWindow = (url, target = '_blank', features) => {
  const win = safeWindow();
  if (win && win.open) {
    return win.open(url, target, features);
  }
  return null;
};

/**
 * Print page safely
 */
export const printPage = () => {
  const win = safeWindow();
  if (win && win.print) {
    win.print();
  }
};

/**
 * Hook to track if component is mounted (client-side only)
 */
export const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted;
};