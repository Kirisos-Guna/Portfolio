"use client";

import { motion } from 'framer-motion';
import GradientText from './GradientText';
import { ReactNode, useEffect, useState } from 'react';
import React from 'react';
import dynamic from 'next/dynamic';
import { ParallaxUp, ParallaxDown } from './ParallaxEffect';

// Glow effect component
interface GlowEffectProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const GlowEffect = ({ 
  children, 
  className = "", 
  color = "from-indigo-500 via-purple-500 to-pink-500",
  intensity = 'medium'
}: GlowEffectProps) => {
  const opacityMap = {
    low: "opacity-20",
    medium: "opacity-30",
    high: "opacity-40"
  };
  
  const blurMap = {
    low: "blur-lg",
    medium: "blur-xl",
    high: "blur-2xl"
  };
  
  return (
    <div className={`relative ${className}`}>
      <motion.div 
        className={`absolute inset-0 ${blurMap[intensity]} ${opacityMap[intensity]} bg-gradient-to-r ${color} rounded-full`}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface CosmicParticleProps {
  delay: number;
  duration: number;
  x: number;
  y: number;
  color: 'white' | 'blue' | 'purple' | 'pink';
  travelX?: number;
  travelY?: number;
}

const CosmicParticle = ({ delay, duration, x, y, color, travelX = 100, travelY = 50 }: CosmicParticleProps) => {
  // Calculate angle for the particle to travel
  const angle = Math.atan2(travelY, travelX) * (180 / Math.PI);
  
  return (
    <div 
      className={`cosmic-particle ${color}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        '--travel-x': `${travelX}px`,
        '--travel-y': `${travelY}px`,
        animation: `cosmic-particle ${duration}s ease-in-out ${delay}s infinite`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'center',
      } as React.CSSProperties}
    >
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transformOrigin: 'left center',
          transform: 'translateY(-50%)',
          animation: `cosmic-trail ${duration}s ease-in-out ${delay + duration * 0.1}s infinite`,
        }}
      />
    </div>
  );
};

// TwinklingStar component
const TwinklingStar = ({ 
  size = 'small', 
  x, 
  y, 
  delay = 0 
}: { 
  size?: 'small' | 'medium' | 'large'; 
  x: number; 
  y: number; 
  delay?: number;
}) => {
  // Use useState and useEffect to generate random duration only on the client side
  const [duration, setDuration] = React.useState(3); // Default value
  
  // Generate random duration only on client-side
  useEffect(() => {
    setDuration(Math.random() * 3 + 2); // Random duration between 2-5s
  }, []);
  
  return (
    <motion.div
      className={`star ${size}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// StarField component
const StarField = () => {
  const [twinklingStars, setTwinklingStars] = useState<Array<{ size: 'small' | 'medium' | 'large'; x: number; y: number; delay: number }>>([]);
  
  useEffect(() => {
    // Generate random positions for twinkling stars
    const stars = Array.from({ length: 50 }, () => ({
      size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    
    setTwinklingStars(stars);
  }, []);
  
  // Define cosmic particles with various colors, positions, and travel directions
  const cosmicParticles = [
    // White particles - diagonal movements
    { delay: 1, duration: 6, x: 10, y: 20, color: 'white' as const, travelX: 150, travelY: 80 },
    { delay: 8, duration: 7, x: 80, y: 15, color: 'white' as const, travelX: -120, travelY: 60 },
    { delay: 15, duration: 5, x: 40, y: 70, color: 'white' as const, travelX: 100, travelY: -70 },
    
    // Blue particles - horizontal movements
    { delay: 3, duration: 6, x: 30, y: 40, color: 'blue' as const, travelX: 200, travelY: 0 },
    { delay: 12, duration: 8, x: 70, y: 60, color: 'blue' as const, travelX: -180, travelY: 0 },
    { delay: 18, duration: 4, x: 20, y: 85, color: 'blue' as const, travelX: 150, travelY: 0 },
    
    // Purple particles - vertical movements
    { delay: 5, duration: 7, x: 60, y: 30, color: 'purple' as const, travelX: 0, travelY: 120 },
    { delay: 14, duration: 6, x: 25, y: 50, color: 'purple' as const, travelX: 0, travelY: -100 },
    { delay: 20, duration: 5, x: 85, y: 75, color: 'purple' as const, travelX: 0, travelY: 80 },
    
    // Pink particles - diagonal movements
    { delay: 2, duration: 5, x: 50, y: 25, color: 'pink' as const, travelX: -120, travelY: -60 },
    { delay: 10, duration: 7, x: 15, y: 65, color: 'pink' as const, travelX: 100, travelY: -50 },
    { delay: 16, duration: 8, x: 75, y: 35, color: 'pink' as const, travelX: -80, travelY: 100 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle space background animation */}
      <div className="space-bg-animation"></div>
      
      {/* Twinkling stars */}
      {twinklingStars.map((star, index) => (
        <TwinklingStar key={index} size={star.size} x={star.x} y={star.y} delay={star.delay} />
      ))}
      
      {/* Cosmic particles */}
      {cosmicParticles.map((particle, index) => (
        <CosmicParticle 
          key={index}
          delay={particle.delay}
          duration={particle.duration}
          x={particle.x}
          y={particle.y}
          color={particle.color}
          travelX={particle.travelX}
          travelY={particle.travelY}
        />
      ))}
    </div>
  );
};

// Client-side only StarField component
const StarFieldClient = dynamic(() => Promise.resolve(StarField), {
  ssr: false,
});

// Typing animation component for the name
const TypedName = ({ name = "Kirisos Guna" }: { name?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  // Typing and deleting effect
  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (isTyping && !isDeleting) {
        // Typing forward
        if (currentIndex <= name.length) {
          setDisplayedText(name.substring(0, currentIndex));
          currentIndex++;
        } else {
          // Pause at the end before deleting
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsDeleting(true);
            setIsTyping(true);
          }, 2000); // Wait 2 seconds before starting to delete
        }
      } else if (isDeleting) {
        // Deleting
        if (currentIndex > 0) {
          currentIndex--;
          setDisplayedText(name.substring(0, currentIndex));
        } else {
          // Pause before restarting
          setIsDeleting(false);
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(true);
          }, 500); // Wait half a second before restarting
        }
      }
    }, isDeleting ? 75 : 150); // Faster when deleting
    
    return () => clearInterval(typingInterval);
  }, [name, isTyping, isDeleting]);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  return (
    <span className="inline-block">
      <GradientText
        from="from-purple-400"
        via="via-fuchsia-500"
        to="to-pink-600"
        className="inline-block"
      >
        {displayedText}
        <span 
          className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-1 font-normal`}
          style={{ color: 'white' }}
        >
          |
        </span>
      </GradientText>
    </span>
  );
};

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20" style={{
      paddingTop: 'calc(env(safe-area-inset-top, 0px) + 5rem)',
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)',
      paddingLeft: 'env(safe-area-inset-left, 0px)',
      paddingRight: 'env(safe-area-inset-right, 0px)'
    }}>
      <StarFieldClient />
      
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ParallaxDown offset={30}>
          <motion.div variants={itemVariants}>
            <GlowEffect 
              className="mb-6" 
              color="from-indigo-600 via-purple-600 to-pink-600"
              intensity="high"
            >
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                Hi, I&apos;m{' '}
                <TypedName />
              </h1>
            </GlowEffect>
          </motion.div>
        </ParallaxDown>

        <ParallaxUp offset={20}>
          <motion.div variants={itemVariants}>
            <GlowEffect 
              className="mb-8" 
              color="from-purple-600 via-fuchsia-600 to-pink-600"
              intensity="medium"
            >
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl tracking-tight">
                <GradientText
                  from="from-purple-400"
                  via="via-fuchsia-400"
                  to="to-pink-500"
                  className="font-medium"
                >
                  Full Stack Developer
                </GradientText>
              </h2>
            </GlowEffect>
          </motion.div>
        </ParallaxUp>

        <ParallaxUp offset={10} delay={0.2}>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            I create beautiful, responsive, and user-friendly web applications
            with modern technologies and best practices.
          </motion.p>
        </ParallaxUp>

        <ParallaxUp offset={15} delay={0.4}>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div variants={buttonVariants} whileHover="hover">
              <a
                href="#projects"
                className="font-heading inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 tracking-wide"
              >
                View My Work
              </a>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover">
              <a
                href="#contact"
                className="font-heading inline-block px-8 py-3 bg-transparent border-2 border-purple-400/20 text-white hover:border-purple-400/40 font-medium rounded-full transition-all duration-300 hover:shadow-lg tracking-wide"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>
        </ParallaxUp>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-purple-300/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 