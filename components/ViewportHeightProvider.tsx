'use client';

import React, { useEffect } from 'react';

interface ViewportHeightProviderProps {
  children: React.ReactNode;
}

export default function ViewportHeightProvider({ children }: ViewportHeightProviderProps) {
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
  
  // Simply render children
  return <>{children}</>;
} 