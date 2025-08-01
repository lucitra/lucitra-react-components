import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-based animations
 * Provides intersection observer functionality with animation states
 */
export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  delay = 0,
} = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        if (inView && !hasAnimated) {
          setTimeout(() => {
            setIsInView(true);
            if (triggerOnce) {
              setHasAnimated(true);
            }
          }, delay);
        } else if (!triggerOnce && !inView) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  return {
    ref,
    isInView,
    hasAnimated,
  };
};

/**
 * Hook for parallax scroll effects
 */
export const useParallax = ({
  speed = 0.5,
  offset = 0,
} = {}) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = (scrolled - rect.top + offset) * speed;
      
      setTransform(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, offset]);

  return {
    ref,
    transform,
  };
};

/**
 * Hook for scroll progress tracking
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setProgress(Math.min(currentProgress, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
};

/**
 * Hook for sticky scroll effects
 */
export const useStickyScroll = ({
  start = 0,
  end = 1000,
} = {}) => {
  const ref = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      if (scrolled >= start && scrolled <= end) {
        setIsSticky(true);
        const stickyProgress = (scrolled - start) / (end - start);
        setProgress(Math.min(Math.max(stickyProgress, 0), 1));
      } else {
        setIsSticky(false);
        setProgress(scrolled > end ? 1 : 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [start, end]);

  return {
    ref,
    isSticky,
    progress,
  };
};