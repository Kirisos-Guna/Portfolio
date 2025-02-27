'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import GradientText from './GradientText';
import React from 'react';
import { ParallaxUp } from './ParallaxEffect';

// Sample project data - moved outside component to prevent recreation
const projects = [
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    image: '/project-placeholder.jpg',
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    image: '/project-placeholder.jpg',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Vuex'],
    image: '/project-placeholder.jpg',
  },
];

// Memoized project card component
const ProjectCard = React.memo(({ 
  project, 
  itemVariants, 
  prefersReducedMotion 
}: { 
  project: typeof projects[0], 
  itemVariants: Variants,
  prefersReducedMotion: boolean
}) => (
  <motion.div
    className="bg-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-800/30 hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300"
    variants={itemVariants}
    whileHover={prefersReducedMotion ? {} : { y: -5 }}
  >
    <div className="h-48 bg-gradient-to-br from-indigo-800/30 to-purple-800/30 flex items-center justify-center">
      <span className="text-purple-200/70">Project Image</span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-purple-100 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.technologies.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="px-3 py-1 bg-purple-800/30 text-purple-200 rounded-full text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
));

ProjectCard.displayName = 'ProjectCard';

export default function ProjectsContent() {
  const prefersReducedMotion = useReducedMotion();

  // Memoize animation variants to prevent recreation on each render
  const { containerVariants, itemVariants } = useMemo(() => {
    // If user prefers reduced motion, use simpler animations
    if (prefersReducedMotion) {
      return {
        containerVariants: {
          hidden: { opacity: 1 }, // Include hidden for type compatibility
          visible: { opacity: 1 }
        } as Variants,
        itemVariants: {
          hidden: { opacity: 1 }, // Include hidden for type compatibility
          visible: { opacity: 1 }
        } as Variants
      };
    }
    
    // Full animations for users who don't mind motion
    return {
      containerVariants: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      } as Variants,
      itemVariants: {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        },
      } as Variants
    };
  }, [prefersReducedMotion]);

  // Memoize title animation to prevent recreation on each render
  const titleAnimation = useMemo(() => {
    if (prefersReducedMotion) {
      return { 
        initial: { opacity: 1 }, // Include initial for consistency
        animate: { opacity: 1 } 
      };
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 }
    };
  }, [prefersReducedMotion]);

  return (
    <section id="projects" className="py-20 px-4 pt-32">
      <div className="container mx-auto max-w-6xl">
        <ParallaxUp offset={25}>
          <motion.div
            className="text-center mb-16"
            {...titleAnimation}
          >
            <GradientText
              from="from-indigo-400"
              via="via-purple-400"
              to="to-pink-400"
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              animate={!prefersReducedMotion}
            >
              My Projects
            </GradientText>
            <p className="mt-4 text-purple-100 max-w-2xl mx-auto">
              Here are some of the projects I&apos;ve worked on. Each project represents my skills and passion for creating beautiful and functional web applications.
            </p>
          </motion.div>
        </ParallaxUp>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <ParallaxUp 
              key={index} 
              offset={15} 
              delay={index * 0.1}
            >
              <ProjectCard 
                key={index} 
                project={project} 
                itemVariants={itemVariants}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            </ParallaxUp>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 