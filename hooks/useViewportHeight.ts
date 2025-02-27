'use client';

import { useEffect } from 'react';

/**
 * Custom hook to handle viewport height issues on mobile devices
 * This fixes the issue with 100vh not accounting for mobile browser UI elements
 */
export default function useViewportHeight() {
  useEffect(() => {
    // Function to update CSS variable with the actual viewport height
    const updateViewportHeight = () => {
      // Set a CSS variable with the inner height of the window
      document.documentElement.style.setProperty(
        '--vh', 
        `${window.innerHeight * 0.01}px`
      );
    };

    // Initial call
    updateViewportHeight();

    // Update on resize and orientation change
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);
} 