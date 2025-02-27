"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  direction?: 'up' | 'down' | 'scale' | 'rotate';
  className?: string;
  animateOpacity?: boolean;
  delay?: number;
}

export default function ParallaxEffect({
  children,
  offset = 50,
  direction = 'up',
  className = '',
  animateOpacity = true,
  delay = 0
}: ParallaxProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Only enable parallax on client side and if user doesn't prefer reduced motion
  const shouldUseParallax = mounted && !prefersReducedMotion;

  const { scrollY } = useScroll();

  // Calculate the element's position relative to the viewport
  useEffect(() => {
    if (!ref.current) return;
    
    const setValues = () => {
      setElementTop(ref.current?.offsetTop ?? 0);
      setClientHeight(window.innerHeight);
    };
    
    setValues();
    setMounted(true);
    
    window.addEventListener('resize', setValues);
    return () => window.removeEventListener('resize', setValues);
  }, [ref]);

  // Calculate the range of the parallax effect
  const initial = elementTop - clientHeight;
  const final = elementTop + (ref.current?.offsetHeight ?? 0);

  // Create transform values based on direction
  const yTransform = useTransform(
    scrollY,
    [initial, final],
    direction === 'up' && shouldUseParallax ? [offset, -offset] :
    direction === 'down' && shouldUseParallax ? [-offset, offset] : [0, 0]
  );

  const scaleTransform = useTransform(
    scrollY,
    [initial, final],
    direction === 'scale' && shouldUseParallax ? [0.8, 1.0] : [1, 1]
  );

  const rotateTransform = useTransform(
    scrollY,
    [initial, final],
    direction === 'rotate' && shouldUseParallax ? [offset / 10, -offset / 10] : [0, 0]
  );

  // Apply spring physics for smoother movement
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springY = useSpring(yTransform, springConfig);
  const springScale = useSpring(scaleTransform, springConfig);
  const springRotate = useSpring(rotateTransform, springConfig);

  // Create opacity transform if animateOpacity is true
  const opacityValue = useTransform(
    scrollY,
    [initial, initial + 200, final - 200, final],
    animateOpacity && shouldUseParallax ? [0, 1, 1, 0] : [1, 1, 1, 1]
  );

  const springOpacity = useSpring(opacityValue, springConfig);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: springY,
        scale: springScale,
        rotate: springRotate,
        opacity: springOpacity,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for different parallax effects
export function ParallaxUp(props: Omit<ParallaxProps, 'direction'>) {
  return <ParallaxEffect direction="up" {...props} />;
}

export function ParallaxDown(props: Omit<ParallaxProps, 'direction'>) {
  return <ParallaxEffect direction="down" {...props} />;
}

export function ParallaxScale(props: Omit<ParallaxProps, 'direction'>) {
  return <ParallaxEffect direction="scale" {...props} />;
}

export function ParallaxRotate(props: Omit<ParallaxProps, 'direction'>) {
  return <ParallaxEffect direction="rotate" {...props} />;
} 