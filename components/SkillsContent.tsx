'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import GradientText from './GradientText';
import React from 'react';
import { ParallaxUp } from './ParallaxEffect';

// Sample skills data - moved outside component to prevent recreation
const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 75 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'GraphQL', level: 65 },
    ],
  },
  {
    name: 'Tools & Others',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'AWS', level: 65 },
      { name: 'Figma', level: 75 },
      { name: 'Jest', level: 80 },
    ],
  },
];

// Additional skills array
const additionalSkills = [
  'Responsive Design', 
  'UI/UX Design', 
  'RESTful APIs', 
  'Agile Methodology', 
  'CI/CD', 
  'Performance Optimization', 
  'Accessibility', 
  'SEO'
];

// Memoized skill progress bar component
const SkillProgressBar = React.memo(({ 
  skill, 
  index, 
  prefersReducedMotion 
}: { 
  skill: { name: string; level: number }; 
  index: number;
  prefersReducedMotion: boolean;
}) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-purple-100">{skill.name}</span>
      <span className="text-purple-300">{skill.level}%</span>
    </div>
    <div className="w-full bg-purple-900/30 rounded-full h-2.5">
      <motion.div
        className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
        initial={prefersReducedMotion ? { width: `${skill.level}%` } : { width: 0 }}
        animate={{ width: `${skill.level}%` }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.3 + index * 0.1 }}
      />
    </div>
  </div>
));

SkillProgressBar.displayName = 'SkillProgressBar';

// Memoized skill category component
const SkillCategory = React.memo(({ 
  category, 
  itemVariants, 
  prefersReducedMotion 
}: { 
  category: typeof skillCategories[0]; 
  itemVariants: Variants;
  prefersReducedMotion: boolean;
}) => (
  <motion.div
    className="bg-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-800/30 p-6"
    variants={itemVariants}
  >
    <h3 className="text-xl font-bold text-white mb-6 text-center">{category.name}</h3>
    <div className="space-y-4">
      {category.skills.map((skill, skillIndex) => (
        <SkillProgressBar 
          key={skillIndex} 
          skill={skill} 
          index={skillIndex}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  </motion.div>
));

SkillCategory.displayName = 'SkillCategory';

export default function SkillsContent() {
  const prefersReducedMotion = useReducedMotion();

  // Memoize animation variants to prevent recreation on each render
  const { containerVariants, itemVariants } = useMemo(() => {
    // If user prefers reduced motion, use simpler animations
    if (prefersReducedMotion) {
      return {
        containerVariants: {
          hidden: { opacity: 1 },
          visible: { opacity: 1 }
        } as Variants,
        itemVariants: {
          hidden: { opacity: 1 },
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
        initial: { opacity: 1 },
        animate: { opacity: 1 } 
      };
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 }
    };
  }, [prefersReducedMotion]);

  // Memoize additional skills animation
  const additionalSkillsAnimation = useMemo(() => {
    if (prefersReducedMotion) {
      return { 
        initial: { opacity: 1 },
        animate: { opacity: 1 } 
      };
    }
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 1, duration: 0.8 }
    };
  }, [prefersReducedMotion]);

  return (
    <section id="skills" className="py-20 px-4 pt-32">
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
              My Skills
            </GradientText>
            <p className="mt-4 text-purple-100 max-w-2xl mx-auto">
              Here&apos;s an overview of my technical skills and expertise. I&apos;m constantly learning and expanding my knowledge in various technologies.
            </p>
          </motion.div>
        </ParallaxUp>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillCategories.map((category, index) => (
            <ParallaxUp 
              key={index} 
              offset={20} 
              delay={index * 0.1}
            >
              <SkillCategory 
                key={index} 
                category={category} 
                itemVariants={itemVariants}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            </ParallaxUp>
          ))}
        </motion.div>

        <ParallaxUp offset={15} delay={0.3}>
          <motion.div
            className="mt-16 text-center"
            {...additionalSkillsAnimation}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Additional Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {additionalSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-purple-800/30 text-purple-100 rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(126, 34, 206, 0.4)' }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </ParallaxUp>
      </div>
    </section>
  );
} 