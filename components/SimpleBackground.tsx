'use client';

import React from 'react';

export default function SimpleBackground() {
  return (
    <div className="fixed inset-0 -z-10" style={{ 
      top: 'env(safe-area-inset-top, 0px)',
      right: 'env(safe-area-inset-right, 0px)',
      bottom: 'env(safe-area-inset-bottom, 0px)',
      left: 'env(safe-area-inset-left, 0px)',
      height: 'calc(100vh + env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px))',
      width: 'calc(100vw + env(safe-area-inset-left, 0px) + env(safe-area-inset-right, 0px))',
      margin: 'calc(-1 * env(safe-area-inset-top, 0px)) calc(-1 * env(safe-area-inset-right, 0px)) calc(-1 * env(safe-area-inset-bottom, 0px)) calc(-1 * env(safe-area-inset-left, 0px))'
    }}>
      <div className="absolute inset-0 bg-[#13071D]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-[#13071D]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-purple-900/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-900/20 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      {/* Status bar overlay for mobile */}
      <div 
        className="absolute top-0 left-0 right-0 z-50 bg-[#13071D]" 
        style={{ 
          height: 'env(safe-area-inset-top, 0px)'
        }}
      ></div>
    </div>
  );
} 