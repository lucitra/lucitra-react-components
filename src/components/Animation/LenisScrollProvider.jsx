import React, { useEffect, useRef, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// Lenis context for sharing the instance
const LenisContext = createContext(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    console.warn('useLenis must be used within LenisScrollProvider');
  }
  return context;
};

/**
 * Provider component for Lenis smooth scroll
 * This creates a smooth scrolling experience similar to the referenced websites
 */
export const LenisScrollProvider = ({
  children,
  options = {},
}) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        
        // Initialize Lenis with custom options
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
          ...options,
        });

        // Animation frame loop
        const raf = (time) => {
          lenisRef.current?.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);

        // Make lenis accessible globally for debugging
        if (typeof window !== 'undefined') {
          window.lenis = lenisRef.current;
        }
      } catch (error) {
        console.error('Failed to initialize Lenis:', error);
      }
    };

    initLenis();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, [options]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};

LenisScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.shape({
    duration: PropTypes.number,
    easing: PropTypes.func,
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    gestureDirection: PropTypes.oneOf(['vertical', 'horizontal', 'both']),
    smooth: PropTypes.bool,
    mouseMultiplier: PropTypes.number,
    smoothTouch: PropTypes.bool,
    touchMultiplier: PropTypes.number,
    infinite: PropTypes.bool,
  }),
};