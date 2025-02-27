"use client";

import { motion } from 'framer-motion';
import GradientText from './GradientText';
import { ParallaxUp, ParallaxScale, ParallaxRotate } from './ParallaxEffect';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <ParallaxUp offset={20}>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GradientText
              from="from-purple-400"
              via="via-fuchsia-500"
              to="to-pink-600"
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              About Me
            </GradientText>
          </motion.div>
        </ParallaxUp>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <ParallaxScale offset={15}>
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold mb-6 text-white"
            >
              I&apos;m a{' '}
              <GradientText
                from="from-purple-400"
                via="via-fuchsia-500"
                to="to-pink-600"
              >
                Full Stack Developer
              </GradientText>{' '}
              based in Your Location
            </motion.h3>
          </ParallaxScale>

          <ParallaxRotate offset={3} delay={0.1}>
            <motion.p variants={itemVariants} className="text-purple-100 mb-6">
              I specialize in building modern, responsive web applications with a focus on user experience and performance. With expertise in both frontend and backend technologies, I create seamless digital experiences that solve real-world problems.
            </motion.p>
          </ParallaxRotate>

          <ParallaxRotate offset={3} delay={0.2}>
            <motion.p variants={itemVariants} className="text-purple-100 mb-8">
              My journey in web development started X years ago, and I&apos;ve since worked on a variety of projects ranging from small business websites to complex web applications. I&apos;m passionate about clean code, accessibility, and staying up-to-date with the latest industry trends.
            </motion.p>
          </ParallaxRotate>

          <ParallaxUp offset={15} delay={0.3}>
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-4 text-white">My Skills Include:</h4>
              <div className="flex flex-wrap gap-3">
                {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-purple-900/30 text-purple-100 rounded-full text-sm font-medium hover:bg-purple-800/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </ParallaxUp>
        </motion.div>
      </div>
    </section>
  );
} 