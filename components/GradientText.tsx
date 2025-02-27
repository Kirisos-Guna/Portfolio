"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export default function GradientText({
  children,
  className = '',
  from = 'from-purple-400',
  via = 'via-fuchsia-500',
  to = 'to-pink-600',
  animate = true,
}: GradientTextProps) {
  // Base classes for the gradient text
  const baseClasses = `font-bold bg-clip-text text-transparent bg-gradient-to-r ${from} ${via} ${to} ${className}`;
  
  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  if (animate) {
    return (
      <motion.span
        className={`${baseClasses} animate-gradient-x`}
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        {children}
      </motion.span>
    );
  }
  
  return <span className={baseClasses}>{children}</span>;
} 