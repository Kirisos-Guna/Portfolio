"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import React from 'react';

const navItems = [
  { name: 'Home', href: '#home', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  ) },
  { name: 'About', href: '#about', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  ) },
  { name: 'Projects', href: '#projects', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
  ) },
  { name: 'Skills', href: '#skills', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
    </svg>
  ) },
  { name: 'Contact', href: '#contact', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  ) },
];

// Hamburger Menu Button Component
const HamburgerButton = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
  <button
    onClick={toggle}
    className="relative z-50 flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    <span 
      className={`block h-0.5 w-5 rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 ${
        isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
      }`}
    />
    <span 
      className={`block h-0.5 w-5 rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}
    />
    <span 
      className={`block h-0.5 w-5 rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 ${
        isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
      }`}
    />
  </button>
);

// Mobile Menu Component
const MobileMenu = ({ 
  isOpen, 
  activeItem, 
  handleNavClick, 
  closeMenu 
}: { 
  isOpen: boolean; 
  activeItem: string; 
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, name: string) => void;
  closeMenu: () => void;
}) => {
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    handleNavClick(e, name);
    closeMenu();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#13071D]/95 backdrop-blur-md flex flex-col justify-center items-center z-40"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          style={{ 
            paddingTop: 'env(safe-area-inset-top, 0px)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)'
          }}
        >
          <nav className="w-full max-w-md px-6">
            <ul className="flex flex-col items-center space-y-4">
              {navItems.map((item) => (
                <motion.li key={item.name} className="w-full" variants={itemVariants}>
                  <a
                    href={item.href}
                    onClick={(e) => handleItemClick(e, item.name)}
                    className={`relative flex items-center justify-center space-x-4 p-4 rounded-xl w-full ${
                      activeItem === item.name 
                        ? 'bg-gradient-to-r from-purple-600/30 via-fuchsia-600/30 to-pink-600/30 text-white' 
                        : 'text-purple-200 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <span className="text-xl font-medium">{item.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Memoize nav items to prevent unnecessary re-renders
const NavItems = React.memo(({ activeItem, handleNavClick }: { 
  activeItem: string, 
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, name: string) => void 
}) => (
  <ul className="flex items-center space-x-2 sm:space-x-3 md:space-x-5">
    {navItems.map((item) => (
      <li key={item.name} className="relative">
        <a 
          href={item.href}
          onClick={(e) => handleNavClick(e, item.name)}
          className="relative px-3 py-2 rounded-full flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 transition-all duration-300"
          aria-current={activeItem === item.name ? 'page' : undefined}
        >
          <div className={`relative z-10 ${activeItem === item.name ? 'text-white' : 'text-purple-200'}`}>
            {item.icon}
          </div>
          <span 
            className={`text-xs sm:text-sm font-medium relative z-10 ${
              activeItem === item.name ? 'text-white' : 'text-purple-200'
            }`}
          >
            {item.name}
          </span>
          
          {activeItem === item.name && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-fuchsia-600/80 to-pink-600/80 rounded-full"
              layoutId="navbar-indicator"
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 35,
                duration: 0.6
              }}
            />
          )}
        </a>
      </li>
    ))}
  </ul>
));

NavItems.displayName = 'NavItems';

// Throttle function to limit how often a function can be called
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export default function Header() {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerHeight = useRef<number>(80); // Default header height
  const prefersReducedMotion = useReducedMotion();
  const isScrollingRef = useRef(false);
  const mobileMediaQueryRef = useRef<MediaQueryList | null>(null);

  // Check if we're on mobile using MediaQueryList
  useEffect(() => {
    // Use matchMedia instead of just checking window width
    const checkIfMobile = () => {
      const isMobileView = window.matchMedia('(max-width: 767px)').matches;
      setIsMobile(isMobileView);
      
      // Close mobile menu when switching to desktop view
      if (!isMobileView && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    // Initialize the media query
    mobileMediaQueryRef.current = window.matchMedia('(max-width: 767px)');
    
    // Check on mount
    checkIfMobile();
    
    // Add event listener for media query changes
    const mediaQueryListener = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    // Add the listener
    mobileMediaQueryRef.current.addEventListener('change', mediaQueryListener);
    
    // Also listen for resize events as a fallback
    window.addEventListener('resize', throttle(checkIfMobile, 100));
    
    // Cleanup
    return () => {
      if (mobileMediaQueryRef.current) {
        mobileMediaQueryRef.current.removeEventListener('change', mediaQueryListener);
      }
      window.removeEventListener('resize', throttle(checkIfMobile, 100));
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when resizing to desktop - this is now handled in the media query listener
  // but keeping as a fallback
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Calculate the header height on mount and window resize
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        headerHeight.current = headerElement.offsetHeight + 20; // Add some padding
      }
    };

    // Calculate on mount
    calculateHeaderHeight();

    // Use ResizeObserver instead of window resize event for better performance
    const resizeObserver = new ResizeObserver(throttle(calculateHeaderHeight, 100));
    const headerElement = document.querySelector('header');
    if (headerElement) {
      resizeObserver.observe(headerElement);
    }

    return () => {
      if (headerElement) {
        resizeObserver.unobserve(headerElement);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Memoize the observer options to prevent unnecessary recalculations
  const observerOptions = useMemo(() => ({
    root: null, // Use the viewport as the root
    rootMargin: `-${headerHeight.current}px 0px 0px 0px`, // Adjust for header height
    threshold: [0.1, 0.5] // Trigger when 10% or 50% of the section is visible
  }), [headerHeight.current]);

  // Improved scroll spy with Intersection Observer
  useEffect(() => {
    // Skip if user just clicked a navigation item
    if (clickTimeoutRef.current) return;

    // Create an Intersection Observer to detect which section is in view
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Skip if user just clicked a navigation item
      if (clickTimeoutRef.current) return;

      // Find the most visible section
      let maxVisibleSection: Element | null = null;
      let maxVisibleRatio = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxVisibleRatio) {
          maxVisibleRatio = entry.intersectionRatio;
          maxVisibleSection = entry.target;
        }
      });

      // Update active item if we found a visible section
      if (maxVisibleSection) {
        // Use type assertion to fix the linter error
        const sectionElement = maxVisibleSection as HTMLElement;
        const sectionId = sectionElement.id;
        if (sectionId) {
          const newActiveItem = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
          if (newActiveItem !== activeItem) {
            setActiveItem(newActiveItem);
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    // Fallback to traditional scroll spy for browsers that don't support Intersection Observer
    const handleScrollSpy = () => {
      // Skip if user just clicked a navigation item or if we're already processing a scroll event
      if (clickTimeoutRef.current || isScrollingRef.current) return;
      
      isScrollingRef.current = true;
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + headerHeight.current;
        
        // Find the current section in view
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i] as HTMLElement;
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (
            scrollPosition >= sectionTop && 
            scrollPosition < sectionTop + sectionHeight &&
            sectionId
          ) {
            const newActiveItem = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
            if (newActiveItem !== activeItem) {
              setActiveItem(newActiveItem);
            }
            break; // Exit loop once we've found our section
          }
        }
        
        scrollTimeoutRef.current = null;
        isScrollingRef.current = false;
      }, 50); // Reduced debounce time for smoother transitions
    };
    
    // Use throttled scroll handler for better performance
    const throttledScrollHandler = throttle(handleScrollSpy, 100);
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', throttledScrollHandler);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeItem, observerOptions]);

  // Smooth scroll to section when clicking nav items
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, itemName: string) => {
    e.preventDefault();
    
    // Set active item immediately to avoid flicker
    setActiveItem(itemName);
    
    // Prevent scroll spy from changing the active item for a short period
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      clickTimeoutRef.current = null;
    }, 1000); // Ignore scroll events for 1 second after clicking
    
    const href = e.currentTarget.getAttribute('href');
    const targetId = href?.substring(1); // Remove the # from the href
    const element = document.getElementById(targetId || '');
    
    if (element) {
      window.scrollTo({
        top: element.offsetTop - headerHeight.current, // Use dynamic header height
        behavior: prefersReducedMotion ? 'auto' : 'smooth' // Respect user's motion preference
      });
    }
  }, [prefersReducedMotion]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Memoize animations for better performance
  const headerAnimation = useMemo(() => 
    prefersReducedMotion ? {} : {
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }, 
  [prefersReducedMotion]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none" 
        style={{ 
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)'
        }}
      >
        <motion.header 
          className={`pointer-events-auto px-4 sm:px-6 flex ${isMobile ? 'justify-end' : 'justify-center w-full'}`}
          {...headerAnimation}
        >
          {isMobile ? (
            <div className="pointer-events-auto">
              <HamburgerButton isOpen={isMobileMenuOpen} toggle={toggleMobileMenu} />
            </div>
          ) : (
            <motion.div 
              className="mx-auto px-6 py-3 backdrop-blur-md rounded-full shadow-lg shadow-purple-900/10 border border-purple-800/20"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <nav>
                <NavItems activeItem={activeItem} handleNavClick={handleNavClick} />
              </nav>
            </motion.div>
          )}
        </motion.header>
      </div>
      
      {/* Mobile Menu - only render when in mobile view */}
      {isMobile && (
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          activeItem={activeItem} 
          handleNavClick={handleNavClick} 
          closeMenu={() => setIsMobileMenuOpen(false)} 
        />
      )}
    </>
  );
} 